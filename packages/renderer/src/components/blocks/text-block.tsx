import React from "react"
import Text from "../../../../ui-library/src/components/text"

export default function TextBlock(props) {
	return (
		<div className="py-1">
			<Text {...props} />
		</div>
	)
}
