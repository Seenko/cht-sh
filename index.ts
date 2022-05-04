#!/usr/bin/env node
import type { OptionValues } from 'commander';
import { Command } from 'commander';

import { version } from './lib/version.js';
import { call } from './lib/call.js';

const program = new Command();

program
  .name('cht-sh')
  .description('A node based command line tool interface for cht.sh')
  .version(`v${version}`);

program
  .argument('<topic>', 'The topic or language to search for')
  .argument('[subtopic...]', 'The query to search for a the defined topic')
  .option('-q, --quiet', 'Quiet mode, don\'t show github/twitter buttons')
  .option('-T, --text', 'Text only, no ANSI sequences')
  .option('-s, --style <style>', 'Sets the color style')
  .option('-c, --comment-disabled', 'Do not comment text, do not shift code (QUERY+ only)')
  .option('-C, --comment-disabled-shift', 'Do not comment text, shift code (QUERY+ only)')
  .option('-Q, --code-only', 'Code only, don\'t show text (QUERY+ only)')
  .option('--debug', 'Prints a debug message in case of an error')
  .action(async (topic: string, subtopic: Array<string>, options: OptionValues) => {
    try {
      const response = await call(topic, subtopic.join(' '), options);
      console.log(response);
    } catch (error) {
      if (options.debug) {
        console.log(error);
      }
    }
  });

program
  .showSuggestionAfterError()
  .showHelpAfterError('(Add --help for additional information)')
  .parseAsync();