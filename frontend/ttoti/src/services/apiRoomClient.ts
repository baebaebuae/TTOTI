import { getApiClient } from './apiClient';
interface RoomTotalProps {
	formData: {
		name: string;
		participants: number;
		period: number;
		finishTime: string;
	};
}

const postRoomCreate = async ({ formData }: RoomTotalProps) => {
	const apiClient = getApiClient();
	try {
		const res = await apiClient.post('/rooms', formData);
		if (res.status === 200) {
			console.log('방 생성 완료!');
			console.log(res.data);
			return res.data.body['roomId'];
		}
	} catch (error) {
		console.log('postRoomCreate Error : ', error);
		throw error;
	}
};

export default postRoomCreate;
