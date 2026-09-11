# Browser and Interpret native-preservation correction report

## Outcome

Corrected B-PRESERVATION in
`C:/Users/mikes/WebstormProjects/browser/tests/guides.test.ts` and I-PRESERVATION in
`C:/Users/mikes/WebstormProjects/interpret/tests/guides.test.ts`.

Each native `GuideCommand` entry keeps its package identity, modules, inventory patterns,
languages, guide spec, internal policy, host ports, and accepted report channels. Runtime Guide
leaves load inside the anonymous `execute` callback. Interpret's flagship fixtures, calls, inputs,
and expected results remain unchanged.

The correction removes the population-expanding assertions over `report.sections`,
`report.imports`, `report.links`, and `report.tests`. It retains `report.methods` and restores the
predecessor's direct traversal of existing method groups, mapped fence imports, relative links,
and test links through the installed Guide public leaves.

## Assertion mapping

- `report.input`, joined rows, and `GUIDE_SPEC` retain manifest validity, manifest non-vacuity, and
  own-guide selection.
- `report.examples.titles`, `report.pitch`, and the parsed manifest name retain titled-example and
  README pitch obligations.
- `report.fences`, `report.drift`, `report.examples.functions`, and
  `report.examples.methods` retain the accepted fence-language, equality, and example channels.
- `guide.surface`, `source.exports`, `source.surface`, `source.hidden`, `computeSymbolKey`, and
  `findMissingSymbols` retain documented-surface non-vacuity, direct-declaration coverage,
  barrel-only coverage, the internal allowlist, and hidden-declaration refusal.
- `guide.methods`, `source.methods`, and `findMissing` retain the predecessor's populated-group,
  interface-member, phantom-member, and implementing-class-extra assertions over each existing
  documented group. `report.methods` remains asserted for its accepted parity findings.
- `createSourceManager`, `extractFenceImports`, and `findMissing` retain validation of each mapped
  import encountered in an admitted example fence. An empty import population remains accepted.
- `guide.links`, `isExternalLink`, `resolveLink`, and `source.exists` retain validation of each
  relative link encountered. An empty link population remains accepted.
- `guide.tests`, `resolveLink`, and `source.exists` retain validation of each documented test link
  encountered. An empty test-link population remains accepted.

## Defect evidence

The installed Guide implementation adds population findings in
`node_modules/@orkestrel/guide/dist/src/core/index.js`: `#inspectSections` reports absent required
sections and method groups; `#inspectImports` reports an absent mapped self import;
`#inspectLinks` reports absent links and test links. The predecessor files at
`15aab0e14ffa3995bd3122b19e3d5041c6b1208a` and
`1b11d3e093ad41c65bd148e4f044af90f133ea2b` traverse existing populations and add no absence
finding for those populations.

No supplied instrument can produce the aggregate-population difference without changing an
off-limits guide or adding an unowned test. The exact settling command would be
`node --experimental-strip-types tests/guides.test.ts` after an authorized negative control removes
the relevant guide population. That negative control did not run. The retained source comparison
settles the bounded correction as the brief directs.

The exact native commands before the correction were green because each live guide has every
aggregate population:

```text
Browser: node --experimental-strip-types tests/guides.test.ts
EXIT 0
Test Files  1 passed (1)
Tests  19 passed (19)
Duration  1.58s
```

```text
Interpret: node --experimental-strip-types tests/guides.test.ts
EXIT 0
Test Files  1 passed (1)
Tests  41 passed (41)
Duration  913ms
```

The same native commands after the correction passed with the restored per-group registrations:

```text
Browser: node --experimental-strip-types tests/guides.test.ts
EXIT 0
Test Files  1 passed (1)
Tests  166 passed (166)
Duration  1.61s
```

```text
Interpret: node --experimental-strip-types tests/guides.test.ts
EXIT 0
Test Files  1 passed (1)
Tests  88 passed (88)
Duration  1.06s
```

## Scoped validation

```text
Browser: npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts
EXIT 0
All matched files use the correct format.
```

```text
Interpret: npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts
EXIT 0
All matched files use the correct format.
```

```text
Browser: npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
EXIT 0
```

```text
Interpret: npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
EXIT 0
```

```text
Browser: git diff --check -- tests/guides.test.ts
EXIT 0
```

```text
Interpret: git diff --check -- tests/guides.test.ts
EXIT 0
```

## Changed paths and diffstat

- `C:/Users/mikes/WebstormProjects/browser/tests/guides.test.ts`
- `C:/Users/mikes/WebstormProjects/interpret/tests/guides.test.ts`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-browser-interpret-native-preservation-fix-report.md`

```text
Browser tests/guides.test.ts | 378 +++++++++++++++++++++------------------------------
1 file changed, 158 insertions(+), 220 deletions(-)
```

```text
Interpret tests/guides.test.ts | 1387 ++++++++++++++++++++++++--------------------------
1 file changed, 667 insertions(+), 720 deletions(-)
```

## Scope

The Browser and Interpret checkouts also contain root-owned changes in `package.json`,
`tests/config.test.ts`, and `tests/setupPolicy.ts`. This unit did not alter those paths. It made no
source, guide, public API, manifest, configuration, setup-policy, lockfile, LSP, ref, credential,
or published-state change. It ran no install, build, full suite, commit, push, or publish command.
Shared-file patches: none.

This report records implementation evidence and does not claim acceptance.
