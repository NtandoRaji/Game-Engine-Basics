// Import necessary modules and classes from the library
import { Construct, GraphicsContext, PhysicsColliderFactory, PhysicsContext } from "../lib";
import { InteractManager } from "../lib/w3ads/InteractManager";
import { InterfaceContext } from "../lib/w3ads/InterfaceContext";
import { TimeS, TimeMS } from "../lib/w3ads/types/misc.type";

// Define the MilkCarton class, extending from the Construct base class
export class GroceryItem extends Construct {
    // Declare properties for the model's mesh and scale
    mesh!: any;
    scale!: number;
    filename!: string;

    // Constructor initializes the MilkCarton instance with graphics, physics, interaction, and UI contexts
    constructor(graphics: GraphicsContext, physics: PhysicsContext, interactions: InteractManager, userInterface: InterfaceContext, filename:string, scale: number = 1) {
        // Call the superclass (Construct) constructor
        super(graphics, physics, interactions, userInterface);

        this.filename = filename;
        this.scale = scale;
    }

    // The create method is a placeholder for any initial setup logic needed when creating the object
    create(): void {
        this.setBeingLookedAt(false);
    }

    // The load method asynchronously loads the MilkCarton 3D model using the graphics context
    async load(): Promise<void> {
        try {
            // Load the GLTF model and store its scene object in the mesh property
            const gltfData: any = await this.graphics.loadModel(`/assets/${this.filename}/${this.filename}.gltf`);
            this.mesh = gltfData.scene;
        }
        // Log any errors encountered during the loading process
        catch (error) {
            console.log(error);
        }
    }

    // The build method adds the loaded model to the scene with appropriate scaling and shadow settings
    build(): void {
        // Set the scale for the MilkCarton model and enable shadow casting and receiving
        this.mesh.scale.set(this.scale, this.scale, this.scale);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        // Add the MilkCarton mesh to the scene by adding it to the root object
        this.add(this.mesh);

        // Add a static physics collider to the MilkCarton model for collision detection
        this.physics.addStatic(this.mesh, PhysicsColliderFactory.box(this.scale / 6, this.scale / 3, this.scale / 6));
    }

    // The update method is a placeholder for any updates to be applied over time; currently empty
    update(time?: TimeS, delta?: TimeMS): void {}

    // The destroy method is a placeholder for cleanup logic when the object is removed; currently empty
    destroy(): void {}

    setBeingLookedAt(value: boolean): void{
        this.root.userData.beingLookedAt = value;
    }
}
