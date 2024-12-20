import React from "react"
import Audio from "../../../../ui-library/src/components/audio-button"

export default function AudioBlock(props) {
	return (
		<div className="py-3">
			<Audio {...props} />
		</div>
	)
}
