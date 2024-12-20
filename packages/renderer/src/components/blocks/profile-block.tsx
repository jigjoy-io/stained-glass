import React from "react"
import Profile from "../building-blocks/profile"

export default function ProfileBlock(props) {
	return (
		<div className="py-3">
			<Profile {...props} />
		</div>
	)
}
