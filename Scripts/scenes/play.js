/*
    File Name:             Scene Play 1 - TS|JS File
    Author:                Angelina Gutierrez
    Last Modified By:      Elaine Mae Villarino
    Last Modified Date:    Monday, December 12th, 2016
    Website Name:          COMP397 - Final Project
    Program Description:   JS file that contains the components that
                           are required to render the game's Menu scene.
    Revision History:      Add Pause Control
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        // Game Class Contructor
        function Play() {
            _super.call(this);
            this._hasKey = false;
            this._scrollTrigger = 350;
        }
        // PUBLIC FUNCTIONS
        Play.prototype.start = function () {
            // Add objects to the scene
            // Create BG for scene and add to Game Scene container
            // -- Game BG
            this._bg = new createjs.Bitmap(assets.getResult("Game_BG"));
            this.addChild(this._bg);
            // -- Pause BG
            this._pauseBG = new createjs.Bitmap(assets.getResult("Paused_BG"));
            //    this._ground = new createjs.Bitmap(assets.getResult("floor"));
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player("idle side");
            this._player.regX = this._player.width * 0.5;
            this._dirtblock = new objects.Tile("dirtblock");
            this._dirtblock.regX = this._dirtblock.width * 0.5;
            this._dirtblock.regY = this._dirtblock.height * 0.5;
            this._player.setPosition(new objects.Vector2(100, 200));
            this._spider = new objects.Spider("spider");
            this._spider.setHasKey(true);
            this._spider.setPosition(new objects.Vector2(300, 300));
            this._key = new objects.Key("key");
            this._treasure = new objects.Treasure("treasure");
            this._treasure.setPosition(new objects.Vector2(250, 100));
            // Add UI GOs to Scene
            // -- Print LIFE Label to scene.
            this._lifeLabel = new objects.Label("Life: " + oxygen, "Bold 22px Arial", "#FFF", config.Screen.CENTER_X - 165, 25);
            this._lifeLabel.outline = 2;
            // -- Print SCORE Label to scene.
            this._scoreLabel = new objects.Label("Score: " + score, "Bold 22px Arial", "#FFF", config.Screen.CENTER_X, 25);
            this._scoreLabel.outline = 2;
            // -- Print KEY Label to scene.
            this._keyLabel = new objects.Label("Key: Nope!", "Bold 22px Arial", "#FFF", config.Screen.CENTER_X + 150, 25);
            this._keyLabel.outline = 2;
            this.levelArray = [];
            //Bury dat treasure (Place before level tiles)
            this._scrollableObjContainer.addChild(this._treasure);
            // Create the level
            for (var i = 0; i <= 10; i++) {
                this.levelArray[i] = [];
                for (var j = 0; j <= 10; j++) {
                    var tile = new objects.Tile("dirtblock");
                    var x = i * 45;
                    var y = j * 45;
                    tile.setPosition(new objects.Vector2(x, y));
                    this.levelArray[i][j] = tile;
                    this._scrollableObjContainer.addChild(this.levelArray[i][j]);
                }
            }
            //Remove these tiles at player start
            this._scrollableObjContainer.removeChild(this.levelArray[3][0]);
            this.levelArray[3][0] = null;
            this._scrollableObjContainer.removeChild(this.levelArray[3][1]);
            this.levelArray[3][1] = null;
            // Scrollable Container. Make the thing scroll
            //this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
            this._scrollableObjContainer.addChild(this._spider);
            //this._scrollableObjContainer.addChild(this._ground);
            this.addChild(this._scrollableObjContainer);
            // Add labels last
            this.addChild(this._lifeLabel);
            this.addChild(this._scoreLabel);
            this.addChild(this._keyLabel);
            // Start Listening for Player Keyboard Actions
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            // Add game scene to global stage container
            stage.addChild(this);
        };
        // Run on every tick
        Play.prototype.update = function () {
            if (!controls.PAUSE) {
                this.removeChild(this._pauseBG);
                oxygen -= 0.01;
                this._lifeLabel.text = "Life: " + Math.floor(oxygen);
                this._scoreLabel.text = "Score: " + score;
                // Controls
                if (controls.LEFT) {
                    var arrayIndexX = Math.floor((this._player.x - (this._player.width / 2)) / 45);
                    var arrayIndexY = Math.floor(this._player.y / 45);
                    if (this.levelArray[arrayIndexX][arrayIndexY] == null) {
                        this._player.moveLeft();
                        this._digOffset = new objects.Vector2(-20, 0);
                    }
                }
                if (controls.RIGHT) {
                    var arrayIndexX = Math.floor((this._player.x + (this._player.width / 2)) / 45);
                    var arrayIndexY = Math.floor(this._player.y / 45);
                    if (this.levelArray[arrayIndexX][arrayIndexY] == null) {
                        this._player.moveRight();
                        this._digOffset = new objects.Vector2(20, 0);
                    }
                }
                if (controls.UP) {
                    var arrayIndexX = Math.floor((this._player.x / 45));
                    var arrayIndexY = Math.floor((this._player.y - (this._player.height / 2)) / 45);
                    if (this.levelArray[arrayIndexX][arrayIndexY] == null) {
                        this._player.moveUp();
                        this._digOffset = new objects.Vector2(0, -20);
                    }
                }
                if (controls.DOWN) {
                    var arrayIndexX = Math.floor((this._player.x / 45));
                    var arrayIndexY = Math.floor((this._player.y + (this._player.height / 2)) / 45);
                    if (this.levelArray[arrayIndexX][arrayIndexY] == null) {
                        this._player.moveDown();
                        this._digOffset = new objects.Vector2(0, 20);
                    }
                }
                if (controls.DIG) {
                    this._player.dig();
                    var x = Math.floor((this._player.x + this._digOffset.x) / 45);
                    var y = Math.floor((this._player.y + this._digOffset.y) / 45);
                    console.log("tile at index is " + [x][y]);
                    var tile = this.levelArray[x][y];
                    console.log("PLS REMOVE");
                    this._scrollableObjContainer.removeChild(this.levelArray[x][y]);
                    this.levelArray[x][y] = null;
                    this._num = Math.floor(Math.random() * 100) + 1;
                    if (this._num == 1) {
                        // Add and Play Coin Sound Effect
                        var fxCoin = createjs.Sound.play("FX_COIN");
                        fxCoin.play({ interrupt: createjs.Sound.INTERRUPT_NONE, loop: 1, volume: 1 });
                        score += 100;
                        collectedCoin++;
                    }
                    if (this._num == 100) {
                        // Add and Play Oxygen Sound Effect
                        var fxOxygen = createjs.Sound.play("FX_OXYGEN");
                        fxOxygen.play({ interrupt: createjs.Sound.INTERRUPT_NONE, loop: 2, volume: 1 });
                        oxygen += 10;
                        collectedOxygen++;
                    }
                    if (this.checkCollision(this._player, this._spider)) {
                        // Add and Play Spider Sound Effect
                        if (this._spider != null) {
                            var fxSpider = createjs.Sound.play("FX_SPIDER");
                            fxSpider.play({ interrupt: createjs.Sound.INTERRUPT_NONE, loop: 0, volume: 1 });
                        }
                        this._spider.getHit();
                        if (this._spider._healthCount <= 0) {
                            this._key.setPosition(this._spider.getPosition());
                            this._scrollableObjContainer.removeChild(this._spider);
                            this._scrollableObjContainer.addChild(this._key);
                            this._spider = null;
                        }
                    }
                }
                if (this._key != null && this.checkCollision(this._player, this._key)) {
                    // Add and Play Key Sound Effect
                    var fxKeys = createjs.Sound.play("FX_KEYS");
                    fxKeys.play({ interrupt: createjs.Sound.INTERRUPT_NONE, loop: 0, volume: 1 });
                    score = score + 500;
                    console.log(score);
                    this._hasKey = true;
                    this._scrollableObjContainer.removeChild(this._key);
                    this._key = null;
                    this._keyLabel.text = "Key: Found!";
                }
                if (this.checkCollision(this._player, this._treasure) && this._hasKey) {
                    // Add and Play Chest Sound Effect
                    var fxChest = createjs.Sound.play("FX_CHEST");
                    fxChest.play({ interrupt: createjs.Sound.INTERRUPT_NONE, loop: 1, volume: 1 });
                    //Go to next level
                    oxygen = 50;
                    scene = config.Scene.PLAY2;
                    changeScene();
                }
                //
                if (oxygen <= 0) {
                    scene = config.Scene.GAMEOVER;
                    changeScene();
                }
                this._player.update();
                if (this.checkScroll()) {
                    this._scrollBGForward(this._player.position.x);
                }
            }
            else {
                this.addChild(this._pauseBG);
            }
        };
        // PRIVATE METHODS
        // -- Function for when PLAY/START button is pressed
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
                case keys.P:
                    console.log("P key pressed");
                    if (controls.PAUSE == true) {
                        controls.PAUSE = false;
                    }
                    else {
                        controls.PAUSE = true;
                    }
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
            if (this._scrollableObjContainer.regX < config.Screen.WIDTH)
                this._scrollableObjContainer.regX = speed - 300;
            else {
                this._scrollableObjContainer.regX = speed + 300;
            }
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
                obj2.y + obj2.getBounds().height > obj1.y - 45) {
                return true;
            }
            return false;
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map