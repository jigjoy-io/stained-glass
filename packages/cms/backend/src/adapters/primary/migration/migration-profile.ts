import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { errorHandler } from '@packages/apigw-error-handler'

import { retrievePageUseCase } from '@use-cases/retrieve-page'
import { updatePageUseCase } from '@use-cases/update-page'
import { retrievePagesUseCase } from '@use-cases/retrieve-pages'

export async function migrateProfileHandler({
    body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {
        let pages: any [] = await retrievePagesUseCase('miodrag.todorovic@jigjoy.io')
        

        const createNewBlock = (block: any) => {
            let b = JSON.parse(JSON.stringify(block))
            if (b.type == "profile") {
                let fullName = b.headline.split(" ")
                b.firstName = fullName[0]
                b.lastName = fullName[1]

                delete b.headline
            }

            return b
        }

        const createNewPage = (page: any) => {
            let p: any =  JSON.parse(JSON.stringify(page))

            if (p.type == "blank") {
                p.config = {
                    buildingBlocks: page.config.buildingBlocks.map(createNewBlock)
                }
            }


            return p

        }

        for (let i = 0; i < pages.length; i++) {
            let page = pages[i]

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