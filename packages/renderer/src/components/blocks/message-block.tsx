import React from "react"
import Message from "../building-blocks/message"

export default function MessageBlock(props) {
	return (
		<div className="py-3">
			<Message {...props} />
		</div>
	)
}
