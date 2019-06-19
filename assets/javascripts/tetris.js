import _ from "lodash"

const BLOCK_SIZE = 24
const BLOCK_RAWS = 22
const BLOCK_COLS = 12

const SCREEN_WIDTH = BLOCK_SIZE * BLOCK_COLS
const SCREEN_HEIGHT = BLOCK_SIZE * BLOCK_RAWS

const NORMAL_BLOCK = 1
const NON_BLOCK = 0
const WALL = 9
const LOCK_BLOCK = 2

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

const KEY_LEFT = 37
const KEY_UP = 38
const KEY_RIGHT = 39
const KEY_DOWN = 40

const	BLOCKS =	 [
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
 [
   [0, 0, 1, 0],
   [0, 1, 1, 0],
   [0, 1, 0, 0],
   [0, 0, 0, 0],
 ],
 [
   [0, 1, 0, 0],
   [0, 1, 1, 0],
   [0, 0, 1, 0],
   [0, 0, 0, 0],
 ],
 [
   [0, 0, 0, 0],
   [0, 1, 1, 0],
   [0, 1, 0, 0],
   [0, 1, 0, 0],
 ],
 [
   [0, 0, 0, 0],
   [0, 1, 1, 0],
   [0, 0, 1, 0],
   [0, 0, 1, 0],
 ],
 [
   [0, 0, 0, 0],
   [0, 1, 0, 0],
   [1, 1, 1, 0],
   [0, 0, 0, 0],
 ]
]

const BACK_COLOR = "#ffffff"
const WALL_COLOR = "#000000"
const BLOCK_COLOR = "#00ffff"
const LOCK_COLOR = "#c0c0c0"

const ON_GAME = 1
const GAMEOVER = 0

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

    this.cells = this.getCells(BLOCK_RAWS, BLOCK_COLS)
    this.blockCells = this.getCells(BLOCKS[0].length, BLOCKS[0][0].length)

    const speed = 500
    let lastUpdate = 0
    this.ticker = (timestamp) => {
      this.beforeX = this.x
      this.beforeY = this.y

      const diff = timestamp - lastUpdate
      if (diff > speed) {
        if (this.mode === GAMEOVER) return
        lastUpdate = timestamp
        this.clearBlock()
        this.y++
        if (this.isHit()) {
          this.y = this.beforeY
          this.lockBlock()
          this.deleteLine()
          this.createBlock()
        }
        this.updateBlock()
      }
      this.draw()
      requestAnimationFrame(this.ticker)
    }

    this.draw()
    this.createBlock( )
    requestAnimationFrame(this.ticker)
    window.onkeydown = (evt) => this.keyHandler(evt)
  }

  draw () {
    this.cxt.fillStyle = BACK_COLOR
    this.cxt.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

    this.cells.forEach((cell) => {
      const [row, col] = cell

      switch(this.stage[row][col]){
        case NON_BLOCK:
          this.cxt.fillStyle = BACK_COLOR
          break
        case NORMAL_BLOCK:
          this.cxt.fillStyle = BLOCK_COLOR
          break
        case LOCK_BLOCK:
          this.cxt.fillStyle = LOCK_COLOR
          break;
        case WALL:
          this.cxt.fillStyle = WALL_COLOR
          break
      }

      this.cxt.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE -1, BLOCK_SIZE - 1)
    })
  }

  clearBlock () {
    this.blockCells.forEach((cell) => {
      const [row, col] = cell
      if (this.block[row][col]) this.stage[row + this.y][col + this.x] = NON_BLOCK
    })
  }

  createBlock () {
    const blockType = Math.floor(Math.random() * BLOCKS.length)
    this.x = this.beforeX = Math.floor(BLOCK_COLS / 3)
    this.y = this.beforeY = 0

    this.block = _.cloneDeep(BLOCKS[blockType])

    if (this.isHit()) {
      this.mode = GAMEOVER
    }
  }

  lockBlock () {
    this.blockCells.forEach((cell) => {
      const [row, col] = cell
      if (this.block[row][col]) this.stage[row + this.y][col + this.x] = LOCK_BLOCK
    })
  }

  deleteLine () {
    console.log("deleteLine")
    for(let row = BLOCK_RAWS-1; row > 0; row--) {
      const cells = _.filter(this.stage[row], (cell) => cell !== NON_BLOCK && cell !== WALL)

      if (cells.length === BLOCK_COLS - 2) {
        for (let col =1; col < BLOCK_COLS-1; col++) {
          this.stage[row][col] = this.stage[row -1][col]

          for (let topRow = row - 1; topRow > 0; topRow--) {
            this.stage[topRow][col] = this.stage[topRow - 1][col]
          }
        }
        row++
      }
    }
  }

  updateBlock () {
    this.blockCells.forEach((cell) => {
      const [row, col] = cell
      if (this.block[row][col]) this.stage[row + this.y][col + this.x] = this.block[row][col]
    })
  }

  isHit () {
    let result = false

    this.blockCells.forEach((cell) => {
      const [row, col] = cell
      if (this.stage[row + this.y][col  + this.x] && this.block[row][col]) result = true
    })

    return result
  }

  getCells (rows, cols) {
    const cells = []

    for(let row = 0; row < rows; row++) {
      for(let col = 0; col < cols; col++) {
        cells.push([row, col])
      }
    }

    return cells
  }

  rotateBlock () {
    this.clearBlock()

    const rows = this.block.length
    const cols = this.block[0].length

    const beforeBlock = _.cloneDeep(this.block)
    const copy = new Array(this.block)

    for (let col = 0; col < cols; col++) {
      copy[col] = new Array(rows)

      for (let row = 0; row < rows; row++) {
        copy[col][row] = this.block[rows-row-1][col]
      }
    }
    this.block = copy

    if (this.isHit()) {
      this.block = beforeBlock
    }
  }

  keyHandler (e) {
    if (this.mode === GAMEOVER) return

    this.clearBlock()
    this.beforeX = this.x
    this.beforeY = this.y

    switch (e.keyCode) {
      case KEY_RIGHT:
        this.x++
        break
      case KEY_LEFT:
        this.x--
        break
      case KEY_DOWN:
        this.y++
        break
      case KEY_UP:
        this.rotateBlock()
        break
    }

    if (this.isHit()) {
      this.x = this.beforeX
      this.y = this.beforeY
    }

    this.updateBlock()
  }
}
