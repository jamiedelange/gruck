const c = document.getElementById("theCanvas")
const ctx = c.getContext("2d")
ctx.fillStyle = "#FF70AB"
ctx.fillRect(0, 0, 256, 256)

const triangle = [[73, 100, 200], [100, 115, 112], [125, 131, 140]]
var animCount = 0
var cameraPos = [0, 0, 0]
var camAngle = 0
const projPlaneDist = 64

function convertToRadians(degrees) {
    return (degrees * Math.PI) / 180
}

function getPlanePoint() {
    x1 = projPlaneDist * Math.cos(convertToRadians(camAngle))
    y1 = 0
    z1 = projPlaneDist * Math.sin(convertToRadians(camAngle))
    return x1, y1, z1
}

function calcNormalVector(planePoint) {
    x1, y1, z1 = planePoint
    return [x1 - cameraPos[0], 0, z1 - cameraPos[2]]
}

function getK(z) {
    let planePoint = getPlanePoint()
    let normVector = calcNormalVector(planePoint)

    let d = (normVector[0] * planePoint[0]) + (normVector[1] * planePoint[1]) + (normVector[2] * planePoint[2])
    let k = (d - az1 - bz2 - cz3) / (a^2 + b^2 + c^2)
}



function moveUp() {
    movements = [[3, -4, 1], [2, 2, 2], [-2, -4, 1]]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            triangle[i][j] += movements[i][j]
        }
    }
}

function moveBack() {
    movements = [[-3, 4, -1], [-2, -2, -2], [2, 4, -1]]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            triangle[i][j] += movements[i][j]
        }
    }
}

function drawTriangleBadly() {
    ctx.fillStyle = "#FF70AB"
    ctx.fillRect(0, 0, 256, 256)

    ctx.fillStyle = "#FFFFFF"
    ctx.beginPath()
    ctx.moveTo(triangle[0][0], triangle[0][1])
    ctx.lineTo(triangle[1][0], triangle[1][1])
    ctx.stroke()
    ctx.lineTo(triangle[2][0], triangle[2][1])
    ctx.stroke()
    ctx.lineTo(triangle[0][0], triangle[0][1])
    ctx.stroke()
}

// setInterval(() => {
//     if (animCount < 10) {
//         moveUp()
//         animCount++
//     } else if (animCount < 20) {
//         moveBack()
//         animCount++
//     } else {
//         animCount = 0
//     }
//     drawTriangleBadly()
// }, 50)