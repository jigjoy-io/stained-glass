import React, { lazy, Suspense } from "react"

const Text = lazy(() => import("ui-library/Text"))

export default function TextBlock(props) {
	return (
		<div className="py-1">
			<Suspense>
				<Text {...props} />
			</Suspense>
		</div>
	)
}
