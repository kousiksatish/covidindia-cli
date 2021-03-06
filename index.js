#!/usr/bin/env node

const yargs = require('yargs');
const axios = require('axios');
const dataToTable = require('./utils/dataToTable.js')
const districtDataToTable = require('./utils/districtDataToTable.js')

const parsedYargs = yargs
    .command('$0', 'All states information')
    .command('[State Code/Name]', 'Specific state info', (yargs) => {
        yargs.positional('state', {
            type: 'string',
            describe: 'Case insensitive state name or code for which info is needed'
        })
    })
    .option('district', {
        alias: 'd',
        desc: `Display of district level details (Use only in state mode)`,
        nargs: 0
    })
    .option('sort', {
        alias: 's',
        desc: `Sort by column`,
        nargs: 1,
        choices: ['confirmed', 'active', 'recovered', 'deceased'],
        default: 'active'
    })
    .options('head', {
        alias: 'h',
        desc: 'Show only top <input> number of results',
        nargs: 1,
        type: 'number'
    })
    .options('tail', {
        alias: 't',
        desc: 'Show only last <input> number of results',
        nargs: 1,
        type: 'number',
    })
    .help()
    .argv

const inputCommands = parsedYargs._;

if (inputCommands.length < 1) {
    getAllStates();
} else if (inputCommands.length < 2) {
    getSpecificState(inputCommands[0]);
}

function getAllStates() {
    axios.get(`https://api.covid19india.org/data.json`)
        .then((response) => {
            if (!(response && response.data && response.data.statewise)) {
                console.log(`Unidentified format. Please raise an issue.`);
                return;
            }
            const stateWiseData = response.data.statewise;
            const options = getDefaultOptionsForStatesData();
            options.sortBy = parsedYargs["sort"];
            options.head = parsedYargs["head"];
            options.tail = parsedYargs["tail"];
            dataToTable(stateWiseData, options);
        })
        .catch((err) => {
            console.log(`Error occured while fetching data! ${err}`);
        });
}

function getSpecificState(stateNameOrCode) {
    console.log(`Fetching info for ${stateNameOrCode}...`);
    axios.get(`https://api.covid19india.org/data.json`)
        .then((response) => {
            if (!(response && response.data && response.data.statewise)) {
                console.log(`Unidentified format. Please raise an issue.`);
                return;
            }
            const stateWiseData = response.data.statewise;
            const reqdStateName = validateStateNameOrCodeAndGetStateName(stateWiseData, stateNameOrCode);
            if (reqdStateName !== undefined) {
                const options = getDefaultOptionsForStatesData();
                options.stateName = reqdStateName;
                dataToTable(stateWiseData, options);
                if (parsedYargs["district"]) {
                    fetchAndDisplayDistrictDetails(reqdStateName);
                } else {
                    console.log(`Run 'covidindia-cli ${stateNameOrCode} -d' for district level details`);
                }
            } else {
                console.log('Invalid state name or code! Please check the input!')
            }
        })
        .catch((err) => {
            console.log(`Error occured while fetching data! ${err}`);
        });
}

function validateStateNameOrCodeAndGetStateName(statewiseData, stateNameOrCode) {
    let reqdStateName = undefined;

    if (stateNameOrCode !== undefined) {
        const reqdStateData 
            = statewiseData.find((stateData) => {
                return stateNameOrCode.length === 2
                    ? stateData.statecode.toLowerCase() === stateNameOrCode.toLowerCase()
                    : stateData.state.toLowerCase() === stateNameOrCode.toLowerCase();
            });
        if (reqdStateData !== undefined) {
            reqdStateName = reqdStateData.state;
        }
    }

    return reqdStateName;
}

function fetchAndDisplayDistrictDetails(stateName) {
    console.log(`Fetching district level info for ${stateName}...`);
    axios.get('https://api.covid19india.org/v2/state_district_wise.json')
        .then((response) => {
            if (!(response && response.data && response.data.length > 0)) {
                console.log(`Unidentified format. Please raise an issue.`);
                return;
            }
            const reqdDistrictData = response.data.find((state) => {
                return state.state === stateName;
            })

            if (reqdDistrictData !== undefined) {
                districtDataToTable(reqdDistrictData);
            } else {
                console.log(`District information not found for requested state. Please raise an issue.`);
            }
        })
        .catch((err) => {
            console.log(`Error occured while fetching district level data! ${err}`);
        });
}

function getDefaultOptionsForStatesData() {
    return {
        stateName: undefined,
        sortBy: 'active',
        head: undefined,
        tail: undefined
    };
}
