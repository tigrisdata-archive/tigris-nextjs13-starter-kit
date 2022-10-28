import chalk from 'chalk';

export const prefixes = {
  debug: chalk.green('debug') + ' -',
  info: chalk.cyan('info') + ' -',
  warn: chalk.yellow('warn') + ' -',
  error: chalk.red('error') + ' -',
  event: chalk.magenta('event') + ' -'
};

export function debug(...message: any[]) {
  console.log(prefixes.debug, ...message);
}

export function info(...message: any[]) {
  console.log(prefixes.info, ...message);
}

export function error(...message: any[]) {
  console.error(prefixes.error, ...message);
}

export function warn(...message: any[]) {
  console.warn(prefixes.warn, ...message);
}

export function event(...message: any[]) {
  console.log(prefixes.event, ...message);
}
