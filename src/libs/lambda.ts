import { Handler } from 'aws-lambda';

import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import cors from '@middy/http-cors';

export const middyfy = (handler: Handler) => {
  return middy(handler).use(middyJsonBodyParser()).use(cors());
};
