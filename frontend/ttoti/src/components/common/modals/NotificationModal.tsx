import styled from 'styled-components';
import { Modal, ModalTitle } from '@components/common/modals/ModalCard';
import ListBox from '@components/common/box/ListBox';
import CloseIcon from '@assets/icons/close.svg?react';
import { useState, useEffect } from 'react';
import { getApiClient } from '@services/apiClient';

interface NotificationProps {
	title: string;
	content: string;
}

const NotificationList = ({ title, content }: NotificationProps) => {
	// key-value + map 구현 예정
	return (
		<ListColumn>
			<ListRow>
				<ListBox size="small" ListText={title} />
			</ListRow>
			<ListContent>
				<ListText>
					{content}
				</ListText>
				<Delete>삭제하기</Delete>
			</ListContent>
			<NotificationDivider />
		</ListColumn>
	);
};

interface NotificationModalProps {
	onClose: () => void;
	roomId: number;
}

interface notificationData {
	notificationReason: string;
	title: string;
}

const NotificationModal = ({ onClose, roomId }: NotificationModalProps) => {
	const subtitleText = '또띠 알림함';
	const titleText = '읽지 않은 알림을 확인해주세요!';
	const [notifications, setNotifications] = useState<notificationData[]>([])

	useEffect(() => {
		const fetchRoomData = async () => {
			const apiClient = getApiClient();
			try {
				const res = await apiClient.get(`notifications/${roomId}`);
				if (res.status === 200) {
					console.log('알림함 on')
					console.log(res.data.body);
					setNotifications(res.data.body);
				} else {
					console.log('get failed');
				}
			} catch (error) {
				console.error('API 요청 오류:', error);
			}
		};
		fetchRoomData();
	}, []);

	return (
		<Modal onClick={(e) => e.stopPropagation()}>
			<NotificationTop>
				<ModalTitle titleText={titleText} subtitleText={subtitleText} />
				<CloseIcon onClick={onClose} style={{ cursor: 'pointer' }}/>
			</NotificationTop>
			{notifications.map((notification, index) => (
				<NotificationList
					key={index}
					title={notification.notificationReason}
					content={notification.title}
				/>
      ))}
			{/* <NotificationList
				title="게임 시작"
				content="또띠 게임이 시작되었습니다."
			/>
			<NotificationList
				title="채팅 알림"
				content="마니또에게 메시지가 왔습니다."
			/>
			<NotificationList
				title="채팅 알림"
				content="마니띠에게 메시지가 왔습니다."
			/>
			<NotificationList title="게임 종료" content="게임 종료 하루 전입니다." /> */}
		</Modal>
	);
};

export default NotificationModal;

const NotificationTop = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	width: 100%;
`;

const ListColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	width: 100%;
`;

const ListRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	width: 100%;
`;

const ListContent = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 25px;
`

const ListText = styled.div`
	font-family: 'LINESeed';
	font-weight: normal;
	font-size: 14px;
	width: 100%;
	line-height: 150%;
	padding-top: 3px;
	margin-left: 5px;
`;

const NotificationDivider = styled.div`
	margin-top: 8px;
	height: 0.5px;
	background-color: #928f8f;
`;

const Delete = styled.button`
	width: 80px;
	font-family: 'LINESeed';
	font-weight: normal;
	font-size: 14px;
	color: ${({ theme }) => theme.colors['danger']};
	background-color: transparent;
	border: 0;
	cursor: pointer;
`;

