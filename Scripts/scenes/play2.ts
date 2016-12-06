/*
	File Name:             Scene Menu - TS|JS File 
	Author:                Angelina Gutierrez
    Last Modified By:      Elaine Mae Villarino 
	Last Modified Date:    Tuesday, December 06th, 2016
	Website Name:          COMP397 - Final Project
	Program Description:   JS file that contains the components that 
                           are required to render the game's Menu scene.
    Revision History:      Add label and comments
*/

module scenes {
    export class Play2 extends objects.Scene {

        // PRIVATE VARIABLES

        private _bg: createjs.Bitmap;

        private _ground: createjs.Bitmap;
        private _player: objects.Player;
        private _dirtblock: objects.Tile;

        private _scoreLabel: objects.Label;
        private _lifeLabel: objects.Label;
        private _timeLabel: objects.Label;
        private _keyLabel: objects.Label;
        private _hasKey: boolean = false;
        private _spider: objects.Spider;

        private _key: objects.Key;

        //Arrays for objects
        private levelArray: objects.Tile[];


        private _w: number;
        private _h: number;
        private _num: number;

        private _scrollableObjContainer: createjs.Container;

        private _scrollTrigger: number = 350;

        // Game Class Contructor
        constructor() {
            super();
        }

        // PUBLIC FUNCTIONS
        public start(): void {
            // Add objects to the scene
            
            // Start Game Music 
            //createjs.Sound.stop();
            //var bgAll = createjs.Sound.play("MUSE_Game");
            //bgAll.play({ interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.25 });

            // Create BG for scene and add to Game Scene container
            this._bg = new createjs.Bitmap(assets.getResult("Game_BG"));
            this.addChild(this._bg);
            //    this._ground = new createjs.Bitmap(assets.getResult("floor"));

            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player("idle side");
            this._player.regX = this._player.width * 0.5;
            this._dirtblock = new objects.Tile("dirtblock");
            this._dirtblock.regX = this._dirtblock.width * 0.5;
            this._dirtblock.regY = this._dirtblock.height * 0.5;
            this.levelArray = [];
             this._player.setPosition(new objects.Vector2(100, 200));


            this._spider = new objects.Spider("spider");
            this._spider.setHasKey(true);
            this._spider.setPosition(new objects.Vector2(300, 300));

            this._key = new objects.Key("key");

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

            // Create the level
            for (var i = 0; i <= 20; i++) {
                for (var j = 0; j <= 20; j++) {

                    var tile = new objects.Tile("dirtblock");
                    var x = i * 45;
                    var y = j * 45;
                    tile.setPosition(new objects.Vector2(x, y));
                    this.levelArray.push(tile);
                    this._scrollableObjContainer.addChild(tile);
                }
            }

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
        }

        // Run on every tick
        public update(): void {
            
            oxygen -= 0.01;
            this._lifeLabel.text = "Life: " + Math.floor(oxygen);
            this._scoreLabel.text = "Score: " + score;
            
            // Controls

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

            if (controls.DIG) {
                this._player.dig();
                for (let i in this.levelArray)
                    if (this.checkCollision(this._player, this.levelArray[i])) {
                        this._scrollableObjContainer.removeChild(this.levelArray[i]);
                        this._num = Math.floor(Math.random() * 100) + 1;
                        this.getBonus(this._num);
                    }
                if (this.checkCollision(this._player, this._spider)) {
                    this._spider.getHit();
                    if (this._spider._healthCount <= 0) {
                        this._key.setPosition(new objects.Vector2(this._spider.position.x, this._spider.position.y));
                        this._scrollableObjContainer.removeChild(this._spider);
                        this._scrollableObjContainer.addChild(this._key);
                    }
                }

            }

            if (this.checkCollision(this._player, this._key)) {
                this._hasKey = true;
                score = score + 500;
                console.log(score);
                this._scrollableObjContainer.removeChild(this._key);
                //this._keyLabel.text = "Key: Found!" 
                //Go to next level
                
                scene = config.Scene.GAMEOVERWIN;
                changeScene();
            }

            //
            if(oxygen <= 0)
            {
                scene = config.Scene.GAMEOVER;
                changeScene();
            }


            //TODO
            if (this.checkCollision(this._player, this._dirtblock)) {

            }

            this._player.update();

            if (this.checkScroll()) {
                this._scrollBGForward(this._player.position.x);
            }


        }

        // PRIVATE METHODS
        // -- Function for when PLAY/START button is pressed
        private _onKeyDown(event: KeyboardEvent): void {
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
        }

        private _onKeyUp(event: KeyboardEvent): void {
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
        }

        private _scrollBGForward(speed: number): void {
            if (this._scrollableObjContainer.regX < config.Screen.WIDTH)
                this._scrollableObjContainer.regX = speed - 300;
        }

        private checkScroll(): boolean {
            if (this._player.x >= this._scrollTrigger) {
                return true;
            }
            else {
                return false;
            }
        }

        private checkCollision(obj1: objects.GameObject, obj2: objects.GameObject): boolean {

            if (obj2.x < obj1.x + obj1.getBounds().width &&
                obj2.x + obj2.getBounds().width > obj1.x &&
                obj2.y < obj1.y + obj1.getBounds().height &&
                obj2.y + obj2.getBounds().height > obj1.y - 45) {
                return true;
            }

            return false;
        }

        private getBonus(num: number) {
            if (num == 1) {
                console.log("Coin");
            }
            if (num == 100) {
                console.log("Air");
            }
            else {
                console.log("Nothing");
            }
        }

    }
}
