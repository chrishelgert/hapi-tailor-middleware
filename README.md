# hapi-tailor-middleware

[![npm version](https://badge.fury.io/js/hapi-tailor-middleware.svg)](https://badge.fury.io/js/hapi-tailor-middleware)
[![Build Status](https://travis-ci.org/chrishelgert/hapi-tailor-middleware.svg?branch=master)](https://travis-ci.org/chrishelgert/hapi-tailor-middleware) [![Coverage Status](https://coveralls.io/repos/github/chrishelgert/hapi-tailor-middleware/badge.svg?branch=master)](https://coveralls.io/github/chrishelgert/hapi-tailor-middleware?branch=master)

hapi-tailor-middleware is a [tailor](https://github.com/zalando/tailor)-middleware for [hapi.js](https://github.com/hapijs/hapi).

## Installation

### npm

```bash
npm i hapi-tailor-middleware --save
```

### yarn

```bash
yarn add hapi-tailor-middleware
```

## Usage
```javascript
server.register([{
  register: require('hapi-tailor-middleware'),
  options: {
    templatesPath: 'templates',
  },
}], (err) => {
  if (err) {
    throw err;
  }

  // ...
});
```

## Options

* [tailor-documentation](https://github.com/zalando/tailor#options)

## Contributing
1. Fork it
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create new Pull Request

## License
Copyright (c) 2016-2017 Chris Helgert, Daniel Bayerlein. See [License](./LICENSE) for details.
