# Probe P3 — A1 claim 6: contract validation accepts coercible input and forwards it raw (2026-09-15)

Instrument: `tool/tmp/probe-coercion.mjs` (retained below), run by the Orchestrator against the
built tool dist (U0 build of the U1b tree) and the installed `@orkestrel/contract` 0.0.17, with
the guide's own fence shape `objectShape({ amount: numberShape() })`.

Reading (verbatim, abridged to the three cases):

| input | `explain` faults | `is` | `parse` | `tool.execute` | handler received |
| ----- | ---------------- | ---- | ------- | -------------- | ---------------- |
| `{ amount: 3 }` | 0 | true | `{ amount: 3 }` | `3` | `3` (number) |
| `{ amount: '5' }` | 0 | false | `{ amount: 5 }` | `'5'` | `'5'` (string) |
| `{ amount: 'invalid' }` | 1 | false | — | throws `amount: type; expected number; received "invalid"` | not entered |

Control: the invalid input throws, so the instrument sees a refusal when one happens.

What this established: with `contract`, a numeric string passes validation (`explain` coerces),
the strict guard `is` would have refused it, `parse` would have normalized it, and the handler
receives the un-normalized string while the advertised `parameters` promise a number. The guide
states this ("It accepts coercible values ... and passes the original arguments unchanged.
Handlers still narrow the fields they consume."), so claim 6 as written is CONFIRMED.

Orchestrator's design reading, held for reconciliation with the reviewer and analyst lanes: the
landed pairing (lenient `explain`, raw forward) is the one combination under which a handler
cannot trust the schema it advertised. The coherent pairings are strict (`is`, refuse the string)
or lenient with normalization (`explain`, then forward `parse(args)`). `explain` and `parse` are
one contract by the installed declaration (`explain(v).length === 0` iff `parse(v) !== undefined`),
so validate-then-forward-`parse` keeps the acceptance and the error report consistent and gives
the handler an owned copy in the schema's types.

Instrument:

```js
const shape = objectShape({ amount: numberShape() })
const contract = createContract(shape)
const tool = createTool({ name: 'amount', contract: shape, execute: (args) => args.amount })
for (const input of [{ amount: 3 }, { amount: '5' }, { amount: 'invalid' }]) {
	// records contract.explain(input).length, contract.is(input), contract.parse(input),
	// and the value or the thrown message of tool.execute(input, { signal })
}
```
