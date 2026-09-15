# P23 — the collision-key pin red by mutation, green after the restore

Orchestrator probe, 2026-09-15 17:42Z, on the 0.0.69 release tree after D4-9b, with no gate live.
Instrument: `P23b-run.sh.txt` with the node mutation `p23-mutate.mjs.txt`; log `P23b.log.txt`.
The first attempt (`P23-run.sh.txt`, a sed mutation) never matched — the Bash tool halves a
backslash, so the `\\n` in the pattern reached sed as a newline match — and both of its readings
were the unmutated file (33 passed); that attempt is not a red reading and its gates half ran on
the restored tree (`cmp` 0).

## Mutation

Line 1985 of `tests/setupPolicy.ts` (the collision dedupe key of `inspectPolicySurface`) with
`line` restored:

```text
before:  const key = `${declaration.path}\n${declaration.name}\n${owner}`
mutated: const key = `${declaration.path}\n${declaration.line}\n${declaration.name}\n${owner}`
```

## Readings

`npm run test:setup -- tests/setupPolicy.test.ts` on the mutated file:

```text
FAIL  |setup| tests/setupPolicy.test.ts > readPolicyDeclarations > reports an overloaded export's collision once
AssertionError: expected [ { rule: 'surface', …(3) }, …(2) ] to deeply equal [ { rule: 'surface', …(3) } ]
Test Files  1 failed (1)
      Tests  1 failed | 32 passed (33)
```

The file restored from the copy (`cmp` 0), the same command: `Tests 33 passed (33)`.

So the pin binds to the key: with `line` in the key the overloaded name reports three violations
and the pin refuses; with D4-9b's key it reports one at line 1. This is the Orchestrator's own
reading and replaces the builder's self-reported red-then-green as the evidence for claim 4 of
AD4-9b.
