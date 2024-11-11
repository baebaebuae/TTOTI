// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr(),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: null,
			manifest: {
				name: 'ttoti Project',
				short_name: 'ttoti',
				"theme_color": "#ffffff",
        icons: [
            {
                src: 'pwa-64x64.png',
                sizes: '64x64',
                type: 'image/png'
            },
            {
                src: 'pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: 'pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: 'maskable-icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ],
			},
		}),
	],
	resolve: {
		alias: [
			{ find: '@', replacement: '/src' },
			{ find: '@assets', replacement: '/src/assets' },
			{ find: '@components', replacement: '/src/components' },
			{ find: '@hooks', replacement: '/src/hooks' },
			{ find: '@pages', replacement: '/src/pages' },
			{ find: '@routes', replacement: '/src/routes' },
			{ find: '@services', replacement: '/src/services' },
			{ find: '@stores', replacement: '/src/stores' },
			{ find: '@styles', replacement: '/src/styles' },
			{ find: '@utils', replacement: '/src/utils' },
		],
	},
	define: {global: 'window'}
});
