import React from "react"
import Title from "../building-blocks/title"

export default function TitleBlock(props) {
	return (
		<div className="py-3">
			<Title {...props} />
		</div>
	)
}
