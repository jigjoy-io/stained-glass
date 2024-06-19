import React from 'react'
import { useDispatch } from "react-redux"
import TemplateFactory from '../factories/TemplateFactory'
import { insertBlock, updateBlock } from "../reducers/pageReducer"

export default function ContentEditingWrapper(props: any) {


    const dispatch = useDispatch()

    const updateText = (event: any) => {

        let newValue = event.target.innerText.trim()

        let block = {
            id: props.id,
            builderVersion: props.builderVersion,
            position: props.position,
            type: props.type,
            text: newValue
        }

        dispatch(updateBlock(block))

    }

    const handleKeyDown = (event: any) => {

        if (event.key === 'Enter') {
            event.target.blur()

            let selector = TemplateFactory.get("block-selector")

            dispatch(insertBlock({
                referenceBlock: props.id,
                newBlock: selector
            }))
        }
    }

    return (
        <div
            contentEditable={true}
            spellCheck="false"
            onKeyDown={handleKeyDown}
            onBlur={(e) => updateText(e)}
            className="[&[contenteditable]]:focus:border-none [&[contenteditable]]:focus:outline-none w-[100%]">
            {props.children}
        </div>
    )

}
