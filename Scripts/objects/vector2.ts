module objects {
    export class Vector2 extends createjs.Point {
        constructor(x:number = 0, y:number = 0) {
            super(x,y);
        }

        // Add the current vector to a vector passed as an argument and return a new vector
        public add(otherVec : objects.Vector2) { 
            return new objects.Vector2(this.x + otherVec.x, this.y + otherVec.y);
        }

        // Length of current vector
        public magnitude() : number {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }

        // Normalized vector of the current vector. Represents direction vector with length = 1
        public normalize() : objects.Vector2 {
            var mag = this.magnitude();
            return new objects.Vector2(this.x / mag, this.y / mag);
        }
    } 
}