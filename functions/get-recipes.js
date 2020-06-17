const { readFromS3 } = require('../src/utils/s3');

exports.handler = async () => {
  const recipes = await readFromS3();

  return {
    statusCode: 200,
    body: JSON.stringify(recipes),
  };
};
