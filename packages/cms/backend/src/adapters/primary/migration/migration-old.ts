import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { errorHandler } from '@packages/apigw-error-handler'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client)
const tableName = process.env.PAGE_TABLE
import { v4 as uuid } from 'uuid'
import { createPageUseCase } from '@use-cases/create-page'

export async function migrateOldPagesHandler({
    body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {
        let pages = ["01858c7d-17dc-4c64-93e2-f2df71f365zz", "48d7d761-f58e-4425-ac77-26a20e7813a6", "e5edf9f1-fdd6-4c84-b219-aab74abdml00", "lazanja-9876-42bf-8aaf-60e3936fdecc",
            "hemijabm-83c9-45e4-bc78-eb9e6102home", "modernnomad-eb39-4850-a797-1f28b15fhome", "e5edf9f1-fdd6-4c84-b219-aab74abdjd00", "01858c7d-17dc-4c64-93e2-f2df71f3zzfp"
        ]

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

            if (p.type == "blank") {
                p.config = {
                    buildingBlocks: page.buildingBlocks.map(createNewBlock)
                }
            } else if (p.type == "carousel") {
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