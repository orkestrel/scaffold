# CL10 audit round 2 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. **Astra wrote this fix round, so you hold the OBJECTIVE
lane** (correctness under the shipped cascade and the pinned inventory, rule compliance, test
sufficiency, scope honesty) and the Astra analyst holds the subjective lane. The lanes are swapped
back from round 1, where Opus wrote the work and Astra held this lane.

Read the work as work you did not write. Perform the assignment directly and spawn nothing. You edit
nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-audit-2-claims.md`
with CONFIRMED, REFUTED, or UNPROVEN and the deciding evidence, add any extra finding that is an
implementation defect (numbered after the last claim, with a site and a one-line failure scenario,
distinguishing one that forces another round from one that does not), and end with one terminal line:
`Verdict: accept`, or `Verdict: fix round` with the claims that force it.

## Three standing instructions about your own evidence

**Cite every site by its symbol** — the case title, the export name, the selector. Give a line number
only as "currently around N".

**Before confirming any claim about a proof, name the mutation that would make that proof fail**, and
say whether the proof's assertions distinguish that mutation from the passing case. Where you cannot
name such a mutation, the claim is UNPROVEN rather than CONFIRMED.

**Read a regular expression out of the file's own bytes, never from a transcription.** The
Orchestrator hand-copied this round's boundary expression into a probe, the backslash escaping came
out different, and the probe reported a regression that does not exist. You hold no shell, so you
cannot run it — which means you must reason from the exact characters in the file and say so, and mark
the claim UNPROVEN rather than guess if the escaping is beyond what you can settle by reading.

## What is closed

**Round 1 accepted the shipped cascade.** Both judgment lanes agreed the three helper keys ship whole
with nothing extra and nothing deferred; the precision ruling, the departures, the showcase placement,
and the scope honesty were confirmed; and the gates ran green. `cl10-audit-verdict.md` records it.

**Do not re-litigate a round-1 claim.** Rule on what this round changed, and on whether closing each
finding left the accepted behaviour intact. A finding that reopens round 1 is out of scope unless this
round's edits actually broke it.

## Evidence

The Orchestrator rendered the diff over the CL9 landing `5e011a3` — carrying round 1 and the fix
together — at `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-diff-2.patch`, and the status at
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-status-2.txt`.

Read those and these files in the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`:

- `tests/setupStyles.ts` — the admission expression in `collectGridVocabulary`, the ratio case table,
  and the icon-link markup constant
- `tests/setupStyles.test.ts` — the extended boundary control, the icon-class comparison, the freeze
  assertion, the normalizer regression case, and the export-list assertion
- `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` — the extracted reader and its proof
- `tests/src/styles/components/icon-link.test.ts` and `ratio.test.ts` — the cases that changed
- `src/styles/components/_ratio.scss` — the destructured loop
- `guides/veneer.md` — the icon-link compatibility row's Notes cell
- the built `dist/src/styles/index.css` and `dist/src/styles/index.rtl.css`
- `tests/fixtures/oracle/inventory.json` as the record

Read `tests/setupConformance.ts` as the machinery the accounting must satisfy and as the importer of
the selector normalizer, never as a file this round could edit. Read `node_modules/@orkestrel/test/dist/src/browser/index.d.ts`
for the installed reader surface, which claim 9 turns on.

Read the retained records under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: the
effective brief `units/cl10-brief-2.md` over `units/cl10-brief.md`, the measurements
`units/cl10-fix-terrain.md`, the report `units/cl10-report-2.md`, round 1's report
`units/cl10-report.md`, and round 1's verdict `cl10-audit-verdict.md`.

The briefs deliberately restate no measurement: the terrain records are the single home for them, and
where a brief and a record disagree the record and the tree win.

The law lives in the scaffold checkout: `AGENTS.md` at the Veneer checkout root redirects there, and
the rule files are under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`, with `tests.md`,
`styles.md`, `architecture.md`, and `names.md` in particular.

## Push hardest on these

- **Whether the boundary fix is correct for every prefix, not only the helper keys.** The defect it
  closes reached the grid and table prefixes too. Read the expression character by character and rule
  on each refusal class the terrain names, and on whether the punctuation boundaries the cascade
  actually uses are still admitted — the descendant combinator, the child combinator, the pseudo-class
  colon, the pseudo-element double colon, the attribute bracket, the comma, and the chained class dot.
- **Whether `caption-top`'s exact-name restriction survived the restructure.** It moved from its own
  branch into the shared alternation with a negative lookahead. Rule on whether that is equivalent.
- **Whether the extracted reader belongs where it went, and whether it duplicates an installed
  export.** `.claude/rules/tests.md` makes a setup-module export whose name or job matches an
  installed export a defect whichever file declared it first.
- **Whether narrowing the freeze assertion weakened what it proved.** Name what a mutation to an
  object-bearing table would still break, and what a mutation to a primitive-entry table would now
  no longer break, and rule on whether that trade is right.

## Scope of findings

The user has ruled that audits cover implementation only: report no wording, comment, doc-block, or
guide-prose finding. The one exception is that the guide's compatibility, variable, and departure rows
are in scope as a contract, judged on their facts being true of the code.
