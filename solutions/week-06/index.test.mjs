import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 06: 日期、JSON、正则与 CLI 阶段项目', async () => {
  const actual = await solve("2026-08-26");
  assert.deepEqual(actual, "2026-08-26T00:00:00.000Z");
});
