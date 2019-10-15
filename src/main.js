import Vue from 'vue'
import firebase from 'firebase';
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';

require('firebase/firestore');


var firebaseConfig = {
        apiKey: "AIzaSyBHQ0v5Sh6aVBXJTHWOd_fmt3o6vpGVYSs",
        authDomain: "inncosys-ac3fd.firebaseapp.com",
        databaseURL: "https://inncosys-ac3fd.firebaseio.com",
        projectId: "inncosys-ac3fd",
        storageBucket: "inncosys-ac3fd.appspot.com",
        messagingSenderId: "175793713017",
        appId: "1:175793713017:web:ecb405f76215696c6149a8",
        measurementId: "G-44PB0ZW6R5"
      };
      // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

Vue.prototype.$firebase = firebase;

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
