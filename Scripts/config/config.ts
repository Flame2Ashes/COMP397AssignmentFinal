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
    }

    export class Screen {
        public static WIDTH : number = 4500;
        public static HEIGHT : number = 700;
        public static CENTER_X : number = 500;
        public static CENTER_Y : number = 350;
    }
    
    export class Game {
        public static FPS : number = 60;
    }
}