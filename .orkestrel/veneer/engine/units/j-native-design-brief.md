# J-NATIVE design round — the native features the terrain measured and no ruling weighs

One brief for both lanes of the adversarial pass, blind to each other: `planner` on Opus 5.5 (the subjective lane) and `analyst` on GPT-6 Astra (the objective lane). Perform the assignment directly, spawn nothing, and edit nothing. This round proposes; the Orchestrator rules.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; Veneer's `ROADMAP.md` § Tenets ("Prefer the native browser platform": use Chromium's APIs where they satisfy the required behaviour, investigate native support before adding custom machinery, and verify the resulting behaviour and animation), in `C:/Users/mikes/WebstormProjects/veneer/ROADMAP.md`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` (the rulings R1 onward) and `decisions.md` (E5 on the gate hosts, E21 on host availability); the terrain record `units/j-engine-terrain-record.md` and its platform probe logs `units/j-engine-terrain-platform*.log.txt`.

## The question

The J-TENETS audit (`units/j-tenets-native-report.md` row 8; `units/j-tenets-objective-report.md`, the arrow row) found native features the terrain measured present on Chromium 153 that no ruling takes or refuses:
- invoker commands (`command` and `commandfor` on a button) against the delegate's click routing for toggles;
- `interpolate-size: allow-keywords` (and `calc-size()`) against `Collapse`'s measured `scrollHeight` pixel height;
- `hidden="until-found"` and `beforematch` against collapsed content that find-in-page cannot reach;
- CSS `anchor()` and anchor-positioned arrows against `Placement`'s measured arrow offset arithmetic.

For each, rule: adopt (what it replaces, what the consumer's markup must change, what the engine keeps for Bootstrap's markup contract, and the proof), refuse (the concrete reason on the record: the Bootstrap markup contract, a gate host that lacks it, a measured behaviour gap), or measure first (the exact probe, on which host). Say for each whether Chromium 141, the styles session's gate host, carries it, from the terrain record or your knowledge with the version, marked read or inferred. Read the engine code at Veneer `main` (`C:/Users/mikes/WebstormProjects/veneer`, `src/browser/Collapse.ts`, `Delegate.ts`, `Placement.ts`); never a directory under `tmp/worktrees`.

## Output

A numbered proposal, one item per feature, each ending in ADOPT, REFUSE, or MEASURE with its reason and, for ADOPT or MEASURE, the unit that would carry it and its owned files; `file:line` evidence marked read or inferred. End with one line: `PROPOSAL: <one-sentence recommendation>`.
