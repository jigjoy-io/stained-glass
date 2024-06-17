import React, { useEffect, useState } from "react"

export default function Item(props: any) {

	const [selected, setSelected] = useState(props.selected)

	useEffect(() => {
		setSelected(props.selected)
	}, [props.selected])

	return (

		<>


			<div onClick={() => props.action(props)}
				className={`min-w-[225px] ${(selected != null && selected === props.id) ? "bg-primary-light" : "bg-[white]"} 
								border-2 border-[white] hover:bg-primary-light  
								${props.borderOn && "border border-light shadow-md"} 
								p-2 hover:border-primary rounded-lg cursor-pointer flex flex-col`}>

				<div className="flex flex-row">
					{props.icon && <div className="pr-2"><props.icon /></div>}
					{props.color && <div className={`border w-[25px] h-[25px] mr-4 rounded-lg ${props.color}`} />}
					<div>{props.text}</div>
				</div>
				<div>{props.children}</div>
			</div>

		</>





	)

}
