# CL13 — the Content/layout portfolio verdict

## What this is

The closing unit of the Content/layout family. It judges **what Veneer's four layout and content keys
actually render**, against Bootstrap 5.3.8's own rendering of the same markup, by capture.

**No fix is authorized in this round.** `.agents/skills/orkestrel-polish-surface/SKILL.md` § Select the
scope: a verdict request does not authorize fixes. Confirmed findings become carriers for later
families; they are not repaired here. This unit owns nothing in the Veneer tree.

## Your lane

Your dispatch names which of three lanes you hold. Rule only in that lane.

- **Subjective design fit** — whether what renders reads as one coherent, deliberate surface, and
  whether a difference from Bootstrap reads as a decision or as drift.
- **Objective state truth** — whether each frame shows what the record says the key does, and whether
  each measurable difference has a recorded cause.
- **Mechanical inventory** — what is present and absent: specimens, classes, roles, names, states,
  and whether the portfolio covers what it claims to.

The other lanes run blind to you, in parallel, on this same portfolio. Do not speculate about them.

## The portfolio

**Veneer's side** — `C:/Users/mikes/WebstormProjects/veneer/tmp/capture/states/`, 32 frames for the
four keys, produced by the journey suite's own capture run. Filenames read
`<state>--<variant>.png`, where the state carries the mode its frame shows and the variant names the
project that shot it. Each is an element frame of the lifted specimen.

**Bootstrap's side** — `C:/Users/mikes/WebstormProjects/veneer/tmp/cl13/portfolio/`, from a spawned
harness the Orchestrator owns. Filenames read `<specimen>--<theme>--<width>`, with `.element.png` the
matched element frame, `.page.png` the whole viewport, `.accessibility.yaml` the rendered roles and
names, and `.steps.log.txt` what the harness did. `harness.log.txt` and `control.json` carry the run
and its blank-frame control.

**Compare element frames with element frames.** The page frames are context. An earlier harness round
produced page frames only, and that asymmetry is why this round exists.

Both sides mirror the same markup and differ only in stylesheet. Both passed a blank-frame check
proven able to fail.

## Seeded candidates

The Orchestrator eyeballed both sides before dispatching, per the skill's own step 1. These are its
readings, offered as **confirm-or-refute candidates, not findings**. Kill any of them on the evidence;
a candidate refuted dies on the record with what killed it.

1. **The container cap matches Bootstrap exactly.** Both sides render 1140 wide inside a 1280 viewport
   and 390 wide at 390.
2. **The row stacks at the same breakpoint on both sides.** Both double in height at 390.
3. **Veneer renders systematically shorter.** Container and row frames are 21px against Bootstrap's
   24, the stacked row 42 against 48, the table 149 against 163. Candidate: this is the recorded
   font-size departure and nothing else, and it is uniform.
4. **Veneer's 32 frames carry 14 distinct images.** The same state at the same width is byte-identical
   across the two projects fixing that width. Candidate: this is structural, not a defect, and a lane
   counting files rather than digests would overstate the evidence.
5. **The link key's frames are width-invariant on both sides.** Candidate: this is a property of
   shooting one inline anchor, not a Veneer defect.
6. **The link element frame shows one anchor of nine.** That key's selector matches the first anchor
   while the specimen carries nine role links — 73×19 on Veneer's side, 83×21 on Bootstrap's.
   Candidate: **a lane cannot judge the role palette from this portfolio**, and that is a gap in what
   the capture registry can show rather than in what the cascade ships.

## What to rule on beyond the candidates

- Whether each key's frame shows its own subject. The container frame's width *is* its cap; the row
  frame's height *is* its stacking. Ask the same of the table and the link.
- Whether every difference you find between the sides has a cause you can name from the record — the
  guide's departures table is `guides/veneer.md` § Tokens § Departures from Bootstrap — or is
  unexplained. An unexplained difference is a finding.
- Whether the dark twins earn their registration: does each dark frame differ from its light
  counterpart, on both sides?
- Whether the accessibility snapshots show the same roles and names on both sides.
- What this portfolio **cannot** show. Say so plainly rather than passing it.

## Evidence you may read beside the portfolio

The record, as corroboration for a mechanism and never as proof of what renders:

- `guides/veneer.md` — the departures table and the compatibility rows for these four keys
- `tests/setup.ts` — the cascade key table naming each key's specimen, selector, and property
- `tests/fixtures/oracle/inventory.json` — the pinned Bootstrap record
- `.orkestrel/veneer/units/cl13-portfolio-observations.md` — the Orchestrator's own reading, which is
  where the seeded candidates come from
- `.orkestrel/veneer/units/cl13-harness-report.md` and `-2.md` — how Bootstrap's side was produced

## Output

Rule on every seeded candidate by number, then add your own findings numbered after them. For each:
the site, what the evidence shows, and — for a finding — a one-line statement of what it costs a
consumer or a maintainer.

**Source is corroboration, never proof.** A claim the portfolio cannot show is unproven, not passed.

End with **one terminal line**:

- `CONVERGED` — nothing in your lane forces another round; or
- `ANOTHER ROUND(n, n, n)` — naming the candidate or finding numbers that force it.

## Scope

Read only. Write nothing, run no command that writes, and do not edit the harness — the Orchestrator
owns it and a verdict lane never edits the instrument it judges by.
