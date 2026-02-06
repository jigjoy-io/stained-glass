import { useDispatch } from "react-redux"
import { pageExpanded, pageUpdated } from "../../reducers/page-reducer"

export default function PageDisplay({ title = "Blank Page", page }: { title: string; page: any }) {
	const dispatch = useDispatch()

	const load = () => {
		dispatch(pageUpdated(page))
		dispatch(pageExpanded(page.id))
	}

	return (
		<div className="border border-default-light rounded-sm p-1 w-fit hover:cursor-pointer" onClick={load}>
			{title}
		</div>
	)
}
