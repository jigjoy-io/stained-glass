import React, { lazy, Suspense } from "react"

const Heading = lazy(() => import("ui-library/Heading"))

export default function HeadingBlock(props) {
	return (
		<div className="py-2">
			<Suspense>
				<Heading {...props} />
			</Suspense>
		</div>
	)
}
