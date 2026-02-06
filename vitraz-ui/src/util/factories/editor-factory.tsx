import React from "react"
import EditableText from "../../pages/designer/toolbar/builder/editable-text"
import EditableImage from "../../pages/designer/toolbar/builder/editable-image"
import NoneEditableBlock from "../../pages/designer/toolbar/builder/none-editable-block"
import BasicEditableBlock from "../../pages/designer/toolbar/builder/basic-editable-block"
import EditablePageTile from "../../pages/designer/toolbar/builder/editable-page-tile"

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
		"image-configurer": {
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
