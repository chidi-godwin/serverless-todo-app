import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'patch',
                path: 'todos/{todoId}',
                cors: true,
                authorizer: 'auth',
                request: {
                    schema: {
                        'application/json': schema
                    }
                }
            }
        }
    ],
    iamRoleStatementsName: '${self:service}-updatetodo-${self:provider.stage}',
    iamRoleStatements: [
        {
            Effect: 'Allow',
            Action: ['dynamodb:UpdateItem'],
            Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.TODO_TABLE}'
        }
    ]
}