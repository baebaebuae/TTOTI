import { useRef } from 'react';
import styled from 'styled-components';
import { RoomData } from 'src/types/RoomData';
import RoomCard from './RoomCard';
import DefaultRoomCard from './DefaultRoomCard';

interface RoomCarouselProps {
	rooms: RoomData[];
	handleModal: (roomId: number) => void;
}

const Carousel = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px 40px;
	gap: 20px;
	overflow-x: scroll;
	/* cursor: grab; */

	&:active {
		cursor: grabbing;
	}
`;

const RoomCarousel = ({ rooms, handleModal }: RoomCarouselProps) => {
	const carouselRef = useRef<HTMLDivElement>(null);
	let isDragging = false;
	let startX: number;
	let scrollLeft: number;

	const handleMouseDown = (e: React.MouseEvent) => {
		isDragging = true;
		startX = e.pageX - (carouselRef.current?.offsetLeft || 0);
		scrollLeft = carouselRef.current?.scrollLeft || 0;
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
		const walk = (x - startX) * 1.5; // 스크롤 속도 조정
		if (carouselRef.current) carouselRef.current.scrollLeft = scrollLeft - walk;
	};

	const handleMouseUpOrLeave = () => {
		isDragging = false;
	};
	console.log(rooms);
	return (
		<Carousel
			ref={carouselRef}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUpOrLeave}
			onMouseLeave={handleMouseUpOrLeave}
		>
			{rooms.map((room) => (
				<div key={room.roomId}>
					<RoomCard room={room} onNotificationClick={handleModal} />
				</div>
			))}
			{rooms.length === 0 && (
				<div>
					<DefaultRoomCard />
				</div>
			)}
		</Carousel>
	);
};

export default RoomCarousel;
