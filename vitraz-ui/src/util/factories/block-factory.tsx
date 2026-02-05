import React, { lazy, Suspense } from "react"

const AudioButton = lazy(() => import("../../components/audio/audio-button"))
const Text = lazy(() => import("../../components/text/text"))
const Heading = lazy(() => import("../../components/heading/heading"))
const Title = lazy(() => import("../../components/title/title"))
const Image = lazy(() => import("../../components/image/image"))
const Button = lazy(() => import("../../components/button/button"))
const PageTile = lazy(() => import("../../components/page/page-tile"))
const PageConfigurer = lazy(() => import("../../components/page/page-configurer"))
const BlockSelector = lazy(() => import("../../pages/designer/toolbar/block-selector/block-selector"))
const ImageConfigurer = lazy(() => import("../../components/image/image-configurer"))
const AudioConfigurer = lazy(() => import("../../components/audio/audio-configurer"))

export default class BlockFactory extends React.Component {
	static buildingBlocks: any = {
		audio: {
			component: AudioButton,
		},
		"audio-configurer": {
			component: AudioConfigurer,
		},
		text: {
			component: Text,
		},
		heading: {
			component: Heading,
		},
		title: {
			component: Title,
		},
		image: {
			component: Image,
		},
		"image-configurer": {
			component: ImageConfigurer,
		},
		button: {
			component: Button,
		},
		"page-tile": {
			component: PageTile,
		},
		"page-configurer": {
			component: PageConfigurer,
		},
		"block-selector": {
			component: BlockSelector,
		},
	}

	static get(props: any) {
		let block: any = this.buildingBlocks[props.type]
		return (
			<Suspense>
				<block.component {...props} />
			</Suspense>
		)
	}
}
