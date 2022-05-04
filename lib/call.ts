import type { OptionValues } from 'commander';
import fetch from 'node-fetch';

export const call = async (topic: string, subtopic: string, options: OptionValues) => {
  let url = `https://cht.sh/${topic}`;

  // trim subtopic and replace all spaces with a +
  subtopic = subtopic.trim().replace(/\s+/g, '+');
  if (subtopic) url += `/${subtopic}`;

  let style = '';
  const optionLetters: Array<string> = [];

  Object.keys(options).forEach(key => {
    switch (key) {
      case 'quiet':
        if (options[key]) pushIfNotExists(optionLetters, 'q');
        break;
      
      case 'text':
        if (options[key]) pushIfNotExists(optionLetters, 'T');
        break;

      case 'commentDisabled':
        if (options[key]) pushIfNotExists(optionLetters, 'c');
        break;

      case 'commentDisabledShift':
        if (options[key]) pushIfNotExists(optionLetters, 'C');
        break;
      
      case 'codeOnly':
        if (options[key]) pushIfNotExists(optionLetters, 'Q');
        break;

      case 'style':
        style = options.style;
        break;
    }
  });

  const queryParams: Array<string> = [];

  if (optionLetters.length) queryParams.push(optionLetters.join(''));
  if (style) queryParams.push(`style=${style}`);

  const initialLength = queryParams.length;

  while (queryParams.length > 0) {
    url += (queryParams.length === initialLength) ? '?' : '&';
    url += queryParams.shift();
  }

  const response = await fetch(url);
  const body = await response.text();
  return body;
};

const pushIfNotExists = (array: Array<string>, value: string) => {
  if (!array.includes(value)) {
    array.push(value);
  }
};