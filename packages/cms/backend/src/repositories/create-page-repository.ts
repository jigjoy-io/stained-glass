import { createPage } from "@adapters/secondary/database-adapter"
import { Page } from "@domain/page/page"
import { PageProps } from "@models/types"

export async function createNewPage(
  page: Page
): Promise<Page> {
  // use the adapter to call the database
  const createdPage: PageProps = await createPage(
    page.toInputDto()
  )
  return Page.toDomain(createdPage)
}