# J-MODAL audit round 3 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 37 tool uses, 171 s; retained verbatim from the subagent's return)

Checker (Sonnet), mechanical conformance lane. Verdict follows.

## Numbered verdicts

1. **The lock under the modal's lifetime (item A).** CONFIRMED. `ScrollLock.ts:1-126` matches the described mechanism verbatim: aborted-signal short-circuit at `ScrollLock.ts:56-60`, `abort`→`destroy` binding at `ScrollLock.ts:61-64`, per-write lifetime reads after each padding write (`ScrollLock.ts:96`) and each margin write (`ScrollLock.ts:106`), no read after the body's overflow write (`ScrollLock.ts:75-77`), `destroy()` aborting its own controller and restoring the shared snapshot only when the last holder releases (`ScrollLock.ts:114-125`). `Modal.ts:235-248` constructs the lock inside `if (this.#lock === undefined)` with `signal: this.#controller.signal`, destroys and resolves `false` on a failed `#holds(false)`, and stores only a lock that passes. `Modal.ts:351-366` (`destroy()`) no longer calls `lock.destroy()` explicitly and still releases the `open` token through `lock.document` at `Modal.ts:364`. Every named case ("releases the scroll lock whose compensation write…", "releases the scroll lock it constructed when a reaction…", "takes no reference under an aborted signal…") exists verbatim in `tests/src/browser/Modal.test.ts` and `ScrollLock.test.ts` (grep confirmed). The re-anchored round-2 row is addressed in the mutation log (claim 4).

2. **Sentences and the contract (item B).** CONFIRMED for the mechanical clauses checkable by text match. The diff at `j-modal-3.diff:824` carries "…at a door the call read before it dispatched its completed event," `:988` carries "…does not veto the bounce; the bounce still stops when a listener inside the dispatch or the focus hides or destroys the modal," and `:997` carries "Bootstrap first normalizes the value, turning `true` and `false`…". All three land in `guides/veneer.md` per direct grep of the worktree file. `test:guides` reads 0 exit, 19 passed, in `j-modal-gates-3.log.txt:80-92`. I did not independently re-derive `types.ts`'s exact `@returns` wording character-for-character against the guide sentence pairing (a parity judgment); that residual is a referral, not a mechanical failure — the substring and the gate both hold.

3. **The attribution (item C).** CONFIRMED. `tests/src/browser/Modal.test.ts:1172` carries the case title verbatim, and `j-modal-mutations-3.log.txt:95` shows `EXACT exit=1 | the bounce focuses under focus false | … | named: ['bounces without moving focus when focus is false']`, matching the report's claim that the case is mutation-bound rather than red-first.

4. **The instrument (item D).** CONFIRMED for every mechanically checkable sub-clause. `j-modal-mutations-3.log.txt` contains 61 `EXACT` and 49 `JOINED` rows (counted directly), 0 `MISSED`/`ERR`/`NOREPORT`, ends with `receipt: restored byte for byte` at line 121, and the eight `GREEN?` rows at line 112-119 match the report's counts exactly (Modal 39, Backdrop 7, ScrollLock 7, Isolation 7, Delegate 48, validators 12, parsers 5, index 3). The five new rows ("the lock ignores its signal," "the lock reads no lifetime after a padding write," "a constructed lock is kept after the door fails," "the lock ignores a signal aborted before construction," "the lock reads no lifetime after a margin write") are present at lines 107-111 with the exact named cases and `EXACT`/`JOINED` results the report states. The first full run (`j-modal-mutations-3-first-run.log.txt:42,52`) misses exactly the two rows the report names ("destruction keeps the scroll lock," "the show dispatch is not followed by a read"), before their re-anchoring. **UNRESOLVED**: the Orchestrator's replay `j-modal-mutations-3-orchestrator.log.txt` is absent from the retained evidence directory (confirmed by directory search: only the brief and claims file matched that name) — per the brief's own note, this is a by-design absence while the lanes read, so it is UNRESOLVED rather than FAIL.

