import { createLazyFileRoute } from '@tanstack/react-router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPage } from '../api/page'
import Page from '../components/Page'
import { modeUpdated, pageUpdated, rootPageUpdated } from '../reducers/pageReducer'

export const Route = createLazyFileRoute('/$pageId')({
	component: PageOverview
})

function PageOverview() {
	const { pageId } = Route.useParams()
	const dispatch = useDispatch()

	async function fetchData() {
		let page = await getPage(pageId)
		dispatch(rootPageUpdated(page))
		dispatch(pageUpdated(page))
	}

	useEffect(() => {
		dispatch(modeUpdated("visiting"))
		fetchData()
	}, [])

	return <Page />
}