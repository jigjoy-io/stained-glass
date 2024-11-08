import React, { useRef, useState } from "react"
import { m } from "framer-motion"
import { useDrag, useDrop } from "react-dnd"
import { Identifier } from "dnd-core"
import BuildingBlock from "../../util/factories/building-block"

const item = {
	hidden: { opacity: 0 },
	show: { opacity: 1 },
}

interface DraggableBlockProps {
	block: any
	index: number
	moveBlocks: (dragIndices: number[], targetIndex: number) => void
	mode: string
	isSelected: boolean
	onSelect: (index: number, multiSelect: boolean) => void
	selectedBlocks: number[]
	onSelectionStart: (index: number) => void
	onSelectionEnd: (index: number) => void
	isDraggingAny: boolean
}

const DraggableBlock = React.memo(
	({
		block,
		index,
		moveBlocks,
		mode,
		isSelected,
		onSelect,
		selectedBlocks,
		onSelectionStart,
		onSelectionEnd,
		isDraggingAny,
	}: DraggableBlockProps) => {
		const [dropPosition, setDropPosition] = useState<"top" | "bottom" | null>(null)
		const ref = useRef<HTMLDivElement>(null)
		const [isHovered, setIsHovered] = useState(false)
		const dragStartPosRef = useRef<{ x: number; y: number } | null>(null)
		const dragHandleRef = useRef<HTMLDivElement | null>(null)

		const [{ handlerId, isOver }, drop] = useDrop<
			{ indices: number[]; type: string },
			void,
			{ handlerId: Identifier | null; isOver: boolean }
		>({
			accept: "BLOCK",
			collect(monitor) {
				return {
					handlerId: monitor.getHandlerId(),
					isOver: monitor.isOver(),
				}
			},
			hover(item, monitor) {
				if (!ref.current) return

				const hoverBoundingRect = ref.current?.getBoundingClientRect()
				const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
				const clientOffset = monitor.getClientOffset()

				if (!clientOffset) return

				const hoverClientY = clientOffset.y - hoverBoundingRect.top
				setDropPosition(hoverClientY <= hoverMiddleY ? "top" : "bottom")
			},
			drop(item, monitor) {
				if (!ref.current) return

				const hoverBoundingRect = ref.current?.getBoundingClientRect()
				const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
				const clientOffset = monitor.getClientOffset()

				if (!clientOffset) return

				const hoverClientY = clientOffset.y - hoverBoundingRect.top
				const finalPosition = hoverClientY < hoverMiddleY ? "top" : "bottom"
				const targetIndex = finalPosition === "top" ? index : index + 1

				moveBlocks(item.indices, targetIndex)
				setDropPosition(null)
			},
		})

		const [{ isDragging }, drag] = useDrag({
			type: "BLOCK",
			item: () => ({
				indices: isSelected ? selectedBlocks : [index],
				type: "BLOCK",
			}),
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		})

		const handleMouseDown = (e: React.MouseEvent) => {
			if (mode === "editing") {
				dragStartPosRef.current = { x: e.clientX, y: e.clientY }

				const isDragHandle = dragHandleRef.current?.contains(e.target as Node)
				if (!isDragHandle) {
					if (e.shiftKey) {
						onSelectionStart(index)
					} else if (e.ctrlKey || e.metaKey) {
					} else if (!isSelected) {
						onSelect(index, false)
					}
				}
			}
		}

		const handleMouseUp = (e: React.MouseEvent) => {
			if (mode === "editing") {
				const isClick =
					dragStartPosRef.current &&
					Math.abs(e.clientX - dragStartPosRef.current.x) < 5 &&
					Math.abs(e.clientY - dragStartPosRef.current.y) < 5

				const isDragHandle = dragHandleRef.current?.contains(e.target as Node)
				if (!isDragHandle) {
					if (e.shiftKey) {
						onSelectionEnd(index)
					} else if (e.ctrlKey || e.metaKey) {
						onSelect(index, true)
					} else if (isClick && !isDragging) {
						onSelect(index, false)
					}
				}
			}
			dragStartPosRef.current = null
		}

		const handleMouseEnter = () => setIsHovered(true)
		const handleMouseLeave = () => setIsHovered(false)

		drop(ref)

		const blockClasses = [
			"relative",
			"transition-all",
			"duration-150",
			mode === "editing" ? "hover:bg-gray-50" : "",
			isSelected ? "bg-blue-100 shadow-sm" : "bg-white",
			isDragging ? "opacity-50" : "",
			isHovered && !isSelected ? "bg-gray-50" : "",
		]
			.filter(Boolean)
			.join(" ")

		const showDragHandle =
			mode === "editing" &&
			((selectedBlocks.length > 0 && selectedBlocks[0] === index) || (selectedBlocks.length === 0 && isHovered))

		return (
			<div className="relative group">
				{isOver && dropPosition === "top" && (
					<div
						className="absolute -top-[1px] left-0 right-0 h-[3px]"
						style={{
							zIndex: 100,
							backgroundColor: "#F672D1",
						}}
					/>
				)}
				<m.div
					ref={ref}
					variants={item}
					style={{ opacity: isDragging ? 0 : 1 }}
					data-handler-id={handlerId}
					className={`relative ${isDragging ? "z-50" : "z-0"}`}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<div className={blockClasses}>
						{showDragHandle && (
							<div
								ref={(node) => {
									dragHandleRef.current = node
									drag(node)
								}}
								className={`
                                absolute ${selectedBlocks.length > 1 ? "-left-5 top-3" : "left-2"} 
                                cursor-grab active:cursor-grabbing p-1 z-50
                                rounded transition-opacity duration-150 bg-white shadow-sm
                                hover:bg-gray-100
                                ${isSelected || isHovered ? "opacity-100" : "opacity-0"}
                            `}
							>
								<span className="select-none">⋮⋮</span>
							</div>
						)}
						<div
							className={`
                            ${isSelected ? "bg-light" : ""}
                            ${isDraggingAny ? "pointer-events-none" : ""}
                        `}
						>
							<BuildingBlock {...block} mode={mode} />
						</div>
					</div>
				</m.div>
				{isOver && dropPosition === "bottom" && (
					<div
						className="absolute -bottom-[1px] left-0 right-0 h-[3px]"
						style={{
							zIndex: 100,
							backgroundColor: "#F672D1",
						}}
					/>
				)}
			</div>
		)
	},
)

export default DraggableBlock
