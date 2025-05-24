export default interface Shopify {
  cdnHost: 'cdn.shopify.com';
  country: string;
  currency: {
    active: string;
    rate: number;
  };
  designMode: boolean;

  customerPrivacy: {
    currentVisitorConsent: () => Promise<{
      preferences: string;
      analytics: string;
      marketing: string;
    }>;
  };
  loadFeatures: (features: any[], callback: (error: any) => void) => void;
  locale: string;
  routes: {
    root: string;
  };
  shop: string;
  theme: {
    handle: string;
    id: number;
    name: string;
    role: string;
    style: {
      handle: string | null;
      id: number | null;
    };
    theme_store_id: number | null;
  };
}
