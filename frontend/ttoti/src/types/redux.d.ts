import { RootState } from '../stores';

declare module 'react-redux' {
	interface DefaultRootState extends RootState, Record<string, unknown> {}
}
