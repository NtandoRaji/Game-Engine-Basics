import * as THREE from 'three';
import { Scene } from '../lib';
import Player from '../constructs/Player';
import Room from '../constructs/Room';
//@ts-ignore

export class TutorialArea extends Scene {
    camera!: THREE.PerspectiveCamera;
    player!: Player;
    room!: Room;

    constructor(AmmoLib: any) {
        super('tutorial', AmmoLib);
        
        this.player = new Player(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.player);

        this.room = new Room(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.room);
    }

    create(): void {
        this.player.root.position.set(10, 10, 0);
    }

    async load(): Promise<void> {}

    build(): void {
        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 2000);
        this.graphics.mainCamera = this.camera;
        this.graphics.mainCamera.position.set(0, 40, 0);
        this.graphics.mainCamera.lookAt(0, 0, 0);

        const light = new THREE.PointLight(0xffff00, 1, 100, 0);
        light.position.set(0, 20, 5);

        this.graphics.add(light);
    }


    //@ts-ignore
    update(): void {}

    destroy(): void {
    }
}