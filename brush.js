class Brush {
    constructor(brushShape) {
        this.brushShape = brushShape
        this.brush = document.createElement('div')
        this.setStyle()
    }
    getBrush() {
        return this.brush
    }
    setStyle() {
        if (this.brushShape === 'square') {
            this.brush.classList.add('brush')
        }
        else if (this.brushShape === 'circle') {
            this.brush.classList.add('brush', 'circle-brush')
        }
        else if (this.brushShape === 'triangle') {
            this.brush.classList.add('triangle-brush')
        }
    }
    setPos(x, y) {
        this.brush.style.top = y + 'px'
        this.brush.style.left = x + 'px'
    }
}