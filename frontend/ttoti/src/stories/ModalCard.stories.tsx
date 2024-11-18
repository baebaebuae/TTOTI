// src/stories/Modal.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import {
	Modal,
	ModalTitle,
	ButtonContainer,
} from '@components/common/modals/ModalCard'; // 컴포넌트 경로에 맞게 수정하세요.
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme'; // 테마 경로에 맞게 수정하세요.

const meta: Meta = {
	title: 'Modals/Modal',
	component: Modal,
	decorators: [
		(Story) => (
			<ThemeProvider theme={theme}>
				<Story />
			</ThemeProvider>
		),
	],
};

export default meta;

// Modal 컴포넌트 템플릿
const Template: StoryFn<{
	titleText: string;
	subtitleText: string;
	explainText: string;
	buttonColor1:
		| 'modal'
		| 'main'
		| 'login'
		| 'background'
		| 'danger'
		| 'submain'
		| 'success'
		| 'info'
		| 'point'
		| 'quiz'
		| 'manitoChat'
		| 'manitiChat';
	buttonText1: string;
	buttonColor2:
		| 'modal'
		| 'main'
		| 'login'
		| 'background'
		| 'danger'
		| 'submain'
		| 'success'
		| 'info'
		| 'point'
		| 'quiz'
		| 'manitoChat'
		| 'manitiChat';
	buttonText2: string;
}> = (args) => (
	<Modal>
		<ModalTitle titleText={args.titleText} subtitleText={args.subtitleText} />
		<ButtonContainer
			explainText={args.explainText}
			buttonColor1={args.buttonColor1}
			buttonText1={args.buttonText1}
			onClick1={() => console.log('Button 1 clicked')}
			buttonColor2={args.buttonColor2}
			buttonText2={args.buttonText2}
			onClick2={() => console.log('Button 2 clicked')}
		/>
	</Modal>
);

// 기본 Modal 예시
export const Default = Template.bind({});
Default.args = {
	titleText: '모달 제목',
	subtitleText: '모달 부제목',
	explainText: '모달 설명 텍스트',
	buttonColor1: 'login', // 올바른 버튼 색상
	buttonText1: '확인',
	buttonColor2: 'background', // 올바른 버튼 색상
	buttonText2: '취소',
};

// 다른 예시 추가 가능
export const AnotherExample = Template.bind({});
AnotherExample.args = {
	titleText: '다른 모달 제목',
	subtitleText: '다른 부제목',
	explainText: '다른 설명 텍스트',
	buttonColor1: 'danger', // 올바른 버튼 색상
	buttonText1: '삭제',
	buttonColor2: 'background', // 올바른 버튼 색상
	buttonText2: '취소',
};
