var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Vector2 = (function (_super) {
        __extends(Vector2, _super);
        function Vector2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            _super.call(this, x, y);
        }
        // Add the current vector to a vector passed as an argument and return a new vector
        Vector2.prototype.add = function (otherVec) {
            return new objects.Vector2(this.x + otherVec.x, this.y + otherVec.y);
        };
        // Length of current vector
        Vector2.prototype.magnitude = function () {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        };
        // Normalized vector of the current vector. Represents direction vector with length = 1
        Vector2.prototype.normalize = function () {
            var mag = this.magnitude();
            return new objects.Vector2(this.x / mag, this.y / mag);
        };
        return Vector2;
    }(createjs.Point));
    objects.Vector2 = Vector2;
})(objects || (objects = {}));
//# sourceMappingURL=vector2.js.map