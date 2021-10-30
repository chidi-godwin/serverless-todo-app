import { handlerPath } from "@libs/handlerResolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'todos/{todoId}/attachment',
                cors: true,
                authorizer: 'auth',

            }
        }
    ],
    iamRoleStatementsName: '${self:service}-getuploadurl-${self:provider.stage}',
    iamRoleStatements: [
        {
            Effect: 'Allow',
            Action: ['s3:*'],
            Resource: 'arn:aws:s3:::${self:provider.environment.TODO_BUCKET}/*'
        }
    ]
}