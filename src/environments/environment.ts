// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  debug: true,

  allowedDomains: ['localhost:4200', 'localhost:8082', 'localhost'],
  disallowedDomains: ['http://localhost:4200/api/auth/login', 'http://localhost:8082/api/auth/login'],
  apiUrl: 'http://localhost:8082/api',
  minioConsoleUrl: 'https://hua-minio.ddns.net/9090',
  minioStorageUrl: 'https://hua-minio.ddns.net/9000',

  storedVarKeys: {
    accessTokenKey: "hua_access_token",
    userKey: "hua_access_token_user",
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
