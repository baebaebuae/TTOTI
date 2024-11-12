// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-analytics.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-analytics.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCNWGMxop6D9bjTW1pFEPASUaWnje-n6qI",
  authDomain: "ttoti-12ac7.firebaseapp.com",
  projectId: "ttoti-12ac7",
  storageBucket: "ttoti-12ac7.firebasestorage.app",
  messagingSenderId: "838479167323",
  appId: "1:838479167323:web:fa4f90fc4ef64611ffe47e",
  measurementId: "G-KSC9Q9LD1F"
});

const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   const notificationTitle = 'B';
//   const notificationOptions = {
//     body: 'B',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });