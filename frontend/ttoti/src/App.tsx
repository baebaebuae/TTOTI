// src/App.tsx
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '@routes/AppRouter';
import { Provider } from 'react-redux'; // Provider 추가
import store from './stores'; // store 임포트
import 'normalize.css';
import { useEffect } from 'react';
import { requestFcmToken } from './utils/notification/settingFCM';

const App = () => {
	useEffect(() => {
    // 알림 권한 요청 및 토큰 요청
    const requestPermissionAndToken = async () => {
      console.log('알림 권한 요청 중...');
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('알림 권한 허용됨');
        await requestFcmToken(); // FCM 토큰 요청 및 서버 전송
      } else {
        console.log('알림 권한이 거부되었습니다.');
      }
    };

    requestPermissionAndToken();
  }, []);

	return (
		<Provider store={store}>
			{' '}
			{/* Provider로 감싸기 */}
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<AppRouter />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
