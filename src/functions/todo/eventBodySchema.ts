import { JSONSchema } from 'json-schema-to-ts';

// define the schema for the event.body
const bodySchemaCreateTodo: JSONSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    status: { type: 'boolean' },
  },
  required: ['title', 'description'],
  additionalProperties: false,
} as const; // set the properties of the object to readonly.

const bodySchemaUpdateTodo: JSONSchema = {
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
};

export { bodySchemaCreateTodo, bodySchemaUpdateTodo };
