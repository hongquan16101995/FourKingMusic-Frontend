// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDP6MQXL8IAHunxJE_6jLQt7Q48KA-m6PM',
    authDomain: 'uploadfile-1d4bd.firebaseapp.com',
    databaseURL: 'https://uploadfile-1d4bd.firebaseio.com',
    projectId: 'uploadfile-1d4bd',
    storageBucket: 'uploadfile-1d4bd.appspot.com',
    messagingSenderId: '721528225083',
    appId: '1:721528225083:web:e1aa0c9538615c95bd8b1e'
  },
  // apiUrl: 'http://localhost:8080'

  apiUrl: 'http://192.168.0.101:8080'

  // apiUrl: 'http://10.30.0.88:8080'
  //a QUân
  // apiUrl: 'http://10.30.0.31:8080'
  // apiUrl: 'http://192.168.3.42:8080'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
