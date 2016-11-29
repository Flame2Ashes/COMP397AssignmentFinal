//Winning screen when player touches the sign
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Gameoverwin = (function (_super) {
        __extends(Gameoverwin, _super);
        function Gameoverwin() {
            _super.call(this);
        }
        Gameoverwin.prototype.start = function () {
            console.log("Game Over scene started");
            //Background
            this._gamebg = new createjs.Bitmap(assets.getResult("Menu_BG"));
            this._gamebg.alpha = 0.5;
            this.addChild(this._gamebg);
            //Labels
            this._gameOverLabel = new objects.Label("YOU WIN!", "100px Arial", "#000000", config.Screen.CENTER_X, 75);
            this.addChild(this._gameOverLabel);
            //Button
            this._playButton = new objects.Button("playAgain", config.Screen.CENTER_X - 100, 350);
            this.addChild(this._playButton);
            this._playButton.on("click", this._playAgainClick, this);
            stage.addChild(this);
        };
        Gameoverwin.prototype._playAgainClick = function (event) {
            ///Send to menu
            scene = config.Scene.MENU;
            changeScene();
        };
        return Gameoverwin;
    }(objects.Scene));
    scenes.Gameoverwin = Gameoverwin;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameoverwin.js.map