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
  
  document
    .querySelector('#filters')
    .addEventListener('click', (e) => new Filter('canvasPaint', e).pickFilter());

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
}
