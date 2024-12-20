import React from "react"
import colorVariants from "../../../renderer/src/util/style-helper/color-variants"

export default function Tile(props: any) {
	return <div className={`${colorVariants[props.color]} rounded-[20px] shadow w-[100%] px-4 py-6 border border-light`}>{props.children}</div>
}
