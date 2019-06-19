import _ from "lodash"

const BLOCK_SIZE = 24
const BLOCK_ROWS = 22
const BLOCK_COLS = 12

const SCREEN_WIDTH = BLOCK_SIZE * BLOCK_COLS
const SCREEN_HEIGHT = BLOCK_SIZE * BLOCK_ROWS

export default class Tetris {
  constructor (canvas) {
    canvas.width = SCREEN_WIDTH
    canvas.height = SCREEN_HEIGHT
    this.cxt = canvas.getContext("2d")
  }
}
