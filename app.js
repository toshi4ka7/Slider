import Slider from './slider'

const slider = new Slider('.slider__items', {
  //loop: 2000,
  class: true,
  pagination: {
    selector: '.pagination',
    number: true,
    link: true
  },
  prev: '.slider__control-left',
  next: '.slider__control-right',
  start: '.slider__control-start',
  end: '.slider__control-end',
  page: '.page',
  pages: '.pages',
  states: [
    {
      width: 5000,
      count: 4,
      move: 1
    },
    {
      width: 1200,
      count: 3,
      move: 1
    },
    {
      width: 800,
      count: 2,
      move: 2
    },
    {
      width: 500,
      count: 1,
      move: 1
    }
  ]
  
})

window.s = slider