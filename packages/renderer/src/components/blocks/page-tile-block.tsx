import React from "react"
import PageTile from "../../../../ui-library/src/components/page-tile"

export default function PageTileBlock(props) {
	return (
		<div className="py-3">
			<PageTile {...props} />
		</div>
	)
}
