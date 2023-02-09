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

function getZprime(z) {
    let planePoint = getPlanePoint()
    let normVector = calcNormalVector(planePoint)
    let a = normVector[0]
    let b = normVector[1]
    let c = normVector[2]

    let d = (a * planePoint[0]) + (a * planePoint[1]) + (a * planePoint[2])
    let k = (d - a*z[0] - b*z[1] - c*z[2]) / (a*a + b*b + c*c)
    return [z[0] + k*a, z[1] + k*b, z[2] + k*c]
}



function moveUp() {
    // movements = [[3, -4, 1], [2, 2, 2], [-2, -4, 1]]
    // for (let i = 0; i < 3; i++) {
    //     for (let j = 0; j < 3; j++) {
    //         triangle[i][j] += movements[i][j]
    //     }
    // }
    cameraPos[0] += 4
    cameraPos[2] += 4
    camAngle += 7
}

function moveBack() {
    // movements = [[-3, 4, -1], [-2, -2, -2], [2, 4, -1]]
    // for (let i = 0; i < 3; i++) {
    //     for (let j = 0; j < 3; j++) {
    //         triangle[i][j] += movements[i][j]
    //     }
    // }
    cameraPos[0] -= 4
    cameraPos[2] -= 4
    camAngle -= 7
}

function drawTriangle() {
    ctx.fillStyle = "#FF70AB"
    ctx.fillRect(0, 0, 256, 256)

    projectedTriangle = [getZprime(triangle[0]), getZprime(triangle[1]), getZprime(triangle[2])]

    ctx.fillStyle = "#FFFFFF"
    ctx.beginPath()
    ctx.moveTo(projectedTriangle[0][0], projectedTriangle[0][1])
    ctx.lineTo(projectedTriangle[1][0], projectedTriangle[1][1])
    ctx.stroke()
    ctx.lineTo(projectedTriangle[2][0], projectedTriangle[2][1])
    ctx.stroke()
    ctx.lineTo(projectedTriangle[0][0], projectedTriangle[0][1])
    ctx.stroke()
}

setInterval(() => {
    if (animCount < 10) {
        moveUp()
        animCount++
    } else if (animCount < 20) {
        moveBack()
        animCount++
    } else {
        animCount = 0
    }
    drawTriangle()
}, 50)