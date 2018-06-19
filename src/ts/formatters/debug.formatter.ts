import Debug from 'debug';

const consoleDebug = Debug('rivets:formatters');

export const debug = (target) => {
  return consoleDebug(target);
};
