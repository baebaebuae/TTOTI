import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '@components/common/Loder';
import { getApiClient } from '@services/apiClient';

import { useDispatch } from 'react-redux';
import { setUserInfo } from '@stores/slices/userSlice';
const Auth = () => {
	const navigate = useNavigate();
	const url = new URL(window.location.href);
	const accessToken = url.searchParams.get('accessToken');
	const refreshToken = url.searchParams.get('refreshToken');
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUserState = async () => {
			if (accessToken && accessToken.length > 0 && refreshToken) {
				try {
					// local에 저장
					localStorage.setItem('accessToken', accessToken);
					localStorage.setItem('refreshToken', refreshToken);
					// console.log('토큰 저장 완료!');

					const apiClient = getApiClient();

					const res = await apiClient.get('/members/detail');

					if (res.status === 200) {
						const memberId = res.data.body.memberId;
						const memberName = res.data.body.memberName;
						const memberProfileImageUrl = res.data.body.memberProfileImageUrl;

						dispatch(
							setUserInfo({
								memberId,
								memberName,
								memberProfileImageUrl,
							}),
						);
					} else {
						// console.log('유저 정보 저장 실패');
					}

					// 메인 페이지로 이동
					navigate('/');
				} catch (error) {
					console.error('fetchUserState Error : ', error);
				}
			} else {
				// console.log('인증 실패');
			}
		};

		fetchUserState();
	}, [accessToken, refreshToken]);

	return <Loader />;
};

export default Auth;
