const c = document.getElementById("theCanvas")
const c2 = document.getElementById("theCanvas2")
const ctx = c.getContext("2d")
const ctx2 = c2.getContext("2d")
ctx.fillStyle = "#FF70AB"
ctx.fillRect(0, 0, 256, 256)
ctx.fillStyle = "#57BCFF"
ctx.fillRect(0, 0, 256, 256)

const triangle = [[73, 100, 200], [100, 115, 112], [125, 131, 140]]
var animCount = 0
var cameraPos = [128, 128, 0]
var camAngle = 0
const projPlaneDist = 64

function convertToRadians(degrees) {
    let rads = (degrees * Math.PI) / 180
    console.log("Camera position: " + cameraPos)
    console.log("camera angle radians: " + rads)
    return rads
}

function getPlanePoint() {
    let rads = convertToRadians(camAngle)
    x1 = projPlaneDist * Math.sin(rads)
    y1 = 0
    z1 = projPlaneDist * Math.cos(rads)
    console.log("point on plane: " + [x1, y1, z1])
    return [x1, y1, z1]
}

function calcNormalVector(planePoint) {
    console.log(planePoint)
    let normVec = [planePoint[0] - cameraPos[0], planePoint[1] - cameraPos[1], planePoint[2] - cameraPos[2]]
    console.log("Normal vector: " + normVec)
    return normVec
}

function getZprime(z) {
    let planePoint = getPlanePoint()
    let normVector = calcNormalVector(planePoint)
    let a = normVector[0]
    let b = normVector[1]
    let c = normVector[2]

    let d = (a * planePoint[0]) + (a * planePoint[1]) + (a * planePoint[2])
    let k = (d - a*z[0] - b*z[1] - c*z[2]) / (a*a + b*b + c*c)
    console.log("d: " + d)
    console.log("k: " + k)
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
    camAngle -= 7
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
    camAngle += 7
}

function drawTriangle() {
    ctx.fillStyle = "#FF70AB"
    ctx.fillRect(0, 0, 256, 256)

    projectedTriangle = [getZprime(triangle[0]), getZprime(triangle[1]), getZprime(triangle[2])]
    console.log("triangle: " + projectedTriangle)
    console.log("projected triangle: " + projectedTriangle)

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

function drawOtherView() {
    ctx2.fillStyle = "#57BCFF"
    ctx2.fillRect(0, 0, 256, 256)

    ctx2.fillStyle = "#FFFFFF"
    ctx2.beginPath()
    ctx2.moveTo(triangle[0][0], triangle[0][2])
    ctx2.lineTo(triangle[1][0], triangle[1][2])
    ctx2.stroke()
    ctx2.lineTo(triangle[2][0], triangle[2][2])
    ctx2.stroke()
    ctx2.lineTo(triangle[0][0], triangle[0][2])
    ctx2.stroke()

    ctx2.moveTo(cameraPos[0], cameraPos[2])
    ctx2.fillStyle = "#FFFFFF"
    ctx2.beginPath()
    ctx2.arc(cameraPos[0], cameraPos[2], 6, 0, 2 * Math.PI, false);
    ctx2.fill()
    ctx2.stroke()

    ctx2.beginPath()
    ctx2.moveTo(cameraPos[0], cameraPos[2])
    let planePoint = getPlanePoint()
    ctx2.lineTo(planePoint[0], planePoint[2])
    console.log(planePoint[0] + " , " + planePoint[2])
    ctx2.stroke()
}

drawTriangle()
drawOtherView()
console.log("-------------------------------------------------------")

// setInterval(() => {
//     // if (animCount < 10) {
//     //     moveUp()
//     //     animCount++
//     // } else if (animCount < 20) {
//     //     moveBack()
//     //     animCount++
//     // } else {
//     //     animCount = 0
//     // }
//     drawTriangle()
// }, 1000)

document.addEventListener('keydown', function(event) {
    if(event.key == "ArrowDown") {
        moveUp()
        drawTriangle()
        console.log("-------------------------------------------------------")
        drawOtherView()
    }
});