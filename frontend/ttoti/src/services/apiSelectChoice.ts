import { getApiClient } from './apiClient';

export const manittoChoiceAnswer = async (
	ttotiId: number,
	quizId: number,
	quizAnswerNumber: number,
) => {
	const apiClient = getApiClient();
	try {
		const res = await apiClient.patch(
			`ttotis/manitto/${ttotiId}/quiz/${quizId}`,
			{ quizAnswerNumber: `${quizAnswerNumber}` },
		);
		if (res.status === 200) {
			// 임시 콘솔
			// console.log('지문 선택 완료 !!');
			// console.log('마니띠 탭에서 출력되어야 하는 콘솔로그');
			return res.data.message;
		}
	} catch (error) {
		console.log('지문 선택 Error : ', error);
		throw error;
	}
};

export const manitiChoiceAnswer = async (
	ttotiId: number,
	quizId: number,
	quizAnswerNumber: number,
) => {
	const apiClient = getApiClient();
	try {
		const res = await apiClient.patch(
			`ttotis/maniti/${ttotiId}/quiz/${quizId}`,
			{ quizAnswerNumber: `${quizAnswerNumber}` },
		);
		if (res.status === 200) {
			// 임시 콘솔
			// console.log('지문 선택 완료 !!');
			// console.log('마니또 탭에서 출력되어야 하는 콘솔로그');
			return res.data.message;
		}
	} catch (error) {
		console.log('지문 선택 Error : ', error);
		throw error;
	}
};
