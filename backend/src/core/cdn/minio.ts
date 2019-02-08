import { Client } from 'minio';
import Minio from 'minio';
import { ErrorCode } from '../../types/error';
import { PrepaidListError } from '../../errors';
import { I18n } from '../../misc';

interface Image {
    filetype: string;
    filename: string;
    name: string;
    image: Buffer;
}

export namespace MinioClient {
    let client: Client;

    export const init = async(): Promise<void> => {
        client = new Client({
            endPoint: process.env.MINIO_SERVER || 'localhost',
            port: Number(process.env.MINIO_PORT) || 9000,
            useSSL: JSON.parse(process.env.MINIO_SSL || 'false'),
            accessKey: process.env.MINIO_ACCESS_KEY || '',
            secretKey: process.env.MINIO_SECRET_KEY || ''
        });

        try {
            const result = await client.listBuckets();
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    };

    const checkIconBucket = async (): Promise<void> => {
        try {
            const result = await client.listBuckets();
            const bucketExist = result.find((bucket) => bucket.name === 'icon');
            if (!bucketExist) {
                const bucket = await client.makeBucket('icon', 'eu-west-regensburg');
                return Promise.resolve();
            }
        } catch (e) {
            return Promise.reject(e);
        }
    };

    const base64ToImg = (img: string, filename: string): Image => {
        const reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
        const data = img.match(reg);
        if (!data) throw new PrepaidListError(I18n.ERR_ICON_NOT_VALID, ErrorCode.ICON_NOT_VALID);
        if (data.length !== 3) throw new PrepaidListError(I18n.ERR_ICON_NOT_VALID, ErrorCode.ICON_NOT_VALID);
        return {
            filename: filename,
            filetype: data[1],
            name: `${filename}.${data[1]}`,
            image: Buffer.from(data[2], 'base64')
        };
    };

    export const putIcon = async(icon: string, name: string): Promise<void> => {
        try {
            const iconBuffer = base64ToImg(icon, name);
            await checkIconBucket();
            const result = await client.putObject('icon', iconBuffer.name, iconBuffer.image);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    };

    export const getIconUrl = async(icon: string): Promise<string> => {
        try {
            const url = await client.presignedGetObject('icon', icon, 60 * 60);
            return Promise.resolve(url);
        } catch (e) {
            return Promise.reject(e);
        }
    };
}
