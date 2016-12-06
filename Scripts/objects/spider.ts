module objects {
    export class Spider extends objects.GameObject {

        private _isDead : boolean = false;
        public _healthCount : number;
        private _keyChance : number;
        private _hasKey : boolean;

          constructor(imgString: string) {
            super(imgString);
            this.start();
        }

        public start() : void {
            this._healthCount = 3;
        }

        public update() : void {

        }

        public getHit() : void {
            this._healthCount--;
        }

          public setPosition(position : objects.Vector2) {
            this.x = position.x;
            this.y = position.y;
        }

        public setHasKey(hasKey : boolean) {
            this._hasKey = hasKey;
        }



    }
}