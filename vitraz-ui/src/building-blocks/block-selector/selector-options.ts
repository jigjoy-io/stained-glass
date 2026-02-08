import PageIcon from "../page/page.icon"
import ImageIcon from "../image/image.icon"
import H1Icon from "../h1/h1.icon"
import H2Icon from "../h2/h2.icon"
import { loadRemote } from "@module-federation/enhanced/runtime"
import React from "react"

const TextIcon = React.lazy(() => loadRemote("provider/TextIcon"))

export class SelectorOptions {
	static getOptions() {
		let options = [
			{
				key: "text",
				commands: [
					{
						key: "h1",
						label: "Heading 1",
						icon: H1Icon,
					},
					{
						key: "h2",
						label: "Heading 2",
						icon: H2Icon,
					},
					{
						key: "text",
						label: "Text",
						icon: TextIcon,
					},
				],
			},
			{
				title: "Other",
				key: "pages",
				commands: [
					{
						key: "page.display",
						label: "Blank Page",
						icon: PageIcon,
					},
					{
						key: "image-uploader",
						label: "Image",
						icon: ImageIcon,
					},
				],
			},
		]

		return options
	}
}
