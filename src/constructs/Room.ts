import * as THREE from "three";
import { Construct, GraphicsContext, PhysicsColliderFactory, PhysicsContext } from "../lib";
import { InteractManager } from "../lib/w3ads/InteractManager";
import { InterfaceContext } from "../lib/w3ads/InterfaceContext";
import { TimeS, TimeMS } from "../lib/w3ads/types/misc.type";
import Player from "./Player";


class Room extends Construct {

    constructor(graphics: GraphicsContext, physics: PhysicsContext, interactions: InteractManager, userInterface: InterfaceContext){
        super(graphics, physics, interactions, userInterface);

    }

    create = (): void => {}

    load = async (): Promise<void> => {}

    build = (): void => {
        const floorMat = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
        const floorGeom = new THREE.BoxGeometry(80, 1, 80);
        const floor = new THREE.Mesh(floorGeom, floorMat);
        floor.castShadow = true;
        floor.receiveShadow = true;
        this.physics.addStatic(floor, PhysicsColliderFactory.box(40, 1, 40));
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ambientLight.position.set(0, 0, 0);

        this.add(floor);
        this.add(ambientLight);
    }

    update = (time: TimeS, delta: TimeMS):void => {}

    destroy = (): void  => {}
}

export default Room;
