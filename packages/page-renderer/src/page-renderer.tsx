import React from "react"
import { PageFactory } from "./components/factories/page-factory"

function PageRenderer(pageConfig) {
	return <>{PageFactory.createPage(pageConfig)}</>
}

export default PageRenderer
