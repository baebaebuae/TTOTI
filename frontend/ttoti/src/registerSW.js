// src/registerSW.js

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (!window.location.pathname.startsWith('/login')) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' })
        .then((registration) => {
          console.log('Firebase 메시징 서비스워커가 등록되었습니다:', registration);
        })
        .catch((error) => {
          console.error('Firebase 메시징 서비스워커 등록 실패:', error);
        });
    }
    if (window.location.pathname === '/login' || window.location.pathname === '/api/v1/ttoti/oauth/kakao') {
      // 이미 등록된 서비스 워커가 있다면 unregister
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (const registration of registrations) {
          registration.unregister().then(function(boolean) {
            console.log(
              boolean ? 'Service Worker unregistered successfully' : 'Failed to unregister Service Worker'
            );
          });
        }
      });
    }
  });
}
