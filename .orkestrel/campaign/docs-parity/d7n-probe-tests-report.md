# Report — `d7n-probe-tests` (probe: the suite's candidate drafts under the workspace's lint policy)

Owned file only: `tests/src/server/Probe.test.ts`. Sole writer in
`C:/Users/mikes/WebstormProjects/probe` from `135aab7`. No commit, no install, no discard-class git
command.

## The red reading

Reproduced first, against the file exactly as given (recovered through `git show HEAD:` for the
reading, never through a discard-class command):

```text
npm run test:src:server
 Test Files  1 failed | 7 passed (8)
      Tests  8 failed | 185 passed | 5 skipped (198)
exit=1
```

Failing lines, one per case:

```text
FAIL Probe.test.ts > mints receipts only when every stage executes cleanly …
  TypeError: .toMatch() expects to receive a string, but got undefined
  at :182 expect(minted.receipt).toMatch(/^probe:/)

FAIL Probe.test.ts > retains all stage checks when the runtime stage cannot write its specification
  expected [ { origin: 'claimant', … } ] to strictly equal []
  lint issue: "Move this module data to constants.ts or another data-kind file." at src/core/missing-runtime.ts

FAIL Probe.test.ts > expires only the active inspection, cleans its revision, and serves a queued claim
  expected outcomes[1].value to match { receipt: expect.any(String) }; case carried the same module-data lint issue

FAIL Probe.test.ts > replaces a type stage its deadline destroyed
  expected undefined to be type of 'string' at :768 expect(served.receipt).toBeTypeOf('string')

FAIL Probe.test.ts > binds the project into the token and holds the claim digest across projects
  expected [] to have a length of 7 but got +0 (honestToken empty because receipt undefined)

FAIL Probe.test.ts > names the caller-chosen project in the token the workspace project refuses
  expected undefined to be 'probe:2143ed8164c367366d1c8aad2ed3685…'

FAIL Probe.test.ts > separates two claims answered under one project
  expected [] to have a length of 7 but got +0

FAIL Probe.test.ts > mints one token for one claim in two separate processes
  expected undefined to be type of 'string'
```

Every failure traces to the same instrument reading (`tmp/d7n-probe-converge-fix/probe-issues.mjs`
output the deviation report carries): a candidate draft at a bare `src/core/<name>.ts` path with a
top-level `export const …` is module data outside a data-kind file, so the workspace's own lint
policy (`configs/policy.ts`'s `DATA_RULE`) refuses it and no receipt is minted.

## Per-draft, why each still measures its claim

A probe against the real policy (`tmp/d7n-probe-tests/zzdebug` run, since swept) showed the const
form was not the only refusal: a bare-path **function** export is refused too, by `FUNCTION_RULE` —
"Move this function to a function-kind file or a registered function-domain module." The policy
keys only on the file's basename (`configs/policy.ts:381` `pathToPolicyFile`), so nesting the
draft one directory deeper under a function-kind stem clears both rules without touching the value
each draft asserts.

Every clean/control pair that runs under the real workspace (`workspace: ROOT`) now takes the form
`export function value(): <type> {\n\treturn <literal>\n}\n` at a path ending `/helpers.ts`
(`helpers.ts` is in `FUNCTION_SOURCE_FILES` and in `DATA_EXEMPT_FILES`, so it is neutral to both
rules and needs no `create`-prefix naming `factories.ts` would impose). A broken/control draft
keeps a declared return type mismatched against its returned literal, which is the same
`Type 'string' is not assignable to type 'number'.` diagnostic the former `const V: number = 'bad'`
raised, so the control still breaks for the one reason its `reason:` field states and for no other
stage — the module-data lint issue the old broken draft also carried (visible in the debug capture)
is gone, which is what `computeReceipt`'s `stayed` condition needs to mint a receipt at all.

Renamed (real workspace, real policy — needed the path fix):
`probe-receipt`, `probe-receipt-foreign`, `probe-elapsed`, `toolchain`, `missing-runtime`,
`exit-code`, `after-expiry`, `after-type-expiry`, `probe-project-<id>`, `probe-forgery-<id>`
(its `bad` type-mismatch function replaces the old `export const BAD`), `probe-claims-<id>`,
`probe-portable-<id>`.

Converted in place, no path change needed (workspace is a `createScratch` tree with no
`.oxlintrc.json` of its own, so the custom policy plugin never runs there — confirmed because these
cases were not in the original failing set even with the bare `const` form):
`identical` (byte-apart case, unaffected by content since the whole test ends in an arming refusal
before any stage inspects the draft), `project-deadline`, `after-project-deadline`,
`project-serialization`, `stalled` (kept the `PROBE_SILENT` marker substring the stub lint server
reads), `served`, `rearmed`, `string-<id>`, `stage-failure` (fails at project resolution, before
any stage runs), `order-first`, `order-second`. Each still needed its literal text changed off
`export const VALUE` to clear the criterion, and each control still raises the exact issue its
`reason:` field names.

`FOREIGN`'s control (`mints receipts …`, the case not requiring it to fail cleanly for the
`unrelated` claim) took the same `helpers.ts` rename, because `stayed` in `computeReceipt` refuses
a receipt when the control fails at any extra stage — the old bare `export const FOREIGN` broke lint
in addition to type, which is why `unrelated.receipt` needed a defined value and got `undefined`
before the fix.

## Per criterion

**1.**

```text
git status --short
 M tests/src/server/Probe.test.ts
```

**2.**

```text
grep -c "export const VALUE" tests/src/server/Probe.test.ts
0
```

**3.**

```text
npx oxfmt --config .oxfmtrc.json --check tests/src/server/Probe.test.ts
All matched files use the correct format.

npx oxlint --config .oxlintrc.json --deny-warnings tests/src/server/Probe.test.ts
(exit 0, no output)

npm run check
exit=0
```

**4.**

```text
npm run test:src:server
 Test Files  8 passed (8)
      Tests  193 passed | 5 skipped (198)
exit=0

npm run test:guides
 Test Files  1 passed (1)
      Tests  56 passed (56)
exit=0
```

## Deviation

None outside scope. One correction to the ported brief's own framing: the refusal is not only
module data outside a data-kind file — a bare-path function export is refused by a sibling rule the
same way, so the fix is a path change (nesting under a function-kind stem) as well as a syntax
change. Both are inside the owned file and the brief's stated latitude ("Decide the drafts' exact
text yourself and record it").

## Instruments

Retained under `tmp/d7n-probe-tests/` in the `probe` checkout: `status.sh`, `run-red.sh`,
`wait-red.sh`, `run-check.sh`, `run-green.sh`, `wait-green.sh`, `wait-server.sh`, `wait-guides.sh`,
`run-single.sh`, `run-debug.sh`, `Probe.test.fixed.ts` (backup used to restore the fix after the
red capture), and the log files each script wrote.
