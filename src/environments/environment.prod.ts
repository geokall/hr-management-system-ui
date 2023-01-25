export const environment = {
  production: true,
  debug: false,

  allowedDomains: ['https://hua-management.ddns.net/api'],
  disallowedDomains: ['https://hua-management.ddns.net/api/auth/login'],
  apiUrl: 'https://hua-management.ddns.net/api',
  minioConsoleUrl: 'https://hua-minio.ddns.net/9090',
  minioStorageUrl: 'https://hua-minio.ddns.net/9000',

  storedVarKeys: {
    accessTokenKey: "hua_access_token",
    userKey: "hua_access_token_user",
  }
};
