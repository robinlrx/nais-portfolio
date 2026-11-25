import { Image } from "next-sanity/image";
import { urlFor } from "@/sanity/lib/image"; // à adapter selon votre chemin
import ProjectVideoGallery from "@/app/components/ProjectVideoGallery";

interface GalleryItem {
	_key?: string;
	url?: string;
	asset?: {
		url?: string;
		mimeType?: string;
		extension?: string;
		metadata?: {
			dimensions?: {
				width: number;
				height: number;
				aspectRatio?: number;
			};
		};
	};
}

interface ProjectGalleryProps {
	galleryImages?: GalleryItem[];
	localizedTitle?: string;
	imageClassName?: string;

}

const isMp4Item = (item?: GalleryItem): boolean => {
	const mimeType = item?.asset?.mimeType;
	const extension = item?.asset?.extension;
	const url = item?.asset?.url ?? item?.url ?? "";

	return (
		mimeType === "video/mp4" ||
		extension === "mp4" ||
		/\.mp4(\?.*)?$/i.test(url)
	);
};

const ProjectGallery = ({ galleryImages = [], localizedTitle = "Project", imageClassName = "object-contain",}: ProjectGalleryProps) => {
	if (galleryImages.length === 0) return null;

	const isVideoGallery = isMp4Item(galleryImages[0]);

	return (
		<>
			{isVideoGallery
				? galleryImages.map((video, index) => {
						const videoUrl = video?.asset?.url ?? video?.url;
						if (!videoUrl) return null;

						return (
							<div className="relative w-full" key={video._key ?? index}>
								<ProjectVideoGallery videoUrl={videoUrl} />
							</div>
						);
					})
				: galleryImages.map((image, index) => {
						const imageUrl = urlFor(image)?.url();
						const dimensions = image.asset?.metadata?.dimensions;
						if (!imageUrl || !dimensions) return null;

						return (
							// <div className="relative w-full" key={image._key ?? index}>
								<Image
									key={image._key ?? index}
									src={imageUrl}
									alt={`${localizedTitle} - image ${index + 1}`}
									width={dimensions.width}
									height={dimensions.height}
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									className={imageClassName}
								/>
							// </div>
						);
					})
				}
		</>
	);
};

export default ProjectGallery;