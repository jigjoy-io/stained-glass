import React, { lazy, Suspense } from "react"

const PageTile = lazy(() => import("ui-library/PageTile"))

export default function PageTileBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<PageTile {...props} />
			</Suspense>
		</div>
	)
}
