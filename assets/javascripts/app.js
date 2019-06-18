import _ from "lodash"

const BLOCK_SIZE = 24
const BLOCK_RAWS = 22
const BLOCK_COLS = 12
const NORMAL_BLOCK = 1

const NON_BLOCK = 0
const WALL = 9
const BACK_COLOR = "#ddd"
const WALL_COLOR = "#666"
const BLOCK_COLOR = "#000"

const SCREEN_WIDTH = BLOCK_SIZE * BLOCK_COLS
const SCREEN_HEIGHT = BLOCK_SIZE * BLOCK_RAWS

let blockX = 0
let blockY = 0

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
  for(let row = 0; row < BLOCK_RAWS; row++) {
    for(let col = 0; col < BLOCK_COLS; col++) {
      switch(field[row][col]){
        case NON_BLOCK:
          CONTEXT.fillStyle = BACK_COLOR
          break
        case NORMAL_BLOCK:
          CONTEXT.fillStyle = BLOCK_COLOR
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
  blockX = Math.floor(BLOCK_COLS / 3)
  blockY = Math.floor(BLOCK_RAWS / 3)

  currentBlock = _.cloneDeep(BLOCKS[blockType])

  for (let row = 0; row < currentBlock.length; row++) {
    for (let col = 0; col  < currentBlock[row].length; col++) {
      field[row + blockY][col  + blockX] = currentBlock[row][col]
    }
  }
}

function loop (timestamp) {
  draw()
  requestAnimationFrame(loop)
}

function init () {
  draw()
  createBlock()
  loop()
}

init()
