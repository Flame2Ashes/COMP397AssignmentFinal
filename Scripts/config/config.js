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
        Scene.PLAY2 = 5;
        Scene.PLAY3 = 6;
        return Scene;
    }());
    config.Scene = Scene;
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = 450;
        Screen.HEIGHT = 450;
        Screen.CENTER_X = 225;
        Screen.CENTER_Y = 225;
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
    var TileSize = (function () {
        function TileSize() {
        }
        TileSize.TILE_WIDTH = 45;
        TileSize.TILE_HEIGHT = 45;
        return TileSize;
    }());
    config.TileSize = TileSize;
})(config || (config = {}));
//# sourceMappingURL=config.js.map