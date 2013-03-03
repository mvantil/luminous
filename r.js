var fs = require('fs'),
    _ = require('underscore');

console.log('call with configure to update the package.json from the .luminousrc');

fs.readFile('.luminousrc', function(err, config) {
    fs.readFile('package.json', function(err, packageJson) {
        if (err) {
            console.log('no package.json.  Call npm init first.');
            return;
        }
        packageJson = JSON.parse(packageJson);

        config = JSON.parse(config);
        _.each(config.modules, function(module) {
            packageJson.dependencies[module] = '~0.0.0';
        });
        fs.writeFile('package.json', JSON.stringify(packageJson, null, 2), function(err) {
            console.log('Updated package');
        });
    });
});
