export function solve(v) { const s=String(v??''); return /^[=+\-@]/.test(s) ? `'${s}` : s; }
