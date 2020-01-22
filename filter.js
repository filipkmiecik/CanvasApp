class Filter {
    constructor(img, name) {
        this.canvas = document.querySelector(`#${img}`)
        this.context = this.canvas.getContext('2d')
        this.height = this.canvas.height
        this.width = this.canvas.width
        this.buttonName = name
    }

    pickFilter() {

        switch (this.buttonName.target.id) {
            case 'brightDecrease': {
                this.decreaseBrightness();
                break;
            }
            case 'brightIncrease': {
                this.increaseBrightness();
                break;
            }
            case 'invertColor': {
                this.invertColor();
                break;
            }
            case 'contrastIncrease': {
                this.increaseContrast();
                break;
            }
            case 'contrastDecrease': {
                this.decreaseContrast();
                break;
            }
            case 'grayscale': {
                this.grayscale();
                break;
            }
        }
    }
    
    decreaseBrightness(amount = 15) {
        const canvasData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        for (let i = 0; i < canvasData.data.length; i += 4) {
            canvasData.data[i] -= amount
            canvasData.data[i + 1] -= amount
            canvasData.data[i + 2] -= amount
        }
        this.context.putImageData(canvasData, 0, 0)
    }

    increaseBrightness(amount = 15) {
        const canvasData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        for (let i = 0; i < canvasData.data.length; i += 4) {
            canvasData.data[i] += amount
            canvasData.data[i + 1] += amount
            canvasData.data[i + 2] += amount
        }
        this.context.putImageData(canvasData, 0, 0)
    }
    invertColor() {
        const canvasData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        for (var i = 0; i < canvasData.data.length; i++) {
            canvasData.data[i * 4] = 255 - canvasData.data[i * 4]
            canvasData.data[i * 4 + 1] = 255 - canvasData.data[i * 4 + 1]
            canvasData.data[i * 4 + 2] = 255 - canvasData.data[i * 4 + 2]
        }
        this.context.putImageData(canvasData, 0, 0)
    }

    grayscale() {
        const canvasData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        for (var i = 0; i < canvasData.data.length; i += 4) {

            let lightness = parseInt((canvasData.data[i] + canvasData.data[i + 1] + canvasData.data[i + 2]) / 3);

            canvasData.data[i] = lightness;
            canvasData.data[i + 1] = lightness;
            canvasData.data[i + 2] = lightness;
        }
        this.context.putImageData(canvasData, 0, 0)
    }

    increaseContrast() {
        const canvasData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        const amount = 5
        const factor = (259 * (amount + 255)) / (255 * (259 - amount));
        for (let i = 0; i < canvasData.data.length; i += 4) {
            canvasData.data[i] = factor * (canvasData.data[i] - 128) + 128
            canvasData.data[i + 1] = factor * (canvasData.data[i + 1] - 128) + 128
            canvasData.data[i + 2] = factor * (canvasData.data[i + 2] - 128) + 128
        }
        this.context.putImageData(canvasData, 0, 0)
    }

    decreaseContrast() {
        const canvasData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        const amount = -5
        const factor = (259 * (amount + 255)) / (255 * (259 - amount));
        for (let i = 0; i < canvasData.data.length; i += 4) {
            canvasData.data[i] = factor * (canvasData.data[i] - 128) + 128
            canvasData.data[i + 1] = factor * (canvasData.data[i + 1] - 128) + 128
            canvasData.data[i + 2] = factor * (canvasData.data[i + 2] - 128) + 128
        }
        this.context.putImageData(canvasData, 0, 0)
    }
}