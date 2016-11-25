var merchData = require('./clothing_data.json');

exports.getAutocompleteData = function (item) {
    for (var i in merchData) {
        if (merchData[i]['name'] === item) {
            return merchData[i];
        }
    }
    return false;
};
