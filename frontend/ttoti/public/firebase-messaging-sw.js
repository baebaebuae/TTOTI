// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCNWGMxop6D9bjTW1pFEPASUaWnje-n6qI",
  authDomain: "ttoti-12ac7.firebaseapp.com",
  projectId: "ttoti-12ac7",
  storageBucket: "ttoti-12ac7.firebasestorage.app",
  messagingSenderId: "838479167323",
  appId: "1:838479167323:web:fa4f90fc4ef64611ffe47e",
});

const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
