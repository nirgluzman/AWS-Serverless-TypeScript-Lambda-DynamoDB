// https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from '@service/DynamoDB';

export const getAllTodos = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log(event);

  try {
    const todos = await DynamoDB.getAll(process.env.TODO_TABLE);

    return formatJSONResponse(200, { todos });
  } catch (error) {
    console.error(error);
    return formatJSONResponse(500, { message: error.message });
  }
};

export const handler = middyfy(getAllTodos);
