// https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html
import { APIGatewayProxyResult } from 'aws-lambda';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

import { middyfy } from '@libs/lambda';

import { bodySchemaUpdateTodo } from './eventBodySchema';

import { DynamoDB } from '../../service/DynamoDB';

const updateTodo: ValidatedEventAPIGatewayProxyEvent<
  typeof bodySchemaUpdateTodo
> = async (event): Promise<APIGatewayProxyResult> => {
  console.log(event);

  const { id } = event.pathParameters;
  try {
    const todo = await DynamoDB.update(process.env.TODO_TABLE, id, event.body);

    return formatJSONResponse(200, { todo });
  } catch (error) {
    console.error(error);
    return formatJSONResponse(500, { message: error.message });
  }
};

export const handler = middyfy(updateTodo);
