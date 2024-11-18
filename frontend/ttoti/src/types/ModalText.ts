import theme from '@styles/theme';

export interface ModalTitleProps {
	subtitleText: string;
	titleText: string;
}

export interface ModalButtonProps {
	explainText: string;
	buttonColor1: keyof typeof theme.colors;
	buttonText1: string;
	onClick1: () => void;
	buttonColor2: keyof typeof theme.colors;
	buttonText2: string;
	onClick2: () => void;
}
