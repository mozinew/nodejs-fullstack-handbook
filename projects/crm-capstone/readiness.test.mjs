import test from 'node:test';
import assert from 'node:assert/strict';
import { assess } from './readiness.mjs';

test('blocks release when recovery is missing', () => {
  const result = assess({ tests:true, auth:true, idempotency:true, outbox:true, observability:true, migration:true, rollback:false });
  assert.deepEqual(result, { ready:false, missing:['rollback'] });
});
