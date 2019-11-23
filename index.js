"use strict";

const path = require("path");
const { readFileSync, writeFileSync } = require("fs");
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

		const loadCacheFile = () => {
			try {
				const file = readFileSync(this[FILENAME], 'utf8')
				return JSON.parse(file.toString());
			} catch (e) {
				return [];
			}
		};

		this.load(loadCacheFile());

		return this;
	}

	fsDump() {
		writeFileSync(this[FILENAME], JSON.stringify(this.dump(), null, 2));
	}
}

module.exports = LRUCacheFS;
