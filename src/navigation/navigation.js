import fs from 'fs'
import path from 'path'

async function list(dir) {
    fs.readdir(dir,(err, files) => {
        if(err) throw new Error("FS operation failed")
        files.forEach(file => {
            console.log(file)
          })
    })
}

async function up(directory) {
    return await path.join(directory, '..')
}

async function cd(newDest) {
    const res = await fs.promises.access(newDest,fs.constants.R_OK)
    return res
}

export {
    list,
    up,
    cd
}