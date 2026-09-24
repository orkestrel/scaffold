# J-COLLAPSE audit round 1 — the checker's verdict (returned 2026-09-23 by `checker` on Sonnet, native subagent, 26 tool uses, 156 s; retained verbatim from the subagent's return text)

# Checker verdict — J-COLLAPSE audit round 1

**Role and lane:** `checker` on Sonnet, native Claude subagent, `Read`/`Grep`/`Glob` only, mechanical conformance only.

## Numbered verdicts

**Claim 7** (parser, guard, constants, barrel — mechanical clauses): **CONFIRMED**
- `parseElement` exported from `src/browser/parsers.ts` and re-exported through `src/browser/index.ts` (`j-collapse.diff:785` `export * from './parsers.js'`; `j-collapse.diff:816` `export function parseElement(value: unknown): HTMLElement | undefined`).
- `COLLAPSE_EVENTS`, `COLLAPSE_CLASSES`, `COLLAPSE_ATTRIBUTES`, `COLLAPSE_SELECTORS` are each `Object.freeze(...)` (`j-collapse.diff:751-776`).
- No `COLLAPSE_DEFAULTS` export anywhere in the diff's `constants.ts` hunk (`j-collapse.diff:730-776` adds only the four tables listed above).
- Export list exact: `tests/src/browser/index.test.ts` (`j-collapse.diff:2021-2038`) lists `COLLAPSE_ATTRIBUTES`, `COLLAPSE_CLASSES`, `COLLAPSE_EVENTS`, `COLLAPSE_SELECTORS`, `Collapse`, `isCollapseEvent`, `parseElement` — exactly the 7 symbols the guide's § Surface rows add (`j-collapse.diff:9-15`), and the Orchestrator's own grep in `j-collapse-gates.log.txt:144-150` reproduces the same 7 names independently.

**Claim 8** (guide and departures — mechanical clauses): **CONFIRMED**
- § Surface rows: exactly 7 new rows added (`j-collapse.diff:9-15`), one per new export, matching the export set above (no extra, no missing).
- Fence's import specifier: `import { Collapse } from '@orkestrel/veneer/browser'` (`j-collapse.diff:27`).
- `plugin` row's cells: Status `shipped`, Proof `—`, Obligation cell naming `tests/src/browser/Collapse.test.ts` (`j-collapse.diff:172-173`; confirmed independently by the Orchestrator's own grep, `j-collapse-gates.log.txt:152`).
- Every added summary is a third-person `-s` verb form naming no symbol: "Shows and hides…", "Names the class tokens…", "Names the attributes…", "Names the default selector…", "Names the bubbling events…", "Checks whether a DOM event…", "Parses a selector, or an element…" (`j-collapse.diff:9-15`).

**Claim 9** (scope, gates, E6, shared patches): **UNRESOLVED**
Confirmed by independent evidence:
- Status lists exactly the brief's owned files as adds/mods and no off-limits file (`j-collapse-status.txt:1-12`; brief § Scope Off-limits `j-collapse-brief.md:44` names `HostSnapshot.ts`, `Button.ts`, `ColorMode.ts`, `helpers.ts`, `types.ts`, `tests/setupBrowser.ts`, `ROADMAP.md`, none of which appear in the status).
- Every shared-file patch under `j-collapse-patches/` touches only shared/off-limits files or the unit's own test file: `j-collapse-precedence.diff` and `j-collapse-destroy-summary.diff` touch `src/browser/types.ts`; `j-collapse-precedence-proof.diff` touches the unit's own `tests/src/browser/Collapse.test.ts`; `j-collapse-delegate-prose.diff` touches `types.ts`, `Delegate.ts` (owned but only prose), and `guides/veneer.md`; `j-collapse-read-tag.diff` touches `helpers.ts`, `Button.ts`, `Collapse.ts`, `tests/src/browser/helpers.test.ts`, `tests/src/browser/index.test.ts`, and `guides/veneer.md`; `j-collapse-roadmap.diff` touches `ROADMAP.md`.
- Gates: `check:src:browser`, oxlint, oxfmt, `test:src:browser` (173/173, Chromium 153.0.8010.12), `test:guides`, `test:policy`, `build:src:core`, `build:src:styles`, `build:src:browser`, tree-wide `check` all exit 0, and `test:conformance` reads red before `build:src:browser` (`ENOENT … dist/src/browser/index.js`) and green (22/22) after, in the Orchestrator's own run (`j-collapse-gates.log.txt:17,40,53,66,88,100,111,129,142,393,397`).
- No forbidden syntax in the added lines: a targeted grep of the diff for `@ts-`, `eslint-disable`, `: any`, `as <Type>`, `public `, `protected ` returns only prose hits ("as Bootstrap", "as an AppError") and no code-level matches.