5. **Scope, gates, and the added lines.** CONFIRMED. `j-modal-3-status.txt` and `j-modal-report-3.md:81-104` list identical file sets — `guides/veneer.md`, `Backdrop.ts`, `Delegate.ts`, `Isolation.ts`, `Modal.ts`, `ScrollLock.ts`, `constants.ts`, `index.ts`, `parsers.ts`, `types.ts`, `validators.ts`, and matching test files — with no off-limits file present; the report explains the non-round-3 files as carrying earlier rounds' uncommitted work, which the branch's cut-and-uncommitted state (per the claims file's Subject line) makes consistent. `j-modal-gates-3.log.txt` shows every gate exit 0: `check:src:browser` (line 24), `oxlint` (line 27), `oxfmt` (line 34), `test:src:browser` 282 passed (lines 75-79), `test:guides` 19 passed (line 92), `test:policy` 109 passed/1 skipped (line 105), the three builds (lines 127,139,152), `test:conformance` 22 passed (line 165), `test:setup` 267 passed (line 203), and the tree-wide `check` (line 613). A grep of the diff for `: any`, `as any`, `@ts-ignore/@ts-nocheck/@ts-expect-error`, `eslint-disable`, access modifiers, and `export default` returned no matches. Every `.bs.`-bearing added line resolves to `guides/veneer.md` prose (lines 607, 749-756 of the diff), which the claim's own exception for guide comparisons covers. The element guard `Modal.ts:110` reads `isInstance(host, HTMLElement)`, satisfying the guard clause as the brief's note broadens it (an `Element`-or-subclass guard). The report explicitly records no `prove` call was made (`j-modal-report-3.md:3`).

## Findings fitting no claim

None substantiated.

## Checklist

| Item | Met / not met | Evidence |
|---|---|---|
| Status lists only owned files, no off-limits file | Met | `j-modal-3-status.txt` == `j-modal-report-3.md:81-104` list; brief item 5 names the same set plus `tmp/j-modal/**` |
| Case titles present verbatim in worktree test files | Met | Grep of `tests/src/browser/{Modal,ScrollLock}.test.ts` returned every named case exactly |
| Mutation rows match instrument log, failed counts, named cases, digest receipt | Met | `j-modal-mutations-3.log.txt` lines 95, 107-111, 120-121 |
| No `.bs.` wire name dispatched/listened outside `constants.ts`/guide prose | Met | Diff grep for `.bs.` returns only `guides/veneer.md` lines |
| Added lines carry no banned syntax | Met | Diff grep for `any`, `as any`, `@ts-`, `eslint-disable`, access modifiers, `export default` — no matches |
| Added interface property/public collection readonly | Met | `types.ts:405-409` (`ScrollLockOptions`) all `readonly` |
| `Modal.ts` one class plus imports | Met | `Modal.ts:1-489`, single exported class, no other declarations |
| Every immediately invoked element guard reads `isInstance(x, HTMLElement)` | Met | `Modal.ts:110`; `instanceOf(HTMLElement)` uses at lines 85, 171 are filter predicates, not immediately invoked guards |
| Barrel exports match `index.test.ts` assertions | Met (runtime-proved) | `test:src:browser` 282 passed includes `index.test.ts`; `index.ts:1-15` re-exports `ScrollLock.js`, `Modal.js` etc. per the asserted list |
| `plugin` row for Modal reads `shipped`, Proof `tests/src/browser/Modal.test.ts` | Met | `guides/veneer.md:6058` |
| No banned term in added prose | Met | No `should`, `simply`, `currently`, etc. observed in the added guide/report prose reviewed |
| Shared-file patches name only `types.ts`/`guides/veneer.md`/`ROADMAP.md` | Met | Report names no shared-file patch outside `types.ts` and `guides/veneer.md` |
| Report records no `prove` call was made | Met | `j-modal-report-3.md:3` |
| Orchestrator's replay log independent evidence | UNRESOLVED (by design) | File absent from evidence directory; brief names this as expected while lanes read |

## Referrals

- Whether the item B `@returns` sentence in `types.ts` and the guide's paired sentence satisfy full parity beyond the substring/gate check is a judgment call for the subjective or objective lane, not mechanical.
- Whether the guide edits the writer flagged as "slightly outside" the brief's stated scope (the `#### Modal` lock bullet and construction sentence) are in-scope or out-of-scope is a scope-honesty judgment for the Orchestrator.

VERDICT: PASS

---

The Orchestrator's readings: the two guide edits the writer flagged (the lock bullet and the construction sentence naming the lock's signal beside the isolation's) are in scope, because item A changed the mechanism they describe and `AGENTS.md` scopes a unit that changes a mechanism to own the prose describing it; the replay runs on the landing round's instrument before the fast-forward.
