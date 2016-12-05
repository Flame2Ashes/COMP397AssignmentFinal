module objects {
    export class Tile extends objects.GameObject {
        private _isDug : boolean = false;

        constructor(imgString : string) {
            super(imgString);
            this.start();
            
        }
    }
}