# Unit canon-fixup — close the canon audit round's findings

## Role and engine

`builder` on Claude Sonnet, a native subagent in `/home/user/scaffold`, the sole writer in that tree. Perform the assignment directly and spawn nothing. Every row is fully specified; the thinking happened upstream.

## Objective

Land every row below as exact text, so the canon audit's BROKEN claim, its findings outside the claims, and its referrals close, with the gate chain green and `host.json` regenerated.

## Context

**Law.** `AGENTS.md` § Writing and § Instruction files; `.claude/rules/writing.md`; `.claude/rules/documentation.md` § Workflow skills. Never write `should`; no count in prose; a directive per line.

**Evidence.** The objective lane's verdict (`.orkestrel/campaign/debrief/canon-audit-objective.md`), the checker's (`canon-audit-checker.md`), and the subjective lane's (`canon-audit-subjective.md`), each verbatim. The baseline is commit `18eb2fc`; the tree is clean.

**Host.** POSIX shell in `/home/user/scaffold`, Node 22, no network needed. `npm run build` regenerates `host.json`; `npm test` fails on a stale inventory until it runs, so run the chain in the acceptance order.

**Standing conditions.** None.

## Unknowns

None.

## Scope

**Owned.** `.codex/agents/grok.toml`; `.codex/agents/opus.toml`; `.claude/agents/checker.md`; `.claude/rules/names.md`; `.agents/skills/orkestrel-falsify/SKILL.md`; `.agents/skills/orkestrel-falsify/references/brief.md`; `.agents/skills/orkestrel-polish-surface/references/capture-harness.md`; `.agents/skills/enterprise-bootstrap/references/components.md`; the files the subjective rows below name; `host.json` (regenerated, never edited).

**Off-limits.** Every other file, `AGENTS.md` and `CLAUDE.md` included.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage, push, install, or run a discarding git command.

## Rows

