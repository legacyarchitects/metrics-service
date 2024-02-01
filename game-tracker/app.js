const AWS = require('aws-sdk');
require("dotenv").config();


exports.lambdaHandler = async (event) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  
  try {
      const dynamoDB = new AWS.DynamoDB.DocumentClient();
      let requestJSON = JSON.parse(event.body);
      await dynamoDB.put({
          TableName: "game_markers",
          Item: {
              id: requestJSON.id,
              game: "game",
              first_name: requestJSON.first_name,
              last_name: requestJSON.last_name,
              lawyer_name: requestJSON.lawyer_name,
              time_clicked: requestJSON.time_clicked,
          }
      }).promise();

      body = `Item with id ${requestJSON.id} added.`;
  } catch (err) {
      statusCode = 400;
      body = err.message;
  } finally {
      body = JSON.stringify(body);
  }

  return {
      statusCode,
      body,
      headers
  };
};
