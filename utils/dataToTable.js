const Table = require('cli-table3');
const colors = require('colors/safe');

module.exports = (stateWiseData, options) => {
    const table = new Table({
        head: [
            colors.cyan('Code'),
            colors.white('State Name'),
            colors.red('Confirmed'),
            colors.blue('Active'),
            colors.green('Recovered'),
            colors.gray('Deceased')
        ],
    });

    const totalRow = stateWiseData.slice(0, 1)[0];
    table.push([
        '',
        colors.bold(`${colors.underline(totalRow.state)}`),
        colors.bold(`${totalRow.confirmed} ${colors.red('↑'+totalRow.deltaconfirmed)}`,),
        colors.bold(`${totalRow.active}`),
        colors.bold(`${totalRow.recovered} ${colors.blue('↑'+totalRow.deltarecovered)}`),
        colors.bold(`${totalRow.deaths} ${colors.gray('↑'+totalRow.deltadeaths)}`)
    ])

    stateWiseData = stateWiseData.slice(1);
    if (options.stateName !== undefined) {
        const reqdStateData 
            = stateWiseData.find((stateData) => {
                return stateData.state === options.stateName;
            });
        if (reqdStateData !== undefined) {
            stateWiseData = [ reqdStateData ];
        } else {
            return false;
        }
    }

    if (options.sortBy !== undefined) {
        const sortByKey = options.sortBy.toLowerCase() === 'deceased' ? 'deaths' : options.sortBy.toLowerCase()
        stateWiseData.sort(getSortByComparatorFn(sortByKey));
    }
    if (options.head !== undefined) {
        stateWiseData = stateWiseData.slice(0, options.head);
    }
    if (options.tail !== undefined) {
        stateWiseData = stateWiseData.slice(-options.tail);
    }
    if (stateWiseData) 
    stateWiseData.map((state) => {
        table.push([
            `${colors.cyan(state.statecode)}`,
            `${colors.underline(state.state)}`,
            `${state.confirmed} ${state.deltaconfirmed > 0 ? colors.red('↑'+state.deltaconfirmed) : ''}`,
            `${state.active}`,
            `${state.recovered} ${state.deltarecovered > 0 ? colors.blue('↑'+state.deltarecovered) : ''}`,
            `${state.deaths} ${state.deltadeaths > 0 ? colors.gray('↑'+state.deltadeaths) : ''}`
        ]);
    });

    console.log(table.toString());
    return true;
}

function getSortByComparatorFn(key) {
    return (a, b) => {
        return parseInt(b[key]) - parseInt(a[key]);
    }
}