// A2b dist surgery (probe only): like A2, but each of the four advertised
// context reads is OWN-ONLY (Object.hasOwn then read), so an absent field never
// walks to a polluted Object.prototype — the doctrine the spread projection
// exists for. readValue projects its options through four
// named reads into one flat record instead of two spread copies plus four
// conditional spreads; the context object is materialized only on refusal.
// The advertised reads (context.path/shape/limit/received, code, subject)
// still happen eagerly and still refuse on throw. Difference to record: a
// non-advertised own key of `context` with a throwing getter is no longer read.
// Run: node a2-patch.mjs <source-index.js> <target-index.js>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const [source, target] = [process.argv[2], process.argv[3]]
const text = readFileSync(source, 'utf8')
const start = text.indexOf('function readValue(callback, reader, options) {')
const end = text.indexOf('\n}\n', start) + 3
if (start < 0 || end < 3) { console.error('A2: anchor missing'); process.exit(1) }
const replacement = `function readValue(callback, reader, options) {
	const diagnostics = attempt(() => {
		const source = options?.context;
		const path = source !== void 0 && INTRINSICS.own(source, "path") ? source.path : void 0;
		const shape = source !== void 0 && INTRINSICS.own(source, "shape") ? source.shape : void 0;
		const limit = source !== void 0 && INTRINSICS.own(source, "limit") ? source.limit : void 0;
		const received = source !== void 0 && INTRINSICS.own(source, "received") ? source.received : void 0;
		const requested = options?.code;
		const code = requested === "bound" || requested === "range" || requested === "empty" || requested === "placement" || requested === "structure" || requested === "literal" || requested === "cycle" || requested === "pattern" || requested === "generate" || requested === "random" || requested === "clone" || requested === "depth" ? requested : "structure";
		return {
			reader: isString(reader) ? reader : "readValue",
			subject: isString(options?.subject) ? options.subject : "value",
			code,
			contextual: source !== void 0,
			path,
			shape,
			limit,
			received
		};
	});
	if (!diagnostics.success) throw new ContractError("readValue: options could not be read", {
		code: "structure",
		cause: diagnostics.error
	});
	const outcome = attempt(callback);
	if (!outcome.success) {
		const read = diagnostics.value;
		const context = read.contextual ? {
			...read.path === void 0 ? {} : { path: read.path },
			...read.shape === void 0 ? {} : { shape: read.shape },
			...read.limit === void 0 ? {} : { limit: read.limit },
			...read.received === void 0 ? {} : { received: read.received }
		} : void 0;
		throw new ContractError(\`\${read.reader}: \${read.subject} could not be read\`, {
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
console.log("A2 patched -> " + target)
