# J-ELEMENTS design round — the Elements interaction mechanisms the engine takes or refuses

One brief for both lanes of the adversarial pass, blind to each other: `planner` on Opus 5.5 (the subjective lane) and `analyst` on GPT-6 Astra (the objective lane). Perform the assignment directly, spawn nothing, and edit nothing. This round proposes; the Orchestrator rules.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; Veneer's `ROADMAP.md` § Tenets in `C:/Users/mikes/WebstormProjects/veneer/`. The tenets that bind this round are "Make Elements the visual and interaction reference" (preserve the look and feel the user values in Elements, including its interaction animations; investigate how its CSS, JavaScript, and native elements produce those effects) and "Preserve Bootstrap compatibility while owning the implementation". Then read `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E9, § E11, and § E26: the motion values are the styles session's, and this round rules the interaction mechanisms. Last, the tenet audit's identity findings in `units/j-tenets-identity-report.md`.

## The terrain

- **The mechanisms.** The terrain distillate `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-distillate.md` records the Elements interaction mechanisms no ruling has taken or refused:
  - the tab indicator geometry (`--set-tabs-indicator-*`, § Tab);
  - the toast swipe offset and opacity (§ Toast);
  - the menu flip cap (`max-block-size` with `--set-menu-flip`, § Dropdown);
  - any other mechanism the distillate names that the audit lists (read the identity report's evidence for the full set).
- **The engine code.** Veneer's `src/browser/Tab.ts`, `Toast.ts`, `Swipe.ts`, `Dropdown.ts`, and `Placement.ts` on `main` at `C:/Users/mikes/WebstormProjects/veneer`. Never read a directory under `tmp/worktrees`.
- **The Elements source.** Wherever the distillate points: the Elements repository path it names. If that path is unreadable here, say so, and rule from the distillate's record.

## The question

For each mechanism, rule one of:
- **ADOPT.** State what the engine writes, and whether it is a CSS variable, a class, or an attribute. State which cascade key reads it, owned by the styles session. State that the Bootstrap markup contract stays unchanged, give the proof, and name the unit that would carry it with its owned files.
- **REFUSE.** Give the concrete reason on the record: the Bootstrap markup contract, E11's scope, or a behaviour gap.
- **MEASURE FIRST.** Give the exact probe.

For every adoption, name the styles-session side: the cascade rule that consumes what the engine writes. Say whether it already exists or must be requested under `engine/plan.md` § Pending shared changes.

## Output

A numbered proposal, one item per mechanism, each ending ADOPT, REFUSE, or MEASURE with its reason, carrier, and owned files. Give `file:line` evidence, each marked read or inferred. End with one line: `PROPOSAL: <one-sentence recommendation>`.
