import { player, enemy } from "./gameObjects.js"
import { keys, canvas, jumpSpeed, floorOffset } from "./gameConfig.js";
import { projectile } from "./projectile.js";

export function keyDownHandler(event) {
    
    if(!player.dead) {
        switch (event.key) {
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                player.lastDirection = 'backward'
                break
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                player.lastDirection ='forward'
                break
            case 's':
                player.attack()
                break
            case 'w':
                if (player.position.y + player.height >= canvas.height - floorOffset) {
                    player.velocity.y = jumpSpeed
                }
                break
            case 'e':
                projectile(player)
                break
            }       
    }
    if(!enemy.dead) {
        switch (event.key) {        
            case 'l':
                keys.l.pressed = true
                enemy.lastKey = 'l'
                enemy.lastDirection ='forward'
                break
            case 'j':
                keys.j.pressed = true
                enemy.lastKey = 'j'
                enemy.lastDirection = 'backward'
                break
            case 'k':
                enemy.attack()
                break
            case 'i':
                if (enemy.position.y + enemy.height >= canvas.height - floorOffset) {
                    enemy.velocity.y = jumpSpeed
                }
                break
            case 'o':
                projectile(enemy)
                break
        }
    }
    console.log(event.key)
}

export function keyUpHandler(event) {

    switch (event.key) {
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'l':
            keys.l.pressed = false
            break
        case 'j':
            keys.j.pressed = false
            break
        case 'k':
            keys.k.pressed = false
            break
    }
}
