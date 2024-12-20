import React, { lazy, Suspense } from "react"

const Profile = lazy(() => import("ui-library/Profile"))

export default function ProfileBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<Profile {...props} />
			</Suspense>
		</div>
	)
}
