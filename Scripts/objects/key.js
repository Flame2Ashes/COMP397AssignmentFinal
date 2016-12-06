var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Key = (function (_super) {
        __extends(Key, _super);
        function Key(imgString) {
            _super.call(this, imgString);
            this.start();
        }
        Key.prototype.update = function () {
        };
        Key.prototype.setPosition = function (position) {
            this.x = position.x;
            this.y = position.y;
        };
        return Key;
    }(objects.GameObject));
    objects.Key = Key;
})(objects || (objects = {}));
//# sourceMappingURL=key.js.map