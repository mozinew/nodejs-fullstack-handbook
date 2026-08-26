export function solve(command) { return [{op:'insertCustomer',id:command.id},{op:'insertOutbox',key:`customer:${command.id}:created`}]; }
