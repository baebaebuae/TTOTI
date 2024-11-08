// src/utils/notification/settingFCM.ts
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getApiClient } from "@services/apiClient";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FCM_API_KEY,
  authDomain: import.meta.env.VITE_APP_FCM_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FCM_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FCM_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FCM_APP_ID,
  measurementId: import.meta.env.VITE_APP_FCM_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestFcmToken = async () => {
  const apiClient = getApiClient();

  try {
    console.log("FCM 토큰 요청 중...");
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
    });

    if (currentToken) {
      console.log("FCM token:", currentToken);
      // FCM 토큰을 서버로 전송
      const res = await apiClient.post("/notifications/device-token", { token: currentToken });

      if (res.status === 200) {
        console.log("FCM 토큰 전송 성공!");
        return res.data;
      }
    } else {
      console.warn("FCM 토큰이 없습니다. 권한을 확인하세요.");
    }
  } catch (error) {
    console.error("requestFcmToken Error:", error);
    throw error;
  }
};
