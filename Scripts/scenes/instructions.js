//Instructions scene
//Source file: instructions.ts
//Author name: Angelina Gutierrez
//Last modified: November 20th 2016
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Instructions = (function (_super) {
        __extends(Instructions, _super);
        function Instructions() {
            _super.call(this);
        }
        Instructions.prototype.start = function () {
            console.log("Instructions scene started");
            //Add the background
            this._instructionbg = new createjs.Bitmap(assets.getResult("Instructions_BG"));
            this.addChild(this._instructionbg);
            //Buttons
            //Start game
            this._gameButton = new objects.Button("start", config.Screen.CENTER_X - 300, config.Screen.CENTER_Y + 175);
            this.addChild(this._gameButton);
            this._gameButton.on("click", this._startButtonClick, this);
            //Back to menu
            this._menuButton = new objects.Button("back", config.Screen.CENTER_X + 250, config.Screen.CENTER_Y + 175);
            this.addChild(this._menuButton);
            this._menuButton.on("click", this._menuButtonClick, this);
            stage.addChild(this);
        };
        Instructions.prototype._startButtonClick = function (event) {
            oxygen = 100;
            scene = config.Scene.PLAY;
            changeScene();
        };
        Instructions.prototype._menuButtonClick = function (event) {
            scene = config.Scene.MENU;
            changeScene();
        };
        return Instructions;
    }(objects.Scene));
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=instructions.js.map