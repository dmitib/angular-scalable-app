// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    config: {
      projectId: 'angular-scalable-app',
      appId: '1:717031064237:web:375b2b9be096610a1dbc24',
      storageBucket: 'angular-scalable-app.appspot.com',
      apiKey: 'AIzaSyCwvt6iHJTzWhpukIHwLxm0SNDAcXnZRtA',
      authDomain: 'angular-scalable-app.firebaseapp.com',
      messagingSenderId: '717031064237',
    }
  },
  production: false,
  name: "default"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
