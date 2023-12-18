export const canvas = document.querySelector('canvas');
export const c = canvas.getContext('2d');
export const gravity = 0.9
export const speed = 5
export const jumpSpeed = -20
export const floorOffset = 96
export let timerId

export const keys = {
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

canvas.width = 1024
canvas.height = 576