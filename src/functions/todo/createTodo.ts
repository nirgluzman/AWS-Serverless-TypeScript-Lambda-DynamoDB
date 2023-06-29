// https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html
import { APIGatewayProxyResult } from 'aws-lambda';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

import { middyfy } from '@libs/lambda';

import { bodySchemaCreateTodo } from './eventBodySchema';

import { DynamoDB } from '../../service/DynamoDB';

const createTodo: ValidatedEventAPIGatewayProxyEvent<
  typeof bodySchemaCreateTodo
> = async (event): Promise<APIGatewayProxyResult> => {
  console.log(event);

  const { title, description } = event.body;
  try {
    const todo = await DynamoDB.create(process.env.TODO_TABLE, {
      title,
      description,
      status: false,
      createdAt: new Date().toISOString(),
    });

    return formatJSONResponse(200, { todo });
  } catch (error) {
    console.error(error);
    return formatJSONResponse(500, { message: error.message });
  }
};

export const handler = middyfy(createTodo);
