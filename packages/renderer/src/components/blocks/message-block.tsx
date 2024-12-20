import React from "react"
import Message from "../../../../ui-library/src/components/message"

export default function MessageBlock(props) {
	return (
		<div className="py-3">
			<Message {...props} />
		</div>
	)
}
