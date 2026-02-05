import { Children, cloneElement, useEffect, useState } from "react"

export default function Grid(props: any) {
	const [layout, setLayout] = useState(props.layout)

	useEffect(() => {
		if (props.numberOfCols == 1) {
			setLayout("grid-cols-1")
		} else if (props.numberOfCols == 2) {
			setLayout("grid-cols-2")
		}
	})

	return <div className={`grid ${layout} rounded-[5px] gap-1 w-max max-w-[100%]`}>{Children.map(props.children, (child: any) => cloneElement(child, { "data-border-on": false }))}</div>
}
