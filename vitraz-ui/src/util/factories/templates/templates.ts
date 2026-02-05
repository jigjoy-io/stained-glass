export class TemplatesStorage {
	static getTemplates() {
		let templates = {
			audio: {
				type: "audio",
				source: "https://www.w3schools.com/html/mov_bbb.mp4",
				position: "left",
			},
			"audio-configurer": {
				type: "audio-configurer",
				source: "https://www.w3schools.com/html/mov_bbb.mp4",
				display: true,
			},
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
			"image-configurer": {
				type: "image-configurer",
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
