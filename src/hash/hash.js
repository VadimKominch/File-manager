import crypto from 'crypto'


export const calculateHash = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex')
};


