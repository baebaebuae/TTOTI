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

//   event.notification.close();

//   event.waitUntil(
//     clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
//       // 이미 열린 창이 있으면 해당 창으로 포커싱
//       for (const client of clientList) {
//         if (client.url.includes(targetUrl) && 'focus' in client) {
//           return client.focus();
//         }
//       }
//       // 새 창을 열어서 이동
//       if (clients.openWindow) {
//         return clients.openWindow(targetUrl);
//       }
//     })
//   );
// });

// self.addEventListener('notificationclick', function(event) {
//   console.log('알림 클릭됨:', event.notification);
//   const targetUrl = event.notification.data?.url || '/';

//   event.notification.close();
  

//   event.waitUntil(
//     clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
//       // 이미 열린 창이 있으면 해당 창으로 포커싱
//       for (const client of clientList) {
//         if (client.url.includes(targetUrl) && 'focus' in client) {
//           return client.focus();
//         }
//       }
//       // 새 창을 열어서 이동
//       if (clients.openWindow) {
//         return clients.openWindow(targetUrl);
//       }
//     })
//   );
// });
