import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Readable } from 'stream';
import { firebaseConfig } from 'config/firebaseConfig';

@Injectable()
export class FirebaseService {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(firebaseConfig),
            storageBucket: process.env.FIREBASE_BUCKET_NAME,
        });
    }



    async uploadFile(file: Express.Multer.File, id: number, folder: string): Promise<string> {
        const bucket = admin.storage().bucket();
        const fileName = `${folder}/${id}/${file.originalname}`;
        const fileUpload = bucket.file(fileName);
        const stream = Readable.from(file.buffer);

        await new Promise((resolve, reject) => {
            stream
                .pipe(fileUpload.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                    },
                }))
                .on('finish', resolve)
                .on('error', reject);
        });
        await fileUpload.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        return publicUrl;
    }

    async deleteFile(fileName: string): Promise<boolean> {
        const bucket = admin.storage().bucket();
        const file = bucket.file(fileName);
        await file.delete();
        return true;
    }
}