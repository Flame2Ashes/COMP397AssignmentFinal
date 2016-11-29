module objects {
    export class Player extends objects.GameObject {
        private _gravity : number = 0.5;

        private _maxSpeedX : number = 5;
        private _velocity : objects.Vector2;
        private _accelerationX : number;
        private _jumpSpeed : number = 0.1;
        private _friction : number = -1;

        private _isDead : boolean = false;
        private _isGrounded : boolean = false;
        private _isJumping : boolean = false;
        private _isOnLeaf : boolean = false;
        
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
            // Acceleration \
            // Velocity
            this._velocity.x += this._accelerationX;
            this._velocity.y += this._gravity;
            // Position
            this.position.x += this._velocity.x;
            this.position.y += this._velocity.y;


            if(this._isGrounded) {
                this._friction = 0.75;
                this._velocity.y = 0;
                this._gravity = 0;
            }
            else {
                this._gravity = 0.5;
            }

             if (this._isOnLeaf) {
                
                this._friction = 0.75;
                this._velocity.y = 0;
                this._gravity = 0;
            }
            

            if (this._velocity.x > 0) {
                this.gotoAndPlay("moving");
                this.scaleX = 1;
            }
            else if (this._velocity.x < 0) {
                this.gotoAndPlay("moving");
                this.scaleX = -1;
            }
            else {
                this.gotoAndPlay("idle");
            }


            
            // AccelerationX affects Velocity.x

            // Gravity affects Velocity.y
            // MaxSpeed caps Velocity.x
            if(Math.abs(this._velocity.x) < this._maxSpeedX) {
                this._velocity.x += this._accelerationX;
            }

            this._velocity.x *= this._friction;
            this.position.x += this._velocity.x;

            
            this.position.y += this._velocity.y + this._gravity;

       //     console.log("Position" + this.position + " Vel: " + this._velocity + " Acc: " + this._accelerationX);
            super.update();
        }

        public getVelocity() : objects.Vector2 {
            return this._velocity;
        }

        public setVelocity(newVelocity : objects.Vector2) {
            this._velocity = newVelocity;
        }

        public getIsGrounded() : boolean {
            return this._isGrounded;
        }

        public setIsGrounded(b : boolean) : void {
            this._isGrounded = b;
        }

        public getIsOnLeaf() : boolean {
            return this._isOnLeaf;
        }

        public setIsOnLeaf(b : boolean) : void {
            this._isOnLeaf = b;
        }

        public moveRight() : void {
            this._accelerationX += 0.05;
        }
        public moveLeft() : void {
            this._accelerationX += -0.05;
        }
        public resetAcceleration() : void {
            this._accelerationX = 0;
            
        }
        public jump() : void {

            if (this._isGrounded) {
            this.setIsGrounded(false);
            this._velocity.y = -10;
            this._isJumping = true;
            }
            if (this._isOnLeaf) {
                this.setIsOnLeaf(false);
                this._velocity.y = -10;
                this._isJumping = true;
            }
            
        }
    }
}
