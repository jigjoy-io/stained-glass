import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { errorHandler } from '@packages/apigw-error-handler'

import { createPageUseCase } from '@use-cases/create-page'
import { retrievePageUseCase } from '@use-cases/retrieve-page'
import { updatePageUseCase } from '@use-cases/update-page'

export async function migrateProfileV2Handler({
    body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {
        let pages = ["92bf03be-00cb-4a1d-a0da-13ef9de2ae8d"]

        const createNewBlock = (block: any) => {
            let b = JSON.parse(JSON.stringify(block))
            if (b.type == "profile") {
                b.firstName = b.headline
                b.lastName = ""

                delete b.headline
            }

            return b
        }
        const createNewPage = (page: any) => {
            let p: any =  JSON.parse(JSON.stringify(page))
            delete p.root
            delete p.ident
            delete p.mode

            if (p.type == "blank") {
                p.config = {
                    buildingBlocks: page.config.buildingBlocks.map(createNewBlock)
                }
            }


            return p

        }

        for (let i = 0; i < pages.length; i++) {
            let pageId = pages[i]

            let page: any = await retrievePageUseCase(pageId)

            console.log(page)

            page = createNewPage(page)

            console.log(page)

            await updatePageUseCase(page)
        }


        return {
            statusCode: 201,
            body: JSON.stringify({}),
        }

    } catch (error) {
        return errorHandler(error)
    }
}