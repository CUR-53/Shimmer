// Consent Component
//
// This class manages user consent tracking and interaction with Shopify's consent-tracking API.
// It includes methods for initializing consent features, handling consent updates, and interacting
// with Shopify's privacy settings.
//
// Key Functionalities:
// - `init()`: Loads Shopify's consent-tracking API and initializes the consent component.
// - `initConsentComponent()`: Sets up event listeners for consent actions, such as recalling consent preferences.
// - `handleConsentUpdate(state: string)`: Updates consent settings based on the user's current preferences.
//   - Parameters:
//     - `state`: A string representing the consent state ("granted", "denied", etc.).
// - `checkConsentBannerInteraction()`: Verifies if the user has interacted with the consent banner.
// - `gtag(...args)`: Pushes consent-related events to the Google Tag Manager data layer.
// - `recallConsent()`: Displays the privacy banner to allow users to update their consent preferences.
// - `logConsent(consentSettings: object)`: Logs the user's consent preferences to a database or analytics tool.
//
// Dependencies:
// - `window.dataLayer`: Required for Google Consent Mode V2 integration.
// - Shopify Customer Privacy Banner: Must be enabled in the Shopify admin panel.
//
// Error Handling:
// - Errors in loading Shopify features (e.g., API initialization failures) are logged to the console without blocking the process.
//
// Extensibility:
// - Support additional consent categories or analytics tools by extending `handleConsentUpdate` and other methods.
// - Update `logConsent` to integrate with custom databases or third-party analytics platforms as needed.
//
// Notes:
// - Local storage is used to persist consent settings across sessions.
// Usage Example:
// 1. Import the `Consent` class and initialize it in your application:
// ---- import Consent from './scripts/components/Consent/Consent';
// ---- const consent = new Consent();
// ---- consent.init();
//
// 2. To enable the recall consent feature, add an element with the ID "recall-consent" to the DOM:
// ---- <a href="#" id="recall-consent"></a>
//
// 3. Add Locales: en: "change_cookie_settings": "Change your cookie settings", da: "change_cookie_settings": "Tilpas dine cookie-indstillinger",

import ConsentSettings from "../../../types/ConsentSettings";

export default class Consent {
  // declare dataLayer

  constructor() {
    this.init = this.init.bind(this);
    this.handleConsentUpdate = this.handleConsentUpdate.bind(this);
    this.checkConsentBannerInteraction = this.checkConsentBannerInteraction.bind(this);
    this.gtag = this.gtag.bind(this);
    this.recallConsent = this.recallConsent.bind(this);
  }

  async init() {
    window.Shopify.loadFeatures(
      [
        {
          name: "consent-tracking-api",
          version: "0.1",
        },
      ],
      (error) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error("Error loading features: ", error);
          return;
        }
        // eslint-disable-next-line no-console
        console.log("Consent tracking API loaded");
        this.initConsentComponent();
      }
    );
  }

  async initConsentComponent() {
    window.dataLayer = window.dataLayer || [];

    document.addEventListener("visitorConsentCollected", async () => {
      this.handleConsentUpdate("update");
    });

    const recallConsentElement = document.getElementById("recall-consent");
    if (recallConsentElement) {
      recallConsentElement.addEventListener("click", (event: MouseEvent | TouchEvent) => {
        event.preventDefault();
        this.recallConsent();
      });
    }
  }

  async handleConsentUpdate(state: string) {
    const visitorConsent = await window.Shopify.customerPrivacy.currentVisitorConsent();

    const consent = {
      functionality_storage: "granted",
      analytics_storage: visitorConsent.analytics === "yes" ? "granted" : "denied",
      personalization_storage: visitorConsent.analytics === "yes" ? "granted" : "denied",
      ad_storage: visitorConsent.marketing === "yes" ? "granted" : "denied",
      ad_user_data: visitorConsent.marketing === "yes" ? "granted" : "denied",
      ad_personalization: visitorConsent.marketing === "yes" ? "granted" : "denied",
      wait_for_update: 3000,
    } as ConsentSettings;

    this.gtag("consent", state, consent);

    // set local Storage for consent settings for further use on other pages or after page
    localStorage.setItem("consentSettings", JSON.stringify(consent));
  }

  /* eslint-disable */
  async checkConsentBannerInteraction() {
    const visitorConsent = await window.Shopify.customerPrivacy.currentVisitorConsent();
    if (visitorConsent.preferences === "" && visitorConsent.analytics === "" && visitorConsent.marketing === "") {
      return false;
    }

    return true;
  }
  /* eslint-disable */

  /* eslint-disable */
  gtag(...args: any[]) {
    window.dataLayer.push(arguments);
  }
  /* eslint-enable */

  /* eslint-disable */
  async recallConsent() {
    window.privacyBanner.showPreferences();
  }
}
