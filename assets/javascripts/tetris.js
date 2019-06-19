/*
 * Canvasを利用してステージを描画
 */
import _ from "lodash"

const BLOCK_SIZE = 24
const BLOCK_ROWS = 22
const BLOCK_COLS = 12

const SCREEN_WIDTH = BLOCK_SIZE * BLOCK_COLS
const SCREEN_HEIGHT = BLOCK_SIZE * BLOCK_ROWS

const NON_BLOCK = 0
const NORMAL_BLOCK = 1
const WALL = 9

const BLOCK_COLOR = "#00ffff"
const BACK_COLOR = "#f5f5f5"
const WALL_COLOR = "#000000"

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
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

const	BLOCKS = [
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
 ],
 [
   [0, 0, 1, 0],
   [0, 0, 1, 0],
   [0, 0, 1, 0],
   [0, 0, 1, 0],
 ],
]


export default class Tetris {
  constructor (canvas) {
    canvas.width = SCREEN_WIDTH
    canvas.height = SCREEN_HEIGHT
    this.cxt = canvas.getContext("2d")


    this.x = 0
    this.y = 0
    this.beforeX = 0
    this.beforeY = 0

    this.block = []

    this.stage = _.cloneDeep(STAGE)

    this.createBlock()
    this.updateBlock()
    this.draw()

    const speed = 500
    let lastUpdate = 0

    this.ticker = (timestamp) => {
      this.beforeX = this.x
      this.beforeY = this.y

      const diff = timestamp - lastUpdate
      if (diff > speed) {
        lastUpdate = timestamp
        this.clearBlock()
        this.y++
        this.updateBlock()
      }
      this.draw()

      requestAnimationFrame(this.ticker)
    }

    requestAnimationFrame(this.ticker)
  }

  draw () {
    for (let row = 0; row < BLOCK_ROWS; row++) {
      for (let col = 0; col < BLOCK_COLS; col++) {
        switch(this.stage[row][col]){
          case NON_BLOCK:
            this.cxt.fillStyle = BACK_COLOR
            break
          case WALL:
            this.cxt.fillStyle = WALL_COLOR
            break
          case NORMAL_BLOCK:
            this.cxt.fillStyle = BLOCK_COLOR
            break
        }
        this.cxt.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE -1, BLOCK_SIZE - 1)
      }
    }
  }

  createBlock () {
    const blockType = Math.floor(Math.random() * BLOCKS.length)
    this.x = this.beforeX = Math.floor(BLOCK_COLS / 3)
    this.y = this.beforeY = 0

    this.block = _.cloneDeep(BLOCKS[blockType])
  }

  updateBlock () {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.block[row][col]) this.stage[row + this.y][col + this.x] = this.block[row][col]
      }
    }
  }

  clearBlock () {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.block[row][col]) this.stage[row + this.y][col + this.x] = NON_BLOCK
      }
    }
  }
}
