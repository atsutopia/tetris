import _ from "lodash"

const BLOCK_SIZE = 24
const BLOCK_RAWS = 22
const BLOCK_COLS = 12

const NON_BLOCK = 0
const WALL = 9

const BACK_COLOR = "#ddd"
const WALL_COLOR = "#666"

const SCREEN_WIDTH = BLOCK_SIZE * BLOCK_COLS
const SCREEN_HEIGHT = BLOCK_SIZE * BLOCK_RAWS

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
				case WALL:
					CONTEXT.fillStyle = WALL_COLOR
          break
      }
      CONTEXT.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE -1, BLOCK_SIZE - 1)
    }
  }
}

draw()

// window.onload = function() {
//   var renderer = PIXI.autoDetectRenderer({
//     width:           SCREEN_WIDTH,
//     height:          SCREEN_HEIGHT,
//     view:            canvas,
//     preserveDrawingBuffer: true
//   })
// 
// 
//   var stage = new PIXI.Container()
//   PIXI.ticker.shared.add(() => {
//     renderer.render(stage)
//   })
// 
// }


