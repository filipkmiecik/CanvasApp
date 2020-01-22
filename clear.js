class Clear {
    constructor(img)
    {   this.canvas = document.querySelector(`#${img}`)
        this.context = this.canvas.getContext('2d')

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}