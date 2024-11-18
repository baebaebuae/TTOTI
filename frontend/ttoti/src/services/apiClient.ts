import axios from 'axios';
const API_URL = import.meta.env.VITE_URL;

// Api 클라이언트 생성 함수
export const createApiClient = (accessToken: string | null) => {
	if (!accessToken) {
		// accessToken 없음 디버깅 콘솔
		console.log('createApiClient : accessToken이 제공되지 않았습니다.');
	}
	return axios.create({
		baseURL: API_URL,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json; charset=utf8',
		},
	});
};

// localStorage에서 token 관리
const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const setAccessToken = (token: string) =>
	localStorage.setItem('accessToken', token);
const setRefreshToken = (token: string) =>
	localStorage.setItem('refreshToken', token);
const clearAccessToken = () => localStorage.removeItem('accessToken');
const clearRefreshToken = () => localStorage.removeItem('refreshToken');

// login 상태 확인 -> True / False 값 반환
export const isLoggedIn = () => !!getAccessToken();

// API 클라이언트 가져오기

const redirectToLogin = () => {
	const currentURL = window.location.href;
	window.location.href = currentURL.includes('localhost')
		? 'http://localhost:5173/login'
		: 'https://ttoti.co.kr/login';
};

export const getApiClient = () => {
	const accessToken = getAccessToken();
	const refreshToken = getRefreshToken();

	const apiClient = createApiClient(accessToken);
	// interceptors : access token 만료시 refresh token 재발급
	apiClient.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			const originalRequest = error.config;

			// 이미 재시도한 요청인지 확인
			if (originalRequest._retry) {
				console.error(
					'Refresh token request failed again, stopping further requests.',
				);
				return Promise.reject(new Error('Unauthorized, please log in again.'));
			}

			originalRequest._retry = true;
			// 401 에러 발생 시 재발급 시도
			if (error.response?.data.httpStatus === 401 && !originalRequest._retry) {
				// 재시도 요청 true

				if (refreshToken) {
					try {
						// Refresh token으로 access token 재발급 요청
						const res = await apiClient.patch('/auth/reissue', {
							refreshToken: refreshToken,
						});

						if (res.status === 200) {
							// 새 토큰을 localStorage에 저장
							setAccessToken(res.data.body.accessToken);
							setRefreshToken(res.data.body.refreshToken);

							// 실패한 요청에 새 토큰으로 Authorization 헤더 업데이트 후 재시도
							originalRequest.headers = {
								...originalRequest.headers, // 기존 헤더 유지
								Authorization: `Bearer ${getAccessToken()}`, // 새로운 Authorization 헤더 설정
							};

							return apiClient(originalRequest);
						} else {
							console.log('refreshToken으로 재요청 실패');
							return Promise.reject(
								new Error('Token reissue failed, logging out.'),
							);
						}
					} catch (refreshError) {
						console.error('Token reissue failed:', refreshError);
						return Promise.reject(refreshError);
					}
				} else {
					// refreshToken이 없는 경우도 초기화 및 리다이렉트
					clearAccessToken();
					clearRefreshToken();
					redirectToLogin();
				}
			} else {
				// API 호출 실패 , httpStatus 확인
				console.error(`error status: ${error.response.status}`);
				console.error(`http status: ${error.response.data.httpStatus}`);

				if (error.response.data.httpStatus === 401) {
					console.log('잘못된 요청입니다. 401 error');
					// 인증되지 않은 사용자 에러 -> 토큰 초기화 -> 로그인 화면
					clearAccessToken();
					clearRefreshToken();
					redirectToLogin();
				}

				return Promise.reject(new Error('잘못된 axios 요청'));
			}

			return Promise.reject(error);
		},
	);

	return apiClient;
};
