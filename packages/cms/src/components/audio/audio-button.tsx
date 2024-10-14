import React, { useEffect, useState } from "react"
import SpeakerOnIcon from "../../icons/speaker-on-icon"
import SpeakerOffIcon from "../../icons/speaker-off-icon"
import MediaLibrary from "./media-library"
import AudioPlayer from "./audio-player"

interface AudioButtonProps {
    id: string,
    position?: string
    source: string
}

function AudioButton({ id, position, source }: AudioButtonProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [animationState, setAnimationState] = useState(0)

    let params = {
        id: id,
        source: source,
        onStart: () => {
            setIsPlaying(true)
        },
        onEnd: () => {
            setIsPlaying(false)
        }
    }

    const audioPlayer: AudioPlayer = new AudioPlayer(params)
    const mediaLibrary = MediaLibrary.getInstance()
    mediaLibrary.addPlayer(audioPlayer)

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
        if (isPlaying) {
            intervalId = setInterval(() => {
                setAnimationState((prevState) => (prevState + 1) % 3)
            }, 500)
        } else {
            setAnimationState(0)
        }

        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [isPlaying])

    useEffect(() => {
        return () => mediaLibrary.removePlayer(audioPlayer)
    }, [])

    const togglePlay = () => {
        mediaLibrary.play(audioPlayer)
    }

    const renderIcon = () => {
        if (!isPlaying) return <SpeakerOffIcon />
        switch (animationState) {
            case 0:
            case 2:
                return <SpeakerOnIcon />
            case 1:
                return <SpeakerOffIcon />
            default:
                return <SpeakerOffIcon />
        }
    }

    return (
        <div className="flex w-full" style={{ justifyContent: position }}>
            <div
                className='w-max hover:bg-primary-light border-2 border-[transparent] p-1 rounded-md cursor-pointer'
                onClick={togglePlay}
            >
                {renderIcon()}
            </div>
        </div>
    )
}

export default AudioButton