import * as THREE from "three";
import { Scene } from "../lib";
import Player from "../constructs/Player";
import Room from "../constructs/Room";
import Box from '../constructs/Box';

export class BoxScene extends Scene {
    camera!: THREE.PerspectiveCamera;
    player!: Player
    room!:Room


    constructor(AmmoLib:any){
        super("box-scene", AmmoLib);
        this.player = new Player(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.player);

        this.room = new Room(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.room);
    }

    create(): void {
        this.player.root.position.set(10, 10, 0);
        
        const positions = [20, -20, 0];
        const colours = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00];

        for (let i = 0; i < 2; i++){
            for (let j = 0; j < 2; j++){
                const boxPosition = [positions[i], 2, positions[j]];
                const newBox = new Box(
                    this.graphics, 
                    this.physics, 
                    this.interactions, 
                    this.userInterface, 
                    boxPosition, 
                    4, 
                    colours[2 * i / 2 + j * 2]
                );
                newBox.root.castShadow = true;
                this.addConstruct(newBox);
            }
        }
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

    destroy(): void {}
}
