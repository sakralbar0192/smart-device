
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
const NON_SCROLLING_BLOCK_CLASS = 'non-scrolling-block';
const ESCAPE_KEY_CODE = 27;
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
      pageBody.classList.remove(NON_SCROLLING_BLOCK_CLASS);
    }
  }, {once: true});

  overlay.addEventListener('click', () => {
    modal.classList.remove(OPEN_MODAL_CLASS)
    pageBody.classList.remove(NON_SCROLLING_BLOCK_CLASS);
  })

  closeButton.addEventListener('click', () => {
    modal.classList.remove(OPEN_MODAL_CLASS)
    pageBody.classList.remove(NON_SCROLLING_BLOCK_CLASS);
  })
});

/**
 * Сохранение в localStorage
 */

const forms =document.querySelectorAll('.feedback-form');


Array.from(forms).forEach(form => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formFields = form.querySelectorAll('input[type="text"], input[type="tel"], textarea')

    if (window.localStorage) {
      formFields.forEach((field) => {
        localStorage.setItem(field.name, field.value)
      })
    }
  })
})

/**
 * Плавная прокрутка от якорных ссылок
 */

const anchors = document.querySelectorAll('a[href="#features"], a[href="#feedback-form"]')

Array.from(anchors).forEach(anchor => {
  anchor.addEventListener('click', (evt) => {
    evt.preventDefault();

    const blockId = anchor.getAttribute('href');
    document.querySelector(blockId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  })
})

/**
 * Маска телефона
 */

if (document.querySelector('input[type="tel"]')) {

  document.addEventListener('DOMContentLoaded', function () {

    const phoneInput = document.querySelector('input[type="tel"]');

    const getInputNumbersValue = (input) => {
      return input.value.replace(/\D/g, '');
    };

    const onPhoneInput = (e) => {
      const input = e.target;
      let inputNumbersValue = getInputNumbersValue(input);
      let formatedInputValue = '';
      const selectionStart = input.selectionStart;

      if (!inputNumbersValue) {
        return input.value = '';
      }

      if (input.value.length != selectionStart) {
        if (e.data && /\D/g.test(e.data)) {
          input.value = inputNumbersValue;
        }

        return;
      }

      if (['7', '8'].includes(inputNumbersValue[0])) {
        const firstSimbols = inputNumbersValue[0] == '8' ? '8' : '+7';
        formatedInputValue = firstSimbols + ' ';

        if (inputNumbersValue.length > 1) {
          formatedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }

        if (inputNumbersValue.length >= 5) {
          formatedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }

        if (inputNumbersValue.length >= 8) {
          formatedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }

        if (inputNumbersValue.length >= 10) {
          formatedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
      } else {
        formatedInputValue = '+7' + inputNumbersValue;
      }

      input.value = formatedInputValue;
    };

    const onPhoneKeyDown = (e) => {
      const input = e.target;

      if (e.keyCode == 8 && getInputNumbersValue(input).length == 1) {
        input.value = '';
      }
    };

    const onPhonePaste = (e) => {
      const pasted = e.clipboardData || window.clipboardData,
        input = e.target,
        inputNumbersValue = getInputNumbersValue(input);

      if (pasted) {
        const pastedText = pasted.getData('Text');

        if (/\D/g.test(pastedText)) {
          input.value = inputNumbersValue;
        }
      }
    };

    phoneInput.addEventListener('input', onPhoneInput);
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('paste', onPhonePaste);
  });
}
