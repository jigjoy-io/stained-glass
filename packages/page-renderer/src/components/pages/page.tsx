import React from "react"
import PageContent from "../../page-content"

export default function Page(props) {
	return (
		<>
			{props.config && (
				<div className="flex grow h-[100%] min-h-[100%] w-[100%] justify-center">
					<div className="flex flex-col w-full items-center p-3">
						<div className="grow min-w-full md:min-w-[360px]">
							<PageContent config={props.config} key={props.id} id={props.id} />
						</div>
					</div>
				</div>
			)}
		</>
	)
}
