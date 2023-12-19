import { player, enemy } from "./gameObjects.js"

export function rectangularCollision({ rectangle1, rectangle2 }){
    return (
         rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height && 
        (
            (
                rectangle1.lastDirection === 'forward' &&  
                rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
                rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
            ) || (
                rectangle1.lastDirection === 'backward' && 
                rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
                rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
            )
        )   
        // rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        // rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        // rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        // rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

export function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
        if(player.health === enemy.health) {
            document.querySelector('#displayText').innerHTML = 'tie'
        } else if (player.health > enemy.health) {
            document.querySelector('#displayText').innerHTML = 'player Wins'
        } else if (player.health < enemy.health) {
            document.querySelector('#displayText').innerHTML = 'enemy Wins'
        }
}

let timer = 60
let timerId

export function decreaseTimer() {
        if (timer > 0 && player.health > 0 && enemy.health > 0) {
            timerId = setTimeout(decreaseTimer, 1000)
            timer--
            document.querySelector('#timer').innerHTML = timer
        }
    if(timer === 0) {
        determineWinner({player, enemy, timerId})
    }
}