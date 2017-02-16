# Jump Research
In this project, I'm looking for the variables that affect a jump in a 2D game

> **Note:** Changing the next values will affect the feedback of the jump. The purpose here is to test different configurations.

## Requirement
Node.js and npm installed

## How to start
Launch a terminal and type
`npm i && npm start`
A browser window or tab should open. If not, go to **localhost:8080**

## Usage
Modify testValue values in src/jump.js

### maxSpeed
The maximum velocity the player can reach (in pixel per tick)
### inertia
The acceleration the player get until he reaches the maxSpeed (in pixel per tick per tick)
### floorAdhesion
The deceleration the player get until he reaches 0 while touching the floor (in pixel per tick per tick)
### jumpForce
The initial vertical speed when starting a jump
### gravity
The deceleration the player get vertically while jumping
### airResistance
The deceleration the player get until he reaches 0 while jumping (in pixel per tick per tick)
### airControl
The modifier of inertia while jumping
### jumpPressedMod
The modifier of gravity if the jump button stay pressed while jumping