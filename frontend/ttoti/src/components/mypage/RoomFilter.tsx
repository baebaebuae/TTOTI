import styled from "styled-components";
import Calender from "./Calender";
import FilteredByFriend from "./FilteredByFriend";

interface RoomFilterProps {
  dateRange: [Date, Date];
  onDateChange: (dates: [Date, Date]) => void;
  selectMember: string;
  onMemberChange: (MemberId: string) => void;
}

const RoomFilterWrapper = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const FilterWrapper = styled.div`
  width: 150px;
  height: 40px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
  font-family: 'LINESeed';
  font-weight: normal;
  font-size: 15px;
`;

const RoomFilter: React.FC<RoomFilterProps> = ({ dateRange, onDateChange, selectMember, onMemberChange }) => {
  return (
    <RoomFilterWrapper>
      <FilterWrapper>
        <Calender dateRange={dateRange} onDateChange={onDateChange} />
      </FilterWrapper>
      <FilterWrapper>
        <FilteredByFriend selectMember={selectMember} onMemberChange={onMemberChange}/>
      </FilterWrapper>
    </RoomFilterWrapper>
  );
};

export default RoomFilter;
