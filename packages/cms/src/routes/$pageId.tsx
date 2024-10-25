import {
	createFileRoute,
	useSearch,
	useNavigate,
} from '@tanstack/react-router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { accessPage } from '../api/page'
import Page from '../components/page'
import {
	modeUpdated,
	pageUpdated,
	rootPageUpdated,
} from '../reducers/page-reducer'
import Loader from '../components/loader/loader'
import { PageNotFound } from '../util/errors/page-not-found'
import LocalizedStrings from 'react-localization'
import { languageUpdated } from '../reducers/localization-reducer'
import { useLanguage } from '../util/store'

let localization = new LocalizedStrings({
	US: {
		loadingMessage: 'The page is loading',
		pageNotFoundMessage: 'Page not found or is not published yet.',
	},
	RS: {
		loadingMessage: 'Stranica se učitava',
		pageNotFoundMessage:
			'Stranica nije pronađena ili nije postavljena na produkciju.',
	},
})

function usePageLanguage() {
	const { langParam } = useSearch({
		from: '/$pageId',
		select: (search: any) => ({
			langParam: search.lang ? search.lang.toUpperCase() : null,
		}),
	})
	const defaultLang = useLanguage()
	const lang = langParam || defaultLang

	useEffect(() => {
		localization.setLanguage(lang)
	}, [lang])

	return lang
}

function ErrorBoundary() {
	const lang = usePageLanguage()
	return lang && <PageNotFound message={localization.pageNotFoundMessage} />
}

export const Route = createFileRoute('/$pageId' as never)({
	loader: async ({ params: { pageId } }) => {
		try {
			const response = await accessPage(pageId, localization.pageNotFoundMessage)
			if (response?.errorMessage) {
				throw new Error(response.errorMessage)
			}
			return response
		} catch (error) {
			throw error
		}
	},
	errorComponent: ErrorBoundary,
	pendingComponent: PendingComponent,
	component: PageDisplay,
})

function PendingComponent() {
	const lang = usePageLanguage()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(languageUpdated(lang))
	}, [lang, dispatch])

	return lang && <Loader message={localization.loadingMessage} />
}

function PageDisplay() {
	const page = Route.useLoaderData()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (page?.errorMessage === 'Something went wrong') {
			navigate({ to: '/$pageId', params: { pageId: 'not-found' } })
			return
		}

		dispatch(rootPageUpdated(page))
		dispatch(pageUpdated(page))
		dispatch(modeUpdated('visiting'))
	}, [page, dispatch])

	return <Page />
}