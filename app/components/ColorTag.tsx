type Color = {
	pink: string;
	blue: string;
	yellow: string;
	green: string;
	orange: string;
	black: string;
	red: string;
	fushia: string;
}

const colorStyles: Color = {
	pink: 'border-pink bg-pink text-white',
	blue: 'border-blue bg-blue text-white',
	yellow: 'border-yellow bg-yellow text-black',
	green: 'border-green bg-green text-black',
	orange: 'border-orange bg-orange text-white',
	black: 'border-black bg-black text-white',
	red: 'border-red bg-red text-white',
	fushia: 'border-fushia bg-fushia text-white',
}

type ColorTagProps = {
	children: React.ReactNode
	color: keyof Color
}

const ColorTag = ({ children, color }: ColorTagProps) => {
	return (
		<div className={`rounded-full px-3 py-1 text-3xl sm:px-4 sm:py-1.5 font-hago border-2 ${colorStyles[color]}`}>
			{children}
		</div>
	)
}

export default ColorTag