# Unit conform-brief fix round 2 — the sweep records, the banned words in the guide and its transcriptions, a counted comment

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/brief`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's refutations of claims 3 and 4 and its findings O1 and O2 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/brief-objective-r1-sol.md`). The third checker run passed. Fix rounds 1 to 1c stand.

## Context

`/home/user/scaffold/.claude/rules/writing.md` § Substitutions and § Claims and time (`new`, `should`, temporal `once`); `/home/user/scaffold/AGENTS.md` § Writing (no count over a growable set); `/home/user/scaffold/.claude/rules/tests.md` § Cross-cutting proofs (change a fence, change the transcription beside it, and the presence guard reads the fence text).

Standing conditions: the checkout carries the conform-brief unit's uncommitted edits (22 paths). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`.

## Sites and edits

- **Claim 3** — record in the report's § Sweeps the case-insensitive `-s`, `-ed`, `-ing` inflection sweep for every renamed builder (`task|reference|manifest|outcome|given|example|citation|gap|risk|output|proof|brief|gateDefinition`) in call form `\b(<name>)(s|ed|ing)?\s*\(` over `src`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `tests/src`, `guides/brief.md`, `guides/README.md`, and `README.md`, with every surviving hit ruled (`BriefManager.brief(...)` and the `gap(s)` message text are permitted).
- **Claim 4** — for brief-subj-5, brief-subj-7, and brief-subj-8, record in the report the old-form pattern each row removed (the `required` boolean's old wording, the `data`/`source` parameter names on `gate` and `add`, `buildExample`'s `result` parameter) over the full population, with the result.
- **O1** — `src/core/types.ts:168` and `src/core/helpers.ts:190` (`new` dating a value), `guides/brief.md:415`, `:417`, `:429`, `:980` (`should`, `new`, temporal `once`), and the transcriptions at `tests/guides.test.ts:391-465` that carry the guide's text: rewrite with the lane's forms ("the earlier `citation` function took", "tests cover the changed code paths", "Add no dependencies", "Does validation message wording need to change?", "Does the result need to land as a diff or as full files?"), and update each transcription and presence guard with the guide's new text so the `guides` project stays green. Then sweep `\b(new|should|once)\b`, case-insensitive, over `src`, `guides/brief.md`, `guides/README.md`, `README.md`, and `tests/guides.test.ts`, and rule every hit (constructor syntax and the `once` binding are permitted code senses).
- **O2** — `tests/guides.test.ts:340`: "These two tests transcribe" → "These tests transcribe".
- **Report** — append `## Fix round 2` naming the objective lane's file, each item, the sweeps, and the sites.

## Scope

Owned: `src/core/types.ts:168`, `src/core/helpers.ts:190`, the named lines of `guides/brief.md`, `tests/guides.test.ts` (the transcriptions, presence guards, and `:340`), the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: each rewrite with `file:line`, before and after; the sweep rows as recorded; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a transcription cannot follow a guide rewrite without changing an asserted value, or when a gate reddens. Decide, record, and carry on for an ancillary question: the exact wording of a rewritten sentence.

## Acceptance criteria

1. The report's § Sweeps carries the inflection row and the three old-form rows.
2. The `new|should|once` sweep returns only permitted code senses; `npm run test:guides` exits 0 with the transcriptions matching the guide.
3. The gates exit 0; `git status --short` lists the unit's 22 paths and nothing new.
