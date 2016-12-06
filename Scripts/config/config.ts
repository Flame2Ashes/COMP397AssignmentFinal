/*
    Module to store globally accessible values and states for the game.
*/
module config {
    export class Scene {
        public static MENU : number = 0;
        public static PLAY : number = 1;
        public static GAMEOVER : number = 2;
        public static INSTRUCTIONS : number = 3;
        public static GAMEOVERWIN : number = 4;
        public static PLAY2 : number = 5;
        public static PLAY3 : number = 6;
    }

    export class Screen {
        public static WIDTH : number = 450;
        public static HEIGHT : number = 450;
        public static CENTER_X : number = 225;
        public static CENTER_Y : number = 225;
    }
    
    export class Game {
        public static FPS : number = 60;
    }

    export class TileSize {
        public static TILE_WIDTH : number = 45;
        public static TILE_HEIGHT : number = 45;
    }
}