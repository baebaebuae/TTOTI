import { getApiClient } from './apiClient';

const getQuizData = async (ttotiId:number) => {
	const apiClient = getApiClient();
	try {
		const res = await apiClient.get(`/ttotis/${ttotiId}/quiz`);
		if (res.status === 200) {
			// 임시 콘솔
			// console.log('퀴즈 데이터 GET!');
			// console.log(res.data);
			return res.data.body;
		}
	} catch (error) {
		console.log('getQuizData Error : ', error);
		throw error;
	}
};

export default getQuizData;