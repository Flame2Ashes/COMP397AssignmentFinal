var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(imgString) {
            _super.call(this, imgString);
            this._gravity = 0.5;
            this._maxSpeedX = 5;
            this._jumpSpeed = 0.1;
            this._friction = -1;
            this._isDead = false;
            this._isGrounded = false;
            this._isJumping = false;
            this._isOnLeaf = false;
            this.isColliding = false;
            this.start();
        }
        Player.prototype.start = function () {
            this._velocity = new objects.Vector2(0, 0);
            this.position = new objects.Vector2(150, 0);
            this._accelerationX = 0;
        };
        Player.prototype.update = function () {
            // Acceleration \
            // Velocity
            this._velocity.x += this._accelerationX;
            this._velocity.y += this._gravity;
            // Position
            this.position.x += this._velocity.x;
            this.position.y += this._velocity.y;
            if (this._isGrounded) {
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
            if (Math.abs(this._velocity.x) < this._maxSpeedX) {
                this._velocity.x += this._accelerationX;
            }
            this._velocity.x *= this._friction;
            this.position.x += this._velocity.x;
            this.position.y += this._velocity.y + this._gravity;
            //     console.log("Position" + this.position + " Vel: " + this._velocity + " Acc: " + this._accelerationX);
            _super.prototype.update.call(this);
        };
        Player.prototype.getVelocity = function () {
            return this._velocity;
        };
        Player.prototype.setVelocity = function (newVelocity) {
            this._velocity = newVelocity;
        };
        Player.prototype.getIsGrounded = function () {
            return this._isGrounded;
        };
        Player.prototype.setIsGrounded = function (b) {
            this._isGrounded = b;
        };
        Player.prototype.getIsOnLeaf = function () {
            return this._isOnLeaf;
        };
        Player.prototype.setIsOnLeaf = function (b) {
            this._isOnLeaf = b;
        };
        Player.prototype.moveRight = function () {
            this._accelerationX += 0.05;
        };
        Player.prototype.moveLeft = function () {
            this._accelerationX += -0.05;
        };
        Player.prototype.resetAcceleration = function () {
            this._accelerationX = 0;
        };
        Player.prototype.jump = function () {
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
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map