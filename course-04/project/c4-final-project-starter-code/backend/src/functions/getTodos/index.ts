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

            }
        }
    ],
    iamRoleStatementsName: '${self:service}-gettodo-${self:provider.stage}',
    iamRoleStatements: [
        {
            Effect: 'Allow',
            Action: ['dynamodb:Query'],
            Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.TODO_TABLE}'
        }
    ]
}