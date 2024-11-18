import RoomHeader from "./RoomHeader";
import RoomBody from "./RoomBody";
import styled from "styled-components";

const RoomWrapper = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoomInfo = () => {
  return <RoomWrapper>
    <RoomHeader />
    <RoomBody />
  </RoomWrapper>;
}

export default RoomInfo