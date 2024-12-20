import React from "react"
import CarouselTile from "../building-blocks/carousel-tile"

export default function CarouselTileBlock(props) {
	return (
		<div className="py-3">
			<CarouselTile {...props} />
		</div>
	)
}
