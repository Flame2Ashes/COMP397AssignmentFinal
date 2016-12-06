var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Coin = (function (_super) {
        __extends(Coin, _super);
        function Coin(imgString) {
            _super.call(this, imgString);
            this.start();
        }
        Coin.prototype.update = function () {
        };
        Coin.prototype.setPosition = function (position) {
            this.x = position.x;
            this.y = position.y;
        };
        Coin.prototype.addPoints = function () {
            score += 10;
        };
        return Coin;
    }(objects.GameObject));
    objects.Coin = Coin;
})(objects || (objects = {}));
//# sourceMappingURL=coin.js.map