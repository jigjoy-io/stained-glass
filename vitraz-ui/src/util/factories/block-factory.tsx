import React, { lazy, Suspense } from "react"

const Text = lazy(() => import("../../components/text/text"))
const Heading = lazy(() => import("../../building-blocks/heading/heading"))
const Title = lazy(() => import("../../building-blocks/title/title"))
const Image = lazy(() => import("../../components/image/image"))
const PageTile = lazy(() => import("../../components/page/page-tile"))
const BlockSelector = lazy(() => import("../../pages/designer/toolbar/block-selector/block-selector"))
const ImageConfigurer = lazy(() => import("../../components/image/image-configurer"))

export default class BlockFactory extends React.Component {
	static buildingBlocks: any = {
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
		"page-tile": {
			component: PageTile,
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
