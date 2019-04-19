/**
 * Custom logger to have the ability to broadcast logs/errors to multiple places
 * in addition to console if need be.
 */
const Logger = {
  info(...args) {
    /* eslint-disable-next-line no-console */
    console.log(...args);
  },

  error(...args) {
    /* eslint-disable-next-line no-console */
    console.log(...args);

    // TODO: log error here to an error reporting service(Sentry etc.)
    // console.error(errorMessage);
  },
};

export default Logger;
