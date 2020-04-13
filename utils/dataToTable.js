const Table = require('cli-table3');
const colors = require('colors/safe');

module.exports = (stateWiseData) => {
    const table = new Table({
        head: [
            colors.white('State Name'),
            colors.red('Confirmed'),
            colors.blue('Active'),
            colors.green('Recovered'),
            colors.gray('Deceased')
        ],
        colWidths: ['400', '100', '100', '100', '100']
    });

    totalRow = stateWiseData.slice(0, 1)[0];
    table.push([
        colors.bold(`${colors.underline(totalRow.state)}`),
        colors.bold(`${totalRow.confirmed} ${colors.red('↑'+totalRow.deltaconfirmed)}`,),
        colors.bold(`${totalRow.active}`),
        colors.bold(`${totalRow.recovered} ${colors.blue('↑'+totalRow.deltarecovered)}`),
        colors.bold(`${totalRow.deaths} ${colors.gray('↑'+totalRow.deltadeaths)}`)
    ])

    stateWiseData = stateWiseData.slice(1);
    stateWiseData.map((state) => {
        table.push([
            `${colors.underline(state.state)}`,
            `${state.confirmed} ${colors.red('↑'+state.deltaconfirmed)}`,
            `${state.active}`,
            `${state.recovered} ${colors.blue('↑'+state.deltarecovered)}`,
            `${state.deaths} ${colors.gray('↑'+state.deltadeaths)}`
        ]);
    });

    console.log(table.toString());
}