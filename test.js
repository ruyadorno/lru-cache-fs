const { readFileSync } = require("fs");
const path = require("path");

const { test } = require("tap");
const requireInject = require("require-inject");

const Cache = require(".");

test("no cacheName provided", t => {
	t.throws(
		() => {
			new Cache({ max: 100 });
		},
		{ code: "ECACHENAME" },
		"should throw TypeError"
	);
	t.end();
});

test("retrieve missing cache", t => {
	const cwd = t.testdir({
		cache: ""
	});
	const cache = new Cache({
		max: 100,
		cacheName: "cache",
		cwd
	});
	t.deepEqual(
		cache.get("first-item"),
		undefined,
		"should retrieve no items from cache"
	);
	t.end();
});

test("cache file missing", t => {
	const cache = new Cache({
		max: 100,
		cacheName: "cache",
		cwd: __dirname
	});
	t.matchSnapshot(cache.dump(), "should have an empty cache");
	t.end();
});

test("retrieve existing cache", t => {
	const cwd = t.testdir({
		cache:
			'[{"k":"second-item","v":["foo","echo"],"e":0},{"k":"first-item","v":["foo","bar"],"e":0}]'
	});
	const cache = new Cache({
		max: 100,
		cacheName: "cache",
		cwd
	});
	t.deepEqual(
		cache.get("first-item"),
		["foo", "bar"],
		"should retrieve first item from cache"
	);
	t.deepEqual(
		cache.get("second-item"),
		["foo", "echo"],
		"should retrieve second item from cache"
	);
	t.end();
});

test("set to existing cache", t => {
	const cwd = t.testdir({
		cache:
			'[{"k":"second-item","v":["foo","echo"],"e":0},{"k":"first-item","v":["foo","bar"],"e":0}]'
	});
	const cache = new Cache({
		max: 100,
		cacheName: "cache",
		cwd
	});
	cache.set("third-item", { foo: "bar" });
	t.matchSnapshot(cache.dump(), "should add new item to existing cache");
	t.end();
});

test("set more than max", t => {
	const cwd = t.testdir({
		cache:
			'[{"k":"second-item","v":["foo","echo"],"e":0},{"k":"first-item","v":["foo","bar"],"e":0}]'
	});
	const cache = new Cache({
		max: 2,
		cacheName: "cache",
		cwd
	});
	cache.set("third-item", { foo: "bar" });
	t.matchSnapshot(
		cache.dump(),
		"should add new item while removing lru from existing cache"
	);
	t.end();
});

test("default cwd", t => {
	t.plan(2);
	const LRUCacheFS = requireInject("./", {
		"env-paths": (name, opts) => {
			t.equal(name, "foo", "should use cacheName");
			t.deepEqual(opts, { suffix: "nodejs" }, "should use sane suffix");
			return {
				cache: "/foo"
			};
		},
		fs: {
			readFileSync: () => []
		}
	});
	new LRUCacheFS({
		cacheName: "foo"
	});
});

test("write cache to fs on fsDump", t => {
	const cwd = t.testdir({
		cache:
			'[{"k":"second-item","v":["foo","echo"],"e":0},{"k":"first-item","v":["foo","bar"],"e":0}]'
	});
	const cache = new Cache({
		cacheName: "cache",
		cwd
	});
	cache.set("third-item", { foo: "bar" });

	// dump to fs
	cache.fsDump();

	// read cache file manually
	const cacheFile = readFileSync(path.join(cwd, "cache"), "utf8");

	t.matchSnapshot(
		JSON.parse(cacheFile.toString()),
		"should have cache data containing both old items and new one"
	);
	t.end();
});
