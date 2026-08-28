# Unit: finding verification lane

## Role and engine

Adversarial audit-verification lane, Claude native. The Sol bench is dark this session (the `codex` CLI is absent from PATH), so every lane runs on the harness engine as a separate clean-context subagent. Your dispatch names your lane: `objective` or `subjective`. Perform the assignment directly and spawn nothing.

## Objective

Re-rule every finding in your group file from primary evidence. Each finding was produced by an earlier audit lane and claims a package violates the Orkestrel coding contract. The campaign must now separate three things with evidence that survives challenge: real drift, deliberate exceptions, and findings that are factually wrong.

## Context

- The fleet checkouts live at `/home/user/fleet/<package>` on branch `claude/orkestrel-npm-audit-deps-14ibta` (a dependency-update commit sits on top of main; it did not touch `src/`). Full git history is present. `node_modules` is installed.
- The rule canon lives ONLY in `/home/user/scaffold`: `AGENTS.md` and `.claude/rules/*.md`. Fleet repos have no vendored rules; their `AGENTS.md` is a pointer.
- Each package's guide is `/home/user/fleet/<package>/guides/<package>.md`. Guides of its dependencies sit beside it (vendored copies).
- Tests are at `/home/user/fleet/<package>/tests/`.
- Your group file names the findings. Multi-package findings list every file; all named repos are in scope for you.

## Method - both lanes

1. Read the exact rule section each finding cites, in `/home/user/scaffold/.claude/rules/` or `/home/user/scaffold/AGENTS.md`, and quote the operative sentence. A finding that paraphrases a rule can misread it; the quoted text decides.
2. Read the cited code lines AND the whole file around them AND the entity's full public surface (`types.ts`, the class, the barrel `index.ts`). Do not trust the finding's quotes; re-read the source.
3. Read the guide sections covering the symbol, and the tests that pin its behavior.
4. Check fleet precedent when the finding claims a convention: how do sibling packages under `/home/user/fleet/` shape the same thing? Name the files you compared.
5. Use git history when intent matters: `git -C /home/user/fleet/<pkg> log --oneline -- <file>`, `git log -L`, `git show`. A commit message or an earlier shape can prove a pattern was chosen, not drifted into.
6. You may run scoped read-only commands (grep, ls, git). You may run a scoped test file if a behavioral question needs it. Never edit any repo file, never run format/lint fixes, never install anything, never commit.

## Lane charters

- `objective` lane: REFUTE each finding. Assume it is wrong until the code and the rule text force you to concede. A finding survives only if the cited code actually does what the finding says AND the quoted rule text actually bans it AND the ban applies to this case. Hunt for: misquoted code, misread rules, cited lines that do not exist, rules with exemption clauses the finding skipped, repairs that break the published surface or tests.
- `subjective` lane: hunt for the deliberate reason. Assume each flagged pattern is a choice someone made on purpose, and go find why: guide passages, TSDoc rationale, tests pinning the exact behavior, symmetry with sibling entities in the same package, uniform fleet convention, commit history. Judge the broader API: would the proposed repair damage coherence, ergonomics, or the published surface? Only when the hunt comes back empty do you rule DRIFT.

## Verdicts

- `DRIFT` - the violation is real, the rule applies, no deliberate-exception evidence exists, and the proposed repair direction is sound.
- `DRIFT-RESHAPE` - the violation is real but the proposed repair is wrong or harmful; state the correct repair.
- `EXCEPTION` - the pattern is deliberate and evidenced: cite the exact guide line, test, rule exemption clause, or history that proves it. "It looks intentional" is not evidence.
- `INVALID` - the finding misreads the code or the rule. Quote both sides to prove it.

Re-rule findings the original auditor marked EXEMPT too; an EXEMPT granted without evidence flips to DRIFT.

## Output

Return through the structured-output tool: for every finding id in your group file, a verdict object with `id`, `verdict`, `confidence` (high/medium/low), `rule_quote` (the operative rule sentence, verbatim), `evidence` (array of `path:line - short quote or fact` strings; minimum one, and for EXCEPTION/INVALID the proving citation), `reasoning` (short), `repair` (`stands`, `drop`, or `amend: <what instead>`). Cover every id; skip none.

## Deviation contract

If a group file names a path that does not exist or a repo that is missing, rule that finding INVALID with the evidence and continue; do not stop the unit.
