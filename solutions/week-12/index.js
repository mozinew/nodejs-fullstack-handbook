export function solve(v) { return !!v && typeof v==='object' && !Array.isArray(v) && typeof v.id==='string' && v.id.length>0 && typeof v.name==='string' && v.name.length>0; }
