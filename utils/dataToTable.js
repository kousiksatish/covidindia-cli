const Table = require('cli-table3');
const colors = require('colors/safe');

module.exports = (stateWiseData, stateName) => {
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
    if (stateName !== undefined) {
        const reqdStateData 
            = stateWiseData.find((stateData) => {
                return stateData.state === stateName;
            });
        if (reqdStateData !== undefined) {
            stateWiseData = [ reqdStateData ];
        } else {
            return false;
        }
    }
    if (stateWiseData) 
    stateWiseData.map((state) => {
        table.push([
            `${colors.cyan(state.statecode)}`,
            `${colors.underline(state.state)}`,
            `${state.confirmed} ${colors.red('↑'+state.deltaconfirmed)}`,
            `${state.active}`,
            `${state.recovered} ${colors.blue('↑'+state.deltarecovered)}`,
            `${state.deaths} ${colors.gray('↑'+state.deltadeaths)}`
        ]);
    });

    console.log(table.toString());
    return true;
}