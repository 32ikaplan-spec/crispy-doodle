const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const TILE_SIZE = 40;
const WORLD_WIDTH = 50;
const WORLD_HEIGHT = 30;

let cameraX = 0;
let cameraY = 0;
let selectedBlock = 1;

const COLORS = {
  0: null,
  1: "#22aa22",
  2: "#8B4513",
  3: "#888888"
};

// Create world array
let world = [];
for (let y = 0; y < WORLD_HEIGHT; y++) {
  world[y] = [];
  for (let x = 0; x < WORLD_WIDTH; x++) {
    world[y][x] = 0;
  }
}

// Generate terrain
for (let x = 0; x < WORLD_WIDTH; x++) {
  let ground = 15 + Math.floor(Math.random() * 5);
  for (let y = ground; y < WORLD_HEIGHT; y++) {
    if (y === ground) world[y][x] = 1;
    else if (y < ground + 3) world[y][x] = 2;
    else world[y][x] = 3;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < WORLD_HEIGHT; y++) {
    for (let x = 0; x < WORLD_WIDTH; x++) {
      const block = world[y][x];
      if (block !== 0) {
        ctx.fillStyle = COLORS[block];
        ctx.fillRect(
          x * TILE_SIZE - cameraX,
          y * TILE_SIZE - cameraY,
          TILE_SIZE,
          TILE_SIZE
        );
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();

// Keyboard movement
window.addEventListener("keydown", (e) => {
  if (e.key === "1") selectedBlock = 1;
  if (e.key === "2") selectedBlock = 2;
  if (e.key === "3") selectedBlock = 3;

  if (e.key === "a") cameraX -= 20;
  if (e.key === "d") cameraX += 20;
  if (e.key === "w") cameraY -= 20;
  if (e.key === "s") cameraY += 20;
});

// Mouse actions
canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left + cameraX;
  const mouseY = e.clientY - rect.top + cameraY;

  const gridX = Math.floor(mouseX / TILE_SIZE);
  const gridY = Math.floor(mouseY / TILE_SIZE);

  if (
    gridX >= 0 &&
    gridX < WORLD_WIDTH &&
    gridY >= 0 &&
    gridY < WORLD_HEIGHT
  ) {
    if (e.button === 0) {
      world[gridY][gridX] = 0;
    } else if (e.button === 2) {
      world[gridY][gridX] = selectedBlock;
    }
  }
});

canvas.addEventListener("contextmenu", (e) => e.preventDefault());
