# J-MODAL audit round 2 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 30 tool uses, 159 s; retained verbatim from the subagent's return)

## Checker verdict — J-MODAL round 2 audit

Role: `checker` on Sonnet, mechanical conformance lane, read-only.

### Per-claim verdicts (mechanical clauses only)

**Claim 1 (isolation/signal, item A).** CONFIRMED. `IsolationOptions.signal` readonly at `src/browser/types.ts:319` (worktree). Case titles "stops the isolation whose inert write a reaction answers by destroying the modal, releasing its claims and writing nothing more", "destroys the isolation it constructed when a reaction inside the construction takes the show over", "claims nothing under an aborted signal and releases every claim when its signal aborts" each appear once in `tests/src/browser/Modal.test.ts` / `Isolation.test.ts` (grep count 1 each). Mutation rows "the isolation ignores its signal" (JOINED), "the isolation ignores a signal aborted before construction" (EXACT), "a constructed isolation is kept after the door fails" (EXACT) present in `j-modal-mutations-2.log.txt:90-92` with matching failed counts and named cases.

**Claim 2 (bounce, item B).** CONFIRMED on mechanical clauses. Case titles for the three red-first cases each appear once (grep count 4 for "bounces without moving focus…", but this pattern also matched other combined items in the batched grep — the isolated single-pattern grep earlier confirmed one occurrence per case title in `Modal.test.ts`). Mutation rows "the bounce reads nothing after the prevent dispatch", "the bounce reads nothing after the focus", "the bounce focuses under focus false" all `EXACT exit=1 | 1 failed of 36` at `j-modal-mutations-2.log.txt:93-95`.

**Claim 3 (isolation chain, item C).** CONFIRMED. "keeps an inert ancestor clear while any isolation inside it lives, and restores it at the last release" present once in `Isolation.test.ts`; row "a clear ancestor takes no claim" `EXACT exit=1 | 1 failed of 7` at `j-modal-mutations-2.log.txt:96`.

**Claim 4 (delegate/lifetime/focus, item D).** CONFIRMED. All four named case titles resolve in `Delegate.test.ts` (grep counts sum to 4 across the pattern). Rows "the modal route reads no lifetime before it prevents or marks", "the dismiss route reads no lifetime", "the focus return is armed on shown", "the modal route leaves no mark", "the modal route drives a target another delegate drove", "the dismiss route leaves no mark" all present `EXACT exit=1` at `j-modal-mutations-2.log.txt:97-99,102-104`.

**Claim 5 (prose, item E).** CONFIRMED on the mechanical text clauses I checked: `hidden.vn.modal` doc now reads "after the host's fade and the backdrop's fade settle" (`j-modal-2.diff:2077`); `DismissOptions.backdrop` now names "a press on the backdrop, or beside a modal's dialog" (`j-modal-2.diff:2068`); `show`/`hide` `@returns` end "or another write changed the host's `shown` token while the call ran" (`j-modal-2.diff:2097,2106`); `parseBackdrop` guide row reads "Parses a backdrop value to a boolean, or to `static`" with no Bootstrap-coercion claim (`guides/veneer.md:152`). `test:guides` exit=0 confirmed independently in the Orchestrator's own gate log (`j-modal-gates-2.log.txt:80-92`). UNRESOLVED on the retitled-case and takeover-paragraph behavioral assertions, which require reading behavior rather than mechanical presence — referred below.

**Claim 6 (identity conjunct, item F).** CONFIRMED. `j-modal-identity.log.txt` reads exactly `exit=0 | tests/src/browser/Modal.test.ts | 0 failed of 29`, `exit=0 | tests/src/browser/Delegate.test.ts | 0 failed of 44`, `receipt: restored byte for byte` — independent artifact, not the report's quoted text.

**Claim 7 (scroll-lock selectors, item G).** CONFIRMED. `ModalSelectorMap.fixed` and `.sticky` are both `readonly string` with TSDoc at `types.ts:1178-1181` (worktree). Case title "pads the elements its replacing fixed selector names through the scroll lock it takes, and not the default ones" present once in `Modal.test.ts`; row `EXACT exit=1 | 1 failed of 36` at `j-modal-mutations-2.log.txt:105`.

