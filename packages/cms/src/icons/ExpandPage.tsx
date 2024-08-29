import React, { useState } from "react"
import { ExpandDownIcon } from "./ExpandDownIcon"
import { PageIcon } from "./PageIcon"

export function ExpandPage(props: any) {


    const [page, showPageIcon] = useState(true)
    const [expanded, setExpand] = useState(false)

    const toggleExpand = (e) => {
        e.stopPropagation()
        let newValue = !expanded
        if(newValue){
            props.expand(props.id)
        }
        setExpand(newValue)
        
    }

    return <div onClick={(e) => toggleExpand(e)} className="flex items-center justify-center w-[24px] h-[24px] rounded-[4px] bg-[transparent] hover:bg-primary-light border-2 border-[transparent] rounded-md cursor-pointer" onMouseEnter={() => showPageIcon(false)} onMouseLeave={() => showPageIcon(true)}>
        {!props.hover && <PageIcon />}
        {props.hover && <div className={`${expanded ? '': '-rotate-90'}`}><ExpandDownIcon /></div>}
        
    </div>
}