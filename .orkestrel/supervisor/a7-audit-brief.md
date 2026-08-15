# A7 audit — settlement voice (writer was Opus, auditor is Sol)

## Role and engine

`analyst`, engine **GPT-5.6 Sol** via the journaled codex CLI, read-only sandbox. Correctness
audit; you never implement, reconcile, or accept.

## Subject

Commit `adc8d11` in `/workspace/supervisor` (range `8d9c325..adc8d11`, 8 files, +303/-25):
the settlement card states the attempt's real outcome. New exported leaves `describeValue`
and `describeOutcome` in `app/browser/helpers.ts`, bound `MAX_VALUE_LENGTH = 160` in
`app/browser/constants.ts`, `FeedItem.vue` delegating, tests, portfolio `settled` state, and
the guide's settlement-voice paragraph plus two table rows.

Read the diff first: `git -C /workspace/supervisor diff 8d9c325..adc8d11`.
Gate evidence (Orchestrator-run): red 5-failed FeedItem renders before source edits, then
23/23; app:browser 467/467; guides parity 374/374; check green; scoped format/lint clean.
Do not run the browser suites; scoped read-only commands only.

## Context

- `AGENTS.md` non-negotiables and design laws bind. `.claude/rules/browser.md` and
  `patterns.md` govern component/helper shape.
- The unit's ruled criteria: settled success with a value renders it bounded (never a JSON
  wall); success without one reads "This attempt completed and recorded no result."; an
  unsettled attempt under an ended run reads "This attempt ended before it recorded an
  outcome."; "result is not available" gone from `app/`; derivation exported and tested.
- The writer's shape claims, answered from source: `SettledUnit.result` is
  `Result<JSONValue, TaskFailure>`; validators forbid `undefined` reaching the card; `null`
  is the only expressible absence; production settles a record via `agentResultToJSON`;
  fixtures settle `'ok'`.
- Known and accepted, not findings: `Failed:`/`Quarantined:` strings remain unbounded
  (recorded for a later change); the `settled`/`FINISHED`-style fixture duplication is
  carried by a later consolidation micro.

## Claims to falsify (verdict each, with file:line evidence)

1. The bound is airtight at the render: no code path puts more than
   `'Completed: '.length + MAX_VALUE_LENGTH + 1` code units of settlement outcome text on
   the card, for every `JSONValue` shape — including a string of astral-plane characters cut
   mid-surrogate (state what the slice does there and whether the result can render as a
   broken glyph; rule whether that is a defect against the criterion or acceptable, with
   evidence).
2. The three sentences are exact and complete over the outcome space: for every reachable
   combination of unit row status (`running`/`settled` success/`settled` failure/
   `quarantined`/absent row) and value presence (`null`, empty-after-trim, substantive), the
   card renders exactly one of the documented voices, and no combination falls through to
   silence or a stale sentence.
3. `describeValue` treats provider strings as text, not JSON: a string value renders without
   added quotes or escaping, `0` and `false` are stated, `null` and whitespace-only record
   nothing — each proven by a test that would fail otherwise.
4. The red/green pair binds: the five red assertions could not have passed against 8d9c325's
   renderer, and nothing in the diff besides the helpers + component change turns them green.
5. `FeedItem.vue`'s `outcome` reads only the current durable row (the same lookup as request
   actionability) and uses the frame row only when the projection has no such unit — the
   A6-landed freshness invariant is consumed, not re-derived, and no second refresh/polling
   path was added.
6. Placement satisfies the architecture rules: the leaves are exported through the existing
   barrel path and tested; the bound lives in `constants.ts` beside the other bounds; no
   hidden module helper, no wrapper, no compound entity member on a public API.
7. The guide's settlement paragraph and both table rows state only what the code does, every
   backticked name resolves, and the sentence "neither is reported as a result that is
   unavailable" is true against the landed strings.
8. The diff introduces no `any`, `as`, non-null `!`, suppression, mock/fake-clock, new
   dependency, or unrelated change; the deleted `deriveUnitRowStatus` import from
   FeedItem.vue leaves no dead export (the helper keeps other consumers).

## Execution

Perform the audit directly and spawn nothing. Journal under
`/workspace/supervisor/tmp/codex/` and return the journal path and session id with the result.

## Output

Numbered verdicts 1-8, each `CONFIRMED` or `REFUTED` with `file:line` evidence and one line
of reasoning; findings outside the claims as `F<n>` with evidence and a proposed carrier;
then exactly one terminal line: `AUDIT: PASS` or `AUDIT: FAIL <claim numbers>`. No process
diary.

## Deviation contract

If the diff cannot be read or a claim cannot be evaluated read-only, stop and report which
claim and why. Grep depth is yours.
