# Unit conform-sea fix round 1 — the round-1 objective lane's refutations and findings

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/sea`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's refutations of claims 2 and 4 and its findings F1 to F3 (`units/l3/sea-objective-r1.md`) on the uncommitted conform-sea unit: the two extracted PE helpers' TSDoc opens in the third person; sea-subj-7 carries a red-first proof; the report records the old-form sweeps it omitted; the stale `load()` sentence, the `e.g.`, and the missing § Breaking entry are repaired.

## Context

**Law.** `/home/user/scaffold/.claude/rules/typescript.md` § Comments and API documentation (the first sentence states what the symbol does in the third person with an `-s` verb); `/home/user/scaffold/AGENTS.md` § TTTDD (a test that never ran red does not bind to the defect it claims); `/home/user/scaffold/.claude/rules/documentation.md` § Parity (re-read the prose against what shipped); `/home/user/scaffold/.claude/rules/writing.md` § Substitutions. The conform-sea brief at `/home/user/scaffold/tmp/units/conform/conform-sea-brief.md` and the report at `/home/user/scaffold/tmp/units/conform/conform-sea-report.md` this round extends.

**Sites, as the lane read them at 19:2x UTC.** Line numbers can have moved; read each site before changing it.

- `tests/setupServer.ts:349` "Read one `IMAGE_RESOURCE_DIR_STRING_U` …" → "Reads one …"; `:362` "Walk one level of a PE resource directory tree …" → "Walks one level …".
- `src/server/seas/SEA.ts:94` (`execute()` reads `this.#emitter.destroyed`) and `:151-153`: `EmitterInterface.destroy()` is public, so `const sea = new SEA(createSEAOptions()); sea.emitter.destroy(); await sea.execute()` throws `SEAError('STATE', 'SEA is destroyed')` after the change and resolved before it.
- `src/server/types.ts:322`: "Outside SEA, `load()` reads client assets from disk." → "Outside SEA, `load()` reads the paths `assets` configures from disk."
- `guides/sea.md:185`: "(a `readonly` data member, e.g. `format` or `emitter`, stays a Surface row)" → "for example".
- The report's § Sweeps (lines 90-104) records no old-form sweep for sea-obj-7 (`free program header entry`, `kept OUT`), sea-subj-12 (`// === `), sea-subj-18 ("this package's other runtime dependency"), or sea-subj-10 (`const PT_LOAD`), and its § Breaking (lines 132-150) has no entry for `execute()` refusing after the emitter is destroyed by any route.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/sea run <script>`, `npm --prefix /home/user/fleet/sea test`, `cd /home/user/fleet/sea && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/seas/SEA.test.ts > /home/user/work/evidence/sea-proofs/<name>.txt 2>&1`, `cd /home/user/fleet/sea && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure), `git -C /home/user/fleet/sea status --short`, `git -C /home/user/fleet/sea diff`, `git -C /home/user/fleet/sea diff -- src/server/seas/SEA.ts`, `node /home/user/scaffold/tmp/work/evidence.mjs sea`, `cd /home/user/fleet/sea && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

**Standing condition.** The tree carries the conform-sea unit's uncommitted edits and the Orchestrator's two hunks in `package.json` and `README.md:106`; leave every edit outside the Sites as it is, and never touch `package.json`.

## Scope

**Owned.** `tests/setupServer.ts` (the two first sentences), `tests/src/server/seas/SEA.test.ts` (the new case), `src/server/types.ts` (the one sentence), `guides/sea.md` (the one token), `/home/user/scaffold/tmp/units/conform/conform-sea-report.md`, `/home/user/work/evidence/sea-proofs/sea-subj-7-red.txt` and `sea-subj-7-green.txt` (new). `src/server/seas/SEA.ts` for the plant in row 2 only, restored byte-for-byte before the gates.

**Off-limits.** Everything else. Never edit a vendored file (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, the vendored guide mirrors under `guides/`, `configs/**`, `.claude/**`, `scripts/**`) or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, delete a file, or run a discarding git command.

## Rows

1. **Claim 2.** Rewrite the two first sentences in `tests/setupServer.ts` to the third person with an `-s` verb.
2. **Claim 4, sea-subj-7.** Add to `tests/src/server/seas/SEA.test.ts` a case that destroys `sea.emitter` and asserts `execute()` rejects with `SEAError` code `STATE`. Plant the pre-change behaviour in `src/server/seas/SEA.ts` (make `execute()` ignore `this.#emitter.destroyed`), run the scoped command to `sea-subj-7-red.txt`, read the new case red, restore the line byte-for-byte, confirm with `git -C /home/user/fleet/sea diff -- src/server/seas/SEA.ts` that the file's diff again matches the unit's, and run the same command to `sea-subj-7-green.txt`.
3. **Claim 4, the sweeps.** Run and record in the report's § Sweeps the old-form sweeps for sea-obj-7 (`free program header entry`, `kept OUT`), sea-subj-12 (`// === `), sea-subj-18 (`this package's other runtime dependency`), and sea-subj-10 (`const PT_LOAD`, `const PT_PHDR`, `const PF_R`, `const PAGE`), each over `src/**`, `tests/**`, `guides/sea.md`, `guides/README.md`, and `README.md`, and record that sea-obj-7's proof is the sweep plus the green integration project (a deleted unreachable skip has no red to plant).
4. **F1, F2.** Rewrite the sentence at `src/server/types.ts:322` and replace `e.g.` at `guides/sea.md:185`; confirm with a grep over `tests/guides.test.ts` that no presence guard quotes either sentence.
5. **F3.** Add to the report's § Breaking a bullet stating that `execute()` refuses with `SEAError('STATE', …)` after the emitter is destroyed by any route, including a consumer's own `sea.emitter.destroy()`, where the build previously ran, and that a consumer needing a fresh run constructs a new `SEA`.
6. Append a `## Fix round 1` section to the report: each finding, the edit that closes it, the sweeps, the captures with their counts, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs sea`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — when the plant in row 2 does not redden the new case, when a quoted phrase is not found within three lines of the line named, or when a gate reddens on something the rows did not touch. How a sentence is worded is yours to decide and record.

## Acceptance criteria

1. Both extracted helpers' TSDoc opens in the third person.
2. `sea-subj-7-red.txt` shows the new case red on the plant and `sea-subj-7-green.txt` shows it green with `src/server/seas/SEA.ts` restored.
3. The report's § Sweeps carries the four sweeps and § Breaking the `execute()` entry; the stale sentence and the `e.g.` are gone.
4. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only the unit's paths, `package.json` and `README.md` included as the Orchestrator's.
