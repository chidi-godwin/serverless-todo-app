import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'todos',
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
    iamRoleStatementsName: '${self:service}-createtodo-${self:provider.stage}',
    iamRoleStatements: [
        {
            Effect: 'Allow',
            Action: ['dynamodb:PutItem'],
            Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.TODO_TABLE}'
        }
    ]
}