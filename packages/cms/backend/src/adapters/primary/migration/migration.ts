import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { errorHandler } from '@packages/apigw-error-handler'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client)
const tableName = process.env.PAGE_TABLE
import { v4 as uuid } from 'uuid'
import { createPageUseCase } from '@use-cases/create-page'
import { EnvironmentType } from '@models/types'
import { retrievePageUseCase } from '@use-cases/retrieve-page'

export async function migrateNewPagesHandler({
    body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {
        let pages = ["505a4c45-7e95-49fa-aabc-7dfaada8bf76"]

        const createNewBlock = (block: any) => {
            let b = JSON.parse(JSON.stringify(block))
            if (b.type == "carousel-tile" || b.type == "page-tile") {
                b.page = createNewPage(b.page)
            }

            return b
        }

        const createNewPage = (page: any) => {
            let p: any = {}
            p.id = uuid()
            p.type = page.type
            p.origin = page.origin ? page.origin : "username"
            p.environment = EnvironmentType.Development
            p.linkedPageId = null

            if (p.type == "blank") {

                let blocks = []
                if ("config" in page){
                    blocks = page.config.buildingBlocks.map(createNewBlock) 
                }else{
                    blocks = page.buildingBlocks.map(createNewBlock)
                }

                p.name = 'Blank Page'
                p.config = {
                    buildingBlocks: blocks
                }
            } else if (p.type == "carousel") {
                p.name = 'Carousel'


                let pages = []

                if ("config" in page){
                    pages = page.config.pages.map(createNewPage)
                }else{
                    pages = page.pages.map(createNewPage)
                }

                p.config = {
                    pages: pages
                }
            }


            return p

        }

        for (let i = 0; i < pages.length; i++) {
            let pageId = pages[i]


            let page: any = await retrievePageUseCase(pageId)

            page = createNewPage(page)

            console.log(page)

            await createPageUseCase(page)
        }


        return {
            statusCode: 201,
            body: JSON.stringify({}),
        }

    } catch (error) {
        return errorHandler(error)
    }
}