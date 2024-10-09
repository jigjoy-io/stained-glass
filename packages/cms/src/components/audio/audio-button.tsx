import React, { useEffect, useState } from "react"
import SpeakerOnIcon from "../../icons/speaker-on-icon"

function AudioButton(props: any) {


    const [position, setPosition] = useState(props.position)

    const play = ((audio: string) => {
        new Audio(audio).play()
    })

    useEffect(() => {
        setPosition(props.position)
    }, [props.position])

    return <div className="flex w-full" style={{ justifyContent: position }} >
        <div className='w-max hover:bg-primary-light border-2 border-[transparent] p-1 rounded-md cursor-pointer'
            onClick={() => play(props.source)}>
            <SpeakerOnIcon />
        </div>
    </div>
}

export default AudioButton