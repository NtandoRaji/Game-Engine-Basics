import { Construct, GraphicsContext, PhysicsColliderFactory, PhysicsContext } from "../lib";
import { InteractManager } from "../lib/w3ads/InteractManager";
import { InterfaceContext } from "../lib/w3ads/InterfaceContext";
import { TimeS, TimeMS } from "../lib/w3ads/types/misc.type";

export class PeanutButter extends Construct {
    mesh!: any;
    scale: number;

    constructor(graphics: GraphicsContext, physics: PhysicsContext, interactions: InteractManager, userInterface: InterfaceContext, scale: number = 1){
        super(graphics, physics, interactions, userInterface);

        this.scale = scale;
    }

    create(): void {
    }

    async load(): Promise<void> {
        try {
            const gltfData: any = await this.graphics.loadModel("/assets/peanut_Butter/peanut_butter.gltf");
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
