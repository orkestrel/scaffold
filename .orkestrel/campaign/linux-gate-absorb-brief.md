# release-state absorption brief

## Role
Cursor Grok 4.6 (cursor-grok-4.6-high). Read-only absorption. You make no repository changes,
run no write, install, or destructive command, and read no credential, `.env*` file, `.npmrc`
file, or Codex auth file. You never print an environment value.

## Question
What state did the prior release campaign leave the three packages
(`@orkestrel/scaffold`, `@orkestrel/toolbox`, `@orkestrel/ollama`) in, so the Orchestrator can
run the Linux gate chain against a known baseline instead of rediscovering it?

## Scope
Read only these locations:
- `/home/user/scaffold/.orkestrel/campaign/**` (including `docs-parity/`)
- `/home/user/scaffold/ROADMAP.md`
- `/home/user/scaffold/package.json`, `/home/user/toolbox/package.json`, `/home/user/ollama/package.json`
- `/home/user/scaffold/tests/**`, `/home/user/toolbox/tests/**`, `/home/user/ollama/tests/**`
- `/home/user/scaffold/vite.config.ts`, `/home/user/toolbox/vite.config.ts`, `/home/user/ollama/vite.config.ts`

Do not write anything. Do not run `git status` or any command that mutates state. Do not read
outside the listed paths.

## Authority to read first
- `/home/user/scaffold/AGENTS.md`
- `/home/user/scaffold/.agents/orchestration.md` § Publishing the fleet and § What a bump obliges
- `/home/user/scaffold/.agents/skills/orkestrel-publish/references/wave.md`

## Known facts (do not re-derive, use as context)
- Registry versions (`npm view`, this session): `@orkestrel/scaffold` 0.0.64, `@orkestrel/toolbox`
  0.0.12, `@orkestrel/ollama` 0.0.14. Local manifests: 0.0.65, 0.0.13, 0.0.15. Each tree carries an
  unpublished bump.
- Newest scaffold commits: `c439685 Record release preparation: d7n-owner-upload-retention`,
  `6bccbb0 Prepare owner-approved upload handoff`, `aabc03c Prepare the accepted Toolbox upload
  command`.
- All three checkouts are on branch `claude/compassionate-knuth-5e0gyu` with clean trees.
- The user already ran the gates on a Windows host; this session runs them on Linux.

## Unknowns to answer, numbered

Answer each from the record. Where the record does not answer one, report it as unresolved and
name the input rows you read that did not reach an answer. Never guess.

1. Which of the three packages did the prior campaign already rule bump-owed, and on which
   trigger (moved `dist/` output, or moved runtime dependency set)?
2. Was any of the three already uploaded to the registry in a prior window? What did the campaign
   record about an approval that did not complete?
3. What gate is recorded red at any of the three packages' baselines? For each, name the exact
   gate command, the package, and the carrier recorded beside it.
4. What fact, anywhere in the three checkouts or the campaign record, says a gate, test, or script
   result differs by host (Linux versus Windows)? This is the load-bearing question. Name the file
   and line of every host-dependent test, skip condition, or platform branch you find.
5. Does the campaign record name any step of the release visit in `wave.md` as already done for
   any of the three packages? Which steps does it name as outstanding?

## Output requirements
- Require a `file:line` pointer on every fact you report. Never paste a raw file dump.
- Never render a decision, a design, a recommendation, or a verdict. Return evidence only.
- Return exactly this shape:
  - `Question`: one line.
  - `Evidence`: facts with `file:line` pointers, organized by the five numbered unknowns.
  - `Distillate`: the smallest context the next engine needs to run the Linux gate chain
    against a known baseline.
  - `Unknowns`: unresolved facts, naming every input row you did not reach or that gave no
    answer. Not recommendations.
