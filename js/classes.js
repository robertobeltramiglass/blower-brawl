class Sprite {
    constructor({ 
        position, 
        imageSrc, 
        scale = 1, 
        framesMax = 1,
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
        this.framesCurrent = framesCurrent
        this.framesElapsed = framesElapsed
        this.framesHold = framesHold
        this.offset = offset
    }
    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale)
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

class Fighter extends Sprite {
    constructor({ 
        position, 
        velocity, 
        spriteColor, 
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        framesCurrent = 0,
        framesElapsed = 0,
        framesHold = 5,
        offset = {x: 0, y: 0},
        sprites,
        attackBox = { offset: {}, width: undefined, height: undefined}
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            framesCurrent,
            framesElapsed,
            framesHold,
            offset
        })

        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.spriteColor = spriteColor
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
        this.lastDirection
        this.health = 100
        this.sprites = sprites
        this.dead = false

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    /* draw() {
        c.fillStyle = this.spriteColor
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // draws the attackbox and determines which direction its facing based on what the last key was

        if (this.isAttacking) {
            c.fillStyle = 'green'
            if (this.lastDirection === 'forward') {
                c.fillRect(
                    this.position.x,
                    this.position.y,
                    this.attackBox.width,
                    this.attackBox.height
                )
            } else if (this.lastDirection === 'backward') {
                c.fillRect(
                    this.position.x + this.width,
                    this.position.y,
                    -this.attackBox.width,
                    this.attackBox.height
                )
            }
        }
    } */
    update() { //modifies position based on velocity and gravity.
        this.draw(this.spriteColor)
        if (!this.dead) this.animateFrame()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        //draw attackbox
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
 
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //gravity function
        if (this.position.y + this.height >= canvas.height - floorOffset) { //checks if sprite has reached bottom of canvas
            this.velocity.y = 0 //sets velocity to 0 when player reaches bottom of canvas
            this.position.y = canvas.height - this.height - floorOffset//sets position to bottom of screen when player reaches OR SURPASSES bottom of canvas
        } else this.velocity.y += gravity //makes sprite affected by gravity
    }

    attack() {
        this.isAttacking = true
    }

    takeHit() {
        this.health -= 20
        if (this.health <= 0) {
            this.switchSprite('death')
        } else {
            this.switchSprite('takeHit')
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
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                } 
            break;
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                } 
            break;
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                } 
            break;
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                } 
            break;
            case 'attack':
                if (this.image !== this.sprites.attack.image) {
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprites.attack.framesMax
                    this.framesCurrent = 0
                } 
            break;
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                } 
            break;
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                } 
            break;
        }
        
    }

}