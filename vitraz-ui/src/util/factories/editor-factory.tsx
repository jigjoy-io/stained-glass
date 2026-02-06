import React from "react"
import EditableText from "../../editor/toolbar/builder/editable-text"
import EditableImage from "../../editor/toolbar/builder/editable-image"
import BasicEditableBlock from "../../editor/toolbar/builder/basic-editable-block"

export default class EditorFactory extends React.Component {
	static builders: any = {
		text: {
			builder: new EditableText(),
		},
		h2: {
			builder: new EditableText(),
		},
		h1: {
			builder: new EditableText(),
		},
		image: {
			builder: new EditableImage(),
		},
		"image-uploader": {
			builder: new BasicEditableBlock(),
		},
		"page.display": {
			builder: new BasicEditableBlock(),
		},
		"block-selector": {
			builder: new BasicEditableBlock(),
		},
	}

	static getEditableBlock(props: any) {
		let builder = this.builders[props.type].builder
		return builder.get(props)
	}
}
