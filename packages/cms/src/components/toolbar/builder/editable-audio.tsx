import React from "react"
import AudioEditingIcon from "../../../icons/audio-editing-icon"
import PositionEditingIcon from "../../../icons/position-editingI-icon"
import AudioEditor from "../editors/audio-editor"
import PositionEditor from "../editors/position-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"

export default class EditableAudio extends EditableBlock {

    editingOptions = [{
        name: 'Edit audio',
        icon: AudioEditingIcon,
        editor: AudioEditor,
        key: 'source'
    }, {
        name: 'Edit position',
        icon: PositionEditingIcon,
        editor: PositionEditor,
        key: 'position'
    }]

    addToolbar(props: any) {
        this.block = <Toolbar id={props.id} block={props} editingOptions={this.editingOptions}>{this.block}</Toolbar>
        return this
    }

    get(props: any): any {

        return this.setBlock(props)
                .addToolbar(props)
                .block
    }



} 