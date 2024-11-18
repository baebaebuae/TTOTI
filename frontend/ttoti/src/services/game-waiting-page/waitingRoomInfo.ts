// waitingRoomInfo.ts
import { getApiClient } from '@services/apiClient';

export interface RoomMember {
	name: string;
	profileImageUrl: string;
	isReady: boolean;
}

export interface RoomMemberInfo {
	currentParticipants: number;
	totalParticipants: number;
	roomMemberList: RoomMember[];
}

export interface RoomData {
	hostName: string;
	roomName: string;
	roomMemberInfo: RoomMemberInfo;
	isReady: boolean;
	profileImageUrl: string;
	animalProfileImageUrl: string | null;
	roomCode: string;
}

const getRoomData = async (roomId: string): Promise<RoomData> => {
	const apiClient = getApiClient();
	try {
		const res = await apiClient.get(`/rooms/pending/${roomId}`);
		// console.log(res);
		if (res.status === 200) {
			// console.log('방 데이터 로드 성공!');
			// console.log(res.data.body);
			return res.data.body;
		} else {
			throw new Error('Failed to fetch room data');
		}
	} catch (error) {
		console.error('getRoomData Error:', error);
		throw error;
	}
};

export default getRoomData;
