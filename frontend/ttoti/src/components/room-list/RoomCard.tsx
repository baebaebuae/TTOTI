import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { RoomCardProps } from 'src/types/RoomData';
import ActiveAlarmIcon from '@assets/icons/active_alarm.svg?react';
import InactiveAlarmIcon from '@assets/icons/inactive_alarm.svg?react';

import RoomInfo from '@components/room-list/RoomInfo';
import GameButtons from '@components/common/buttons/GameButtons';

const RoomInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10px;
	gap: 15px;
	width: 260px;
	height: 255px;
	border-radius: 12px;
	background-color: ${({ theme }) => theme.colors['modal']};
`;

const NotificationBox = styled.div<{ $clickable: boolean }>`
	height: 30px;
	margin-left: 200px;
	cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`;

const DateBox = styled.div<{ color: string }>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 185px;
	padding: 10px 18px 6px 16px;
	border-radius: 12px;
	background-color: ${({ theme, color }) => theme.colors[color]};
	font-family: 'LINESeed';
	font-size: 15px;
	font-weight: bold;
	color: ${({ color }) => (color === 'main' ? 'white' : 'black')};
`;

const GoButton = styled(GameButtons)`
	width: 80px;
	height: 32px;
	margin-top: 10px;
	padding-top: 8px;
`;

// 알림 상태 확인 후 아이콘 변경
interface NotificationProps {
	status: boolean;
	onClick: () => void;
}
const Notification = ({ status, onClick }: NotificationProps) => {
	const alarmIcon =
		status === true ? <ActiveAlarmIcon /> : <InactiveAlarmIcon />;
	return (
		<NotificationBox
			onClick={status === true ? onClick : undefined}
			$clickable={status === true}
		>
			{alarmIcon}
		</NotificationBox>
	);
};

interface RoomCardWithModalProps extends RoomCardProps {
	onNotificationClick: (roomId: number) => void;
}

const RoomCard = ({ room, onNotificationClick }: RoomCardWithModalProps) => {
	// 디버깅을 위한 콘솔 작성
	const navigate = useNavigate();
	const handleEnter = (status: boolean, id: number) => {
		// console.log('handleEnter called');
		if (status) {
			navigate(`/game/${id}`);
		} else {
			navigate(`/game-waiting/${id}`);
		}
	};

	const imageUrl = room.memberProfileImageUrl?.includes('kakao')
		? room.memberProfileImageUrl
		: `../images/characters/${room.memberProfileImageUrl}`;
	return (
		<RoomInfoWrapper>
			<Notification
				status={room.hasUnreadNotifications}
				onClick={() => onNotificationClick(room.roomId)}
			/>
			{room.finishedAt ? (
				<DateBox color="main">{room.finishedAt}</DateBox>
			) : (
				<DateBox color="background">게임 준비중...</DateBox>
			)}
			<RoomInfo
				hostName={room.hostName}
				roomName={room.roomName}
				currentParticipants={room.currentParticipants}
				imageURL={imageUrl}
			/>
			<GoButton
				color="success"
				onClick={() => handleEnter(room.isRoomInProgress, room.roomId)}
			>
				입장
			</GoButton>
		</RoomInfoWrapper>
	);
};

export default RoomCard;
