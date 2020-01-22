document.addEventListener('DOMContentLoaded', appStart)

function appStart() {
  let canvas = document.getElementById('canvasPaint')
  let context = canvas.getContext('2d')
  let mouseX = 0
  let mouseY = 0
  context.strokeStyle = '#000000'
  let isDrawing = false
  let strokeShape = 'square'
  let colors = document.getElementsByClassName('colors')[0];
  const clear = document.getElementById('clear')

  document
    .querySelector('#triangle')
    .addEventListener('click', () => strokeShape = 'triangle')

  document
    .querySelector('#square')
    .addEventListener('click', () => strokeShape = 'square')

  function setMouseCoordinates(event) {
    let bounds = canvas.getBoundingClientRect()
    let scaleX = canvas.width / bounds.width
    let scaleY = canvas.height / bounds.height

    mouseX = (event.clientX - bounds.left) * scaleX
    mouseY = (event.clientY - bounds.top) * scaleY
  }
  colors.addEventListener('click', function (event) {
    context.strokeStyle = event.target.value
  })

  canvas.addEventListener('mousedown', function (event) {
    setMouseCoordinates(event)
    isDrawing = true
    context.beginPath()
  })

  canvas.addEventListener('mousemove', function (event) {
    setMouseCoordinates(event)

    if (isDrawing) {
      switch (strokeShape) {
        case 'square': {
          context.rect(mouseX, mouseY, 10, 10);
          context.fillStyle = context.strokeStyle;
          context.fill()
          break
        }
        case 'triangle': {
          context.moveTo(mouseX, mouseY);
          context.lineTo(mouseX + 10, mouseY);
          context.lineTo(mouseX + (5), mouseY - 5);
          context.fillStyle = context.strokeStyle;
          context.fill()
          break
        }

      }
    }
  })

  canvas.addEventListener('mouseup', function (event) {
    setMouseCoordinates(event)
    isDrawing = false
  })

  const saveButton = document.getElementById('save');

  saveButton.addEventListener('click', () => new Save('canvasPaint'))

  clear.addEventListener('click', () => new Clear('canvasPaint'))

  document.getElementById('userImage').onchange = function (e) {
    const img = new Image()
    img.onload = draw;
    img.src = URL.createObjectURL(this.files[0])
  };
  function draw() {
    canvas.width = this.width
    canvas.height = this.height
    context.drawImage(this, 0, 0);
  }

  document
    .querySelector('#brightIncrease')
    .addEventListener('click', () => increaseBrightness())

  document
    .querySelector('#brightDecrease')
    .addEventListener('click', () => decreaseBrightness())

  document
    .querySelector('#invertColor')
    .addEventListener('click', () => invertColor())

  document
    .querySelector('#contrastIncrease')
    .addEventListener('click', () => increaseContrast())

  document
    .querySelector('#contrastDecrease')
    .addEventListener('click', () => decreaseContrast())

  document
    .querySelector('#grayscale')
    .addEventListener('click', () => grayscale())

  function decreaseBrightness(amount = 15) {
    const canvasData = context.getImageData(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < canvasData.data.length; i += 4) {
      canvasData.data[i] -= amount
      canvasData.data[i + 1] -= amount
      canvasData.data[i + 2] -= amount
    }
    context.putImageData(canvasData, 0, 0)
  }

  function increaseBrightness(amount = 15) {
    const canvasData = context.getImageData(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < canvasData.data.length; i += 4) {
      canvasData.data[i] += amount
      canvasData.data[i + 1] += amount
      canvasData.data[i + 2] += amount
    }
    context.putImageData(canvasData, 0, 0)
  }
  function invertColor() {
    const canvasData = context.getImageData(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < canvasData.data.length; i++) {
      canvasData.data[i * 4] = 255 - canvasData.data[i * 4]
      canvasData.data[i * 4 + 1] = 255 - canvasData.data[i * 4 + 1]
      canvasData.data[i * 4 + 2] = 255 - canvasData.data[i * 4 + 2]
    }
    context.putImageData(canvasData, 0, 0)
  }

  function grayscale() {
    const canvasData = context.getImageData(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < canvasData.data.length; i += 4) {

      let lightness = parseInt((canvasData.data[i] + canvasData.data[i + 1] + canvasData.data[i + 2]) / 3);

      canvasData.data[i] = lightness;
      canvasData.data[i + 1] = lightness;
      canvasData.data[i + 2] = lightness;
    }
    context.putImageData(canvasData, 0, 0)
  }

  function increaseContrast() {
    const canvasData = context.getImageData(0, 0, canvas.width, canvas.height)
    const amount = 5
    const factor = (259 * (amount + 255)) / (255 * (259 - amount));
    for (let i = 0; i < canvasData.data.length; i += 4) {
      canvasData.data[i] = factor * (canvasData.data[i] - 128) + 128
      canvasData.data[i + 1] = factor * (canvasData.data[i + 1] - 128) + 128
      canvasData.data[i + 2] = factor * (canvasData.data[i + 2] - 128) + 128
    }
    context.putImageData(canvasData, 0, 0)
  }

  function decreaseContrast() {
    const canvasData = context.getImageData(0, 0, canvas.width, canvas.height)
    const amount = -5
    const factor = (259 * (amount + 255)) / (255 * (259 - amount));
    for (let i = 0; i < canvasData.data.length; i += 4) {
      canvasData.data[i] = factor * (canvasData.data[i] - 128) + 128
      canvasData.data[i + 1] = factor * (canvasData.data[i + 1] - 128) + 128
      canvasData.data[i + 2] = factor * (canvasData.data[i + 2] - 128) + 128
    }
    context.putImageData(canvasData, 0, 0)
  }
}
