# J-ORACLE design round — an independent Bootstrap recording for the eleven plugins

One brief for both lanes of the adversarial pass, blind to each other: `planner` on Opus 5.5 (the subjective lane) and `analyst` on GPT-6 Astra (the objective lane). Perform the assignment directly, spawn nothing, and edit nothing. This round proposes; the Orchestrator rules.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md` and `quality.md` § Instruments; Veneer's `ROADMAP.md` § Tenets ("Prove Bootstrap parity and Veneer's own additions … Derive compatibility expectations independently of Veneer's implementation") in `C:/Users/mikes/WebstormProjects/veneer/`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E9 (the API shape Veneer owns), § E11 (the `.vn.` wire namespace), and § E26 (the user's ruling that adds J-ORACLE); the tenet audit's parity findings `units/j-tenets-compat-report.md` and `units/j-tenets-objective-report.md`.

## The terrain (Veneer `main` `6d27028`, `C:/Users/mikes/WebstormProjects/veneer`)

- **Button's oracle.** `recordButtonOracle` in `tests/setupServer.ts` (around line 3327) drives Bootstrap 5.3.8's own `bootstrap.bundle.js`, the devDependency, and records the result. `tests/conformance.test.ts` (around lines 263 to 283) compares that recording with `tests/fixtures/oracle/button.json` and refreshes it under `ORACLE_REFRESH=1`. `scanOracleObligation` (around line 3226) judges a `plugin` row only by whether its named proof file exists.
- **What the other rows check.** `tests/fixtures/oracle/inventory.json` records CSS selectors and declarations only. Each engine's expected vocabulary is a literal in Veneer's own test (for example, `Collapse.test.ts` "publishes frozen default tables…").
- **Ownership.** The styles session owns `tests/setupServer.ts`, `tests/conformance.test.ts`, `tests/fixtures/**`, and the guide's § Compatibility machinery. This session owns `src/browser/**`, `tests/src/browser/**`, and the Status, Proof, and Obligation cells of the `engine` and `plugin` rows (Veneer `ROADMAP.md` § The engine session). A change to a styles-owned file is recorded under `engine/plan.md` § Pending shared changes, with its exact hunk, before a landing applies it.

## The questions

1. **What the recording captures.** Stay inside E9's bound: Veneer owns its option names, event names, timing, and members, so the recording cannot compare those. What end state can each plugin's recording project onto that both runtimes must share? For example: the class tokens, ARIA attributes, and `data-*` attributes each user action leaves on the host, its triggers, and its targets; which element holds focus; and what is visible (computed `display` and `visibility`).
   - For each of Collapse, Dropdown, Tab, ScrollSpy, Alert, Carousel, Modal, Offcanvas, Toast, Tooltip, and Popover, name the actions (the trusted click or key the markup contract routes, or a method call where no data route exists) and the end state each action leaves.
   - Name the recorded parts Veneer departs from on the record (the § Departures rows, E-rulings), and how the comparison excludes each one explicitly rather than silently.
2. **How it is recorded and compared.**
   - Where the recorder lives, and whether it reuses `recordButtonOracle`'s shape.
   - How it drives the same markup under Bootstrap's bundle, and then under Veneer's engine and delegate, in the browser.
   - Where the fixtures live, and how a refresh works.
   - What the comparison fails on.
   - How a plugin row's proof names the comparison, so `scanOracleObligation` checks it rather than a file's existence.
3. **The proofs.**
   - The negative control: an instrument is not evidence until it has failed. For example, a planted Veneer behaviour that departs from the recording must fail the comparison.
   - The mutation each comparison distinguishes.
   - How the red reading is taken before any row flips.
4. **The units.**
   - Split the work so each unit's owned files are disjoint from the styles session's live files and from this session's in-flight units: J-CASCADE shares the engine test files; J-SAMEWAY-ENGINES owns Collapse, Toast, Dropdown, and Tooltip.
   - Give each unit its order and acceptance criteria.
   - List the shared changes the styles session must apply or approve.

## Output

A numbered proposal answering each question, with `file:line` evidence marked read or inferred. End with one line: `PROPOSAL: <one-sentence recommendation>`.
