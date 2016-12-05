var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(imgString) {
            _super.call(this, imgString);
            this._isDug = false;
            this.start();
        }
        return Tile;
    }(objects.GameObject));
    objects.Tile = Tile;
})(objects || (objects = {}));
//# sourceMappingURL=tile.js.map