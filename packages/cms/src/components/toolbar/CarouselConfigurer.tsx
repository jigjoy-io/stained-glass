import React, { useRef } from "react"
import CarouselIcon from "../../icons/CarouselIcon"

export default function CarouselConfigurer () {
 
    
    const ref = useRef<HTMLInputElement>(null)
    
    const openPopover = () => {


    }


    return <div>
    <div
        ref={ref}
        onClick={openPopover}
        className="w-[100%] h-[50px] bg-default-light hover:bg-gray-300 cursor-pointer rounded-md flex items-center pl-5"
    >
        <CarouselIcon />
        <div className="pl-2">Click to add a carousel</div>
    </div>
</div>
}