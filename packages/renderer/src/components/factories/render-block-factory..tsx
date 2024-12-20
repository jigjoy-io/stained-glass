import React, { lazy, ReactElement } from "react"

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
		return <TitleBlock {...props} />
	}

	createHeadingBlock(props: any): ReactElement {
		return <HeadingBlock {...props} />
	}

	createTextBlock(props: any): ReactElement {
		return <TextBlock {...props} />
	}

	createImageBlock(props: any): ReactElement {
		return <ImageBlock {...props} />
	}

	createAudioBlock(props: any): ReactElement {
		return <AudioBlock {...props} />
	}

	createVideoBlock(props: any): ReactElement {
		return <VideoBlock {...props} />
	}

	createProfileBlock(props: any): ReactElement {
		return <ProfileBlock {...props} />
	}

	createCarouselTileBlock(props: any): ReactElement {
		return <CarouselTileBlock {...props} />
	}

	createPageTileBlock(props: any): ReactElement {
		return <PageTileBlock {...props} />
	}

	createQuestionBlock(props: any): ReactElement {
		return <QuestionBlock {...props} />
	}

	createMessageBlock(props: any): ReactElement {
		return <MessageBlock {...props} />
	}
}

export default RenderBlockFactory
