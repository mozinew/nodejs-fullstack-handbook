import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 21: 浏览器、DOM、HTTP 与安全边界', async () => {
  const actual = await solve("<b>客户&商机</b>");
  assert.deepEqual(actual, "&lt;b&gt;客户&amp;商机&lt;/b&gt;");
});
