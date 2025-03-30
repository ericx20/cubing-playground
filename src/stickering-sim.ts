import { keyToMove } from "cubing/alg";
import { cube3x3x3 } from "cubing/puzzles";
import { randomScrambleForEvent } from "cubing/scramble";
import "cubing/twisty";
import { TwistyPlayer } from "cubing/twisty";

class App {
  twistyPlayer: TwistyPlayer;
  twistyWrapper: HTMLDivElement = document.querySelector("#twisty-wrapper")!;
  scrambleButton: HTMLButtonElement = document.querySelector("#scramble")!;
  resetButton: HTMLButtonElement = document.querySelector("#reset")!;
  input: HTMLInputElement = document.querySelector("#image_uploads")!;
  preview: HTMLDivElement = document.querySelector(".preview")!;
  constructor() {
    this.updateSprite();
    cube3x3x3.keyMapping().then(mapping => {
      window.addEventListener("keydown", (e) => {
        e.preventDefault();
        const algLeaf = keyToMove(mapping, e as KeyboardEvent)
        this.twistyPlayer.experimentalAddAlgLeaf(algLeaf);
      });
    });
    this.scrambleButton.addEventListener("click", () => this.scramble());
    this.resetButton.addEventListener("click", () => this.clear())
    this.input.addEventListener("change", () => this.updateSprite());
  }
  async scramble() {
    this.twistyPlayer.alg = await randomScrambleForEvent("333");
  }
  clear() {
    this.twistyPlayer.alg = "";
  }

  // Currently twisty-player doesn't support changing the sprite after it's created
  // So we delete it and create a new one
  updateSprite() {
    const file = this.input.files[0];
    this.twistyPlayer = new TwistyPlayer({
      controlPanel: "none",
      viewerLink: "none",
      tempoScale: 2,
      ...(!!file && {
        experimentalStickering: "picture",
        experimentalSprite: URL.createObjectURL(file),
      })
    });
    this.twistyWrapper.textContent = ''
    this.twistyWrapper.appendChild(this.twistyPlayer);
  }
}

globalThis.app = new App();
