
/**
 * аккордион
 */

const ACTIVE_ACCORDION_CLASS = '_accordion-active';
const OPEN_ACCORDION_CLASS = '_accordion-open';
const accordionSections = document.querySelectorAll('.accordion');

Array.from(accordionSections).forEach(accordion => {
  accordion.classList.add(ACTIVE_ACCORDION_CLASS);
  const accordionTitle = accordion.querySelector('.accordion__title');
  accordionTitle.addEventListener('click', () => {
    accordion.classList.toggle(OPEN_ACCORDION_CLASS);
  })
})

/**
 * Модальное окно
 */

const OPEN_MODAL_CLASS = '_open';
const NON_SCROLLING_BLOCK_CLASS = '.non-scrolling-block';
const ESCAPE_KEY_CODE ='27';
const pageBody = document.querySelector('#page-body');
const modal = document.querySelector('#modal');
const closeButton = document.querySelector('#close-modal-button')
const overlay = document.querySelector('#modal-overlay');
const modalViewButton = document.querySelector('#modal-view-button');

modalViewButton.addEventListener('click', () => {
  modal.classList.add(OPEN_MODAL_CLASS);
  pageBody.classList.add(NON_SCROLLING_BLOCK_CLASS);

  window.addEventListener('keydown',(evt) => {
    if (evt.keyCode === ESCAPE_KEY_CODE){
      modal.classList.remove(OPEN_MODAL_CLASS);
      console.log('klick');
    }
  }, {once: true});

  overlay.addEventListener('click', () => {
    modal.classList.remove(OPEN_MODAL_CLASS)
  })

  closeButton.addEventListener('click', () => {
    modal.classList.remove(OPEN_MODAL_CLASS)
  })
});
