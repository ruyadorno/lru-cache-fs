"use strict";

const path = require("path");
const fsm = require("fs-minipass");
const LRUCache = require("lru-cache");
const envPaths = require("env-paths");

const FILENAME = Symbol("filename");

class LRUCacheFS extends LRUCache {
	constructor(options) {
		super(options);

		if (!options.cacheName) {
			const err = new TypeError("cacheName is required");
			err.code = "ECACHENAME";
			throw err;
		}

		this[FILENAME] =
			(options.cwd && path.join(options.cwd, options.cacheName)) ||
			envPaths(options.cacheName, { suffix: "nodejs" }).cache;

		return new fsm.ReadStream(this[FILENAME]).collect().then(res => {
			const parseResult = () => {
				try {
					return JSON.parse(res.toString());
				} catch (e) {
					return [];
				}
			};
			this.load(parseResult());
			return this;
		});
	}

	set(key, value, maxAge) {
		super.set(key, value, maxAge);
		new fsm.WriteStreamSync(this[FILENAME]).end(JSON.stringify(this.dump()));
		return true;
	}
}

module.exports = LRUCacheFS;
