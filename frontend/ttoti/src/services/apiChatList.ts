import { getApiClient } from './apiClient';

export const getManittoChatList = async (ttotiId:number) => {
	const apiClient = getApiClient();
	try {
		const res = await apiClient.get(`/chats/manitto/${ttotiId}`);
		if (res.status === 200) {
      // console.log(`마니띠 탭 채팅목록 조회`, res.data.body);
			return res.data.body;
		}
	} catch (error) {
		console.error('마니띠탭 채팅목록 Error : ', error);
		throw error;
	}
};

export const getManitiChatList = async (tittoId:number) => {
	const apiClient = getApiClient();
	try {
		const res = await apiClient.get(`/chats/maniti/${tittoId}`);
		if (res.status === 200) {
      // console.log(`마니또 탭 채팅목록 조회`, res.data.body);
			return res.data.body;
		}
	} catch (error) {
		console.error('마니띠탭 채팅목록 Error : ', error);
		throw error;
	}
};