export class TemplatesStorage {
	static getTemplates() {
		let templates = {
			text: {
				type: "text",
				text: "",
				position: "left",
			},
			h2: {
				type: "h2",
				text: "",
				position: "left",
			},
			h1: {
				type: "h1",
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
			"page.display": {
				type: "page.display",
				title: "Blank Page",
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
