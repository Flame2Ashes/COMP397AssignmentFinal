/*
    Module to store globally accessible values and states for the game.
*/
var config;
(function (config) {
    var Scene = (function () {
        function Scene() {
        }
        Scene.MENU = 0;
        Scene.PLAY = 1;
        Scene.GAMEOVER = 2;
        Scene.INSTRUCTIONS = 3;
        Scene.GAMEOVERWIN = 4;
        return Scene;
    }());
    config.Scene = Scene;
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = 4500;
        Screen.HEIGHT = 700;
        Screen.CENTER_X = 500;
        Screen.CENTER_Y = 350;
        return Screen;
    }());
    config.Screen = Screen;
    var Game = (function () {
        function Game() {
        }
        Game.FPS = 60;
        return Game;
    }());
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=config.js.map