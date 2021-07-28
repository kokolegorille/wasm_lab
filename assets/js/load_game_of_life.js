import { Universe } from "game-of-life";

// OBSOLETE:
// Load memory from wasm file!
//
// To load next, You need to add to wasm/game-of-life/pkg/index_bg.js
// export const memory = wasm.memory;

import { memory } from "game-of-life/game_of_life_bg.wasm";

const canvas = document.getElementById("game-of-life-canvas");

if (canvas) {

  const CELL_SIZE = 5; // px
  const GRID_COLOR = "#CCCCCC";
  const DEAD_COLOR = "#FFFFFF";
  const ALIVE_COLOR = "#000000";

  // Construct the universe, and get its width and height.
  const universe = Universe.new();
  const width = universe.width();
  const height = universe.height();

  let animationId = null;

  // Give the canvas room for all of our cells and a 1px border
  // around each of them.
  // const canvas = document.getElementById("game-of-life-canvas");
  canvas.height = (CELL_SIZE + 1) * height + 1;
  canvas.width = (CELL_SIZE + 1) * width + 1;

  const ctx = canvas.getContext('2d');

  const drawGrid = () => {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    // Vertical lines.
    for (let i = 0; i <= width; i++) {
      ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
      ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    // Horizontal lines.
    for (let j = 0; j <= height; j++) {
      ctx.moveTo(0,                           j * (CELL_SIZE + 1) + 1);
      ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
  };

  const getIndex = (row, column) => {
    return row * width + column;
  };

  const bitIsSet = (n, arr) => {
    const byte = Math.floor(n / 8);
    const mask = 1 << (n % 8);
    return (arr[byte] & mask) === mask;
  };

  const drawCells = () => {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height / 8);

    ctx.beginPath();

    // fillStyle is expensive! 
    // Alive cells.
    ctx.fillStyle = ALIVE_COLOR;
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col);
        // if (cells[idx] !== Cell.Alive) {
        //   continue;
        // }

        if (! bitIsSet(idx, cells)) {
          continue;
        }

        ctx.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    // Dead cells.
    ctx.fillStyle = DEAD_COLOR;
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col);
        // if (cells[idx] !== Cell.Dead) {
        //   continue;
        // }

        if (bitIsSet(idx, cells)) {
          continue;
        }

        ctx.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    ctx.stroke();
  };

  const isPaused = () => {
    return animationId === null;
  };

  const renderLoop = () => {
    universe.tick();

    drawGrid();
    drawCells();

    animationId = requestAnimationFrame(renderLoop);
  };

  // drawGrid();
  // drawCells();
  // requestAnimationFrame(renderLoop);

  const playPauseButton = document.getElementById("play-pause");

  const play = () => {
    playPauseButton.textContent = "⏸";
    renderLoop();
  };

  const pause = () => {
    playPauseButton.textContent = "▶";
    cancelAnimationFrame(animationId);
    animationId = null;
  };

  playPauseButton.addEventListener("click", _event => {
    if (isPaused()) {
      play();
    } else {
      pause();
    }
  });

  // This used to be `requestAnimationFrame(renderLoop)`.
  play();

  // import("../wasm/game-of-life/pkg/").then(lib => {
  //     //console.log(`3 + 3 = ${lib.add(3, 3)}`);
  //     // console.log(lib);

  //     const { Universe } = lib;

  //     const CELL_SIZE = 5; // px
  //     const GRID_COLOR = "#CCCCCC";
  //     const DEAD_COLOR = "#FFFFFF";
  //     const ALIVE_COLOR = "#000000";

  //     // Construct the universe, and get its width and height.
  //     const universe = Universe.new();
  //     const width = universe.width();
  //     const height = universe.height();

  //     const canvas = document.getElementById("game-of-life-canvas");
  //     canvas.height = (CELL_SIZE + 1) * height + 1;
  //     canvas.width = (CELL_SIZE + 1) * width + 1;

  //     const ctx = canvas.getContext('2d');

  //     console.log(universe, width, height, ctx);
  // });

}