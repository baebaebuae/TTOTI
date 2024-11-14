export interface RoomData {
	roomId: number;
	isRoomInProgress: boolean;
	finishedAt: string | null;
	isMemberReady: boolean;
	memberProfileImageUrl: string;
	hostName: string;
	roomName: string;
	currentParticipants: number;
	totalParticipants: number;
	hasUnreadNotifications: boolean;
}

export interface RoomCardProps {
	room: RoomData;
}

export interface RoomInfoProps {
	hostName: string;
	roomName: string;
	currentParticipants: number;
	totalParticipants: number;
	imageURL: string;
	inProgress: boolean;
}
