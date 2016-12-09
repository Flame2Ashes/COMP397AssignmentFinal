/*
    File Name:             Scene GameOverLose - TS|JS File
    Author:                Angelina Gutierrez
    Last Modified By:      Elaine Mae Villarino
    Last Modified Date:    Thursday, December 08th, 2016
    Website Name:          COMP397 - Final Project
    Program Description:   JS file that contains the components that
                           are required to render the game's Scene GameOverLose.
                           Winning screen when player loses life
    Revision History:      Add Music and Sound Effects
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Gameover = (function (_super) {
        __extends(Gameover, _super);
        // Game Class Contructor
        function Gameover() {
            _super.call(this);
        }
        // PUBLIC FUNCTIONS
        Gameover.prototype.start = function () {
            // Add objects to the scene
            console.log("Game Over scene started");
            // Add and Play OVER (LOSE) Music
            createjs.Sound.stop();
            var bgStart = createjs.Sound.play("MUSE_LOSE");
            bgStart.play({ interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 1 });
            // Create BG for scene and add to Game Scene container
            this._gamebg = new createjs.Bitmap(assets.getResult("Menu_BG"));
            this._gamebg.alpha = 0.5;
            this.addChild(this._gamebg);
            // Add UI GOs to Scene
            // -- Print GAMEOVER Label to scene.
            this._gameOverLabel = new objects.Label("GAME OVER", "50px Arial", "#000000", config.Screen.CENTER_X, 75);
            this.addChild(this._gameOverLabel);
            // -- Print SCORE Label to scene.
            this._scoreLabel = new objects.Label("Score: " + score, "Bold 22px Arial", "#FFF", config.Screen.CENTER_X, 25);
            this._scoreLabel.outline = 2;
            this.addChild(this._scoreLabel);
            // Add button to scene. Register for click callback function
            // PlayAgain
            this._playButton = new objects.Button("back", config.Screen.CENTER_X - 100, 250);
            this.addChild(this._playButton);
            this._playButton.on("click", this._playAgainClick, this);
            // Add GameOverLose scene to global stage container
            stage.addChild(this);
        };
        // Run on every tick
        Gameover.prototype.update = function () {
            // Update objects
        };
        // PRIVATE METHODS
        // -- Function for when PLAY/START button is pressed
        Gameover.prototype._playAgainClick = function (event) {
            // Change global scene variable to PLAY. Call global changeScene() function
            scene = config.Scene.MENU;
            changeScene();
        };
        return Gameover;
    }(objects.Scene));
    scenes.Gameover = Gameover;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map