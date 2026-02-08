import React, { Suspense } from "react"
import PageDisplay from "../../building-blocks/page/page.display"
import H1 from "../../building-blocks/h1/h1"
import H2 from "../../building-blocks/h2/h2"
import Image from "../../building-blocks/image/image"
import ImageUploader from "../../building-blocks/image/image-uploader"
import BlockSelector from "../../building-blocks/block-selector/block-selector"

import { loadRemote } from "@module-federation/enhanced/runtime"

const Text = React.lazy(() => loadRemote("provider/Text"))

export default class BlockFactory extends React.Component {
	static buildingBlocks: any = {
		text: {
			component: Text,
		},
		h2: {
			component: H2,
		},
		h1: {
			component: H1,
		},
		image: {
			component: Image,
		},
		"image-uploader": {
			component: ImageUploader,
		},
		"page.display": {
			component: PageDisplay,
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
