/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//Source file: menu.ts
//Author name: Angelina Gutierrez
//Last modified: November 20th 2016
var scenes;
(function (scenes) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // Menu Class Contructor
        function Menu() {
            _super.call(this);
        }
        Menu.prototype.start = function () {
            console.log("Menu Scene Started");
            //Add the background
            this._menuBG = new createjs.Bitmap(assets.getResult("Menu_BG"));
            this._menuBG.alpha = 0.7;
            this.addChild(this._menuBG);
            // Add button to scene. Register for click callback function
            //Start button
            this._gameButton = new objects.Button("start", config.Screen.CENTER_X - 350, config.Screen.CENTER_Y + 125);
            this.addChild(this._gameButton);
            this._gameButton.on("click", this._startButtonClick, this);
            //Instructions button
            this._instructionButton = new objects.Button("instructions", config.Screen.CENTER_X + 250, config.Screen.CENTER_Y + 100);
            this.addChild(this._instructionButton);
            this._instructionButton.on("click", this._instructionButtonClick, this);
            // Add menu scene to global stage container
            stage.addChild(this);
        };
        Menu.prototype.update = function () {
        };
        // Fucntion for when button is pressed
        Menu.prototype._startButtonClick = function (event) {
            // Change global scene variable to GAME. Call global changeScene() function
            life = 100;
            scene = config.Scene.PLAY;
            changeScene();
        };
        Menu.prototype._instructionButtonClick = function (event) {
            scene = config.Scene.INSTRUCTIONS;
            changeScene();
        };
        return Menu;
    }(objects.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
//# sourceMappingURL=menu.js.map