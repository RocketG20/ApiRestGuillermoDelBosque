const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

try {
    let objetoYaml = fs.readFileSync(path.join(__dirname, 'objetoYaml.yaml'), 'utf8');
    let objetoJson = yaml.load(objetoYaml);

    console.log(objetoYaml);
    console.log(typeof objetoYaml);

    console.log(objetoJson);
    console.log(typeof objetoJson);
} catch (error) {
    console.error('Error:', error.message);
}