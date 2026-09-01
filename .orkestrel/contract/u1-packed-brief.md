# Campaign context block (pasted into every unit brief of the second contract performance campaign)

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `documentation.md`, `writing.md`, `quality.md`; skill: none unless the brief names one; guide `/home/user/contract/guides/contract.md`.

**Host.** Linux container, bash, 4 CPUs, node v22.22.2, npm 10. Working path `/home/user/contract` (git branch `claude/method-memoization-contracts-yus26p`, baseline commit named in the brief, clean tree at dispatch). Outbound HTTPS goes through a proxy; nothing in a unit needs the network. Foreground commands are capped at 10 minutes. `oxfmt` and `oxlint` are the formatter and linter (`npm run format:check`, `npm run lint:check`); `npm run check` is the typecheck; scoped tests run as `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <test file>`. A whole-suite run (`npm test`) takes minutes and is an observation, never a criterion, for a unit.

**Gates the Orchestrator runs after the unit exits.** `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, in that order, plus the paired A/B and the answer-parity differential against the 0.0.15 dist. A unit reports its own scoped readings; the authoritative runs are the Orchestrator's.

**Standing conditions.** No file is expected dirty at dispatch. No gate is red at the baseline. No role commits, pushes, installs, or runs `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Write instruments only under `/home/user/contract/tmp/` (gitignored) and remove them before returning. Never read or print credentials or environment values.

**Measurement doctrine for this campaign.** Every performance claim rests on the Orchestrator's paired A/B (6 fresh processes, load order swapped, admission: median across replicates ≤ 0.95 and every replicate ≤ 0.98 on the target family) and on the answer-parity differential reading IDENTICAL. A unit never claims a magnitude; it reports what it measured under what conditions.

**Test doctrine.** Real implementations only: no mocks, spies, module replacement, or fake clocks. A pin is named for what it proves, never for the control that specified it. A behaviour change lands with the test that turns red without it: record the exact command and its failing count before the fix, then the same command green after it.

**Retention.** The Orchestrator copies the brief and the returned report to `/home/user/scaffold/.orkestrel/contract/`. The unit writes its report as its final message.

# Unit U1 — packed-array fast path in `readArrayEntries`

## Role and engine

`implementer` on Opus 5, native Claude subagent, clean context (objective work class; Opus substitutes for the Sol bench the user excluded). Perform the assignment directly and spawn nothing.

## Objective

`readArrayEntries` snapshots an array whose reflected own-key population is exactly the canonical indices `0` through `length - 1` followed by `length` through a direct indexed copy, keeping every documented guarantee, while every other view takes the existing walk unchanged.

## Context

**Evidence.** Baseline commit: `git -C /home/user/contract rev-parse --short HEAD` → `3193da1`; `git status --porcelain` → empty. The function sits at `src/core/helpers.ts:1023` (`grep -n '^export function readArrayEntries' src/core/helpers.ts` → `1023`). Its documented contract is the `readArrayEntries` row of `guides/contract.md` (line 216): `length` and the reflected key population are each captured once; canonical indices are sorted numerically, corroborated with `Object.hasOwn`, and read once; the frozen `entries` are one native sparse array of the captured length; `dense` means the reflected canonical count equals `length`; caller-defined iteration is ignored. `INTRINSICS` (the captured intrinsics record, `src/core/constants.ts`) supplies `members` (`Reflect.ownKeys`), `own` (`Object.hasOwn`), `text` (`String`), `list` (`Array`), and `freeze`. `PRESENCE_MASK_LIMIT` in `constants.ts` and its guide row at `guides/contract.md:500` are the model for a documented constant.

**Measurements.** A dist-level surgery of this mechanism (`/home/user/scaffold/.orkestrel/contract/instruments/a1-patch.mjs`) read, in 6 fresh processes against the 0.0.15 dist: is-medium median 0.919 (every replicate ≤ 0.956), parse-medium 0.903, is-list48 0.823 (every replicate ≤ 0.829), audit-list48 0.912; answer parity IDENTICAL over 1062 comparisons (`results/multi-a1.out`, `results/parity-a1.out`). The scoped run `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts` takes 3.4 s and reports 217 tests passing at the baseline.

**Control identifiers.** The dist probe is A1. Name every test for what it proves, never for the probe.

**Standing conditions.** None beyond the campaign block.

## Mechanism (fixed by the design round)

