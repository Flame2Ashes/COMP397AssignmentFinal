/*
	File Name:             Scene Menu - TS|JS File 
	Author:                Angelina Gutierrez
    Last Modified By:      Elaine Mae Villarino 
	Last Modified Date:    Tuesday, December 06th, 2016
	Website Name:          COMP397 - Final Project
	Program Description:   JS file that contains the components that 
                           are required to render the game's Menu scene.
    Revision History:      Add music
*/

module scenes {
    export class Menu extends objects.Scene {

        // PRIVATE VARIABLES
        private _gameButton: objects.Button;
        private _instructionButton: objects.Button;
        private _menuBG: createjs.Bitmap;

        // Menu Class Contructor
        constructor() {
            super();
        }

        // PUBLIC FUNCTIONS
        public start(): void {
            // Add objects to the scene
            console.log("Menu Scene Started");

            // Add and Play Intro Music
            createjs.Sound.stop();
            var bgStart = createjs.Sound.play("MUSE_GAME");
            bgStart.play({ interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.50 });
            
            // Create BG for scene and add to Game Scene container
            this._menuBG = new createjs.Bitmap(assets.getResult("Menu_BG"));
            this._menuBG.alpha = 0.85;
            this.addChild(this._menuBG);

            // Add button to scene. Register for click callback function
            //Start button
            this._gameButton = new objects.Button("start", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 100);
            this.addChild(this._gameButton);
            this._gameButton.on("click", this._startButtonClick, this);

            //Instructions button
            this._instructionButton = new objects.Button("instructions", config.Screen.CENTER_X + 200, config.Screen.CENTER_Y + 100);
            this.addChild(this._instructionButton);
            this._instructionButton.on("click", this._instructionButtonClick, this);

            // Add menu scene to global stage container
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
        // -- Function for when INSTRUCTION button is pressed
        private _instructionButtonClick(event: createjs.MouseEvent) {
            // Change global scene variable to INSTRUCTIONS. Call global changeScene() function
            scene = config.Scene.INSTRUCTIONS;
            changeScene();
        }
    }
}