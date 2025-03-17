import * as THREE from 'three';


function main()
{
    const canvas = document.querySelector('#c');

    //renderer: takes data we provide and renders it to the canvas 
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas}); 

    // Set renderer size to match window
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Set background color to white
    renderer.setClearColor(0xffffff);

    //setup the camera
    //fov: field of view, angle from top to bottom of the camera view
    const fov = 75;
    //aspect: ratio of width to height of the camera view
    //window.innerWidth: width of the browser window
    //window.innerHeight: height of the browser window
    const aspect = window.innerWidth / window.innerHeight;
    
    //near: closest distance to the camera
    const near = 0.1;
    
    //far: farthest distance to the camera
    const far = 100;

    //camera: 3D scene's viewpoint
    //PerspectiveCamera: simulates the human eye's perspective, creating a more realistic 3D effect
    /* 
    - creates frustum: a 3d shape like a pyramid with tip sliced off
    - anything inside defined frustum will be visible
    - anything outside will be clipped (hidden)
    - camera.png 
    
    */
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far); 

    /*
    by default, the camera is positioned at (0,0,0), looking down the negative z-axis
    we need to move it to (0,0,2) to see whatever we position at (0,0,0)
    camerapos.png 
    */
   camera.position.z = 20; 

   /*
   create a scene 
   - anything drawn needs to be added to the scene 
   - scene: collection of objects and lights the camera can see
   */
  const scene = new THREE.Scene(); 

  //create edges cube
  const size = 8;
  const widthSegments = 2;
  const heightSegments = 2;
  const depthSegments = 2;
  const boxGeometry = new THREE.BoxGeometry(
    size, size, size,
    widthSegments, heightSegments, depthSegments
  );
  const geometry = new THREE.EdgesGeometry(boxGeometry);

  //create material for the edges
  /*
  - material: defines the appearance of the object
  - LineBasicMaterial: simple material for drawing lines
  - color: color of the lines
  */
  const material = new THREE.LineBasicMaterial({color: 0x000000});

  //create mesh for the edges (THREE.lineSegments for wireframe)
  /*
  - mesh: 3D object that combines geometry and material
  - geometry: defines the shape of the object
  - material: defines the appearance of the object
  */
  const edgesMesh = new THREE.LineSegments(geometry, material);

  //add the mesh to the scene
  scene.add(edgesMesh);

  //create a render loop
  function animate()
  {
    //requestAnimationFrame: schedules the next frame to be rendered
    requestAnimationFrame(animate);
    //update the rotation of the cube
    edgesMesh.rotation.x += 0.01;
    edgesMesh.rotation.y += 0.01;
    //render the scene
    renderer.render(scene, camera);
  }

  animate();
}

main();
