import { getApiClient } from './apiClient';

const choiceAnswer = async (ttotiId: number, quizId: number, quizAnswerNumber: number) => {
	const apiClient = getApiClient();
	try {
		const res = await apiClient.patch(`ttotis/${ttotiId}/quiz/${quizId}`,
      {quizAnswerNumber: `${quizAnswerNumber}`});
		if (res.status === 200) {
			// 임시 콘솔
			// console.log('지문 선택 완료 !!');
			return res.data.message;
		}
	} catch (error) {
		console.log('지문 선택 Error : ', error);
		throw error;
	}
};

export default choiceAnswer;