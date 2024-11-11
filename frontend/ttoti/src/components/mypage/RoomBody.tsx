import { useState } from "react";
import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
import styled from "styled-components";

const RoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -10px;
`;

const RoomBody = () => {
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(2024, 0, 1),
    new Date(2024, 11, 31),
  ]); // 초기화 시 [Date, Date]로 지정
  const [selectMember, setSelectMember] = useState<string>("");

  console.log(`룸바디 셀렉트 멤버 : ${selectMember}`);
  console.log(`룸바디 데이트 레인지 : ${dateRange}`);
  return (
    <RoomWrapper>
      <RoomFilter dateRange={dateRange} onDateChange={setDateRange} selectMember={selectMember} onMemberChange={setSelectMember}/>
      <RoomList dateRange={dateRange} selectMember={selectMember} />
    </RoomWrapper>
  );
};

export default RoomBody;
