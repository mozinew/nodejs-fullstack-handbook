export function solve({tenant,resource,version='v1'}) { for(const v of [tenant,resource,version])if(!v)throw new TypeError('KEY'); return `crm:${tenant}:${resource}:${version}`; }
