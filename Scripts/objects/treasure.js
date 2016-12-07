var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Treasure = (function (_super) {
        __extends(Treasure, _super);
        function Treasure(imgString) {
            _super.call(this, imgString);
            this.start();
        }
        Treasure.prototype.update = function () {
        };
        Treasure.prototype.setPosition = function (position) {
            this.x = position.x;
            this.y = position.y;
        };
        Treasure.prototype.getPosition = function () {
            return new objects.Vector2(this.x, this.y);
        };
        return Treasure;
    }(objects.GameObject));
    objects.Treasure = Treasure;
})(objects || (objects = {}));
//# sourceMappingURL=treasure.js.map