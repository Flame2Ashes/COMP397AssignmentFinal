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
            this.start();
        }
        Spider.prototype.start = function () {
            this._healthCount = 3;
        };
        Spider.prototype.update = function () {
        };
        Spider.prototype.getHit = function () {
            this._healthCount--;
            if (this._healthCount <= 0) {
                if (this._hasKey) {
                }
            }
        };
        return Spider;
    }(objects.GameObject));
    objects.Spider = Spider;
})(objects || (objects = {}));
//# sourceMappingURL=spider.js.map