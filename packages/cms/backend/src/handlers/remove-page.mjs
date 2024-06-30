import Responses from '../utils/api-responses.mjs'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, DeleteItemCommand } from '@aws-sdk/lib-dynamodb'
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client)

const tableName = process.env.PAGE_TABLE

export const removePageHandler = async (event) => {

    if (event.httpMethod !== 'DELETE') {
        throw new Error(`deleteMethod only accepts DELETE method, you tried: ${event.httpMethod} method.`)
    }

    console.info('received:', event)

    const id = event.pathParameters.id
    
    var params = {
        TableName: tableName,
        Key: { id: id },
    }

    const data = await ddbDocClient.send(new DeleteItemCommand(params))
    var page = data.Item

    console.log("Success - page delete", page)

    const response = {
        statusCode: 200,
        body: pages
    }

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
    return Responses._200(response)
}
