// src/services/s3Service.ts
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION,
});

const BUCKET_NAME = process.env.REACT_APP_AWS_BUCKET_NAME;
const FILE_KEY = 'watchlist.json';

export const getWatchlistFromS3 = async () => {
    try {
        const data = await s3
            .getObject({ Bucket: BUCKET_NAME, Key: FILE_KEY })
            .promise();
        return JSON.parse(data.Body.toString());
    } catch (error) {
        if (error.code === 'NoSuchKey') return [];
        console.error("Error fetching watchlist from S3:", error);
        throw error;
    }
};

export const saveWatchlistToS3 = async (watchlist) => {
    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: FILE_KEY,
            Body: JSON.stringify(watchlist),
            ContentType: 'application/json',
        };

        await s3.putObject(params).promise();
        console.log("Watchlist saved to S3");
    } catch (error) {
        console.error("Error saving watchlist to S3:", error);
    }
};