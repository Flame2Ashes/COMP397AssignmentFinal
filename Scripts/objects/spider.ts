module objects {
    export class Spider extends objects.GameObject {

        private _isDead: boolean = false;
        private _keyChance: number;
        private _hasKey: boolean;
        private _counter: number;
        private _isIncreasing: boolean = false;
        
        public _healthCount: number;

        constructor(imgString: string) {
            super(imgString);
            this.start();
        }

        public start(): void {
            this._healthCount = 3;
            this._counter = 0;
        }

        public update(): void {
            super.update();
        }

        public getHit(): void {
            this._healthCount--;
        }

        public setPosition(position: objects.Vector2) {
            this.x = position.x;
            this.y = position.y;
        }

        public getPosition(): objects.Vector2 {
            return new objects.Vector2(this.x, this.y);
        }

        public setHasKey(hasKey: boolean) {
            this._hasKey = hasKey;
        }
    }
}