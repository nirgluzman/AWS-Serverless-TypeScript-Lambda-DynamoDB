const fs = require('fs');
const {
  bodySchemaCreateTodo,
  bodySchemaUpdateTodo,
} = require('./src/functions/todo/eventBodySchema.js');

const schemas = {
  SchemaCreateTodo: bodySchemaCreateTodo,
  SchemaUpdateTodo: bodySchemaUpdateTodo,
};

fs.writeFileSync('./apiSchema.json', JSON.stringify(schemas, null, 2));
