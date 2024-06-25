import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";
import uniqid from 'uniqid';
 
export async function POST(req: NextRequest) {

    const data = await req.formData();
    const file = data.get('file') as File;
    //return Response.json(JSON.stringify(file.name));

    // add s3 client
    const s3Client = new S3Client({
        region: 'eu-west-2',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY as string,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
    })

    // blob data of our image file
    const chunks = [];

    // @ts-ignore
    for await (const chunk of file.stream()) {
        chunks.push(chunk);
    }
    
    // connect all the chuncks together
    const buffer = Buffer.concat(chunks);

    //generate a new name i.e. 345234523-adudev-Logo.png to avoid confilcts
    const newFilename = `${uniqid()}-${file.name}`;

    // get bucket name
    const bucketName = 'adudev-job-board-bucket'

    // run the send function
    await s3Client.send( new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        ACL: 'public-read',
        Body: buffer,
        ContentType: file.type,
    }))

    return Response.json({
        newFilename,
        url: `https://${bucketName}.s3.amazonaws.com/${newFilename}`,
    });

}