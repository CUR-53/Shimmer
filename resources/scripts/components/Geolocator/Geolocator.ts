/* eslint-disable class-methods-use-this */
import type BrowsingContext from "@ts/Shopify/AjaxApi/Markets/BrowsingContext";
import { setCookie, getCookie } from "@utils/CookieMethods";

type BrowsingContextData = {
  detectedCountry: {
    handle: string;
    name: string;
  };
  suggestedCountry?: {
    handle: string;
    name: string;
  };
  suggestedLanguage?: {
    handle: string;
    name: string;
  };
};

export default class Geolocator extends HTMLElement {
  geolocatorScript: HTMLScriptElement;

  countryDataArray: any[];

  geolocatorContentTemplate: HTMLTemplateElement;

  geolocatorContentPlaceholder: HTMLElement;

  modal: HTMLElement;

  closeModalButton: HTMLElement;

  closeCountryListModalButton: HTMLElement;

  countryModalToggle: HTMLElement;

  countryListModal: HTMLElement;

  countryListModalToggles: HTMLElement[];

  countryListButtons: HTMLAnchorElement[];

  stayButton: HTMLAnchorElement;

  leaveButton: HTMLAnchorElement;

  overlay: HTMLElement;

  constructor() {
    super();

    this.getBrowsingContext = this.getBrowsingContext.bind(this);
  }

  async connectedCallback() {
    this.initDataAndElements();
    this.addEventListeners();

    this.handleGeolocationCookie();
    const isCookied = getCookie("geolocation");

    if (isCookied) {
      // eslint-disable-next-line no-console
      console.log("Geolocation cookie is set. Geolocator will not run.");
      return;
    }

    const browsingContext = await this.getBrowsingContext();
    const activeCountry = this.getActiveCountryAndLanguage();

    const recommendedMatch = this.getRecommendedMatch(browsingContext);

    // If the recommended match is the same as the active country, return early as we do not need to show the geolocator
    if (recommendedMatch?.handle === activeCountry.country) {
      // eslint-disable-next-line no-console
      console.log("Recommended match is the same as the active country. Geolocator will not run.");
      return;
    }

    this.toggleGeolocator();
    this.setupGeolocatorContent(recommendedMatch);
  }

  handleGeolocationCookie() {
    const urlParams = new URLSearchParams(window.location.search);
    const geolocation = urlParams.get("geolocation");

    if (geolocation) {
      setCookie("geolocation", geolocation, 30);
    }
  }

  toggleGeolocator() {
    this.classList.toggle("tw:hidden");
    this.setAttribute("geolocation-modal-active", this.getAttribute("geolocation-modal-active") === "true" ? "false" : "true");
    setTimeout(() => {
      this.modal.classList.toggle("active");
    }, 300);
  }

  setupGeolocatorContent(recommendedMatch) {
    const geolocatorContent = this.geolocatorContentTemplate.content.cloneNode(true) as HTMLElement;
    const content = geolocatorContent.querySelector(`[data-id="${recommendedMatch.id}"]`);

    if (content) {
      this.geolocatorContentPlaceholder.appendChild(content);
    }

    this.countryModalToggle = this.querySelector(".country-modal-toggle");
    this.stayButton = this.querySelector(".stay-button");
    this.leaveButton = this.querySelector(".leave-button");

    this.countryModalToggle.addEventListener("click", (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      this.toggleCountryListModal(this.countryModalToggle);
    });

    this.stayButton.addEventListener("click", (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      setCookie("geolocation", recommendedMatch.handle, 30);
      this.toggleGeolocator();
    });

    this.leaveButton.addEventListener("click", (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      const { locale, handle, type } = this.leaveButton.dataset;

      setCookie("geolocation", "handle", 30);

      const isMarket = type === "market";

      if (!isMarket) {
        window.location.href = `${window.location.href}?geolocation=${this.leaveButton.dataset.handle}`;
        return;
      }

      this.handleMarketSwitch(handle, locale);
    });
  }

  toggleCountryListModal(trigger: HTMLElement) {
    const geoLocatorActive = this.getAttribute("geolocation-modal-active") === "true";
    // make it boolean
    const isInModalTrigger = trigger.dataset.inmodaltoggle === "true";

    if (isInModalTrigger && !geoLocatorActive) {
      this.classList.toggle("tw:hidden");
      this.countryListModal.classList.toggle("active");
      return;
    }

    if (isInModalTrigger) {
      this.modal.classList.toggle("active");
      this.countryListModal.classList.toggle("active");
    } else {
      this.classList.toggle("tw:hidden");
      this.countryListModal.classList.add("active");
    }
  }

