# Unit CL12 — the guide

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer`, from the CL11 landing `eb1cd71` on a clean tracked tree.
Perform the assignment directly and spawn nothing.

Do not commit, push, install a dependency, or run a destructive command. Do not run `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`. The Orchestrator lands the work.

## Objective

Make the guide true. Every shipped token has its row, every sentence claims only a reading the tree
produces, and the deferral grammar is one shape or states why it is two.

## The ruling that shapes this whole unit

**The user has ruled implementation over prose.** The guide is the bare minimum to pass, and audits on
this campaign report no wording, comment, or prose finding.

So this unit corrects what is **false** and adds what is **missing**. It does not improve what is
merely plain. A sentence that reads awkwardly and says something true is finished. A row whose wording
you would have chosen differently is finished.

Two consequences, both of which you follow rather than reconsider:

- **Do not run a style pass.** Contractions, register, line width, and heading voice are out of scope
  even where a retained bound names them.
- **Do add a missing row and correct a false sentence**, because those are parity and truth rather
  than taste.

## Where the facts are

**This brief states rulings and obligations. It restates no measurement.** Every measured fact lives
in `./tmp/units/cl12-terrain.md`, with what produced it. Read it first. If this brief and that record
disagree, the record and the tree win, and you stop and report the disagreement rather than resolving
it.

**Read its first three sections before anything else.** They establish that the retained carry files
are partly historical, that one carried claim is false and must not reach the guide, and that the
parity gate does not cover the gap this unit exists to close.

## Obligation 1 — the retained bounds are hypotheses, not findings

Two retained files carry guide bounds: `./tmp/units/u7c-guide-bounds.md` and
`./tmp/units/prose-bounds-carry.md`.

**Verify each entry against the tree before acting on it.** The terrain record establishes that one
file's bounds were closed by a unit that has since landed, and that a carried claim about test-module
exports is false.

For each entry, report one of: closed already, open and in scope, open and out of scope under the
prose ruling, or false. Name the evidence. **An entry you cannot place is reported, not guessed at.**

## Obligation 2 — the missing token rows

The terrain record names seven shipped tokens with no guide row, and names the columns a row carries.

Add them. Take each value from the built cascade rather than from a partial, and take each source from
what actually declares it.

**Then decide whether the gap should have been visible**, and say so in your report. The terrain record
establishes that the parity gate does not cover the token table's completeness, which is why this
survived several units. Whether closing that is this unit's work or a successor's is your judgment to
report, not to assume — adding a gate is not in your owned set.

## Obligation 3 — the sentence that promises future work

The terrain record names a paragraph ending in a promise about component surfaces.

**Measure before you edit.** Read whether any shipped component actually reads that token. The answer
decides whether the sentence needs correcting, narrowing, or deleting, and your report states which
and why.

## Obligation 4 — the deferral grammar

Two subsections name one idea with two table shapes. **Only one of them is reader-bound**, and the
terrain record establishes which — read it before choosing, because the constraint is one-sided rather
than symmetric.

Decide one grammar for the guide, or state in each subsection why its shape differs.

Changing the unread table's shape reaches nothing. Changing the read one's shape reaches a parser that
is off-limits to this unit, so **that direction stops and reports** rather than changing the guide and
leaving the parser behind. Say in your report which direction your choice took and why.

## Obligation 5 — no sentence claims a reading the tree does not produce

This is the design row's own criterion and the hardest to close, because nothing gates it.

Sweep the guide for claims about behaviour — a resolved value, a layer's precedence, a proof that
exists, a file that carries something. For each, either confirm it against the tree or correct it.
Report the sweep's bound: what you checked, by what pattern, and what you could not reach.

`.claude/rules/documentation.md` is explicit that a prose claim is falsified the way a code claim is:
run it and read what comes back. Where a claim sits under a fence the guide proof executes, that proof
is the check. Where it does not, you supply the reading.

## Unknowns

Settle each from the tree and report what you found.

- **Whether any shipped component reads the raised-surface token.** Named in Obligation 3.
- **Whether one deferral grammar can be chosen without touching a reader.** Named in Obligation 4.
- **How far the truth sweep can reach.** Name the bound rather than implying you read everything.

**Settled, so you do not spend the round on it: the `prove` tool is not reachable from your context.**
Your role's tool allowlist carries no MCP tool. Settle any claim with executed readings, say no receipt
was issued, and do not represent a test reading as one.

## Scope

**Owned:** `guides/veneer.md` and `guides/README.md`.

**Off-limits:** everything else. **Three files parse this guide and every one of them is off-limits:**
`tests/setupConformance.ts`, which reads the compatibility table and the selector deferrals;
`tests/guides.test.ts`, which is the parity gate; and `tests/setupStyles.ts`, which holds the guide's
path and whose proof reads the file's raw text. That is the whole reader population, derived by
searching for what opens the guide rather than by reasoning about which files look relevant.

Also off-limits: `src/**` and `app/**`, every other test file, and every path `scaffold repair`
restores.

**If a correction would require changing code, stop and report.** This unit changes the guide to match
the tree, never the tree to match the guide. A sentence that is false because the code is wrong is a
finding for another unit, not a licence to edit the code.

**Leave every compatibility row's granularity alone**, per the terrain record.

## Execution

The gate chain, in order: `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run build`, `npm test`. `npm run test:guides` is the parity gate and `npm run test:conformance`
reads the deferral table, so both are load-bearing for this unit.

On this host, heredocs, `node -e`, `node -p`, `&&` chaining, and any argument carrying `${...}` trip
the approval classifier: write a program to a file and invoke the file, keeping each shell call one
plain command.

`tmp/` is expected to be dirty and is not in your scope.

## Output

1. Each retained bound, with its ruling: closed, open and in scope, out of scope, or false.
2. The rows you added, with the value's source and the reading behind it.
3. The promise sentence: what you measured and what you did.
4. The deferral grammar: what you chose and whether a reader was affected.
5. The truth sweep: what you checked, by what pattern, what you corrected, and what you could not
   reach.
6. Each Unknown, with what you found.
7. The gate chain's exit codes and final result lines.
8. `git diff --stat` and `git status --porcelain --untracked-files=all`, actual output.
9. Anything you could not close.

No process diary.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle within your own scope: each row's wording, where
a corrected sentence sits, and which deferral grammar wins. Stop and report if this brief and the
terrain record disagree, if a correction would require a code change, if a grammar choice would reach a
reader, or if a retained bound names something you cannot verify either way.

## Acceptance criteria

Cheap first.

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npm run build` exits 0.
4. `npm run test:guides` exits 0.
5. `npm run test:conformance` exits 0, proving the deferral tables still parse.
6. The seven named tokens each have a row carrying every column the table takes.
7. The status lists only the two files this brief owns.

**Observations, not criteria.** Report each with your own reading; the authoritative run is the
Orchestrator's after you exit.

- `npm test` whole.
- Whether the token-table gap should be gated, and by what.
