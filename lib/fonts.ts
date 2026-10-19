import { Open_Sans } from "next/font/google";
import localFont from 'next/font/local';

export const openSans = Open_Sans({
	variable: "--font-open-sans",
	subsets: ["latin"],
});

export const hago = localFont({
	src: [
		{
			path: '../app/fonts/hago-regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../app/fonts/hago-oblique.woff2',
			weight: '400',
			style: 'italic',
		},
	],
	variable: "--font-hago-local",
})