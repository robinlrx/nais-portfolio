import type { PropsWithChildren } from 'react'

const BlueDecorator = ({ children }: PropsWithChildren) => {
	return (
		<span style={{ color: '#2685E8' }}>
			{children}
		</span>
	)
}

export default BlueDecorator;
