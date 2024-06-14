import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/pageReducer"
import Button from "../../button/Button"

export default function QuestionOutcomesEditor(props: any) {

    const [value, setValue] = useState(props.value)
    const [selected, setSelected] = useState('correct')

    const dispatch = useDispatch()


    const update = () => {
        let block = JSON.parse(JSON.stringify(props.block))
        block[props.attribute] = value
        dispatch(updateBlock(block))
    }

    const handleOutcomeChange = (key, newValue) => {
        let outcomes = JSON.parse(JSON.stringify(value))
        outcomes[selected][key] = newValue
        setValue(outcomes)
    }

    const handleButtonChange = (key, newValue) => {
        let outcomes = JSON.parse(JSON.stringify(value))
        outcomes[key] = newValue
        setValue(outcomes)
    }

    return <div className="flex flex-col p-2 w-[300px] mt-4">

        <div>Confirmation Button Text:</div>
        <input className="p-1 rounded-lg border w-[100%] mb-3" value={value.confirmationButtonText} onChange={(e: any) => handleButtonChange('confirmationButtonText', e.target.value)} />

        <div className="flex gap-3 my-3">
            <Button text="Correct" color={selected == 'correct' ? "primary" : "default"} action={() => setSelected('correct')} />
            <Button text="Incorrect" color={selected == 'incorrect' ? "primary" : "default"} action={() => setSelected('incorrect')} />
        </div>

        {selected == 'correct' && <>
            <div>Title:</div>
            <input className="p-1 rounded-lg border w-[100%] mb-3" value={value.correct.title} onChange={(e: any) => handleOutcomeChange('title', e.target.value)} />
            <div>Message:</div>
            <textarea className="p-1 rounded-lg border w-[100%] mb-3" value={value.correct.message} onChange={(e: any) => handleOutcomeChange('message', e.target.value)} />
        </>
        }
        {selected == 'incorrect' && <>
            <div>Title:</div>
            <input className="p-1 rounded-lg border w-[100%] mb-3" value={value.incorrect.title} onChange={(e: any) => handleOutcomeChange('title', e.target.value)} />
            <div>Message:</div>
            <textarea className="p-1 rounded-lg border w-[100%] mb-3" value={value.incorrect.message} onChange={(e: any) => handleOutcomeChange('message', e.target.value)} />
        </>}

        <Button text="Update" action={update} />
    </div>
}