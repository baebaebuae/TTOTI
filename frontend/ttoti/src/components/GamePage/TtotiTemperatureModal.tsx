import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { fetchTemperature } from '@services/apiTemperature';
import { Temperature } from 'src/types/Temperature';

interface TtotiTemperatureModalProps {
	onClose: () => void;
}

const TtotiTemperatureModal: React.FC<TtotiTemperatureModalProps> = ({
	onClose,
}) => {
	const [temperatureData, setTemperatureData] = useState<Temperature[] | null>(
		null,
	);
	const { id } = useParams<{ id: string }>();
	const roomId = Number(id);

	useEffect(() => {
		const getTemperature = async () => {
			const response = await fetchTemperature(roomId);
			setTemperatureData(response);
			// console.log(response);
		};

		getTemperature();
	}, [roomId]);

	return (
		<Overlay onClick={onClose}>
			<Container onClick={(e) => e.stopPropagation()}>
				<HeaderContainer>
					<Title>또띠 온도</Title>
					<SubTitle>
						문제를 풀면 온도가 올라가요. 정답이 일치하면 보너스!
					</SubTitle>
				</HeaderContainer>
				{temperatureData && (
					<ParticipantList>
						{temperatureData.map((participant, index) => (
							<ParticipantBox key={index}>
								<ProfileWrapper>
									<ParticipantName>
										{participant.memberName.length > 3
											? `${participant.memberName.slice(0, 3)}..`
											: participant.memberName}
									</ParticipantName>
									<ParticipantImage
										src={participant.memberProfileImageUrl}
										alt="none"
									/>
								</ProfileWrapper>
								<TemperatureMeterContainer>
									<TemperatureLabel>0°C</TemperatureLabel>

									<TemperatureMeter>
										<TemperatureDisplay>
											{participant.currentTemperature}°C
										</TemperatureDisplay>
										<TemperatureFill
											initial={{ width: '0%' }}
											animate={{
												width: `${(participant.currentTemperature / 100) * 100}%`,
											}}
											transition={{ duration: 2 }} // 애니메이션 효과
										>
											<TemperatureDifference>
												+{participant.temperatureDifference}°C
											</TemperatureDifference>
										</TemperatureFill>
									</TemperatureMeter>
									<TemperatureLabel>100°C</TemperatureLabel>
								</TemperatureMeterContainer>
							</ParticipantBox>
						))}
					</ParticipantList>
				)}

				<ButtonContainer>
					<CloseButton onClick={onClose}>닫기</CloseButton>
				</ButtonContainer>
			</Container>
		</Overlay>
	);
};

export default TtotiTemperatureModal;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const Container = styled.div`
	background-color: #f6f7fb;
	border-radius: 15px;
	width: 320px;
	padding: 20px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	z-index: 1001;
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const HeaderContainer = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Title = styled.h2`
	font-family: 'LINESeed';
	font-size: 18px;
	font-weight: bold;
	color: #333;
	margin: 0;
`;

const SubTitle = styled.div`
	margin-top: 5px;
	font-family: 'LINESeed';
	font-size: 14px;
`;

const ParticipantList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const ParticipantBox = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: #e1e9ef;
	border-radius: 10px;
	padding: 10px 15px;
	height: 30px;
`;

const ProfileWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ParticipantImage = styled.img`
	width: 24px;
	height: 24px;
	border-radius: 50%;
`;
const ParticipantName = styled.div`
	font-family: 'LINESeed';
	font-size: 14px;
	font-weight: bold;
	color: #555;
`;

const TemperatureMeterContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	width: 80%;
	height: 10px;
`;

const TemperatureLabel = styled.div`
	font-family: 'LINESeed';
	font-size: 12px;
	color: #333;
`;

const TemperatureDisplay = styled.div`
	font-family: 'LINESeed';
	font-size: 12px;
	font-weight: bold;
	color: #ff6430;
	margin-top: 5px;
	margin-left: 60px;
`;

const TemperatureMeter = styled.div`
	position: relative;
	width: 100%;
	height: 20px;
	background-color: #e1e9ef;
	border-radius: 10px;
`;

const TemperatureFill = styled(motion.div)`
	height: 100%;
	background-color: #ff6430; /* 온도 차오르는 색 */
	border-radius: 10px;
`;

const TemperatureDifference = styled.div`
	position: absolute;
	font-family: 'LINESeed';
	font-size: 12px;
	font-weight: bold;
	color: #67c431; /* 초록색 */
	top: 23px;
	right: -45px;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const CloseButton = styled.button`
	width: 100px;
	height: 36px;
	background-color: #7984fc;
	color: white;
	font-family: 'LINESeed';
	font-size: 14px;
	font-weight: bold;
	border: none;
	border-radius: 10px;
	cursor: pointer;

	&:hover {
		background-color: #6a74e0;
	}
`;
