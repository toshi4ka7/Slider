const config = [{
  width: 0,
  count: 3,
  move: 1,
}]

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
    this.items = Array.from(this.container.children)
    this.itemsCount = this.items.length

    this.container.style.transition = 'transform 0.6s'
    this.class = options.class || false

    this.controlNext = document.querySelector(options.next)
    this.controlPrev = document.querySelector(options.prev)
    this.controlStart = document.querySelector(options.start)
    this.controlEnd = document.querySelector(options.end)
    this.veiwPage = document.querySelector(options.page)
    this.veiwPages = document.querySelector(options.pages)

    if (options.pagination) {
      this.paginationOptions = options.pagination
      this.pagination = document.querySelector(this.paginationOptions.selector)
    }

    if (this.controlNext) this.controlNext.addEventListener('click', this.next.bind(this))
    if (this.controlPrev) this.controlPrev.addEventListener('click', this.prev.bind(this))
    if (this.controlStart) this.controlStart.addEventListener('click', this.start.bind(this))
    if (this.controlEnd) this.controlEnd.addEventListener('click', this.end.bind(this))


    this.state = []
    const state = options.states || config
    state.forEach((state) => {
      this.#createState(state.width, state.count, state.move)
    })

    this.mediaWidth = this.state.map((state) => {
      return state.width
    }).sort((a,b) => a - b)

    if (options.loop) {
      this.loopDirection = 'next'
      setInterval(loopHundler.bind(this), options.loop)
    }

    window.addEventListener('resize', windowHandler.bind(this))
    window.addEventListener('load', windowHandler.bind(this))
    this.pagination ? this.pagination.addEventListener('click', paginationHandler.bind(this)) : null

  }

  goToCount(count) {
    const state = this.state.filter((state) => {
      if (state.count === count) return true
    })[0]

    this.width = state.width
    this.history = state.history
    this.position = state.position
    this.count = state.count
    this.move = state.move
    this.pages = state.pages
    this.widthItem = state.widthItem
  }


  #createState(width, count, move) {
    const state = {}
    state.history = []
    state.position = []
    state.width = width
    state.count = count
    state.move = move
    state.pages = Math.ceil((this.itemsCount - state.count) / state.move) + 1
    state.widthItem = 100 / state.count
    
    let start = 0
    for (let i = 0; i < state.pages; i++) {
      const array = this.items.slice(start, start + state.count)
      state.history.push(array)
      state.position.push(-i * state.widthItem * state.move)
      start += state.move
    }

    if (state.history[state.history.length - 1].length !== state.count) {
      state.history[state.history.length - 1] = this.items.slice(-state.count)
      state.position[state.position.length - 1] = -(this.itemsCount - state.count) * state.widthItem
    }

    this.state.push(state)
  }

  goToPage(page) {
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
    this.class ? this.addClass() : null
    this.container.style.transform = `translateX(${position}%)`
    this.veiwPage ? this.veiwPage.textContent = this.page : null
    this.veiwPages ? this.veiwPages.textContent = this.pages : null
    if (this.pagination) this.changePagination()
  }

  changePagination() {
    Array.from(this.pagination.children).forEach((elem, index) => {
      if (index + 1 === this.page) {
        elem.classList.add('active')
      } else {
        elem.classList.remove('active')
      }
    })
  }

  renderPagination() {
    this.pagination.innerHTML = ''

    const fragment = document.createDocumentFragment()
    for (let i = 0; i < this.pages; i++) {
      const item = document.createElement('div')
      item.classList.add(`${this.paginationOptions.selector.slice(1)}__item`)
      item.setAttribute('data-id', i + 1)
      if (this.paginationOptions.number) item.textContent = i + 1
      fragment.append(item)
    }

    this.pagination.append(fragment)
    this.changePagination()
  }

  createPagination() {
    this.pagination = document.querySelector(this.paginationOptions.selector)
    const item = this.pagination.children[0]
    this.pagination.innerHTML = ''

    const fragment = document.createDocumentFragment()
    for (let i = 0; i < this.pages; i++) {
      fragment.append(item)
    }

    this.pagination.append(fragment)
  }

  addClass() {
    this.items.forEach((elem) => {
      elem.classList.remove('right')
      elem.classList.remove('left')
    })
    if (this.count >= 2) {
      this.history[this.page - 1][0].classList.add('left')
      this.history[this.page - 1][this.history[this.page - 1].length - 1].classList.add('right')
    }
  }

  next() {
    this.goToPage(this.page + 1)
  }

  prev() {
    this.goToPage(this.page - 1)

  }

  start() {
    this.goToPage(1)
  }

  end() {
    this.goToPage(this.pages)
  }




}

module.exports = Slider

function windowHandler(e) {
  const windowWidth = window.innerWidth

  const width = this.mediaWidth.filter((width) => {
    if (width >= windowWidth) return true
  })[0]

  const count = this.state.filter((state) => {
    if (state.width === width) return true
  })[0].count


  if (e.type === 'load') {
    this.goToCount(count)
    this.goToPage(1)
    this.pagination ? this.renderPagination() : null
    return
  }

  if (count === this.count) return


  const elem = this.history[this.page - 1][0]
  this.goToCount(count)

  this.history.forEach((array, index) => {
    if (array.includes(elem)) {
      this.container.style.transition = 'none'
      this.goToPage(index + 1)
      this.pagination ? this.renderPagination() : null
      setTimeout(() => {
        this.container.style.transition = 'transform 0.6s'
      }, 0)
      
      return
    }
  })
}

function paginationHandler(e) {
  if (!this.paginationOptions.link) return
  const page = +e.target.getAttribute('data-id')
  this.goToPage(page)
}

function loopHundler() {
  if (this.loopDirection === 'next') {
    if (this.page + 1 > this.pages) {
      this.goToPage(this.page - 1)
      this.loopDirection = 'prev'
    } else {
      this.goToPage(this.page + 1)
    }
  } else {
    if (this.page === 1) {
      this.goToPage(2)
      this.loopDirection = 'next'
    } else {
      this.goToPage(this.page - 1)
    }
  }
}