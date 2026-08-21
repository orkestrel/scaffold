# Unit H-guide: the guide's narrative for 0.0.8

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/test`. You perform the assignment directly and spawn nothing.

## Objective

Close `guides/test.md`'s narrative debt for the 0.0.8 surface: the pattern sections, Contract
rules, and Limits reconciliation the per-unit row grants deliberately deferred, plus the guide
population-prose ROADMAP row.

## Context

Authority: `AGENTS.md` § Writing (never state a count; delete counts your edits touch),
`.claude/rules/documentation.md` (a prose claim about behaviour carries an executed assertion;
fences transcribe), `.claude/rules/writing.md`, `.claude/rules/tests.md`. The reconciliation
records: `scaffold/.orkestrel/campaign/design2-reconciliation.md` (the adopted families) and
the H-unit reports' recorded findings — specifically H-browser-1's: the `## Limits` section's
narrative sits behind the adopted surface (a member-count door through which "Nothing else
enters" while the describe layer, `clearStorage`, and `extractOrphans` entered), and the
`## Tests` bullet for `tests/src/browser/helpers.test.ts` no longer describes the file. The
working tree carries the whole wave; every standing entry stays.

## The edits

1. **Patterns.** Add the narrative sections the reconciled round names, each with a fence a
   reader can run and its transcription beside the fences in `tests/guides.test.ts` where the
   file's idiom transcribes: "Wait for a named condition" (waitForCondition/retryUntil/
   waitForEvent — the poll-versus-yield split, the description requirement, the throw
   asymmetry between condition and producer), "Record a browser journal" (try/finally, the
   forwarding contract), "Measure what a reader sees" (the floor's meaning, strict default),
   "Replay response cookies" (the name-only boundary), and a scratch-destroy sentence beside
   `createScratch` pointing Windows handle races at `destroyScratch`.
2. **Contract rules.** The condition-polling distinction (the no-polling law governs a
   product's idle wakeup; a test instrument waiting on a foreign process has no event to park
   on; `waitForEvent` is the door where one exists) — H-core landed the Limits replacement;
   verify the Contract section agrees and add the rule if its home is there. The
   `IMPLICIT_ROLES` membership contract and the `isRendered`/`isReachable` split (H-browser-1
   landed rows; the narrative home may need a sentence). The journal's forwards-and-swallows-
   nothing line. The capture layer's Vitest-runner-internal dependency with the pinned
   version.
3. **Limits reconciliation.** Rewrite the section's narrative to what now decides membership
   (the semantic adoption rule that replaced the member-count door), and rule each remaining
   refused-candidate row still true against the shipped surface; strike rows the adoptions
   falsified. H-browser-1's finding is your checklist's head, not its whole.
4. **The Tests section.** The `tests/src/server/helpers.test.ts`,
   `tests/src/server/factories.test.ts`, `tests/src/core/helpers.test.ts`, and
   `tests/src/browser/*` bullets describe their files as they now are (no counts).
5. **The population-prose row (ROADMAP: "correct the guide's population prose to the figures a
   fresh count produces for createRecorder, createScratch, waitForDelay, and fences")** — the
   writing law has since banned counts entirely: DELETE each population count in those
   passages rather than refreshing it, per "Delete a count you find. Do not correct it."
6. Any sentence elsewhere in the guide your reading finds falsified by the wave's shipped
   surface: correct it, record it.

## Scope

- Owned: `guides/test.md`; `tests/guides.test.ts` for fence transcriptions only.
- Off-limits: `src/**`, every other test file, `package.json`.
- Standing entries: everything `git status --porcelain` lists at your start.
- No commits, installs, or git checkout/restore/stash/reset/clean. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries (both owned files are
   already standing).
2. `npx.cmd oxfmt --config .oxfmtrc.json --check guides/test.md tests/guides.test.ts` exits 0.
3. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exits 0 when
   touched.
4. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project guides`
   exits 0 — every fence's transcription asserts the values its comments claim.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core`,
   `--project src:server`, and `--project src:browser` still report their standing totals (no
   behaviour change).
6. Report: every Limits row's disposition; every count deleted; every falsified sentence
   corrected.

## Output

The diff; raw output and exit code per criterion; the criterion 6 report. No process diary.

## Deviation contract

Stop if a Limits ruling would need a source change (that is a finding, not yours to fix), or
if a fence's asserted value disagrees with the shipped behaviour (likewise). Section placement
and prose within the fixed content are yours: decide, record, carry on.
