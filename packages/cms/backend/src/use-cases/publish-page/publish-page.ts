
import { Page } from "@domain/page/page"
import { ReturnPageDto } from "@dto/page/page"
import { PageProps } from "@models/types"
import { retrievePage } from "@repositories/retrieve-page-repository"
import { updatePages } from "@repositories/update-pages-repository"

export async function publishPageUseCase(id: string): Promise<ReturnPageDto []> {

    // throws error if page not exists
    const retrievedPage: Page = await retrievePage(id)


    // update production config
    let pagesToPublish: Page [] = Page.publish(retrievedPage)


    const pages: Page [] = await updatePages(pagesToPublish)

    let result: ReturnPageDto[] = []
    pages.forEach(page => {
        let dto = page.toOutputDto()
        result.push(dto)
    })

    return result
}