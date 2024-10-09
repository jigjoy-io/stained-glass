import React from "react"
import EditableAudio from "../components/toolbar/builder/editable-audio"
import EditableCarouselTile from "../components/toolbar/builder/editable-carousel-tile"
import EditableImage from "../components/toolbar/builder/editable-image"
import EditableMessage from "../components/toolbar/builder/editable-message"
import NoneEditableBlock from "../components/toolbar/builder/none-editable-block"
import EditableProfile from "../components/toolbar/builder/editable-profile"
import EditableQuestion from "../components/toolbar/builder/editable-question"
import EditableReel from "../components/toolbar/builder/editable-reel"
import BasicEditableBlock from "../components/toolbar/builder/basic-editable-block"
import EditableText from "../components/toolbar/builder/editable-text"
import EditablePageTile from "../components/toolbar/builder/editable-page-tile"


export default class EditorFactory extends React.Component {

    static builders: any = {
        "text": {
            builder: new EditableText()
        },
        "heading": {
            builder: new EditableText()
        },
        "title": {
            builder: new EditableText()
        },
        "image": {
            builder: new EditableImage()
        },
        "button": {
            builder: new NoneEditableBlock()
        },
        "question": {
            builder: new EditableQuestion()
        },
        "profile": {
            builder: new EditableProfile()
        },
        "reel": {
            builder: new EditableReel()
        },
        "message": {
            builder: new EditableMessage()
        },
        "audio": {
            builder: new EditableAudio()
        },
        "carousel-tile": {
            builder: new EditableCarouselTile()
        },
        "cta": {
            builder: new NoneEditableBlock()
        },
        "carousel-configurer": {
            builder: new BasicEditableBlock()
        },
        "page-configurer": {
            builder: new BasicEditableBlock()
        },
        "page-tile": {
            builder: new EditablePageTile()
        },
        "block-selector": {
            builder: new BasicEditableBlock()
        }
    }

    static getEditableBlock(props: any) {
        let builder = this.builders[props.type].builder
        return builder.get(props)
    }
}