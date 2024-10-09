import * as THREE from "three";
import { Construct, GraphicsContext, GraphicsPrimitiveFactory, PhysicsColliderFactory, PhysicsContext } from "../lib";
import { InteractManager } from "../lib/w3ads/InteractManager";
import { InterfaceContext } from "../lib/w3ads/InterfaceContext";

class Box extends Construct {
    position!: number[];
    colour!: number;
    scale!: number;

    constructor(graphics: GraphicsContext, physics: PhysicsContext, interactions: InteractManager, 
            userInterface: InterfaceContext, position: number[] = [0, 0, 0], scale:number = 1, colour:number=0xeeeeee){
        super(graphics, physics, interactions, userInterface);

        this.position = position;
        this.colour = colour;
        this.scale = scale;
    }

    create = (): void => {}

    load = async (): Promise<void> => {}

    build = (): void => {
        const cube = GraphicsPrimitiveFactory.box({ 
            position: { x: this.position[0], y: this.position[1], z: this.position[2]}, 
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: this.scale, y: this.scale, z: this.scale },
            colour: this.colour,
            shadows: true,
        });
        
        this.add(cube);
        cube.castShadow = true;
        cube.receiveShadow = true;

        this.physics.addStatic(cube, PhysicsColliderFactory.box(this.scale / 2, this.scale / 2, this.scale / 2));
    }

    //@ts-ignore
    update = (time: TimeS, delta: TimeMS):void => {}

    destroy = (): void  => {}
}

export default Box;
