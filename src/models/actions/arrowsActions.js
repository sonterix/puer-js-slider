import { setAnimationStatus } from '@models/helpers/disablers'
import { isAnimation } from '@models/helpers/checkers'
import CONFIG from '@models/config'

const switchSlide = where => {
  const sliderWrapper = document.querySelector('[data-nick="nick-slider"]')
  const currentLeftValue = +getComputedStyle(sliderWrapper).left.replace(/[^\d.-]/g, '')
  const currentActiveSlide = sliderWrapper.querySelector('[data-nick="nick-slide"].active')

  // Add nex or prev slide to the variable
  const futureActiveSlide =
    where === 'next' ? currentActiveSlide.nextSibling : where === 'prev' ? currentActiveSlide.previousSibling : null

  if (futureActiveSlide) {
    // Disable actions to prevent new action before animationg ends
    setAnimationStatus(true)

    // Do + or - based on next or prev slide direction
    sliderWrapper.style.left =
      where === 'next'
        ? `${currentLeftValue - futureActiveSlide.scrollWidth}px`
        : where === 'prev'
        ? `${currentLeftValue + futureActiveSlide.scrollWidth}px`
        : '0px'

    // Replace active class
    currentActiveSlide.classList.remove('active')
    futureActiveSlide.classList.add('active')

    // Enable actions
    setTimeout(() => setAnimationStatus(false), CONFIG.transitionSpeed)
  }
}

// Go to next slide
const toNextSlide = () => !isAnimation() && switchSlide('next')

// Go to prev slide
const toPrevSlide = () => !isAnimation() && switchSlide('prev')

export { toNextSlide, toPrevSlide }