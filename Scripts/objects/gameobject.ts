module objects {
    export class GameObject extends createjs.Sprite {
        private _width:number;
        private _height:number;
        private _name:string;
        private _position:objects.Vector2;

        // PUBLIC PROPERTIES
        get width() : number {
            return this._width
        }

        set width(w:number) {
            this._width = w;
        }

        get height() : number {
            return this._height
        }

        set height(h:number) {
            this._height = h;
        }

        get name() : string {
            return this._name;
        }

        set name(s:string) {
            this._name = s;
        }

        get position() : objects.Vector2 {
            return this._position
        }

        set position(p:objects.Vector2) {
            this._position = p;
        }

        constructor(imageString : string) {
            super(ratAtlas, imageString);

            this._initialize(imageString);
            this.start();
        }
        
        private _initialize(imageString:string):void {
            this.name = imageString;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
          //  this.regX = this.width * 0.5;
          //  this.regY = this.height * 0.5;
            this.position = new Vector2(this.x, this.y);
        }

        public start():void {}
        public update():void {
            this.x = this.position.x;
            this.y = this.position.y;
        }
    }
}