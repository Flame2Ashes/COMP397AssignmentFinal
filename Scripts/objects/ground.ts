module objects {
    export class Ground extends objects.GameObject {

        private defaultPosition : objects.Vector2;

        constructor() {
            super("floor");

            this.defaultPosition = new objects.Vector2(0, 663);
            this.position = this.defaultPosition;
        }
    }
}