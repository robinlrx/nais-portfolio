"use client";
import { Container } from '@videojs/react';
import { VideoPlayer, Video } from '@videojs/react/video';

type ProjectVideoGalleryProps = {
	videoUrl: string
}

const ProjectVideoGallery = ({videoUrl}: ProjectVideoGalleryProps) => {
	return (
		<VideoPlayer>
			<Container style={{ position: 'relative', width: 'auto', height: 'auto', aspectRatio: '16 / 9' }}>
				<Video src={videoUrl} playsInline autoPlay muted loop/>
			</Container>
		</VideoPlayer>
	);
};

export default ProjectVideoGallery;