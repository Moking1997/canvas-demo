
var canvas = document.getElementById('canvas')
var content = canvas.getContext('2d')
var eraseEnabled = false
var lineWidth = 5
/*
*监听窗口大小变化
*/
autoSetCanvasSize(canvas)
listenUser(canvas)
listenTool()

red.onclick = function () {
    content.fillStyle = '#f07c82'
    content.strokeStyle = '#f07c82'
}
blue.onclick = function () {
    content.fillStyle = '#346c9c'
    content.strokeStyle = '#346c9c'
}
green.onclick = function () {
    content.fillStyle = '#12a182'
    content.strokeStyle = '#12a182'
}
black.onclick = function () {
    content.fillStyle = '#132c33'
    content.strokeStyle = '#132c33'
}
thin.onclick = function () {
    lineWidth = 5
}
thick.onclick = function () {
    lineWidth = 8
}


/*
*监听工具切换
*/
function listenTool() {
    eraser.onclick = function () {
        eraseEnabled = true
        eraser.classList.add('active')
        brush.classList.remove('active')
    }
    brush.onclick = function () {
        eraseEnabled = false
        brush.classList.add('active')
        eraser.classList.remove('active')
    }
    clear.onclick = function () {
        content.clearRect(0, 0, canvas.width, canvas.height)
    }
    download.onclick = function () {
        let url = canvas.toDataURL("image/png")
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = '我的画'
        a.target = '_blank'
        a.click()
    }
}
/*
*监听鼠标事件
*/
function listenUser(canvas) {
    var using = false
    var lastPoint = {
        'x': undefined,
        'y': undefined
    }

    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function (e) {
            using = true
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY
            if (eraseEnabled) {
                content.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    'x': x,
                    'y': y
                }
            }
        }
        canvas.ontouchmove = function (e) {
            if (using) {
                let x = e.touches[0].clientX
                let y = e.touches[0].clientY
                if (!using) { return }
                if (eraseEnabled) {
                    content.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    var newPoint = {
                        'x': x,
                        'y': y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    } else {
        canvas.onmousedown = function (e) {
            using = true
            let x = e.clientX
            let y = e.clientY
            if (eraseEnabled) {
                content.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    'x': x,
                    'y': y
                }
            }
        }
        canvas.onmousemove = function (e) {
            if (using) {
                let x = e.clientX
                let y = e.clientY
                if (!using) { return }
                if (eraseEnabled) {
                    content.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    var newPoint = {
                        'x': x,
                        'y': y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
        }
        canvas.onmouseup = function () {
            using = false
        }
    }
}



function drawCircle(x, y, radius) {
    content.beginPath()
    content.fillStyle = '#132c33'
    content.arc(x, y, radius, 0, Math.PI * 2)
    content.fill()
}

function drawLine(x1, y1, x2, y2) {
    content.beginPath()
    content.moveTo(x1, y1)
    content.lineWidth = lineWidth
    content.lineTo(x2, y2)
    content.stroke()
    content.closePath()

}
function autoSetCanvasSize(canvas) {
    windowResize()
    window.onresize = function () {
        windowResize()
    }
    function windowResize() {
        let pageWidth = document.documentElement.clientWidth
        let pageHight = document.documentElement.clientHeight
        canvas.height = pageHight
        canvas.width = pageWidth
        content.fillStyle = '#fff'

        content.fillRect(0, 0, canvas.width, canvas.height)
        content.fillStyle = 'black'
    }
}
