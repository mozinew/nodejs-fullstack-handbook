import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 32: 毕业项目：企业级 CRM 协同系统', async () => {
  const actual = await solve({
  "tests": true,
  "auth": true,
  "idempotency": true,
  "observability": true,
  "rollback": true
});
  assert.deepEqual(actual, {
  "ready": true,
  "missing": []
});
});
