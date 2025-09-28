import Phaser from "phaser";
import { DE, EN, ES, PT } from "../../enums/languages";
import { FETCHED, FETCHING, READY, TODO } from "../../enums/status";
import { getTranslations, getPhrase } from "../../services/translations";
import keys from "../../enums/keys";

export default class InitialMenu extends Phaser.Scene {
  #textSpanish;
  #textGerman;
  #textEnglish;
  #textPortuguese;

  #updatedTextInScene;
  #updatedString = "Siguiente";
  #wasChangedLanguage = TODO;

  constructor() {
    super("Menu");
    const { next, hello, howAreU } = keys.sceneInitialMenu;
    this.#updatedString = next;
    this.hello = hello;
    this.howAreU = howAreU;
  }

  init({ language }) {
    this.language = language;
  }

  create() {
    const { width, height } = this.scale;

    const buttonSpanish = this.add
      .rectangle(width * 0.1, height * 0.15, 150, 75, 0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.getTranslations(ES);
      });

    this.#textSpanish = this.add
      .text(buttonSpanish.x, buttonSpanish.y, "Español", {
        color: "#000000",
      })
      .setOrigin(0.5);

    const buttonGerman = this.add
      .rectangle(width * 0.3, height * 0.15, 150, 75, 0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.getTranslations(DE);
      });

    this.#textGerman = this.add
      .text(buttonGerman.x, buttonGerman.y, "Aleman", {
        color: "#000000",
      })
      .setOrigin(0.5);

    const buttonEnglish = this.add
      .rectangle(width * 0.5, height * 0.15, 150, 75, 0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.getTranslations(EN);
      });

    this.#textEnglish = this.add
      .text(buttonEnglish.x, buttonEnglish.y, "Inglés", {
        color: "#000000",
      })
      .setOrigin(0.5);

    const buttonPortuguese = this.add
      .rectangle(width * 0.7, height * 0.15, 150, 75, 0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.getTranslations(PT);
      });

    this.#textPortuguese = this.add
      .text(buttonPortuguese.x, buttonPortuguese.y, "Portugués", {
        color: "#000000",
      })
      .setOrigin(0.5);
    const buttonUpdate = this.add
      .rectangle(width * 0.5, height * 0.75, 150, 75, 0x44d27e)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.scene.start("Game", { language: this.language });
      });

    this.#updatedTextInScene = this.add
      .text(buttonUpdate.x, buttonUpdate.y, getPhrase(this.#updatedString), {
        color: "#000000",
      })
      .setOrigin(0.5);

    this.helloText = this.add.text(
      width * 0.5,
      height * 0.3,
      getPhrase(this.hello),
      {
        color: "#ffffff",
      }
    );

    this.howAreUText = this.add.text(
      width * 0.5,
      height * 0.45,
      getPhrase(this.howAreU),
      {
        color: "#ffffff",
      }
    );
  }

  update() {
    if (this.#wasChangedLanguage === FETCHED) {
      this.#wasChangedLanguage = READY;
      this.#updatedTextInScene.setText(getPhrase(this.#updatedString));
      this.helloText.setText(getPhrase(this.hello));
      this.howAreUText.setText(getPhrase(this.howAreU));
    }
  }

  updateWasChangedLanguage = () => {
    this.#wasChangedLanguage = FETCHED;
  };

  async getTranslations(language) {
    this.language = language;
    this.#wasChangedLanguage = FETCHING;

    await getTranslations(language, this.updateWasChangedLanguage);
  }
}
