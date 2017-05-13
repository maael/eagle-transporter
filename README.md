# Slack Announcer


[![Build Status](https://img.shields.io/travis/maael/freshslack.svg?style=flat-square)](https://travis-ci.org/maael/freshslack)
[![Code Climate](https://img.shields.io/codeclimate/github/maael/freshslack.svg?style=flat-square)](https://codeclimate.com/github/maael/freshslack)

## Setup
1. Clone the project with `git clone https://github.com/maael/freshslack.git`
2. Check node version is 6.0.0+. If not swap node version.
3. Check npm version is 2+. 3 can be a bit slow. (TODO: Yarn? npm 4+?)
4. `npm install`

You should now be able to run `npm start` and see the application at `http://localhost:4242/` in your browser.

## Included npm scripts
```
"scripts": {
  "build": "npm-run-all build:*",
  "build:js": "browserify app/main.js -t [ babelify --presets [es2015 react] ] -o public/js/bundle.js",
  "postinstall": "npm run build",
  "start": "node server.js",
  "test": "npm run test:client && npm run test:server",
  "test:client": "mocha test/client --recursive --compilers js:babel-register",
  "test:server": "mocha test/server --recursive --compilers js:babel-register",
  "watch": "npm-run-all --parallel watch:*",
  "watch:js": "watchify app/main.js -t [ babelify --presets [es2015 react] ] -v -o public/js/bundle.js"
}
```