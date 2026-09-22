# Unit CL11 — journeys and captures

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer`, from the CL10 landing `0e0b055` on a clean tracked tree.
Perform the assignment directly and spawn nothing.

Do not commit, push, install a dependency, or run a destructive command. Do not run `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`. The Orchestrator lands the work.

## Objective

Make the journey and capture layer cover the Content/layout family the way it already covers the
Button family, prove the published artifact renders that family in a real consumer page, and close the
four findings this unit has carried since CL1.

## Where the facts are

**This brief states rulings and obligations. It restates no measurement.** Every measured fact lives
in `./tmp/units/cl11-terrain.md`, with what produced it. Read it first and take every site, every
uncovered path, and every placement ruling from there.

That separation is deliberate. A brief earlier in this campaign restated a measurement, the copy
drifted, and the unit reading the record cold was the only reader positioned to refuse. **If this
brief and the terrain record disagree, the record and the tree win, and you stop and report the
disagreement rather than resolving it.**

The terrain record was measured against the tree you start from, after CL10's fix round landed one
export in a module you own. Do not re-measure it against an older state.

## Rulings already taken, which you implement rather than reconsider

- **A capture placement is measured, never assumed.** The registry's own doc block records why a page
  frame is used in some cases and an element frame in others, with the measurement behind each. Apply
  those rulings to the states you add, and where a new state's paint does not match either measured
  case, measure it and record what you measured.
- **A state name says the mode its own frame shows**, and the variant the filename ends in names the
  project that shot it. Follow that naming rather than inventing one.
- **A frame that would duplicate another frame is not registered.** The registry deliberately omits two
  Button frames for that reason. Apply the same test before adding a content state.
- **The published artifact is the subject of the distribution proof**, not the source cascade. The
  consumer page reads the packed stylesheet through the installed package's own export.
- **The showcase declares no inline style.** The assertion that enforces it is in a file you own, and
  CL10's specimens were written to satisfy it. Do not weaken it.

## Obligation 1 — the capture registry covers the content and layout family

Grow the registry so the family the campaign has been shipping is photographed, and so every state it
registers is placed by the journey that reaches it.

Decide which states earn a frame by the rulings above: a state whose frame would duplicate another's
is not registered. Say in your report which you considered and rejected, and why.

**The layout states are photographed at both registered widths.** The journey projects fix different
viewports, and a layout key is the one subject whose reading differs between them.

## Obligation 2 — the journeys reach what the registry declares

The placement, filename, and capture-run membership proofs must stay green with the registry grown,
which means a journey has to reach each new state rather than the registry merely naming it.

The declared-versus-proven family check already exists. Keep it honest: it must fail if a state is
declared and never placed, and fail if a state is placed and never declared.

## Obligation 3 — the refusal family carries the installed voice

The refusal voices must be the exact text the installed module produces, read from it rather than
written out here. Where a refusal's text is asserted as a literal anywhere you own, bind it to the
installed source instead, so a change in the package reddens rather than drifting silently.

## Obligation 4 — the consumer page carries the family

The distribution stage must render a packed-CSS consumer page carrying a container, a row, a table,
and a link, and read each one's resolved treatment from the published stylesheet.

This proves something no other gate proves: that the packed artifact's cascade reaches a real page
through a real bundler and a real server, rather than that the source cascade compiles.

**This project does not run in `npm test`.** The terrain record says where it does run. Run it
explicitly, report its exit code, and treat its result as a required reading rather than an extra.

## Obligation 5 — the four carried findings

The terrain record states each one's exact site and its exact uncovered path. Close all four.

- **The breakpoint visitor's bare restore.** The correct pattern is already in the same module; follow
  it rather than inventing one. Give it a case that reaches a rejecting restore — the finding's whole
  point is that no case does.
- **The pointer hold's two uncovered refusals.** One has no case at all; the other has a case for the
  neighbouring variant only. Read the terrain record for which is which before writing either.
- **The button resolver's verb prefix.** Read `.claude/rules/names.md` § Fixed lifecycle vocabulary and
  rename by what that rule fixes, not by what the sibling happens to be called. Update every call site
  and every inventory that names it.
- **The root-bounded reader's first match.** Decide whether this is a defect to close or a bound to
  state, and say which on the evidence. If you close it, the duplicate-name case is what proves it.

## Obligation 6 — a planted failure keeps its evidence

A planted failing journey must retain its journal and tree artifacts while the run stays red. Prove
it: plant, run, show the red and the retained artifacts, remove the plant, show the green.

Plant in a file this unit owns, and name in your report how the plant was removed.

## Unknowns

Settle each from the tree and report what you found.

- **Which content and layout states earn a frame.** Named in Obligation 1. The answer is a judgment
  against the registry's own rulings, not a list this brief withholds.
- **Whether the root-bounded reader's first match is a defect or a bound.** Named in Obligation 5.
- **Whether the consumer page needs its own markup or a second drive.** The page's body is empty today
  and its drive builds the elements. Either shape may be right; choose on what the existing drive does
  and say why.
- **Whether a planted failing journey retains its journal and tree artifacts today**, or whether that
  retention has to be built. Named in Obligation 6. Read the journey harness's artifact writers before
  planting, and report which it is.

**Settled, so you do not spend the round on it: the `prove` tool is NOT reachable from your context.**
Your role's tool allowlist carries no MCP tool, so the instrument `.claude/rules/quality.md`
§ Instruments names for a claim about a TypeScript edit cannot be called here. Settle such a claim with
executed readings, say in your report that no receipt was issued, and do not represent a test reading
as one. Adopt any instrument that settles a claim as a permanent case rather than leaving it a one-off
probe.

## Scope

**Owned:** `tests/app/browser/integration.test.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`,
`tests/setupBrowser.test.ts`, `tests/setup.test.ts`, `tests/distribution.test.ts`, and
`tests/app/browser/sections/ButtonSection.test.ts`.

**That last file is granted for the rename's call sites and nothing else.** The Orchestrator derived
the resolver rename's consumer set by searching the tree, and that file carries call sites the rename
makes false. Update them; change nothing else in it. It is a Button-family proof and this unit does not
own its subject.

**Verify that set yourself before renaming.** Search the tree for the current name and compare what
comes back against this owned list. If a file comes back that this brief does not grant, stop and
report rather than editing it.

**Off-limits:** `tests/setupConformance.ts`, `tests/setupStyles.ts` and its proof, `tests/fixtures/**`,
`package.json`, `configs/**`, `src/**`, `app/**`, `guides/veneer.md`, and every path
`scaffold repair` restores, which includes `tests/setupPolicy.ts` and `tests/policy.test.ts`.

**If closing a finding would reach `src/**` or `app/**`, stop and report.** This unit changes the
proof layer, not the shipped package.

## Execution

Perform the assignment directly and spawn nothing. You are a native writer: you run the gates yourself
in this checkout.

The gate chain, in order: `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run build`, `npm test`. Then, because `npm test` does not include it, `npm run test:distribution`
as a separate reported reading. Run the styles, browser-setup, app-browser, and journey projects on
Edge as well through `PLAYWRIGHT_CHANNEL=msedge`.

Run the capture path too, so the frames the registry declares are actually shot at least once. The
terrain record names how the capture flag is set.

`tmp/` is expected to be dirty and is not in your scope.

## Output

1. The states you registered, the states you considered and rejected, and the placement ruling behind
   each.
2. Which journey reaches each new state.
3. The consumer page's shape and each key's resolved reading from the packed stylesheet.
4. Each carried finding, what you changed, and the case that now reaches its uncovered path.
5. The planted-failure proof: the red, the retained artifacts, the removal, the green.
6. Each Unknown, with what you found.
7. The gate chain's exit codes and final result lines, on both engines, plus the distribution project's
   own reading.
8. `git diff --stat` and `git status --porcelain --untracked-files=all`, actual output.
9. Anything you could not close.

No process diary.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle within your own scope: each new state's exact
name, the shape of each new case, where the consumer page's markup sits, and how the planted failure
is expressed. Stop and report if this brief and the terrain record disagree, if the rename reaches a
file this brief does not grant, if closing a finding would reach the shipped package, or if a
registered state cannot be placed by any journey.

## Acceptance criteria

Cheap first.

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npm run build` exits 0.
4. `npm run test:setup` and `npm run test:setup:browser` exit 0, including the cases that reach the
   three previously uncovered paths.
5. `npm run test:journey` exits 0 on the four variant projects, with the placement, filename,
   membership, and declared-versus-proven proofs green over the grown registry.
6. A capture run shoots every registered state, including the layout states at both registered widths.
7. `npm run test:distribution` exits 0, with the consumer page carrying a container, a row, a table,
   and a link read from the packed stylesheet.
8. The status lists only files this brief owns.

**Observations, not criteria.** Report each with your own reading and move on; the authoritative run is
the Orchestrator's after you exit.

- `npm test` whole, and the journey and browser projects on Edge. A whole-suite and cross-engine result
  is timing-sensitive inside your own context, and your own exec stays resident throughout, so a red
  there is a question rather than an answer. Report what you read and carry an unclear failure to the
  Orchestrator rather than diagnosing it.
- The capture run's frame count and any frame that came back blank.
