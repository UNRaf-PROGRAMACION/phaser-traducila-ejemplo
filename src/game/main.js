import { Game as MainGame } from "./scenes/Game";
import { AUTO, Scale, Game } from "phaser";
import { Preload } from "./scenes/Preload";
import InitialMenu from "./scenes/InitialMenu";

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: [Preload, MainGame, InitialMenu],
};

const StartGame = (parent) => {
  return new Game({ ...config, parent });
};

export default StartGame;
