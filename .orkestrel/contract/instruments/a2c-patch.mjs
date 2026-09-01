// A2c dist surgery (probe only): readValue keeps today's single own-only spread
// projection (so every own enumerable key of `context` is still copied inside
// the containment and a throwing getter on any of them still refuses), but
// materializes the conditional-spread context object and the ContractError
// only on the failure branch. Behaviour is identical by construction; only the
// success-path allocations change (one owned copy instead of an owned copy, a
// context copy of up to four spreads, and a diagnostics record).
// Run: node a2c-patch.mjs <source-index.js> <target-index.js>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
const [source, target] = [process.argv[2], process.argv[3]]
const text = readFileSync(source, 'utf8')
const start = text.indexOf('function readValue(callback, reader, options) {')
const end = text.indexOf('\n}\n', start) + 3
if (start < 0 || end < 3) { console.error('A2c: anchor missing'); process.exit(1) }
const replacement = `function readValue(callback, reader, options) {
	const diagnostics = attempt(() => {
		const source = options?.context;
		const owned = source === void 0 ? void 0 : {
			path: void 0,
			shape: void 0,
			limit: void 0,
			received: void 0,
			...source
		};
		const requested = options?.code;
		const code = requested === "bound" || requested === "range" || requested === "empty" || requested === "placement" || requested === "structure" || requested === "literal" || requested === "cycle" || requested === "pattern" || requested === "generate" || requested === "random" || requested === "clone" || requested === "depth" ? requested : "structure";
		return {
			reader: isString(reader) ? reader : "readValue",
			subject: isString(options?.subject) ? options.subject : "value",
			code,
			owned
		};
	});
	if (!diagnostics.success) throw new ContractError("readValue: options could not be read", {
		code: "structure",
		cause: diagnostics.error
	});
	const outcome = attempt(callback);
	if (!outcome.success) {
		const read = diagnostics.value;
		const owned = read.owned;
		const context = owned === void 0 ? void 0 : {
			...owned.path === void 0 ? {} : { path: owned.path },
			...owned.shape === void 0 ? {} : { shape: owned.shape },
			...owned.limit === void 0 ? {} : { limit: owned.limit },
			...owned.received === void 0 ? {} : { received: owned.received }
		};
		throw new ContractError(read.reader + ": " + read.subject + " could not be read", {
			code: read.code,
			...context === void 0 ? {} : { context },
			cause: outcome.error
		});
	}
	return outcome.value;
}
`
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text.slice(0, start) + replacement + text.slice(end))
console.log('A2c patched -> ' + target)
