const bunyan = require('bunyan');
const config = require('config');
const PrettyStream = require('bunyan-prettystream');

const defaultsConfig = {
	level: 'info',
};

config.util.extendDeep(defaultsConfig, config.log);
config.util.setModuleDefaults('log', defaultsConfig);

const { log: { level } } = config;

const streams = [];

if (process.env.NODE_ENV === 'production') {
	streams.push({ type: 'stream', stream: process.stdout, level });
} else {
	const prettyStdOut = new PrettyStream();
	prettyStdOut.pipe(process.stdout);
	streams.push({
		type: 'raw',
		stream: prettyStdOut,
	});
}

const options = {
	name: 'main',
	level,
	streams,
};

module.exports = bunyan.createLogger(options);
