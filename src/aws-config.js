import AWS from "aws-sdk";

AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:b297876b-aa27-413a-b00f-67d5904bfb9d',
  }),
});

export const initAWS = () =>
  new Promise((resolve, reject) => {
    AWS.config.credentials.get((err) => {
      if (err) {
        console.error('Error retrieving AWS credentials:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });

export const dynamodb = new AWS.DynamoDB.DocumentClient();