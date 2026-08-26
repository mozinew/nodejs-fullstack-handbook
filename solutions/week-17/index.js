export function solve({fields,allowed}) { const set=new Set(allowed); if(fields.some(f=>!set.has(f))) throw new TypeError('FIELD_FORBIDDEN'); return [...new Set(fields)]; }
