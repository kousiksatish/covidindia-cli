#!/usr/bin/env node

const yargs = require('yargs');
const axios = require('axios');
const dataToTable = require('./utils/dataToTable.js')

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
    axios.get(`https://api.covid19india.org/data.json`)
        .then((response) => {
            if (!(response && response.data && response.data.statewise)) {
                console.log(`Unidentified format. Please raise an issue.`);
                return;
            }
            const stateWiseData = response.data.statewise;
            dataToTable(stateWiseData);
        })
        .catch((err) => {
            console.log(`Error occured while fetching data! ${err}`);
        });
}

function getSpecificState(stateName) {
    console.log(`Fetching info for ${stateName}...`);
}
