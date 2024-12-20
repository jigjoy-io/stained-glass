import React from "react"
import Image from "../../../../ui-library/src/components/image"

export default function ImageBlock(props) {
	return (
		<div className="py-3">
			<Image {...props} />
		</div>
	)
}
