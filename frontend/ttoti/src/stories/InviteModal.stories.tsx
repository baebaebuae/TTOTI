// src/stories/InviteModal.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import InviteModal from '@components/common/modals/InviteModal'; // InviteModal 컴포넌트 경로에 맞게 수정하세요.
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme'; // 테마 경로에 맞게 수정하세요.

const meta: Meta<typeof InviteModal> = {
	title: 'Modals/InviteModal',
	component: InviteModal,
	decorators: [
		(Story) => (
			<ThemeProvider theme={theme}>
				<Story />
			</ThemeProvider>
		),
	],
};

export default meta;

// 스토리 템플릿
const Template: StoryFn<typeof InviteModal> = (args) => (
	<InviteModal {...args} />
);

// 기본 InviteModal 예시
export const Default = Template.bind({});
Default.args = {
	roomCode: '1234ABCD', // roomCode 기본값 설정
	onClose: () => console.log('InviteModal closed'), // onClose 함수 예시 설정
};
