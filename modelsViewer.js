// modelsViewer.js - Loads and displays 3D OBJ/STL models using Three.js with download functionality

// Model metadata
const models = [{
        name: "Heritage Site 1 (OBJ)",
        filename: "heritage1.obj",
        type: "obj",
    },
    {
        name: "Heritage Site 1 (STL)",
        filename: "heritage1.stl",
        type: "stl",
    },
<<<<<<< HEAD
=======
    {
        name: "Ancient Temple (OBJ)",
        filename: "temple.obj",
        type: "obj",
    },
>>>>>>> 0784366 ( commit)
    // Add more models here as needed
];

const modelSelect = document.getElementById("modelSelect");
const viewer = document.getElementById("viewer");
const downloadBtn = document.getElementById("downloadBtn");

let scene, camera, renderer, controls, currentModel;

function initThreeJs() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    camera = new THREE.PerspectiveCamera(45, viewer.clientWidth / viewer.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(viewer.clientWidth, viewer.clientHeight);
    viewer.appendChild(renderer.domElement);

    // Add basic lighting
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Orbit Controls (optional - include from CDN)
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/three@0.126.1/examples/js/controls/OrbitControls.js";
    script.onload = () => {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        animate();
    };
    document.head.appendChild(script);

    window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = viewer.clientWidth / viewer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(viewer.clientWidth, viewer.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    if (controls) controls.update();
    renderer.render(scene, camera);
}

function loadModel(model) {
    // Remove existing model
    if (currentModel) {
        scene.remove(currentModel);
        if (currentModel.geometry) currentModel.geometry.dispose();
    }

    const loader = model.type === "obj" ? new THREE.OBJLoader() : new THREE.STLLoader();

    loader.load(
        `assets/models/${model.filename}`,
        (geometryOrObject) => {
            let mesh;
            if (model.type === "obj") {
                mesh = geometryOrObject;
            } else {
                // STLLoader returns geometry
                const material = new THREE.MeshPhongMaterial({ color: 0x999999 });
                mesh = new THREE.Mesh(geometryOrObject, material);
            }
            mesh.position.set(0, 0, 0);
            scene.add(mesh);
            currentModel = mesh;
        },
        undefined,
        (error) => {
            alert("Error loading model.");
            console.error(error);
        }
    );
}

// Populate dropdown
models.forEach((model, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = model.name;
    modelSelect.appendChild(option);
});

// Event Listeners
modelSelect.addEventListener("change", () => {
    const selectedModel = models[modelSelect.value];
    loadModel(selectedModel);
    downloadBtn.href = `assets/downloads/${selectedModel.filename}`;
    downloadBtn.download = selectedModel.filename;
});

// Download button setup
downloadBtn.addEventListener("click", () => {
    const selectedModel = models[modelSelect.value];
    if (!selectedModel) return;
    // Default anchor behavior will trigger download
});

// Initialize Three.js and load first model
initThreeJs();
if (models.length > 0) {
    modelSelect.value = 0;
    loadModel(models[0]);
    downloadBtn.href = `assets/downloads/${models[0].filename}`;
    downloadBtn.download = models[0].filename;
}