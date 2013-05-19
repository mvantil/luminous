var _ = require('underscore'),
    fs = require('fs'),
    config = require('luminous-server-config');

function Luminous() {
    function loadConfig() {
        return JSON.parse(fs.readFileSync('./.luminousrc'));
    }

    var me = this;
    loadedConfig = config.load();

    _.chain(loadedConfig.modules)
    .pairs()
    .map(function(pair) {
        return {
            fieldName: pair[0],
            className: pair[1]
        };
    })
    .each(function(module) {
        me[module.fieldName] = require(module.className);
    });
}

module.exports = Luminous;
