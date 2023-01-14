export const environment = {
  production: true,
  debug: false,

  allowedDomains: ['https://hua-management.ddns.net/api'],
  disallowedDomains: ['https://hua-management.ddns.net/api/auth/login'],
  apiUrl: 'https://hua-management.ddns.net/api',

  storedVarKeys: {
    accessTokenKey: "hua_access_token",
    userKey: "hua_access_token_user",
  }
};
