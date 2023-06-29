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
        // request: {
        //   schemas: {
        //     'application/json': {
        //       schema: {
        //         type: 'object',
        //         properties: {
        //           title: {
        //             type: 'string',
        //             minLength: 1,
        //             maxLength: 50,
        //             required: true,
        //             pattern: '^[a-zA-Z0-9 ]*$',
        //             errorMessage: 'Title must be alphanumeric',
        //           },
        //           description: {
        //             type: 'string',
        //             minLength: 1,
        //             maxLength: 50,
        //             required: true,
        //             pattern: '^[a-zA-Z0-9 ]*$',
        //             errorMessage: 'Description must be alphanumeric',
        //           },
        //         },
        //       },
        //     },
        //   },
        // },
        // response: {
        //   headers: {
        //     'Access-Control-Allow-Methods': '*',
        //     'Access-Control-Allow-Origin': '*',
        //   },
        // },
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
