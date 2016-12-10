/// <reference path = "_reference.ts" />

/*
	File Name:             Core Game - TS|JS File 
	Author:                Angelina Gutierrez
    Last Modified By:      Elaine Mae Villarino 
	Last Modified Date:    Saturday, December 10th, 2016
	Website Name:          COMP397 - Final Project
	Program Description:   JS file that contains the components that 
                           are required to render the game's Core game.
    Revision History:      Add Play3 Scene
*/

// Global Variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;

var spriteSheetLoader: createjs.SpriteSheetLoader;
var ratAtlas: createjs.SpriteSheet;


var currentScene: objects.Scene;
var scene: number;

var oxygen: number = 100;
var score: number = 0;

var levelReached: string = "";
var levelLooped: number = 0;
var collectedCoin: number = 0;
var collectedOxygen: number = 0;

// Preload Assets required
var assetData: objects.Asset[] = [
    //Music
    { id: "MUSE_GAME", src: "../../Assets/audio/KagerouDays.mp3" },
    { id: "MUSE_LOSE", src: "../../Assets/audio/DonutHole.mp3" },
    { id: "FX_WIN", src: "../../Assets/audio/Melt.mp3" },
    { id: "FX_COIN", src: "../../Assets/audio/Coins.mp3" },
    { id: "FX_OXYGEN", src: "../../Assets/audio/Swoosh.mp3" },
    { id: "FX_KEYS", src: "../../Assets/audio/Keys.mp3" },
    { id: "FX_SPIDER", src: "../../Assets/audio/Spider.mp3" },
    { id: "FX_CHEST", src: "../../Assets/audio/ChestOpen.mp3" },
    //Backgrounds
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
    { id: "floor", src: "../../Assets/images/ground.png" }
];

function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    assets.installPlugin(createjs.Sound);

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
            [1, 1, 80, 65, 0, 0, 0], //0 - Treasure
            [83, 1, 39, 44, 0, 0, 0], //1 - Rat - Slash back - Frame 1
            [83, 47, 32, 48, 0, 0, 0], //2 - Rat - Slash back - Frame 2
            [1, 68, 45, 45, 0, 0, 0], //3 - Dirtblock
            [48, 68, 31, 46, 0, 0, 0], //4 - Rat - Slash back - Frame 3
            [1, 115, 39, 39, 0, 0, 0], //5 - Rat - Dead back - Frame 2
            [81, 97, 38, 38, 0, 0, 0], //6 - Rat - Dead side - Frame 2
            [42, 116, 36, 40, 0, 0, 0], //7 - Rat - Slash side - Frame 1
            [1, 156, 31, 46, 0, 0, 0], //8 - Rat - Slash front - Frame 2
            [80, 137, 30, 47, 0, 0, 0], //9 - Rat - Slash front - Frame 3
            [34, 158, 37, 36, 0, -3, -5], //10 - Coin
            [73, 186, 47, 28, 0, 0, 0], //11 - Spider
            [34, 196, 37, 32, 0, 0, 0], //12 - Rat - Idle side - Frame 1
            [1, 204, 31, 38, 0, 0, 0], //13 - Rat - Walk back - Frame 2
            [73, 216, 40, 31, 0, 0, 0], //14 - Rat - Dead back - Frame 1
            [34, 230, 31, 38, 0, 0, 0], //15 - Rat - Walk back - Frame 4
            [1, 244, 31, 37, 0, 0, 0], //16 - Rat - Idle back - Frame 1
            [67, 249, 58, 30, 0, 0, 0], //17 - Rat - Slash side - Frame 2
            [34, 270, 31, 37, 0, -8, -5], //18 - Bubble
            [1, 283, 31, 35, 0, 0, 0], //19 - Rat - Walk back - Frame 1
            [67, 281, 40, 31, 0, 0, 0], //20 - Rat - Dead Front - Frame 1
            [34, 309, 25, 14, 0, 0, -3], //21 - Key
            [61, 314, 59, 31, 0, 0, 0], //22 - Rat - Slash side - Frame 3
            [1, 325, 37, 31, 0, 0, 0], //23 - Rat - Idle side - Frame 2
            [40, 347, 32, 35, 0, 0, 0], //24 - Rat - Walk back - Frame 3
            [1, 358, 35, 31, 0, 0, 0], //25 - Rat - Walk side - Frame 1
            [74, 347, 35, 31, 0, 0, 0], //26 - Rat - Walk side - Frame 2
            [74, 380, 35, 31, 0, 0, 0], //27 - Rat - Dead Front - Frame 2
            [38, 384, 34, 31, 0, 0, 0], //28 - Rat - Walk Front - Frame 3
            [1, 391, 35, 30, 0, 0, 0], //29 - Rat - Dead side - Frame 1
            [74, 413, 36, 30, 0, 0, 0], //30 - Rat - ??????
            [38, 417, 33, 31, 0, 0, 0], //31 - Rat - Walk Front - Frame 1
            [73, 445, 33, 31, 0, 0, 0], //32 - Rat - Walk Front - Frame 2
            [1, 423, 33, 31, 0, 0, 0], //33 - Rat - Walk Front - Frame 4
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
    }

    //Assign to ratAtlas

    ratAtlas = new createjs.SpriteSheet(atlasData);


    // Add and Play Intro Music
    createjs.Sound.stop();
    var bgStart = createjs.Sound.play("MUSE_GAME");
    bgStart.play({ interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 1 });

    scene = config.Scene.MENU;
    changeScene();
}

