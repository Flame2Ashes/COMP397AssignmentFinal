/// <reference path = "_reference.ts" />

//Filename: game.ts CORE
//Author: Angelina Gutierrez
//Date modified: November 20th, 2016

// Global Variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;

var spriteSheetLoader : createjs.SpriteSheetLoader;
var ratAtlas : createjs.SpriteSheet;


var currentScene : objects.Scene;
var scene: number;

var life : number = 100;


// Preload Assets required
var assetData:objects.Asset[] = [
    //Backgro1unds
    {id: "Game_BG", src: "../../Assets/images/gamebg.png"},
    {id: "Menu_BG", src: "../../Assets/images/Menu_BG.png"},
    {id: "Instructions_BG", src: "../../Assets/images/instructionsbg.png"},
    //Buttons
    {id: "start", src: "../../Assets/images/start.png"},
    {id: "instructions", src: "../Assets/images/instructions.png"},
    {id: "playAgain", src: "../../Assets/images/playAgain.png"},
    {id: "back", src: "../../Assets/images/back.png"},
    //Spritesheet
    //TODO: Import Atlas Data
    {id: "ratAtlas", src: "../../Assets/images/ratAtlas.png"},
    //Other
    {id: "floor", src: "../../Assets/images/ground.png"},

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

   let atlasData = {
       "images": [
           assets.getResult("ratAtlas")
       ],

       "frames": [
            [1, 1, 47, 28, 0, 0, 0],  // 0 - SPIDER
            [50, 1, 36, 30, 0, 0, 0], // 1 - Rat - idle (side) frame 1
            [88, 1, 58, 30, 0, 0, 0], // 2 - Rat - slash (side) frame 2
            [148, 1, 35, 30, 0, 0, 0],// 3 - Rat - ??????
            [185, 1, 33, 31, 0, 0, 0],// 4 - Rat - walk (front) frame 1
            [220, 1, 35, 31, 0, 0, 0],// 5 - Rat - walk (side) frame 3
            [1, 31, 35, 31, 0, 0, 0], // 6 - Rat - idle (side) frame 2
            [38, 33, 37, 31, 0, 0, 0],// 7 - Rat - idle (side) frame 3
            [77, 33, 59, 31, 0, 0, 0],// 8 - Rat - slash (side) frame 3
            [138, 33, 33, 31, 0, 0, 0],// 9 - Rat - walk (front) frame 2
            [173, 34, 40, 31, 0, 0, 0],// 10 - Rat - slash (back) frame 1
            [215, 34, 34, 31, 0, 0, 0],// 11 - Rat - walk (front) frame 3
            [1, 64, 33, 31, 0, 0, 0], // 12 - Rat (Don't use)
            [36, 66, 33, 31, 0, 0, 0],// 13 - Rat - walk (front) frame 4
            [71, 66, 33, 31, 0, 0, 0],// 14 - Rat - idle (front) frame 1
            [106, 66, 35, 31, 0, 0, 0],// 15 - Rat - Dead (front) frame 2
            [143, 67, 40, 31, 0, 0, 0],// 16 - Rat - Dead (front) frame 1
            [185, 67, 37, 32, 0, 0, 0],// 17 - Rat - idle (side) frame 4
            [224, 67, 31, 35, 0, 0, 0],// 18 - Rat - walk (back) frame 2
            [1, 97, 32, 35, 0, 0, 0],// 19 - Rat - walk (back) frame 4
            [35, 99, 31, 37, 0, 0, 0], // 20 - Rat - idle (back) frame 1
            [68, 99, 38, 38, 0, 0, 0],// 21 - Rat - dead (side) frame 1
            [108, 99, 31, 38, 0, 0, 0],// 22 - Rat - walk (back) frame 3
            [141, 100, 31, 38, 0, 0, 0], // 23 - Rat - walk (back) frame 4
            [174, 101, 39, 39, 0, 0, 0],// 24 - Rat - dead (back) frame 2 
            [215, 104, 36, 40, 0, 0, 0],// 25 - Rat - slash (side) frame 1
            [1, 134, 31, 46, 0, 0, 0], // 26 - Rat - slash (back) frame 3
            [34, 139, 39, 44, 0, 0, 0],// 27 - Rat - dead (back) frame 1
            [75, 139, 45, 45, 0, 0, 0], // 28 - DIRTBLOCK
            [122, 140, 31, 46, 0, 0, 0],// 29 - Rat - slash (front) frame 2
            [155, 142, 30, 47, 0, 0, 0],// 30 - Rat - slash (front) frame 3
            [187, 146, 32, 48, 0, 0, 0] // 31 - Rat - slash (back) frame 2
        ],

        "animations": {
            //Rat animations
            "idle side": { "frames": [17, 1, 6, 7, 6, 1], "speed": 0.1, next: true},
            "idle front": {"frames": [14]},
            "idle back": {frames: [20]},
            "walk side": {"frames": [5, 17, 6, 7], "speed": 0.1, next: true},
            "walk front": {"frames":[4, 9, 11, 13], "speed": 0.1, next: true},
            "walk back": {"frames":[18, 22, 19, 23], "speed": 0.1, next: true},
            "slash side": {"frames":[25, 2, 8, 17], "speed": 0.1, next: false},
            "slash front": {"frames": [14, 29, 30, 14], "speed": 0.1, next: false},
            "slash back" : {"frames": [10, 31, 26, 20], "speed": 0.1, next: false},
            "dead side" : {"frames": [21]},
            "dead front": {"frames": [16, 15], "speed": 0.1, next: false},
            "dead back": {"frames": [27, 24], "speed": 0.1, next: false},
            "dirtblock": {"frames": [28]},
            "spider": {"frames": [0]}            
                }
   }

   //Assign to ratAtlas

   ratAtlas = new createjs.SpriteSheet(atlasData);
  

    scene = config.Scene.MENU;
    changeScene();
}

function gameLoop(event: createjs.Event): void {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}

function changeScene() : void {
    
    // Simple state machine pattern to define scene swapping.
    switch(scene)
    {
        case config.Scene.MENU :
            stage.removeAllChildren();
            currentScene = new scenes.Menu();;
            console.log("Starting MENU scene");
            break;
     case config.Scene.PLAY :
            stage.removeAllChildren();
            currentScene = new scenes.Play();
            console.log("Starting GAME scene");
            break;

        case config.Scene.INSTRUCTIONS :
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting INSTRUCTIONS scene");
            break;

        case config.Scene.GAMEOVER :
            stage.removeAllChildren();
            currentScene = new scenes.Gameover();
            console.log("Starting GAMEOVER scene");
            break;
        case config.Scene.GAMEOVERWIN :
            stage.removeAllChildren();
            currentScene = new scenes.Gameoverwin();
            console.log("Starting GAMEOVERWIN scene");
    }
    
}