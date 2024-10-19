let scene, camera, renderer, controls;

  function init() {
    // scene and cam
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x808080); // Grey background

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    // camera pos. (furhter away so it is usable on mobile)

    // render
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // controls (both for pc and phone)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; //smooth movement
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1; // min zoom
    controls.maxDistance = 50; // max zoom

    // light (one light for normal lightning effect cause screw AR)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // load the model
    const loader = new THREE.GLTFLoader();
    loader.load('./model2.glb', function (gltf) {
      const model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5); //make model a bit smaller
      scene.add(model);
    }, undefined, function (error) {
      console.error('An error occurred loading the model1:', error);
    });

   //make viewport resizable for phones
    window.addEventListener('resize', onWindowResize, false);

    // start render
    animate();
  }

  // extra resizing stuff
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // animation loop yay
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  //initialize the scene bbyyy
  init();