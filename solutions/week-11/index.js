export function solve(status) { if(status>=200&&status<300)return 'success'; if(status>=400&&status<500)return 'client'; if(status>=500&&status<600)return 'server'; return 'other'; }
