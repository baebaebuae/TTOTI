import { TopContainer } from './MatchingContainer';
import styled from 'styled-components';
import { MyCard, MyArrow, TtotiCard, ManitiArrow } from './MatchingCard';
import { RoomInfo } from 'src/types/RoomInfo';

const CardContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 0px;
	gap: 20px;
`;

const ColumnBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 15px;
`;
interface ManitoProps {
	infoData: RoomInfo;
}

const ManitiContent = ({ infoData }: ManitoProps) => {
	const header = '나의 마니띠를 확인해주세요!';
	const explain = '내가 선택한 캐릭터가 마니띠에게 보여집니다!';
	// console.log(infoData);
	return (
		<>
			<TopContainer header={header} explain={explain} />
			<CardContainer>
				<ColumnBox>
					<MyArrow />
					<MyCard myPlay="manito" infoData={infoData} />
				</ColumnBox>
				<ColumnBox>
					<ManitiArrow />
					<TtotiCard myPlay="maniti" infoData={infoData} />
				</ColumnBox>
			</CardContainer>
		</>
	);
};

export default ManitiContent;
