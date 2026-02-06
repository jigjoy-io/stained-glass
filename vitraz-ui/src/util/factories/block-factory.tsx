import React, { Suspense } from "react"
import PageTile from "../../building-blocks/page/page-tile"
import Title from "../../building-blocks/title/title"
import Heading from "../../building-blocks/heading/heading"
import Text from "../../building-blocks/text/text"
import Image from "../../building-blocks/image/image"
import ImageUploader from "../../building-blocks/image/image-uploader"
import BlockSelector from "../../pages/designer/toolbar/block-selector/block-selector"

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
		"image-uploader": {
			component: ImageUploader,
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
