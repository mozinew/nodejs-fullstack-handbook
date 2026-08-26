import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 11: HTTP、进程、Worker 与性能诊断', async () => {
  const actual = await solve(503);
  assert.deepEqual(actual, "server");
});
