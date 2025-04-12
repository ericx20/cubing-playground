import { keyToMove } from "cubing/alg";
import { cube3x3x3 } from "cubing/puzzles";
import { randomScrambleForEvent } from "cubing/scramble";
import "cubing/twisty";
import { TwistyAlgEditor, TwistyAlgViewer, TwistyPlayer } from "cubing/twisty";

class App {
  twistyPlayer: TwistyPlayer = document.querySelector("#main-player")!;
  twistyWrapper: HTMLDivElement = document.querySelector("#twisty-wrapper")!;
  scrambleButton: HTMLButtonElement = document.querySelector("#scramble")!;
  resetButton: HTMLButtonElement = document.querySelector("#reset")!;
  preview: HTMLDivElement = document.querySelector(".preview")!;
  constructor() {
    cube3x3x3.keyMapping().then(mapping => {
      window.addEventListener("keydown", (e) => {
        e.preventDefault();
        const algLeaf = keyToMove(mapping, e as KeyboardEvent)
        if (!algLeaf) return;
        this.twistyPlayer.experimentalAddAlgLeaf(algLeaf);
      });
    });
    this.scrambleButton.addEventListener("click", () => this.scramble());
    this.resetButton.addEventListener("click", () => this.clear());
  }
  async scramble() {
    this.twistyPlayer.alg = await randomScrambleForEvent(
      "333"
    );
  }
  clear() {
    // this.twistyPlayer.experimentalSetupAlg = "";
    this.twistyPlayer.alg = "";
  }
}

globalThis.app = new App();
