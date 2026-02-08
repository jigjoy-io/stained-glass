import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/page-reducer"
import { useActiveBlock } from "../../../util/store"
import textEditingVariants from "../../../util/style-helper/text-editing-variations"
import alignmentVariations from "../../../util/style-helper/alignment-variations"
import { handleTextBlockKeyDown } from "../../../util/factories/key-command-factory"

export default function ContentEditingText(props: any) {
	const [position, setPosition] = useState(props.position)
	const [type, setType] = useState(props.type)
	const [style, setStyle] = useState({} as any)

	useEffect(() => {
		setPosition(props.position)
	}, [props.position])

	useEffect(() => {
		setStyle(textEditingVariants[type])
		setType(props.type)
	}, [props.type])

	const dispatch = useDispatch()
	const ref = useRef<HTMLDivElement>(null)
	const activeBlock = useActiveBlock()

	useEffect(() => {
		if (activeBlock === props.id) ref.current?.focus()
	}, [activeBlock])

	useEffect(() => {
		if (ref.current && ref.current.innerText !== props.text) {
			ref.current.innerText = props.text.trim() || ""
		}
	}, [props.text, ref])

	const updateText = (event: any) => {
		const raw = event.target.innerText ?? ""
		const newValue = raw.replace(/\n/g, "").trim()

		let block = {
			id: props.id,
			position: props.position,
			type: props.type,
			text: newValue,
		}
		dispatch(updateBlock(block))
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		handleTextBlockKeyDown({
			event,
			dispatch,
			blockId: props.id,
			blockType: props.type,
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
				data-block-id={props.id}
				className={`${style.class} w-full focus:outline-none flex ${alignmentVariations[position]}`}
				ref={ref}
			>
				{props.text ?? ""}
			</div>
		</div>
	)
}
