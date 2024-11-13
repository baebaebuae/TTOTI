// HoseaKim.tsx
import React, { useState } from 'react';
import GuessModal from '@components/GamePage/GuessModal/GuessModal';

const HoseaKim: React.FC = () => {
	const [$isRoomInfoModalOpen, setRoomInfoModalOpen] = useState(true);

	const closeModal = () => setRoomInfoModalOpen(false);
	
	return (
		<div>
			{$isRoomInfoModalOpen && (
				<GuessModal onClose={closeModal} />
			)}
		</div>
	);
};

export default HoseaKim;
