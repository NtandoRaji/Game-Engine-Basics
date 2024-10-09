// Import necessary modules and classes from the library
import * as THREE from "three";
import { Construct, GraphicsContext, PhysicsColliderFactory, PhysicsContext } from "../lib";
import { InteractManager } from "../lib/w3ads/InteractManager";
import { InterfaceContext } from "../lib/w3ads/InterfaceContext";
import { TimeS, TimeMS } from "../lib/w3ads/types/misc.type";
import Player from "./Player";

// Define the Room class, extending from the Construct base class
class Room extends Construct {

    // Constructor initializes the Room instance with graphics, physics, interaction, and UI contexts
    constructor(graphics: GraphicsContext, physics: PhysicsContext, interactions: InteractManager, userInterface: InterfaceContext) {
        // Call the superclass (Construct) constructor
        super(graphics, physics, interactions, userInterface);
    }

    // The create method is a placeholder for any initial setup logic needed when creating the object
    create = (): void => {}

    // The load method asynchronously loads any assets or resources; currently a placeholder
    load = async (): Promise<void> => {}

    // The build method adds a floor and ambient light to the room, setting up its physical and visual properties
    build = (): void => {
        // Define the material for the floor with a light gray color
        const floorMat = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
        
        // Create a box geometry for the floor with specified dimensions
        const floorGeom = new THREE.BoxGeometry(80, 1, 80);
        
        // Create a mesh for the floor using the geometry and material, and set up shadows
        const floor = new THREE.Mesh(floorGeom, floorMat);
        floor.castShadow = true;
        floor.receiveShadow = true;
        
        // Add a static physics collider to the floor for collision detection
        this.physics.addStatic(floor, PhysicsColliderFactory.box(40, 1, 40));
        
        // Create an ambient light source for soft overall lighting in the room
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        ambientLight.position.set(0, 0, 0); // Position is set to origin, but ambient light affects all areas uniformly

        // Add the floor and ambient light to the scene
        this.add(floor);
        this.add(ambientLight);
    }

    // The update method is a placeholder for any updates to be applied over time; currently empty
    update = (time: TimeS, delta: TimeMS): void => {}

    // The destroy method is a placeholder for cleanup logic when the object is removed; currently empty
    destroy = (): void  => {}
}

// Export the Room class as the default export for use in other modules
export default Room;
