import Shopify from "@ts/Shopify/Shopify";

declare global {
  const Shopify: Shopify;
  interface Window {
    Shopify: Shopify;

    dataLayer: any[];
    customDataLayerEnabled: boolean;
    shimmerProductData: any;
    shimmerCollectionData: any;
    shimmerUserData: any;
    shimmerContextData: any;
    privacyBanner: {
      showPreferences: () => any;
      loadBanner: () => any;
    };
  }
}
