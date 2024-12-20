import React from "react"
import Profile from "../../../../ui-library/src/components/profile"

export default function ProfileBlock(props) {
	return (
		<div className="py-3">
			<Profile {...props} />
		</div>
	)
}
