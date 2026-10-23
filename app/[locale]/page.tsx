import { Suspense } from "react";

type Props = {
	params: Promise<{ locale: string }>;
};

export default function HomePage({ params }: Props) {

	return (
		<main className="container mx-auto min-h-screen p-8 border border-amber-600">
			<h1>Nais hoang</h1>
		</main>
	);
}
