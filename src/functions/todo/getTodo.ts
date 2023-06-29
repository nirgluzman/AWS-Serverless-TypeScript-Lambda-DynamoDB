// https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { formatJSONResponse } from '@libs/api-gateway';

import { middyfy } from '@libs/lambda';

import { DynamoDB } from '../../service/DynamoDB';

const getTodo = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log(event);

  const { id } = event.pathParameters;
  try {
    const todo = await DynamoDB.get(process.env.TODO_TABLE, id);

    return formatJSONResponse(200, { todo });
  } catch (error) {
    console.error(error);
    return formatJSONResponse(500, { message: error.message });
  }
};

export const handler = middyfy(getTodo);
