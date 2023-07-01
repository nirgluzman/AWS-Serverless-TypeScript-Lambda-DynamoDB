"use strict";
exports.__esModule = true;
exports.bodySchemaUpdateTodo = exports.bodySchemaCreateTodo = void 0;
// define the schema for the event.body
var bodySchemaCreateTodo = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        description: { type: 'string' }
    },
    required: ['title', 'description'],
    additionalProperties: false
};
exports.bodySchemaCreateTodo = bodySchemaCreateTodo;
var bodySchemaUpdateTodo = {
    type: 'object',
    anyOf: [
        { required: ['title'] },
        { required: ['description'] },
        { required: ['status'] },
    ],
    properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'boolean' }
    },
    additionalProperties: false
};
exports.bodySchemaUpdateTodo = bodySchemaUpdateTodo;
