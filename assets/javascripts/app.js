import _ from "lodash"

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
 [
   [0, 0, 1, 0],
   [0, 1, 1, 0],
   [0, 1, 0, 0],
   [0, 0, 0, 0]
 ],
 [
   [0, 1, 0, 0],
   [0, 1, 1, 0],
   [0, 0, 1, 0],
   [0, 0, 0, 0]
 ],
 [
   [0, 0, 0, 0],
   [0, 1, 1, 0],
   [0, 1, 0, 0],
   [0, 1, 0, 0]
 ],
 [
   [0, 0, 0, 0],
   [0, 1, 1, 0],
   [0, 0, 1, 0],
   [0, 0, 1, 0]
 ],
 [
   [0, 0, 0, 0],
   [0, 1, 0, 0],
   [1, 1, 1, 0],
   [0, 0, 0, 0]
 ]
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
          console.log('lock')
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
        // console.log(currentBlock[row][col])
        if (currentBlock[row][col]) {
          console.log(LOCK_BLOCK)
          field[row + blockY][col  + blockX] = LOCK_BLOCK
        }
      }
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
    lastUpdate = timestamp
    clearBlock()
    blockY++
    if (hitCheck()) {
      blockY = oldBlockY
      lockBlock()
      createBlock()
    }
    updateBlock()

    draw()
  }


  requestAnimationFrame(loop)
}

function init () {
  draw()
  createBlock()
  loop()
}

init()
