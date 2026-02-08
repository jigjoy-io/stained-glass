import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/page-reducer"
import { useActiveBlock } from "../../../util/store"
import textEditingVariants from "../../../util/style-helper/text-editing-variations"
import { handleTextBlockKeyDown } from "../../../util/factories/key-command-factory"

const textAlignMap = {
	left: "justify-start text-left",
	center: "justify-center text-center",
	right: "justify-end text-right",
}

export default function ContentEditingText({
	id,
	text,
	position,
	type,
}: {
	id: string
	text: string
	position: "left" | "center" | "right"
	type: string
}) {
	const [textPosition, setTextPosition] = useState("")
	const [textType, setTextType] = useState(type)
	const [style, setStyle] = useState({} as any)

	useEffect(() => {
		setTextPosition(textAlignMap[position])
	}, [position])

	useEffect(() => {
		setStyle(textEditingVariants[type])
		setTextType(type)
	}, [type])

	const dispatch = useDispatch()
	const ref = useRef<HTMLDivElement>(null)
	const activeBlock = useActiveBlock()

	useEffect(() => {
		if (activeBlock === id) ref.current?.focus()
	}, [activeBlock])

	useEffect(() => {
		if (ref.current && ref.current.innerText !== text) {
			ref.current.innerText = text.trim() || ""
		}
	}, [text, ref])

	const updateText = (event: any) => {
		const raw = event.target.innerText ?? ""
		const newValue = raw.replace(/\n/g, "").trim()

		let block = {
			id: id,
			position: position,
			type: textType,
			text: newValue,
		}
		dispatch(updateBlock(block))
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		handleTextBlockKeyDown({
			event,
			dispatch,
			blockId: id,
			blockType: type,
			ref: ref as React.RefObject<HTMLElement>,
		})
	}

	return (
		<div className={`inline-block w-full`}>
			<div
				contentEditable="plaintext-only"
				suppressContentEditableWarning
				spellCheck={false}
				onKeyDown={handleKeyDown}
				onBlur={updateText}
				data-block-id={id}
				className={`${style.class} w-full focus:outline-none ${textPosition}`}
				ref={ref}
			>
				{text ?? ""}
			</div>
		</div>
	)
}
