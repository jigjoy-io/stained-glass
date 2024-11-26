import { DropStrategy } from "./drop-strategy"

export class DropHandler {
	private strategy: DropStrategy

	constructor(strategy: DropStrategy) {
		this.strategy = strategy
	}

	setStrategy(strategy: DropStrategy) {
		this.strategy = strategy
	}

	execute(dropTarget, selectedBlocks, blocks, page, activeCarousel, dispatch, setDropTarget) {
		this.strategy.execute(dropTarget, selectedBlocks, blocks, page, activeCarousel, dispatch, setDropTarget)
	}
}
