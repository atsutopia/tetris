import _ from "lodash"

const ON_GAME = 1
const GAMEOVER = 0
let gameState = ON_GAME

const BLOCK_SIZE = 24
const BLOCK_RAWS = 22
const BLOCK_COLS = 12

const NORMAL_BLOCK = 1
const NON_BLOCK = 0
const WALL = 9
const LOCK_BLOCK = 2

const BACK_COLOR = "#ddd"
const WALL_COLOR = "#666"
const BLOCK_COLOR = "#000"
const LOCK_COLOR = "#333"

const SCREEN_WIDTH = BLOCK_SIZE * BLOCK_COLS
const SCREEN_HEIGHT = BLOCK_SIZE * BLOCK_RAWS

let blockX = 0
let blockY = 0
let oldBlockX = 0
let oldBlockY = 0

let currentBlock = []

const KEY_LEFT = 37
const KEY_UP = 38
const KEY_RIGHT = 39
const KEY_DOWN = 40

const STAGE = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

const	BLOCKS =	 [
 [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
 ],
 [
   [0, 1, 0, 0],
   [0, 1, 0, 0],
   [0, 1, 0, 0],
   [0, 1, 0, 0]
 ],
 // [
 //   [0, 0, 1, 0]
 //   [0, 1, 1, 0],
 //   [0, 1, 0, 0],
 //   [0, 0, 0, 0]
 // ],
 // [
 //   [0, 1, 0, 0],
 //   [0, 1, 1, 0],
 //   [0, 0, 1, 0],
 //   [0, 0, 0, 0]
 // ],
 // [
 //   [0, 0, 0, 0],
 //   [0, 1, 1, 0],
 //   [0, 1, 0, 0],
 //   [0, 1, 0, 0]
 // ],
 // [
 //   [0, 0, 0, 0],
 //   [0, 1, 1, 0],
 //   [0, 0, 1, 0],
 //   [0, 0, 1, 0]
 // ],
 // [
 //   [0, 0, 0, 0],
 //   [0, 1, 0, 0],
 //   [1, 1, 1, 0],
 //   [0, 0, 0, 0]
 // ]
]

const canvas = document.getElementById("canvas")
canvas.width = SCREEN_WIDTH
canvas.height = SCREEN_HEIGHT
const CONTEXT = canvas.getContext("2d");

let field = _.cloneDeep(STAGE)

function draw() {
  CONTEXT.fillStyle = BACK_COLOR
  CONTEXT.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

  for(let row = 0; row < BLOCK_RAWS; row++) {
    for(let col = 0; col < BLOCK_COLS; col++) {
      switch(field[row][col]){
        case NON_BLOCK:
          CONTEXT.fillStyle = BACK_COLOR
          break
        case NORMAL_BLOCK:
          CONTEXT.fillStyle = BLOCK_COLOR
          break
        case LOCK_BLOCK:
          CONTEXT.fillStyle = LOCK_COLOR
          break;
        case WALL:
          CONTEXT.fillStyle = WALL_COLOR
          break
      }
      CONTEXT.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE -1, BLOCK_SIZE - 1)
    }
  }
}

function createBlock() {
  const blockType = Math.floor(Math.random() * BLOCKS.length)

  // stageの中心
  blockX = oldBlockX = Math.floor(BLOCK_COLS / 3)
  blockY = oldBlockY = 0

  currentBlock = _.cloneDeep(BLOCKS[blockType])

	if(hitCheck()){
		gameState = GAMEOVER
	}
}

function updateBlock () {
  for (let row = 0; row < currentBlock.length; row++) {
    for (let col = 0; col  < currentBlock[row].length; col++) {
      if (currentBlock[row][col]) {
        field[row + blockY][col  + blockX] = currentBlock[row][col]
      }
    }
  }
}

function clearBlock () {
  for (let row = 0; row < currentBlock.length; row++) {
    for (let col = 0; col  < currentBlock[row].length; col++) {
      if (currentBlock[row][col]) {
        if (currentBlock[row][col]) {
          field[row + blockY][col  + blockX] = NON_BLOCK
        }

      }
    }
  }
}

function lockBlock () {
  for (let row = 0; row < currentBlock.length; row++) {
    for (let col = 0; col  < currentBlock[row].length; col++) {
      if (currentBlock[row][col]) {
        if (currentBlock[row][col]) {
          field[row + blockY][col  + blockX] = LOCK_BLOCK
        }
      }
    }
  }
}

function lineCheck () {
  if (gameState === GAMEOVER) return

  for(let row = BLOCK_RAWS-1; row > 0; row--){
    const cells = _.filter(field[row], (cell) => cell !== NON_BLOCK && cell !== WALL)

    if (cells.length === BLOCK_COLS - 2) {
      for (let col =1; col < BLOCK_COLS-1; col++) {
        field[row][col] = field[row -1][col]

        for (let topRow = row - 1; topRow > 0; topRow--) {
          field[topRow][col] = field[topRow - 1][col]
        }
      }
      row++
    }
  }
}

function hitCheck () {
  for (let row = 0; row < currentBlock.length; row++) {
    for (let col = 0; col  < currentBlock[row].length; col++) {
      if (field[row + blockY][col  + blockX] && currentBlock[row][col]) return true
    }
  }
  return false
}

let speed = 500
let lastUpdate = 0

function loop (timestamp) {
  oldBlockX = blockX
  oldBlockY = blockY

  const diff = timestamp - lastUpdate
  if (diff > speed) {
    if (gameState === GAMEOVER) return
    lastUpdate = timestamp
    clearBlock()
    blockY++
    if (hitCheck()) {
      blockY = oldBlockY
      lockBlock()
      lineCheck()
      createBlock()
    }
    updateBlock()
  }
  draw()

  requestAnimationFrame(loop)
}

function rotateBlock () {
  clearBlock()
  const ROW = currentBlock.length
  const COL = currentBlock[0].length

  let copy = new Array(currentBlock.length)

  for ( let col = 0; col < currentBlock[0].length; col++ ) {
    copy[col] = new Array(ROW)

    for (let row = 0; row <  ROW; row++) {
      copy[col][row] = currentBlock[ROW-row-1][col]
    }
  }

  currentBlock = copy
}

function keyHandler (e) {
  if (gameState === GAMEOVER) return

	clearBlock()
  oldBlockX = blockX
  oldBlockY = blockY

  switch (e.keyCode) {
    case KEY_RIGHT:
      blockX++
      break
    case KEY_LEFT:
      blockX--
      break
    case KEY_DOWN:
      blockY++
      break
    case KEY_UP:
      rotateBlock()
      break
  }

  if (hitCheck()) {
    blockX = oldBlockX
    blockY = oldBlockY
  }

  updateBlock()
}

function init () {
  draw()
  createBlock()
  loop()
  window.onkeydown = keyHandler
}


init()
