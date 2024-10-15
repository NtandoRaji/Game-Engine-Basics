import * as THREE from "three"; // Importing the Three.js library
import { Scene } from "../lib"; // Importing the base Scene class
import Player from "../constructs/Player"; // Importing the Player construct
import Room from "../constructs/Room"; // Importing the Room construct
import Box from '../constructs/Box'; // Importing the Box construct

// Class representing the BoxScene, extending the base Scene class
export class BoxScene extends Scene {
    camera!: THREE.PerspectiveCamera; // Camera for the scene
    player!: Player; // Player object
    room!: Room; // Room object

    // Constructor initializes the scene with a unique key and the Ammo physics library
    constructor(AmmoLib: any) {
        super("box-scene", AmmoLib); // Call the parent constructor with the scene key and Ammo library

        // Create and add the player construct to the scene
        this.player = new Player(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.player);

        // Create and add the room construct to the scene
        this.room = new Room(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.room);
    }

    // Lifecycle method to create the scene elements
    create(): void {
        // Set the initial position of the player
        this.player.root.position.set(10, 10, 0);

        // Arrays to define box positions and colors
        const positions = [20, -20, 0]; // Positions for the boxes
        const colours = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00]; // Colors for the boxes

        // Nested loops to create boxes at specified positions and colors
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                const boxPosition = [positions[i], 2, positions[j]]; // Calculate the position for the box
                // Create a new Box construct
                const newBox = new Box(
                    this.graphics,
                    this.physics,
                    this.interactions,
                    this.userInterface,
                    boxPosition, // Position for the box
                    4, // Size parameter for the box (assumed to be the size)
                    colours[2 * i / 2 + j * 2] // Color selection for the box
                );
                newBox.root.castShadow = true; // Enable shadow casting for the box
                this.addConstruct(newBox); // Add the new box construct to the scene
            }
        }
    }

    // Asynchronous method to load resources for the scene (currently empty)
    async load(): Promise<void> {}

    // Method to build the scene after loading resources
    build(): void {
        // Create a point light and set its position
        const light = new THREE.PointLight(0xffff00, 1, 100, 0);
        light.position.set(0, 20, 5);

        this.graphics.add(light); // Add the light to the graphics context
    }

    // Method to update the scene on each frame (currently empty)
    //@ts-ignore
    update(): void {}

    // Method to clean up resources when the scene is destroyed (currently empty)
    destroy(): void {}
}
