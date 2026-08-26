import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 22: React 组件、状态、表单与 Effect', async () => {
  const actual = await solve({
  "state": {
    "name": "A"
  },
  "action": {
    "type": "change",
    "name": "name",
    "value": "B"
  }
});
  assert.deepEqual(actual, {
  "name": "B"
});
});
