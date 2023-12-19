import { projectiles } from "./gameConfig.js"
import { Projectile } from "./classes/Projectile.js"

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