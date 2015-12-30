var path = require('path');
var nconf = require('nconf');

module.exports = function(env){
	env = env || 'development';

	nconf.file('environment', path.join(__dirname, '/env/', env + '.json'));
	nconf.file('default', path.join(__dirname, '/env/development.json'));
}