  initDataAndElements() {
    this.modal = this.querySelector("#geolocator-modal");

    this.closeModalButton = this.querySelector("#close-geolocator-modal");
    this.geolocatorScript = this.querySelector("#geolocator-script");
    this.countryDataArray = JSON.parse(this.geolocatorScript.innerHTML);

    this.geolocatorContentTemplate = this.querySelector("#geolocator-content-tempalte");

    this.geolocatorContentPlaceholder = this.querySelector("#geolocator-content-placeholder");

    this.countryListModal = this.querySelector("#geolocator-countrylist-modal");

    this.closeCountryListModalButton = this.querySelector("#close-geolocator-countrylist-modal");

    this.countryListButtons = Array.from(this.querySelectorAll(".countrylist-button"));

    this.countryListModalToggles = Array.from(document.querySelectorAll(".country-modal-toggle"));

    this.overlay = this.querySelector(".geolocator-overlay");
  }

  addEventListeners() {
    this.closeModalButton?.addEventListener("click", (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      this.toggleGeolocator();
    });

    this.closeCountryListModalButton.addEventListener("click", (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      this.toggleCountryListModal(this.closeCountryListModalButton);
    });

    this.countryListButtons.forEach((button) => {
      button.addEventListener("click", (event: MouseEvent | TouchEvent) => {
        event.preventDefault();
        this.handleCountryListButtonClick(button);
      });
    });

    this.countryListModalToggles.forEach((toggle) => {
      toggle?.addEventListener("click", (event: MouseEvent | TouchEvent) => {
        event.preventDefault();

        this.toggleCountryListModal(toggle);
      });
    });
  }

  handleCountryListButtonClick(button: HTMLAnchorElement) {
    setCookie("geolocation", button.dataset.handle, 30);

    const isMarket = button.dataset.type === "market";

    if (!isMarket) {
      window.location.href = `${window.location.href}?geolocation=${button.dataset.handle}`;
      return;
    }

    const { locale, handle } = button.dataset;
    this.handleMarketSwitch(handle, locale);
  }

  handleMarketSwitch(handle: string, locale: string) {
    const formId = crypto.randomUUID();
    const formElement = document.createElement("form");
    formElement.id = formId;
    formElement.action = "/localization";
    formElement.method = "POST";
    formElement.hidden = true;

    formElement.innerHTML = `
      <input name="_method" value="PUT">
      <input name="country_code" value="${handle}">
      <input name="language_code" value="${locale}">
      <input name="return_to" value="${window.location.href}?geolocation=${handle}">
    `;
    document.body.appendChild(formElement);
    formElement.submit();
  }

  getActiveCountryAndLanguage() {
    const { country, locale } = window.Shopify;

    return {
      country,
      locale,
    };
  }

  getRecommendedMatch(browsingContext: BrowsingContextData) {
    if (!browsingContext) return; // If no browsing context, return early

    const { suggestedCountry, suggestedLanguage, detectedCountry } = browsingContext;
    const countryHandle = suggestedCountry?.handle || detectedCountry?.handle;
    const languageHandle = suggestedLanguage?.handle;

    if (!countryHandle) return;

    // Look for an exact match (country & language)
    let recommendedMatch = this.countryDataArray.find((country) => country.handle === countryHandle && country.locale === languageHandle);

    // If no exact match, look for a country-only match
    if (!recommendedMatch) {
      recommendedMatch = this.countryDataArray.find((country) => country.handle === countryHandle);
    }

    if (!recommendedMatch) {
      // find the country in countryDataArray that has primary set to true
      recommendedMatch = this.countryDataArray.find((country) => country.primary);
    }

    // In the end we either have
    // 1. An exact match on both country and language
    // 2. A match on country only
    // 3. A match on primary country

    // eslint-disable-next-line consistent-return
    return recommendedMatch;
  }

  async getBrowsingContext() {
    const response = await fetch("/browsing_context_suggestions.json?country[enabled]=true&language[enabled]=true");
    const data = (await response.json()) as BrowsingContext;

    const detectedValues = data.detected_values;
    const { handle, name } = detectedValues.country;

    const { suggestions } = data;

    let suggestedCountry = null;
    let suggestedLanguage = null;

    if (suggestions.length) {
      // Check if there is a suggestion who has parts.country.handle which is equal to detectedValues.country.handle
      const suggestion = suggestions.find((_suggestion) => _suggestion.parts.country.handle === detectedValues.country.handle);
      suggestedCountry = suggestion?.parts.country;
      suggestedLanguage = suggestion?.parts.language;
    }

    const browsingContext = {
      detectedCountry: {
        handle,
        name,
      },
      suggestedCountry,
      suggestedLanguage,
    } as BrowsingContextData;

    return browsingContext;
  }
}
