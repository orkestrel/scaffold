# Unit conform-codec fix round 1 — the guide's stale Tests row, one tally, the report's citations and sweep record

## Role and engine

`builder` on Claude Sonnet (native Claude Code subagent; a fully specified record-and-prose unit), the sole writer in `/home/user/fleet/codec`, also owning the unit's report file `/home/user/scaffold/tmp/units/conform/conform-codec-report.md`. Perform the assignment directly and spawn nothing.

## Objective

Close round 1: the objective lane's refutation of claim 5 with its findings O-1 to O-3 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l0-codec-objective-r1.md`) and the checker's two referrals on the `kind` sweep's population (`/home/user/scaffold/.orkestrel/campaign/conform/units/l0-codec-r1-checker-grok.result.md`). Rulings: R-1 — the writer's departure at `README.md:37` stands (the cell is a noun phrase; the refuter's enumeration was over-inclusive); R-2 — the ungated `reason` field is a next-matrix row the Orchestrator records; every `kind` hit outside `tests/setup.ts:275` and its readers is a permitted sense (the TSDoc and guide phrase "a sibling view kind", the `Kind` table-column header, the foreign `symbol.kind` member, the prose "sibling view kinds").

## Context

`/home/user/scaffold/AGENTS.md` § Writing (treat `both` as a count where it tallies a set that can grow; keep it where the sentence names the members); `/home/user/scaffold/.claude/rules/documentation.md` § Parity; `/home/user/scaffold/.claude/rules/writing.md` § Claims and time; `/home/user/scaffold/.claude/rules/quality.md` § Instruments (state a sweep's coverage beside its result).

Standing conditions: the checkout carries the conform-codec unit's uncommitted edits (6 paths under `git status --short`). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits, and so is every line of `src/**`, `tests/**`, and `guides/**` this brief does not name. `node_modules` is the installed development closure; never run `npm install`, `npm ci`, or any command that rewrites it or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff --stat`, `grep -rniE <pattern> <paths>`, `ls`, `cat`, `sed -n`.

## Sites and edits

- **Claim 5** — `guides/codec.md:431-436`, the `tests/src/core/helpers.test.ts` row of the Tests section: strike the clause "the written-out membership rows that bind each guard to its decoder, the hex rows that pin `isHex` and `decodeHex` to the same answer," and the trailing "and guard totality against hostile values", so the row keeps the named vectors, the named measures on each face, the canonical refusals, the Base64 alphabets read against the specification in both directions, and the hex alphabet read against the language's own radix conversion in both directions (rewrap the paragraph at the file's width and run the formatter on the file). The validators row at `:471-477` already carries the struck families; leave it.
- **O-1** — `guides/codec.md:475`: "the totality of both guardless directions" → name the members the sentence tallies (read the sentence: the total Latin-1 decoder and the guardless UTF-8 text side), for example "the totality of the Latin-1 decoder and of the UTF-8 text side".
- **O-2** — the report's codec-subj-4 row (`:31`, `:33`): cite `tests/setup.ts:275` for the binding and `:257` for the comment (open both lines and confirm before writing).
- **O-3 and the checker's referrals** — the report's § Sweeps: replace the `kind` row with the case-insensitive inflection sweep `\bkind(s|ed|ing)?\b` over `src`, `tests` (minus the vendored set), `guides/codec.md`, `guides/README.md`, and `README.md`, listing every hit with its ruling (`src/core/validators.ts:93,136,162` and `guides/codec.md:113` the TSDoc phrase "a sibling view kind" and its mirrored guide cell; `README.md:9,28` and `guides/codec.md:66,93,109` the `Kind` table-column header the parity suite locates by header text; `tests/guides.test.ts:171` the foreign `symbol.kind` member of `@orkestrel/guide`'s `SurfaceSymbol`; `tests/setup.ts:636` the prose "sibling view kinds"); re-run it yourself and record what it returns.
- **Report** — append `## Fix round 1` naming both lane files, each edit with `file:line` before and after, the recorded sweep, and the rulings (R-1 stands, R-2 next matrix).

## Scope

Owned: `guides/codec.md:431-436` and `:475`; the report. Shared: none. Off-limits: every other line, every other edit the unit made, and the vendored set.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: each edit with `file:line` before and after; the recorded sweep with its hits and rulings; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens or when a named site does not read as this brief quotes it. Decide, record, and carry on for an ancillary question: the exact wording of the rewrapped row or the O-1 phrase.

## Acceptance criteria

1. `grep -n 'membership rows that bind\|guard totality against hostile' guides/codec.md` returns only lines inside the validators row (`:471-477`), none in the helpers row; `grep -n 'both guardless' guides/codec.md` returns nothing.
2. `grep -n 'tests/setup.ts:270\|tests/setup.ts:252' /home/user/scaffold/tmp/units/conform/conform-codec-report.md` returns nothing; the § Sweeps `kind` row names the five paths and every hit.
3. The gates exit 0; `git status --short` lists the unit's 6 paths and nothing new.
