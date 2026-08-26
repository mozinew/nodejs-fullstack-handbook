export function assess(checks) {
  const required = ['tests','auth','idempotency','outbox','observability','migration','rollback'];
  const missing = required.filter(item => checks[item] !== true);
  return { ready: missing.length === 0, missing };
}
