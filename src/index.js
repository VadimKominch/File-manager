import process from 'process'
import os from 'os'
import path from 'path'

import * as osOperations from './system_info/os_command.js'
import { calculateHash } from './hash/hash.js'
import { compress, decompress } from './compress/compress.js'
import { list } from './navigation/navigation.js'

const osCommands = osOperations.osOperations

const username = process.argv.slice(2)[0].split("=")[1]
printCommandInfo(`Welcome to the File Manager, ${username}!\n`)

process.stdin.addListener("data",async (data)=>{
    handleInput(data.toString().replace("\r","").replace("\n","")) 
     
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
    printCommandInfo(`You are currently in ${currentDir}\n`) 
}

function printCommandInfo(info) {
    process.stdout.write(info)
}