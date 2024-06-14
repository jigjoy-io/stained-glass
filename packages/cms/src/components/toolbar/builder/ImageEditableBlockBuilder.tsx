import React from "react"
import ImageEditingIcon from "../../../icons/ImageEditingIcon"
import PositionEditingIcon from "../../../icons/PositionEditingIcon"
import SizeIcon from "../../../icons/SizeIcon"
import ImageEditor from "../editors/ImageEditor"
import PositionEditor from "../editors/PositionEditor"
import SizeEditor from "../editors/SizeEditor"
import Toolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlockBuilder"

export default class ImageEditableBlockBuilder extends EditableBlockBuilder {

    editingOptions = [{
        name: 'Edit image',
        type: 'selector',
        icon: ImageEditingIcon,
        editor: ImageEditor,
        key: 'source'
    }, {
        name: 'Edit size',
        type: 'selector',
        icon: SizeIcon,
        editor: SizeEditor,
        key: "size"
    }, {
        name: 'Edit position',
        type: 'selector',
        icon: PositionEditingIcon,
        editor: PositionEditor,
        key: "position"
    }]

    addToolbar(props: any) {
        this.block = <Toolbar id={props.id} block={props} editingOptions={this.editingOptions}>{this.block}</Toolbar>
        return this
    }

    createEditableBlock(props: any): any {

        return this.setBlock(props)
                .addToolbar(props)
                .block
    }



} 