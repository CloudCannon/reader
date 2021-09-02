#!/usr/bin/env node

import meow from 'meow';
import runner from './runner.js';

const cli = meow(`
	Usage
	  $ cloudcannon-reader [options]

	Options
	  --config, -c  Use a specific configuration file
	  --output, -o  Write to a different location than .

	Examples
	  $ cloudcannon-reader --config "cloudcannon.dev.config.json"
	  $ cloudcannon-reader --output "public"
`, {
	importMeta: import.meta,
	flags: {
		config: {
			type: 'string',
			alias: 'c'
		},
		output: {
			type: 'string',
			alias: 'o'
		}
	}
});

runner.run(cli.flags).then(() => console.log('Generated info.json successfully.'));
