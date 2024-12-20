import React from "react"
import Heading from "../building-blocks/heading"

export default function HeadingBlock(props) {
	return (
		<div className="py-2">
			<Heading {...props} />
		</div>
	)
}
