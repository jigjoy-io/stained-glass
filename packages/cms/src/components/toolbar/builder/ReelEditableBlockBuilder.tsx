import React from "react"
import VideoEditingIcon from "../../../icons/VideoEditingIcon"
import VideoEditor from "../editors/VideoEditor"
import Toolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlockBuilder"

export default class ReelEditableBlockBuilder extends EditableBlockBuilder {

    editingOptions = [{
        name: 'Edit video',
        icon: VideoEditingIcon,
        editor: VideoEditor,
        key: 'source'
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