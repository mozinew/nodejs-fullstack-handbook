import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 15: 测试、调试与契约验证', async () => {
  const actual = await solve({
  "success": false,
  "error": "INVALID"
});
  assert.deepEqual(actual, true);
});
