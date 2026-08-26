import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 19: 配置、metadata、文件与函数编排', async () => {
  const actual = await solve("=1+1");
  assert.deepEqual(actual, "'=1+1");
});
