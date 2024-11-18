import styled from "styled-components";

const RoomHeaderWrapper = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Title = styled.div`
  width: 115px;
  height: 35px;
  border-radius: 15px;
  background-color: #7984FC;
  font-family: 'GmarketSans';
  font-weight: bold;
  font-size: 16px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubTitle = styled.div`
  font-family: 'GmarketSans';
  font-weight: 300;
  font-size: 16px;
  color: white;
`;

const RoomHeader = () => {
  return <RoomHeaderWrapper>
    <Title>또띠 방 정보</Title>
    <SubTitle>클릭하면 그날의 또띠 추억을 볼 수 있어요!</SubTitle>
  </RoomHeaderWrapper>;
}

export default RoomHeader