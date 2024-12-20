import React from "react"
import Video from "../building-blocks/video"

export default function VideoBlock(props) {
	return (
		<div className="py-3">
			<Video {...props} />
		</div>
	)
}
