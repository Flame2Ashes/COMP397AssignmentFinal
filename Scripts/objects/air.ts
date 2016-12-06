module objects {
    export class Air extends objects.GameObject {

        constructor(imgString : string) {
            super(imgString);
            this.start();
            
        }

        public update() : void {

        }
        
        public setPosition(position : objects.Vector2) {
            this.x = position.x;
            this.y = position.y;
        }

        public addAir() : void {
            oxygen += 10;
        }
        }

    }
