"use client";

import type { CSSProperties } from "react";
import "@videojs/react/video/skin.css";
import { VideoPlayer, VideoSkin } from "@videojs/react/video";
import { YouTubeVideo } from "@videojs/react/media/youtube-video";
import { VimeoVideo } from "@videojs/react/media/vimeo-video";

type Props = {
	url: string;
	poster: string;
};

export default function ProjectVideo({ url, poster }: Props) {
	const isVimeo = url.includes("vimeo");

	return (
		<VideoPlayer poster={poster}>
			<VideoSkin style={{width: "100%", aspectRatio: "16 / 9", "--media-accent-color": "#2B3BF0", borderRadius: "0",} as CSSProperties}>
				{isVimeo ? <VimeoVideo src={url} /> : <YouTubeVideo src={url} />}
			</VideoSkin>
		</VideoPlayer>
	);
}