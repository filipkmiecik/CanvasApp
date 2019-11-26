class Drawing {
    constructor(elementId) {
        this.canvas = document.querySelector('#' + elementId)
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e))
        this.brushShape = 'square'
    }
    onMouseMove(e) {
        const xPos = e.clientX - this.canvas.offsetLeft
        const yPos = e.clientY - this.canvas.offsetTop

        const brush = new Brush(this.brushShape)
        brush.setPos(xPos, yPos)
        const brushEl = brush.getBrush()

        this.canvas.appendChild(brushEl)
    }
    setBrush(brushShape) {
        this.brushShape = brushShape
    }
    
}