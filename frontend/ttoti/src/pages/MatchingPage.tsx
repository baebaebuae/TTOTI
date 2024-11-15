import styled from 'styled-components';
import GameButtons from '@components/common/buttons/GameButtons';
import ManitoContent from '@components/game-matching/ManitoContent';
import ManitiContent from '@components/game-matching/ManitiContent';
import TotalContent from '@components/game-matching/TotalContent';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RoomInfo } from 'src/types/RoomInfo';
import { getApiClient } from '@services/apiClient';

const MatchingPageWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 45px;
	position: relative;
`;

const MatchingPage = () => {
	const { id: roomId } = useParams<{ id: string }>();
	const [currentStep, setCurrentStep] = useState(0);

	// 초기 데이터 세팅
	const [infoData, setInfoData] = useState<RoomInfo>({
		roomHostMemberName: '',
		roomName: '',
		ttotiMatchInfo: {
			myTtotiId: 0,
			myTittoId: 0,
			myManittoAnimalName: '',
			myManittoAnimalImageUrl: '',
			myName: '',
			myProfileImageUrl: '',
			myAnimalName: '',
			myAnimalImageUrl: '',
			myManitiMemberName: '',
			myManitiProfileImageUrl: '',
		},
		canGuess: false,
		guessInfoDto: null,
	});

	// 페이지 첫 진입 시 정보 불러오기
	useEffect(() => {
		const fetchInfoData = async () => {
			const apiClient = getApiClient();
			try {
				const res = await apiClient.get(`/rooms/inprogress/${roomId}`);
				if (res.status === 200) {
					setInfoData(res.data.body);
				} else {
					console.log('get failed ');
				}
			} catch (error) {
				console.log('API 요청 오류: ', error);
			}
		};
		fetchInfoData();
	}, [roomId]);

	// 인덱스별로 컴포넌트 출력
	const renderContent = () => {
		switch (currentStep) {
			case 0:
				return <ManitoContent infoData={infoData} />;
			case 1:
				return <ManitiContent infoData={infoData} />;
			case 2:
				return <TotalContent infoData={infoData} />;
			default:
				return null;
		}
	};

	const navigate = useNavigate();

	const handleNextClick = () => {
		if (currentStep < 2) {
			setCurrentStep((prevStep) => prevStep + 1);
		} else {
			navigate(`/game/${roomId}`);
		}
	};

	return (
		<MatchingPageWrapper>
			{renderContent()}
			<GameButtons color="success" onClick={handleNextClick}>
				{currentStep < 2 ? '다음' : '완료'}
			</GameButtons>
		</MatchingPageWrapper>
	);
};

export default MatchingPage;
