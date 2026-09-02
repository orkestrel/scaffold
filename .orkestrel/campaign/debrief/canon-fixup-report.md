# Unit canon-fixup — report

## Per row

1. **applied** — `.codex/agents/grok.toml`: `The journal's first event carries the session_id that is the run's recovery handle;`
2. **applied** — `.agents/skills/orkestrel-falsify/references/brief.md` § The read-only audit lane's brief: replaced the paragraph beginning `Omit the rows a writer needs and a lane cannot use:` with the landed text naming `the Execution line's writer form, keeping the sentence that the lane performs the assignment directly and spawns nothing`.
3. **applied** — `.claude/rules/names.md` § General vocabulary: `Outside a declared wire body, a mirrored name never uses \`kind\` or \`type\` as a member name, and never uses a word § Rejected naming lists. A Compound File Binary (CFB) directory entry's object-type byte takes a named discriminant.` The following declared-wire-body bullet is unchanged.
4. **applied** — `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape: extended the `UNRESOLVED` row's evidence cell to `what would settle it; a claim whose only evidence is the writer's own report takes this value`, keeping the table aligned.
5. **applied** — `.agents/skills/orkestrel-falsify/SKILL.md` § Run the round: replaced the one-lane-deviation bullet with `A round that runs fewer lanes than its brief names records the deviation with the round's own reason; \`.agents/orchestration.md\` § Execution loop owns the lane rule and § Engine assignment owns the substitution.`
6. **applied** — `.agents/skills/orkestrel-polish-surface/references/capture-harness.md`: `Confirm the artifact that decides the item exists`.
7. **applied** — `.agents/skills/enterprise-bootstrap/references/components.md`: `and why an SPA prefers a framework wrapper`.
8. **applied** — `.codex/agents/opus.toml`: added the paragraph beginning `Every authority the brief references exists in the tree the run is rooted in` after the sentence ending `and tree-wide mutating gates.`
9. **applied** — `.claude/agents/checker.md`: `addressed to the subjective lane when it is running and to the Orchestrator when you hold every lane it names`.
10. **applied** — `.claude/agents/planner.md`: replaced the `Measurements` bullet with the landed two-sentence form, wrapped at the file's width.
11. **applied** — `.codex/agents/planner.toml`: replaced `and the measurements that bound the design.` with the landed sentence naming the dispatch-supplied readings, the Orchestrator's command, and the tensions carve-out, reflowed at the file's width.
12. **applied** — `.codex/agents/grok.toml`: added `Read the .err journal before calling a run empty; a launch that never reached the model leaves its refusal there and nothing in the .jsonl journal.` after `probed before its first use.`
13. **applied** — `.agents/orchestration.md` § The engines: `Design runs the adversarial pass. § Execution loop step 5 fixes which lanes an audit runs.`
14. **applied** — `.agents/orchestration.md` § Execution loop step 5: the exact old text sat split across two lines inside the step-5 paragraph (`… never in place of a lane. A round that runs fewer lanes than its brief names records the deviation in its verdict file with that round's own reason, never a template sentence.`); replaced with the landed text adding `or omits the checker its criteria call for,`.
15. **applied** — `.agents/orchestration.md` § Publishing the fleet and § Fixing a dependency before it publishes: collapsed the wave paragraph to the single sentence, and added the new `Run one unit per checkout, at that checkout's catalog layer.` bullet directly before the `Fetch and merge the dependency's default branch` bullet.
16. **applied** — `.agents/orchestration.md` § Writing concurrency item 1: replaced with `Serialize writers as § Permission floor states: one per checkout, checkouts disjoint. Commit a checkpoint before each writing dispatch so git is the rollback mechanism.` (the source line wrapped `mechanism.` onto its own third line; folded into two lines as landed.)
17. **applied, with one file not found** — writer-serialization vocabulary, across the seven named files:
    - `.agents/orchestration.md` Execution loop step 3: `in the checkout the unit writes, one writer per checkout`.
    - `.agents/transports/codex.md`: `the checkout the route writes in, its sole serial writer from a clean committed`.
    - `.claude/agents/builder.md` frontmatter: `in the checkout the unit writes`.
    - `.claude/agents/implementer.md` frontmatter: `in the checkout the unit writes`.
    - `.claude/agents/application.md` frontmatter: **stopped** — expected `in the main checkout` in the `description` field; found the field reads `'Implements one fully specified Orkestrel app-layer unit — app contracts, environment-isolated config, runtime entries, real host tests, guide parity. Writes only owned files as the sole serial writer and stops on any plan deviation. Nontrivial app design belongs to GPT-5.6 Sol or Opus 5.'`, which carries no `in the main checkout` clause at all. Not done; no edit applied to this file.
    - `.codex/agents/implementer.toml`: `as the sole serial writer in the checkout the unit writes` and `within the checkout the unit writes`.
    - `.codex/agents/opus.toml`: `in the checkout the unit writes, as its sole\nserial writer` (reflowed).
18. **applied** — `.claude/agents/reviewer.md` frontmatter: `Reads the actual diff on every nontrivial audit round, holding the subjective lane by default and the objective lane when the dispatch assigns it.`
19. **applied** — `.agents/skills/orkestrel-falsify/references/brief.md` § The read-only audit lane's brief: replaced the bulleted row list with the single paragraph naming § Anatomy, the two lane-only rows, and `Review evidence folds into the subject.` Kept the following `Omit the rows…` paragraph as row 2 landed it.
20. **applied** — `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape item 3: added `A claim's own \`CONFIRMED\` line already carries the evidence that convinced the auditor, so list here only the attacks no verdict line carries and the adjacent behaviour.` after `worth nothing to it.`
21. **applied** — `.claude/rules/architecture.md` § Kind purity: reflowed the over-width bullet line (98/99/93/**143**/63 characters across its five lines) to 92/97/20 characters for its final two lines, changing no words.

## Sweep

`grep -rniE '\b(should|robust|performant)\b' .agents .claude .codex CLAUDE.md` excluding `.claude/rules/writing.md` returned nothing.

## Gates

1. `npm run format:check` — exit 0 (after landing the edits, `oxfmt` reformatted whitespace-only in `.agents/skills/orkestrel-falsify/SKILL.md` and `.claude/agents/reviewer.md`; re-run confirmed `All matched files use the correct format.`).
2. `npm run lint:check` — exit 0.
3. `npm run check` — exit 0.
4. `npm run build` — exit 0; regenerated `host.json` (116 entries staged).
5. `npm test` — exit 0; 431 + 244 + 111 + 46 + 17 tests passed across the five projects.

## Status

`git status --short` lists exactly the Owned files touched by rows 1–21, plus `host.json` regenerated by the build. `.claude/agents/application.md` carries no changes because row 17's text was not found there (see row 17 above).

## Deviation

Row 17, `.claude/agents/application.md` only: expected the `description` frontmatter to contain `in the main checkout`; found no such clause in that file's description. Done for the other six files named in row 17; not done for `.claude/agents/application.md`. Hypothesis: that file's description was already written without the phrase, so the row's premise does not hold there.
