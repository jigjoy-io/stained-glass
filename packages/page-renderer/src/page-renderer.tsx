import React, { useEffect, useState } from "react"
import { PageFactory } from "./components/factories/page-factory"

function PageRenderer(props) {
	const [pageModel, setPageModel] = useState(props)

	useEffect(() => switchPage(props), [props])

	const switchPage = (pageModel) => {
		let model = JSON.parse(JSON.stringify(pageModel))
		model.switchPage = switchPage
		setPageModel(model)
	}

	return <>{pageModel && PageFactory.createPage(pageModel)}</>
}

export default PageRenderer
