import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { PageDto } from "@dto/page/page"
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client)
const tableName = process.env.PAGE_TABLE

/**
 * Creates a new page in the database with the provided data.
 * @param {PageDto} page - The page data to be stored in the database.
 * @returns {Promise<PageDto>} - A promise that resolves to the saved page data.
 */
export async function createPage(page: PageDto): Promise<PageDto> {

    const params = {
        TableName: tableName,
        Item: page
    }

    await ddbDocClient.send(new PutCommand(params))

    return page
}