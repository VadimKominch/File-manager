import os from 'os'

export const osOperations = {
    'EOL':getEOL,
    'cpus':getCpus,
    'homedir':getHomeDir,
    'username':getUsername,
    'architecture':getArchitecture
}

function getEOL() {
    return os.EOL
}

function getCpus() {
    return os.cpus()
}

function getHomeDir() {
    return os.homedir()
}

function getUsername() {
    return os.userInfo().username
}

function getArchitecture() {
    return os.arch()
}



