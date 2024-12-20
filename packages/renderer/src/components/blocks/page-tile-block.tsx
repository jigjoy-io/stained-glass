import React from "react"
import PageTile from "../building-blocks/page-tile"

export default function PageTileBlock(props) {
	return (
		<div className="py-3">
			<PageTile {...props} />
		</div>
	)
}
