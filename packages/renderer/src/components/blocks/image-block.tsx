import React from "react"
import Image from "../building-blocks/image"

export default function ImageBlock(props) {
	return (
		<div className="py-3">
			<Image {...props} />
		</div>
	)
}
