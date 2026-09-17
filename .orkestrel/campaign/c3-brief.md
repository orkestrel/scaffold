# Unit C3 — the contract laws the campaign's un-re-runnable units trace to

## Role and engine

`opus` — Opus 5, native Claude subagent, the **scaffold** checkout at
`C:\Users\mikes\WebstormProjects\scaffold`, sole serial writer. Units C1 and C2 have exited; their
work is uncommitted in the tree and is not yours to revert or claim.

## Objective

Land the contract-law findings from the instruction-set audit, and the two patches unit C2 returned
for files it did not own.

## The voice law

`AGENTS.md` § Instruction files. Every line is a directive. No clause written to persuade or explain
to a person. No count of a growable set. Give a rule one home.

## Finding O1 + F2 — retention produces a record whose cross-references resolve to nothing

`.agents/orchestration.md` § Dispatch anatomy copies a unit's artifacts into `.orkestrel/<package>/`
and sweeps `tmp/`. It never rewrites the `tmp/` paths inside a copied artifact, and it does not
require an audit round's lane briefs to be retained at all.

The campaign's own record, verbatim:

- `.orkestrel/scaffold/s1-brief.md` orders "Read `tmp/units/s1-report.md` in full before starting."
  The retained file is `s1-report-attempt-1.md`. That brief's section on what the first attempt
  settled is unreadable, so a re-run re-derives it.
- `.orkestrel/scaffold/s2-brief-2.md` supersedes `tmp/units/s2-brief.md`, retained under a different
  name.
- `.orkestrel/scaffold/s3-audit-objective-brief.md` points its lane at `tmp/audit/s3-audit-claims.md`;
  the claims are retained as `s3-audit-claims.md`.
- `.orkestrel/roughnotes/redesign-design-brief.md` stages its whole authority set into
  `roughnotes/tmp/authority/` and forbids the only surviving copy. No reader can now check what law
  either design lane was held to.
- The scaffold folder holds a checker report with no checker brief, audit lane reports with no
  briefs, and no `verifier` brief for any round. The checker brief is the one that caused the
  round-one deviation and the one nobody can now read.

**The change.** Add to the retention bullet, after the sentence ending "then sweep only the `tmp/`
launch copies":

```text
  Rewrite every `tmp/` path inside a copied artifact to the retained path it now names, in the same
  action that copies it. A retained file naming a launch copy resolves to nothing after the sweep,
  and the successor, the claim list, and the staged authority are the three that always do.
  Retention covers every lane of an audit round, including the lane whose brief produced a
  deviation: a round with a retained report and no retained brief cannot be re-run.
```

Add, as its own directive in the same section:

```text
- Before dispatching a successor or accepting a round, open every file the effective brief names
  and confirm it resolves from the executor's root. Refuse the transition when one does not.
```

## Finding F7 — "amend" and "the original stays" prescribe opposite artifacts

The same bullet says to amend a brief on re-run, and then that a correction produces a successor
file while the original stays. One bullet, two mechanisms. This campaign resolved it both ways: unit
S1 amended in place and its first-attempt brief is not retained; unit S2 produced a successor pair.

**The change.** Replace the amend sentence with:

```text
- Re-run a unit with a successor brief, never with an edit to the brief it already ran. Name the
  successor `<unit>-brief-<n>.md`, state in it what changed and why, and leave the original in place
  unedited. A fix round's brief names the findings it carries and where each came from.
```

## Finding F5 — the brief template's rows are not binding

The contract says to fill `.agents/templates/brief.md` and then run the checklist against what you
filled. Every brief in both campaign folders uses bespoke headings, and the template rows that went
missing are the ones that map onto the deviations the campaign hit: the row naming what asserts the
state the change ends, and the row naming the executor's tools and limits.

A row that was never written has no heading to be missing, so the checklist passes by eye.

**The change.** Replace the sentence directing the template's use with:

```text
Fill `.agents/templates/brief.md`, keeping its section and row headings verbatim, so a row you
cannot close is visible as a heading with a named unknown under it rather than as an absence nobody
can see. Add a section the unit needs; never drop one. Then run this checklist against what you
filled.
```

## Finding F8 — the shared claims file has no home in doctrine

Every audit round in this campaign ran from one numbered-claims file both lanes were pointed at, in
a directory the contract does not name. That artifact is what makes "both lanes ran the same brief"
checkable after the round, and every verdict's reconciliation table is keyed to it. It is named in
no instruction file.

