// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyAyVOtXtcOV7AXJnEMUpADnUPaRb7UGaU4",
    authDomain: "notification-service-e3912.firebaseapp.com",
    databaseURL: "https://notification-service-e3912.firebaseio.com",
    projectId: "notification-service-e3912",
    storageBucket: "notification-service-e3912.appspot.com",
    messagingSenderId: "80259190037",
    appId: "1:80259190037:web:d9b426fbe48bc3b05f6d1c",
    measurementId: "G-MGHZPJRH5G"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ');
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });