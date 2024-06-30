import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { PageDto } from "@dto/page/page"
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client)
const tableName = process.env.PAGE_TABLE

export async function createPage(page: PageDto): Promise<PageDto> {

    const params = {
        TableName: tableName,
        Item: page
    }

    await ddbDocClient.send(new PutCommand(params))

    return page
}