import React from "react"
import ImageEditingIcon from "../../../icons/image-editing-icon"
import PositionEditingIcon from "../../../icons/position-editingI-icon"
import SizeIcon from "../../../icons/size-icon"
import ImageEditor from "../editors/image-editor"
import PositionEditor from "../editors/position-editor"
import SizeEditor from "../editors/size-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"

export default class EditableImage extends EditableBlock {


    editingOptions = [{
        name: 'Edit image',
        icon: ImageEditingIcon,
        editor: ImageEditor,
        key: 'source'
    }, {
        name: 'Edit size',
        icon: SizeIcon,
        editor: SizeEditor,
        key: "size"
    }, {
        name: 'Edit position',
        icon: PositionEditingIcon,
        editor: PositionEditor,
        key: "position"
    }]

    addToolbar(props: any) {
        this.block = <Toolbar id={props.id} block={props} editingOptions={this.editingOptions}>{this.block}</Toolbar>
        return this
    }

    get(props: any): any {

        return this.setBlock(props)
                .addToolbar(props)
                .addGap(props)
                .block
    }



} 