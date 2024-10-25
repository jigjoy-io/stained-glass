import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { focusBlock, insertBlock, updateBlock, removeBlock } from '../../../../reducers/page-reducer'
import { useActiveBlock, usePage } from '../../../../util/store'
import textEditingVariants from '../../../../util/style-helper/text-editing-variations'
import alignmentVariations from '../../../../util/style-helper/alignment-variations'
import TemplateFactory from '../../../../util/factories/templates/template-factory'
import { splitTextAtCursor } from '../../../../util/cursor-helper/split-text-at-cursor'

export default function ContentEditingText(props: any) {
	const [position, setPosition] = useState(props.position)
	const [type, setType] = useState(props.type)
	const [style, setStyle] = useState({} as any)
	const page = usePage()

	const previousBlock = useSelector((state: any) => {
		console.log("BLOCK", page.config.buildingBlocks)
		const blocks = page.config.buildingBlocks
		const currentIndex = blocks.findIndex((block: any) => block.id === props.id)
		if (currentIndex > 0) {
			return blocks[currentIndex - 1]
		}
		return null
	})

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
		if (activeBlock === props.id)
			ref.current?.focus()
	}, [activeBlock])

	const updateText = (event: any) => {
		let newValue = event.target.innerText.trim()
		let block = {
			id: props.id,
			position: props.position,
			type: props.type,
			text: newValue
		}
		dispatch(updateBlock(block))
	}

	const getCaretPosition = (element: HTMLElement): number => {
		const selection = window.getSelection()
		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0)
			const preCaretRange = document.createRange()
			preCaretRange.selectNodeContents(element)
			preCaretRange.setEnd(range.endContainer, range.endOffset)
			const contents = Array.from(element.childNodes)
			let position = 0
			for (let i = 0; i < contents.length; i++) {
				const node = contents[i]
				if (node === range.endContainer) {
					position += range.endOffset
					break
				} else if (node.nodeType === Node.TEXT_NODE) {
					position += node.textContent?.length || 0
				} else if (node.nodeName === 'BR') {
					position += 1
				}
			}
			return position
		}
		return 0
	}

	const handleMergeWithPreviousBlock = () => {
		if (!previousBlock) return false

		const currentText = ref.current?.innerText || ""
		const prevBlockElement = document.querySelector(`[data-block-id="${previousBlock.id}"]`) as HTMLElement
		if (!prevBlockElement) return false

		const prevText = prevBlockElement.innerText
		const mergedText = prevText + currentText

		// Update previous block with merged text
		dispatch(updateBlock({
			...previousBlock,
			text: mergedText
		}))

		// Remove current block
		dispatch(removeBlock(props.id))

		// Focus previous block and set cursor at merge point
		dispatch(focusBlock(previousBlock.id))

		// Use setTimeout to ensure DOM is updated before setting cursor
		setTimeout(() => {
			const updatedPrevBlock = document.querySelector(`[data-block-id="${previousBlock.id}"]`) as HTMLElement
			if (updatedPrevBlock) {
				const range = document.createRange()
				const sel = window.getSelection()
				const textNode = updatedPrevBlock.firstChild || updatedPrevBlock

				// Set cursor position to where the texts were merged
				range.setStart(textNode, prevText.length)
				range.collapse(true)
				sel?.removeAllRanges()
				sel?.addRange(range)
				updatedPrevBlock.focus()
			}
		}, 0)

		return true
	}

	const handleKeyDown = (event: any) => {
		if (event.key === 'Enter' && event.shiftKey) {
			return
		} else if (event.key === 'Enter') {
			event.preventDefault()
			if (!ref.current) return
			const caretPosition = getCaretPosition(ref.current)
			const text = ref.current?.innerText || ""
			const isCaretAtEnd = caretPosition === ref.current?.innerText.length
			const { beforeCursor, afterCursor } = splitTextAtCursor(text, caretPosition)

			let newBlock = TemplateFactory.create(props.type)
			if ((beforeCursor || afterCursor) && !isCaretAtEnd) {
				ref.current!.innerText = beforeCursor
				let updatedBlock = {
					id: props.id,
					position: props.position,
					type: props.type,
					text: beforeCursor
				}
				dispatch(updateBlock(updatedBlock))
				newBlock.text = afterCursor
				dispatch(insertBlock({
					referenceBlock: props.id,
					block: newBlock,
					position: 'below'
				}))
				dispatch(focusBlock(newBlock.id))
				ref.current?.blur()
			} else if (isCaretAtEnd && !event.shiftKey) {
				let selector = TemplateFactory.createBlockSelector()
				dispatch(insertBlock({
					referenceBlock: props.id,
					block: selector,
					position: 'below'
				}))
				dispatch(focusBlock(selector.id))
			}
		} else if (event.key === 'Backspace') {
			const caretPosition = getCaretPosition(ref.current!)
			if (caretPosition === 0 && previousBlock) {
				event.preventDefault()
				handleMergeWithPreviousBlock()
			}
		}
	}

	return (
		<div className={`inline-block w-[100%] ${style.lineHeight} ${alignmentVariations[position]}`}>
			<div
				contentEditable="plaintext-only"
				spellCheck="false"
				onKeyDown={handleKeyDown}
				onBlur={(e) => updateText(e)}
				data-block-id={props.id}
				className={`${style.class} w-[100%] [&[contenteditable]]:focus:border-none [&[contenteditable]]:focus:outline-none`}
				ref={ref}>
				{props.text}
			</div>
		</div>
	)
}