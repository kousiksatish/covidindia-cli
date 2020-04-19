const Table = require('cli-table3');
const colors = require('colors/safe');

module.exports = (districtWiseData) => {
    const table = new Table({
        head: [
            colors.bold(colors.white('District Name')),
            colors.red('Confirmed'),
        ],
    });
    // Sort district wise data by confirmed cases
    districtWiseData.districtData.sort((d2, d1) => {
        return d1.confirmed - d2.confirmed;
    })

    districtWiseData.districtData.map((district) => {
        table.push([
            `${colors.underline(district.district)}`,
            `${district.confirmed}${getDistrictDeltaConfirmed(district)}`,
            
        ]);
    });

    console.log(table.toString());
    return true;
}

function getDistrictDeltaConfirmed(district) {
    if (district !== undefined && district.delta !== undefined && district.delta.confirmed !== undefined && district.delta.confirmed > 0)
        return ` ${colors.red('↑'+district.delta.confirmed)}`;
    else
        return '';
}