const aws = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const cognitoProvider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
  const groupName = 'admin'; // Hardcode to admin group since this is the post-confirmation trigger

  const addUserParams = {
    GroupName: groupName,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };

  try {
    await cognitoProvider.adminAddUserToGroup(addUserParams).promise();
    callback(null, event);
  } catch (error) {
    console.error('Error adding user to admin group:', error);
    callback(error);
  }
};