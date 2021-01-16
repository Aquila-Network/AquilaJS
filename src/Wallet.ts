import * as fs from 'fs';
import * as crypto from 'crypto';
import * as bs58 from 'bs58';

export class Wallet {
    public constructor(private privateKeyPath: string) {}

    public signBsonData(bsonData: Buffer): string{
        const signer = crypto.createSign("RSA-sha384");
        const privateKeyBuffer = fs.readFileSync(this.privateKeyPath);
        signer.update(bsonData);
        const signedData = signer.sign(privateKeyBuffer);
        const encodedData = bs58.encode(signedData);
        return encodedData;
    }
}