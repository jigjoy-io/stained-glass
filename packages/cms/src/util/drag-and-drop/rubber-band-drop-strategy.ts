import { updateBlock } from "../../reducers/page-reducer"
import { DropStrategy } from "./drop-strategy"

function findPageById(page, targetId) {
	if (page.id === targetId) {
		return page
	}

	if (page.config && page.config.pages && Array.isArray(page.config.pages)) {
		for (const nestedPage of page.config.pages) {
			const result = findPageById(nestedPage, targetId)
			if (result) {
				return result
			}
		}
	}

	return null
}

export class RubberBandDropStrategy implements DropStrategy {
	execute(dropTarget, selectedBlocks, blocks, page, activeCarousel, dispatch, setDropTarget) {
		if (!dropTarget) return

		const dragIndexes = selectedBlocks.map((block) => block.index).sort((a, b) => a - b)
		const hoverIndex = dropTarget.index

		const targetIndex = dropTarget.position === "top" ? hoverIndex : hoverIndex

		const filteredBlocks = blocks.filter(
			(block) => !selectedBlocks.some((selectedBlock) => selectedBlock.id === block.id),
		)

		const adjustedTargetIndex = targetIndex > dragIndexes[0] ? targetIndex - selectedBlocks.length : targetIndex
		filteredBlocks.splice(adjustedTargetIndex, 0, ...selectedBlocks)

		const carouselPage = findPageById(page, activeCarousel)
		const targetPage = carouselPage || page

		dispatch(
			updateBlock({
				...targetPage,
				config: {
					...targetPage.config,
					buildingBlocks: filteredBlocks,
				},
			}),
		)
	}
}
