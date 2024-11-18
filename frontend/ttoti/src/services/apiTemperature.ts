import { getApiClient } from './apiClient';

export const fetchTemperature = async (roomId: number) => {
	const apiClient = getApiClient();
	try {
		const res = await apiClient.get(`rooms/${roomId}/temperature`);
		if (res.status === 200) {
			// 임시 콘솔
			return res.data.body.roomTemperatureDtoList;
		}
	} catch (error) {
		console.error('지문 선택 Error : ', error);
		throw error;
	}
};
