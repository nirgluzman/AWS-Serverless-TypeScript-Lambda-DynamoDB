// https://towardsaws.com/validate-your-api-request-at-the-api-gateway-using-serverless-framework-31901fc4e67e

import { handlerPath } from '@libs/handler-resolver';

export const getAllTodos = {
  handler: `${handlerPath(__dirname)}/getAllTodos.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: '/todo',
        cors: true,
      },
    },
  ],
};

export const getTodo = {
  handler: `${handlerPath(__dirname)}/getTodo.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: '/todo/{id}',
        cors: true,
      },
    },
  ],
};

export const createTodo = {
  handler: `${handlerPath(__dirname)}/createTodo.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: '/todo',
        cors: true,
        request: {
          schemas: {
            'application/json': '${file(./apiSchema.json):SchemaCreateTodo}',
          },
        },
      },
    },
  ],
};

export const updateTodo = {
  handler: `${handlerPath(__dirname)}/updateTodo.handler`,
  events: [
    {
      http: {
        method: 'patch',
        path: '/todo/{id}',
        cors: true,
        request: {
          schemas: {
            'application/json': '${file(./apiSchema.json):SchemaUpdateTodo}',
          },
        },
      },
    },
  ],
};

export const deleteTodo = {
  handler: `${handlerPath(__dirname)}/deleteTodo.handler`,
  events: [
    {
      http: {
        method: 'delete',
        path: '/todo/{id}',
        cors: true,
      },
    },
  ],
};