**The change.** In `.agents/skills/orkestrel-falsify/references/brief.md`, replace the opening
sentence of the numbered-claims paragraph with:

```text
**Numbered falsifiable claims.** Write them to one file both lanes are pointed at,
`tmp/audit/<unit>-audit-claims.md`, retained beside the round's verdict. One file is what makes
"both lanes ran the same brief" checkable after the round, and each lane's own brief then carries
only its role, its lane, its evidence slice, and its output shape.
```

Name the same pair in `.agents/orchestration.md` where the audit round's artifacts are fixed.

## Unit C2's returned patches

Apply both. C2 did not own either file.

**The last deviation restatement.** `.agents/orchestration.md` § Required sections still restates
the rule whose home C2 moved:

```diff
-- **Deviation contract.** The required stop-and-report behaviour for writers, scoped. A conflict
-  with the primary objective stops the unit. An ancillary conflict — where a paragraph sits, which
-  heading a section takes — is the executor's to decide, record, and carry on from. An unscoped
-  contract stops a unit over a detail it was equipped to settle.
+- **Deviation contract.** Point the writer at § Deviation protocol and scope it: name the ancillary
+  choices this unit settles itself — where a paragraph sits, which heading a section takes. An
+  unscoped contract stops a unit over a detail it was equipped to settle.
```

**The read-only Cursor driver.** `.codex/agents/grok.toml` is pinned `read-only`, its description
says it drafts the brief and journals the run, and `.agents/transports/cursor.md` requires both
writes. This is the defect C2 fixed for the Claude transport, one bench over.

Add to `.agents/transports/cursor.md`, after the paragraph directing the chain to a run script:

```text
A driver pinned `workspace-write` writes the brief and the run script itself. A driver pinned
`read-only` writes nothing at all — not the brief, not the script, not the journal: return the
brief text, its intended path, the resolved command, and the journal and `.err` paths, and the
Orchestrator writes them and launches the run. Check your own pinned sandbox before drafting, and
take the branch that matches it.
```

Add to `.codex/agents/grok.toml`, before its return paragraph:

```text
Your sandbox is read-only: you never edit a file and never write your report to a file. You
therefore write neither the brief nor the journal. Return the brief text, its intended path, the
resolved command, and the journal path, and the Orchestrator writes the brief and launches the run.
A dispatch that names a report path for you is a dispatch defect — return your result as your final
message and name the defect in it.
```

Change its description from drafting and journaling to returning the brief text, its intended path,
and the resolved command for the Orchestrator to write and launch, matching the wording C2 landed in
`.codex/agents/reviewer.toml`.

## Scope

**Owned files:** `.agents/orchestration.md`, `.agents/templates/brief.md`,
`.agents/transports/cursor.md`, `.codex/agents/grok.toml`,
`.agents/skills/orkestrel-falsify/references/brief.md`.

**Off-limits:** every other skill directory — a later unit owns them; `.claude/rules/`; `src/`,
`configs/`, `guides/`, `dist/`, `package.json`, `.orkestrel/`; `host.json` by hand; the roughnotes
and test checkouts.

Do not bump a version and do not publish. Do not commit or push. Run no `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

1. The retention bullet requires rewriting `tmp/` paths and covering every audit lane's brief, and a
   pre-transition resolve check exists as its own directive.
2. The successor-brief rule names one mechanism, and no sentence in the contract still says to amend
   a brief in place.
3. The template directive requires the headings verbatim.
4. The claims-file pair is named in the falsify reference and in the orchestration contract.
5. Both of C2's patches are applied.
6. `npm run format:check` and `npm run lint:check` are clean. If `format:check` reports a file you
   did not touch, name it and report rather than fixing it.
7. `npm run build` succeeds; report the `host.json` delta and confirm every entry traces to a file
   you touched.
8. `npm test` exits 0 and `npm run test:distribution` exits 0.
9. `git status --short` distinguishes your files from those C1 and C2 left modified.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol, which unit C2 rewrote — read it as it now
stands. The ancillary choices you settle yourself: where a new directive sits within its section,
and which heading a new paragraph takes.

## Output

Write your report to `tmp/units/c3-report.md`, and make your final message the same content: done or
not done per criterion; each law's before and after; the gates; and what you did not close.

No process diary.
