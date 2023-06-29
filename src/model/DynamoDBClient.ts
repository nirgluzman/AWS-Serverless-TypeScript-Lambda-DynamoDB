// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const dynamoDBClient = (): DynamoDBClient => {
  if (process.env.IS_OFFLINE) {
    return new DynamoDBClient({
      region: 'localhost',
      endpoint: 'http://localhost:5000',
    });
  }
  return new DynamoDBClient({ region: 'us-east-1' });
};
