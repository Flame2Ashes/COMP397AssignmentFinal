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
    { id: "Game_BG", src: "../../Assets/images/gamebg.png" },
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
            [1, 1, 59, 31, 0, 0, 0],
            [1, 34, 45, 45, 0, 0, 0],
            [1, 81, 31, 37, 0, 0, 0],
            [62, 1, 58, 30, 0, 0, 0],
            [122, 1, 47, 28, 0, 0, 0],
            [171, 1, 40, 31, 0, 0, 0],
            [213, 1, 40, 31, 0, 0, 0],
            [255, 1, 39, 44, 0, 0, 0],
            [296, 1, 39, 39, 0, 0, 0],
            [337, 1, 38, 38, 0, 0, 0],
            [377, 1, 36, 40, 0, 0, 0],
            [48, 34, 32, 48, 0, 0, 0],
            [82, 33, 31, 46, 0, 0, 0],
            [34, 84, 37, 32, 0, 0, 0],
            [115, 33, 30, 47, 0, 0, 0],
            [147, 34, 31, 46, 0, 0, 0],
            [180, 34, 31, 38, 0, 0, 0],
            [213, 34, 31, 38, 0, 0, 0],
            [246, 47, 37, 31, 0, 0, 0],
            [180, 74, 36, 30, 0, 0, 0],
            [218, 74, 25, 20, 0, 0, 0],
            [245, 80, 35, 31, 0, 0, 0],
            [285, 47, 33, 31, 0, 0, 0],
            [282, 80, 35, 31, 0, 0, 0],
            [320, 42, 32, 35, 0, 0, 0],
            [354, 43, 35, 31, 0, 0, 0],
            [391, 43, 33, 31, 0, 0, 0],
            [73, 84, 34, 31, 0, 0, 0],
            [109, 82, 35, 30, 0, 0, 0],
            [146, 82, 31, 35, 0, 0, 0],
            [354, 76, 33, 31, 0, 0, 0],
            [389, 76, 33, 31, 0, 0, 0],
            [319, 80, 33, 31, 0, 0, 0] //32 - Rat - Idle front - frame 1
        ],
        "animations": {
            //Rat animations
            "idle side": { "frames": [13, 18], "speed": 0.1, next: true },
            "idle front": { "frames": [32] },
            "idle back": { frames: [2] },
            "walk side": { "frames": [21, 23], "speed": 0.1, next: true },
            "walk front": { "frames": [26, 27, 22, 31], "speed": 0.1, next: true },
            "walk back": { "frames": [24, 16, 29, 17], "speed": 0.1, next: true },
            "slash side": { "frames": [10, 3, 0, 13], "speed": 0.1, next: false },
            "slash front": { "frames": [31, 15, 14, 32], "speed": 0.1, next: false },
            "slash back": { "frames": [7, 11, 12, 2], "speed": 0.1, next: false },
            "dead side": { "frames": [28, 9], "speed": 0.1, next: false },
            "dead front": { "frames": [6, 25], "speed": 0.1, next: false },
            "dead back": { "frames": [7, 8], "speed": 0.1, next: false },
            "dirtblock": { "frames": [1] },
            "spider": { "frames": [4] },
            "key": { "frames": [20] }
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