# Unit G1 — Absorb the Veneer campaign record against the tenets

## Role and engine

`grok` on Cursor Grok 4.7 (`grok-4.7-high`), reached through the Cursor CLI in `--mode=ask`
(read-only). You are the bench engine reading this brief inside your own CLI: perform the assignment
directly and spawn nothing.

## Question

What does the Veneer campaign record under `/home/user/scaffold/.orkestrel/veneer/` establish — the
plan's structure and unit status, the standing rulings, the open questions, the deferrals, the retained
instruments — and where does the plan or a retained artifact contradict, omit, or drift from each tenet
in `/home/user/scaffold/.orkestrel/veneer/tenets.txt`?

## Scope

Read-only. Read, in this order:

1. `/home/user/scaffold/.orkestrel/veneer/tenets.txt` (the judging standard; read it whole first).
2. `/home/user/scaffold/.orkestrel/veneer/handoff.md` (whole).
3. `/home/user/scaffold/.orkestrel/veneer/plan.md` (whole; it is large — read every section, the
   re-baseline records included).
4. `/home/user/scaffold/.orkestrel/veneer/research.md` and the files under
   `/home/user/scaffold/.orkestrel/veneer/research/` (skim the `.md` files; do not read `.json` or
   `.mjs` beyond their first lines).
5. `content-layout-design-verdict.md`, `plan-v2-audit-verdict.md`, `plan-v2-planner-verdict.md`,
   `plan-v2-analyst-verdict.md`, `plan-conformance-verdict.md`, `veneer-conformance-verdict.md`,
   `cl13-verdict.md`, `u7f-verdict.md`, `u6-design-verdict.md`, `u7-design-verdict.md`,
   `styles-axis-design-verdict.md` under the same folder.
6. The `units/` folder: list its file names; read only `units/remaining-surface.md`,
   `units/value-accounting-finding.md`, and `units/capability-question-finding.md` whole.

Do not read `node_modules`, `.git`, or anything outside `/home/user/scaffold/.orkestrel/veneer/`.
Do not edit, create, or delete any file. Run `git -C /home/user/scaffold status --porcelain` before
reading and again before answering, and report both outputs verbatim.

## Output

Return evidence only: no decisions, no recommendations, no design proposals. Cite every fact as
`file:line` (path relative to `/home/user/scaffold/.orkestrel/veneer/`). Quote at most two lines per
citation. Never paste a section whole. Keep the whole answer under 450 lines. Use exactly these
headings:

### A. Plan map
One row per plan section and per unit (U1 … U7, U-styles, CL0 … CL13, and every unit the re-baseline
records name): its status as the plan states it (landed with the Veneer commit id, open, deferred,
struck), with the `plan.md:line` where that status is stated. Then the plan's stated exit criterion,
quoted, with its line.

### B. Tenet matrix
One block per tenet in `tenets.txt` (every product tenet and every execution constraint, in file
order). For each: (1) the plan or handoff passages that address it (`file:line`), (2) passages that
contradict it or narrow it (`file:line`, quote ≤ 2 lines, state the contradiction in one sentence),
(3) write `no passage addresses this tenet` when none does. Treat a deferral of something a tenet
requires as a narrowing and list it under (2).

### C. Standing rulings
Every ruling the record attributes to the user, one line each, with `file:line`. Include model and
bench routing rulings.

### D. Open questions and carried bounds
Every open question awaiting the user and every carried bound, each with its named carrier or
`no carrier named`, with `file:line`.

### E. Deferrals
Everything the plan or verdicts defer or exclude (Vue, showcase, RTL, families, keys, proofs), each
with `file:line` and the stated reason in ≤ 1 sentence.

### F. Retention integrity
Name the pattern and the paths you swept. Report: retained files still naming a `tmp/` launch path;
verdict files with no claims file of the same unit and round, or the reverse; reports under `units/`
with no brief of the same name, or the reverse. Report each as a list of file names, bounded to what
the sweep found.

### G. Unknowns
Facts the question needs that you could not establish from the files read, one line each. No
recommendations.

### Journal
The `git status --porcelain` outputs, before and after.
