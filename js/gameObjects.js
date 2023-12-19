import { Fighter } from "./classes/Fighter.js"
import { Sprite } from "./classes/Sprite.js"
import { canvas} from "./gameConfig.js";

export const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

export const shop = new Sprite({
    position: {
        x: 625,
        y: 162
    },
    imageSrc: './img/shop.png',
    scale: 2.5,
    framesMax: 6,
    framesCurrent: 0,
    framesElapsed: 0,
    framesHold: 5
})

export const player = new Fighter({
    position: {
        x: 200,
        y: 310
    },
    velocity: {
        x: 0,
        y: 0
    },
    lastDirection: 'forward',
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    name: 'player',
    scale: 2.5,
    offset: {
        x: 225,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2
        },
        attack: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: './img/samuraiMack/Take hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: './img/samuraiMack/death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 97,
            y: 50
        },
        width: 150,
        height: 50
    },
    attackFrame: 4
})

export const enemy = new Fighter({
    position: {
        x: canvas.width - 200,
        y: 310
    },
    velocity: {
        x: 0,
        y: 0
    },
    lastDirection: 'backward',
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    name: 'enemy',
    framesHold: 8,
    scale: 2.5,
    offset: {
        x: 225,
        y: 170
    },
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2
        },
        attack: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: './img/kenji/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './img/kenji/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: 85,
            y: 50
        },
        width: 150,
        height: 50
    },
    attackFrame: 2
})

export function projectile(owner) {
    projectiles.push(new Projectile({
        position: {
                x: owner.position.x,
                y: owner.position.y
            },
        velocity: {
                x: -10,
                y: -15
            },
        attackBox: {
            offset: {
                x: 0,
                y: -owner.height/2
            },
            width: 32,
            height: 32
        },
        lastDirection: owner.lastDirection,
        imageSrc: './img/projectiles/GlassProjectile.png',
        framesMax: 4,
        framesHold: 4,
        scale: 1,
        owner: owner.name,
        offset: {
            x: 0,
            y: 0
        }
    }))
}

