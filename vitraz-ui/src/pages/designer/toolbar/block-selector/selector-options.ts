import PageIcon from "../../../../icons/page-icon"
import RenameIcon from "../../../../icons/rename-icon"
import ImageIcon from "../../../../icons/image-icon"

export class SelectorOptions {
	static getOptions() {
		let options = [
			{
				key: "pages",
				commands: [
					{
						key: "page-tile",
						label: "Blank Page",
						icon: PageIcon,
					},
				],
			},
			{
				key: "text",
				commands: [
					{
						key: "title",
						label: "Title",
						icon: RenameIcon,
					},
					{
						key: "heading",
						label: "Heading",
						icon: RenameIcon,
					},
					{
						key: "text",
						label: "Text",
						icon: RenameIcon,
					},
				],
			},
			{
				title: "Multimedia",
				key: "multimedia",
				commands: [
					{
						key: "image-configurer",
						label: "Image",
						icon: ImageIcon,
					},
				],
			},
		]

		return options
	}
}
