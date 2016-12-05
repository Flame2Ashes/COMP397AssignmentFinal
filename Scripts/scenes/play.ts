module scenes {
    export class Play extends objects.Scene {

        private _bg : createjs.Bitmap;

        private _ground : createjs.Bitmap;
        private _player : objects.Player;
        private _dirtblock : objects.Tile;

        private _lifeLabel : objects.Label;
        private _timeLabel : objects.Label;
        private _hasKey : boolean = false;

        //Arrays for objects
        private levelArray : number[];

        private _w : number;
        private _h : number;

        private _scrollableObjContainer : createjs.Container;

        private _scrollTrigger : number = 350;

        constructor() {
            super();
        }

        public start() : void {
        //    this._bg = new createjs.Bitmap(assets.getResult("Game_BG"));
        //    this._ground = new createjs.Bitmap(assets.getResult("floor"));
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player("idle side");
            this._player.regX = this._player.width * 0.5;
            this._dirtblock = new objects.Tile("dirtblock");
            this._dirtblock.regX = this._dirtblock.width * 0.5;

            //Create labels
             this._lifeLabel = new objects.Label("Life: " + life, "40px Arial", "#ffffff", config.Screen.CENTER_X - 300, 50);

             //Create the level

             this.levelArray = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]    
                               ;
            
           
          
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
        }

        public update() : void {

            //Controls

            if(controls.LEFT) {
                this._player.moveLeft();
            }
            if(controls.RIGHT) { 
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
            if (this.checkCollision(this._player, this._dirtblock)) {
                this._scrollableObjContainer.removeChild(this._dirtblock);
             console.log("Hit dirtblock");
         }
            }

               

         if (this.checkCollision(this._player, this._dirtblock)) {
             console.log("Hit dirtblock");
         }

            this._player.update();

            if(this.checkScroll()) {
                this._scrollBGForward(this._player.position.x);
            }


        }

        private _onKeyDown(event: KeyboardEvent) : void {
             switch(event.keyCode) {
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

        private _onKeyUp(event : KeyboardEvent) : void {
            switch(event.keyCode) {
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

        private _scrollBGForward(speed : number) : void{
            if(this._scrollableObjContainer.regX < config.Screen.WIDTH - 1200)
                this._scrollableObjContainer.regX = speed - 300;
        }

        private checkScroll() : boolean {
            if(this._player.x >= this._scrollTrigger) {
                return true;
            }
            else {
                return false;
            }
        }

        private checkCollision(obj1 : objects.GameObject, obj2 : objects.GameObject) : boolean {

            if(obj2.x < obj1.x + obj1.getBounds().width &&
                obj2.x + obj2.getBounds().width > obj1.x &&
                obj2.y < obj1.y + obj1.getBounds().height &&
                obj2.y + obj2.getBounds().height > obj1.y - 10) {
                return true;
            }

            return false;
        }
    }
}