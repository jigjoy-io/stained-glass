import React, { lazy, Suspense } from "react"

const Image = lazy(() => import("ui-library/Image"))

export default function ImageBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<Image {...props} />
			</Suspense>
		</div>
	)
}
