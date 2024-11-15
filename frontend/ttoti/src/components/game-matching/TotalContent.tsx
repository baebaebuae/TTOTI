import { TopContainer } from './MatchingContainer';
import styled from 'styled-components';
import { ManitoArrow, ManitiArrow } from './MatchingCard';
import { TotalCard } from './TotalCard';
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

const TotalContent = ({ infoData }: ManitoProps) => {
	const header = '게임 시작!';
	const explain = '잠시 후 게임이 시작됩니다.';
	return (
		<>
			<TopContainer header={header} explain={explain} />
			<CardContainer>
				<ColumnBox>
					<ManitoArrow />
					<TotalCard myPlay="manito" infoData={infoData} />
				</ColumnBox>
				<ColumnBox>
					<ManitiArrow />
					<TotalCard myPlay="maniti" infoData={infoData} />
				</ColumnBox>
			</CardContainer>
		</>
	);
};

export default TotalContent;
