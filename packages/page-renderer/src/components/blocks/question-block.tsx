import React, { lazy, Suspense } from "react"

const Question = lazy(() => import("ui-library/Question"))

export default function QuestionBlock(props) {
	return (
		<div className="py-3">
			<Suspense>
				<Question {...props} />
			</Suspense>
		</div>
	)
}
