# Unit F8d IMPORTANCE-LONGHANDS, round 2 — the fix round over the F8d audit

Successor to `/home/user/veneer-f8d/tmp/units/f8d-brief.md`. What changed and why: the audit
(`/home/user/scaffold/.orkestrel/veneer/units/f8d-audit-verdict.md`: analyst FAIL 3, 4, 5, 6 with
O1; reviewer FAIL 3, 4, 5, 6, 7 with two referrals; checker FAIL 6) found one contract declared
twice, prose that counts and positions, a shared fixture in the proof, a mutant both unit cases
miss, and one vacuous assertion. This round closes them. The original brief stays in place
unedited; its Objective, Context, Scope, Execution, Output, and Deviation contract bind here except
where this brief states otherwise.

## Role and engine

`opus` on Opus 5.5 (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-f8d` (detached at `cdf7f55`, the round-1 writes uncommitted in the tree, the
state the audit ruled on). Perform the assignment directly and spawn nothing. Use absolute paths
under `/home/user/veneer-f8d` for every command and file, and run every npm and npx command from
`/home/user/veneer-f8d`. Do not commit, push, install, or run `git checkout`, `git restore`, `git
stash`, `git reset`, `git clean`, or `git checkout-index`; undo a plant by the exact reverse edit.

## Objective

Every finding under § Carried findings is closed in the owned files, the named mutation reddens
its case and the exact reverse edit restores green, and the gates in § Acceptance criteria are
green.

## Context

**Evidence.** The verdicts cite by line at the round-1 tree (approximate; locate every site by its
text): `tests/setupServer.ts` around line 1709 (`LonghandRule`, whose remark ends "That stage's rule
satisfies it."), 1731 (`collectRuleLonghands`), 1773 (`collectImportantNames`);
`tests/setupService.ts` around lines 58 to 72 (`StageRule`) and 467 to 484 (`expand`);
`tests/service/tailwind/preflight.test.ts` line 1 (the `StageRule` import) and around line 36 (the
`treated` annotation); `tests/setupServer.test.ts` around line 2412 (the longhand mapping the two
`collectImportantNames` cases share) and around 2445 to 2468 (the "keeps a name out whose
importance covers only some of its longhands, or another longhand" case);
`tests/service/tailwind/consumer.test.ts` around lines 178 to 179 and 223 (comments counting the
longhands) and around 195 (`expect(properties).toEqual(expect.arrayContaining(['grid-column-start',
'grid-column-end']))`, which cannot fail once the branch membership at 184 and 189 holds);
`guides/veneer.md` § Tailwind around lines 389 to 391 (the rule's owning statement), 406 to 417
(the equality paragraph: "two sheets" at 410, "both longhands" at 413, "A second plant" at 416, the
bare `col-1` at 417, and the rule restated at 406 and 411).

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,architecture,documentation,writing}.md`
(`tests.md` on shared fixtures in setup modules; `AGENTS.md` § Writing on counts and positions).
Skill: none. Guide: `guides/veneer.md` § Tailwind (owned).

**Installed primitives.** as the round-1 brief; add no helper.

**Host.** as the round-1 brief; `dist/` may be absent, so run `npm run build:src` before the
service proofs.

**Measurements.** The analyst's `npm run check` exited 0 on the round-1 tree; the instrument
compiles `.col-1 { grid-column: 1 }` (the writer's measurement).

**Control identifiers.** none; name every test for what it proves.

**Standing conditions.** none.

## Unknowns

- The fixture's name (finding 3): settle within `names.md` (`{QUALIFIER}_{NOUN}`) and report it.

## Carried findings

1. **Claim 5 (both lanes): one declaration.** Keep `LonghandRule` in `tests/setupServer.ts` as the
   only declaration of the expanded rule's shape; carry the ordering facts on its members
   (`properties` in Chromium order for an expanded rule; `important` the subset of those names, in
   the same order) and delete the sentence "That stage's rule satisfies it." In
   `tests/setupService.ts` delete `StageRule`, add `import type { LonghandRule } from
   './setupServer.js'`, and type `StageManager.expand` as `Promise<readonly LonghandRule[]>` with
   its local array as `LonghandRule[]`; update every `{@link StageRule}` and the TSDoc naming it. In
   `tests/service/tailwind/preflight.test.ts` switch the import and the `treated` annotation to
   `LonghandRule` from `../../setupServer.js`. Where an inventory lists type names, move the entry.
2. **Claim 6 (all lanes): the prose.** In `guides/veneer.md` § Tailwind: name the two sheets where
   "two sheets" stands; write "on the `grid-column-start` and `grid-column-end` longhands
   Tailwind's `col-1` rule declares" where "both longhands" stands; write "The partial-importance
   plant" where "A second plant" stands; write "the `col-1` class" where the bare token stands;
   keep the rule's statement in its owning paragraph (around 389 to 391) and make the later
   mentions (around 406 and 411) refer to it ("the rule stated with the exclusion line") rather
   than restate it. In `consumer.test.ts`, the comment around 178 to 179 reads "importance on
   `grid-column-start` and `grid-column-end`, the longhands Tailwind's `col-1` rule declares", and
   the comment around 223 reads "Tailwind's `col-1` rule declares `grid-column-start` and
   `grid-column-end`, and the plant makes `grid-column-start` important". Rewrap at or under 100
   columns.
3. **O1 (analyst): the shared fixture.** Move the longhand mapping the two `collectImportantNames`
   cases share from `tests/setupServer.test.ts` into `tests/setupServer.ts` as an exported frozen
   readonly fixture (a `ReadonlyMap` or a frozen record, whichever the cases read) with TSDoc,
   inventoried in the export-name row and the freeze assertion, imported by the proof.
4. **Referral (both lanes): the normal-declaration control.** In the "keeps a name out…" case, add a
   rule that declares a name's every longhand normally (`important: []`, `properties` covering the
   name's longhands) so a `rule.properties` mutant (reading `rule.properties` in place of
   `rule.important` in `collectImportantNames`) reddens. Plant that mutant; record the red; reverse
   exactly; record green.
5. **Referral (reviewer): the vacuous assertion.** Remove `expect(properties).toEqual(expect.arrayContaining(['grid-column-start', 'grid-column-end']))`
   from the branch case; the membership assertions before it carry the claim.
6. **Claims 3 and 4: the settling runs.** After `npm run build:src` and `npm run build:src:styles`,
   run `npm run test:setup -- tests/setupService.test.ts -t "expands each rule"` and record its
   output; run the consumer proof with the per-name plant (`important.length > 0` in place of the
   `every` condition) for the red and without it for the green, recording both.

## Scope

**Owned.** `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setupService.ts`,
`tests/setupService.test.ts`, `tests/service/tailwind/consumer.test.ts`,
`tests/service/tailwind/preflight.test.ts` (the type import and annotation alone), `guides/veneer.md`
(§ Tailwind).

**Shared (report-only).** `ROADMAP.md`.

**Off-limits.** `tests/setup.css`, `tests/fixtures/**`, `tests/service/tailwind/profiles.test.ts`,
`src/**`, `app/**`, `configs/**`, `package.json`, `package-lock.json`, the vendored files, and every
other file.

**What asserts the state this change ends.** The consumer proof, the preflight proof, the setup
inventories and proofs, and `npm run test:guides`; derived by running them.

**Tools and limits.** as the round-1 brief.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Validate with `npx oxfmt --config .oxfmtrc.json --write` over the owned files, then
`npx oxlint --config .oxlintrc.json --deny-warnings` over the owned TypeScript files, `npm run
check`, `npm run test:setup`, `npm run build:src && npm run build:src:styles && npm run
test:service`, and `npm run test:guides`, all from `/home/user/veneer-f8d`.

## Output

Write `/home/user/veneer-f8d/tmp/units/f8d-report-2.md` and return the same text: each carried
finding with what closed it; the fixture's name; the mutation record (finding 4) and the settling
runs (finding 6) with their outputs; the gate exits with counts; `git status --porcelain`; `git
diff cdf7f55 --stat`; and deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on any file outside § Scope a gate names, on the mutant failing to redden, and on any
ruling the tree contradicts. Decide, record, and carry on from the fixture's name, the TSDoc
wording, and the sentences' wrapping.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, the scoped `oxlint`, and `npm run check` exit 0.
2. `npm run test:setup` exits 0 with the fixture inventoried and the control case green.
3. `npm run build:src && npm run build:src:styles && npm run test:service` exits 0.
4. `npm run test:guides` exits 0.
5. The mutation record shows the `rule.properties` mutant reddening the control case.
6. `git status --porcelain` lists the seven owned files and nothing else.

**Observations, not criteria.** The `test:service` wall time; any timeout under load.

## Review evidence

The report and the diff of every owned file against `cdf7f55`.
