#!/usr/bin/env node
import fetch from 'node-fetch';

interface FlagDefinition {
  id: string;
  options: string[];
  args?: number;
  argsValues?: string[];
  query?: string;
  stopExecution?: boolean;
}

if (!process.argv.slice(2).length) process.exit(1);

const args = process.argv.slice(2);

const flagDefinitions: Array<FlagDefinition> = [];
const flags: Array<FlagDefinition> = [];

flagDefinitions.push(
  {
    id: 'help',
    options: ['--help', '-h'],
    stopExecution: true
  },
  {
    id: 'quiet',
    options: ['--quiet', '-q'],
    query: 'q'
  },
  {
    id: 'text-only',
    options: ['--text', '-T'],
    query: 'T'
  },
  {
    id: 'color-style',
    options: ['--style', '-s'],
    args: 1,
    query: 'style'
  },
  {
    id: 'no-comment',
    options: ['--no-comment', '-c'],
    query: 'c'
  },
  {
    id: 'no-comment-shift',
    options: ['--no-comment-shift', '-C'],
    query: 'C'
  },
  {
    id: 'quiet',
    options: ['--code-only', '-Q'],
    query: 'Q'
  }
);

flagDefinitions.forEach(flag => {
  args.forEach((arg, argIndex) => {
    if (arg.startsWith('--') || arg.startsWith('-')) {
      if (flag.options.includes(arg)) {
        if (flag.args) {
          flag.argsValues = [];
          for (let i = 0; i < flag.args; i++) {
            const currentArgIndex = argIndex + i + 1;
            flag.argsValues.push(args[currentArgIndex]);
            args.splice(currentArgIndex, 1);
          }
        }

        flags.push(flag);
        args.splice(argIndex, 1);
      }
    }
  });
});

flags.forEach(flag => {
  switch (flag.id) {
    case 'help':
      console.log(`
      Usage:
        $ cht.sh <language> <subtopic?>

        $ cht.sh <language> hello     hello world + how to start the program
        $ cht.sh <language> :learn    big cheat sheet for learning language from scratch
        $ cht.sh <language> :list     list of subtopics
        $ cht.sh <language> :random   fetches a random cheat sheet belonging to the topic

        $ cht.sh :list                list all cheat sheets
        $ cht.sh :post                how to post new cheat sheet
        $ cht.sh :styles              list of color styles
        $ cht.sh :styles-demo         show color styles usage examples
        $ cht.sh :random              fetches a random cheat sheet

      Options:
        --help, -h                    Shows this help message
        --quiet, -q                   Quiet mode, don't show github/twitter buttons
        --text, -T                    Text only, no ANSI sequences
        --style, -s <style>           Sets the color style
        --no-comment, -c              Do not comment text, do not shift code (QUERY+ only)
        --no-comment-shift, -C        Do not comment text, shift code (QUERY+ only)
        --code-only, -Q               Code only, don't show text (QUERY+ only)

      Examples:
        $ cht.sh javascript generate random number
        $ cht.sh golang generics
      `);
      break;
    case 'color-style':
  }

  if (flag.stopExecution) process.exit(0);
});

const topic = args[0];
const sub = [...args.slice(1)].join('+');

if (!topic) process.exit(1);

const query = sub ? `${topic}/${sub}` : topic;

let url = `https://cht.sh/${query}`;

const queriesWithValues = new URLSearchParams();
const queriesWithoutValues: Array<string> = [];

flags.forEach(flag => {
  if (flag.query) {
    if (flag.argsValues) {
      queriesWithValues.append(flag.query, flag.argsValues.join(','));
    } else {
      queriesWithoutValues.push(flag.query);
    }
  }
});

const queriesWithValuesString = queriesWithValues.toString();
const queriesWithoutValuesString = queriesWithoutValues.join('');

if (queriesWithValuesString || queriesWithoutValuesString) {
  url += '?';

  if (queriesWithValuesString && queriesWithoutValuesString) {
    url += `${queriesWithoutValuesString}&${queriesWithValuesString}`;
  } else if (queriesWithoutValuesString) {
    url += queriesWithoutValuesString;
  } else {
    url += queriesWithValuesString;
  }
}

try {
  const response = await fetch(url);
  const body = await response.text();
  console.log(body);
  console.log(url);
} catch {
  console.log('Could not talk to cheat.sh');
  process.exit(1);
}