//Instructions scene
//Source file: instructions.ts
//Author name: Angelina Gutierrez
//Last modified: November 20th 2016

module scenes {
    export class Instructions extends objects.Scene {
        
        private _instructionbg : createjs.Bitmap;
        private _gameButton : objects.Button;
        private _menuButton : objects.Button;

        constructor() {
            super();
        }

        public start() : void {
            console.log("Instructions scene started");

            //Add the background

            this._instructionbg = new createjs.Bitmap(assets.getResult("Instructions_BG"));
            this.addChild(this._instructionbg);

            //Buttons
            //Start game
            this._gameButton = new objects.Button("start", config.Screen.CENTER_X - 300, config.Screen.CENTER_Y + 175);
            this.addChild(this._gameButton);
            this._gameButton.on("click", this._startButtonClick, this);
            
            //Back to menu

            this._menuButton = new objects.Button("back", config.Screen.CENTER_X + 250, config.Screen.CENTER_Y + 175);
            this.addChild(this._menuButton);
            this._menuButton.on("click", this._menuButtonClick, this);

            stage.addChild(this);
        }

            private _startButtonClick(event : createjs.MouseEvent) {
            life = 100;
            scene = config.Scene.PLAY;
            changeScene();
        }
            private _menuButtonClick(event : createjs.MouseEvent) {
                scene = config.Scene.MENU;
                changeScene();
            }
    }
}