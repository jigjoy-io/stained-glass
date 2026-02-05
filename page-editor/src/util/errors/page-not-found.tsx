import Logo from "../../icons/logo"
import Title from "../../components/title/title"

export function PageNotFound(props: any) {
	return (
		<div className="flex flex-col h-[100dvh] pt-[10%] items-center gap-10">
			<Logo />
			<Title position="center" text={props.message} />
		</div>
	)
}
