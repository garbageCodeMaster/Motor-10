const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

window.addEventListener('resize', init)

function init() {}

canvas.width = window.innerWidth - 2
canvas.height = window.innerHeight - 2

let image = new Image()
image.src = './assets/maps/map.jpg'

let image2 = new Image()
image2.src = './assets/buildings/buildingsTerran.png'

let image3 = new Image()
image3.src = './assets/npcs/Terran/SCV.png'



class Camera {
    constructor(x=0, y=0) {
        this.x = x,
        this.y = y
    }

    newPositionOffset({offsetX, offsetY}) {
        this.x += offsetX
        this.y += offsetY
    }

    newPosition({offsetX, offsetY}) {
        this.x = offsetX
        this.y = offsetY
    }
}




class Sprite {
    constructor({image, position, realSize, velocity,  crop = {x:0, y:0}, chopSize}) {
        this.position = position
        this.image = image
        this.crop = crop
        this.chopSize = chopSize || this.image
        this.realSize = realSize || this.chopSize        

    }

    newPositionOffset({offsetX, offsetY}) {
        this.position.x += offsetX
        this.position.y += offsetY
    }

    draw() {
        context.drawImage(
            this.image, 
            this.crop.x,
            this.crop.y,
            this.chopSize.width,
            this.chopSize.height,
            this.position.x, 
            this.position.y,
            this.realSize.width,
            this.realSize.height
        )
    }

    move(){}
}

class GameObject extends Sprite {
    constructor({picture, position, healh, speed, size, id, owner}) {
        super(picture)
        this.goalPosition = {...this.position}
        this.id = id
        this.healh = healh || 0
        this.speed = speed || 10
        this.isMoving = false
        this.hitBox = {
            box: new Path2D(),
            position: position,
            size: size
        }
        this.hitBox.box.rect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.size.width, this.hitBox.size.height)
    }

    draw() {

        let x = this.position.x, y = this.position.y
        if (arguments.length) {
            x = arguments[0]+this.position.x
            y = arguments[1]+this.position.y
        }

        context.drawImage(
                this.image, 
                this.crop.x,
                this.crop.y,
                this.chopSize.width,
                this.chopSize.height,
                x, 
                y,
                this.realSize.width,
                this.realSize.height
            )
            this.hitBox.box = new Path2D()
            this.hitBox.box.rect(x, y, this.hitBox.size.width, this.hitBox.size.height)
            context.stroke(this.hitBox.box)
    }


    newPositionOffset({offsetX, offsetY}) {
        this.position.x += offsetX
        this.position.y += offsetY

        this.hitBox.position.x += offsetX
        this.hitBox.position.y += offsetY
    }

    newPosition({offsetX, offsetY}) {
        this.position.x = offsetX
        this.position.y = offsetY

        this.hitBox.position.x = offsetX
        this.hitBox.position.y = offsetY
    }
    
    equalPosition() {
        return (this.position.x === this.position.x && this.position.y === this.position.y)
    }
    move(x, y) {
        if(this.isMoving) {
            if(this.position.x !== this.goalPosition.x && this.position.y !== this.goalPosition.y) {
                let pathX = this.goalPosition.x - (this.position.x )
                let pathY = this.goalPosition.y - (this.position.y )
                let path = Math.sqrt(pathX*pathX + pathY*pathY)
                let time = path / this.speed
                let offsetX = pathX / time
                let offsetY = pathY / time

                

                if((Math.abs(this.goalPosition.x - (this.position.x )) < Math.abs(offsetX)) && (Math.abs(this.goalPosition.y - (this.position.y )) < Math.abs(offsetY))){
                    this.position.x = this.goalPosition.x 
                    this.position.y = this.goalPosition.y 
            
                    this.hitBox.position.x = this.goalPosition.x
                    this.hitBox.position.y = this.goalPosition.y
                    this.isMoving = false
                    console.log("scvFinish: ", this.position.x, this.position.y)
                }
                else {
                //newPositionOffset({offsetX, offsetY})
                    this.position.x += offsetX
                    this.position.y += offsetY

                    this.hitBox.position.x += offsetX
                    this.hitBox.position.y += offsetY
                    
                }
            }
        }
    }
}

class TerranMainBase extends GameObject{
    constructor({position, id, owner}) {
        const mainBase = {
            picture: {
                position: {
                    x: position.x,
                    y: position.y
                },
                crop: {
                    x: 480,
                    y: 5
                },
                chopSize: {
                    width: 130,
                    height: 100
                },
                realSize: {
                    width: 150,
                    height: 120
                },
                image: image2
            },
            position: {
                x: position.x,
                y: position.y
            },
            size: {
                width: 150,
                height: 120
            }
        }
        super({...mainBase, id, owner})
    }
}

class SCV extends GameObject{
    constructor({position, id, owner}) {
        const scv = {
            picture: {
                position: {
                    x: position.x,
                    y: position.y
                },
                crop: {
                    x: 230,
                    y: 8
                },
                chopSize: {
                    width: 38,
                    height: 42
                },
                realSize: {
                    width: 38,
                    height: 42
                },
                image: image3
            },
            position: {
                x: position.x,
                y: position.y
            },
            size: {
                width: 38,
                height: 42
            }
        }
        super({...scv, id, owner})
    }
}


