/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

//Source file: menu.ts
//Author name: Angelina Gutierrez
//Last modified: November 20th 2016

module scenes {
    export class Menu extends objects.Scene {

        // Private instance variables
        // Label or bitmap
        // Button 
        private _gameButton : objects.Button;
        private _instructionButton : objects. Button;
        private _menuBG : createjs.Bitmap;

        // Menu Class Contructor
        constructor()
        {
            super();
        }

        public start() : void {
            console.log("Menu Scene Started");

            //Add the background
            this._menuBG = new createjs.Bitmap(assets.getResult("Menu_BG"));
            this._menuBG.alpha = 0.7;
            this.addChild(this._menuBG);

            // Add button to scene. Register for click callback function
            //Start button
            this._gameButton = new objects.Button("start", config.Screen.CENTER_X - 350, config.Screen.CENTER_Y + 125);
            this.addChild(this._gameButton);
            this._gameButton.on("click", this._startButtonClick, this);

            //Instructions button
            this._instructionButton = new objects.Button("instructions", config.Screen.CENTER_X + 250, config.Screen.CENTER_Y + 100);
            this.addChild(this._instructionButton);
            this._instructionButton.on("click", this._instructionButtonClick, this);

            // Add menu scene to global stage container
            stage.addChild(this);
        }

        public update() : void {

        }

        // Fucntion for when button is pressed
        private _startButtonClick(event : createjs.MouseEvent) {
            // Change global scene variable to GAME. Call global changeScene() function
            life = 100;
            scene = config.Scene.PLAY;
            changeScene();
        }

        private _instructionButtonClick (event : createjs.MouseEvent) {
            scene = config.Scene.INSTRUCTIONS;
            changeScene();
        }
    }
}