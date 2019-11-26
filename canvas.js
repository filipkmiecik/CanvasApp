document.addEventListener('DOMContentLoaded', appStart)

let ps
let ctx
let canvas

function appStart() {
  ps = new Drawing('canvasPaint')
  canvas = document.querySelector('#canvas')
  document
    .querySelector('#square')
    .addEventListener('mousedown', () => ps.setBrush('square'))
  document
    .querySelector('#circle')
    .addEventListener('mousedown', () => ps.setBrush('circle'))
  document
    .querySelector('#triangle')
    .addEventListener('mousedown', () => ps.setBrush('triangle'))
  document
    .querySelector('#brightDecrease')
    .addEventListener('click', () => darkenFilter())
  
  document.getElementById('userImage').addEventListener('change', readURL, true)
  function readURL() {
    var file = document.getElementById("userImage").files[0]
    var reader = new FileReader()
    reader.onloadend = function () {
      document.getElementById('canvasPaint').style.backgroundImage = "url(" + reader.result + ")"
    }
    reader.readAsDataURL(file)
  } 

}

function darkenFilter(amount = 30) {
  const canvasData = ctx.getImageData(0, 0, 800, 600)
  for (let i = 0; i < canvasData.data.length; i += 4) {
    // R
    canvasData.data[i] -= amount
    // G
    canvasData.data[i + 1] -= amount
    // B
    canvasData.data[i + 2] -= amount
  }
  ctx.putImageData(canvasData, 0, 0)
}

