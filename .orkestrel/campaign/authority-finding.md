# Five selectors modelled the wrong authority

Measured 2026-08-23. This is the root the campaign spent five rounds approaching.

## The finding

The CommonJS probe asks whether a **typed** CommonJS consumer can take a subpath. TypeScript decides
that from the **declaration** the `types` condition resolves, not from the runtime target the
`default` condition resolves. Every selector so far has classified the runtime target.

Fixtures with proper `types` conditions, deliberately mismatched, driven through TypeScript 6.0.3
under `node16`:

```text
  package             types      runtime    .cts consumer under node16
  decl-cts-rt-mjs     .d.cts     .mjs       accepts
  decl-mts-rt-cjs     .d.mts     .cjs       TS1479
```

TypeScript accepts a CommonJS consumer of an **ESM** runtime target when the declaration is `.d.cts`,
and refuses a **CommonJS** runtime target when the declaration is `.d.mts`. The runtime target does
not enter its decision. The objective lane found this independently and the Orchestrator reproduced
it here.

## Why it took five rounds

The declaration and the runtime target almost always agree: a package publishing `index.d.cts`
publishes `index.cjs` beside it. Every shape anyone tried until this round had them matching, so
classifying either one gave the same answer. The five selectors differed in *how* they classified the
runtime target and each was broken by a shape where that classification was wrong — never by a shape
where the two authorities disagreed, because nobody built one.

The attempts, in order, all of the same kind:

| attempt | classified | broken by |
| ------- | ---------- | --------- |
| `entry.module === false` | the absence of an `import` condition | a dual subpath |
| something resolves under require conditions | any resolution | an ESM-only package |
| the walk traversed an explicit `require` key | the condition path | `module-sync` first; a `node` branch |
| target extension against the root `type` | the runtime target | extensionless; a nested scope |
| complete enumeration of Node's `require` formats | the runtime target, correctly | the authority itself |

The fifth attempt is a correct enumeration of the wrong question. That is why its completeness
evidence did not save it: the rule set is right and the subject is wrong.

## The correction

Compute the flag from the resolved declaration: a `.d.cts` declaration admits, a `.d.mts` declaration
refuses, and a `.d.ts` declaration takes its own nearest enclosing `package.json` scope. The runtime
target's format is a separate question that the runtime drive already answers by loading it, and an
invalid declaration-to-runtime pairing is a defect the compile probe and the drive expose between
them rather than something the selector should predict.

This also dissolves the ruling against observation. The objective lane showed the staging exists:
resolve and classify the declaration, compile the consumer, then run the drive. After compilation has
established eligibility, an initialization throw is a runtime defect rather than a format verdict —
which is exactly the conflation the earlier ruling feared, and it does not arise in that order.

## What else the round broke

- **The enumeration is incomplete on its own terms.** An unknown extension such as `.txt` loads
  through Node's CommonJS loader as JavaScript text, and Node performs syntax detection on an
  ambiguous `.js` file. Both fall outside the shipped rule set.
- **The AST instrument is evadable.** Keeping every required call and changing the values pushed onto
  the returned entry passes the census while breaking the behaviour. A call census is not a behaviour
  proof.
- **The guide states the runtime-target rule**, which is now false in the same way.
