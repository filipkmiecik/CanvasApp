class Save{
    constructor(img) {       
        
        this.canvas = document.querySelector(`#${img}`)

        const canvasDataURL = this.canvas.toDataURL()
        const a = document.createElement('a')
        a.href = canvasDataURL
        a.download = 'drawing'
        a.click()
    }
}