import * as AWSXRAY from 'aws-xray-sdk'
import { DynamoDBClient, QueryCommand, QueryCommandInput } from '@aws-sdk/client-dynamodb'
import { TodoItem } from 'src/models/TodoItem'

const XDBClient = AWSXRAY.captureAWSv3Client(new DynamoDBClient({region: 'us-east-1'}))

export class TodoAccess {
    constructor (
        private readonly client: DynamoDBClient = XDBClient,
        private readonly todoTable = process.env.TODO_TABLE,
    ) {}

    async getAllTodo(userId: string): Promise<TodoItem[]> {
        console.log('Fetching all todos');

        const params: QueryCommandInput = {
            TableName: this.todoTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': {'S': userId} 
            },
            ScanIndexForward: false
        }

        const result = await this.client.send(new QueryCommand(params));
        const items = result.Items
        console.log(items)

        return items as TodoItem[]
    }
}
