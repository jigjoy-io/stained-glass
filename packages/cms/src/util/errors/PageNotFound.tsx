import React from "react"
import { Logo } from "../../icons/Logo"
import Title from "../../components/title/Title"

export function PageNotFound(props) {
	return (
		<div className='flex flex-col h-[100dvh] pt-[10%] items-center gap-10'>
			<Logo />
			<Title position="center" text={props.message} />
		</div>
	)
}