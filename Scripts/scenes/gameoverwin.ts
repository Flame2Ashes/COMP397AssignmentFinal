//Winning screen when player touches the sign

module scenes {
    export class Gameoverwin extends objects.Scene {
        //PRIVATE VARIABLES

        private _gamebg : createjs.Bitmap;
        private _playButton : objects.Button;
        private _scoreLabel : objects.Label;
        private _gameOverLabel : objects.Label;

        constructor() {
            super();
        }

        public start() : void {
            console.log("Game Over scene started");
        
            //Background
            this._gamebg = new createjs.Bitmap(assets.getResult("Menu_BG"));
            this._gamebg.alpha = 0.5;
            this.addChild(this._gamebg);

            //Labels

            this._gameOverLabel = new objects.Label("YOU WIN!", "100px Arial", "#000000", config.Screen.CENTER_X, 75);
            this.addChild(this._gameOverLabel);

            //Button

            this._playButton = new objects.Button("playAgain", config.Screen.CENTER_X - 100, 350);
            this.addChild(this._playButton);
            this._playButton.on("click", this._playAgainClick, this);

            stage.addChild(this);
            
        }

         private _playAgainClick(event : createjs.MouseEvent) {
            ///Send to menu
           
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}