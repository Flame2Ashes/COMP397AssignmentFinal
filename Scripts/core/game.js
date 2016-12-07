/// <reference path = "_reference.ts" />
//Filename: game.ts CORE
//Author: Angelina Gutierrez
//Date modified: November 20th, 2016
// Global Variables
var assets;
var canvas;
var stage;
var spriteSheetLoader;
var ratAtlas;
var currentScene;
var scene;
var oxygen = 100;
var score = 0;
// Preload Assets required
var assetData = [
    //Backgro1unds
    { id: "Game_BG", src: "../../Assets/images/Game_BG.png" },
    { id: "Menu_BG", src: "../../Assets/images/Menu_BG.png" },
    { id: "Instructions_BG", src: "../../Assets/images/Instruction_BG.png" },
    //Buttons
    { id: "start", src: "../../Assets/images/start.png" },
    { id: "instructions", src: "../Assets/images/instructions.png" },
    { id: "playAgain", src: "../../Assets/images/playAgain.png" },
    { id: "back", src: "../../Assets/images/back.png" },
    //Spritesheet
    //TODO: Import Atlas Data
    { id: "ratAtlas", src: "../../Assets/images/ratAtlas.png" },
    //Other
    { id: "floor", src: "../../Assets/images/ground.png" },
];
function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    // assets.installPlugin(createjs.Sound);
    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
function init() {
    // Reference to canvas element
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);
    //TODO: Create AtlasData
    var atlasData = {
        "images": [
            assets.getResult("ratAtlas")
        ],
        "frames": [
            [1, 1, 80, 65, 0, 0, 0],
            [83, 1, 39, 44, 0, 0, 0],
            [83, 47, 32, 48, 0, 0, 0],
            [1, 68, 45, 45, 0, 0, 0],
            [48, 68, 31, 46, 0, 0, 0],
            [1, 115, 39, 39, 0, 0, 0],
            [81, 97, 38, 38, 0, 0, 0],
            [42, 116, 36, 40, 0, 0, 0],
            [1, 156, 31, 46, 0, 0, 0],
            [80, 137, 30, 47, 0, 0, 0],
            [34, 158, 37, 36, 0, -3, -5],
            [73, 186, 47, 28, 0, 0, 0],
            [34, 196, 37, 32, 0, 0, 0],
            [1, 204, 31, 38, 0, 0, 0],
            [73, 216, 40, 31, 0, 0, 0],
            [34, 230, 31, 38, 0, 0, 0],
            [1, 244, 31, 37, 0, 0, 0],
            [67, 249, 58, 30, 0, 0, 0],
            [34, 270, 31, 37, 0, -8, -5],
            [1, 283, 31, 35, 0, 0, 0],
            [67, 281, 40, 31, 0, 0, 0],
            [34, 309, 25, 14, 0, 0, -3],
            [61, 314, 59, 31, 0, 0, 0],
            [1, 325, 37, 31, 0, 0, 0],
            [40, 347, 32, 35, 0, 0, 0],
            [1, 358, 35, 31, 0, 0, 0],
            [74, 347, 35, 31, 0, 0, 0],
            [74, 380, 35, 31, 0, 0, 0],
            [38, 384, 34, 31, 0, 0, 0],
            [1, 391, 35, 30, 0, 0, 0],
            [74, 413, 36, 30, 0, 0, 0],
            [38, 417, 33, 31, 0, 0, 0],
            [73, 445, 33, 31, 0, 0, 0],
            [1, 423, 33, 31, 0, 0, 0],
            [36, 450, 33, 31, 0, 0, 0] //34 - Rat - Idle Front - Frame 1
        ],
        "animations": {
            //Rat animations
            "idle side": { "frames": [12, 23], "speed": 0.1, next: true },
            "idle front": { "frames": [34] },
            "idle back": { frames: [16] },
            "walk side": { "frames": [25, 26], "speed": 0.1, next: true },
            "walk front": { "frames": [31, 32, 28, 33], "speed": 0.1, next: true },
            "walk back": { "frames": [19, 13, 24, 15], "speed": 0.1, next: true },
            "slash side": { "frames": [7, 17, 22, 12], "speed": 0.1, next: false },
            "slash front": { "frames": [20, 8, 9, 34], "speed": 0.1, next: false },
            "slash back": { "frames": [1, 2, 4, 16], "speed": 0.1, next: false },
            "dead side": { "frames": [29, 6], "speed": 0.1, next: false },
            "dead front": { "frames": [20, 27], "speed": 0.1, next: false },
            "dead back": { "frames": [14, 5], "speed": 0.1, next: false },
            "dirtblock": { "frames": [3] },
            "spider": { "frames": [11] },
            "key": { "frames": [21] },
            "oxygen": { "frames": [18] },
            "coin": { "frames": [10] },
            "treasure": { "frames": [0] }
        }
    };
    //Assign to ratAtlas
    ratAtlas = new createjs.SpriteSheet(atlasData);
    scene = config.Scene.MENU;
    changeScene();
}
function gameLoop(event) {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}
function changeScene() {
    // Simple state machine pattern to define scene swapping.
    switch (scene) {
        case config.Scene.MENU:
            stage.removeAllChildren();
            currentScene = new scenes.Menu();
            ;
            console.log("Starting MENU scene");
            break;
        case config.Scene.PLAY:
            stage.removeAllChildren();
            currentScene = new scenes.Play();
            console.log("Starting GAME scene");
            break;
        case config.Scene.INSTRUCTIONS:
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting INSTRUCTIONS scene");
            break;
        case config.Scene.GAMEOVER:
            stage.removeAllChildren();
            currentScene = new scenes.Gameover();
            console.log("Starting GAMEOVER scene");
            break;
        case config.Scene.GAMEOVERWIN:
            stage.removeAllChildren();
            currentScene = new scenes.Gameoverwin();
            console.log("Starting GAMEOVERWIN scene");
            break;
        case config.Scene.PLAY2:
            stage.removeAllChildren();
            currentScene = new scenes.Play2();
            console.log("Starting second level");
            break;
    }
}
//# sourceMappingURL=game.js.map