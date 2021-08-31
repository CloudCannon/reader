#!/usr/bin/env node

import runner from './runner.js';

runner.run().then(() => console.log('Generated info.json successfully.'));
