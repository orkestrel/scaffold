# Browser native guides entry report

## Outcome

Implemented the bounded native guides entry in
`C:/Users/mikes/WebstormProjects/browser/tests/guides.test.ts` at baseline
`15aab0e14ffa3995bd3122b19e3d5041c6b1208a`.

The entry now constructs `GuideCommand` with Browser's retained module, language,
guide, and internal-declaration policy. It inventories `src/**/*.ts`,
`tests/**/*.ts`, `guides/*.md`, root Markdown, and `package.json` through
`readInventory`, and runs the guides project through `createVitest`.

Static imports are native-safe. Vitest, contract, test, and Guide core imports load
inside the anonymous `execute` callback. The package manifest is parsed and its
`name` is bound to `@orkestrel/browser` before the README pitch assertion.

## Assertion preservation

The native report now supplies manifest input findings, title-pair findings,
README pitch findings, fence-language findings, populated method-section findings,
behavioral-interface and implementing-class findings, summary and titled-example
drift, function examples, method examples, fence imports, relative links, and test
links.

Joined rows and direct Guide leaves preserve documented-surface non-vacuity,
direct-declaration export coverage, barrel-only exports, Browser's `INTERNAL`
allowlist and its stale-entry refusal, hidden-declaration refusal, and guide/barrel
bijection. The migration does not use `report.declarations` and adds no executed
Browser behavior case.

## Defect receipt

Before the change:

```text
node --experimental-strip-types tests/guides.test.ts
EXIT 1
Error: Vitest failed to find the current suite.
Tests: unavailable because collection did not start.
```

After the change, with the same command:

```text
node --experimental-strip-types tests/guides.test.ts
EXIT 0
Test Files  1 passed (1)
Tests  19 passed (19)
Duration  1.45s
```

## Scoped validation

```text
npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts
EXIT 0
All matched files use the correct format.
```

```text
npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
EXIT 0
```

```text
git diff --check
EXIT 0
```

```text
git status --short
 M tests/guides.test.ts
```

```text
git diff --stat
tests/guides.test.ts | 331 +++++++++++++++++----------------------------------
1 file changed, 110 insertions(+), 221 deletions(-)
```

## Scope and deviation

The Browser checkout has only the owned `tests/guides.test.ts` modification. No
manifest, lockfile, source, guide, vendored file, ref, or published state changed.
No install, build, full suite, generated-consumer timing test, commit, or push ran.
No deviation occurred. This report supplies implementation evidence and does not
claim acceptance.
