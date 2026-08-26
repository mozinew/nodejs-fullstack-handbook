import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 26: DTO、Pipe、Guard、Interceptor 与错误', async () => {
  const actual = await solve({
  "roles": [
    "viewer"
  ],
  "action": "write"
});
  assert.deepEqual(actual, false);
});
