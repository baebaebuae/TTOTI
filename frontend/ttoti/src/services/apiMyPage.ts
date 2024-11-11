import { getApiClient } from './apiClient';

export const changeName = async (memberName: string) => {
	const apiClient = getApiClient();
	try {
		const res = await apiClient.patch('/members/mypage/name', {memberName});
		if (res.status === 200) {
			// console.log('이름 수정 완료!');
			// console.log(res.data);
			return res.data.message;
		}
	} catch (error) {
		console.log('changeName Error : ', error);
		throw error;
	}
};

export const gameFriend = async () => {
	const apiClient = getApiClient();
	try {
		const res = await apiClient.get('/members/mypage/friend');
		if (res.status === 200) {
			// console.log('같이 마니또 게임 한 친구 불러오기 완료!');
			// console.log(res.data);
			return res.data.body;
		}
	} catch (error) {
		console.log('gameFriend Error : ', error);
		throw error;
	}
};

// requestBody의 타입 정의
interface FinishedGameListRequest {
  startDate: string;  // "YYYY/MM/DD" 형식의 날짜
  endDate: string;    // "YYYY/MM/DD" 형식의 날짜
  friendId: string;   // selectMember의 값
}

export const finishedGameList = async (requestBody: FinishedGameListRequest) => {
  const apiClient = getApiClient();
  try {
    const res = await apiClient.post('/members/mypage/game', requestBody);
    if (res.status === 200) {
      // console.log('끝난 게임 리스트 불러오기 완료!');
      // console.log(res.data);
      return res.data.body;
    }
  } catch (error) {
    console.error('finishedGameList Error : ', error);
    throw error;
  }
};

