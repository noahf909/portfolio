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

   // Create an organic line following mouse in Porter Robinson Nurture style
   //maxPoints: number of points in the trail: less -> smoother/less lag 
   const maxPoints = 50; 

   //trailPoints: array of points that make up the trail
   const trailPoints = [];
   
   // Initialize with empty points
   for (let i = 0; i < maxPoints; i++) {
    //new THREE.vector3(0,0,0): creates a new vector3 object with x,y,z coordinates (0,0,0)
    /*
    vector3: 3D vector with x,y,z coordinates 
    - pushed to the trailPoints array
    */
     trailPoints.push(new THREE.Vector3(0, 0, 0));
   }
   
   //geometry: defines the shape of the line
   const geometry = new THREE.BufferGeometry();

   //material: defines the appearance of the line
   const material = new THREE.LineBasicMaterial({
     color: 0x000000, // Black color
     linewidth: 1,
     opacity: 0.8,
     transparent: true
   });
   
   //setFromPoints: sets the geometry's points to the trailPoints array
   geometry.setFromPoints(trailPoints);

   //line: creates a new line object
   const line = new THREE.Line(geometry, material);

   //add the line to the scene
   scene.add(line);

   // Mouse position
   //mouse: vector2 object that stores the current mouse position
   const mouse = new THREE.Vector2();
   
   //lastMousePos: vector3 object that stores the last mouse position
   let lastMousePos = new THREE.Vector3(0, 0, 0);
   
   //lastTime: variable to store the last time the line was updated
   let lastTime = 0;
   
   // Create a render loop
   function animate(time) {

    //requestAnimationFrame: calls the animate function on every frame
     requestAnimationFrame(animate);
     
     // Throttle updates to 60fps max
     if (time - lastTime < 16) return;
     lastTime = time;
     
     // Organic movement - shift all points in the trail
     //trailPoints.length - 1: last point in the trail
     //i > 0: loop through all points in the trail except the first one
     for (let i = trailPoints.length - 1; i > 0; i--) {
       //copy the previous point to the current point
       trailPoints[i].copy(trailPoints[i-1]);
       
       // Add subtle organic variation with less randomness
       //i % 5 === 0: every 5th point
       //i < 30: only apply to first 30 points
       if (i % 5 === 0 && i < 30) { 
         //add a small random variation to the x and y coordinates of the point
         trailPoints[i].x += (Math.random() - 0.5) * 0.02;
         trailPoints[i].y += (Math.random() - 0.5) * 0.02;
       }
     }
     
     // Set the first point to current mouse position without any delay
     //trailPoints[0].copy(lastMousePos): copies the last mouse position to the first point in the trail
     trailPoints[0].copy(lastMousePos);
     
     // Update the line geometry
     //geometry.setFromPoints(trailPoints): sets the geometry's points to the trailPoints array
     geometry.setFromPoints(trailPoints);
     
     //renderer.render(scene, camera): renders the scene from the camera's perspective
     renderer.render(scene, camera);
   }

   animate(0);
   
   // Throttle mouse events
   //mouseMoveThrottle: boolean variable to prevent multiple mouse move events from being processed simultaneously
   let mouseMoveThrottle = false;
   
   //addEventListener: adds an event listener to the window object
   //mousemove: event type for when the mouse is moved
   //(event) => {}: anonymous function that is called when the mousemove event is triggered
   window.addEventListener('mousemove', (event) => {
     //if (mouseMoveThrottle) return: if the mouseMoveThrottle variable is true, return and do nothing
     if (mouseMoveThrottle) return;
     //mouseMoveThrottle = true: set the mouseMoveThrottle variable to true
     mouseMoveThrottle = true;
     
     // Get normalized device coordinates
     //event.clientX: x coordinate of the mouse relative to the left edge of the browser window
     //window.innerWidth: width of the browser window
     //(event.clientX / window.innerWidth) * 2 - 1: scales the mouse position to the range of -1 to 1
     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
     //event.clientY: y coordinate of the mouse relative to the top edge of the browser window
     //window.innerHeight: height of the browser window
     //-(event.clientY / window.innerHeight) * 2 + 1: scales the mouse position to the range of -1 to 1
     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
     
     // Convert to world coordinates using camera
     //vector: vector3 object that stores the mouse position in world coordinates
     const vector = new THREE.Vector3(mouse.x, mouse.y, 0);
     //unproject: converts the mouse position from normalized device coordinates to world coordinates
     vector.unproject(camera);
     //dir: vector3 object that stores the direction of the mouse position relative to the camera
     const dir = vector.sub(camera.position).normalize();
     //distance: variable to store the distance from the camera to the mouse position
     const distance = -camera.position.z / dir.z;
     //pos: vector3 object that stores the position of the mouse in world coordinates
     const pos = camera.position.clone().add(dir.multiplyScalar(distance));
     
     // Update the last mouse position
     lastMousePos.copy(pos);
     
     //setTimeout: calls the function after a specified delay
     //mouseMoveThrottle = false: sets the mouseMoveThrottle variable to false after the delay
     setTimeout(() => { mouseMoveThrottle = false; }, 16);
   });
}

main();
