import React from "react"
import Question from "../building-blocks/question/question"

export default function QuestionBlock(props) {
	return (
		<div className="py-3">
			<Question {...props} />
		</div>
	)
}
