import { useEffect, useState } from "react";
import styled from "styled-components";
import { finishedGameList } from "@services/apiMyPage";
import PlayCredits from "@assets/icons/play_credit.svg?react"

interface RoomListProps {
  dateRange: [Date, Date];
  selectMember: string;
}

interface RoomData {
  roomId: number;
  roomName: string;
  membersName: string[];
  startDate: string;
  endDate: string;
}

const RoomListWrapper = styled.div`
  margin-top: 5px;
  display: grid;
  gap: 5px;
  height: 325px;
  overflow-y: auto; /* 수직 스크롤 활성화 */
  position: relative; /* 아이콘을 절대 위치로 배치하기 위해 relative로 설정 */
`;

const Room = styled.div`
  width: 300px;
  height: 140px;
  border: 2px solid black;
  border-radius: 15px;
  background-color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RoomName = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const MemberList = styled.div`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const DateRange = styled.div`
  font-size: 0.9rem;
  color: gray;
`;

const Icon = styled(PlayCredits)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px; /* 원하는 크기로 설정 */
  height: 40px; /* 원하는 크기로 설정 */
`;

const RoomList: React.FC<RoomListProps> = ({ dateRange, selectMember }) => {
  const [rooms, setRooms] = useState<RoomData[]>([]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    const fetchGameList = async () => {
      const response = await finishedGameList({
        startDate: formatDate(dateRange[0]),
        endDate: formatDate(dateRange[1]),
        friendId: selectMember,
      });
      setRooms(response);
    };

    fetchGameList();
  }, [dateRange, selectMember]);

  return (
    <RoomListWrapper>
      <Icon />
      {rooms.map((room) => (
        <Room key={room.roomId}>
          <RoomName>{room.roomName}</RoomName>
          <MemberList>
            {room.membersName.join(", ")}
          </MemberList>
          <DateRange>
            {room.startDate} ~ {room.endDate}
          </DateRange>
        </Room>
      ))}
    </RoomListWrapper>
  );
};

export default RoomList;
