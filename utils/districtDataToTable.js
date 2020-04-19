const Table = require('cli-table3');
const colors = require('colors/safe');

module.exports = (districtWiseData) => {
    const table = new Table({
        head: [
            colors.white('District Name'),
            colors.red('Confirmed'),
        ],
    });
    districtWiseData.districtData.map((district) => {
        table.push([
            `${colors.underline(district.district)}`,
            `${district.confirmed}${getDistrictDeltaConfirmed()}`,
            
        ]);
    });

    console.log(table.toString());
    return true;
}

function getDistrictDeltaConfirmed(district) {
    if (district !== undefined && district.delta !== undefined && district.delta.confirmed !== undefined && district.delta.confirmed > 0)
        return `${colors.red('↑'+district.delta.confirmed)}`;
    else
        return '';
}