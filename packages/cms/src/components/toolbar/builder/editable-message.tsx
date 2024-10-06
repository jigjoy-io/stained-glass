import React from "react"
import AudioEditingIcon from "../../../icons/audio-editing-icon"
import ColorEditingIcon from "../../../icons/color-editing-icon"
import ImageEditingIcon from "../../../icons/image-editing-icon"
import PositionEditingIcon from "../../../icons/position-editingI-icon"
import AudioEditor from "../editors/audio-editor"
import ColorEditor from "../editors/color-editor"
import PositionEditor from "../editors/position-editor"
import TextAreaEditor from "../editors/text-area-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"

export default class EditableMessage extends EditableBlock {

    editingOptions = [{
        name: 'Edit message',
        key: 'message',
        icon: ImageEditingIcon,
        editor: TextAreaEditor
    }, {
        name: 'Edit audio',
        key: 'audio',
        icon: AudioEditingIcon,
        editor: AudioEditor
    }, {
        name: 'Edit color',
        key: 'color',
        icon: ColorEditingIcon,
        editor: ColorEditor
    }, {
        name: 'Edit position',
        key: 'position',
        icon: PositionEditingIcon,
        editor: PositionEditor
    }]

    addToolbar(props: any) {
        this.block = <Toolbar id={props.id} block={props} editingOptions={this.editingOptions}><div>{this.block}</div></Toolbar>
        return this
    }

    get(props: any): any {

        return this.setBlock(props)
                .addToolbar(props)
                .addGap(props)
                .block
    }



} 