import React, { lazy, Suspense } from "react"

const Video = lazy(() => import("ui-library/Video"))

export default function VideoBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<Video {...props} />
			</Suspense>
		</div>
	)
}
