import type { AWS } from '@serverless/typescript';

import {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from '@functions/todo';

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-todo',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline', // emulate AWS λ and API Gateway locally
    'serverless-dynamodb-local', // run DynamoDB locally
    'serverless-plugin-log-retention', // control the retention of function's cloudwatch logs
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    profile: 'serverlessUser',
    stage: 'dev',
    region: 'us-east-1',
    stackTags: {
      projectGroup: 'sls-tutorial',
      project: '${self:service}',
      stage: '${self:provider.stage}',
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      TODO_TABLE: 'TodosTable',
    },
    // give Lambda functions read & write permissions to DynamoDB resource table
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DescribeTable',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource: 'arn:aws:dynamodb:us-east-1:*:table/TodosTable',
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    logRetentionInDays: 7, // global value for all functions
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      migration: {
        dir: 'offline/migrations',
      },
      stages: 'dev',
    },
  },
  resources: {
    Resources: {
      ApiGatewayRestApi: {
        Type: 'AWS::ApiGateway::RestApi',
        Properties: {
          Name: '${self:service}-${self:provider.stage}',
        },
      },
      GatewayResponseResourceNotFound: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          RestApiId: {
            Ref: 'ApiGatewayRestApi',
          },
          ResponseType: 'BAD_REQUEST_BODY',
          StatusCode: '422',
          ResponseTemplates: {
            'application/json':
              '{"message": "$context.error.message", "error": "$context.error.validationErrorString"}',
          },
        },
      },
      TodosTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'TodosTable',
          AttributeDefinitions: [
            {
              AttributeName: 'todoId', // primary key
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'todoId',
              KeyType: 'HASH',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
