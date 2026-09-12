# Repair the measured skill-policy drift

## Role and objective

Act as the native builder on the harness mechanical tier. Correct only the drift reported by the root's isolated policy run. Execute directly and spawn nothing.

## Context

Read `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.agents/orchestration.md`, `.claude/rules/writing.md`, `.claude/rules/documentation.md`, and `.claude/rules/quality.md`. Use `C:/Users/mikes/.codex/skills/.system/skill-creator/SKILL.md` for this narrow existing-skill repair. Read the affected skill text as editing context; no UI workflow is being requested. Read `guides/README.md` and the host inventory/ownership sections of `guides/scaffold.md`.

The canonical checkout is `C:/Users/mikes/WebstormProjects/scaffold`, on `main` at `116010815ba1ecf62e070cc945221b881d161893`. Its existing dirty hook, metadata, fixtures, inventory, and campaign changes are intentional and unaccepted. They must remain untouched. No checkpoint is made over the red release tree. The affected skill files themselves are committed and clean; their recorded preceding commit is `354a3311 update enterprise-bootstrap`.

Read `tmp/pass/d7n-scaffold-hook-policy-red/action.stderr.txt`, `status.txt`, and `diff.txt`. Root ran `npm run test:policy` alone and received exit 1. Its bridge mismatch and banned-term findings define the entire scope.

## Owned edits

- `.claude/skills/enterprise-bootstrap/SKILL.md`: replace only its frontmatter description with the canonical description from `.agents/skills/enterprise-bootstrap/SKILL.md`.
- `.agents/skills/enterprise-bootstrap/SKILL.md`: replace `where things should scale together` with `where elements must scale together`.
- `.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md`: replace `where columns should scale together` with `where columns must scale together`.
- `.agents/skills/enterprise-bootstrap/references/color-modes.md`: replace `the one element that should dominate` with `the primary element`.
- `.agents/skills/enterprise-bootstrap/references/frontend-design.md`: replace `the one element that\nshould dominate` with `the primary\nelement`.
- `.agents/skills/enterprise-bootstrap/references/inspection.md`: replace `not just` with `not merely` at the reported assertion sentence.

## Boundaries

You are not alone in the checkout. Preserve all other edits. Do not edit tests or suppress policy. Do not redesign the skill, add capabilities, dependencies, APIs, files, or package metadata. Never read secrets or auth files. Use `apply_patch` for edits and forward-slash paths. Address git with `git -C C:/Users/mikes/WebstormProjects/scaffold`. Never commit, push, install, build, run tree-wide mutating commands, or use discard-class git operations. Root owns gates and inventory regeneration.

## Completion and return

Return the touched paths, exact diff, and `git diff --check` result. The bridge must match the canonical description, each reported term must be removed without changing the guidance's meaning, and unrelated edits must remain untouched. Stop and report if a specified replacement does not match or any primary-scope conflict appears. No prose counts, no engine identifiers in an authored artifact. The root retains the report.
