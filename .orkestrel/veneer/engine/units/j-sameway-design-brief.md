# J-SAMEWAY design round — a change the host moves toward the change's own end

One brief for both lanes of the adversarial pass, blind to each other: `planner` on Opus 5.5 (the subjective lane) and `analyst` on GPT-6 Astra (the objective lane). Perform the assignment directly, spawn nothing, and edit nothing. This round proposes; the Orchestrator rules.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (Design laws: derive state, mechanism not product policy, one concept one term); `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/patterns.md` and `tests.md`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E13, § E18, § E22 with its amendment (item 4 names this round's subject).

## The terrain (Veneer commit `7fd28dc`, J-INTEGRATION round 3)

Read each file with `git -C C:/Users/mikes/WebstormProjects/veneer show 7fd28dc:<path>` (the commit is on `main` or on `unit/integration`; if `git show` fails in the main checkout, use `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/integration`).

- `src/browser/Modal.ts` and `src/browser/Offcanvas.ts`: `show` and `hide` run their writes through `#apply(shown, write)`, which reads `#holds(shown)` after each write: the change holds while the engine is live and the host's `shown` token equals `shown`. A door that finds the token moved against the change calls `#reshow` or `#rehide`, the returning step E22 rules. A door that finds the token moved toward the change's own end, before the change wrote it, also fails `#holds` and stops the change, returning `false` or running a returning step. Each `show` and `hide` also reads `#refused` again after its cancelable pre-change event, where a listener can have moved the token.
- The observation that carries the subject (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-integration-report-2.md`, item 4): an Offcanvas hide stopped at its `hiding` write because the host dropped `show`, and a Modal show stopped before its `shown` write because the host added `show`, stop as before; a successor unit rules on it.
- `tests/src/browser/Modal.test.ts` and `Offcanvas.test.ts`: the takeover cases (titles beginning "returns the host", "returns the panel", "stops a hide whose token removal", "stops a show whose shown-token write") show how a door case drives a reaction.
- The other engines with a `shown` token and doors (`Collapse.ts`, `Toast.ts`, `Tooltip.ts`, `Dropdown.ts`, `Carousel.ts`, `Tab.ts`) are context: report whether each has the same-direction case, as an observation for carrying, not as this unit's scope.

## The questions

1. Enumerate every door in `Modal` and `Offcanvas` where the host can move the `shown` token toward the change's own end before the change writes it, including the re-read of `#refused` after the pre-change event. For each, state what the change has written, what it leaves undone when it stops there, and what a user perceives (computed display, the `hiding` or `showing` token under the shipped cascade, the backdrop, ARIA state, the scroll lock, focus).
2. Rule the behaviour. Options to rule on, each with its cost: (A) the change treats the host's move as agreement and completes every remaining write toward that end, skipping the token write the host already made, and dispatches its after-change event; (B) the same completion without the after-change event; (C) the change stops as today and the limit is stated; (D) another shape you name. Say which events a consumer receives in each, what `show()` or `hide()` resolves, and how the rule reads beside E22's opposite-direction rule, so both read as one rule about the token the host chose.
3. The proofs: one case per door per engine, red first on `7fd28dc`, each asserting what a user perceives; name the mutation each case distinguishes.
4. The unit: owned files, order against J-GUARDS (which owns the guard import and the `bindEventMap` call in `Modal.ts` and `Offcanvas.ts` until it lands), and acceptance criteria.

## Output

A numbered proposal answering each question, with `file:line` evidence at `7fd28dc` for every claim about the code, each claim marked read or inferred. End with one line: `PROPOSAL: <one-sentence recommendation>`.
