
import { Page } from "@domain/page/page"
import { ReturnPageDto } from "@dto/page/page"
import { retrievePage } from "@repositories/retrieve-page-repository"

/**
 * Retrieves a page by its ID and returns a DTO representation based on the environment type.
 * @param {string} pageId - The ID of the page to retrieve.
 * @returns {Promise<ReturnPageDto>} A promise that resolves to the DTO representation of the page.
 */
export async function retrievePageUseCase(pageId: string): Promise<ReturnPageDto> {

    const page: Page = await retrievePage(pageId)

    return page.toOutputDto()
}