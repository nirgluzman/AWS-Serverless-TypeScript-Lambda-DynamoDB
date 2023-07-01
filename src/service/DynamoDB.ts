// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html

import { dynamoDBClient } from '@model/DynamoDBClient';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

const docClient = DynamoDBDocumentClient.from(dynamoDBClient());

import { v4 as uuid } from 'uuid';

import Todo from '../model/Todo';

export const DynamoDB = {
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/dynamodb/command/ScanCommand/
  async getAll(TableName: string): Promise<Todo[]> {
    const result = await docClient.send(new ScanCommand({ TableName }));
    if (result.Items.length === 0) {
      throw new Error(`No todos found in DB`);
    }
    return result.Items as Todo[]; // 'as' keyword for Type Assertion
  },

  async get(TableName: string, id: string): Promise<any> {
    const result = await docClient.send(
      new GetCommand({ TableName, Key: { todoId: id } })
    );
    if (!result.Item) {
      throw new Error(`No todo found with id ${id}`);
    }
    return result.Item as Todo;
  },

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/dynamodb/command/PutItemCommand/
  async create(TableName: string, todo: Partial<Todo>): Promise<Todo> {
    todo.todoId = uuid();
    await docClient.send(new PutCommand({ TableName, Item: todo }));
    return todo as Todo;
  },

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/dynamodb/command/UpdateItemCommand/
  async update(
    TableName: string, // name of the table containing the item to update
    id: string, // primary key of the item
    attributeValues: Partial<Todo>
  ): Promise<Todo> {
    const UpdateExpression = `SET ${Object.keys(attributeValues)
      .map((attribute) => `#${attribute} = :${attribute}`)
      .join(', ')}`;

    const ExpressionAttributeValues = Object.entries(attributeValues).reduce(
      (acc, [key, value]) => ({ ...acc, [`:${key}`]: value }), // callbackFn to execute for each element in the array
      {} //  initial value of the accumulator
    );

    const ExpressionAttributeNames = Object.keys(attributeValues).reduce(
      (acc, attribute) => ({ ...acc, [`#${attribute}`]: attribute }),
      {}
    );

    const result = await docClient.send(
      new UpdateCommand({
        TableName,
        Key: { todoId: id },
        ConditionExpression: 'attribute_exists (todoId)',
        UpdateExpression,
        ExpressionAttributeValues,
        ExpressionAttributeNames,
        ReturnValues: 'ALL_NEW',
      })
    );
    return result.Attributes as Todo;
  },

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/dynamodb/command/DeleteItemCommand/
  async delete(TableName: string, id: string): Promise<any> {
    const result = await docClient.send(
      new DeleteCommand({
        TableName,
        Key: { todoId: id },
        ReturnValues: 'ALL_OLD',
      })
    );
    if (!result.Attributes) {
      throw new Error(`No todo found with id ${id}`);
    }
    return result.Attributes as Todo;
  },
};
