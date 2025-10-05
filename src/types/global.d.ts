// Global type declarations for external libraries

// New Google Identity Services
declare var google: {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string;
        callback: (response: any) => void;
        ux_mode?: string;
        use_fedcm_for_prompt?: boolean;
      }) => void;
      prompt: (callback?: (response: any) => void) => void;
      renderButton: (element: HTMLElement, config: any) => void;
    };
  };
};

// Legacy Google API (deprecated but may still be needed)
declare var gapi: {
  load: (api: string, callback: () => void) => void;
  auth2: {
    init: (config: any) => Promise<any>;
    getAuthInstance: () => any;
  };
  accounts: {
    id: {
      initialize: (config: any) => void;
      prompt: (callback: (response: any) => void) => void;
    };
  };
};

declare var FB: {
  init: (config: any) => void;
  login: (callback: (response: any) => void, options?: any) => void;
  api: (path: string, params: any, callback: (response: any) => void) => void;
  logout: (callback: (response: any) => void) => void;
};

declare var AppleID: {
  auth: {
    init: (config: any) => void;
    signIn: () => Promise<any>;
  };
};
