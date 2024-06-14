import React from "react"
import AudioEditingIcon from "../../../icons/AudioEditingIcon"
import PositionEditingIcon from "../../../icons/PositionEditingIcon"
import AudioEditor from "../editors/AudioEditor"
import PositionEditor from "../editors/PositionEditor"
import Toolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlockBuilder"

export default class AudioEditableBlockBuilder extends EditableBlockBuilder {

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

    createEditableBlock(props: any): any {

        return this.setBlock(props)
                .addToolbar(props)
                .block
    }



} 