# Guide path driver checker report

Journal tmp/cursor/d7n-guide-path-bootstrap-check.jsonl; session bd38c2d1-0afd-45c0-b100-4ab90e6fdea7. The fixed model pin is replaced with its engine alias under the owner's retention rule. Remaining text is unchanged.

I'll read the brief first, then the checker contract and only the files that assignment names.The brief assigns a read-only checker pass on named claims. I'll load the checker/falsify contracts and the subject files next.Next I’ll read the driver source, frozen helpers, the supplied diff, and the root receipts the claims rest on.## P1 — CONFIRMED

Failed attack: compile a full `tests` plan and repair it unfiltered (or via CLI `declare`).

`guide.mjs` accepts only an absolute target that `resolve`s to `GUIDE`, compiles `createBlueprint('guide', { src: ['core'] })` with `['tests']`, then `createPlan` / `assertSelection` against frozen `PATHS` (`tmp/pass/path-artifact-pilot/guide.mjs:21-41`, `functions.mjs:8-12,24-29`, `constants.mjs:1`). No `declare`, `catalog`, `spawn`, or `run()` call. Receipt: `repair/audit.json` findings are only `tests/setupPolicy.ts` and `tests/config.test.ts` (stale); `repair/repair.json:3-8` `written` is those paths; `removed`/`skipped` empty. Adjacent: keeping the compiled `groups` while filtering `artifacts` is not a write-broadening; `Materializer.repair` walks hydrated `plan.artifacts` (`src/server/Materializer.ts:313-321`).

## P2 — CONFIRMED

Failed attack: a dirty PRESERVED path changes bytes while remaining `M`, or a git-clean PRESERVED path is rewritten off-diff.

Receipt `written` is only `tests/setupPolicy.ts` and `tests/config.test.ts` (`repair/repair.json:3-8`). `status-before.txt` vs `status-after.txt` adds only those paths. `diff-after.txt` adds only those files; every other `index old..new` pair matches `diff-before.txt` (`guides/guide.md` `0865ec4..39a457c`, `src/core/helpers.ts` `daa104c..bbebeba`, `src/core/types.ts` `30835a2..60c6c17`, `tests/setup.ts` `5c1e110..bba8f13`, `tests/src/core/Guide.test.ts` `4b9bf18..49e0623`, `tests/src/core/helpers.test.ts` `bc34972..4ae8588`). Git-clean PRESERVED paths from `guide-constants.mjs:3-19` are absent from both diffs. `repair/settled.json` findings are those PATHS, `aligned`; no `"drift": "stale"` or `"missing"`. `repair.exit.txt` is `0` with empty `repair.stderr.txt` (runtime `assertHost` / `assertBytes`). `repair/host-members.json` keys are the PATHS. Adjacent: pre-existing Guide reader dirt staying dirty is preservation, not a write.

## P3 — CONFIRMED

Failed attack: a red repair or final test falls through to implicit `0`, or after-state is skipped on failure.

`guide.sh:12-29` hashes the installed host members against `d7n-path-bootstrap-pack-reading.md:16-18` and checks HEAD `1d5afa3c637ea280c54649d8661856de05f22eaf` / branch `claude/orkestrel-npm-audit-deps-14ibta` before `mktemp` or `guide.mjs`. Baseline/repair/final statuses are captured under `set +e` and written (`guide.sh:37-50,63-70`). Repair red writes `status-after`/`diff-after` then `exit "$REPAIR_STATUS"` (`52-60`). After-state on the final path is written before `exit "$FINAL"` (`71-83`), not gated on success. No `exit 0`. Receipts: `baseline.exit.txt` `1` with the named config case failing (`baseline.stderr.txt:6-8`); `repair.exit.txt` `0`; `final.exit.txt` `0` with that case passing (`final.stdout.txt:6-7`). Adjacent: baseline red continuing into repair is required.

## Outside the claims

Full Guide gate chain and remaining reader corrections are outside this unit, not missing proof of P1–P3.

## Findings fitting no claim

None.

## Attacked and held

Hydration prefix-expansion of PATHS into extra host members: settled/audit findings stayed on those PATHS. `set +e` around node: captured `$?` is still the process status; empty `REPAIR_STATUS`/`FINAL` does not occur after `$?`.

VERDICT: PASS

## Provenance

Role: mechanical checker, Cursor Grok, spawn nothing, read-only. Brief: `tmp/units/d7n-guide-path-bootstrap-check-brief.md`. Model pin: `Cursor Grok` (`.claude/agents/grok.md`). Harness journal: `tmp/cursor/d7n-guide-path-bootstrap-check.jsonl` (stream-json of this Ask session). No other journal was written.