Not settled by independent evidence — rests only on the unit's own report, per the rule that a claim whose only evidence is the writer's report is `UNRESOLVED`:
- The mutation log's sha1-digest restoration check is stated only in `j-collapse-report.md:78` ("a sha1 check confirmed each file was restored"); no digest output is in evidence.
- "The Orchestrator's own replay of a sample after the lanes return reproduces the recorded reddening (`j-collapse-mutations-orchestrator.log.txt`)" — this file does not exist anywhere under `.orkestrel/veneer/engine/units/` (confirmed by `Glob` for `**/*j-collapse*` and `**/*orchestrator*`); no such replay has been captured as retained evidence.
- "Every shared-file patch applies together (`git apply --check`)" is stated only in `j-collapse-report.md:162` ("I checked that they apply; I did not run the gates with them applied"); no independent run of `git apply --check` against the six patches together is in evidence.
- The `git add -N` / `git rm --cached` index round-trip is stated only in the report (`j-collapse-report.md:182`); `j-collapse-status.txt` corroborates the *end state* (the four new files show as `??` untracked) but not that the index passed through the intermediate staged state and back cleanly.

Because claim 9 bundles confirmed and report-only assertions in one numbered claim, and the rule forbids treating report-only evidence as confirming, the claim as a whole is `UNRESOLVED`, not `CONFIRMED`.

## Checklist of mechanical items

| Item | Status | Evidence |
| --- | --- | --- |
| Diff touches only owned files + shared patches, no off-limits file | Met | `j-collapse-status.txt:1-12`; brief § Scope `j-collapse-brief.md:40-44`; patches reviewed above |
| Case titles in report's proof matrix appear in worktree test files | Met | e.g. "hides the open first-level sibling…", "restores a shared trigger…" appear verbatim in `Collapse.test.ts` and `Delegate.test.ts` per `j-collapse-report.md:25-70` cross-checked against `j-collapse.diff` test bodies |
| Every mutation the report names appears in the mutation log with `exit=1 … 1 failed` | Met | `j-collapse-mutations-final.log.txt:1-46`, every `RED` line reads `exit=1 … 1 failed` |
| Added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`/`protected`/`private`, parameter property, default export, nested function declaration | Met | targeted grep of `j-collapse.diff` returns only prose "as" hits, no code matches |
| Added interface property / public return collection readonly | Not independently checked | `types.ts` is off-limits/shared in this diff; no new interface properties are added by this unit's owned files (types landed in J-BINDER); no counter-evidence found |
| `Collapse.ts` holds one class plus imports | Met | `j-collapse.diff:182-522`, single `export class Collapse` plus import statements only |
| `parsers.ts` holds one exported function with TSDoc | Met | `j-collapse.diff:792-825`, one `export function parseElement` with a full TSDoc block |
| Barrel exports exactly the names the index test asserts | Met | `j-collapse.diff:777-791` vs `j-collapse.diff:2019-2039` and `j-collapse-gates.log.txt:144-150` |
| Guide § Surface has one row per barrel export, none other | Met | `j-collapse.diff:9-15`, 7 rows for 7 exports |
| Collapse fence imports through `@orkestrel/veneer/browser` | Met | `j-collapse.diff:27` |
| `plugin` row reads `shipped`, Proof `—`, proof file in Obligation | Met | `j-collapse.diff:172-173`; `j-collapse-gates.log.txt:152` |
| `grep -rn "\.bs\."` hits nothing but wire-name prose | Met | `j-collapse-gates.log.txt:377` "bootstrap-name-grep exit=0 (1 is the pass)"; all `data-bs-` hits at lines 154-376 are defaults in `constants.ts` or test fixtures |
| No banned term in added prose | Not independently checked | no sweep was run against `writing.md` § Substitutions specifically; no obvious hit seen in reviewed guide prose |
| Patches under `j-collapse-patches/` name only shared/off-limits files or the unit's own proof | Met | see per-patch review above |
| Report names each patch, ruling, and departure | Met | `j-collapse-report.md:159-184` |

## Referrals

1. The brief's § Scope Owned list (`j-collapse-brief.md:40`) explicitly names `COLLAPSE_DEFAULTS` as an owned constants row, but the unit's report rules that no such table should exist under E6 ("the collapse has no default option value… an empty table would be dead code"). Whether omitting a brief-scoped deliverable on this E6 reasoning is a legitimate deviation or an unauthorized scope reduction is a judgment call for the subjective/objective lanes, not a mechanical ruling.
2. Whether claim 9's report-only sub-assertions (mutation-digest restoration, patch `git apply --check`, and the index round-trip) need independent re-verification before acceptance, or can be accepted on the report alone given the corroborating status output, is a judgment call for the Orchestrator.
3. Readonly-property and prose-substitution checks above were not exhaustively run (no new interface properties in this diff's owned files; no full substitution-table sweep was performed) — flagged as gaps rather than rulings.

VERDICT: FAIL 9; outside the claims: none
