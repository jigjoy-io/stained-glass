import React, { useState } from "react"
import './../../index.css'

export default function Tooltip(props: any) {

    const [on, toggleTooltip] = useState(false)
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)

    const toggle = (e) => {
        toggleTooltip(!on)
        const rect = e.target.getBoundingClientRect()
        setTop(rect.top)
        setLeft(rect.left)
    }

    return <div className="">
        <div className={`${on ? 'block' : 'hidden'} fixed`} style={{top:top, left:left, transform: 'translateY(-120%)'}}>
            <div className="p-1 px-3 rounded-md bg-[black] !text-[white] shadow">
                {props.message}
            </div>
        </div>

        <div onMouseEnter={toggle} onMouseLeave={toggle}>{props.children}</div>
    </div>

}

