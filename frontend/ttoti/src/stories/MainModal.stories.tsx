// src/stories/MainModal.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import { MainModal } from '@components/common/modals/MainModal';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme'; // 테마 경로에 맞게 수정하세요.

const meta: Meta<typeof MainModal> = {
  title: 'Modals/MainModal',
  component: MainModal,
  decorators: [(Story) => <ThemeProvider theme={theme}><Story /></ThemeProvider>],
};

export default meta;

// 스토리 템플릿
const Template: StoryFn = () => <MainModal />;

// 기본 MainModal 예시
export const Default = Template.bind({});
Default.args = {};
