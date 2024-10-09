// Import necessary modules and classes from the library
import { Construct, GraphicsContext, PhysicsColliderFactory, PhysicsContext } from "../lib";
import { InteractManager } from "../lib/w3ads/InteractManager";
import { InterfaceContext } from "../lib/w3ads/InterfaceContext";
import { TimeS, TimeMS } from "../lib/w3ads/types/misc.type";

// Define the PeanutButter class, extending from the Construct base class
export class PeanutButter extends Construct {
    // Declare properties for the model's mesh and scale
    mesh!: any;
    scale: number;

    // Constructor initializes the PeanutButter instance with graphics, physics, interaction, and UI contexts
    constructor(graphics: GraphicsContext, physics: PhysicsContext, interactions: InteractManager, userInterface: InterfaceContext, scale: number = 1) {
        // Call the superclass (Construct) constructor
        super(graphics, physics, interactions, userInterface);

        // Initialize the scale property for the PeanutButter instance
        this.scale = scale;
    }

    // The create method is a placeholder for any initial setup logic needed when creating the object
    create(): void {
    }

    // The load method asynchronously loads the PeanutButter 3D model using the graphics context
    async load(): Promise<void> {
        try {
            // Load the GLTF model of the peanut butter jar and store its scene object in the mesh property
            const gltfData: any = await this.graphics.loadModel("/assets/peanut_Butter/peanut_butter.gltf");
            this.mesh = gltfData.scene;
        } 
        // Log any errors encountered during the loading process
        catch (error) {
            console.log(error);
        }
    }

    // The build method adds the loaded model to the scene with appropriate scaling and shadow settings
    build(): void {
        // Set the scale for the PeanutButter model and enable shadow casting and receiving
        this.mesh.scale.set(this.scale, this.scale, this.scale);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        // Add the PeanutButter mesh to the scene by adding it to the root object
        this.add(this.mesh);

        // Add a static physics collider to the PeanutButter model for collision detection
        this.physics.addStatic(this.mesh, PhysicsColliderFactory.box(this.scale / 6, this.scale / 3, this.scale / 6));
    }

    // The update method is a placeholder for any updates to be applied over time; currently empty
    update(time?: TimeS, delta?: TimeMS): void {}

    // The destroy method is a placeholder for cleanup logic when the object is removed; currently empty
    destroy(): void {}
}
