module objects {
    export class Player extends objects.GameObject {

        private _maxSpeedX: number = 2;
        private _velocity: objects.Vector2;
        private _accelerationX: number;
        private _friction: number = -1;
        private _previousPositionX: number;
        private _previousPositionY: number;

        private _isDead: boolean = false;
        private _isDigging: boolean = false;
        private _isIdle: boolean = false;
        private _isMoving = false;
        private _isFacingUp: boolean = false;
        private _isFacingDown: boolean = false;
        private _isFacingLeft: boolean = false;
        private _isFacingRight: boolean = false;

        public isColliding: boolean = false;

        constructor(imgString: string) {
            super(imgString);
            this.start();
        }

        public start(): void {
            this._velocity = new objects.Vector2(0, 0);
            this.position = new objects.Vector2(150, 0);
            this._accelerationX = 0;
        }

        public update(): void {

            super.update();
        }

        public setPosition(position : objects.Vector2) {
                this.x = position.x;
            this.y = position.y;
        }
        public moveLeft(): void {
            if (!this._isMoving) {
                this._isMoving = true;
                this._isIdle = false;
            }
            this._isFacingUp = false;
            this._isFacingDown = false;
            this._isFacingRight = false;
            if (!this._isFacingLeft || this._isDigging) {
                this.scaleX = -1;
                this._isFacingLeft = true;
                this._isDigging = false;
                this.gotoAndPlay("walk side");
                
            }
            this._previousPositionX = this.position.x;
            this.position.x--;
        }
        public moveRight(): void {
            if (!this._isMoving) {
                this._isMoving = true;
                this._isIdle = false;
            }
            this._isFacingUp = false;
            this._isFacingDown = false;
            this._isFacingLeft = false;
            if (!this._isFacingRight || this._isDigging) {
                this.scaleX = 1;
                this._isFacingRight = true;
                this._isDigging = false;     
                this.gotoAndPlay("walk side");
            }
            this._previousPositionX = this.position.x;
            this.position.x++;

        }

        //Works
        public moveUp(): void {
            if (!this._isMoving) {
                this._isMoving = true;
                this._isIdle = false;
                
            }
            this._isFacingDown = false;
            this._isFacingLeft = false;
            this._isFacingRight = false;
            if (!this._isFacingUp || this._isDigging) {
                this._isFacingUp = true;
                this._isDigging = false;
                this.gotoAndPlay("walk back");
            }
            this._previousPositionY = this.position.y;
            this.position.y--;
        }

        //Works
        public moveDown(): void {
            if (!this._isMoving) {
                this._isMoving = true;
                this._isIdle = false;
            }
            this._isFacingUp = false;
            this._isFacingLeft = false;
            this._isFacingRight = false;
            if (!this._isFacingDown || this._isDigging) {
                
                this._isFacingDown = true;
                this._isDigging = false;
                this.gotoAndPlay("walk front");
            }
            this._previousPositionY = this.position.y;
            this.position.y++;

        }

        public idle(): void {
            if (!this._isIdle) {
                this._isIdle = true;
                this._isMoving = false;
            }
            if (this._isFacingUp) {
                this.gotoAndPlay("idle back");
                
            }
            if (this._isFacingDown) {
                this.gotoAndPlay("idle front");
            }
            if (this._isFacingLeft) {
                this.scaleX = -1;
                this.gotoAndPlay("idle side");
            }
            if (this._isFacingRight) {
                this.scaleX = 1;
                this.gotoAndPlay("idle side");
            }
        }

        public dig(): void {
            this._isMoving = false;
            this._isIdle = false;
            if (this._isFacingUp) {
                this.gotoAndPlay("slash back");
                this._isDigging = true;              
            }
            if (this._isFacingDown) {
                this.gotoAndPlay("slash front");
                this._isDigging = true;
            }
            if (this._isFacingLeft || this._isFacingRight) {
                this.gotoAndPlay("slash side");
                this._isDigging = true;
                
            }
        }
    }
}
