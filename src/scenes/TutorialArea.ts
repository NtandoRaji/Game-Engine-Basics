import * as THREE from 'three';  // Import Three.js library for 3D rendering
import { Scene } from '../lib';  // Import the abstract Scene class from the library
import Player from '../constructs/Player';  // Import the Player construct
import Room from '../constructs/Room';  // Import the Room construct
//@ts-ignore

// Define the TutorialArea class that extends the Scene class
export class TutorialArea extends Scene {
    camera!: THREE.PerspectiveCamera;  // Declare a camera variable for the scene
    player!: Player;  // Declare a player variable of type Player
    room!: Room;  // Declare a room variable of type Room

    // Constructor initializes the scene with a key and the Ammo physics library
    constructor(AmmoLib: any) {
        super('tutorial', AmmoLib);  // Call the parent class constructor with a scene key and Ammo library
        
        // Initialize the player construct and add it to the scene
        this.player = new Player(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.player);  // Add the player construct to the scene's constructs array

        // Initialize the room construct and add it to the scene
        this.room = new Room(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.room);  // Add the room construct to the scene's constructs array
    }

    // Lifecycle method to create the scene elements
    create(): void {
        // Set the player's initial position in the scene
        this.player.root.position.set(10, 10, 0);
    }

    // Asynchronous method to load resources for the scene (currently empty)
    async load(): Promise<void> {}

    // Method to build the scene after loading resources
    build(): void {
        // Create a point light in the scene
        const light = new THREE.PointLight(0xffff00, 1, 100, 0);  // Create a yellow point light
        light.position.set(0, 20, 5);  // Set the position of the light

        this.graphics.add(light);  // Add the light to the graphics context
    }

    //@ts-ignore
    // Method to update the scene on each frame (currently empty)
    update(): void {}

    // Method to clean up resources when the scene is destroyed (currently empty)
    destroy(): void {
    }
}
