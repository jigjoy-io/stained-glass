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

export async function migrateNewPagesHandler({
    body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {
        let pages = ["ivanauciteljica-17dc-4c64-93e2-f2dfhomehome"]

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
                p.name = 'Blank Page'
                p.config = {
                    buildingBlocks: page.buildingBlocks.map(createNewBlock)
                }
            }else if (p.type =="carousel"){
                p.name = 'Carousel'
                p.config = {
                    pages: page.pages.map(createNewPage)
                }
            }


            return p

        }

        for (let i = 0; i < pages.length; i++) {
            let pageId = pages[i]
            var params = {
                TableName: tableName,
                Key: { id: pageId },
            }

            let item: any = await ddbDocClient.send(new GetCommand(params))

            let page = item.Item

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