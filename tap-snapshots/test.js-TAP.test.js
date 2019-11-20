/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test.js TAP cache file missing > should have an empty cache 1`] = `
Array []
`

exports[`test.js TAP write more than max > should add new item while removing lru from existing cache 1`] = `
Array [
  Object {
    "e": 0,
    "k": "third-item",
    "v": Object {
      "foo": "bar",
    },
  },
  Object {
    "e": 0,
    "k": "second-item",
    "v": Array [
      "foo",
      "echo",
    ],
  },
]
`

exports[`test.js TAP write to existing cache > should add new item to existing cache 1`] = `
Array [
  Object {
    "e": 0,
    "k": "third-item",
    "v": Object {
      "foo": "bar",
    },
  },
  Object {
    "e": 0,
    "k": "second-item",
    "v": Array [
      "foo",
      "echo",
    ],
  },
  Object {
    "e": 0,
    "k": "first-item",
    "v": Array [
      "foo",
      "bar",
    ],
  },
]
`
