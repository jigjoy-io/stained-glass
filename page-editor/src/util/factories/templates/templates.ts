import { v4 as uuid } from "uuid"

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
			question: {
				type: "question",
				content: {
					displayQuestion: true,
					text: "Question text...",
					displayImage: true,
					image: "/public/images/placeholderimage.jpg",
				},
				answers: [
					{
						id: uuid(),
						correct: false,
						text: "Answer 1 text",
					},
					{
						id: uuid(),
						correct: true,
						text: "Answer 2 text",
					},
					{
						id: uuid(),
						correct: false,
						text: "Answer 3 text",
					},
				],
				outcomes: {
					confirmationButtonText: "Check the answer",
					correct: {
						message: "The answer is correct.",
						title: "Great!",
						type: "success",
					},
					incorrect: {
						message: "The answer is not correct.",
						title: "Better luck next time",
						type: "danger",
					},
				},
			},
			message: {
				type: "message",
				message: "Message text goes here...",
				audio: "https://www.w3schools.com/html/mov_bbb.mp4",
				position: "left",
				color: "rose",
			},
			"block-selector": {
				type: "block-selector",
			},
			"page-configurer": {
				type: "page-configurer",
				accessType: "freebie",
				title: "Title",
				description: "Description...",
				display: true,
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
