# lru-cache-fs

[![NPM version](https://badge.fury.io/js/lru-cache-fs.svg)](https://npmjs.org/package/lru-cache-fs)
[![Build Status](https://travis-ci.org/ruyadorno/lru-cache-fs.svg?branch=master)](https://travis-ci.org/ruyadorno/lru-cache-fs)
[![MIT license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/ruyadorno/lru-cache-fs/master/LICENSE)

Extends [lru-cache](https://www.npmjs.com/package/lru-cache) to add file system support.

## Install

```
npm install lru-cache-fs
```

## Usage

Retrieve cache:

```js
const Cache = require('lru-cache-fs')

const cache = new Cache({
	max: 100,
	cacheName: "cache" // filename ref to be used
});
```

By default it will use os specific paths, using [env-paths](https://www.npmjs.com/package/env-paths).

Then retrieve/set items using:

```js
cache.get('some-item') // returns whatever was stored
cache.set('some-new-item', 'foo') // sets new item and stores cache sync to fs
```

The `fsDump()` method exposes an API that allows you to persist the current cache on your file system:

```js
cache.fsDump()
```

All other methods from [lru-cache](https://www.npmjs.com/package/lru-cache) should be available, e.g:

```js
cache.dump() // retrieves dump of current cache memory
```

## License

[MIT](LICENSE) © 2019 [Ruy Adorno](https://ruyadorno.com)

