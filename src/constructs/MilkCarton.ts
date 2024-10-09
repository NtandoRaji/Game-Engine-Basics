import { Construct, GraphicsContext, PhysicsColliderFactory, PhysicsContext } from "../lib";
import { InteractManager } from "../lib/w3ads/InteractManager";
import { InterfaceContext } from "../lib/w3ads/InterfaceContext";
import { TimeS, TimeMS } from "../lib/w3ads/types/misc.type";

export class MilkCarton extends Construct {
    mesh!: any;
    scale: number = 40;

    constructor(graphics: GraphicsContext, physics: PhysicsContext, interactions: InteractManager, userInterface: InterfaceContext){
        super(graphics, physics, interactions, userInterface);

    }

    create(): void {
    }

    async load(): Promise<void> {
        try {
            const gltfData: any = await this.graphics.loadModel("/assets/milk_carton/carton.gltf");
            this.mesh = gltfData.scene;
        } 
        catch (error) {
            console.log(error);
        }
    }

    build(): void {
        this.mesh.scale.set(this.scale, this.scale, this.scale);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        
        this.add(this.mesh);
        
        this.physics.addStatic(this.mesh, PhysicsColliderFactory.box(this.scale / 6, this.scale / 3, this.scale / 6));
    }

    update(time?: TimeS, delta?: TimeMS): void {}

    destroy(): void {}
}
