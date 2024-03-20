

// import all of the other files in this directory that are .json and export them under the name of the file
const fs = require('fs');
const path = require('path');
const files = fs.readdirSync(__dirname);
const abis = {};

files.forEach(file => {
    if (path.extname(file) === '.json') {
        const fileName = path.basename(file, '.json');
        const filePath = path.join(__dirname, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        abis[fileName] = JSON.parse(fileContent);
    }
});

module.exports = abis;

