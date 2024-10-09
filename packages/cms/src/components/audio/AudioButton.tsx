import React, { useEffect, useState, useRef } from "react";
import SpeakerOnIcon from "../../icons/SpeakerOnIcon";
import AudioPlayer from "../../util/audioPlayer";

function AudioButton(props: any) {
    const [position, setPosition] = useState(props.position);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioPlayer = AudioPlayer.getInstance();

    const toggleAudio = () => {
        if (isPlaying) {
            audioPlayer.pauseAudio()
            setIsPlaying(false)
        } else {
            audioPlayer.playAudio(props.source)
            setIsPlaying(true)
        }
    };

    useEffect(() => {
        setPosition(props.position);
    }, [props.position]);

    return (
        <div className="flex w-full" style={{ justifyContent: position }}>
            <div
                className={`w-max p-1 hover:bg-primary-light rounded-md cursor-pointer ${!isPlaying ? "bg-purple-600" : "bg-primary-light"
                    }`}
                onClick={toggleAudio}
            >
                <SpeakerOnIcon />
            </div>
        </div>
    );
}

export default AudioButton;
