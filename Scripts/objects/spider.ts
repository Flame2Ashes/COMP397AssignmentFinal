module objects {
    export class Spider extends objects.GameObject {

        private _isDead : boolean = false;
        private _healthCount : number;
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
            if (this._healthCount <= 0) {
                if (this._hasKey) {
                    
                }
            }
        }



    }
}