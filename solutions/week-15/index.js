export function solve(r) { if(!r||typeof r!=='object'||typeof r.success!=='boolean')return false; return r.success ? 'data' in r : typeof r.error==='string'; }
