var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.call(this);
            this._scrollTrigger = 350;
        }
        Play.prototype.start = function () {
            //    this._bg = new createjs.Bitmap(assets.getResult("Game_BG"));
            //    this._ground = new createjs.Bitmap(assets.getResult("floor"));
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player("idle side");
            this._player.regX = this._player.width * 0.5;
            this._dirtblock = new objects.Tile("dirtblock");
            //Create labels
            this._lifeLabel = new objects.Label("Life: " + life, "40px Arial", "#ffffff", config.Screen.CENTER_X - 300, 50);
            //Create the level
            this.levelArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            //Scrollable Container. Make the thing scroll
            //     this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
            //      this._scrollableObjContainer.addChild(this._ground);
            this._scrollableObjContainer.addChild(this._dirtblock);
            this.addChild(this._scrollableObjContainer);
            //Add labels last
            this.addChild(this._lifeLabel);
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            //createjs.Sound.play("theme");
            stage.addChild(this);
        };
        Play.prototype.update = function () {
            //Controls
            if (controls.LEFT) {
                this._player.moveLeft();
            }
            if (controls.RIGHT) {
                this._player.moveRight();
            }
            if (controls.UP) {
                this._player.moveUp();
            }
            if (controls.DOWN) {
                this._player.moveDown();
            }
            else if (!controls.LEFT && !controls.RIGHT && !controls.UP && !controls.DOWN) {
                this._player.idle();
            }
            if (this.checkCollision(this._player, this._dirtblock)) {
                console.log("Hit dirtblock");
                this._player.position.x += 0;
                this._player.position.y += 0;
            }
            this._player.update();
            if (this.checkScroll()) {
                this._scrollBGForward(this._player.position.x);
            }
        };
        Play.prototype._onKeyDown = function (event) {
            switch (event.keyCode) {
                case keys.W:
                    console.log("W key pressed");
                    controls.UP = true;
                    break;
                case keys.S:
                    console.log("S key pressed");
                    controls.DOWN = true;
                    break;
                case keys.A:
                    console.log("A key pressed");
                    controls.LEFT = true;
                    break;
                case keys.D:
                    console.log("D key pressed");
                    controls.RIGHT = true;
                    break;
                case keys.SPACE:
                    console.log("Space key pressed");
                    controls.DIG = true;
            }
        };
        Play.prototype._onKeyUp = function (event) {
            switch (event.keyCode) {
                case keys.W:
                    controls.UP = false;
                    break;
                case keys.S:
                    controls.DOWN = false;
                    break;
                case keys.A:
                    controls.LEFT = false;
                    break;
                case keys.D:
                    controls.RIGHT = false;
                    break;
                case keys.SPACE:
                    controls.DIG = false;
            }
        };
        Play.prototype._scrollBGForward = function (speed) {
            if (this._scrollableObjContainer.regX < config.Screen.WIDTH - 1200)
                this._scrollableObjContainer.regX = speed - 300;
        };
        Play.prototype.checkScroll = function () {
            if (this._player.x >= this._scrollTrigger) {
                return true;
            }
            else {
                return false;
            }
        };
        Play.prototype.checkCollision = function (obj1, obj2) {
            if (obj2.x < obj1.x + obj1.getBounds().width &&
                obj2.x + obj2.getBounds().width > obj1.x &&
                obj2.y < obj1.y + obj1.getBounds().height &&
                obj2.y + obj2.getBounds().height > obj1.y - 10) {
                return true;
            }
            return false;
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map