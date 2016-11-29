module scenes {
    export class Play extends objects.Scene {

        private _bg : createjs.Bitmap;

        private _ground : createjs.Bitmap;
        private _player : objects.Player;

        private _lifeLabel : objects.Label;
        private _timeLabel : objects.Label;

        //Arrays for objects

        private _scrollableObjContainer : createjs.Container;

        private _scrollTrigger : number = 350;

        constructor() {
            super();
        }

        public start() : void {
            this._bg = new createjs.Bitmap(assets.getResult("Game_BG"));
            this._ground = new createjs.Bitmap(assets.getResult("floor"));
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player("idle");
            this._player.regX = 75;
            this._ground.y = 663;

            //Create labels
             this._lifeLabel = new objects.Label("Life: " + life, "40px Arial", "#ffffff", config.Screen.CENTER_X - 300, 50);

        

          
            //Scrollable Container. Make the thing scroll

            this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
            this._scrollableObjContainer.addChild(this._ground);



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
            if(controls.JUMP) {
                this._player.jump();
            }

            if(!controls.RIGHT && !controls.LEFT)
            {
                this._player.resetAcceleration();
                
            }


            if(!this._player.getIsGrounded())
                this._checkPlayerWithFloor();
                

              

               

         

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
                    controls.JUMP = true;
                    break;
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
                    controls.JUMP = false;
                    break;
            }
        }

        private _scrollBGForward(speed : number) : void{
            if(this._scrollableObjContainer.regX < config.Screen.WIDTH - 1200)
                this._scrollableObjContainer.regX = speed - 300;
        }

        private _checkPlayerWithFloor() : void {
            if(this._player.y+ this._player.getBounds().height > this._ground.y) {
                console.log("HIT GROUND");
                this._player.position.y = this._ground.y - this._player.getBounds().height - 20;
                this._player.setIsGrounded(true);
            }
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