import Responses from '../utils/api-responses.mjs'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client)

const tableName = process.env.PAGE_TABLE

export const getPageHandler = async (event) => {
	
    if (event.httpMethod !== 'GET') {
      throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`)
    }

    console.info('received:', event)

    const id = event.pathParameters.id

    var params = {
      TableName : tableName,
      Key: { id: id },
    }

    const data = await ddbDocClient.send(new GetCommand(params))
    let page = data.Item
  
    const response = {
      statusCode: 200,
      body: page
    }
  
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
    return Responses._200(response)
}
