export default class TermsAndConditions extends HTMLElement {
  termsCheckmark: HTMLElement = this.querySelector('.terms_checkmark') as HTMLElement;

  termsCheckbox: HTMLInputElement = this.querySelector('#terms_checkbox') as HTMLInputElement;

  checkoutBtn: HTMLButtonElement = this.querySelector("button[name='checkout']") as HTMLButtonElement;

  popoverTerms: HTMLElement = document.querySelector('#popover_terms') as HTMLElement;

  popoverTermsContainer: HTMLElement = document.querySelector('.popover_terms_container') as HTMLElement;

  popoverTermsClose: HTMLElement = document.querySelector('#popover_terms_close') as HTMLElement;

  acceptTermsButton: HTMLButtonElement = document.querySelector('#accept_terms_button') as HTMLButtonElement;

  constructor() {
    super();

    this.documentClickHandler = this.documentClickHandler.bind(this);
    this.checkoutBtnHandler = this.checkoutBtnHandler.bind(this);
    this.acceptTermsCloseHandler = this.acceptTermsCloseHandler.bind(this);
    this.acceptTermsButtonHandler = this.acceptTermsButtonHandler.bind(this);
    this.termsCheckboxChangeHandler = this.termsCheckboxChangeHandler.bind(this);
  }

  connectedCallback() {
    if (this.checkoutBtn && this.termsCheckbox) {
      this.checkoutBtn.addEventListener('click', this.checkoutBtnHandler);
      this.popoverTermsClose.addEventListener('click', this.acceptTermsCloseHandler);
      this.termsCheckbox.addEventListener('change', this.termsCheckboxChangeHandler);
      this.acceptTermsButton.addEventListener('click', this.acceptTermsButtonHandler);
    }
  }

  checkoutBtnHandler(e: Event) {
    if (!this.termsCheckbox.checked) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      this.popoverTerms.classList.remove('tw:hidden');
    }
  }

  termsCheckboxChangeHandler() {
    if (this.termsCheckbox.checked) {
      this.checkoutBtn.setAttribute('name', 'checkout');
    } else {
      this.checkoutBtn.removeAttribute('name');
    }
  }

  acceptTermsButtonHandler() {
    this.termsCheckbox.click();
    this.termsCheckboxChangeHandler();
    setTimeout(() => {
      if (this.termsCheckbox.checked) {
        this.checkoutBtn.click();
      }
    }, 200);
  }

  documentClickHandler(e: MouseEvent) {
    const target = e.target as Node;
    if (this.popoverTerms && !this.popoverTermsContainer.contains(target) && !this.checkoutBtn.contains(target)) {
      this.popoverTerms.classList.add('tw:hidden');
    }
  }

  acceptTermsCloseHandler(e: Event) {
    e.preventDefault();
    this.popoverTerms.classList.add('tw:hidden');
  }
}
