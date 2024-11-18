// src/stories/InfoModal.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import InfoModal from '@components/common/modals/InfoModal'; // InfoModal 컴포넌트 경로에 맞게 수정하세요.
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme'; // 테마 경로에 맞게 수정하세요.

const meta: Meta<typeof InfoModal> = {
  title: 'Modals/InfoModal',
  component: InfoModal,
  decorators: [(Story) => <ThemeProvider theme={theme}><Story /></ThemeProvider>],
};

export default meta;

// 스토리 템플릿
const Template: StoryFn = () => <InfoModal />;

// 기본 InfoModal 예시
export const Default = Template.bind({});
Default.args = {};
