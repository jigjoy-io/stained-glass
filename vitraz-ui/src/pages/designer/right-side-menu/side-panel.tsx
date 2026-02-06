import Text from "../../../components/text/text"

export default function SidePanel() {
	return (
		<div className="flex flex-col justify-center items-center gap-4 px-10">
			<h1 className="text-2xl font-bold">Dummy Page</h1>
			<Text position="center" text="This is a dummy page. It is used to show the right side menu." />
		</div>
	)
}
