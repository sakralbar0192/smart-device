
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
