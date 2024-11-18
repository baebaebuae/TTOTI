import { TopContainer } from './MatchingContainer';
import styled from 'styled-components';
import { MyCard, MyArrow, TtotiCard, ManitoArrow } from './MatchingCard';
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

const ManitoContent = ({ infoData }: ManitoProps) => {
	const header = '나의 마니또를 확인해주세요!';
	const explain = '나의 마니또가 선택한 캐릭터가 공개됩니다!';
	// console.log(infoData);
	return (
		<>
			<TopContainer header={header} explain={explain} />
			<CardContainer>
				<ColumnBox>
					<MyArrow />
					<MyCard myPlay="maniti" infoData={infoData} />
				</ColumnBox>
				<ColumnBox>
					<ManitoArrow />
					<TtotiCard myPlay="manito" infoData={infoData} />
				</ColumnBox>
			</CardContainer>
		</>
	);
};

export default ManitoContent;
