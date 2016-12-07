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
            this._maxSpeedX = 2;
            this._friction = -1;
            this._isDead = false;
            this._isDigging = false;
            this._isIdle = false;
            this._isMoving = false;
            this._isFacingUp = false;
            this._isFacingDown = false;
            this._isFacingLeft = false;
            this._isFacingRight = false;
            this.isColliding = false;
            this.start();
        }
        Player.prototype.start = function () {
            this._velocity = new objects.Vector2(0, 0);
            this.position = new objects.Vector2(150, 0);
            this._accelerationX = 0;
        };
        Player.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        Player.prototype.setPosition = function (position) {
            this.x = position.x;
            this.y = position.y;
        };
        Player.prototype.moveLeft = function () {
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
        };
        Player.prototype.moveRight = function () {
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
        };
        //Works
        Player.prototype.moveUp = function () {
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
        };
        //Works
        Player.prototype.moveDown = function () {
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
        };
        Player.prototype.idle = function () {
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
        };
        Player.prototype.dig = function () {
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
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map