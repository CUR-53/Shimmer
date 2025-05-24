export default class MultistoreSwitcher extends HTMLElement {
  constructor() {
    super();
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleSwitchClick = this.handleSwitchClick.bind(this);
  }

  connectedCallback() {
    this.addEventListener('click', this.handleSwitchClick);
    document.addEventListener('click', this.handleDocumentClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleSwitchClick);
    document.removeEventListener('click', this.handleDocumentClick);
  }

  private handleSwitchClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const button = target.closest('.language-switcher-button');
    const switchBtn = target.closest('.switcher-btn');

    if (button) {
      event.preventDefault();
      this.toggleDropdown(button);
    }

    if (switchBtn) {
      event.preventDefault();
      this.submitLanguageForm(switchBtn);
    }
  }

  private handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.contains(target)) {
      this.closeAllDropdowns();
    }
  }

  private toggleDropdown(button: Element) {
    const switcher = button.closest('.language-switcher');
    if (!switcher) return;

    const dropdown = switcher.querySelector('.language-dropdown-menu');
    if (!dropdown) return;

    const isHidden = dropdown.classList.contains('tw:hidden');
    button.setAttribute('aria-expanded', String(isHidden));
    dropdown.classList.toggle('tw:hidden');

    this.closeOtherDropdowns(switcher);
  }

  private closeAllDropdowns() {
    this.querySelectorAll('.language-switcher').forEach((switcher) => {
      const button = switcher.querySelector('.language-switcher-button');
      const dropdown = switcher.querySelector('.language-dropdown-menu');
      if (button && dropdown) {
        button.setAttribute('aria-expanded', 'false');
        dropdown.classList.add('tw:hidden');
      }
    });
  }

  private closeOtherDropdowns(currentSwitcher: Element) {
    this.querySelectorAll('.language-switcher').forEach((switcher) => {
      if (switcher !== currentSwitcher) {
        const button = switcher.querySelector('.language-switcher-button');
        const dropdown = switcher.querySelector('.language-dropdown-menu');
        if (button && dropdown) {
          button.setAttribute('aria-expanded', 'false');
          dropdown.classList.add('tw:hidden');
        }
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private submitLanguageForm(button: Element) {
    const countryCode = button.getAttribute('data-country-code');
    const languageCode = button.getAttribute('data-language-code');

    if (countryCode && languageCode) {
      const form = document.createElement('form');
      form.hidden = true;
      form.method = 'POST';
      form.action = '/localization';

      const methodInput = document.createElement('input');
      methodInput.name = '_method';
      methodInput.value = 'PUT';

      const countryInput = document.createElement('input');
      countryInput.name = 'country_code';
      countryInput.value = countryCode;

      const languageInput = document.createElement('input');
      languageInput.name = 'language_code';
      languageInput.value = languageCode;

      form.appendChild(methodInput);
      form.appendChild(countryInput);
      form.appendChild(languageInput);
      document.body.appendChild(form);
      form.submit();
    }
  }
}

/* 
______________________________________________________________________________________

Render the snippet in a section you would like to display the language switcher on.
  
  For header view
  {% render 'multistore-switcher' %}

  For footer view
  {% render 'multistore-switcher' view: 'footer' %}

  For mobile menu view
  {% render 'multistore-switcher' view: 'mobile' %}

______________________________________________________________________________________

settings_schema.json

{
  "name": "Language Switcher",
  "settings": [
    {
      "type": "header",
      "content": "Language Switcher"
    },
    {
      "type": "text",
      "id": "language_switcher_countries",
      "label": "Country Code List (comma separated)",
      "default": "DK,SE"
    },
    {
      "type": "text",
      "id": "language_switcher_locales",
      "label": "Locales (comma separated)",
      "default": "da,sv"
    },
    {
      "type": "text",
      "id": "language_switcher_labels",
      "label": "Labels (comma separated)",
      "default": "Dansk,Svenska"
    }
  ]
}, 
______________________________________________________________________________________
*/
