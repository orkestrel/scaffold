Unit PD7 complete. All acceptance criteria closed. One scope note, no deviation.

## Per-item landings

**1. The unrelated-control receipt proof** — `/home/user/orkestrel/probe/tests/src/server/Probe.test.ts`

- `:155` — pin renamed to what it now proves: `'mints receipts only when every stage executes cleanly, including for a control that shares no path with its case, and returns admitted path issues'`.
- `:179-186` — the `foreign` candidate at `src/core/probe-receipt-foreign.ts` and the `foreignTest` at `tmp/probe/probe-foreign.test.ts`. Neither path appears in the case, whose candidate is `src/core/probe-receipt.ts` and whose test is `tmp/probe/probe-receipt.test.ts`.
- `:210-220` — the added `prove` call pairing the clean case with that control.
- `:250-252` — `expect(foreign.path).not.toBe(clean.path)`, `expect(foreignTest.path).not.toBe(test.path)`, `expect(unrelated.receipt).toMatch(/^probe:/)`. The path assertions pin the property the test's name claims, so the proof cannot drift into a related-control case silently.

Red-first, by de-issuing the control (`export const FOREIGN = 'ok'`), command `npx vitest run --project src:server tests/src/server/Probe.test.ts -t 'mints receipts'`:

```
TypeError: .toMatch() expects to receive a string, but got undefined
 ❯ tests/src/server/Probe.test.ts:252:31
  Tests  1 failed | 25 skipped (26)
```

Green after issuing it (`export const FOREIGN: number = 'bad'`), same command: `Tests  1 passed | 25 skipped (26)`. The existing cases of the pin (`minted`, `unbroken`, `unexecuted`, the `unmapped` rejection) stay green in the full-file run.

**2. No-follow boot mutations** — `src/server/helpers.ts`, `src/server/Probe.ts`, `tests/src/server/helpers.test.ts`, `guides/probe.md`

- `src/server/helpers.ts:164` — new exported helper:

```ts
export function overwriteFile(file: string, text: string): void {
	const descriptor = openSync(file, constants.O_WRONLY | constants.O_TRUNC | constants.O_NOFOLLOW)
	try {
		writeFileSync(descriptor, text, 'utf8')
	} finally {
		closeSync(descriptor)
	}
}
```

- `src/server/Probe.ts:314` and `:339` — both boot-dependency mutations now call it; the `wx` creates at `:288` and `:296` are unchanged.
- `tests/src/server/helpers.test.ts:374` — `'refuses to overwrite a final component swapped for a symbolic link'`; `:397` — `'overwrites a file the walk found and refuses one that has since gone'`; `:124-131` — the helper's `@example` run verbatim inside the existing example block.

Red-first, same test file and the same command in both runs, with the helper's body as the current mechanism (`writeFileSync(file, text, 'utf8')`), command `npx vitest run --project src:server tests/src/server/helpers.test.ts`:

```
 FAIL  ... > refuses to overwrite a final component swapped for a symbolic link
AssertionError: expected undefined to be defined
 FAIL  ... > overwrites a file the walk found and refuses one that has since gone
AssertionError: expected undefined to match object { code: 'ENOENT' }
  Tests  2 failed | 39 passed (41)
```

The swap was followed silently — no fault at all. A throwaway probe on this host (Linux, Node v22.22.2) confirmed where the bytes went: planting a symlink at the write path and calling `writeFileSync` with the default flag reported `{"escaped":true,"text":"export const VALUE = 2\n"}`, so the write landed at the link's destination. Green after the descriptor swap, same command: `Tests  41 passed (41)`.

I measured the no-follow refusal code directly rather than assuming it: `openSync` with `O_WRONLY | O_TRUNC | O_NOFOLLOW` on a symlink reported `ELOOP` on this host on 2026-08-24. The test asserts the fault's `path` rather than that code, because `vitest(no-conditional-expect)` rejects gating the code assertion on the host's constant and a bare `ELOOP` literal would describe this host only. The code is recorded with its host and date in the helper's `@remarks`.

**Containment passage, final claim** (`guides/probe.md:665-679`): the final component is closed by three mechanisms — `wx` on every create, `O_WRONLY | O_TRUNC | O_NOFOLLOW` on the boot-dependency overwrite, and an unlink naming the component itself. Two openings remain, both named exactly in the passage:

- a directory component swapped for a symbolic link after the walk, unchanged from before;
- a host whose Node build defines no `O_NOFOLLOW`, where that flag contributes nothing to the flag set and an overwrite follows a link the walk did not see.

I enumerated every filesystem mutation in `src/` to bound that claim: `git grep` over `writeFileSync|appendFileSync|mkdirSync|rmSync|rmdirSync|unlinkSync|openSync|createWriteStream|cpSync|renameSync` returns creates at `Probe.ts:288`, `Probe.ts:296`, and `RuntimeStage.ts:454` (all `wx`), removals at `Probe.ts:356`, `:360`, `:366` and `RuntimeStage.ts:225`, `:265`, `:740`, directory creates at `Probe.ts:226` and `RuntimeStage.ts:448`, and no remaining unguarded overwrite.

**3. The audit's prose prescriptions** — `guides/probe.md`

