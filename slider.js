const config = {
  count: 3,
  move: 3,
}

class Slider { 
  constructor(selector, options = {}) {
    this.container = document.querySelector(selector)

    if (this.container) {
      this.#Init(options)
    } else {
      console.error(`Not element with selector = ${this.selector}`)
    }
  }

  #Init(options) {
    this.count = options.count || config.count
    this.move = options.move || config.move
    this.items = Array.from(this.container.children)
    this.length = this.items.length

    this.controlNext = document.querySelector(options.next)
    this.controlPrev = document.querySelector(options.prev)
    this.controlStart = document.querySelector(options.start)
    this.controlEnd = document.querySelector(options.end)

    if (this.controlNext) this.controlNext.addEventListener('click', this.next.bind(this))
    if (this.controlPrev) this.controlPrev.addEventListener('click', this.prev.bind(this))
    if (this.controlStart) this.controlStart.addEventListener('click', this.start.bind(this))
    if (this.controlEnd) this.controlEnd.addEventListener('click', this.end.bind(this))



    this.#initState()
    this.page = 1
    this.goTo(this.page)

    
    

  
  }

  #ChangeState() {
 
  }


  #initState() {
    this.pages = Math.ceil((this.length - this.count) / this.move) + 1
    this.widthItem = 100 / this.count
    this.history = []
    this.position = []

    let start = 0
    for (let i = 0; i < this.pages; i++) {
      const array = this.items.slice(start, start + this.count)
      this.history.push(array)
      this.position.push(-i * this.widthItem * this.move)
      start += this.move
    }

    if (this.history[this.history.length - 1].length !== this.count) {
      this.history[this.history.length - 1] = this.items.slice(-this.count)
      this.position[this.position.length - 1] = -(this.length - this.count) * this.widthItem
    }
  }

  goTo(page) {
    if (page <= 0 || page > this.pages) return;
    this.page = page

    if (page === 1) {
      if (this.controlPrev) this.controlPrev.classList.add('disabled')
      if (this.controlStart) this.controlStart.classList.add('disabled')
      if (this.controlNext) this.controlNext.classList.remove('disabled')
      if (this.controlEnd) this.controlEnd.classList.remove('disabled')
    } else if(page === this.pages) {
      if (this.controlPrev) this.controlPrev.classList.remove('disabled')
      if (this.controlStart) this.controlStart.classList.remove('disabled')
      if (this.controlNext) this.controlNext.classList.add('disabled')
      if (this.controlEnd) this.controlEnd.classList.add('disabled')
    } else {
      if (this.controlNext) this.controlNext.classList.remove('disabled')
      if (this.controlPrev) this.controlPrev.classList.remove('disabled')
      if (this.controlStart) this.controlStart.classList.remove('disabled')
      if (this.controlEnd) this.controlEnd.classList.remove('disabled')
    }

    const position = this.position[page - 1]
    this.container.style.transform = `translateX(${position}%)`
  }

  next() {
    this.goTo(this.page + 1)
  }

  prev() {
    this.goTo(this.page - 1)

  }

  start() {
    this.goTo(1)
  }

  end() {
    this.goTo(this.pages)
  }




}

module.exports = Slider