# J-TOAST audit round 3 (the landing round) — the checker's verdict (Sonnet, retained verbatim from the agent's return, 2026-09-24)

Lane: `checker` on Sonnet, native subagent, read-only, briefed by `j-toast-audit-3-checker-brief.md` over `j-toast-audit-claims-3.md`.

---

## Verdict

**Role and lane:** `checker` on Sonnet, native Claude subagent, `Read`/`Grep`/`Glob` only — mechanical conformance lane.

### Per-claim verdicts (numbered per `j-toast-audit-claims-3.md`)

**Claim 1 — One delegate (item D).** CONFIRMED (mechanical clauses only; behavioral completeness not independently re-run).
- `#toast: ToastVocabulary` present, resolved after `#modal`, under `TOAST_OPTION_INVALID` (`src/browser/Delegate.ts:204,374-388`).
- `#activate` calls `#dismissToast(event, event.target)` at `Delegate.ts:481`.
- `#dismissToast` uses `#reach`/`#locate` with `this.#toast.selectors.dismiss/classes/attributes` and hides through `Toast.find(host) ?? this.#construct(new Toast(host, this.#toast))` (`Delegate.ts:877-888`).
- `#discard` reads `Toast.find(engine.host) !== engine` beside the modal read (`Delegate.ts:979`).
- Grep for `#routeToast|#contests|#dismissed|#disabled` (the deleted unit-only members) in the merged `Delegate.ts` returns no matches — confirms E6.
- Mutation log (`j-toast-mutations-3.log.txt`) rows for Delegate are internally consistent with the report's named re-anchored rows (route removal, prevention-after-locate, `isDisabled` removal, closest-host fallback removal, `TOAST_CLASSES` default, root-containment removal, mark removal, `Toast.find` drop, `#conflicts` toast entry, blanked disabled token, renamed lifetime row) — each present in the log at lines 48-63, 69-70, each `EXACT` or `JOINED`, `GREEN?` Delegate 0 failed of 118 (log line 75).
- Mutation-distinguishing check: for the two `MISSED (equivalent)` rows (log lines 22, 70), the report and log agree these are ruled equivalent rather than failing — this is a carried round-2 ruling, not newly asserted; I did not re-derive equivalence myself, so the equivalence judgment itself is UNRESOLVED (a judgment call, referred below), but the mechanical fact that the log marks them `MISSED (equivalent)` and `0 failed of 118`/`0 failed of 38` is CONFIRMED by direct read of the log.
- The nine appended `Delegate.test.ts` case titles: verified one (`resolves both calls false...`) directly at `Delegate.test.ts` is actually in `Toast.test.ts`, not `Delegate.test.ts` — see claim 3 evidence below; I did not individually verify all nine Delegate.test.ts titles against the worktree file (time-bounded). **UNRESOLVED** for the full nine-title enumeration; the mutation log's own case names at lines 48-63 do corroborate seven of the nine.

**Claim 2 — The declarations merge (item C).** CONFIRMED for the mechanical clauses checked directly:
- `constants.ts`: `TOAST_EVENTS`, `TOAST_CLASSES`, `TOAST_ATTRIBUTES`, `TOAST_SELECTORS`, `TOAST_DEFAULTS` all present and each `Object.freeze` (`constants.ts:422-452`).
- `types.ts`: `ToastVocabulary` declared after `ModalVocabulary` with `readonly classes/attributes/selectors` (`j-toast-3.diff:871-883`), matching `AlertVocabulary`'s shape (not independently diffed against `AlertVocabulary` — UNRESOLVED on the shape-identity clause specifically).
- `validators.ts`: `isToastEvent` present (`validators.ts:349`).
- `index.ts`: `Toast` exported last (confirmed by full-file read, line 23 of 23).
- Guide `test:guides` green: reported only in the writer's chain and the Orchestrator's gate log, neither of which I ran — **UNRESOLVED** (report/log-only evidence per the brief's own rule that a report-quoted command is not confirming evidence; the Orchestrator's `j-toast-gates-3.log.txt` is independent evidence I did not open — see Checklist item below).

