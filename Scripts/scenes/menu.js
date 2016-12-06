/*
    File Name:             Scene Menu - TS|JS File
    Author:                Angelina Gutierrez
    Last Modified By:      Elaine Mae Villarino
    Last Modified Date:    Tuesday, December 06th, 2016
    Website Name:          COMP397 - Final Project
    Program Description:   JS file that contains the components that
                           are required to render the game's Menu scene.
    Revision History:      Actually implement Menu scene
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // Menu Class Contructor
        function Menu() {
            _super.call(this);
        }
        // PUBLIC FUNCTIONS
        Menu.prototype.start = function () {
            // Add objects to the scene
            console.log("Menu Scene Started");
            // Create BG for scene and add to Game Scene container
            this._menuBG = new createjs.Bitmap(assets.getResult("Menu_BG"));
            this._menuBG.alpha = 0.85;
            this.addChild(this._menuBG);
            // Add button to scene. Register for click callback function
            //Start button
            this._gameButton = new objects.Button("start", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 100);
            this.addChild(this._gameButton);
            this._gameButton.on("click", this._startButtonClick, this);
            //Instructions button
            this._instructionButton = new objects.Button("instructions", config.Screen.CENTER_X + 200, config.Screen.CENTER_Y + 100);
            this.addChild(this._instructionButton);
            this._instructionButton.on("click", this._instructionButtonClick, this);
            // Add menu scene to global stage container
            stage.addChild(this);
        };
        // Run on every tick
        Menu.prototype.update = function () {
            // Update objects
        };
        // PRIVATE METHODS
        // -- Function for when PLAY/START button is pressed
        Menu.prototype._startButtonClick = function (event) {
            // Change global scene variable to PLAY. Call global changeScene() function
            oxygen = 100;
            scene = config.Scene.PLAY;
            changeScene();
        };
        // -- Function for when INSTRUCTION button is pressed
        Menu.prototype._instructionButtonClick = function (event) {
            // Change global scene variable to INSTRUCTIONS. Call global changeScene() function
            scene = config.Scene.INSTRUCTIONS;
            changeScene();
        };
        return Menu;
    }(objects.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
//# sourceMappingURL=menu.js.map