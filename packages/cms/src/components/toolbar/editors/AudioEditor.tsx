import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/pageReducer"
import AudioButton from "../../audio/AudioButton"
import Button from "../../button/Button"

export default function AudioEditor(props: any) {

    const [value, setValue] = useState(props.value)
    const [displayUrlInput, setDisplayUrlInput] = useState(false)

    const dispatch = useDispatch()


    const update = () => {
        let block = JSON.parse(JSON.stringify(props.block))
        block[props.attribute] = value
        dispatch(updateBlock(block))
    }

    return <div className="flex flex-col p-2 w-[300px] mt-4">
        <AudioButton source={value} />
        <div className="flex gap-3 my-3">
            <Button text="Upload audio" color="default" />
            <Button text="Embed link" color="default" action={() => setDisplayUrlInput(true)} />
        </div>
        {displayUrlInput && <input className="p-1 rounded-lg border w-[100%] mb-3" value={value} onChange={(e: any) => setValue(e.target.value)} />}
        <Button text="Update" action={update} />
    </div>
}