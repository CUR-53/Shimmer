export default interface BrowsingContext {
  detected_values: {
    country: {
      handle: string;
      name: string;
    };
  };
  features: {
    duties_collected: boolean;
  };
  suggestions: {
    parts: {
      country: {
        handle: string;
        name: string;
        confidence: number;
        options: {
          [key: string]: string;
        };
      };
      language: {
        handle: string;
        name: string;
        confidence: number;
        options: {
          [key: string]: string;
        };
      };
    };
    confidence: number;
  }[];
}
