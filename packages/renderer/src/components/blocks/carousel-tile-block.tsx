import React from "react"
import CarouselTile from "../../../../ui-library/src/components/carousel-tile"

export default function CarouselTileBlock(props) {
	return (
		<div className="py-3">
			<CarouselTile {...props} />
		</div>
	)
}
