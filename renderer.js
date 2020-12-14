var fs = require('fs');

function view(template, value, response) {

    var fileContents = fs.readFileSync('./views/' + template, { encoding: "UTF8" });

    fileContents = mergeValues(value, fileContents);

    response.write(fileContents);
}

function mergeValues(value, fileContents) {
    for (var key in value) {
        fileContents = fileContents.replace("{{" + key + "}}", value[key]);
    }

    return fileContents;
}

module.exports.view = view;