function gameLoop(event: createjs.Event): void {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}

function changeScene(): void {

    // Simple state machine pattern to define scene swapping.
    switch (scene) {
        case config.Scene.MENU:
            stage.removeAllChildren();
            currentScene = new scenes.Menu();;
            console.log("Starting MENU scene");
            break;
        case config.Scene.INSTRUCTIONS:
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting INSTRUCTIONS scene");
            break;
        case config.Scene.PLAY:
            stage.removeAllChildren();
            currentScene = new scenes.Play();
            console.log("Starting GAME scene");
            break;
        case config.Scene.PLAY2:
            stage.removeAllChildren();
            currentScene = new scenes.Play2();
            console.log("Starting second level");
            break;
        case config.Scene.PLAY3:
            stage.removeAllChildren();
            currentScene = new scenes.Play3();
            console.log("Starting third level");
            break;
        case config.Scene.GAMEOVER:
            stage.removeAllChildren();
            currentScene = new scenes.Gameover();
            console.log("Starting GAMEOVERLOSE scene");
            break;
        case config.Scene.GAMEOVERWIN:
            stage.removeAllChildren();
            currentScene = new scenes.Gameoverwin();
            console.log("Starting GAMEOVERWIN scene");
            break;
    }
}


/**
 * 
 * FULL SCREEN MAGIC 
 * 
 * */

// Full Screen Error Event handler
function errorHandler() {
    alert('mozfullscreenerror');
}
document.documentElement.addEventListener('mozfullscreenerror', errorHandler, false);

// Toggle Full Screen
function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

// Check if browser is already in full screen
function checkFullScreen() {
    if ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
        console.log("Yes");

    } else {
        console.log("No");
        toggleFullScreen();
    }
}

// Add bonus Keydown Event Handler
document.addEventListener('keydown', function (e) {
    // Toggle Full Screen with F Key
    if (e.keyCode == 70) {
        checkFullScreen();
    }
}, false);

/**
 * 
 * HIGH SCORING MAGIC 
 * 
 * */
// Check for Local Storage
function isLocalStorageWorking() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    }
    catch (e) {
        return false;
    }
}
// Show if localStorage works 
if (isLocalStorageWorking()) {
    // Working = YES
    document.getElementById("localStorageCheck").style.color = "#00FF00";
}
else {
    // Working = NO 
    document.getElementById("localStorageCheck").style.color = "#FF0000";
    // So Create Fake localStorage var to not Throw Error
    localStorage = [];
}