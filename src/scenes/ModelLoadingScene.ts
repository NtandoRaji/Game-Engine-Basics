import * as THREE from "three";
import { Scene } from "../lib";
import Player from "../constructs/Player";
import Room from "../constructs/Room";
import { PeanutButter } from "../constructs/PeanutButter";
import { MilkCarton } from "../constructs/MilkCarton";

export class ModelLoadingScene extends Scene {
    camera!: THREE.PerspectiveCamera;
    player!: Player
    peanutButter!: PeanutButter;
    milkCarton!: MilkCarton;
    room!:Room


    constructor(AmmoLib:any){
        super("model-loading", AmmoLib);
        
        this.player = new Player(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.player);

        this.peanutButter = new PeanutButter(this.graphics, this.physics, this.interactions, this.userInterface, 20);
        this.addConstruct(this.peanutButter);

        this.milkCarton = new MilkCarton(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.milkCarton);

        this.room = new Room(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.room);
    }

    create(): void {
        this.player.root.position.set(10, 10, 0);
        this.peanutButter.root.position.set(-20, 0, 10);
        this.milkCarton.root.position.set(-20, 0, 0);
    }

    async load(): Promise<void> {
    }

    build(): void {
        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 2000);
        this.graphics.mainCamera = this.camera;
        this.graphics.mainCamera.position.set(0, 40, 0);
        this.graphics.mainCamera.lookAt(0, 0, 0);

        const light = new THREE.PointLight(0xffff00, 1, 50, 0);
        light.position.set(0, 20, 5);

        this.graphics.add(light);
    }


    //@ts-ignore
    update(): void {}

    destroy(): void {
    }
}
