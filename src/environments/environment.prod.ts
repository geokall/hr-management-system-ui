export const environment = {
  production: true,
  debug: false,

  allowedDomains: ['https://geokall.gr/api'],
  disallowedDomains: ['https://geokall.gr/api/auth/login'],
  apiUrl: 'https://geokall.gr/api',

  storedVarKeys: {
    accessTokenKey: "hua_access_token",
    userKey: "hua_access_token_user",
  }
};
