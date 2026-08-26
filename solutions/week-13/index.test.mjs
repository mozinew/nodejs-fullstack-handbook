import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 13: 泛型、高级类型与领域建模', async () => {
  const actual = await solve({
  "ok": false,
  "error": "TIMEOUT"
});
  assert.deepEqual(actual, "ERROR:TIMEOUT");
});
