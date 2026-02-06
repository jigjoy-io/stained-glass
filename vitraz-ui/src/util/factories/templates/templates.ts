export class TemplatesStorage {
	static getTemplates() {
		let templates = {
			text: {
				type: "text",
				text: "",
				position: "left",
			},
			heading: {
				type: "heading",
				text: "",
				position: "left",
			},
			title: {
				type: "title",
				text: "",
				position: "left",
			},
			image: {
				type: "image",
				source: "/public/images/placeholderimage/jpg",
				position: "left",
				size: "large",
			},
			"image-uploader": {
				type: "image-uploader",
				source: "/public/images/placeholderimage.jpg",
				display: true,
			},
			"block-selector": {
				type: "block-selector",
			},
			"page-tile": {
				type: "page-tile",
				title: "Title",
				description: "Description...",
				cta: "Start",
			},
			blank: {
				type: "blank",
				name: "Blank Page",
				environment: "development",
				linkedPageId: null,
				config: {
					buildingBlocks: [],
				},
			},
		}
		return templates
	}
}
