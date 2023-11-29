import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: 'AIzaSyCf0uZVl9mQMeBph-Bza6y10aw4ZPPnVTc',
    authDomain: 'tpfinaldai.firebaseapp.com',
    databaseURL: 'https://tpfinaldai.southamerica-east1.firebasedatabase.app',
    projectId: 'tpfinaldai',
    storageBucket: 'tpfinaldai.appspot.com',
    messagingSenderId: 'sender-id',
    appId: 'app-id',
    measurementId: 'G-measurement-id',
};
  
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;