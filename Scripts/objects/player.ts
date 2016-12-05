module objects {
    export class Player extends objects.GameObject {

        private _maxSpeedX : number = 2;
        private _velocity : objects.Vector2;
        private _accelerationX : number;
        private _friction : number = -1;
        private _previousPositionX : number;
        private _previousPositionY : number;

        private _isDead : boolean = false;
        private _isDigging : boolean = false;
        private _isIdle : boolean = false;
        private _isMoving = false;
        private _isFacingUp : boolean = false;
        private _isFacingDown : boolean = false;
        private _isFacingLeft : boolean = false;
        private _isFacingRight : boolean = false;
        
        public isColliding : boolean = false;

        constructor(imgString : string) {
            super(imgString);
            this.start();
        }

        public start() : void {
            this._velocity = new objects.Vector2(0,0);
            this.position = new objects.Vector2(150, 0);
            this._accelerationX = 0;
        }

        public update() : void {


             super.update();
        }
        //TODO
        public moveLeft() : void {
            if (!this._isMoving) {
                this._isMoving = true;
                this._isIdle = false;
            }
            this._isFacingUp = false;
            this._isFacingDown = false;
            this._isFacingRight = false;
            if (!this._isFacingLeft) {
                this.scaleX = -1;
                 this.gotoAndPlay("walk side");
                this._isFacingLeft = true;
            }
                this._previousPositionX = this.position.x;
            this.position.x -= 1;
          /*  if (controls.DIG) {
                this.dig();
            }
           */
        }
        //TODO
        public moveRight() : void {
            if (!this._isMoving) {
                this._isMoving = true;
                this._isIdle = false;
            }
            this._isFacingUp = false;
            this._isFacingDown = false;
            this._isFacingLeft = false;
            if (!this._isFacingRight) {
                this.scaleX = 1;
                this.gotoAndPlay("walk side");
                this._isFacingRight = true;
                console.log("Look, Im moving right!");
            }
            this._previousPositionX = this.position.x;
            this.position.x += 1;
           
        }

        //Works
        public moveUp() : void {
            if (!this._isMoving) {
                this._isMoving = true;
                this._isIdle = false;
            }
            this._isFacingDown = false;
            this._isFacingLeft = false;
            this._isFacingRight = false;
            if (!this._isFacingUp) {
                this.gotoAndPlay("walk back");
                this._isFacingUp = true;
            }
            this._previousPositionY = this.position.y;
            this.position.y -= 1;
        }

        //Works
        public moveDown() : void {
            if (!this._isMoving) {
                this._isMoving = true;
                this._isIdle = false;
            }
            this._isFacingUp = false;
            this._isFacingLeft = false;
            this._isFacingRight = false;
                if(!this._isFacingDown) {
                    this.gotoAndPlay("walk front");
                    this._isFacingDown = true;
                }
            this._previousPositionY = this.position.y;
            this.position.y += 1;
           
        }

        public idle() : void {  
            if (this._isFacingUp) {
                this.gotoAndPlay("idle back");
                this._isMoving = false;
            }
            if (this._isFacingDown) {
                this.gotoAndPlay("idle front");
                this._isMoving = false;
            }
            if (this._isFacingLeft) {
                this.scaleX = -1;
                this.gotoAndPlay("idle side");
                this._isMoving = false;
            }
            if (this._isFacingRight) {
                this.scaleX = 1;
                this.gotoAndPlay("idle side");
                this._isMoving = false;
            }
            this._isIdle = true;
        }
    }
}
