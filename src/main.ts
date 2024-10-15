//@ts-ignore
import AmmoLib from './ammo/ammo.js';
import { Project, Scene } from './lib/index.js';
import { TutorialArea } from './scenes/TutorialArea.js';
import { BoxScene } from './scenes/BoxScene.js';
import { ModelIteractionScene } from './scenes/ModelIteractionScene.js';
import { ModelLoadingScene } from './scenes/ModelLoadingScene.js';


AmmoLib()
    .then(function (result: any) {
        const sceneMap = new Map<string, typeof Scene>([
            ["model-interaction", ModelIteractionScene],
            ["tutorial", TutorialArea],
            ["box-scene", BoxScene],
            ["model-loading", ModelLoadingScene],
        ]);

        //@ts-ignore
        const project = new Project(
            sceneMap,
            "tutorial",
            "tutorial",
            {
                physicsEngine: result,
                shadows: true,
                stats: true
            }
        )


        const scenes: string[] = []
        let scene;
        const mapIterator = sceneMap.keys();
        while ((scene = mapIterator.next().value)) {
            scenes.push(scene);
        }

        // Change the current scene by pressing "c";
        const numberScenes : number = scenes.length;
        let currentScene = 0;
        document.addEventListener('keypress', (event) => {
            if (event.key === "c"){
                currentScene = (currentScene + 1) % numberScenes;
                project.changeScene(scenes[currentScene]);
            }
        }, false);
    })
    .catch((error: any) => console.log(error));
