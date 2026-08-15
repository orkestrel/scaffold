# A7 — settlement voice: the card states the attempt's real outcome

## Role and engine

`implementer`, engine **Opus 5**, native, high effort. Sole serial writer in
`/workspace/supervisor` from clean committed baseline **bdb5d7c**. Perform directly, spawn
nothing, no commits/pushes/installs. Read `AGENTS.md`, `.claude/rules/browser.md`,
`.claude/rules/tests.md`, and `guides/src/supervisor.md` before editing. An audit follows;
your self-report is not acceptance.

## The defect (E1 finding 5, filmed)

The settlement card reads "This attempt ended, but its result is not available." while the
provider's result text sits in the raw stream directly above it. The freshness half of the
root cause is already landed (bdb5d7c): the card now renders against a snapshot refreshed
after the stream ends, so the settled durable row is reachable when the card renders. This
unit owns the voice half only.

## Current ground (verified)

`app/browser/components/FeedItem.vue:39-49` — the `outcome` computed: `undefined` row →
`undefined`; `quarantined` → `` `Quarantined: ${current.reason}` ``; completed →
`'Completed'` (the recorded value is never shown); settled failure →
`` `Failed: ${current.result.error.message}` ``; everything else → the "result is not
available" sentence. The card body renders `{{ outcome }}` at line 121. There is no
truncation/bounding primitive in `app/browser/helpers.ts` (grep verified: none of
truncate/bound/clip/ellipsis exists as an exported helper).

## The unit (ruled by the reconciled design round)

1. A settled success **with** a recorded value renders that value, **bounded**: the rendered
   text never exceeds a fixed bound you choose and declare, and a cut value says it was cut.
   A large or non-string value must not become a JSON wall — the bound is this unit's
   criterion, not a review finding.
2. A settled success **without** a value reads exactly: "This attempt completed and recorded
   no result."
3. An unsettled attempt under an ended run reads exactly: "This attempt ended before it
   recorded an outcome."
4. The string "result is not available" appears nowhere under `app/`.
5. The outcome derivation is either folded into its single caller or exported from
   `app/browser/helpers.ts` and tested — no hidden module helper. If you add a bounding
   helper, it is exported from `helpers.ts` and tested on its own boundary values.
6. Keep the existing failure and quarantine voices unless a sentence must change to stay
   one-voice with the new ones; record any change you make.

## Proof discipline

Failing proof first: record the exact command and failing count red, then green, for the
value-rendering case at minimum. Register a portfolio state (or extend an existing one)
whose frame shows a settled success card carrying its bounded result, generated in the
capture run.

## Unknowns

The recorded value's runtime shape per provider (string answer vs structured object) is not
pinned by the Orchestrator. Read the real fixture shapes in `tests/setupBrowser.ts`
(`createSettledUnit`) and the integration fixtures, and state in your report what shapes the
bound handles.

## Scope

**Owned:** `app/browser/components/FeedItem.vue`, `app/browser/helpers.ts`,
`tests/app/browser/components/FeedItem.test.ts`, `tests/app/browser/helpers.test.ts`,
`tests/app/browser/portfolio.ts`, `tests/app/browser/portfolio.test.ts`.
**Off-limits:** `src/**`, `app/browser/controllers/**`, `app/core/**`, `app/server/**`,
`tests/setupBrowser.ts`, configs, manifests, `guides/**` (guide prose rides with the audit's
integration if needed — report the exact sentence as a report-only patch instead of editing).

## Acceptance criteria

1. Red/green pair for the value render; commands and counts pasted.
2. Criteria sentences 2-4 of "The unit" hold verbatim; `grep -rn "result is not available" app/` empty.
3. Derivation and any bounding helper placed per rule 5, with tests.
4. Registered portfolio frame showing the bounded result on a settled success card.
5. `npx vitest run --config vite.config.ts --project app:browser` green;
   `npm run check` green; scoped `npx oxfmt --check` + `npx oxlint --deny-warnings` on owned
   files clean.

## Output

Touched files + diffstat; the declared bound and the shapes it handles; per-criterion proofs
with commands and tails (red first); `git status --porcelain`; report-only guide patch if
any; deviations or none. No diary.

## Deviation contract

A settled success whose durable row is still unreachable at render time contradicts the
landed freshness mechanism: stop and report with the evidence — do not add retries, polling,
or a second refresh path. Ancillary conflicts (sentence order inside the card, where the
bound constant lives among owned files) are yours to decide and record.
