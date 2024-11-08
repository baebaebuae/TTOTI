import { createAsyncThunk } from '@reduxjs/toolkit';
import { getApiClient } from '@services/apiClient';

const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async () => {
	const apiClient = getApiClient();

	try {
		const res = await apiClient.get('/members/detail');

		if (res.status === 200) {
			const memberId = res.data.body.memberId;
			const memberName = res.data.body.memberName;
			const memberProfileImageUrl = res.data.body.memberProfileImageUrl;

			console.log(res.data.body)

			// console.log('유저 정보 조회 성공');
			return {
				memberId,
				memberName,
				memberProfileImageUrl,
			};
		} else {
			console.log('유저 정보 조회 실패');
			return null;
		}
	} catch (error) {
		console.log('Error fetching user info:', error);
	}
});

export default fetchUserInfo;
