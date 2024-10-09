import * as THREE from 'three'; 
import { Construct, GraphicsContext, GraphicsPrimitiveFactory, PhysicsColliderFactory, PhysicsContext } from "../lib";
import { InteractManager } from '../lib/w3ads/InteractManager';
import { InterfaceContext } from '../lib/w3ads/InterfaceContext';

//@ts-ignore
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

type KeyboardState = {
    LeftPressed: boolean;
    RightPressed: boolean;
    UpPressed: boolean;
    DownPressed: boolean;
};

const walkSpeed = 15;
const sprintSpeed = 10; 

const jumpHeight = 1;
const jumpSpeed = 2.7;
const jumpGravity = 1.1;

// Building the event listeners without using anonymous functions (i.e. as class methods) loses the players instance scope in
// "this". Losing that scope means that the methods are actually using the document scope instead of the player scope
// This variable will just recapture the player scope, and which can then be used by the event listener callbacks
let scope: any;

class Player extends Construct {
    face!: THREE.Mesh;
    body!: THREE.Mesh;
    camera!: THREE.PerspectiveCamera;
    controls!: PointerLockControls;
    holdingObject: THREE.Mesh | undefined = undefined;
    
    direction!: { forward: number, backward: number, left: number, right: number };
    speed: number = walkSpeed;

    interactPrompt!: number;
    placePrompt!: number;

    constructor(graphics: GraphicsContext, physics: PhysicsContext, interactions: InteractManager, userInterface: InterfaceContext) {
        super(graphics, physics, interactions, userInterface);

        scope = this;
    }

    create = (): void => {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);
        this.graphics.mainCamera = this.camera;

        // Set up PointerLockControls
        this.controls = new PointerLockControls(this.camera, this.graphics.renderer.domElement);

        this.direction = { forward: 0, backward: 0, left: 0, right: 0 };
        this.root.userData.canInteract = false;
        this.interactions.addInteracting(this.root, (object: THREE.Mesh) => {
            const inHandScale = object.userData.inHandScale;
            object.removeFromParent();
            object.position.set(2, -1.5, -2);
            object.scale.setScalar(inHandScale);
            this.holdingObject = object;
            this.face.add(object);
        });

        this.interactPrompt = this.userInterface.addPrompt('Press E to interact');
        this.placePrompt = this.userInterface.addPrompt('Press Q to place');

        // Event listeners
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
        document.addEventListener("keypress", this.onKeyPress);
        document.addEventListener('click', () => this.graphics.renderer.domElement.requestPointerLock());

        // Pointer lock change handling
        document.addEventListener('pointerlockchange', this.onPointerLockChange);

        // Automatically lock pointer on click
        this.graphics.renderer.domElement.addEventListener('click', () => {
            this.controls.lock();
        });

    }

    load = async(): Promise<void> =>  {
    }

    build = (): void => {
        this.face = GraphicsPrimitiveFactory.sphere({
            position: { x: 0, y: 3, z: 0 }, 
            rotation: { x: 0, y: 0, z: 0 },
            radius: 0.8,
            colour: 0x0000FF,
            shadows: true,
        });

        this.camera.rotation.set(0, Math.PI / 2, 0);
        this.camera.layers.enable(0);
        this.camera.layers.set(0);

        const bodyGeometry = new THREE.CapsuleGeometry(1, 3);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color:0x0000FF });
        this.body = new THREE.Mesh(bodyGeometry, bodyMaterial);

        this.face.add(this.camera);
        this.body.add(this.face);
        this.add(this.body);
        this.body.layers.set(1);

        this.physics.addCharacter(this.root, PhysicsColliderFactory.box(1, 1, 1), {
            jump: true,
            jumpHeight: jumpHeight,
            jumpSpeed: jumpSpeed,
            gravity: jumpGravity,
        })

        this.graphics.renderer.domElement.requestPointerLock();
    }

    //@ts-ignore ignoring the time variable
    update = (time: number, delta: number): void => {
        delta = delta / 1000;
    
        // Get camera direction (forward vector)
        const direction = new THREE.Vector3();
        this.camera.getWorldDirection(direction);
    
        // Calculate forward/backward and left/right movement based on camera direction
        const forward = direction.clone().normalize();
        const right = new THREE.Vector3().crossVectors(this.camera.up, forward).normalize();
    
        // Calculate local movement
        const xLocal = this.direction.backward - this.direction.forward; // Forward/backward input
        const zLocal = this.direction.right - this.direction.left; // Right/left input
    
        // Combine movement based on input and camera direction
        const moveVector = forward.multiplyScalar(xLocal).add(right.multiplyScalar(zLocal));
    
        // Move the player based on the combined direction and speed
        this.physics.moveCharacter(this.root, -moveVector.x, 0, -moveVector.z, this.speed * delta);

        // The insertion and removal of these DOM nodes is causing performance hickups 
        // when nearby to interactable elements - possibly consider switching to signals
        if (this.root.userData.canInteract && this.holdingObject === undefined) {
            this.userInterface.showPrompt(this.interactPrompt);
        } else {
            this.userInterface.hidePrompt(this.interactPrompt);
        }

        if (this.root.userData.canPlace && this.holdingObject !== undefined) {
            this.userInterface.showPrompt(this.placePrompt);
        } else {
            this.userInterface.hidePrompt(this.placePrompt);
        }
    }

    destroy = (): void => {
        // document.removeEventListener("keydown", this.onKeyDown);
        // document.removeEventListener("keyup", this.onKeyUp);
        // document.removeEventListener("keypress", this.onKeyPress);
    }

    onPointerLockChange() {
        if (document.pointerLockElement !== scope.graphics.renderer.domElement) {
            console.log("Pointer lock lost, pausing game.");
        }
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.key == 'w' || event.key == 'W') { scope.direction.forward = 1; }
        if (event.key == 's' || event.key == 'S') { scope.direction.backward = 1; }
        if (event.key == 'a' || event.key == 'A') { scope.direction.left = 1; }
        if (event.key == 'd' || event.key == 'D') { scope.direction.right = 1; }
        if (event.key == 'Shift') { scope.speed = sprintSpeed }
    } 

    onKeyUp(event: KeyboardEvent) {
        if (event.key == 'w' || event.key == 'W') { scope.direction.forward = 0; }
        if (event.key == 's' || event.key == 'S') { scope.direction.backward = 0; }
        if (event.key == 'a' || event.key == 'A') { scope.direction.left = 0; }
        if (event.key == 'd' || event.key == 'D') { scope.direction.right = 0; }
        if (event.key == 'Shift') { scope.speed = walkSpeed }
    }

    onKeyPress(event: KeyboardEvent) {
        const worldPos = new THREE.Vector3();
        scope.root.getWorldPosition(worldPos);
        
        if (event.key == ' ') { scope.physics.jumpCharacter(scope.root); }
        if (event.key == 'b' || event.key == 'B'){
            console.log(worldPos);
        }
        if (scope.root.userData.canInteract && scope.holdingObject === undefined && !scope.paused) {
            if (event.key == 'e' || event.key == 'E') {
                scope.root.userData.onInteract();
            }
        }
        if (scope.root.userData.canPlace && scope.holdingObject !== undefined && !scope.paused) {
            if (event.key == 'q' || event.key == 'Q') {
                scope.root.userData.onPlace(scope.holdingObject);
                scope.holdingObject = undefined;
            }
        }
    }
}

export default Player;
