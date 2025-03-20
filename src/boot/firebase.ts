import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Pruebas MIRA Dev
const firebaseConfig = {
  apiKey: 'AIzaSyCSHPM2wsWlF0APcQQXCSfzlEUglx5GB_o',
  authDomain: 'mty-geonode-dev.firebaseapp.com',
  projectId: 'mty-geonode-dev',
  storageBucket: 'mty-geonode-dev.appspot.com',
  messagingSenderId: '227645004948',
  appId: '1:227645004948:web:c232933c58e95c79dbe881',
  measurementId: 'G-VKEMCXVQC7',
};

// firebase ID Dev
// const firebaseConfig = {
//   apiKey: "AIzaSyDzZI8kumZqOShHQaTrzbwNaA0JiEMwg7M",
//   authDomain: "mty-id-dev.firebaseapp.com",
//   projectId: "mty-id-dev",
//   storageBucket: "mty-id-dev.appspot.com",
//   messagingSenderId: "149828993345",
//   appId: "1:149828993345:web:11757472dbff01d7ebe1c0",
//   measurementId: "G-F293PRW558"
// };

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestoreDB = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);
const firbaseAnalytics = getAnalytics(firebaseApp);

export default boot(({ app }) => {
  app.config.globalProperties.$firestoreDB = firestoreDB;
  app.config.globalProperties.$firebaseAuth = firebaseAuth;
  app.config.globalProperties.$firebaseStorage = firebaseStorage;
  app.config.globalProperties.$firebaseApp = firebaseApp;
  app.config.globalProperties.$firbaseAnalytics = firbaseAnalytics;
});

export {
  firestoreDB,
  firebaseAuth,
  firebaseStorage,
  firebaseApp,
  firbaseAnalytics,
};
