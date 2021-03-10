import Slider from './slider'

const slider = new Slider('.slider__items', {
  prev: '.slider__control-left',
  next: '.slider__control-right',
  start: '.slider__control-start',
  end: '.slider__control-end',
  states: [
    {
      width: 5000,
      count: 3,
      move: 3
    },
    {
      width: 800,
      count: 2,
      move: 1
    },
    {
      width: 500,
      count: 1,
      move: 1
    }
  ]
  
})

window.s = slider