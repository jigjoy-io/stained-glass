import React from "react"
import Text from "../building-blocks/text"

export default function TextBlock(props) {
	return (
		<div className="py-1">
			<Text {...props} />
		</div>
	)
}
