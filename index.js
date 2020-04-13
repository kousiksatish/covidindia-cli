#!/usr/bin/env node

const yargs = require('yargs');

const parsedYargs = yargs
    .command('$0', 'All states information')
    .command('[state]', 'Specific State Information', (yargs) => {
        yargs.positional('state', {
            type: 'string',
            describe: 'State for which info is needed'
        })
    })
    .help()
    .argv

const inputCommands = parsedYargs._;

if (inputCommands.length < 1) {
    getAllStates();
} else if (inputCommands.length < 2) {
    getSpecificState(inputCommands[1]);
}

function getAllStates() {
    console.log('Fetching all states info');
}

function getSpecificState(stateName) {
    console.log(`Fetching info for ${stateName}`)
}