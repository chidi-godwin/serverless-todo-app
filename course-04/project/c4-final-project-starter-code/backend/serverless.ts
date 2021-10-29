import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'backend',
  frameworkVersion: '2',
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
  },
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      Auth_0_SECRET_ID: 'Auth0Secret-${self:provider.stage}',
      Auth_0_SECRET_FIELD: 'auth0Secret'
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['secretsmanager:GetSecretValue'],
        Resource: {"Ref": "Auth0Secret"}
      },
      {
        Effect: 'Allow',
        Action: ['kms:Decrypt'],
        Resource: {"Fn::GetAtt": ["KMSKey", "Arn"]}
      }
    ]
  },
  // import the function via paths
  functions: { hello },
  resources: {
    Resources: {
      GatewayResponseDefault4XX: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Headers": "'Content-Type,X-Amz-Date,Authorization'",
            "gatewayresponse.header.Access-Control-Allow-Methods": "'GET,OPTIONS,POST'"
          },
          ResponseType: 'DEFAULT_4XX',
          RestApiId: {
            Ref: "ApiGatewayRestApi"
          }
        }
      },
      KMSKey: {
        Type: 'AWS::KMS::Key',
        Properties: {
          Description: "KMS key to encrypt Auth0 secret",
          KeyPolicy: {
            Version: '2012-10-17',
            Id: 'key-default-1',
            Statement: [
              {
                Sid: 'Allow administration of the key',
                Effect: 'Allow',
                Principal: {
                  AWS: {
                    "Fn::Join": [
                      ':',
                      [
                        'arn:aws:iam:',
                        {Ref: "AWS::AccountId"},
                        'root'
                      ]
                    ]
                  }
                },
                Action: ['kms:*'],
                Resource: '*'
              }
            ]
          }
        }
      },
      KMSKeyAlias: {
        Type: 'AWS::KMS::Alias',
        Properties: {
          AliasName: 'alias/auth0Key-${self:provider.stage}',
          TargetKeyId: {"Ref": "KMSKey"}
        }
      },
      Auth0Secret: {
        Type: "AWS::SecretsManager::Secret",
        Properties: {
          Name: '${self:provider.environment.AUTH_0_SECRET_ID}',
          Description: 'Auth0 Secret',
          KmsKeyId: {"Ref": "KMSKey"}
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