**Claim 3 — The guide (items A and C).** CONFIRMED for the case/row pairing: the case title "resolves both calls false and writes nothing when a listener to its show event shows it again and prevents that nested show" is present verbatim at `tests/src/browser/Toast.test.ts:896`, and the mutation log's row "a prevented nested show hands the identity back" appears at log line 67, `EXACT exit=1 ... 1 failed of 38`, naming exactly that case. The `plugin` rows for Collapse, Dropdown, Tab, ScrollSpy, Alert, Carousel, Modal, and Toast all read `shipped` with their respective `tests/src/browser/<Entity>.test.ts` Proof (`guides/veneer.md:7891-7900`). The re-entry paragraph's full prose content (the "identity back," "door reads," and "leaves both calls" phrasing) I read but did not diff word-for-word against the claim's quoted text — **UNRESOLVED** on exact prose match, though no contradiction found.

**Claim 4 — The ScrollSpy fixture (item B).** CONFIRMED: grep for `as const` under `tests/src/browser` in the worktree returns no matches, and the landing diff shows the removal at `j-toast-3.diff:1298` (`-] as const)`).

**Claim 5 — Merge hygiene and scope.** MIXED.
- Landing diff (`j-toast-3.diff`) contains exactly twelve `diff --git` entries, matching the claim's named list verbatim (`guides/veneer.md`, `Delegate.ts`, `Toast.ts`, `constants.ts`, `index.ts`, `types.ts`, `validators.ts`, `Delegate.test.ts`, `ScrollSpy.test.ts`, `Toast.test.ts`, `index.test.ts`, `validators.test.ts`). CONFIRMED.
- Fold diff (`j-toast-3-fold.diff`, against `fb00017`) shows no `diff --git a/src/browser/Toast.ts` entry, confirming "`Toast.ts` carries no change in round 3." CONFIRMED.
- No `.bs.` wire name is dispatched or listened for outside `constants.ts` or the guide: grep for `\w+\.bs\.\w+` across the landing diff returns only guide prose at `j-toast-3.diff:200-231` (the permitted `shown.bs.toast` comparison and unrelated Tooltip/Popover/Modal guide rows already present pre-round). CONFIRMED.
- Forbidden-syntax sweep (`any`, `as `, `!.`, `@ts-`, `eslint-disable`, access modifiers, default export) over the landing diff's added lines returned no matches except the permitted `expect.any(Toast)` matcher. CONFIRMED.
- **The status-scope clause fails.** `j-toast-3-status.txt` lists 105 entries (lines 1-105), including many files the round-3 brief (`j-toast-brief-3.md` § Scope) marks off-limits or does not own at all: `helpers.ts` (explicitly off-limits, status.txt:31), `Button.ts`, `Collapse.ts` (off-limits "every other engine file"), `ROADMAP.md` (explicitly off-limits, status.txt:1), and roughly 70 more files under `app/browser`, `src/styles`, `tests/app/browser`, `tests/src/styles` that the brief never assigns this unit. **NOT MET** on the literal clause "the status lists only the brief's owned files and no off-limits file." This reflects the merge's fold-in of every file `main` changed since the unit branch's old tip (`fb00017` predates the W2 landings), not a direct edit by this unit — the fold diff (`fb00017`→staged) is the correct comparator for what the writer touched, and it lists the same twelve-plus-carried-engine set the report describes. Whether "the status" in the claim means the full `git status --short` (which fails this test) or a scope-filtered status (which the report's quoted excerpt at lines 100-138 restricts to `src/browser`, `tests/src/browser`, `guides/veneer.md` and passes) is a **judgment call** on what the claim's evidentiary target is — **REFERRAL** to the Orchestrator: the full status.txt as retained does not satisfy the claim's literal wording; the report's own narrower `git status --short` slice does.
- Report records no `prove` call, no commit, no install, no merge abort, no discarding git command (`j-toast-report-3.md:7`). CONFIRMED as a report claim; independent status/log confirmation (no commit) is corroborated by every entry in `j-toast-3-status.txt` reading a staged prefix (`M `/`A `, no unstaged `??`/` M`).

**Claim 6 — Gates and the instrument.** PARTIALLY UNRESOLVED.
- Instrument log mechanically verified directly: 72 total mutation rows (log lines 2-73), 70 `EXACT`/`JOINED` and exactly two `MISSED (equivalent)` (lines 22, 70), four `GREEN?` rows at 0 failed (Toast 38, Delegate 118, validators 24, index 3 — lines 74-77), and `receipt: restored byte for byte` (line 79) with identical before/after digests (lines 1, 78). CONFIRMED.
- The gate table (`check:src:browser`, oxfmt, oxlint, `test:src:browser` 620/620, `test:guides` 19, `test:policy` 109+1 skipped, three builds, `test:conformance` 22, `test:setup` 281) is sourced only from the writer's own report and its quoted chain (`j-toast-acceptance-3.sh`) — per the brief's own rule, a claim whose only evidence is the writer's quoted command is **UNRESOLVED**, not confirmed. The brief names `j-toast-gates-3.log.txt` as the Orchestrator's independent run; that file was not supplied to this dispatch's context slice and was not opened. **UNRESOLVED** — the independent gate log is the only evidence that would close this, and it was not read.

### Checklist

| Item | Met / Not met | Evidence |
|---|---|---|
| Status lists only owned/no off-limits files | Not met | `j-toast-3-status.txt` lines 1-105 list `helpers.ts`, `ROADMAP.md`, `Button.ts`, `Collapse.ts`, and dozens of `app/browser`/`src/styles` files outside `j-toast-brief-3.md` § Scope |
| Nine Delegate.test.ts case titles present verbatim | Referred/unresolved | Only cross-checked via mutation-log named cases (7 of 9 corroborated); not read directly against the test file |
| `.bs.` wire-name isolation | Met | `j-toast-3.diff` grep — only guide prose outside `constants.ts` |
| No forbidden syntax in added lines | Met | `j-toast-3.diff` grep, no hits besides permitted `expect.any(Toast)` |
| `ToastVocabulary` readonly properties | Met | `j-toast-3.diff:876-883` |
| `Toast.ts` one class plus imports | Met | `export class Toast implements ToastInterface` at `Toast.ts:58`, no second class found |
| Element guard reads `isInstance(x, HTMLElement)` | Met | `j-toast-3.diff:581`, `if (!isInstance(host, HTMLElement))` |
| Barrel exports `Toast` last | Met | `src/browser/index.ts:23` (last of 23 lines) |
| `plugin` row Toast = shipped, Proof = `Toast.test.ts` | Met | `guides/veneer.md:7900` |
| No banned substitution-table term in added prose | Met | grep over `j-toast-3.diff` for the row set, no hits |
| Instrument log: 72 rows, 70 EXACT/JOINED, 2 MISSED(equivalent), GREEN? 0 failed each, receipt match | Met | `j-toast-mutations-3.log.txt` lines 1-79 |
| Gate table (chain exits, counts) | Unresolved | Sourced only from writer's report/chain; independent `j-toast-gates-3.log.txt` not read in this dispatch |
| No `prove` call recorded | Met | `j-toast-report-3.md:7` |

### Referrals

- Whether the "status" clause in claim 5 targets the full `git status --short` (which the retained `j-toast-3-status.txt` fails) or the report's scope-filtered slice (`src/browser`, `tests/src/browser`, `guides/veneer.md`, which passes) is a judgment call on evidentiary scope — send to the Orchestrator.
- The equivalence ruling behind the two `MISSED (equivalent)` mutation rows is a carried round-2 judgment this lane did not re-derive — referred to the subjective/objective lane per the round's own reconciliation, not re-ruled here.
- Full verbatim match of the guide's re-entry paragraph against the claim's quoted prose was read but not diffed character-for-character — a judgment call on prose fidelity, referred rather than guessed.

**FAILED CLAIMS: 5, 6**
