var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/^\/base\/tests\/spec/.test(file)) {
      tests.push(file);
    }
  }
}

require.config({
  baseUrl: '/base/static',
  urlArgs: undefined,
  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});
