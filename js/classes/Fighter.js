import { canvas, gravity, floorOffset } from "../gameConfig.js";
import { Sprite } from "./Sprite.js";

export class Fighter extends Sprite {
    constructor({ 
        position, 
        velocity, 
        imageSrc,
        name,
        scale = 1, 
        framesMax = 1,
        verticalFramesMax = 2,
        framesCurrent = 0,
        framesElapsed = 0,
        framesHold = 5,
        offset = {x: 0, y: 0},
        sprites,
        attackBox = { offset: {}, width: undefined, height: undefined},
        attackFrame,
        lastDirection
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

        this.velocity = velocity
        this.width = 50
        this.height = 150
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
        this.lastDirection = lastDirection
        this.health = 100
        this.sprites = sprites
        this.dead = false
        this.attackFrame = attackFrame
        this.name = name

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    update() { //modifies position based on velocity and gravity.
        this.draw()
        if (!this.dead) this.animateFrame()

        if (this.lastDirection === 'forward') {
            this.attackBox.position.x = this.position.x + this.attackBox.offset.x
            this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        } else {

            this.attackBox.position.x = this.position.x - this.attackBox.width - (this.attackBox.offset.x - this.width)
            this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        }

        //movement update and limits fighter within canvas
        if ( this.position.x < 0 ) this.position.x = 0
        else if ( this.position.x + this.width > canvas.width ) this.position.x = canvas.width - this.width
        else {
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }

        //gravity function
        if (this.position.y + this.height >= canvas.height - floorOffset) { //checks if sprite has reached bottom of canvas
            this.velocity.y = 0 //sets velocity to 0 when player reaches bottom of canvas
            this.position.y = canvas.height - this.height - floorOffset//sets position to bottom of screen when player reaches OR SURPASSES bottom of canvas
        } else this.velocity.y += gravity //makes sprite affected by gravity
    }

    attack() {
        this.isAttacking = true
    }

    takeHit(damage) {
        this.health -= damage
        if (this.health <= 0) {
            this.switchSprite('death')
        } else {
            this.switchSprite('takeHit')
        }
    }

    spriteLoop(sprite) {
        if (this.image !== sprite.image) {
            this.image = sprite.image
            this.framesMax = sprite.framesMax
            this.framesCurrent = 0
        } 
    }

    switchSprite(sprite) {
        if(this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax - 1) {
                this.dead = true
            }
            return
        }

        //overriding other animations with attack animation
        if(
            this.image === this.sprites.attack.image &&
            this.framesCurrent < this.sprites.attack.framesMax -1
        ) return

        //overriding other animations when fighter gets hit
        if(
            this.image === this.sprites.takeHit.image &&
            this.framesCurrent < this.sprites.takeHit.framesMax -1
        ) return
        switch (sprite) {
            case 'idle':
                this.spriteLoop(this.sprites.idle)
            break;
            case 'run':
                this.spriteLoop(this.sprites.run)
            break;
            case 'jump':
                this.spriteLoop(this.sprites.jump)
            break;
            case 'fall':
                this.spriteLoop(this.sprites.fall)
            break;
            case 'attack':
                this.spriteLoop(this.sprites.attack)
            break;
            case 'takeHit':
                this.spriteLoop(this.sprites.takeHit)
            break;
            case 'death':
                this.spriteLoop(this.sprites.death)
            break;
        }
    }
}
