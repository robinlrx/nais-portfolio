import { ReactNode, Suspense, ViewTransition } from "react";

type Props = {
	children: ReactNode,
	fallback?: ReactNode,
}

export default function Fallback({ children, fallback }: Props) {
	return (
		<Suspense fallback={
			<ViewTransition exit="slide-down" default="none">
				{fallback}
			</ViewTransition>
		}>
			<ViewTransition enter="slide-up" default="none">
				{children}
			</ViewTransition>
		</Suspense>
	);
}