1. In `src/core/constants.ts`, add `INDEX_TEXTS`: a frozen `readonly string[]` holding the decimal text of every index from `0` through `1023`, built at module initialization with an indexed loop through `INTRINSICS.text` (no `Array.from`, no spread, no `map`). Its length is the only bound; add no companion limit constant. Give it TSDoc in the style of `PRESENCE_MASK_LIMIT`: what it is, why the bound is a cost bound and never an answer bound, and an `@example`.
2. In `readArrayEntries`, after the existing `length` check and the single `INTRINSICS.members(value)` read, test the packed view: `members.length === length + 1`, `members[length] === 'length'`, and for every `position < length`, `members[position] === (position < INDEX_TEXTS.length ? INDEX_TEXTS[position] : INTRINSICS.text(position))`. The table substitutes for `INTRINSICS.text(position)` and nothing else; past the table the comparison still runs (slower, same answer). There is no size gate that switches algorithms.
3. On a packed view: `const entries = new INTRINSICS.list<T | undefined>(length)`; for every index, `if (!INTRINSICS.own(value, members[index])) throw new INTRINSICS.error('Array index views disagree')`, then `entries[index] = value[index]`; return `INTRINSICS.freeze({ entries: INTRINSICS.freeze(entries), dense: true })`. Indexed writes only: no spread, `slice`, `Array.from`, or `for...of` over the caller's array.
4. Every other view runs the existing walk without change (the `collected`/`keys` lists, the order-aware sort decision, the corroborated fill).
5. Keep the read order the guide fixes: `length` once, then `Reflect.ownKeys` once, then per-index `Object.hasOwn` and one indexed read.

## Unknowns

None.

## Scope

**Owned.** `src/core/helpers.ts` (the `readArrayEntries` function and its TSDoc), `src/core/constants.ts` (the `INDEX_TEXTS` constant and its TSDoc), `tests/src/core/helpers.test.ts`, `guides/contract.md` (one row for `INDEX_TEXTS` in the constants table beside `PRESENCE_MASK_LIMIT`, and one sentence in the `readArrayEntries` row stating that an exactly canonical reflected population is copied directly under the same corroboration).

**Shared (report-only).** None.

**Off-limits.** Every other file. `src/core/types.ts` needs no change (`ArrayRead<T>` is unchanged); if you find it does, stop and report.

**What asserts the state this change ends.** Derive by running the scoped helpers suite after the change; the pins expected to stay green are `tests/src/core/helpers.test.ts:625` (native-maximum sparse array), `639` (membership probes visible), `646` (frozen snapshot with holes), `676` (reordered view equals ordinary copy; observed probes `['0','1','2']`), `715` (split membership refuses), `728` (index outside advertised length refuses), `738` (descriptor-only index stays a hole), `754` (`4294967295` is metadata), `1498` and `1556` (`arrayOf` sparse refusal and reflected walk). A pin at those lines going red is a deviation, not a test to edit.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or history-rewriting git command. Instruments only under `/home/user/contract/tmp/`, removed before returning.

## Execution

Perform the assignment directly and spawn nothing.

## Tests to add (named for what they prove)

- a packed array and a reordered reflected view of the same members produce equal entries and equal `dense`;
- an array carrying an extra own string key still snapshots through the corroborated walk with the same entries;
- an array carrying an own symbol key snapshots identically to the plain array;
- an array of length `INDEX_TEXTS.length` and one of length `INDEX_TEXTS.length + 1` both snapshot with every entry in place and `dense` true;
- a proxy that reports the exact canonical population while disowning one index is refused as a view disagreement (this is the pin the mutation probe turns red).

Use real values, `Proxy`, and descriptor-defined arrays, in the style the surrounding cases at `helpers.test.ts:625–760` already use. No mocks or spies.

## Red/green proof (record the exact commands and counts in the report)

The change preserves every answer, so its binding proof is a mutation probe: with the fast path's `INTRINSICS.own` corroboration line removed, run the scoped helpers suite and record the failing count (the disowning-proxy test must fail); restore the line and record the same command green. Also run the scoped suite once before your edits and record the baseline count.

## Output

Return, as your final message: the mechanism as landed in two sentences; the exact scoped command with its before, mutation-red, and after counts; the `git status --porcelain` output; the guide rows added or changed, quoted; any deviation. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — on: a pin listed above going red; a type error the mechanism cannot satisfy without touching `types.ts`; a formatter or lint failure you cannot converge with `npm run format` and `npm run lint` on your owned files; any change needed outside the owned files. Decide, record, and carry on from: TSDoc wording, test placement within the existing `describe` blocks, the exact guide sentence wording.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts` exits 0 with the added tests present and the mutation probe recorded red then green.
5. `npm run test:guides` exits 0 (parity for the added constant row).
6. `git status --porcelain` lists only the owned files.

**Observations, not criteria.** `npm test` whole-suite reading; any timing.

## Review evidence

The Orchestrator captures `git diff` and `git status --porcelain` from the tree after the unit returns and supplies them to the audit lanes with this brief and the unit's report.
