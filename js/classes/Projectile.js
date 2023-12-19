import { gravity } from "../gameConfig.js";
import { Sprite } from "./Sprite.js";

export class Projectile extends Sprite {
    constructor({ 
        position, 
        velocity,
        lastDirection, 
        imageSrc,
        scale = 1, 
        framesMax = 1,
        verticalFramesMax = 2,
        framesCurrent = 0,
        framesElapsed = 0,
        framesHold = 5,
        offset = {x: 0, y: 0},
        sprites,
        owner,
        attackBox = { offset: {}, width: undefined, height: undefined},
        attackFrame
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            framesCurrent,
            framesElapsed,
            framesHold,
            offset,
            verticalFramesMax
        })
        this.lastDirection = lastDirection
        this.velocity = velocity
        this.width = 32
        this.height = 32
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.isAttacking
        this.health = 100
        this.sprites = sprites
        this.dead = false
        this.attackFrame = attackFrame
        this.owner = owner
        if (this.lastDirection === 'forward') this.velocity.x = -this.velocity.x;
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

        update() { //modifies position based on velocity and gravity.
            this.draw()
            this.animateFrame()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            this.attackBox.position.x = this.position.x
            this.attackBox.position.y = this.position.y
            this.velocity.y += gravity //makes sprite affected by gravity
        }
}