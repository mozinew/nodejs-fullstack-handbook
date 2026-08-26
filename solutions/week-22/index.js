export function solve({state,action}) { if(action.type==='change')return {...state,[action.name]:action.value}; if(action.type==='reset')return {}; throw new TypeError('ACTION'); }
