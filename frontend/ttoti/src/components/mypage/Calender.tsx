import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@components/mypage/CalenderStyle.css";
import styled from "styled-components";
import moment from "moment";

const DateDisplay = styled.div`
  width: 150px;
  padding: 10px;
  margin-top: 2px;
`;

const CalendarModal = styled.div`
  position: absolute;
  z-index: 5;
  width: 330px;
  bottom: 80px;
  left: 2px;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const ConfirmButton = styled.button`
  margin-top: 10px;
  margin-left: 210px;
  margin-bottom: 10px;
  padding: 5px 10px;
  background-color: #67c431;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  margin-top: 10px;
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #ff6430; /* 빨간색 배경 */
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

interface CalenderProps {
  dateRange: [Date, Date];
  onDateChange: (dates: [Date, Date]) => void;
}

const Calender: React.FC<CalenderProps> = ({ dateRange, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState<[Date, Date]>(dateRange);

  const handleConfirm = () => {
    onDateChange(tempRange); // tempRange를 onDateChange에 전달
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempRange(dateRange); // 원래 날짜 범위로 초기화
    setIsOpen(false); // 모달 닫기
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear() % 100}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
  };

  const handleChange = (dates: Date | [Date | null, Date | null] | null) => {
    if (Array.isArray(dates) && dates.length === 2) {
      const [startDate, endDate] = dates;
      if (startDate && endDate) {
        setTempRange([startDate, endDate] as [Date, Date]); // 안전하게 tempRange 업데이트
      }
    }
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    // 오늘 날짜와 비교
    if (view === 'month' && moment().isSame(date, 'day')) {
      return <span className="today-label">오늘</span>; // 오늘 텍스트
    }
    return null;
  };

  return (
    <div>
      <DateDisplay onClick={() => setIsOpen(!isOpen)}>
        {formatDate(dateRange[0])} ~ {formatDate(dateRange[1])}
      </DateDisplay>

      {isOpen && (
        <CalendarModal>
          <Calendar
            locale="ko"
            selectRange={true}
            calendarType="gregory"
            view="month"
            value={tempRange}
            onChange={handleChange}
            formatDay={( __, date) => moment(date).format("DD")}
            tileContent={tileContent} // 타일 콘텐츠 추가
            showNeighboringMonth={false}
          />
          <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
        </CalendarModal>
      )}
    </div>
  );
};

export default Calender;