class Player {
    constructor({x, y}) {
        this.keys = {
            w: {
                pressed: false
            },
            a: {
                pressed: false
            },
            s: {
                pressed: false
            },
            d: {
                pressed: false
            }
        }

        this.camera = new Camera(x, y)
    }


}


const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}



const worldSpace = []

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    realSize: {
        width: 3000,
        height: 3000
    },
    image: image
})
worldSpace.push(background)

const mainBase1 = new TerranMainBase({
    position: {
        x: 350,
        y: 315
    },
    id: 1
})

const mainBase2 = new TerranMainBase({
    position: {
        x: 440,
        y: 400
    },
    id: 2
})

const mainBase3 = new TerranMainBase({
    position: {
        x: 700,
        y: 315
    },
    id: 3
})

worldSpace.push(mainBase1, mainBase2, mainBase3)


// const scv1 = new SCV ({
//     position: {
//         x: 750,
//         y: 450
//     },
//     size: {
//         width: 38,
//         height: 42
//     },
//     id: 4
// })
//worldSpace.push(scv1)


class Selection {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.box = new Path2D()
        this.box.rect(x, y, 0, 0)
    }

    reSize(w, h) {
        this.box = new Path2D()
        this.box.rect(this.x, this.y, w-this.x, h-this.y)
    }

    draw() {
        context.strokeStyle = 'green';
        context.stroke(this.box)
        context.strokeStyle = 'black';
    }
    move(){}
}




const camera = new Camera()

function animate() {
    window.requestAnimationFrame(animate)

    worldSpace.forEach(obj => obj.draw(camera.x, camera.y))
    worldSpace.forEach(obj => obj.move(camera.x, camera.y))
    isCameraMove()
}
animate()




function isCameraMove() {
    let offset = false

    if(keys.w.pressed) {
        if (background.position.y + 15 <= 0) {
            offset = { offsetX: 0, offsetY: 15 }
            camera.x += 0
            camera.y += 15}
    }
    else if(keys.a.pressed) {
        if (background.position.x + 15 <= 0){
            offset = { offsetX: 15, offsetY: 0 }
            camera.x += 15
            camera.y += 0}
    }
    else if(keys.s.pressed) {
        if (background.position.y - 15 >= -background.realSize.height + canvas.height){
            offset = { offsetX: 0, offsetY: -15 }
            camera.x += 0
            camera.y += -15
        }
    }
    else if(keys.d.pressed) {
        if (background.position.x - 15 >= -background.realSize.width + canvas.width){
            offset = { offsetX: -15, offsetY: 0 }
            camera.x += -15
            camera.y += 0
        }
    }

    if (offset) {
        worldSpace[0].newPositionOffset(offset)
    }
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})

let click = {
    clicked: false,
    itemId: 0
}
let clickSel = false

var mouseDown = false;
var group = []

canvas.onmousedown = function(event) {
    console.log('down')
    let rect = new Selection(event.offsetX, event.offsetY)
    worldSpace.push(rect)
    mouseDown = true
}

canvas.onmousemove = function(event) {
    if(mouseDown) {
        console.log('move')
        let rect = worldSpace.find(el => el.constructor.name === "Selection")
        rect.reSize(event.offsetX, event.offsetY)
    }
    
}

canvas.onmouseup = function(event) {
    console.log('up')
    if (clickSel) {
        group.forEach((el, i) => {
            worldSpace[el.id].isMoving = true
            worldSpace[el.id].goalPosition.x = event.offsetX - camera.x + i*5
            worldSpace[el.id].goalPosition.y = event.offsetY - camera.y + i*5
        })
        clickSel = false
    }
    mouseDown = false
    let rect = worldSpace.find(el => el.constructor.name === "Selection")
    let group2 = worldSpace.filter(el => el.constructor.name == "SCV" && context.isPointInPath(rect.box, el.position.x, el.position.y))
    group = group2.length > 0 ? group2 : group
    if (group.length)
        clickSel = true
    worldSpace.pop()

    
}


canvas.addEventListener('click', function(event) {
    console.log(group)
    for(var i=worldSpace.length-1; i > 0; i--) {
        let obj = worldSpace[i]

        if (!click.clicked) {
            if (obj.constructor.name == 'TerranMainBase' && context.isPointInPath(obj.hitBox.box, event.offsetX, event.offsetY))  {
                const scv = new SCV({
                    position: {
                        x: obj.position.x,
                        y: obj.position.y + obj.realSize.height
                    },
                    size: {
                        width: 38,
                        height: 42
                    },
                    id: worldSpace.length
                })
                worldSpace.push(scv)
                break
            }
            else if (obj.constructor.name == 'SCV' && context.isPointInPath(obj.hitBox.box, event.offsetX, event.offsetY)) {
                console.log(obj.id)
                click = {
                    clicked: true,
                    itemId: obj.id
                }
                break
            }
        }
        else {
            worldSpace[click.itemId].isMoving = true
            worldSpace[click.itemId].goalPosition.x = event.offsetX - camera.x
            worldSpace[click.itemId].goalPosition.y = event.offsetY - camera.y
            // console.log("mouse: ", event.offsetX, event.offsetY)
            // console.log("scvStart: ", worldSpace[click.itemId].position.x, worldSpace[click.itemId].position.y)
            // console.log("scvToGo: ", worldSpace[click.itemId].goalPosition.x, worldSpace[click.itemId].goalPosition.y)
            // console.log("Camera: ", camera.x, camera.y)
            click = {
                clicked: false,
                itemId: 0
            }
        }
    }
})