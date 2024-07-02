import { createPage, retrievePage } from "@adapters/secondary/database-adapter"
import { Page } from "@domain/page/page"
import { PageProps } from "@models/types"

/**
 * Repository function that converts Page domain object to valid page object and passes it to databse adapter for creation.
 * @param {Page} page - The page object to be created in the database.
 * @returns {Promise<Page>} A promise that resolves to the created page object.
 */
export async function createNewPage(
	page: Page
): Promise<Page> {
	// use the adapter to call the database
	const createdPage: PageProps = await createPage(
		page.toInputDto()
	)
	return Page.toDomain(createdPage)
}

/**
 * Retrieves a page with the given pageId and returns a Promise that resolves to a Page object.
 * @param {string} pageId - The unique identifier of the page to retrieve.
 * @returns {Promise<Page>} A Promise that resolves to a Page object representing the retrieved page.
 */
export async function getPage(
	pageId: string
): Promise<Page> {

	const createdPage: PageProps = await retrievePage(
		pageId
	)
	return Page.toDomain(createdPage)
}