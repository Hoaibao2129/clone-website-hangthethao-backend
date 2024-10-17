import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Readable } from 'stream';

@Injectable()
export class FirebaseService {
    constructor() {
        const serviceAccount = require('../config/serviceAccountKey.json');

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: 'manager-user.appspot.com',
        });
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const bucket = admin.storage().bucket();

        const fileUpload = bucket.file(file.originalname);
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

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.originalname}`;
        return publicUrl;
    }
}