- `:672` (was ~673) — "Read the physical guarantee as covering" → "Read physical containment as covering"; the trailing clause became "plus the final component at the moment probe writes or unlinks it", because "created" no longer covers the overwrite.
- `:773` (was ~774) — "a workspace repaired between two calls serves the second one" → "a workspace repaired after the failed call serves the call that follows it".
- `:779` (was ~780) — "a resolve never runs between two of one inspection's own candidate checks" → "a resolve never runs partway through one inspection's own candidate checks".
- `:623` (was ~626) — "The one control `prove` refuses is the one repeating the whole case byte for byte" → "`prove` refuses only a control repeating the whole case byte for byte".

**4. The remark narrowing** — `src/server/stages/RuntimeStage.ts:90-95`. The broad pair is replaced by the narrowed claim: containment covers the claim inputs, the tree as the walk inspected it, and the final component at the moment the stage writes or unlinks it (`wx` create, link-naming unlink); a directory component swapped between the walk and the write stays open. `guarantee` is gone, per the audit's claim-4 ruling on that word.

**5. The record correction (claim 3)** — verified by my own run rather than restated from the audit. `git grep -n "unrelated" -- tests/` at baseline also matched `tests/setupPolicy.ts:184`, which reads "This exclusion also permits unrelated module data such as `export const RETRIES = 3`." It concerns the policy sweep's data-kind exemption and never reaches `prove`, so it is an irrelevant permitted match; the PD6 report's search inventory omitted it. The other matches PD6 named are now at `tests/src/server/helpers.test.ts:507` and `:634` and `tests/src/core/helpers.test.ts:402`, shifted by this unit's insertions.

## Scope note

Adding an exported helper to `src/server/helpers.ts` makes it a public export through `src/server/index.ts`, and `tests/guides.test.ts` requires every public export to carry a `## Surface` row. I added that row at `guides/probe.md:176`. The brief scopes `guides/probe.md` to "the named passages only"; this row is the mechanical parity consequence of the helper the brief itself mandated, and acceptance criterion 3 cannot close without it. I treated it as an ancillary conflict, decided it, and carried on.

## Gate evidence

```
npx oxfmt --config .oxfmtrc.json --check <6 owned files>
  All matched files use the correct format.

npx oxlint --config .oxlintrc.json --deny-warnings <5 owned source and test files>
  oxlint exit=0

npm run check:src:server
  > tsc --noEmit -p configs/src/tsconfig.server.json      (no diagnostics)

npx tsc --noEmit -p tsconfig.json
  root tsc exit=0

npm run test:guides
  Test Files  1 passed (1)
       Tests  13 passed (13)

npx vitest run --project src:server tests/src/server/Probe.test.ts tests/src/server/helpers.test.ts
  Test Files  2 passed (2)
       Tests  67 passed (67)
    Duration  112.10s
```

I also ran `npm run test:policy` because the change adds a centralized declaration: `Tests 93 passed (93)`.

Writing sweep over my own added lines, pattern
`(?i)(should|simpl|easy|easier|easiest|\bjust\b|currently|\bnow\b|\bnew\b|latest|utiliz|leverag|\bvia\b|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|\bsince\b|\bonce\b|please|sanity|dummy|blacklist|whitelist|\bmaster\b|\bslave\b|ensure|guarantee|\bwe\b|\bour\b|let's|\babove\b|\bbelow\b|\bhere\b|\bboth\b|\btwo\b|\bthree\b)`, over `git diff -U0` added lines of all six owned files. Hits ruled: temporal `since` at `guides/probe.md`, `src/server/helpers.ts`, and one test title — permitted, the banned sense is causal; `scratch.ensure(...)` twice — a literal code identifier, exempt; one locative `here` in a test comment, reworded to "in its place".

## Diffstat and status

```
 guides/probe.md                   | 25 +++++++++------
 src/server/Probe.ts               | 10 ++----
 src/server/helpers.ts             | 52 ++++++++++++++++++++++++++++++-
 src/server/stages/RuntimeStage.ts |  9 ++++--
 tests/src/server/Probe.test.ts    | 28 ++++++++++++++++-
 tests/src/server/helpers.test.ts  | 65 ++++++++++++++++++++++++++++++++++++++-
 6 files changed, 167 insertions(+), 22 deletions(-)
```

```
 M guides/probe.md
 M src/server/Probe.ts
 M src/server/helpers.ts
 M src/server/stages/RuntimeStage.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/helpers.test.ts
```

No commits. No shared-file patches; every file I touched was owned. Probes ran in the session scratchpad, not in the subject tree.

## Deviations

None.

## Observations outside this unit's scope

- The PD6 audit's claim 1 also prescribes replacing "longest single language-service call" with "longest candidate diagnostic batch" at `guides/probe.md:786`, on the grounds that `getSemanticDiagnostics` runs after `getSyntacticDiagnostics` before the next yield. That passage is not among the ones this brief names, so I left it. It has no carrier that I can see.
- `overwriteFile` is exported and therefore public. Its `@example` is executed in `tests/src/server/helpers.test.ts:124-131`, so the guide row and the example both have an executed proof behind them.