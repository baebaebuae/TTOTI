import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import RoomTitle from '@components/GamePage/RoomTitle/RoomTitle';
import Game from '@components/GamePage/Game';
import GuessModal from '@components/GamePage/GuessModal/GuessModal';
import TtotiTemperatureModal from '@components/GamePage/TtotiTemperatureModal';

import BigCloud from '@assets/gamecloud/big-cloud.png';
import SmallCloud from '@assets/gamecloud/small-cloud.png';

import { RoomInfo } from 'src/types/RoomInfo';
import { QuizData } from 'src/types/QuizTypes';

import getQuizData from '@services/apiQuizData';
import getInProgressRoomInfo from '@services/apiRoomInfo';

const GamePageContainer = styled.div`
	background-color: #1b95ec;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

const CloudImage = styled.img`
	position: absolute;
	width: 72px;
	top: 80px;
	margin-right: 190px;
	z-index: 0;
	transform: translateX(-50%);

	&:nth-child(2) {
		top: 113px;
		margin-right: 0px;
	}
`;

const RoomTitleWrapper = styled.div`
	position: absolute;
	display: flex;
	justify-content: flex-end;
	width: 384px;
	height: 75px;
	top: 20px;
	/* right: -12px; */
`;

const GameWrapper = styled.div`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	width: 380px;
	height: 539px;
	bottom: 0;
	z-index: 2;
`;

const TempButton = styled.div`
	font-family: 'GmarketSans';
	font-weight: normal;
	position: absolute;
	width: 72px;
	height: 36px;
	top: 110px;
	margin-left: 270px;
	padding-left: 15px;
	padding-right: 5px;
	background-color: #1AD8ED;
	color: white;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	cursor: pointer;
`;

const GamePage: React.FC = () => {
	const [quizData, setQuizData] = useState<QuizData | null>(null);
	const { id } = useParams<{ id: string }>();
	const roomId = Number(id);
	const [roomInfo, setRoomInfo] = useState<RoomInfo>();
	const [activeTab, setActiveTab] = useState('quiz'); // 초기 탭을 'quiz'로 설정
	const [showTemperatureModal, setShowTemperatureModal] = useState(false);

	// console.log(roomInfo);
	// console.log(quizData);
	useEffect(() => {
		const fetchRoomInfo = async () => {
			try {
				const response = await getInProgressRoomInfo(roomId);
				setRoomInfo(response);
			} catch (error) {
				console.error('방 정보를 가져오는 중 오류 발생:', error);
			}
		};

		fetchRoomInfo();
	}, [roomId]);

	useEffect(() => {
		const fetchQuizData = async () => {
			if (roomInfo) {
				try {
					const data = await getQuizData(roomInfo.ttotiMatchInfo.myTtotiId);
					// console.log('퀴즈 데이터:', data);
					setQuizData(data);
				} catch (error) {
					console.error('퀴즈 데이터를 가져오는 중 오류 발생:', error);
				}
			}
		};

		fetchQuizData();
	}, [roomInfo, activeTab]);

	const handleClose = () => {
		// console.log('handleClose')
		if (roomInfo) {
			// console.log('set canGuess false')
			setRoomInfo({
				...roomInfo,
				canGuess: false,
			});
			// console.log(roomInfo.canGuess)
		}
	};

	return (
		<GamePageContainer>
			<CloudImage src={BigCloud} alt="big cloud" />
			<CloudImage src={SmallCloud} alt="small cloud" />
			<TempButton onClick={() => setShowTemperatureModal(true)}>
				또띠온도
			</TempButton>
			{showTemperatureModal && (
				<TtotiTemperatureModal
					onClose={() => setShowTemperatureModal(false)}
				/>
			)}
			<RoomTitleWrapper>
				{roomInfo && <RoomTitle roomInfo={roomInfo} />}
			</RoomTitleWrapper>
			{roomInfo?.canGuess && (
				<GuessModal roomInfo={roomInfo} roomId={roomId} onClose={handleClose} />
			)}
			<GameWrapper>
				{roomInfo && (
					<Game
						activeTab={activeTab}
						onChangeTab={setActiveTab}
						quizData={quizData}
						roomInfo={roomInfo}
					/>
				)}
			</GameWrapper>
		</GamePageContainer>
	);
};

export default GamePage;
