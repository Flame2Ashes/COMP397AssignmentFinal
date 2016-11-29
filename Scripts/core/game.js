/// <reference path = "_reference.ts" />
//Filename: game.ts CORE
//Author: Angelina Gutierrez
//Date modified: November 20th, 2016
// Global Variables
var assets;
var canvas;
var stage;
var spriteSheetLoader;
var snailAtlas;
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
    { id: "snailAtlas", src: "../../Assets/images/snailAtlas.png" },
    //Other
    { id: "floor", src: "../../Assets/images/ground.png" }
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
    //Create AtlasData
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