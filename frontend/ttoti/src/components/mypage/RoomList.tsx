import { useEffect, useState } from "react";
import styled from "styled-components";

import PlayCredits from "@assets/icons/play_credit.svg?react"
import ListBoldBox from "@components/common/box/ListBoldBox";

import { finishedGameList } from "@services/apiMyPage";

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
  margin-top: 4px;
  `;

const MemberList = styled.div`
  margin-top: 4px;
  `;

const DateRange = styled.div`
  margin-top: 4px;
`;

const Icon = styled(PlayCredits)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px; /* 원하는 크기로 설정 */
  height: 40px; /* 원하는 크기로 설정 */
`;

const ContentWrapper = styled.div`
  display: flex;
  font-family: 'LINESeed';
  gap: 10px;
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
          <ContentWrapper>
            <ListBoldBox size='small' ListText='방 정보'/>
            <RoomName>{room.roomName}</RoomName>
          </ContentWrapper>
          <ContentWrapper>
            <ListBoldBox size='small' ListText='참여자'/>
            <MemberList>
              {room.membersName.join(", ")}
            </MemberList>
          </ContentWrapper>
          <ContentWrapper>
            <ListBoldBox size='small' ListText='진행기간'/>
            <DateRange>
              {room.startDate} ~ {room.endDate}
            </DateRange>
          </ContentWrapper>
        </Room>
      ))}
    </RoomListWrapper>
  );
};

export default RoomList;
