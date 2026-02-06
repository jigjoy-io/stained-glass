import React from "react"
import EditableText from "../../editor/toolbar/builder/editable-text"
import EditableImage from "../../editor/toolbar/builder/editable-image"
import NoneEditableBlock from "../../editor/toolbar/builder/none-editable-block"
import BasicEditableBlock from "../../editor/toolbar/builder/basic-editable-block"
import EditablePageTile from "../../editor/toolbar/builder/editable-page-tile"

export default class EditorFactory extends React.Component {
	static builders: any = {
		text: {
			builder: new EditableText(),
		},
		heading: {
			builder: new EditableText(),
		},
		title: {
			builder: new EditableText(),
		},
		image: {
			builder: new EditableImage(),
		},
		"image-uploader": {
			builder: new BasicEditableBlock(),
		},
		button: {
			builder: new NoneEditableBlock(),
		},
		cta: {
			builder: new NoneEditableBlock(),
		},
		"page-tile": {
			builder: new EditablePageTile(),
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
