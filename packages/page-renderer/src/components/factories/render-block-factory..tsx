import React, { lazy, ReactElement, Suspense } from "react"

const TitleBlock = lazy(() => import("../blocks/title-block"))
const HeadingBlock = lazy(() => import("../blocks/heading-block"))
const TextBlock = lazy(() => import("../blocks/text-block"))
const ImageBlock = lazy(() => import("../blocks/image-block"))
const AudioBlock = lazy(() => import("../blocks/audio-block"))
const VideoBlock = lazy(() => import("../blocks/video-block"))
const ProfileBlock = lazy(() => import("../blocks/profile-block"))
const CarouselTileBlock = lazy(() => import("../blocks/carousel-tile-block"))
const PageTileBlock = lazy(() => import("../blocks/page-tile-block"))
const QuestionBlock = lazy(() => import("../blocks/question-block"))
const MessageBlock = lazy(() => import("../blocks/message-block"))

import AbstractBlockFactory from "./abstract-block-factory"

class RenderBlockFactory extends AbstractBlockFactory {
	createTitleBlock(props: any): ReactElement {
		return (
			<Suspense>
				<TitleBlock {...props} />
			</Suspense>
		)
	}

	createHeadingBlock(props: any): ReactElement {
		return (
			<Suspense>
				<HeadingBlock {...props} />
			</Suspense>
		)
	}

	createTextBlock(props: any): ReactElement {
		return (
			<Suspense>
				<TextBlock {...props} />
			</Suspense>
		)
	}

	createImageBlock(props: any): ReactElement {
		return (
			<Suspense>
				<ImageBlock {...props} />
			</Suspense>
		)
	}

	createAudioBlock(props: any): ReactElement {
		return (
			<Suspense>
				<AudioBlock {...props} />
			</Suspense>
		)
	}

	createVideoBlock(props: any): ReactElement {
		return (
			<Suspense>
				<VideoBlock {...props} />
			</Suspense>
		)
	}

	createProfileBlock(props: any): ReactElement {
		return (
			<Suspense>
				<ProfileBlock {...props} />
			</Suspense>
		)
	}

	createCarouselTileBlock(props: any): ReactElement {
		return (
			<Suspense>
				<CarouselTileBlock {...props} />
			</Suspense>
		)
	}

	createPageTileBlock(props: any): ReactElement {
		return (
			<Suspense>
				<PageTileBlock {...props} />
			</Suspense>
		)
	}

	createQuestionBlock(props: any): ReactElement {
		return (
			<Suspense>
				<QuestionBlock {...props} />
			</Suspense>
		)
	}

	createMessageBlock(props: any): ReactElement {
		return (
			<Suspense>
				<MessageBlock {...props} />
			</Suspense>
		)
	}
}

export default RenderBlockFactory
