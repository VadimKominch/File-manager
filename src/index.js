import process from 'process'


const username = process.argv.slice(2)[0].split("=")[1]

process.stdout.write(`Welcome to the File Manager, ${username}!`)



process.stdout.write(`Thank you for using File Manager,  ${username}!`)