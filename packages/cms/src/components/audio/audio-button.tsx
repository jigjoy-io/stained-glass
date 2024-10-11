import React, { useEffect, useRef, useState } from "react"
import SpeakerOnIcon from "../../icons/speaker-on-icon"
import SpeakerOffIcon from "../../icons/speaker-off-icon";
import AudioPlayer from "../../util/audio-player";
import { v4 as uuid } from 'uuid'

interface AudioButtonProps {
    position: string;
    source: string;
}

function AudioButton({ position, source }: AudioButtonProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const buttonId = useRef(uuid())

    const togglePlay = () => {
        AudioPlayer.getInstance().playAudio(source, buttonId.current)
        setIsPlaying(AudioPlayer.getInstance().getIsPlaying() &&
            AudioPlayer.getInstance().getCurrentSource() === source &&
            AudioPlayer.getInstance().getCurrentButtonId() === buttonId.current
        )
    }

    useEffect(() => {
        const checkPlayingStatus = () => {
            setIsPlaying(AudioPlayer.getInstance().getIsPlaying() &&
                AudioPlayer.getInstance().getCurrentSource() === source &&
                AudioPlayer.getInstance().getCurrentButtonId() === buttonId.current
            )
        }

        const intervalId = setInterval(checkPlayingStatus, 100)

        return () => clearInterval(intervalId)
    }, [source])

    return (
        <div className="flex w-full" style={{ justifyContent: position }}>
            <div
                className='w-max hover:bg-primary-light border-2 border-[transparent] p-1 rounded-md cursor-pointer'
                onClick={togglePlay}
            >
                {isPlaying ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
            </div>
        </div>
    )
}

export default AudioButton