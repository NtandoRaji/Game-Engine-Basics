import * as THREE from "three"; // Importing the Three.js library
import { Scene } from "../lib"; // Importing the base Scene class
import Player from "../constructs/Player"; // Importing the Player construct
import Room from "../constructs/Room"; // Importing the Room construct
import { GroceryItem } from "../constructs/GroceryItem";

// Class representing the ModelLoadingScene, extending the base Scene class
export class ModelLoadingScene extends Scene {
    camera!: THREE.PerspectiveCamera; // Camera for the scene
    player!: Player; // Player object
    peanutButter!: GroceryItem; // PeanutButter object
    redWine!: GroceryItem; // MilkCarton object
    room!: Room; // Room object

    // Constructor initializes the scene with a unique key and the Ammo physics library
    constructor(AmmoLib: any) {
        super("model-loading", AmmoLib); // Call the parent constructor with the scene key and Ammo library

        // Create and add the player construct to the scene
        this.player = new Player(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.player);

        // Create and add the PeanutButter construct to the scene
        this.peanutButter = new GroceryItem(this.graphics, this.physics, this.interactions, this.userInterface, "peanut_butter", 20);
        this.addConstruct(this.peanutButter);

        // Create and add the MilkCarton construct to the scene
        this.redWine = new GroceryItem(this.graphics, this.physics, this.interactions, this.userInterface, "red_wine", 40);
        this.addConstruct(this.redWine);

        // Create and add the Room construct to the scene
        this.room = new Room(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.room);
    }

    // Lifecycle method to create the scene elements
    create(): void {
        // Set the initial positions of the player and objects in the scene
        this.player.root.position.set(10, 10, 0);
        this.peanutButter.root.position.set(-20, 0, 10); // Position of the peanut butter
        this.redWine.root.position.set(-20, 0, 0); // Position of the milk carton
    }

    // Asynchronous method to load resources for the scene (currently empty)
    async load(): Promise<void> {
    }

    // Method to build the scene after loading resources
    build(): void {
        // Create a perspective camera and set its properties
        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 2000);
        this.graphics.mainCamera = this.camera; // Set the main camera in the graphics context
        this.graphics.mainCamera.position.set(0, 40, 0); // Position the camera
        this.graphics.mainCamera.lookAt(0, 0, 0); // Set the camera to look at the origin

        // Create a point light and set its position
        const light = new THREE.PointLight(0xffff00, 1, 50, 0);
        light.position.set(0, 20, 5);

        this.graphics.add(light); // Add the light to the graphics context
    }

    // Method to update the scene on each frame (currently empty)
    //@ts-ignore
    update(): void {}

    // Method to clean up resources when the scene is destroyed (currently empty)
    destroy(): void {
    }
}
