import React from "react"
import { AddBlockIcon } from "../icons/AddBlockIcon"
import ToolbarButtonWrapper from "./ToolbarButtonWrapper"

export class AddBlockButton extends React.Component<any> {

    render() {
        return <ToolbarButtonWrapper>
                <AddBlockIcon />
            </ToolbarButtonWrapper>



    }

}

