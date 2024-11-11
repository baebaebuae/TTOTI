// CharacterSelectPage.tsx
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { getApiClient } from '@services/apiClient';
const CharacterSelectPage: React.FC = () => {
	const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
		null,
	);
	const [characterIndex, setCharacterIndex] = useState<number | null>(null);
	const [characterData, setCharacterData] = useState<Character[] | null>(null);
	const { id: roomId } = useParams<{ id: string }>();
	const navigate = useNavigate();

	interface Character {
		animalId: number;
		animalName: string;
		animalImageUrl: string;
		animalDescription: string;
	}
	// 페이지 첫 진입시 캐릭터 API 연결
	useEffect(() => {
		const apiClient = getApiClient();
		const getCharacterData = async () => {
			try {
				const res = await apiClient.get('/animals');
				if (res.status === 200) {
					setCharacterData(res.data.body);
				}
			} catch (err) {
				console.error('character Data Api error : ', err);
			}
		};
		getCharacterData();
	}, []);

	const SelectCharacter = () => {
		const apiClient = getApiClient();
		const data = {
			animalId: characterIndex,
		};
		// console.log(data);
		const postCharacterData = async () => {
			try {
				const res = await apiClient.post(`/rooms/${roomId}/animals`, data);
				if (res.status === 200) {
					// console.log('캐릭터 선택 완료!');
					const message = res.data.message;

					if (message === '동물 선택 성공') {
						navigate(`/game-waiting/${roomId}`);
					} else {
						navigate(`/game/${roomId}`);
					}
					return res.data.body;
				}
			} catch (err) {
				console.error('postCharacterSelect Error : ', err);
				throw err;
			}
		};
		postCharacterData();
	};

	const handleCardClick = (index: number) => {
		setSelectedCardIndex(index);
		setCharacterIndex(index + 1);
	};

	return (
		<PageContainer>
			<Overlay />
			<ModalContatiner>
				<TitleContainer>
					<TitleText>캐릭터 선택</TitleText>
				</TitleContainer>
				<ListContainer>
					{characterData?.map((character, index) => (
						<Card
							key={index}
							onClick={() => handleCardClick(index)}
							$highlighted={selectedCardIndex === index}
						>
							<ImageBox>
								<CharacterImage
									src={`../images/characters/${character.animalImageUrl}`}
									alt={character.animalImageUrl}
								/>
							</ImageBox>
							<CharacterText>
								<Name>{character.animalName}</Name>
								<Description>{character.animalDescription}</Description>
							</CharacterText>
						</Card>
					))}
				</ListContainer>
				<FooterContainer>
					<SelectButton onClick={SelectCharacter}>
						<SelectText>선택완료</SelectText>
					</SelectButton>
				</FooterContainer>
			</ModalContatiner>
		</PageContainer>
	);
};

export default CharacterSelectPage;

const PageContainer = styled.div`
	position: relative;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
`;

const Overlay = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const ModalContatiner = styled.div`
	display: grid;
	grid-template-rows: 130px 1fr 130px;
	position: relative;
	width: 100vw;
	max-width: 422px;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 1);
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 130px;
	box-sizing: border-box;
	border-bottom: 1px solid white;
`;

const TitleText = styled.h1`
	height: 48px;
	font-family: 'SB어그로';
	font-size: 48px;
	font-weight: bold;
`;

const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	white-space: nowrap;
`;

interface CardProps {
	$highlighted: boolean;
}

const Card = styled.div<CardProps>`
	display: flex;
	flex-direction: row;
	height: 130px;
	box-sizing: border-box;
	border-top: 1px solid white;
	border-bottom: 1px solid white;
	cursor: pointer;
	transition: background-color 0.3s;

	${({ $highlighted }) =>
		$highlighted &&
		css`
			background-color: rgba(255, 255, 255, 0.2);
		`}
`;

const ImageBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 130px;
	height: 130px;
`;

const CharacterImage = styled.img`
	margin-right: 8px;
	width: 70%;
`;

const CharacterText = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Name = styled.h2`
	line-height: 0px;
	font-family: 'GmarketSans';
	font-size: 24px;
	font-weight: normal;
`;

const Description = styled.p`
	font-family: 'LINESeed';
	font-size: 14px;
	font-weight: normal;
`;

const FooterContainer = styled.footer`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 130px;
	box-sizing: border-box;
	border-top: 1px solid white;
`;

const SelectButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 200px;
	height: 54px;
	background-color: #1b95ec;
	color: white;
	border: none;
	border-radius: 50px;
	cursor: pointer;
`;

const SelectText = styled.p`
	height: 32px;
	font-family: 'GmarketSans';
	font-size: 32px;
	font-weight: normal;
`;
