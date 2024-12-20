import { ReactElement } from "react"

export default abstract class AbstractBlockFactory {
	abstract createTitleBlock(props): ReactElement

	abstract createHeadingBlock(props): ReactElement

	abstract createTextBlock(props): ReactElement

	abstract createImageBlock(props): ReactElement

	abstract createAudioBlock(props): ReactElement

	abstract createVideoBlock(props): ReactElement

	abstract createProfileBlock(props): ReactElement

	abstract createCarouselTileBlock(props): ReactElement

	abstract createPageTileBlock(props): ReactElement

	abstract createQuestionBlock(props): ReactElement

	abstract createMessageBlock(props): ReactElement
}
