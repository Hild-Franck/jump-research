// Get canvas
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const getSign = value => value >= 0 ? 1 : -1

const testValue = {
    maxSpeed: 7,
    inertia: 0.2,
    floorAdhesion: 0.1,
    jumpForce: 7,
    gravity: 0.3
}

const switchControl = {
    right: false,
    left: false
}

const setPosition = (player, direction) => {
    const newSpeed = player.speed + player.inertia * direction
    player.speed = Math.abs(newSpeed) > Math.abs(player.maxSpeed)
        ? player.maxSpeed * direction
        : newSpeed
    return player.x + player.speed
}

const brake = player => {
    const sign = Math.sign(player.speed)
    const newSpeed = player.speed - player.floorAdhesion * sign
    player.speed = sign !== Math.sign(newSpeed)
        ? 0
        : newSpeed
    return player.x + player.speed
}

const jump = player => {
    if (!player.jumping) {
        player.jumping = true
        player.verticalSpeed = -player.jumpForce
    }
}

const player = {
    x: 10,
    y: 490,
    xAnchor: 0.5,
    yAnchor: 0.5,
    width: 20,
    height: 20,
    jumping: false,
    speed: 0,
    verticalSpeed: 0,
    maxSpeed: testValue.maxSpeed,
    inertia: testValue.inertia,
    floorAdhesion: testValue.floorAdhesion,
    jumpForce: testValue.jumpForce,
    update: () => {
        if (player.jumping) {
            player.y += player.verticalSpeed
            player.verticalSpeed += testValue.gravity
        }
        if (switchControl.right) {
            return (player.x = setPosition(player, 1))
        }
        if (switchControl.left) {
            return (player.x = setPosition(player, -1))
        }
        player.x = brake(player)
    },
    draw: () => {
        const width = player.width
        const height = player.height

        context.clearRect(0, 0, canvas.width, canvas.height)
        context.beginPath()
        context.rect(player.x - 10, player.y - 10, width, height)
        context.fill()
    }
}

// Set keyboard events
const handleKey = (e, bool) => {
    if (e.keyCode === 37)
        switchControl.left = bool
    if (e.keyCode === 39)
        switchControl.right = bool
}

const onKeyDown = e => handleKey(e, true)
const onKeyUp = e => handleKey(e, false)

document.addEventListener('keydown', onKeyDown)
document.addEventListener('keyup', onKeyUp)
document.addEventListener('keypress', e => {
    if (e.keyCode === 32)
        jump(player)
})

// Set basic (= crappy) game loop
setInterval(() => {
    player.update()
    player.draw()
}, 16)