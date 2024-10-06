import React from "react"
import ColorEditingIcon from "../../../icons/color-editing-icon"
import CTAEditingIcon from "../../../icons/cta-editing-icon"
import DescriptionEditingIcon from "../../../icons/description-editing-icon"
import { RenameIcon } from "../../../icons/rename-icon"
import ColorEditor from "../editors/color-editor"
import TextEditor from "../editors/text-editor"
import Toolbar from "../toolbar"
import EditableBlock from "./editable-block"
import ImageEditingIcon from "../../../icons/image-editing-icon"
import ImageEditor from "../editors/image-editor"

export default class EditablePageTile extends EditableBlock {

    editingOptions = [{
        name: 'Rename',
        icon: RenameIcon,
        key: 'title',
        editor: TextEditor
    },{
        name: 'Edit image',
        icon: ImageEditingIcon,
        key: 'image',
        editor: ImageEditor
    },{
        name: 'Edit description',
        icon: DescriptionEditingIcon,
        key: 'description',
        editor: TextEditor
    },{
        name: 'Edit call to action',
        icon: CTAEditingIcon,
        key: 'cta',
        editor: TextEditor
    },{
        name: 'Edit color',
        icon: ColorEditingIcon,
        key: 'color',
        editor: ColorEditor
    }]

    addToolbar(props: any) {
        this.block = <Toolbar id={props.id} block={props} editingOptions={this.editingOptions} blockRadius="rounded-[20px]">{this.block}</Toolbar>
        return this
    }

    get(props: any): any {

        return this.setBlock(props)
                .addToolbar(props)
                .addGap(props)
                .block
    }



} 