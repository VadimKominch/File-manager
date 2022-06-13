import process from 'process'
import os from 'os'
import path from 'path'

import * as osOperations from './system_info/os_command.js'
import { calculateHash } from './hash/hash.js'
import { compress, decompress } from './compress/compress.js'
import { list, up, cd } from './navigation/navigation.js'
import { rm,cat,rn,cp,mv,add } from './file_operations/fileManager.js'

const osCommands = osOperations.osOperations

const username = process.argv.slice(2)[0].split("=")[1]
printCommandInfo(`Welcome to the File Manager, ${username}!\n`)

process.stdin.addListener("data",async (data)=>{
    try {
        await handleInput(data.toString().replace("\r","").replace("\n","")) 
    }catch(e) {
        printCommandInfo(`Operation failed`)
    }
    
    printCommandInfo(`You are currently in ${currentDir}\n`) 
})

process.on('SIGINT', function() {
    printCommandInfo(`Thank you for using File Manager,  ${username}!\n`)
    process.exit(0)
})


let compressresult;
let currentDir = os.homedir()


async function handleInput(data) {
    const args = data.split(" ")
    if(args[0] == "ls") {
        const res = await list(os.homedir())
        console.log(res)
    }
    if(args[0] == "up") {
        currentDir = await up(currentDir)
    }
    if(args[0] == "cd") {
        const res = await cd(args[1])
        if(res) currentDir = args[1]
    }

    if(args[0] == "cat"){
        const res = await cat(args[1])
        console.log(res) }
    if(args[0] == "add"){await add(path.join(currentDir, args[1]))}
    if(args[0] == "rn"){ await rn(args[1],args[2])}
    if(args[0] == "cp"){ await cp(args[1],args[2])}
    if(args[0] == "mv"){ await mv(args[1],args[2])}
    if(args[0] == "rm"){ await rm(args[1])}
    if(args[0] == "os") {
        const result = osCommands[args[1].replace("--","")] // add check for undefined
        console.log(result())
    }
    if(args[0] == "hash") {
        console.log(calculateHash("Hello")) // replace with 
    }
    if(args[0] == "compress") {
        compressresult = await compress("Hello")
        console.log(compressresult.toString())
    }
    if(args[0] == "decompress") {
        const res = await decompress(compressresult)
        console.log(res)
    }
    if(data === ".exit") {
        process.emit("SIGINT");
    }
    
}

function printCommandInfo(info) {
    process.stdout.write(info)
}