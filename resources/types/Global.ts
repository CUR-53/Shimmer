import Shopify from "@ts/Shopify/Shopify";

declare global {
  const Shopify: Shopify;
  interface Window {
    Shopify: Shopify;

    dataLayer: any[];
    customDataLayerEnabled: boolean;
    editionProductData: any;
    editionCollectionData: any;
    editionUserData: any;
    editionContextData: any;
    privacyBanner: {
      showPreferences: () => any;
      loadBanner: () => any;
    };
  }
}
