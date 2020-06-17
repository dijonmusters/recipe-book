require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
});

const s3 = new AWS.S3();
const bucket = 'recipe-book-recipes';
const file = 'recipes.json';

const writeToS3 = (body) => {
  return new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: bucket,
        Body: JSON.stringify(body),
        Key: file,
      },
      (err, data) => {
        err && reject(err);
        console.log(`S3 successfully wrote ${file} to ${bucket}`);
        data && resolve(data);
      }
    );
  });
};

const readFromS3 = () => {
  return new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: bucket,
        Key: file,
      },
      (err, data) => {
        if (err) {
          err.code === 'NoSuchKey' ? resolve(null) : reject(err);
        }
        data && resolve(JSON.parse(data.Body));
      }
    );
  });
};

module.exports = {
  readFromS3,
  writeToS3,
};
