import { Scene } from "phaser";
import {
  getLanguageConfig,
  getTranslations,
} from "../../services/translations";

export class Preload extends Scene {
  #language;
  constructor() {
    super("Preload");
  }

  preload() {
    this.#language = getLanguageConfig();

    this.load.setPath("assets");

    this.load.image("background", "bg.png");
    this.load.image("logo", "logo.png");
  }

  create() {
    getTranslations(this.#language, () =>
      this.scene.start("Menu", { language: this.#language })
    );
  }
}
