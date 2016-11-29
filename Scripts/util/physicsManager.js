var Util;
(function (Util) {
    var PhysicsManager = (function () {
        function PhysicsManager() {
        }
        PhysicsManager.prototype.distance = function (obj1, obj2) {
            return Math.sqrt(Math.pow(obj2.position.x - obj1.position.x, 2) + Math.pow(obj2.position.y - obj1.position.y, 2));
        };
        // Simple AABB collision
        PhysicsManager.prototype.isCollidingAABB = function (obj1, obj2) {
            if (obj1.x < obj2.x + obj2.getBounds().width &&
                obj1.x + obj1.getBounds().width > obj2.x &&
                obj1.y < obj2.y + obj2.getBounds().height &&
                obj1.y + obj1.getBounds().height > obj2.position.y) {
                return true;
            }
            else {
                return false;
            }
        };
        return PhysicsManager;
    }());
    Util.PhysicsManager = PhysicsManager;
})(Util || (Util = {}));
//# sourceMappingURL=physicsManager.js.map