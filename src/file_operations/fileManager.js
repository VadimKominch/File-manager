import fs from 'fs/promises'
import path from 'path'

async function cat(fileName) {
    const res = await fs.readFile(fileName)
    return res.toString()
}

async function add(fileName) {
    const res = await fs.writeFile(fileName,"",{flag:"wx"})
}

async function rn(pathFile,newFileName) {
    fs.rename(pathFile, path.resolve(pathFile.slice(0,pathFile.lastIndexOf(path.sep)),newFileName))
}

async function cp(source,dest) {
    await fs.copyFile(source,dest)
}

async function mv(source,dest) {
    await cp(source,path.resolve(dest,source.slice(source.lastIndexOf(path.sep))))
    await rm(source)
}

async function rm(source) {
    await fs.unlink(source)
}


export {
    cat,
    add,
    rn,
    cp,
    mv,
    rm
}