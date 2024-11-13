// CreditPage.tsx
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getApiClient } from '@services/apiClient';

const CreditPage = () => {
	// const { id: roomId } = useParams<{ id: string }>();
	// const [credit, setCredit] = useState()

	// useEffect(() => {
	// 	const fetchRoomData = async () => {
	// 		const apiClient = getApiClient();
	// 		try {
	// 			const res = await apiClient.get(`members/mypage/${roomId}`);
	// 			if (res.status === 200) {
	// 				// console.log(res.data.body);
	// 				setCredit(res.data.body);
	// 			} else {
	// 				console.log('get failed');
	// 			}
	// 		} catch (error) {
	// 			console.error('API 요청 오류:', error);
	// 		}
	// 	};
	// 	fetchRoomData();
	// }, []);

	return <h1>크레딧 페이지</h1>;
};

export default CreditPage;
