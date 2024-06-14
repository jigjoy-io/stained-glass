import React from "react"
import CTAEditingIcon from "../../../icons/CTAEditingIcon"
import DescriptionEditingIcon from "../../../icons/DescriptionEditingIcon"
import PriceEditingIcon from "../../../icons/PriceEditingIcon"
import TextEditingIcon from "../../../icons/TextEditingIcon"
import Toolbar from "../Toolbar"
import EditableBlockBuilder from "./EditableBlockBuilder"

export default class ChapterEditableBlockBuilder extends EditableBlockBuilder {

    editingOptions = [{
        name: 'Edit title',
        icon: TextEditingIcon
    },{
        name: 'Edit description',
        icon: DescriptionEditingIcon
    },{
        name: 'Edit price',
        icon: PriceEditingIcon
    },{
        name: 'Edit call to action',
        icon: CTAEditingIcon
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