export function solve({roles,action}) { const grants={admin:['read','write'],sales:['read','write'],viewer:['read']}; return roles.some(r=>grants[r]?.includes(action)); }
