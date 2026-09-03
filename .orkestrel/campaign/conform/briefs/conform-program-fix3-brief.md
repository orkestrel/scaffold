# Unit conform-program fix round 3 — the whole TSDoc surface swept once, and the destroy-count proof made binding

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/program`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-3 objective lane's refutations of claims 2 and 4 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/program-objective-r3-sol.md`) and, because three rounds have each found a new TSDoc-form defect through a new door, sweep the entire public TSDoc surface against `.claude/rules/typescript.md` § Comments and API documentation in one pass so the round stops repricing.

## Context

`/home/user/scaffold/.claude/rules/typescript.md` § Comments and API documentation, every bullet: complete blocks on every public export; the first sentence in the third person with an `-s` verb and never repeating the symbol's name; boolean parameters and returns in the "If `true`, …; if `false`, …" and "True if …; false otherwise" forms; "Default: …"; "Thrown when …"; an options object as one `@param` with its short fields under `@remarks`; private methods and overload-specific notes as single-line `//` comments, never public TSDoc; no `@internal`. `/home/user/scaffold/.claude/rules/tests.md` § Test contract (a test binds to the defect it names: a case named "counts every destroy" must call `destroy` more than once).

Standing conditions: the checkout carries the conform-program unit's uncommitted edits (18 paths). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo a plant by editing the line back. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project <project> <file>` with `<project>` one of `src:core`, `setup`, `guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`. Capture a runner with `> /home/user/work/evidence/program-proofs/<name>.txt 2>&1`.

## Sites and edits

- **Claim 2** — `src/core/types.ts:239-240` and `:496`: the overload-specific notes inside public TSDoc become single-line `//` comments placed before the overload block, outside the doc block. Then the sweep: read every `/** … */` block in `src/core/**` on an exported symbol or an interface member and rule it against each bullet in Context; rewrite every departure. Record the sweep as a table of bullet → sites rewritten (or "none"), so the next round reads a closed surface rather than a sample.
- **Claim 4** — `tests/setup.test.ts:313-318` (the case named "counts every destroy, so a suite can prove an owned engine was released once"): call `destroy()` a second time and assert `destroyCount === 2`; capture the case red with `RecordingReason.destroy` planted to increment only on its first call (`program-obj-1-red2.txt`), restore, capture green (`program-obj-1-green2.txt`), same command (`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts`); replace the report's obj-1 row captures.
- **Report** — append `## Fix round 3` naming the objective lane's file, the two items, the TSDoc sweep table, and the captures.

## Scope

Owned: `src/core/**` doc blocks (comments only; no signature, body, or export changes), `tests/setup.test.ts` (the one case), `tests/setup.ts` (only the planted line, restored), the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: the two claim-2 rewrites with `file:line`; the TSDoc sweep table; the claim-4 case with `file:line` and its red and green counts with capture paths; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, and the scoped `setup` and `src:core` runs.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a doc rewrite would need a signature change to be truthful, or when a gate reddens. Decide, record, and carry on for an ancillary question: the exact wording of a rewritten sentence.

## Acceptance criteria

1. No public TSDoc block in `src/core/**` carries an overload-specific note, and the sweep table names every bullet with its sites or "none".
2. `program-obj-1-red2.txt` names the destroy-count case failing and `program-obj-1-green2.txt` the file passing under the same command.
3. The gates and scoped runs exit 0; `git status --short` lists the unit's paths and nothing new.
