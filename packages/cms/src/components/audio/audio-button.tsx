import React, { useState } from "react"
import SpeakerOnIcon from "../../icons/speaker-on-icon"
import SpeakerOffIcon from "../../icons/speaker-off-icon"
import AudioPlayer from "../../util/audio-player"

interface AudioButtonProps {
    id: string,
    position?: string
    source: string
}

function AudioButton({ id, position, source }: AudioButtonProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioPlayer = AudioPlayer.getInstance()

    const togglePlay = () => {

        audioPlayer.play(id, source)
        audioPlayer.onStart(() => setIsPlaying(true))
        audioPlayer.onEnd(() => setIsPlaying(false))
    }

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