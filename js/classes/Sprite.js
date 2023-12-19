import { c } from "../gameConfig.js";

export class Sprite {
    constructor({ 
        position, 
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        verticalFramesMax = 1,
        framesCurrent = 0,
        framesElapsed = 0,
        framesHold = 5,
        offset = {
            x: 0,
            y: 0
        }
    }) {
        this.position = position
        this.width = 50
        this.height = 100
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.verticalFramesMax = verticalFramesMax
        this.framesCurrent = framesCurrent
        this.framesElapsed = framesElapsed
        this.framesHold = framesHold
        this.offset = offset
    }
    draw() {
        if (this.lastDirection === 'backward') {
            c.drawImage(
                this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                this.image.height / this.verticalFramesMax,
                this.image.width / this.framesMax,
                this.image.height / this.verticalFramesMax,
                this.position.x - this.offset.x,
                this.position.y - this.offset.y,
                (this.image.width / this.framesMax) * this.scale,
                (this.image.height / this.verticalFramesMax) * this.scale)
        } else {
            c.drawImage(
               this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height / this.verticalFramesMax,
                this.position.x - this.offset.x,
                this.position.y - this.offset.y,
                (this.image.width / this.framesMax) * this.scale,
                (this.image.height / this.verticalFramesMax) * this.scale) 
        }
    }

    animateFrame() {
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) this.framesCurrent++
            else this.framesCurrent = 0
        }
    }
    update() {
        this.draw()
        this.animateFrame()
    }
}
