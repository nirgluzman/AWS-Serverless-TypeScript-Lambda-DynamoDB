import { JSONSchema } from 'json-schema-to-ts'; // https://github.com/ThomasAribart/json-schema-to-ts

// define the schema for the event.body
const bodySchemaCreateTodo = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
  },
  required: ['title', 'description'],
  additionalProperties: false,
} as const satisfies JSONSchema;

const bodySchemaUpdateTodo = {
  type: 'object',
  anyOf: [
    { required: ['title'] },
    { required: ['description'] },
    { required: ['status'] },
  ],
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    status: { type: 'boolean' },
  },
  additionalProperties: false,
} as const satisfies JSONSchema;

export { bodySchemaCreateTodo, bodySchemaUpdateTodo };
