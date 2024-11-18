import styled from 'styled-components';
import ProfileContainer from '@components/common/ProfileComponents';
import { RoomInfo } from 'src/types/RoomInfo';

const Card = styled.div`
	width: 150px;
	height: 190px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 7px 8px;
	box-sizing: border-box;
	border: 5px solid black;
	border-radius: 16px;
	background-color: white;
`;

const ContentCard = styled.div<{ color: string }>`
	width: 124px;
	height: 166px;
	border-radius: 12px;
	background-color: ${({ theme, color }) => theme.colors[color]};
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;

const PlayText = styled.div`
	color: white;
	font-family: 'LINESeed';
	font-weight: normal;
	font-size: 14px;
	width: 124px;
	padding-left: 20px;
	margin-top: 10px;
`;

const MyName = styled.div`
	color: white;
	font-family: 'LINESeed';
	font-weight: normal;
	font-size: 14px;
`;

const MyProfileColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 5px;
	margin-top: 18px;
`;

interface MyCardProps {
	myPlay: string;
	infoData: RoomInfo;
}

export const TotalCard = ({ myPlay, infoData }: MyCardProps) => {
	const color = myPlay === 'manito' ? 'manito' : 'submain';
	const play = myPlay === 'manito' ? '마니또' : '마니띠';
	const data = infoData['ttotiMatchInfo'];
	// console.log(data);
	const imgUrl =
		myPlay === 'manito'
			? `../images/characters/${data.myManittoAnimalImageUrl}`
			: data.myManitiProfileImageUrl;

	const name =
		myPlay === 'manito' ? data.myManittoAnimalName : data.myManitiMemberName;

	return (
		<Card>
			<ContentCard color={color}>
				<PlayText>{play}</PlayText>
				<MyProfileColumn>
					<ProfileContainer src={imgUrl} size="70px" ready={false} />
					<MyName>{name}</MyName>
				</MyProfileColumn>
			</ContentCard>
		</Card>
	);
};
