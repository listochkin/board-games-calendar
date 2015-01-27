Board games calendar
=================

[![Build Status](https://travis-ci.org/board-games-calendar/board-games-calendar.svg?branch=master)](https://travis-ci.org/board-games-calendar/board-games-calendar.svg?branch=master)

## Setup

- `npm install`

- Install MongoDB

- Launch MongoDb (for example ./mongod --dbpath ~/dev/board-games-mongo-data/)

- `npm start` to start dev and then go `http://localhost:3000/`

- `npm test` to run tests


##Frontend

- Angular.js
- SCSS, BEM


#### Guidelines

- Angularjs: https://github.com/johnpapa/angularjs-styleguide

- CSS/SCSS: http://www.mathayward.com/modular-css-with-sass-and-bem/



## Backend

- Node.js
- Express
- Mongodb + mongoose
- forever

#### Guidelines

- Node.js: https://github.com/alanjames1987/Node.js-Best-Practices


#### Mongo Shema Fixtures

Sometimes you need to update your mongo database localy to get some predefined data, or update Shema.

- `npm run fixtures`

