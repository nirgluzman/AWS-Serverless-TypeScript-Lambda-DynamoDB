import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

// type signature for a Lambda handler function to enforce event.body with a specific schema as input
type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

// type signature for a Lambda handler function to enforce event.pathParameters not null as input
type ValidatedAPIGatewayProxyEventWithPathParameters = Omit<
  APIGatewayProxyEvent,
  'pathParameters'
> & {
  pathParameters: NonNullable<APIGatewayProxyEvent['pathParameters']>;
};

export type ValidatedEventAPIGatewayProxyEventWithPathParameters = Handler<
  ValidatedAPIGatewayProxyEventWithPathParameters,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (
  statusCode: number,
  response: Record<string, unknown>
) => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};
