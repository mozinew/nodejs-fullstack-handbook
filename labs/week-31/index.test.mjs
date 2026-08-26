import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 31: 可观测、安全、容器与交付', async () => {
  const actual = await solve({
  "user": "u1",
  "token": "abc",
  "nested": {
    "password": "p"
  }
});
  assert.deepEqual(actual, {
  "user": "u1",
  "token": "[REDACTED]",
  "nested": {
    "password": "[REDACTED]"
  }
});
});
