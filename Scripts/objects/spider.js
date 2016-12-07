var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Spider = (function (_super) {
        __extends(Spider, _super);
        function Spider(imgString) {
            _super.call(this, imgString);
            this._isDead = false;
            this._isIncreasing = false;
            this.start();
        }
        Spider.prototype.start = function () {
            this._healthCount = 3;
            this._counter = 0;
        };
        Spider.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        Spider.prototype.getHit = function () {
            this._healthCount--;
        };
        Spider.prototype.setPosition = function (position) {
            this.x = position.x;
            this.y = position.y;
        };
        Spider.prototype.getPosition = function () {
            return new objects.Vector2(this.x, this.y);
        };
        Spider.prototype.setHasKey = function (hasKey) {
            this._hasKey = hasKey;
        };
        return Spider;
    }(objects.GameObject));
    objects.Spider = Spider;
})(objects || (objects = {}));
//# sourceMappingURL=spider.js.map