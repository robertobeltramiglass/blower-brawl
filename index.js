const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 0.9
const speed = 5
const jumpSpeed = -20
const floorOffset = 96

canvas.width = 1024
canvas.height = 576

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
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

const player = new Fighter({
    position: {
        x: 200,
        y: 50
    },
    velocity: {
        x: 0,
        y: 0
    },
    spriteColor: 'red',
    lastDirection: 'forward',
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
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
            x: 100,
            y: 50
        },
        width: 155,
        height: 50
    }
})

const enemy = new Fighter({
    position: {
        x: canvas.width - 200,
        y: 50
    },
    velocity: {
        x: 0,
        y: 0
    },
    spriteColor: 'blue',
    lastDirection: 'backward',
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    framesHold: 8,
    scale: 2.5,
    offset: {
        x: 215,
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
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    }
})

keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    s:{
        pressed: false
    },
    i:{
        pressed: false
    },
    j:{
        pressed: false
    },
    l:{
        pressed: false
    },
    k:{
        pressed: false
    }
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.2)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

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
            player.framesCurrent === 4
        ) {
            enemy.takeHit()
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
        enemy.framesCurrent === 2
        ) {
            player.takeHit()
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
/*
    OLD attackbox collision detection, checks for collision based on sprites position relative to each other
    instead of moving the attackbox based on last direction key the player pressed
    if (player.isAttacking &&
        ((player.position.x + player.attackBox.width > enemy.position.x && 
        player.attackBox.position.x < enemy.position.x) || 
        (enemy.position.x + enemy.width < player.position.x + player.attackBox.width &&
        enemy.position.x + enemy.attackBox.width > player.position.x)) &&
        player.position.y + player.attackBox.height > enemy.position.y) {
            console.log('player hit')
        } 
    if (enemy.isAttacking &&
        ((enemy.position.x + enemy.attackBox.width > player.position.x && 
        enemy.attackBox.position.x < player.position.x) || 
        (player.position.x + player.width < enemy.position.x + enemy.attackBox.width &&
        player.position.x + player.attackBox.width > enemy.position.x)) &&
        enemy.position.y + enemy.attackBox.height > player.position.y) {
            console.log('enemy hit')
        }
*/
}

animate()

window.addEventListener('keydown', (event) => {
    
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
        }
    }
    console.log(event.key)
}
)

window.addEventListener('keyup', (event) => {

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
})
