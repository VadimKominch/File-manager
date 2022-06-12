import fs from 'fs'

async function list(dir) {
    fs.readdir(dir,(err, files) => {
        if(err) throw new Error("FS operation failed")
        files.forEach(file => {
            console.log(file)
          })
    })
}

async function up(directory) {
    return path.join(currentDir, '..')
}

export {
    list,
    up
}