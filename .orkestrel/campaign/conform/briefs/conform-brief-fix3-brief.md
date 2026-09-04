# Unit conform-brief fix round 3 — the dead export named in a doc block, the unnamed breaking constant, the report's gate sentence and one pointer

## Role and engine

`builder` on Claude Sonnet (native Claude Code subagent; a fully specified record-and-one-line unit), the sole writer in `/home/user/fleet/brief`, also owning the unit's report file `/home/user/scaffold/tmp/units/conform/conform-brief-report.md`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-2 objective lane's refutations of claims 3 and 6 and its findings O1 and O2 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/brief-objective-r2.md`; the round-2 checker passed every claim). R1 is ruled: sample strings inside a code fence or a test fixture are data, exempt from the prose substitution table; the guide's rewrite stands and the test strings stay. R2 is closed by the Orchestrator: the evidence diff is regenerated in text mode and renders `tests/src/core/parsers.test.ts`.

## Context

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Claims and time (where time matters, give the version or the date; claim only what the reader can check).

Standing conditions: the checkout carries the conform-brief unit's uncommitted edits (22 paths under `git status --short`). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits, and so is every line of `src/**`, `tests/**`, and `guides/**` this brief does not name. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff --stat`, `grep -rnE <pattern> <paths>`, `ls`, `cat`, `sed -n`.

## Sites and edits

- **Claim 3** — `src/core/types.ts:168-171`. Before (four lines):

  ```
   * The cost lands on one migration: `buildCitation` takes `(name, url, note)` where the earlier
   * `citation` function took `(name, role, url)` — strings in the same positions either way, so a
   * stale call still compiles and still passes the guard, and only renders wrong. Nothing is
   * published, so a version bump carries it.
  ```

  After (three lines):

  ```
   * The cost lands on one migration: `buildCitation` takes `(name, url, note)` where the 0.0.6
   * release took `(name, role, url)` — strings in the same positions either way, so a stale call
   * still compiles and still passes the guard, and only renders wrong.
  ```

- **Claim 6** — the report's § Breaking, in the changed-signatures list before the sentence "No compatibility alias, re-export, or shim was left." (report `:369`), add this bullet: `INTERPRETATION_MEMBERS` no longer carries `'complete'`. Its element type is `keyof Interpretation`, and `@orkestrel/interpret` removed that member, so the published value and its union both lose it. No consumer inside the fleet closure; a registry consumer of `0.0.6` reading `'complete'` from the list drops that read.
- **O1** — the report's § Gates, after the table at `:315-321`: add one sentence stating that the table's readings were taken at the pre-fix tip of 21:37:33 UTC (`brief-proofs/final-5-test.txt:16`) and are superseded by the Orchestrator's deciding run at landing, which executes `format:check`, `lint:check`, `check`, `build`, and `test` in order on the final tree.
- **O2** — report `:144-145`: the location sweep's result reads `tests/guides.test.ts:342` (open the tree line and confirm `describe('the guide fences, executed'` sits there before writing); correct the same pointer wherever else the report cites `:335` for that block.
- **Report** — append `## Fix round 3` naming the verdict file, each edit with `file:line` before and after, and the two rulings (R1 and R2).

## Scope

Owned: `src/core/types.ts:168-171`; the report. Shared: none. Off-limits: every other line, every other edit the unit made, and the vendored set named under Standing conditions.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: the `types.ts` edit before and after; the added § Breaking bullet and § Gates sentence as written; the corrected pointer lines; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens or when a named site does not read as this brief quotes it. Decide, record, and carry on for an ancillary question: the exact wording of the § Gates sentence.

## Acceptance criteria

1. `grep -n 'citation. function\|Nothing is' src/core/types.ts` returns nothing; `sed -n 168,170p src/core/types.ts` reads the three prescribed lines.
2. `grep -n 'INTERPRETATION_MEMBERS' /home/user/scaffold/tmp/units/conform/conform-brief-report.md` returns a hit inside § Breaking; `grep -n '21:37:33' …/conform-brief-report.md` returns a hit inside § Gates; `grep -n 'guides.test.ts:335' …/conform-brief-report.md` returns nothing.
3. The gates exit 0; `git status --short` lists the unit's 22 paths and nothing new.