1. **`.codex/agents/grok.toml`** — replace `The journal's first event carries the session_id that resumes the run;` with `The journal's first event carries the session_id that is the run's recovery handle;`.
2. **`.agents/skills/orkestrel-falsify/references/brief.md` § The read-only audit lane's brief** — replace the paragraph beginning `Omit the rows a writer needs and a lane cannot use:` with: `Omit the rows a writer needs and a lane cannot use: owned, shared, and off-limits files; the Execution line's writer form, keeping the sentence that the lane performs the assignment directly and spawns nothing; and acceptance criteria stated as gate commands. A lane that holds no shell cannot close a gate criterion, so a brief handing it one is asking for a ruling on the writer's report.`
3. **`.claude/rules/names.md` § General vocabulary** — replace the bullet opening `Mirror no banned word: a mirrored name never uses` with: `Outside a declared wire body, a mirrored name never uses \`kind\` or \`type\` as a member name, and never uses a word § Rejected naming lists. A Compound File Binary (CFB) directory entry's object-type byte takes a named discriminant.` Keep the following declared-wire-body bullet unchanged.
4. **`.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape** — in the value table, extend the `UNRESOLVED` row's evidence cell so it reads `what would settle it; a claim whose only evidence is the writer's own report takes this value`. Keep the table aligned.
5. **`.agents/skills/orkestrel-falsify/SKILL.md` § Run the round** — replace the bullet `A round run with one lane is a deviation. Record it rather than glossing it. If an engine is unavailable, the remaining engine runs every lane — it never drops one.` with: `A round that runs fewer lanes than its brief names records the deviation with the round's own reason; \`.agents/orchestration.md\` § Execution loop owns the lane rule and § Engine assignment owns the substitution.`
6. **`.agents/skills/orkestrel-polish-surface/references/capture-harness.md`** — replace `Confirm the artifact that should decide the item exists` with `Confirm the artifact that decides the item exists`.
7. **`.agents/skills/enterprise-bootstrap/references/components.md`** — replace `and why SPAs should prefer framework wrappers` with `and why an SPA prefers a framework wrapper`.
8. **`.codex/agents/opus.toml`** — after the sentence ending `and tree-wide mutating gates.`, add a paragraph: `Every authority the brief references exists in the tree the run is rooted in; propagate a missing file rather than restating it, and take the stale-authority branch in .agents/skills/orkestrel-falsify/references/brief.md § "What not to put in a brief" where the tree carries a superseded vendored copy.`
9. **`.claude/agents/checker.md`** — replace `addressed to the subjective lane when it is running and to the Orchestrator when it is not` with `addressed to the subjective lane when it is running and to the Orchestrator when you hold every lane it names`.
10. **`.claude/agents/planner.md`** — replace the `Measurements` bullet (`- \`Measurements\`: the readings that bound the design, each with the command that\n  produced it.`) with: `- \`Measurements\`: the readings the dispatch supplied that bound the design, each with the command the Orchestrator ran. Name a reading the design needs and the dispatch did not supply under \`Tensions\`.` Wrap at the file's width.
11. **`.codex/agents/planner.toml`** — replace `and the measurements that bound the\ndesign.` with `and the measurements the dispatch supplied that bound the design, each with the command the Orchestrator ran, naming under tensions a reading the design needs and the dispatch did not supply.` Reflow the paragraph at the file's width.
12. **`.codex/agents/grok.toml`** — after the sentence ending `probed before its first use.`, add: `Read the .err journal before calling a run empty; a launch that never reached the model leaves its refusal there and nothing in the .jsonl journal.`
13. **`.agents/orchestration.md` § The engines** — replace `Design runs the adversarial pass. An audit runs the lanes its round names, with at least one whose engine did not write the work.` with `Design runs the adversarial pass. § Execution loop step 5 fixes which lanes an audit runs.`
14. **`.agents/orchestration.md` § Execution loop step 5** — replace `A round that runs fewer lanes than its brief names records the deviation in its verdict file with that round's own reason, never a template sentence.` with `A round that runs fewer lanes than its brief names, or omits the checker its criteria call for, records the deviation in its verdict file with that round's own reason, never a template sentence.`
15. **`.agents/orchestration.md` § Publishing the fleet and § Fixing a dependency before it publishes** — replace the paragraph `A wave over unpublished tips derives its order per run from the graph and records only the round each package landed in, never the order itself. It runs one unit per checkout, at that checkout's catalog layer, and gives a checkout with no rows an adopt unit only when that checkout's typecheck against the staged closure reddens.` with the single sentence `A wave over unpublished tips derives its order per run from the graph and records only the round each package landed in, never the order itself.` Then, in § Fixing a dependency before it publishes, add a bullet directly before the `Fetch and merge the dependency's default branch` bullet: `- **Run one unit per checkout, at that checkout's catalog layer.** Give a checkout with no rows an adopt unit only when its typecheck against the staged closure reddens.`
16. **`.agents/orchestration.md` § Writing concurrency item 1** — replace `Run one writing executor per checkout and keep the checkouts disjoint; in a single checkout that is one writer at a time. Commit a checkpoint before each writing dispatch so git is the rollback mechanism.` with `Serialize writers as § Permission floor states: one per checkout, checkouts disjoint. Commit a checkpoint before each writing dispatch so git is the rollback mechanism.`
17. **The writer-serialization vocabulary** — replace `in the main checkout, one writer at a time` at `.agents/orchestration.md` § Execution loop step 3 with `in the checkout the unit writes, one writer per checkout`; replace `main checkout, sole serial writer from a clean committed` at `.agents/transports/codex.md` with `the checkout the route writes in, its sole serial writer from a clean committed`; in the `description` frontmatter of `.claude/agents/builder.md`, `.claude/agents/implementer.md`, and `.claude/agents/application.md` replace `in the main checkout` with `in the checkout the unit writes`; in `.codex/agents/implementer.toml` replace `as the sole serial writer in the main checkout` with `as the sole serial writer in the checkout the unit writes` and `within the main checkout` with `within the checkout the unit writes`; in `.codex/agents/opus.toml` replace `in the main checkout, as the sole\nserial writer` with `in the checkout the unit writes, as its sole\nserial writer` (reflow at the file's width). Owned for this row: those seven files.
18. **`.claude/agents/reviewer.md` frontmatter** — replace `Reads the actual diff when the round's triggers name this lane.` with `Reads the actual diff on every nontrivial audit round, holding the subjective lane by default and the objective lane when the dispatch assigns it.`
19. **`.agents/skills/orkestrel-falsify/references/brief.md` § The read-only audit lane's brief** — replace the bulleted row list (from `- **Role and lane.**` through `- **Output.** The verdict shape and its single terminal line.`) with one paragraph: `Give a lane every row § Anatomy names — the subject with the evidence § "Evidence, by subject type" requires of each row it occupies, what the round decides, already established, the numbered falsifiable claims, the unknowns, and the threshold — plus two rows of its own: **Role and lane** (the role, its engine, and which lane it holds) and **Output** (the verdict shape and its single terminal line). Review evidence folds into the subject.` Keep the following `Omit the rows…` paragraph as row 2 lands it.
20. **`.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape item 3** — after `worth nothing to it.` add the sentence: `A claim's own \`CONFIRMED\` line already carries the evidence that convinced the auditor, so list here only the attacks no verdict line carries and the adjacent behaviour.`
21. **`.claude/rules/architecture.md` § Kind purity** — reflow the bullet that carries the `entity` definition (the line running past the file's width) at the width its neighbours wrap to, changing no words.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/canon-fixup-report.md`: per row `applied` with the landed sentence, or `stopped` with the deviation; the sweep `grep -rniE '\b(should|robust|performant)\b' .agents .claude .codex CLAUDE.md` excluding `.claude/rules/writing.md`, which must return nothing; each gate command with its exit code. Write `tmp/units/canon-fixup.diff` (`git diff HEAD`) and `tmp/units/canon-fixup.status` (`git status --short`). Return the report's content.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done — when a row's text is not found verbatim at the named place or when a gate fails. Decide and record an ancillary question: table alignment, line wrapping at the file's width.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npm run build` exits 0.
5. `npm test` exits 0.
6. The `should`/`robust`/`performant` sweep returns nothing outside `.claude/rules/writing.md`.
7. `git status --short` lists only Owned files plus `host.json`.
