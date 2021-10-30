import { handlerPath } from "@libs/handlerResolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'todos/{todoId}',
                cors: true,
                authorizer: 'auth',
            }
        }
    ],
    iamRoleStatementsName: '${self:service}-deletetodo-${self:provider.stage}',
    iamRoleStatements: [
        {
            Effect: 'Allow',
            Action: ['dynamodb:DeleteItem'],
            Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.TODO_TABLE}'
        }
    ]
}