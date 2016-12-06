/*
	File Name:             Scene Instructions - TS|JS File 
	Author:                Angelina Gutierrez
    Last Modified By:      Elaine Mae Villarino 
	Last Modified Date:    Tuesday, December 06th, 2016
	Website Name:          COMP397 - Final Project
	Program Description:   JS file that contains the components that 
                           are required to render the game's Instructions scene.
    Revision History:      Fix Comments
*/

module scenes {
    export class Instructions extends objects.Scene {

        // PRIVATE VARIABLES
        private _instructionbg: createjs.Bitmap;
        private _gameButton: objects.Button;
        private _menuButton: objects.Button;

        // Instructions Class Contructor
        constructor() {
            super();
        }

        // PUBLIC FUNCTIONS
        public start(): void {
            // Add objects to the scene
            console.log("Instructions scene started");

            // Create BG for scene and add to Game Scene container
            this._instructionbg = new createjs.Bitmap(assets.getResult("Instructions_BG"));
            this.addChild(this._instructionbg);

            // Buttons
            // -- Add PLAY/START Button to scene. Register for click callback function
            this._gameButton = new objects.Button("start", config.Screen.CENTER_X + 200, config.Screen.CENTER_Y + 100);
            this.addChild(this._gameButton);
            this._gameButton.on("click", this._startButtonClick, this);

            // -- Add Back Button to scene. Register for click callback function
            this._menuButton = new objects.Button("back", config.Screen.CENTER_X + 200, config.Screen.CENTER_Y + 50);
            this.addChild(this._menuButton);
            this._menuButton.on("click", this._menuButtonClick, this);

            // Add Instructions scene to main stage container.
            stage.addChild(this);
        }

        // Run on every tick
        public update(): void {
            // Update objects
        }

        // PRIVATE METHODS
        // -- Function for when PLAY/START button is pressed
        private _startButtonClick(event: createjs.MouseEvent) {
            // Change global scene variable to PLAY. Call global changeScene() function
            oxygen = 100;
            scene = config.Scene.PLAY;
            changeScene();
        }
        // -- Function for when Back button is pressed
        private _menuButtonClick(event: createjs.MouseEvent) {
            // Change global scene variable to MENU. Call global changeScene() function
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}