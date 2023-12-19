import { rectangularCollision, determineWinner } from './utils.js';
import { canvas, c, speed, timerId, keys, projectiles, floorOffset } from "./gameConfig.js";
import { background, shop, player, enemy } from './gameObjects.js';

export function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    // c.fillStyle = 'rgba(255, 255, 255, 0.2)'
    // c.fillRect(0, 0, canvas.width, canvas.height)
    // c.fillStyle = 'rgba(0, 255, 0)'
    // c.fillRect(player.position.x, player.position.y, player.width, player.height)
    // c.fillRect(enemy.position.x, enemy.position.y, enemy.width, enemy.height)
    // c.fillStyle = 'rgba(0, 0, 0)'
    // c.fillRect(player.attackBox.position.x, player.attackBox.position.y, player.attackBox.width, player.attackBox.height)
    // c.fillRect(enemy.attackBox.position.x, enemy.attackBox.position.y, enemy.attackBox.width, enemy.attackBox.height)
    // projectiles.forEach((projectile, index) => {
    //     c.fillStyle = 'rgba(0, 0, 255)'
    //     c.fillRect(projectile.attackBox.position.x, projectile.attackBox.position.y, projectile.attackBox.width, projectile.attackBox.height)
    // })
    player.update()
    enemy.update()
    projectiles.forEach((projectile, index) => {
        projectile.update()
        console.log(projectile.owner)
        if (    
            rectangularCollision({ 
                rectangle1: projectile , 
                rectangle2: enemy }) &&
            projectile.owner === 'player'
        ) {
            enemy.takeHit(5)
            console.log('player hit')
            gsap.to('#enemyHealth', {
                width: enemy.health + '%'
            })
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0)      
        } else if (
            rectangularCollision({ 
                rectangle1: projectile , 
                rectangle2: player }) &&
            projectile.owner === 'enemy'
        ) {
            player.takeHit(5)
            console.log('enemy hit')
            gsap.to('#playerHealth', {
                width: player.health + '%'
            })
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0)   
        }
        if (
            projectile.position.y + projectile.height >= canvas.height - floorOffset || 
            projectile.position.x + projectile.width < 0 || 
            projectile.position.x - projectile.width > canvas.width
        ) {
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0)
        }
    })
    

    // modifies player and enemy velocity based on what keys are pressed
    
    player.velocity.x = 0 //resets player velocity so it doesn't keep moving after key is let go
    enemy.velocity.x = 0 //resets enemy velocity so it doesn't keep moving after key is let go
    
    //player movement
    if (player.isAttacking) {
        player.switchSprite('attack')
    } else if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -speed
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = speed
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }

    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    //enemy movement

    if (enemy.isAttacking) {
        enemy.switchSprite('attack')
    } else if (keys.j.pressed && enemy.lastKey === 'j') {
        enemy.velocity.x = -speed
        enemy.switchSprite('run')
    } else if (keys.l.pressed && enemy.lastKey === 'l') {
        enemy.velocity.x = speed
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }

    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    // player collision detection
    if (    
            rectangularCollision({ 
            rectangle1: player , 
            rectangle2: enemy }) &&
            player.isAttacking && 
            player.framesCurrent === player.attackFrame
        ) {
        enemy.takeHit(20)
        player.isAttacking = false
        console.log('player hit')
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })        
    }

    // if player misses
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false
    }

    //enemy collision detection
    if (
        rectangularCollision({ rectangle1: enemy , rectangle2: player }) &&
        enemy.isAttacking && 
        enemy.framesCurrent === enemy.attackFrame
        ) {
        player.takeHit(20)
        enemy.isAttacking = false
        console.log('enemy hit')
        gsap.to('#playerHealth', {
            width: player.health + '%'
        }) 
    }
    
    // if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }
    //end game based on health
    if(player.health <= 0 || enemy.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
}