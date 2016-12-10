/*
    File Name:             Scene GameOverLose - TS|JS File
    Author:                Angelina Gutierrez
    Last Modified By:      Elaine Mae Villarino
    Last Modified Date:    Saturday, December 10th, 2016
    Website Name:          COMP397 - Final Project
    Program Description:   JS file that contains the components that
                           are required to render the game's Scene GameOverLose.
                           Winning screen when player loses life
    Revision History:      Add Stats and HighScoring
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Gameover = (function (_super) {
        __extends(Gameover, _super);
        // Game Class Contructor
        function Gameover() {
            _super.call(this);
        }
        // PUBLIC FUNCTIONS
        Gameover.prototype.start = function () {
            // Add objects to the scene
            console.log("Game Over scene started");
            // Add and Play OVER (LOSE) Music
            createjs.Sound.stop();
            var bgStart = createjs.Sound.play("MUSE_LOSE");
            bgStart.play({ interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 1 });
            // Create BG for scene and add to Game Scene container
            this._gamebg = new createjs.Bitmap(assets.getResult("Menu_BG"));
            this._gamebg.alpha = 0.5;
            this.addChild(this._gamebg);
            // Add UI GOs to Scene
            // -- Print GAMEOVER Label to scene.
            this._gameOverLabel = new objects.Label("GAME OVER", "50px Arial", "#000", config.Screen.CENTER_X, config.Screen.CENTER_Y - 150);
            this.addChild(this._gameOverLabel);
            // -- Print GAMEOVER EXPLANATION Label to scene.
            this._gameOverExplanation = new objects.Label("You have not completed all levels!", "25px Arial", "#000", config.Screen.CENTER_X, config.Screen.CENTER_Y - 100);
            this.addChild(this._gameOverExplanation);
            // -- Print STATS Label to scene.
            this._statsLabel = new objects.Label("Stats:", "22px Arial", "#000", config.Screen.CENTER_X - 161, config.Screen.CENTER_Y - 50);
            this.addChild(this._statsLabel);
            // -- Print COLLECTED COIN Label to scene.
            this._collectCoinLabel = new objects.Label("Collected Coin: " + collectedCoin, "22px Arial", "#000", config.Screen.CENTER_X - 90, config.Screen.CENTER_Y - 25);
            this.addChild(this._collectCoinLabel);
            // -- Print COLLECTED OXYGEN to scene.
            this._collectOxygenLabel = new objects.Label("Collected Oxygen: " + collectedOxygen, "22px Arial", "#000", config.Screen.CENTER_X - 75, config.Screen.CENTER_Y - 5);
            this.addChild(this._collectOxygenLabel);
            // -- Print PLAYER'S SCORE Label to scene.
            this._scoreCurrentLabel = new objects.Label("Your Score: " + score, "Bold 22px Arial", "#000", config.Screen.CENTER_X - 103, config.Screen.CENTER_Y + 25);
            this.addChild(this._scoreCurrentLabel);
            // -- Print PREVIOUS HIGHSCORE Label to scene.
            this._scoreHighestLabel = new objects.Label("Previous High Score: ", "22px Arial", "#000", config.Screen.CENTER_X - 67, config.Screen.CENTER_Y + 45);
            this.addChild(this._scoreHighestLabel);
            // Check Player's Highscore Standings
            this._checkHighScore();
            // Add button to scene. Register for click callback function
            // PlayAgain
            this._playButton = new objects.Button("back", config.Screen.CENTER_X + 50, config.Screen.CENTER_Y + 100);
            this.addChild(this._playButton);
            this._playButton.on("click", this._playAgainClick, this);
            // Add GameOverLose scene to global stage container
            stage.addChild(this);
        };
        // Run on every tick
        Gameover.prototype.update = function () {
            // Update objects
        };
        // PRIVATE METHODS
        // -- Function to check Player HighScore
        Gameover.prototype._checkHighScore = function () {
            var localHS = localStorage.getItem("HighScore");
            var nLocal = Number(localHS);
            this._scoreHighestLabel.text = "Previous High Score: " + localHS;
            if (localStorage.getItem("HighScore") === null) {
                localStorage.setItem("HighScore", score.toString());
                this._scoreCurrentLabel.text = "";
                this._scoreHighestLabel.text = "Previous High Score: " + 0;
            }
            else {
                if (score >= nLocal) {
                    localStorage.setItem("HighScore", score.toString());
                    this._scoreHighestLabel.text = "You have beaten the highscore!";
                }
                else {
                }
            }
        };
        // -- Function for when PLAY/START button is pressed
        Gameover.prototype._playAgainClick = function (event) {
            // Reset all values before starting the game again
            score = 0;
            collectedCoin = 0;
            collectedOxygen = 0;
            // Change global scene variable to PLAY. Call global changeScene() function
            scene = config.Scene.MENU;
            changeScene();
        };
        return Gameover;
    }(objects.Scene));
    scenes.Gameover = Gameover;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map