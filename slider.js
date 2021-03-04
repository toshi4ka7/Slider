class Slider {

  constructor(selector, options = {}) {
    this.slider = document.querySelector(selector)

    if (this.slider) {
      this.#init(options)
    } else {
      console.error(`Slider: not element with selector "${selector}"`)
    }
  }

  #init(options) {

    this.options = options
    this.count = options.count || 2

    this.container = this.slider.querySelector('.slider__items')
    if (!this.container) return console.error('Slider: not element with selector .slider_items')

    this.controlLeft = this.slider.querySelector('.slider__control--left')
    if (!this.controlLeft) return console.error('Slider: not element with selector .slider__control--left')

    this.controlRight = this.slider.querySelector('.slider__control--right')
    if (!this.controlRight) return console.error('Slider: not element with selector .slider__control--right')

    this.items = Array.from(this.container.querySelectorAll('.slider__item'))

    this.controlRight.addEventListener('click', controlRightClickhundler.bind(this))
    this.controlLeft.addEventListener('click', controlLeftClickHundler.bind(this))

  }

  moveRight() {
    if (this.position <= -this.step * (this.items.length - this.count)) return
    this.position -= this.step
  }

  moveLeft() {
    if (this.position === 0) {
      return
    }
    this.position += this.step
  }

  get position() {
    return +this.container.style.transform.slice(11, -2)
  }

  set position(value) {
    this.container.style.transform = `translateX(${value}%)`
  }

  get count() {
    return this.options.count
  }

  set count(value) {
    this.options.count = value
    this.step = 100 / value
  }

  







}

function controlRightClickhundler(e) {
  this.moveRight()
}

function controlLeftClickHundler(e) {
  this.moveLeft()
}

module.exports = Slider