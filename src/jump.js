// Get canvas
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

// Useless utils function (yeah, kind of paradoxal)
const getSign = value => value >= 0 ? 1 : -1

// Values to change if you want to change jump feedback
const testValue = {
    maxSpeed: 7,
    inertia: 5,
    floorAdhesion: 0.9,
    jumpForce: 7,
    gravity: 0.4,
    airResistance: 0.1,
    airControl: 0.08
}

// Key switch
const switchControl = {
    right: false,
    left: false
}

const getBrakeSpeedDown = player => player.jumping
    ? player.airResistance
    : player.floorAdhesion

const getAcceleration = (player, direction) => 
    player.inertia * direction * (player.jumping ? player.airControl : 1)

// Create player speed control functions
const setPosition = (player, direction) => {
    const newSpeed = player.speed + getAcceleration(player, direction)
    player.speed = Math.abs(newSpeed) > Math.abs(player.maxSpeed)
        ? player.maxSpeed * direction
        : newSpeed
    let newPosition = player.x + player.speed
    newPosition = newPosition > 490 ? (player.speed = 0, 490) : newPosition
    newPosition = newPosition < 10 ? (player.speed = 0, 10) : newPosition

    return newPosition
}

const brake = player => {
    const sign = Math.sign(player.speed)
    const newSpeed = player.speed - getBrakeSpeedDown(player) * sign
    player.speed = sign !== Math.sign(newSpeed)
        ? 0
        : newSpeed
    let newPosition = player.x + player.speed
    newPosition = newPosition > 490 ? (player.speed = 0, 490) : newPosition
    newPosition = newPosition < 10 ? (player.speed = 0, 10) : newPosition

    return newPosition
}

const jump = player => {
    if (!player.jumping) {
        player.jumping = true
        player.verticalSpeed = -player.jumpForce
    }
}

// Create player object
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
    airResistance: testValue.airResistance,
    airControl: testValue.airControl,
    update: () => {
        if (player.jumping) {
            const newPosition = player.y + player.verticalSpeed
            player.y = newPosition > 490 ? 490 : newPosition
            player.jumping = !(player.y === 490)
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

// Make canvas boundaries visible
canvas.style.border = "solid black 1px"