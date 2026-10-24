const Skeleton = () => {
	return (
		<main className="container mx-auto min-h-screen p-8 flex flex-col gap-4 mt-header animate-pulse">
			{/* Skeleton pour le lien de retour */}
			<div className="h-5 w-36 bg-gray-200 rounded" />

			{/* Skeleton pour le titre (h1) */}
			<div className="h-10 w-3/4 max-w-xl bg-gray-200 rounded mb-8" />

			{/* Skeleton pour le contenu du PortableText (simulant des paragraphes) */}
			<div className="prose flex flex-col gap-3">
				<div className="h-4 w-full bg-gray-200 rounded" />
				<div className="h-4 w-11/12 bg-gray-200 rounded" />
				<div className="h-4 w-4/5 bg-gray-200 rounded" />
				<div className="h-4 w-2/3 bg-gray-200 rounded" />
			</div>

			{/* Skeleton pour la grille de la galerie d'images (simulant 6 éléments) */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
				{Array.from({ length: 6 }).map((_, index) => (
				<div
					key={index}
					className="h-64 w-full bg-gray-200 rounded"
				/>
				))}
			</div>
		</main>
	);
};

export default Skeleton;