# J-TENETS — does the engine work still serve Veneer's tenets?

One brief for every lens of an alignment audit, blind to each other. Each lens is read-only: perform the assignment directly, spawn nothing, edit nothing, and run no test. This round rules on alignment; the Orchestrator reconciles and carries every drift to a named unit, and a drift that would move the campaign's scope goes to the user.

## The tenets (binding)

Veneer's `ROADMAP.md` § Tenets at Veneer `main` `6d27028` (`C:/Users/mikes/WebstormProjects/veneer/ROADMAP.md`, lines 10 to 69), which reproduces the campaign's tenets file `git -C C:/Users/mikes/WebstormProjects/scaffold show ca7de59f~1:.orkestrel/veneer/tenets.txt` (the two agree word for word but for the Grok version, 4.6 there and 4.7 in the roadmap; the scaffold `.orkestrel/veneer/plan.md` names the roadmap as the carrier): the product tenets (a proper Orkestrel package; Bootstrap compatibility while owning the implementation; Veneer's own JavaScript; Orkestrel runtime dependencies only; framework integration outside the engine; Elements as the visual and interaction reference; semantic defaults without inferred components; direct control through classes; Tailwind compatibility without requiring it; CSS-variable tokens as a tested contract; the rendered browser result decides; proven Bootstrap parity and Veneer's own additions; the native browser platform first) and the execution constraints (finish each component before advancing; research before designing; ASTs only for a concrete question; efficient work and instructions, disposable artifacts removed). Read the section itself; this list is an index.

## The subject

The J-ENGINE campaign's work: Veneer's engine and its proofs at `main` `6d27028` in `C:/Users/mikes/WebstormProjects/veneer` (a clean checkout no unit writes): `src/browser/**`, `src/core/**`, `tests/src/browser/**`, the guide's engine sections and § Compatibility `engine` and `plugin` rows in `guides/veneer.md`, `package.json`, and the showcase's Engine region under `app/**`. The units in flight, read from their briefs and rulings, not their worktrees: J-SAMEWAY (`units/j-sameway-brief.md`, E24), J-SNAPSHOT-SHARED (`units/j-snapshot-shared-brief.md`, E25; its commit `3b3b4a9`), and the queue in `plan.md`. The campaign's records sit in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`: `plan.md` (§ Carried findings, § In flight), `decisions.md` (E1 to E25), and `j-engine-design-verdict.md` (the rulings R1 onward, the units, the exit criterion). The styles session owns `src/styles/**` and everything outside the engine; judge its work only where the engine depends on it.

## What each finding states

For each tenet your lens holds, rule one of:
- **ALIGNED**, with the evidence that shows it (`file:line`, a case title, a ruling);
- **DRIFT**, the work contradicts the tenet: the smallest concrete instance, the evidence, and the correction;
- **GAP**, the tenet asks for something no landed or queued unit delivers: what is missing, and whether it is inside the J-ENGINE exit criterion (`j-engine-design-verdict.md` § Exit criterion) or outside it;
- **UNRESOLVED**, the evidence you could read does not decide it: name the reading that would.

Mark each claim about the code **read** or **inferred**. Do not restate a finding the records already carry (grep `plan.md` § Carried findings and `decisions.md` first) unless the carrier is wrong; name the record instead. Report no wording or style finding in prose that is otherwise true.

## Output

A table per tenet your lens holds (tenet, ruling, evidence, correction or missing piece, inside or outside the exit criterion), then at most three findings outside your tenets that a reader would need, then one terminal line: `ALIGNMENT: <n aligned>/<n judged>; DRIFT: <tenets or none>; GAP: <tenets or none>`.
