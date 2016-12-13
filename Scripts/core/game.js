/// <reference path = "_reference.ts" />
/*
    File Name:             Core Game - TS|JS File
    Author:                Angelina Gutierrez
    Last Modified By:      Elaine Mae Villarino
    Last Modified Date:    Monday, December 12th, 2016
    Website Name:          COMP397 - Final Project
    Program Description:   JS file that contains the components that
                           are required to render the game's Core game.
    Revision History:      Add Secret Modal
*/
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
var levelReached = "";
var levelLooped = 0;
var collectedCoin = 0;
var collectedOxygen = 0;
// Preload Assets required
var assetData = [
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
    { id: "Paused_BG", src: "../../Assets/images/Paused_BG.png" },
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
    // Add and Play Intro Music
    createjs.Sound.stop();
    var bgStart = createjs.Sound.play("MUSE_GAME");
    bgStart.play({ interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 1 });
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
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
        else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        }
        else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
    else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}
// Check if browser is already in full screen
function checkFullScreen() {
    if ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
        console.log("Yes");
    }
    else {
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
/*!
 * Konami Code and the Secret Modal
 */
// Set up our array of needed keys, and variables.
neededKeys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], started = false, count = 0;
$(document).keydown(function (e) {
    key = e.keyCode;
    // Set Started to True only if the first key of the Konami sequence is pressed
    if (!started) {
        if (key == 38) {
            started = true;
        }
    }
    // If Started is true, 
    // check and follow the the following key presses to make sure it is the right order.
    if (started) {
        if (neededKeys[count] == key) {
            // Good so far.
            count++;
        }
        else {
            // Uh-Oh! Oops, made a mistake! 
            // Reset the count and allow another chance 
            reset();
        }
        if (count == 10) {
            // DING DING DING! WINNER! We made it! 
            // Successfully completed the Konami Sequence~
            // Give the winner their prize!
            // Get the html id 'modalIn' and insert the html modal.
            document.getElementById('modalIn').innerHTML = '<div class="modal fade" id="secretModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' + '<div class="modal-dialog" role="document">' + '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<h4 class="modal-title">COMP397 - Final Project Dig Rat Credits</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<p>The COMP397 - Final Project Dig Rat was developed to showcase a 2D Maze Side Scolling Classic Arcade Game using CreateJS suite. The game has a Menu Screen, Instructions screen, 3 Game-Level Screens, and two Game-Over screens. A scoring system is also be included; plus the use of the Browser LocalStorage to save High Scores locally. Upon starting the game, the browser is fullscreened; this is done through the HTML5 FullScreen API. </p>' +
                '<h5>Game Overview:</h5>' +
                '<p>Tired of the city-life, Remy our adventure seeking rat decided to go out and strike rich with treasure hunting! Wielding his trusty titanium shovel, Remy commences his digging through the mounds of dirt. He knows there’s treasure to be found, buried deep deep deep underground. Being the cunning rat, he knows that the treasure needs a golden key to open it. But oh no! The treasure is guarded by the venomous red-eyed spiders! Surely, one of these icky spiders have the key! Thank goodness he brought a titanium shovel to kill them. Before Remy’s air runs out or the spider bites him three times, find the key and get to the treasure!</p>' +
                '<h5>Credited Developers:</h5>' +
                '<ul class="list-group">' +
                '<li class="list-group-item">Angelina Gutierrez <span class="tag tag-default tag-pill pull-xs-right">300742235</span></li>' +
                '<li class="list-group-item">Elaine Mae Villarino <span class="tag tag-default tag-pill pull-xs-right">300749230</span></li>' +
                '<li class="list-group-item">Professor Wallace Balaniuc <span class="tag tag-default tag-pill pull-xs-right">The Judge/Professor</span></li>' +
                '</ul>' +
                '<br><p style="text-align:center">Years Active: November 2016-ONGOING</p>' +
                '<br><p style="text-align:center"><img src="../../Assets/images/AGEV-logo.png" class="img-fluid" alt="AGEV Logo" title="AGEV Logo" style="width:7em; margin-left: auto; margin-right: auto;"><img src="../../Assets/images/thankyouCat.gif" class="img-fluid" alt="Animated Image of Cat Saying Thank You by Pusheen Corp" title="Animated Image of Cat Saying Thank You by Pusheen Corp" style="width:7em; margin-left: auto; margin-right: auto;"></p>';
            '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>' +
                '</div>' +
                '</div><!-- /.modal-content -->' +
                '</div><!-- /.modal-dialog -->';
            '</div><!-- /.modal -->';
            // Open the Modal
            $("#secretModal").modal();
            // Once the Modal is closed..
            //		Get the html id 'modalIn' and remove the html modal
            $('#secretModal').on('hidden.bs.modal', function (e) {
                // Reset! So we can do it all again~
                document.getElementById('modalIn').innerHTML = '';
                reset();
            });
        }
    }
    else {
        // Uh-Oh! Wrong start key! 
        // Reset the count and allow another chance 
        reset();
    }
});
// Call on the function to Reset us back to the start.
function reset() {
    started = false;
    count = 0;
    return;
}
//# sourceMappingURL=game.js.map