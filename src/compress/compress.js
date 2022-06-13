import { resolve } from 'path';
import zlib from 'zlib'
import util from 'util'

const brotliCompress = util.promisify(zlib.brotliCompress)
const brotliDecompress = util.promisify(zlib.brotliDecompress)

//read file to string and pass here
async function compress(input) {
    const res = await brotliCompress(input)
    return res
}

async function decompress(input) {
    const res = await brotliDecompress(input)
    return res
}

export {
    compress,
    decompress
}