**Claim 8 (scope, gates, instrument, added lines).** CONFIRMED, assembled from independent artifacts rather than the report:
- Status lists only `guides/veneer.md`, `src/browser/{Backdrop,Delegate,Isolation,Modal,ScrollLock,constants,index,parsers,types,validators}.ts`, and the matching `tests/src/browser/*` files (`j-modal-2-status.txt:1-19`); no off-limits file.
- `types.ts` diff hunks touch only `IsolationOptions`/`IsolationInterface` (item A), `BackdropInterface`/`DismissOptions`/`ModalEventMap.hidden`/`ModalInterface.show`/`.hide` (item E), and `ModalSelectorMap` (item G) — confirmed by reading every hunk (`j-modal-2.diff:2022-2109`).
- Every gate in `j-modal-gates-2.log.txt` (the **Orchestrator's own run**, independent of the writer) exits 0: `check:src:browser`, `oxlint`, `oxfmt`, `test:src:browser` (277 passed), `test:guides` (19 passed), `test:policy` (109 passed, 1 skipped), the three builds, `test:conformance` (22 passed), `test:setup` (267 passed), tree-wide `check` (line 609).
- `j-modal-mutations-2.log.txt` reads every row `EXACT` or `JOINED` with no `MISSED`/`ERR`/`NOREPORT` (full read, lines 1-116), eight `GREEN?` rows all `0 failed` (lines 107-114), and `receipt: restored byte for byte` (line 116).
- `j-modal-mutations-2-first-run.log.txt` shows exactly one non-`EXACT`/`JOINED` row, `MISSED exit=0 | destruction keeps the isolation | … | 0 failed of 36` (line 43), matching the report's claim that the first full run missed only that row before its re-aim.
- The Orchestrator's round-2 replay log named under Subject (`j-modal-mutations-2-orchestrator.log.txt`) does not exist in `.orkestrel/veneer/engine/units/` (glob returned no files) — **UNRESOLVED per the brief's own instruction**, not FAIL.
- No `.bs.` wire name is dispatched or listened for outside guide prose; every `.bs.` occurrence in the diff sits in `guides/veneer.md`'s Bootstrap-comparison table (lines 266, 284, 286, 302, 593, 735-742).
- No `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, access modifier, parameter property, default export, or bare nested function declaration found in the diff (targeted sweep, no matches beyond permitted top-level exported functions in `parsers.ts`/`validators.ts`).
- Every invoked element guard reads `isInstance(x, HTMLElement)` or a subclass (`HTMLAnchorElement`, `HTMLAreaElement`) — full listing in `Delegate.ts`, `Modal.ts`, `Isolation.ts`, `validators.ts`; the one non-`HTMLElement` `isInstance` call (`validators.ts:164`, `CustomEvent`) is an event guard, not an element guard, so it is outside the claim's scope.
- `plugin` row for Modal reads `shipped` with Proof `tests/src/browser/Modal.test.ts` (`j-modal-2.diff:742`).
- The report records no `prove` call was made (`j-modal-report-2.md:3`) — this specific fact is UNRESOLVED as independent evidence (only the report states it), though it is a negative claim a bench-tool audit cannot easily contradict either.

### Checklist

| Item | Met / not met | Evidence |
|---|---|---|
| Status lists only owned files | Met | `j-modal-2-status.txt:1-19` |
| Barrel export list matches test assertion | Met | `index.ts:1-15`; `index.test.ts:21-67` |
| One class in `Modal.ts` | Met | grep `^export class` → 1 hit; `^\s*class ` → 0 hits |
| `readonly` on added interface properties | Met | `types.ts:319, 1179, 1181` |
| Gate green (independent run) | Met | `j-modal-gates-2.log.txt` |
| Instrument log clean, receipt restored | Met | `j-modal-mutations-2.log.txt:1-116` |
| First-run MISSED row matches report | Met | `j-modal-mutations-2-first-run.log.txt:43` |
| Identity probe 0/29, 0/44, receipt restored | Met | `j-modal-identity.log.txt` |
| Orchestrator's replay log present | Not met (absent by design, per brief) | glob empty |
| No `prove` call made | UNRESOLVED (report-only claim) | `j-modal-report-2.md:3` |
| No banned substitution terms in added prose | Met | targeted sweep, no violating hits |

### Referrals

- Claim 5's behavioral assertions (the retitled hide-before-token-return case now resolving `false`, and the takeover paragraph's accuracy against source) require reading runtime behavior, not mechanical presence — refer to the objective lane (`analyst`).
- Whether the ancillary `#driven` lookup (item D's deviation) and the `focus`-during-in-flight departure (item B) are acceptable design deviations rather than defects is a judgment call for the subjective/objective lanes, not this checker.

VERDICT: UNRESOLVED (claim 8's Orchestrator-replay-log clause and the no-`prove`-call clause; every other claim's mechanical clauses CONFIRMED)

---

The Orchestrator's readings: the `prove` clause is the writer's self-report and is accepted as such, because no `prove` server is reachable from a subagent (the same reading every W2 round records); the replay runs on the landing round's instrument before the fast-forward, and the round-2 verdict records where.
