
import { Page } from "@domain/page/page"
import { CreatePageDto, ReturnPageDto } from "@dto/page/page"
import { EnvironmentType } from "@models/types"
import { createNewPage } from "@repositories/create-page-repository"

export async function createNewPageUseCase(page: CreatePageDto): Promise<ReturnPageDto> {

    const newPage = Page.create(page)

    const createdPage: Page = await createNewPage(newPage)
    return createdPage.toOutputDto(EnvironmentType.Development)
}