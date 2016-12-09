/*
	File Name:             Scene GameOverWin - TS|JS File 
	Author:                Angelina Gutierrez
    Last Modified By:      Elaine Mae Villarino 
	Last Modified Date:    Thursday, December 08th, 2016
	Website Name:          COMP397 - Final Project
	Program Description:   JS file that contains the components that 
                           are required to render the game's Scene GameOverWin.
                           Winning screen when player touches the chest
    Revision History:      Add Music and Sound Effects
*/

module scenes {
    export class Gameoverwin extends objects.Scene {

        //PRIVATE VARIABLES

        private _gamebg: createjs.Bitmap;
        private _playButton: objects.Button;
        private _scoreLabel: objects.Label;
        private _gameOverLabel: objects.Label;

        // Game Class Contructor
        constructor() {
            super();
        }

        // PUBLIC FUNCTIONS
        public start(): void {
            // Add objects to the scene
            console.log("Game Over scene started");

            // Add and Play OVER (WIN) Music
            createjs.Sound.stop();
            var bgStart = createjs.Sound.play("MUSE_WIN");
            bgStart.play({ interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 1 });

            // Create BG for scene and add to Game Scene container
            this._gamebg = new createjs.Bitmap(assets.getResult("Menu_BG"));
            this._gamebg.alpha = 0.5;
            this.addChild(this._gamebg);

            // Add UI GOs to Scene
            // -- Print GAMEOVER Label to scene.
            this._gameOverLabel = new objects.Label("YOU WIN!", "50px Arial", "#000000", config.Screen.CENTER_X, 75);
            this.addChild(this._gameOverLabel);

            // -- Print SCORE Label to scene.
            this._scoreLabel = new objects.Label("Score: " + score, "Bold 22px Arial", "#FFF", config.Screen.CENTER_X, 25);
            this._scoreLabel.outline = 2;
            this.addChild(this._scoreLabel);

            // Add button to scene. Register for click callback function
            // PlayAgain
            this._playButton = new objects.Button("start", config.Screen.CENTER_X - 100, 250);
            this.addChild(this._playButton);
            this._playButton.on("click", this._playAgainClick, this);

            // Add GameOverWin scene to global stage container
            stage.addChild(this);
        }

        // Run on every tick
        public update(): void {
            // Update objects
        }

        // PRIVATE METHODS
        // -- Function for when PLAY/START button is pressed
        private _playAgainClick(event: createjs.MouseEvent) {
            // Change global scene variable to PLAY. Call global changeScene() function
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}