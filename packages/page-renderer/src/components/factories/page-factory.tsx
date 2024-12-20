import React, { ReactElement } from "react"
import Carousel from "../pages/carousel"
import Page from "../pages/page"

export class PageFactory extends React.Component {
	static createPage(pageConfig: any): ReactElement {
		switch (pageConfig.type) {
			case "blank":
				return <Page {...pageConfig} key={pageConfig.id} />
			case "carousel":
				return <Carousel {...pageConfig} key={pageConfig.id} />
			default:
				return <></>
		}
	}
}
