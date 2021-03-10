const config = {
  count: 3,
  pagination: false,
  fullStep: false
}


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

    this.options = {
      count: 3,
      pagination: false,
      step: 1
    }

    for (key in options) {
      this.options[key] = options[key]
    }

    console.log(this.options)

    this.step = (100 / this.options.count) * this.options.step

    this.container = this.slider.querySelector('.slider__items')
    this.controlLeft = this.slider.querySelector('.slider__control-left')
    this.controlRight = this.slider.querySelector('.slider__control-right')
    

    if (!this.container) return console.error('Slider: not element with selector .slider_items')
    if (!this.controlLeft) return console.error('Slider: not element with selector .slider__control-left')
    if (!this.controlRight) return console.error('Slider: not element with selector .slider__control-right')


    this.items = Array.from(this.container.querySelectorAll('.slider__item'))

    this.#createPagination()

    this.controlRight.addEventListener('click', controlRightClickhundler.bind(this))
    this.controlLeft.addEventListener('click', controlLeftClickHundler.bind(this))

  }

  #createPagination() {
    this.containerPagination = document.createElement('ul')
    this.containerPagination.classList.add('pagination')

    for (let i = 0; i <= this.items.length - this.count; i++) {
      const item = document.createElement('li')
      item.classList.add('pagination__item')
      if (i === 0) item.classList.add('active')
      this.containerPagination.append(item)
    }

    if (this.options.pagination) this.slider.after(this.containerPagination)
  }

  moveRight() {
    if (!this.canMoveRight) return

    this.position -= this.step
    this.#movePagination(+1)
    !this.canMoveRight ? this.controlRight.classList.add('disabled') : this.controlLeft.classList.remove('disabled')
  }

  moveLeft() {
    if (!this.canMoveLeft) return

    this.position += this.step
    this.#movePagination(-1)
    !this.canMoveLeft ? this.controlLeft.classList.add('disabled') : this.controlRight.classList.remove('disabled')
  }

  #movePagination(value) {
    const indexAction = Array.from(this.containerPagination.children).findIndex((elem, index) => {
      if (elem.classList.contains('active')) return true
    })
    this.containerPagination.children[indexAction].classList.remove('active')
    this.containerPagination.children[indexAction + value].classList.add('active')
  }

  get canMoveRight() {
    const maxPosition = Math.round(-this.step * (this.items.length - this.count))
    if (Math.round(this.position) <= maxPosition) {
      return false
    } else {
      return true
    }

  }

  get canMoveLeft() {
    if (Math.round(this.position) === 0)
      return false
    else
      return true
  }

  get position() {
    return +this.container.style.transform.slice(11, -2)
  }

  set position(value) {
    this.container.style.transform = `translateX(${value}%)`
  }

  set count(value) {
    this.options.count = value
    this.step = (100 / value) * this.options.step
  }

  set pagination(flag) {
    this.options.pagination = flag
    if (flag) {
      this.slider.after(this.containerPagination)
    } else {
      document.querySelector('.pagination').replaceWith('')
    }
  }


}

function controlRightClickhundler(e) {
  this.moveRight()
}

function controlLeftClickHundler(e) {
  this.moveLeft()
}

module.exports = Slider