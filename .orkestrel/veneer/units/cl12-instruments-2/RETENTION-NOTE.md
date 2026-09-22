# Retention note — CL12 round 2 instruments

Retained by the Orchestrator on 2026-09-22, after the round-2 objective lane referred a gap.

## What is here

`readings.mjs` is the projection comparator: it reads the saved round-1 guide in `guide-before.md`
against the edited guide through the installed Markdown and Guide projections, asserts every table
line byte-identical, and carries a negative control that renames a deferral heading and asserts the
projection differs. `readings.log.txt` is its output.

`gates.json` is the exit-code record the report cites, and the ONLY retained artifact carrying the
whole-suite gate's native exit code. The numbered logs are the gate outputs.

`guide-before.md` is the baseline the comparison used. The subjective lane verified its git hash
matches the round-1 diff's destination hash, so the comparison ran against the correct baseline.

## What is NOT the instrument that ran

`run-gate.ps1` is retained as it stands in the tree, but **it is not the runner that produced these
logs.** It writes a header carrying the guide's modification time and digest; every retained log
carries a bare `START <timestamp> UTC` header instead. The file was edited after the run, so the
executed version is not preserved.

The consequence is bounded and worth stating rather than papering over. The report's sentence that the
guide's digest held constant through final verification has **no retained receipt**, and the objective
lane ruled that sub-claim UNPROVEN on exactly this evidence. It carries no weight: the freshness
question it supports is settled independently by modification-time ordering, which places the guide's
last write before every gate log, and by `gates.json` recording each gate's start time and exit.

## The rule this earns

Retain the executed runner before it can be edited, not at acceptance. A script that writes its own
provenance header is only evidence while the version that wrote those headers still exists, and a
later edit silently converts it into a file that merely resembles the instrument. Where a report cites
a runner's output, retain the runner in the same action that retains the output.
