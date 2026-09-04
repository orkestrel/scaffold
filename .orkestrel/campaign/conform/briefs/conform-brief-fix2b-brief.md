# Unit conform-brief fix round 2b — the successor to fix round 2: four banned-sense sites the sweep reached outside its scope

## Role and engine

`implementer` on Claude Opus 5 (the Cursor bench being dark), the sole writer in `/home/user/fleet/brief`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## What changed and why

Fix round 2 (`/home/user/scaffold/.orkestrel/campaign/conform/briefs/conform-brief-fix2-brief.md`, result `units/l4/brief-fix2-opus-result.md`) closed every site it named and reported six hits outside its scope. The Orchestrator rules four banned and two permitted:

- Banned, `once` in the sense `after`: `src/core/BriefManager.ts:166` ("seeding all-or-nothing once every entry has been staged"), `src/core/helpers.ts:869` ("returns its argument by IDENTITY once the guard passes"), `guides/brief.md:591` ("argument once the guard passes").
- Banned, `new` dating a value in fence sample text: `guides/brief.md:933` (`'migrate the 3 legacy stores to the new driver seam'`), the sibling of the `:415` site fix round 2 rewrote.
- Permitted, `once` meaning "at one time" rather than `after`: `src/core/types.ts:155` ("vocabulary this once held") and `tests/guides.test.ts:303` ("this package once shipped"); record them as permitted in the report.

## Sites and edits

- The three `once` sites: `once` → `after`, recasting the clause where needed.
- `guides/brief.md:933`: rewrite the sample text without `new` (for example "to the replacement driver seam"); if `tests/guides.test.ts` transcribes that fence line, update the transcription with the guide's text.
- Re-run `grep -rniE '\b(new|should|once)\b' src guides/brief.md guides/README.md README.md tests/guides.test.ts` and record every hit with its ruling; every surviving `once` is either a code sense or the "at one time" sense, and every `new` is constructor syntax.
- Report `/home/user/scaffold/tmp/units/conform/conform-brief-report.md` — append `## Fix round 2b` naming this successor, the four rewrites with `file:line` before and after, and the two permitted sites.

## Standing conditions and scope

The checkout carries the conform-brief unit's uncommitted edits (22 paths). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rniE <pattern> <paths>`, `cat`. Owned: the four lines named, the transcription line if any, the report. Off-limits: every other line and every other edit the unit made.

## Output

Return, as your final message: each rewrite with `file:line`, before and after; the sweep with rulings; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides`.

## Deviation contract and acceptance

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens; a further sweep hit outside Owned is recorded under `Sites outside Owned` and does not stop the unit. Acceptance: the four sites read as prescribed, the sweep's surviving hits are recorded with rulings, the gates exit 0, and `git status --short` lists the unit's 22 paths and nothing new.
