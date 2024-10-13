import React, { useEffect, useRef, useState } from "react"
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
    const animationInterval = useRef<NodeJS.Timeout | null>(null)

    let params = {
        id: id,
        source: source,
        onStart: () => {
            setIsPlaying(true)
            startAnimation()
        },
        onEnd: () => {
            setIsPlaying(false)
            stopAnimation()
        }
    }

    const audioPlayer: AudioPlayer = new AudioPlayer(params)
    const mediaLibrary = MediaLibrary.getInstance()

    mediaLibrary.addPlayer(audioPlayer)

    useEffect(() => {
        return () => {
            mediaLibrary.removePlayer(audioPlayer)
            if (isPlaying) {
                stopAnimation()
            } else {
                startAnimation()
            }
        }
    }, [isPlaying])

    const togglePlay = () => {

        mediaLibrary.play(audioPlayer)
        setIsPlaying(!isPlaying)
    }

    const startAnimation = () => {
        if (animationInterval.current === null) {
            animationInterval.current = setInterval(() => {
                setAnimationState((prevState) => (prevState + 1) % 3)
            }, 500)
        }
    }

    const stopAnimation = () => {
        if (animationInterval.current !== null) {
            clearInterval(animationInterval.current)
            animationInterval.current = null
            setAnimationState(0)
        }
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