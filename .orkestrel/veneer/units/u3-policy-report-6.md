# Unit U3-policy — report 6 (builder, native Sonnet, 2026-09-20, 139 s)

## Diff summary

`tests/setupPolicy.ts`: `POLICY_INDEX_LINK` names two distinct capture groups, `angled` and
`bare`; the angle branch admits an optional `#fragment` before its closing `>` and keeps a space in
its class; the bare branch's class excludes a space; `readPolicyIndex` reads
`match.groups?.angled ?? match.groups?.bare`; the remarks state the two names and the composition.

`tests/policy.test.ts`: the form assertions read the group each form binds; a new case
`reads a fragment or a space only inside the angle-bracket form` (angled fragment accepted, spaced
bare rejected, spaced angled accepted capturing `my guide`); the tautological distinctness
assertion and the resolves-to-file assertion are removed from the accounting case.

## Pattern

```
/\]\((?:<(?<angled>[^/)\n<>"]+)\.md(?:#[^)\n<>"]*)?>|(?:\.\/)?(?<bare>[^/)\n<>"\s]+)\.md)(?:#[^)\n"]*)?(?:\s+(?:"[^"\n]*"|'[^'\n]*'|\([^()\n]*\)))?\)/u
```

Named groups ES2018; non-capturing groups, alternation, classes, quantifiers ES3; the `u` flag
ES2015; no lookbehind. The host runs Node 24, so the floor could not be run here; the proof is by
review of the constructs.

## Gates

`format:check`, `lint:check`, `check` exit 0; `test:policy` `117 passed`; `test:setup`
`164 passed | 3 skipped`; `test:guides` `23 passed`; `test:config` reported the expected inventory
staleness (the Orchestrator's rebuild restaged `host.json`; `test:config` then read
`173 passed | 1 skipped`).

Orchestrator's own reading of the pattern on the host: groups `angled`, `bare` (distinct); the
intended accepted and rejected sets held for every probe listed in `../u3-policy-audit-claims.md`.

## Deviations

None.
