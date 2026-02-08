import { useEffect, useState } from "react"

const alignmentVariations: { [key: string]: string } = {
	left: "text-left",
	center: "text-center",
	right: "text-right",
}

export default function Text({ text, position = "left" }: { text: string; position?: "left" | "center" | "right" }) {
	return (
		<div className={`inline-block h-min-[1.7rem] h-max w-full ${alignmentVariations[position]}`}>
			<div className="text-paragraph whitespace-pre-line">{text}</div>
		</div>
	)
}
