import * as THREE from 'three';
import { Scene } from '../lib';
import Box from '../constructs/Box';
import Room from '../constructs/Room';
import Player from '../constructs/Player';
import { PeanutButter } from '../constructs/PeanutButter';

export class ModelIteractionScene extends Scene {
    camera!: THREE.PerspectiveCamera;
    loading!: number;

    room!: Room;
    player!: Player;
    peanutButter!: PeanutButter;
    pickupSpot!: Box;
    placementSpot!: Box;

    constructor(AmmoLib: any) {
        super('model-interaction', AmmoLib);
        this.player = new Player(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.player);

        this.room = new Room(this.graphics, this.physics, this.interactions, this.userInterface);
        this.addConstruct(this.room);

        this.pickupSpot = new Box(this.graphics, this.physics, this.interactions, this.userInterface, [0, 0, 0], 2, 0xff0000);
        this.addConstruct(this.pickupSpot);

        this.peanutButter = new PeanutButter(this.graphics, this.physics, this.interactions, this.userInterface, 5);
        this.addConstruct(this.peanutButter);

        this.placementSpot = new Box(this.graphics, this.physics, this.interactions, this.userInterface, [0, 0, 0], 2, 0x00ff00);
        this.addConstruct(this.placementSpot);
    }

    create(): void {
        this.pickupSpot.root.position.set(0, 2, -20);
        this.pickupSpot.interactions.addPickupSpot(this.pickupSpot.root, 5, (placeObject : THREE.Object3D) => {
            this.pickupSpot.root.add(placeObject);
            placeObject.position.set(0, 1, 0);
            placeObject.scale.setScalar(1);
        });
        
        this.peanutButter.root.position.set(0, 3, -20);
        this.peanutButter.interactions.addPickupObject(this.peanutButter.root, 5, 1, () => {});

        this.placementSpot.root.position.set(0, 2, 20);
        this.placementSpot.interactions.addPickupSpot(this.placementSpot.root, 5, (placeObject : THREE.Object3D) => {
            this.placementSpot.root.add(placeObject);
            placeObject.position.set(0, 1, 0);
            placeObject.scale.setScalar(1);
        });
    }

    async load(): Promise<void> {}

    build(): void {
        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 2000);
        this.graphics.mainCamera = this.camera;
        this.graphics.mainCamera.position.set(0, 40, 0);
        this.graphics.mainCamera.lookAt(0, 0, 0);

        const light = new THREE.PointLight(0xffff00, 1, 50, 0);
        light.position.set(0, 20, 5);

        this.graphics.add(light);
    }

    update(time: number, delta: number): void {
    }

    destroy(): void {
    }
}