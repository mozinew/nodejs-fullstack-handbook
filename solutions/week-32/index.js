export function solve(c) { const required=['tests','auth','idempotency','observability','rollback']; const missing=required.filter(k=>c[k]!==true); return {ready:missing.length===0,missing}; }
