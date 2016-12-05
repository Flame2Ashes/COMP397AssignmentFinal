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
var life = 100;
// Preload Assets required
var assetData = [
    //Backgro1unds
    { id: "Game_BG", src: "../../Assets/images/gamebg.png" },
    { id: "Menu_BG", src: "../../Assets/images/Menu_BG.png" },
    { id: "Instructions_BG", src: "../../Assets/images/instructionsbg.png" },
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
            [1, 1, 47, 28, 0, 0, 0],
            [50, 1, 36, 30, 0, 0, 0],
            [88, 1, 58, 30, 0, 0, 0],
            [148, 1, 35, 30, 0, 0, 0],
            [185, 1, 33, 31, 0, 0, 0],
            [220, 1, 35, 31, 0, 0, 0],
            [1, 31, 35, 31, 0, 0, 0],
            [38, 33, 37, 31, 0, 0, 0],
            [77, 33, 59, 31, 0, 0, 0],
            [138, 33, 33, 31, 0, 0, 0],
            [173, 34, 40, 31, 0, 0, 0],
            [215, 34, 34, 31, 0, 0, 0],
            [1, 64, 33, 31, 0, 0, 0],
            [36, 66, 33, 31, 0, 0, 0],
            [71, 66, 33, 31, 0, 0, 0],
            [106, 66, 35, 31, 0, 0, 0],
            [143, 67, 40, 31, 0, 0, 0],
            [185, 67, 37, 32, 0, 0, 0],
            [224, 67, 31, 35, 0, 0, 0],
            [1, 97, 32, 35, 0, 0, 0],
            [35, 99, 31, 37, 0, 0, 0],
            [68, 99, 38, 38, 0, 0, 0],
            [108, 99, 31, 38, 0, 0, 0],
            [141, 100, 31, 38, 0, 0, 0],
            [174, 101, 39, 39, 0, 0, 0],
            [215, 104, 36, 40, 0, 0, 0],
            [1, 134, 31, 46, 0, 0, 0],
            [34, 139, 39, 44, 0, 0, 0],
            [75, 139, 45, 45, 0, 0, 0],
            [122, 140, 31, 46, 0, 0, 0],
            [155, 142, 30, 47, 0, 0, 0],
            [187, 146, 32, 48, 0, 0, 0] // 31 - Rat - slash (back) frame 2
        ],
        "animations": {
            //Rat animations
            "idle side": { "frames": [17, 1, 6, 7, 6, 1], "speed": 0.1, next: true },
            "idle front": { "frames": [14] },
            "idle back": { frames: [20] },
            "walk side": { "frames": [5, 17, 6, 7], "speed": 0.1, next: true },
            "walk front": { "frames": [4, 9, 11, 13], "speed": 0.1, next: true },
            "walk back": { "frames": [18, 22, 19, 23], "speed": 0.1, next: true },
            "slash side": { "frames": [25, 2, 8, 17], "speed": 0.1, next: false },
            "slash front": { "frames": [14, 29, 30, 14], "speed": 0.1, next: false },
            "slash back": { "frames": [10, 31, 26, 20], "speed": 0.1, next: false },
            "dead side": { "frames": [21] },
            "dead front": { "frames": [16, 15], "speed": 0.1, next: false },
            "dead back": { "frames": [27, 24], "speed": 0.1, next: false },
            "dirtblock": { "frames": [28] },
            "spider": { "frames": [0] }
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
    }
}
//# sourceMappingURL=game.js.map