import { getApiClient } from './apiClient';

const getInProgressRoomInfo = async (roomId:number) => {
	const apiClient = getApiClient();
	try {
		const res = await apiClient.get(`rooms/inprogress/${roomId}`);
		if (res.status === 200) {
			// 임시 콘솔
			// console.log('진행중인 방 정보 GET!');
			return res.data.body;
		}
	} catch (error) {
		console.log('진행중인 방 정보 Error : ', error);
		throw error;
	}
};

export default getInProgressRoomInfo;