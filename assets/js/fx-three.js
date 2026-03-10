(function () {
  var canvas = document.getElementById('fx-three-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'fx-three-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(canvas, document.body.firstChild);
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.THREE) return;

  var THREE = window.THREE;
  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x020306, 16, 82);

  var camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 0, 20);

  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: window.devicePixelRatio <= 1.5,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setClearColor(0x010204, 0.92);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.setSize(window.innerWidth, window.innerHeight);

  var isMobile = window.innerWidth < 768;
  var totalCount = isMobile ? 520 : 1080;
  var symbolSpecs = [
    { symbol: '$', color: '#5ec8ff' },
    { symbol: '€', color: '#8ea6ff' },
    { symbol: '₿', color: '#ffb347' },
    { symbol: 'Ξ', color: '#8cf0c4' }
  ];

  function createSymbolTexture(symbol) {
    var c = document.createElement('canvas');
    c.width = 128;
    c.height = 128;
    var ctx = c.getContext('2d');

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 86px Arial, sans-serif';

    ctx.shadowBlur = 14;
    ctx.shadowColor = 'rgba(255,255,255,0.5)';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(symbol, 64, 66);

    var tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  }

  function createSymbolCloud(spec, count, sizeMin, sizeRange) {
    var positions = new Float32Array(count * 3);
    var basePositions = new Float32Array(count * 3);
    var seeds = new Float32Array(count);
    var drift = new Float32Array(count);

    for (var i = 0; i < count; i++) {
      var i3 = i * 3;
      var angle = Math.random() * Math.PI * 2;
      var spread = (isMobile ? 9 : 12) * Math.sqrt(Math.random());
      var x = Math.cos(angle) * spread;
      var y = Math.sin(angle) * spread;
      var z = (Math.random() - 0.5) * 24;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      basePositions[i3] = x;
      basePositions[i3 + 1] = y;
      basePositions[i3 + 2] = z;

      seeds[i] = Math.random() * Math.PI * 2;
      drift[i] = sizeMin + Math.random() * sizeRange;
    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    var texture = createSymbolTexture(spec.symbol);
    var material = new THREE.PointsMaterial({
      map: texture,
      alphaTest: 0.24,
      transparent: true,
      color: spec.color,
      size: isMobile ? 0.58 : 0.72,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    var points = new THREE.Points(geometry, material);
    scene.add(points);

    return {
      points: points,
      geometry: geometry,
      material: material,
      texture: texture,
      basePositions: basePositions,
      seeds: seeds,
      drift: drift,
      count: count
    };
  }

  var perCloud = Math.floor(totalCount / symbolSpecs.length);
  var clouds = [];
  for (var s = 0; s < symbolSpecs.length; s++) {
    clouds.push(createSymbolCloud(symbolSpecs[s], perCloud, 0.6 + s * 0.04, 0.5));
  }

  var ring = new THREE.Mesh(
    new THREE.TorusKnotGeometry(isMobile ? 2.2 : 2.8, isMobile ? 0.36 : 0.42, 150, 22),
    new THREE.MeshBasicMaterial({
      color: 0x24f0bf,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    })
  );
  scene.add(ring);

  var halo = new THREE.Mesh(
    new THREE.TorusGeometry(isMobile ? 4.8 : 5.9, isMobile ? 0.03 : 0.04, 24, 160),
    new THREE.MeshBasicMaterial({
      color: 0x67bfff,
      transparent: true,
      opacity: 0.16
    })
  );
  halo.rotation.x = Math.PI * 0.3;
  scene.add(halo);

  var pointer = { x: 0, y: 0 };
  var pointerTarget = { x: 0, y: 0 };
  var scrollTarget = 0;
  var scrollSmooth = 0;

  function maxScrollable() {
    return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }

  function updateScrollTarget() {
    scrollTarget = Math.min(1, Math.max(0, window.scrollY / maxScrollable()));
  }

  function onPointerMove(e) {
    pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerTarget.y = (e.clientY / window.innerHeight) * 2 - 1;
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateScrollTarget();
  }

  updateScrollTarget();
  window.addEventListener('scroll', updateScrollTarget, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('resize', onResize);

  var clock = new THREE.Clock();
  var rafId = null;
  var fps = isMobile ? 30 : 60;
  var frameBudget = 1 / fps;
  var accumulator = 0;

  function animate() {
    rafId = requestAnimationFrame(animate);
    var delta = clock.getDelta();
    accumulator += delta;
    if (accumulator < frameBudget) return;
    accumulator = 0;

    var time = clock.elapsedTime;
    scrollSmooth += (scrollTarget - scrollSmooth) * 0.06;
    pointer.x += (pointerTarget.x - pointer.x) * 0.05;
    pointer.y += (pointerTarget.y - pointer.y) * 0.05;

    var scrollWave = scrollSmooth * Math.PI * 2;
    var depthPull = -4 + scrollSmooth * 10;

    for (var c = 0; c < clouds.length; c++) {
      var cloud = clouds[c];
      var pos = cloud.geometry.attributes.position.array;
      for (var i = 0; i < cloud.count; i++) {
        var i3 = i * 3;
        var bx = cloud.basePositions[i3];
        var by = cloud.basePositions[i3 + 1];
        var bz = cloud.basePositions[i3 + 2];
        var seed = cloud.seeds[i];
        var speed = cloud.drift[i];

        pos[i3] = bx + Math.sin(time * (0.45 + speed * 0.1) + seed + scrollWave) * 0.28;
        pos[i3 + 1] = by + Math.cos(time * (0.4 + speed * 0.12) + seed * 1.2 + scrollWave) * 0.24;
        pos[i3 + 2] = bz + Math.sin(time * (0.35 + speed * 0.07) + seed * 1.4 + scrollWave) * 0.52 + depthPull;
      }
      cloud.geometry.attributes.position.needsUpdate = true;

      cloud.points.rotation.y = time * (0.03 + c * 0.005) + scrollSmooth * 1.2;
      cloud.points.rotation.x = pointer.y * 0.1 + scrollSmooth * 0.09;
      cloud.points.rotation.z = pointer.x * (0.04 + c * 0.01);
    }

    ring.rotation.x = time * 0.35 + scrollSmooth * 2.4;
    ring.rotation.y = time * 0.55 + scrollSmooth * 1.2;
    ring.rotation.z = scrollSmooth * 3.2;
    ring.scale.setScalar(1 + scrollSmooth * 0.28);

    halo.rotation.z = -time * 0.18 - scrollSmooth * 2.1;
    halo.rotation.y = time * 0.12 + scrollSmooth * 0.5;
    halo.scale.setScalar(1 + scrollSmooth * 0.2);

    camera.position.x += (pointer.x * 1.25 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.95 - camera.position.y) * 0.04;
    camera.position.z += (20 - scrollSmooth * 3.2 - camera.position.z) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  function stopAnimation() {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('scroll', updateScrollTarget);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('resize', onResize);

    for (var c = 0; c < clouds.length; c++) {
      clouds[c].geometry.dispose();
      clouds[c].material.dispose();
      clouds[c].texture.dispose();
    }

    ring.geometry.dispose();
    ring.material.dispose();
    halo.geometry.dispose();
    halo.material.dispose();
    renderer.dispose();
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      clock.getDelta();
      animate();
    }
  });

  window.addEventListener('beforeunload', stopAnimation);
  animate();
})();
