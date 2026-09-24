# Unit J-REENTRY-SWEEP — map, by running it, every place a reaction can start a change inside a Modal or Offcanvas change

## Role and engine

`opus` on Opus 5.5, a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash), one lens of a breadth round. Four lenses run in parallel, blind to each other, each the sole writer in its own scratch worktree at Veneer `e0dee7e` (J-INTEGRATION round 3 merged over `main` `b1d314d`; `npm ci` already run):

| Lens | Worktree | Path it maps |
| --- | --- | --- |
| `modal-show` | `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sweep-modal-show` | `Modal.show` from its pre-change event to its completed event, and the `#rehide` step it can end in |
| `modal-hide` | `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sweep-modal-hide` | `Modal.hide` from its pre-change event to its completed event, and the `#reshow` step it can end in |
| `offcanvas-show` | `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sweep-offcanvas-show` | `Offcanvas.show` and its `#rehide` step |
| `offcanvas-hide` | `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sweep-offcanvas-hide` | `Offcanvas.hide` and its `#reshow` step |

Your dispatch names your lens. Map only its path. The sub-components the path calls (`Backdrop.ts`, `Isolation.ts`, `ScrollLock.ts`, `HostSnapshot.ts`, the focus calls, the transition waits) are stations on your path: map them where your path calls them.

## Objective

Produce the executed map of your path: every point where consumer code can run after the change has started, what a change started there does to the stale change's later writes, and which of those end the page in an incoherent state.

## Context

**Why.** The J-INTEGRATION audits found the same defect class three rounds running, each one station further down the call chain: a returning step overwrote a change a reaction started (round 2); then the step captured the change identity after `isolation.destroy()` had run consumer code, and a backdrop's own show kept writing after its owner's nested hide started (round 3, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-integration-audit-3-objective-verdict.md`, claims 3 and 4, source traces not yet run). `.claude/rules/quality.md` § Rounds and verdicts turns the next step into a breadth round that locates the source, not a fourth repair. Your map sizes the fix unit.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md` (real engines and events; no mock, spy, or fake clock) and `quality.md` § Falsification; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E13, § E18, § E22 with its amendment (item 4: a takeover in the change's own direction is not yet ruled). Skill: none.

**The invariant each probe tests against.** After everything settles: when a nested `show` or `hide` started, the host, its backdrop, the isolation, the scroll lock, and the events dispatched match that nested change's end state, and no write of the stale change or of a sub-component acting for it lands after the nested change started; when a nested `destroy` ran, nothing writes after it and the snapshot's restoration stands; when the host alone moved its `shown` token against the change, the E22 returning step ran and the page reads the state the host chose. A token move toward the change's own end is J-SAMEWAY's open question: record what happens, as data, and do not class it as incoherent or coherent.

**Reactions to use.** Synchronous custom-element reactions (`attributeChangedCallback` with the attribute in `observedAttributes`, `connectedCallback`, `disconnectedCallback`) on the host, a host child, a sibling the isolation marks `inert`, an element the scroll lock pads, and an element placed inside the backdrop; synchronous event listeners (`focus`, `blur`, `focusin`, `focusout`, the engine's own events); and code that runs while the change awaits a transition. `tests/src/browser/Modal.test.ts` and `Offcanvas.test.ts` already drive each of these; copy their fixtures and helpers.

**Seed rows (run these first; they are the round-3 traces).** `modal-show` and `offcanvas-show`: a stopped show whose `isolation.destroy()` restoration runs a reaction that calls `show()` again before `#rehide` captures `#change` (Modal `show` around `#holds` before the focus write; Offcanvas `show` likewise). `modal-hide` and `offcanvas-hide`: a hide the host takes over after the backdrop's removal, whose `#reshow` re-inserts the backdrop, where a reaction to that insertion calls the engine's `hide()`, so `Backdrop.hide()` finds no `show` token and returns before moving the backdrop's identity, and the interrupted `Backdrop.show()` then adds `show`.

**Host.** Windows 11, Git Bash; `npm` and `npx` resolve to the `.cmd` shims; Chromium 153.0.8010.12. The browser project collects only `tests/src/browser/**/*.test.ts` (the `probe` project runs without a browser), so write your probe cases in one file `tests/src/browser/probe-<lens>.test.ts` in your own worktree, which no landing reads, and run it alone: `npm run test:src:browser -- tests/src/browser/probe-<lens>.test.ts`. Write any multi-step program to a file and run the file; no heredoc, no `node -e`.

**Control identifiers.** Row IDs `MS-n`, `MH-n`, `OS-n`, `OH-n` (by lens) name rows in your map only.

**Standing conditions.** The whole browser suite passes at `e0dee7e` (903 tests). The four lenses share the host's CPU; if a case fails on timing alone, re-run it alone once and report both readings.

## Unknowns

Whether each round-3 trace reproduces at all: run it and report the reading either way.

## Scope

**Owned.** `tests/src/browser/probe-<lens>.test.ts` in your worktree, and nothing else.

**Shared (report-only).** None.

**Off-limits.** Every source, test, guide, and configuration file in your worktree (read them; edit none), and every other worktree.

**What asserts the state this change ends.** Nothing: the sweep changes no source.

**Tools and limits.** No install, commit, push, or discarding git command. Run only your probe file, and cases inside it. Stop at about 40 minutes of work and report what you have.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Your final message:
- the map, one row per point and nested call: ID; the point (the method and the write or call after which the reaction runs, by symbol, with an approximate line); the reaction used; the nested call (`destroy`, `show`, `hide`, the token against the change, the token toward the change's end); what the page reads after settling (host tokens, `display`, `aria-*`, `role`; backdrop connected and its tokens; the isolated siblings' `inert`; the scroll lock's body state; events dispatched in order; the promise results); coherent, incoherent, or J-SAMEWAY data; for an incoherent row, the stale write that landed (symbol, approximate line) and the cause: (i) the engine's identity read after consumer code ran, (ii) a sub-component's write that cannot see its owner's change, (iii) other, named;
- the seed rows' readings first;
- the probe file path, the exact run command, and its `Tests` line;
- the stations on your path you did not reach, named.

## Deviation contract

Stop and report (expected, found, evidence) if the whole probe file cannot run, or if reaching a point would need a source edit. Decide and record: which reactions reach which points, how many cases a point takes, and the order of rows.

## Acceptance criteria

1. The seed rows ran, each with its reading.
2. Every point on the path where consumer code can run after the change started has a row, or is named as not reached with the reason.
3. Each incoherent row names the stale write and its cause class, and its case reads the stale write in a failing assertion.

**Observations, not criteria.** Timing readings under the shared CPU.

## Review evidence

The Orchestrator retains each lens's probe file and report, reconciles the four maps into one, and runs the reconciled incoherent rows again itself before the fix unit's brief rests on them.
