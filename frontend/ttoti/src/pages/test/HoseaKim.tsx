// HoseaKim.tsx
// import React, { useState } from 'react';
// import RoomInfoModal from '@components/common/modals/RoomInfoModal';

const HoseaKim: React.FC = () => {
	// const [isModalOpen, setIsModalOpen] = useState(false);

	// const infoList = [
	//   { label: '방 이름', value: '99NULL' },
	//   { label: '방장', value: '정진영' },
	//   { label: '또띠 인원', value: '8명' },
	//   { label: '참여자', value: '정진영, 이상무, 김호진, 서지민 ,채이슬 ,권재현' },
	//   { label: '종료 시간', value: '18:30' },
	//   // { label: '진행 기간', value: '7일' },
	//   { label: '진행 기간', value: '2024.10.24 ~ 2024.10.30' },
	// ];

	// const openModal = () => {
	//   setIsModalOpen(true);
	// };

	// const closeModal = () => {
	//   setIsModalOpen(false);
	// };

	return (
		<div>
			{/* <button onClick={openModal}>룸 인포 모달 열기</button> */}

			{/* {isModalOpen && (
        <RoomInfoModal
          onClose={closeModal}
          onLeave={() => {
            closeModal();
            alert("방에서 나갔습니다.");
          }}
          infoList={infoList} // 리스트 데이터를 모달에 전달
        />
      )} */}
		</div>
	);
};

export default HoseaKim;
