/*
    File Name:             Scene Instructions - TS|JS File
    Author:                Angelina Gutierrez
    Last Modified By:      Elaine Mae Villarino
    Last Modified Date:    Tuesday, December 06th, 2016
    Website Name:          COMP397 - Final Project
    Program Description:   JS file that contains the components that
                           are required to render the game's Instructions scene.
    Revision History:      Fix Comments
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Instructions = (function (_super) {
        __extends(Instructions, _super);
        // Instructions Class Contructor
        function Instructions() {
            _super.call(this);
        }
        // PUBLIC FUNCTIONS
        Instructions.prototype.start = function () {
            // Add objects to the scene
            console.log("Instructions scene started");
            // Create BG for scene and add to Game Scene container
            this._instructionbg = new createjs.Bitmap(assets.getResult("Instructions_BG"));
            this.addChild(this._instructionbg);
            // Buttons
            // -- Add PLAY/START Button to scene. Register for click callback function
            this._gameButton = new objects.Button("start", config.Screen.CENTER_X + 200, config.Screen.CENTER_Y + 100);
            this.addChild(this._gameButton);
            this._gameButton.on("click", this._startButtonClick, this);
            // -- Add Back Button to scene. Register for click callback function
            this._menuButton = new objects.Button("back", config.Screen.CENTER_X + 200, config.Screen.CENTER_Y + 50);
            this.addChild(this._menuButton);
            this._menuButton.on("click", this._menuButtonClick, this);
            // Add Instructions scene to main stage container.
            stage.addChild(this);
        };
        // Run on every tick
        Instructions.prototype.update = function () {
            // Update objects
        };
        // PRIVATE METHODS
        // -- Function for when PLAY/START button is pressed
        Instructions.prototype._startButtonClick = function (event) {
            // Change global scene variable to PLAY. Call global changeScene() function
            oxygen = 100;
            scene = config.Scene.PLAY;
            changeScene();
        };
        // -- Function for when Back button is pressed
        Instructions.prototype._menuButtonClick = function (event) {
            // Change global scene variable to MENU. Call global changeScene() function
            scene = config.Scene.MENU;
            changeScene();
        };
        return Instructions;
    }(objects.Scene));
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=instructions.js.map