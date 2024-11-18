import { ContentProps } from 'src/types/InputForm';

import RoomName from '@components/room-create/action/RoomName';
import RoomParticipants from '@components/room-create/action/RoomParticipants';
import RoomPeriod from '@components/room-create/action/RoomPeriod';
import RoomTime from '@components/room-create/action/RoomTime';
import RoomTotal from '@components/room-create/action/RoomTotal';

interface ComponentProps {
	formData: ContentProps['formData'];
	onInputChange: ContentProps['onInputChange'];
}
export const createComponents = [
	(props: ComponentProps) => <RoomName {...props} />,
	(props: ComponentProps) => <RoomParticipants {...props} />,
	(props: ComponentProps) => <RoomPeriod {...props} />,
	(props: ComponentProps) => <RoomTime {...props} />,
	(props: ComponentProps) => <RoomTotal {...props} />,
];
