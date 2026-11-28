import { PortableText } from 'next-sanity'
import type { PortableTextComponents } from '@portabletext/react'

type Props = {
	value: Parameters<typeof PortableText>[0]['value']
	className?: string
}

const components: PortableTextComponents = {
	marks: {
		blue: ({ children }) => (
		<span className='text-blue'>
			{children}
		</span>
		),

		strong: ({ children }) => (
			<strong>{children}</strong>
		),

		em: ({ children }) => (
			<em>{children}</em>
		),

		underline: ({ children }) => (
			<span style={{ textDecoration: 'underline' }}>
				{children}
			</span>
		),
	},
}

export default function LocalizedBody({ value, className }: Props) {
	if (!value) return null

	return (
		<div className={className}>
			<PortableText value={value} components={components}/>
		</div>
	)
}
