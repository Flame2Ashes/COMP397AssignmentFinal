var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Air = (function (_super) {
        __extends(Air, _super);
        function Air(imgString) {
            _super.call(this, imgString);
            this.start();
        }
        Air.prototype.update = function () {
        };
        Air.prototype.setPosition = function (position) {
            this.x = position.x;
            this.y = position.y;
        };
        Air.prototype.addAir = function () {
            oxygen += 10;
        };
        return Air;
    }(objects.GameObject));
    objects.Air = Air;
})(objects || (objects = {}));
//# sourceMappingURL=air.js.map