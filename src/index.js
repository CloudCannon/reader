#!/usr/bin/env node

import meow from 'meow';
import runner from './runner.js';
import { toggleLogging } from './util/logger.js';

const cli = meow(`
  Usage
    $ cloudcannon-reader [options]

  Options
    --version     Print the current version
    --config, -c  Use a specific configuration file
    --output, -o  Write to a different location than .
    --quiet, -q   Disable logging

  Environment
    CLOUDCANNON_CONFIG_PATH  Use a specific configuration file

  Examples
    $ cloudcannon-reader --config "cloudcannon.dev.config.json"
    $ cloudcannon-reader --output "public"
    $ CLOUDCANNON_CONFIG_PATH=src/cloudcannon.config.js cloudcannon-reader
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
		},
		quiet: {
			type: 'boolean',
			alias: 'q'
		}
	}
});

if (cli.flags.quiet) {
	toggleLogging(false);
}

runner.run(cli.flags, cli.pkg);
