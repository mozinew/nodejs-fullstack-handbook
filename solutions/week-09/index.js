export function solve(name) { if(!/^[A-Za-z0-9_-]+$/.test(name)) throw new TypeError('INVALID_NAME'); return name; }
