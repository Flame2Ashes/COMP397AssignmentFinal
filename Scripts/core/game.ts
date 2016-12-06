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

var oxygen : number = 100;
var score : number = 0;


// Preload Assets required
var assetData:objects.Asset[] = [
    //Backgro1unds
    {id: "Game_BG", src: "../../Assets/images/Game_BG.png"},
    {id: "Menu_BG", src: "../../Assets/images/Menu_BG.png"},
    {id: "Instructions_BG", src: "../../Assets/images/Instruction_BG.png"},
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
    [1, 1, 59, 31, 0, 0, 0], //0 - Rat - Slash side - frame 3
    [1, 34, 45, 45, 0, 0, 0], //1 - Dirtblock
    [1, 81, 31, 37, 0, 0, 0], //2 - Rat - Idle back - frame 1
    [62, 1, 58, 30, 0, 0, 0], //3 - Rat - Slash side - frame 2
    [122, 1, 47, 28, 0, 0, 0], //4 - Spider
    [171, 1, 40, 31, 0, 0, 0], //5 - ???????????
    [213, 1, 40, 31, 0, 0, 0], //6 - Rat - Dead front - frame 1
    [255, 1, 39, 44, 0, 0, 0], //7 - Rat - Dead back - frame 1
    [296, 1, 39, 39, 0, 0, 0], //8 - Rat - Dead back - frame 2
    [337, 1, 38, 38, 0, 0, 0], //9 - Rat - Dead side - frame 2
    [377, 1, 36, 40, 0, 0, 0], //10 - Rat - Slash side - frame 1
    [48, 34, 32, 48, 0, 0, 0], //11 - Rat - Slash back - frame 2
    [82, 33, 31, 46, 0, 0, 0], //12 - Rat - Slash back - frame 3
    [34, 84, 37, 32, 0, 0, 0], //13 - Rat - Idle side - frame 1 
    [115, 33, 30, 47, 0, 0, 0], //14 - Rat - Slash front - Frame 3
    [147, 34, 31, 46, 0, 0, 0], //15 - Rat - Slash front - Frame 2
    [180, 34, 31, 38, 0, 0, 0], //16 - Rat - Walk back - frame 2
    [213, 34, 31, 38, 0, 0, 0], // 17 - Rat - Walk back - frame 4
    [246, 47, 37, 31, 0, 0, 0], //18 - Rat - Idle side - frame 2
    [180, 74, 36, 30, 0, 0, 0], // 19 - DO NOT USE
    [218, 74, 25, 20, 0, 0, 0], // 20 - Key
    [245, 80, 35, 31, 0, 0, 0], //21 - Rat - Walk side - frame 1
    [285, 47, 33, 31, 0, 0, 0], //22 - Rat - Walk front - frame 3
    [282, 80, 35, 31, 0, 0, 0], //23 - Rat - Walk side - frame 2
    [320, 42, 32, 35, 0, 0, 0], //24 - Rat - Walk back - frame 1
    [354, 43, 35, 31, 0, 0, 0], //25 - Rat - Dead front - frame 2
    [391, 43, 33, 31, 0, 0, 0], //26 - Rat - Walk front - frame 1
    [73, 84, 34, 31, 0, 0, 0], //27 - Rat - Walk front - frame 2
    [109, 82, 35, 30, 0, 0, 0], //28 - Rat - Dead side - frame 1
    [146, 82, 31, 35, 0, 0, 0], //29 - Rat - Walk back - frame 3
    [354, 76, 33, 31, 0, 0, 0], //30 - DO NOT USE
    [389, 76, 33, 31, 0, 0, 0], //31 - Rat - Walk front - frame 4
    [319, 80, 33, 31, 0, 0, 0] //32 - Rat - Idle front - frame 1
        ],

        "animations": {
            //Rat animations
            "idle side": { "frames": [13, 18], "speed": 0.1, next: true},
            "idle front": {"frames": [32]},
            "idle back": {frames: [2]},
            "walk side": {"frames": [21, 23], "speed": 0.1, next: true},
            "walk front": {"frames":[26, 27, 22, 31], "speed": 0.1, next: true},
            "walk back": {"frames":[24, 16, 29, 17], "speed": 0.1, next: true},
            "slash side": {"frames":[10, 3, 0, 13], "speed": 0.1, next: false},
            "slash front": {"frames": [31, 15, 14, 32], "speed": 0.1, next: false},
            "slash back" : {"frames": [7, 11, 12, 2], "speed": 0.1, next: false},
            "dead side" : {"frames": [28, 9], "speed": 0.1, next: false},
            "dead front": {"frames": [6, 25], "speed": 0.1, next: false},
            "dead back": {"frames": [7, 8], "speed": 0.1, next: false},
            "dirtblock": {"frames": [1]},
            "spider": {"frames": [4]},
            "key": {"frames": [20]}            
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
            break;
        case config.Scene.PLAY2 :
            stage.removeAllChildren();
            currentScene = new scenes.Play2();
            console.log("Starting second level");
            break;
    }
    
}