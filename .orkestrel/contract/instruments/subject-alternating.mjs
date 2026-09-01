// Referral probe: a `subject` accessor answering a string on its first read and
// a hostile non-string on the second. Does readValue publish a ContractError,
// or does the message template throw outside containment?
/* eslint-disable */
const lib = await import(process.argv[2])
const { readValue, ContractError } = lib
let reads = 0
const options = { get subject() { reads += 1; return reads === 1 ? 'thing' : { toString() { throw new Error('hostile toString') } } } }
try {
	readValue(() => { throw new Error('boom') }, 'door', options)
	console.log('returned (unexpected)')
} catch (error) {
	console.log(`threw ${error instanceof ContractError ? 'ContractError' : 'RAW ' + (error && error.constructor && error.constructor.name)}: ${error && error.message}; subject reads=${reads}`)
}
