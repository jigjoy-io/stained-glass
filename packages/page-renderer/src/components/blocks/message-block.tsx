import React, { lazy, Suspense } from "react"

const Message = lazy(() => import("ui-library/Message"))

export default function MessageBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<Message {...props} />
			</Suspense>
		</div>
	)
}
