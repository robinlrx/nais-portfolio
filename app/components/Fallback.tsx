import { ReactNode, Suspense } from "react";

type Props = {
	children: ReactNode,
	fallback?: ReactNode,
}

export default function Fallback({ children, fallback }: Props) {
	return (
		<Suspense fallback={fallback}>
			{children}
		</Suspense>
	);
}