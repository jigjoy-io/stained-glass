import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ClickOutsideListener from './ClickOutsideListener'

export default function PopoverContent(props: any) {

	const [isOpen, setIsOpen] = useState(null)

	const [top, setTop] = useState(0)
	const [left, setLeft] = useState(0)

	useEffect(() => {
		setIsOpen(props.isOpen)
	}, [props.isOpen])

	useEffect(() => {
		if (props.rect != null) {
			setTop(props.rect.top + props.rect.height)
			setLeft(props.rect.x + props.rect.width - 5)
		}


	}, [props.rect])

	return <div>
		{
			(props.on && (isOpen == null || isOpen)) && <>
				{createPortal(<ClickOutsideListener callback={props.onClose}>
					<div className={`fixed flex rounded-md p-1 shadow bg-[white] 
						${props.position == 'left' && '-translate-x-[100%]'} 
						${props.position == 'right' && ''}`}
						style={{ top: top, left: left }}>
						{props.children}
					</div>
				</ClickOutsideListener>, document.body)}
			</>
		}
	</div>

}