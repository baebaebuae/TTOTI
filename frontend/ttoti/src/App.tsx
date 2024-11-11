// src/App.tsx
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '@routes/AppRouter';
import { Provider } from 'react-redux'; // Provider 추가
import store from './stores'; // store 임포트
import 'normalize.css';

const App = () => {
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
