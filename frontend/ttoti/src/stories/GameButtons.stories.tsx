// src/stories/GameButtons.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import GameButtons from '@components/common/buttons/GameButtons'; // GameButtons 컴포넌트 경로에 맞게 수정하세요.
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import { ColorProps } from 'src/types/ColorsTheme'; // ColorProps 타입을 가져옵니다.

const meta: Meta<typeof GameButtons> = {
  title: 'Buttons/GameButtons',
  component: GameButtons,
  decorators: [(Story) => <ThemeProvider theme={theme}><Story /></ThemeProvider>],
};

export default meta;

// 스토리 템플릿
const Template: StoryFn<ColorProps> = (args) => <GameButtons {...args}>버튼</GameButtons>;

// 각 색상에 대한 버튼 예시
export const Main = Template.bind({});
Main.args = {
  color: 'main',
};

export const Submain = Template.bind({});
Submain.args = {
  color: 'submain',
};

export const Background = Template.bind({});
Background.args = {
  color: 'background',
};

export const Success = Template.bind({});
Success.args = {
  color: 'success',
};

export const Info = Template.bind({});
Info.args = {
  color: 'info',
};

export const Danger = Template.bind({});
Danger.args = {
  color: 'danger',
};

export const Point = Template.bind({});
Point.args = {
  color: 'point',
};

export const Login = Template.bind({});
Login.args = {
  color: 'login',
};

export const Modal = Template.bind({});
Modal.args = {
  color: 'modal',
};

export const Quiz = Template.bind({});
Quiz.args = {
  color: 'quiz',
};

export const ManitoChat = Template.bind({});
ManitoChat.args = {
  color: 'manitoChat',
};

export const ManitiChat = Template.bind({});
ManitiChat.args = {
  color: 'manitiChat',
};
