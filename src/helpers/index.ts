import crypto from 'crypto';

const SERCET = 'Fung\'sNodeAPI';

export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: String, password: String) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SERCET).digest('hex');
}