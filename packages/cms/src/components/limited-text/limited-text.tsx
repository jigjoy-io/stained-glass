import React, { useEffect, useState } from 'react'
import Text from '../text/text'
import Heading from '../heading/heading';

interface LimitedTextProps {
    text: string,
    limit: number
}

export default function LimitedText({ text, limit }: LimitedTextProps) {
    const [counter, setCounter] = useState(text.length)

    useEffect(() => {
        setCounter(text.length);
    }, [text]);

    return (
        <div className='relative'>
            <Heading position="center" text={text} />
            <span>{counter} / {limit}</span>
        </div>
    )
}