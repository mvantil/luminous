var LuminousBase = require('luminous-base'),
    _ = require('underscore');

function resolveModule(config, targetObject) {
    var moduleName = data.modules.metadata;
    var newMetadataClass = require(data.modules.metadata);
    var oldMetadata = me.metadata;
    me.metadata = new newMetadataClass();
    oldMetadata.resolve(me.metadata);
}

function Luminous() {
    var me = this;
    this.metadata = new LuminousBase.Metadata();
    this.typeResource = new LuminousBase.TypeResource();
    this.template = new LuminousBase.Template();

    var config = new LuminousBase.Config();
    config.load(function(err, config) {
        if (err) throw err;

        _.chain(config.modules)
        .pairs()
        .map(function(pair) {
            return {
                fieldName: pair[0],
                className: pair[1]
            };
        })
        .each(function(module) {
            var newClass = require(module.className);
            var oldObject = me[module.fieldName];
            me[module.fieldName] = new newClass(me);
            oldObject.resolve(me[module.fieldName]);
        });
    });
}

module.exports = Luminous;
