GitHub repo:
git@github.com:nirgluzman/AWS-Serverless-TypeScript-Lambda-DynamoDB.git

Source - Building a serverless app with TypeScript
https://blog.logrocket.com/building-serverless-app-typescript/
https://bahr.dev/2022/11/02/serverless-defaults/

Source - The Serverless Framework with AWS
https://www.youtube.com/@CompleteCoding  
https://www.youtube.com/watch?v=HhgXwKFUzT8 (create an API with TypeScript on AWS with Serverless Framework)

Serverless Offline
https://www.serverless.com/plugins/serverless-offline
https://github.com/99x/serverless-dynamodb-local/issues/294

$ sls dynamodb install
$ sls offline start

API Gateway - Model validation
https://towardsaws.com/validate-your-api-request-at-the-api-gateway-using-serverless-framework-31901fc4e67e

Step-1: TypeScript compiler
$ tsc ./src/functions/todo/eventBodySchema.ts

Step-2: build script to compile the JS file containing schema definitions into a JSON file
$ npm run build

Step-3: deployment to AWS
$ npx sls deploy --verbose

Cognito authorizer
https://www.freecodecamp.org/news/aws-cognito-authentication-with-serverless-and-nodejs/
https://stackoverflow.com/questions/56971070/how-to-configure-my-serverless-yml-to-use-my-api-gateway-authorizer

InitiateAuth API call with the AWS CLI to obtain tokens from a Cognito User Pool:
aws cognito-idp initiate-auth \
  --auth-flow USER_PASSWORD_AUTH \
  --client-id YOUR_CLIENT_ID \
  --auth-parameters USERNAME=YOUR_USERNAME,PASSWORD=YOUR_PASSWORD \
  --region YOUR_REGION