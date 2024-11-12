// src/utils/notification/settingFCM.ts
import firebase from 'firebase/app';
import 'firebase/messaging';
import { getApiClient } from '@services/apiClient';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_FCM_API_KEY,
	authDomain: import.meta.env.VITE_APP_FCM_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_APP_FCM_PROJECT_ID,
	storageBucket: import.meta.env.VITE_APP_FCM_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_APP_FCM_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_FCM_APP_ID,
	measurementId: import.meta.env.VITE_APP_FCM_MEASUREMENT_ID,
};

// Firebase 앱 초기화
if (!firebase.apps.length) {
	// console.log('firebase app initialize')
	firebase.initializeApp(firebaseConfig);
}

export const requestFcmToken = async () => {
	// console.log("isSupported: ",  firebase.messaging.isSupported())
	if(firebase.messaging.isSupported() === false) return;

	const apiClient = getApiClient();

	const messaging = firebase.messaging()
	
	try {
		// console.log("FCM 토큰 요청 중...");
		const currentToken = await messaging.getToken({
			vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
		});

		if (currentToken) {
			// console.log("FCM token:", currentToken);
			messaging.onMessage(payload => {
				console.log("포그라운드 메시지 수신:", payload);
				alert("알림 : " + payload.notification.body);
			})

			// console.log("FCM token:", currentToken);
			// FCM 토큰을 서버로 전송
			const res = await apiClient.post('/fcm/device-token', {
				deviceToken: currentToken,
			});

			if (res.status === 200) {
				// console.log("FCM 토큰 전송 성공!");
				return res.data;
			}
		} else {
			console.warn('FCM 토큰이 없습니다. 권한을 확인하세요.');
		}
	} catch (error) {
		console.error('requestFcmToken Error:', error);
		throw error;
	}
};
