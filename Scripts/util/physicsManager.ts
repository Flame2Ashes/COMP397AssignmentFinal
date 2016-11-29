module Util {
    export class PhysicsManager {
        public distance(obj1 : objects.GameObject, obj2 : objects.GameObject) : number {
            return Math.sqrt(Math.pow(obj2.position.x - obj1.position.x, 2) + Math.pow(obj2.position.y - obj1.position.y, 2));
        }

        // Simple AABB collision
        public isCollidingAABB(obj1 : objects.GameObject, obj2 : objects.GameObject) : boolean {
            if(obj1.x < obj2.x + obj2.getBounds().width &&
                    obj1.x + obj1.getBounds().width > obj2.x && 
                    obj1.y < obj2.y + obj2.getBounds().height && 
                    obj1.y + obj1.getBounds().height > obj2.position.y) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}