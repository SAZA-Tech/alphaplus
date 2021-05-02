const aws = require("aws-sdk");
// Handle File uploads to AWS S3

module.exports.FileUploadControl = {
  uploads: () => [],
  singleUpload: async (parent, { file }) => {
    const { stream, filename, mimetype, encoding } = await file;

    return { filename, mimetype, encoding, url: "" };
  },
  signS3: async (parent, { filename, filetype }, context) => {
    const s3Bucket = process.env.S3_BUCKET;

    // AWS_ACCESS_KEY_ID
    // AWS_SECRET_ACCESS_KEY
    const region = "eu-central-1";
    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      signatureVersion: "v4",
      region: "eu-central-1",
    });

    const s3Params = {
      Bucket: s3Bucket,
      Key: filename,
      Expires: 3600,
      ContentType: filetype,
      ACL: "public-read",
    };

    const signedRequest = await s3.getSignedUrl("putObject", s3Params);
    const url = `https://${s3Bucket}.s3.${region}.amazonaws.com/${filename}`;

    return {
      signedRequest,
      url,
    };
  },
};
