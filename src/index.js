import process from 'process'

import * as osOperations from './system_info/os_command.js'

const osCommands = osOperations.osOperations

const username = process.argv.slice(2)[0].split("=")[1]
printCommandInfo(`Welcome to the File Manager, ${username}!\n`)

process.stdin.addListener("data",(data)=>{
    handleInput(data.toString().replace("\r","").replace("\n",""))    
})

process.on('SIGINT', function() {
    printCommandInfo(`Thank you for using File Manager,  ${username}!\n`)
    process.exit(0)
})

function handleInput(data) {
    const args = data.split(" ")
    if(args[0] == "os") {
        const result = osCommands[args[1].replace("--","")]
        console.log(result())
    }
    if(data === ".exit") {
        process.emit("SIGINT");
    }
}


function printCommandInfo(info) {
    process.stdout.write(info)
}