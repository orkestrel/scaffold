# Unit S2 audit — objective lane report

Lane: `reviewer` holding the **objective** lane, Opus 5, native subagent, clean context,
2026-09-16. Brief: `.orkestrel/scaffold/s2-audit-objective-brief.md`. Transcribed by the
Orchestrator from the lane's returned message; the role carries no write tool.

**Engine substitution, recorded.** The objective lane's default engine is GPT-5.6 Sol. Sol wrote
unit S2, and a fix round's auditor must be an engine that did not write the work, so Opus 5 held
both lanes — separate subagents, clean contexts, blind to each other, each told which perspective it
held.

The lane had no shell. Every claim a run decides is marked and carries its settling command.

## Per-claim verdicts

1. **The merge never flattens — CONFIRMED.** `vite.config.ts:57-82` pushes each entry by reference
   and never spreads one. The predicate refuses an array on either side, and `'name' in []` is
   false, so a nested entry can neither be selected nor select.
   `tests/src/core/compilers.test.ts:3093` reads the nested entry back by identity with exactly one
   top-level `orkestrel-output-boundary`.
2. **Caller entries sharing a name survive in order — CONFIRMED.** `findIndex` takes the earliest
   match for the base slot and `used` holds only that index, so the sibling appends through the
   leftover loop. The case asserts both the base-collision and no-base shapes, and asserts the
   caller's array was not mutated.
3. **Replacement in position, unmatched entries append in caller order — CONFIRMED.**
   `vite.config.ts:72-78` and `80-82`; pinned at `tests/src/core/compilers.test.ts:3068-3071`.
4. **Opaque entries pass through unchanged — CONFIRMED, with a reachability note.** Traced against
   the predicate: `undefined`, `null`, and `false` fail the typeof and null guards; a `Promise`
   fails its guard; an array and `{}` fail `'name' in x`. No predicate can return an index whose
   entry is `undefined`, so the `replacement === undefined` sentinel cannot be confused with a real
   hit. `{}` is not assignable to `PluginOption`, so that leg reaches the function through
   `Reflect.apply` and is reachable only from an untyped caller.
5. **The hazard case derives its population and draws its control from outside it — CONFIRMED.**
   `tests/src/core/compilers.test.ts:3040-3043` reads `rootConfiguration.test?.projects` and filters
   to callables, guarding on emptiness rather than a written total. `vite.config.ts:299` registers
   `distribution`. The rival reading "the filter silently dropped rows" is excluded elsewhere, by
   `tests/config.test.ts:363`.
6. **Relocation: placement CONFIRMED, byte-identity UNSETTLED.** The literal and its comment sit at
   `src/core/templates.ts:340-385`, with no inline construction left in the compiler.
   `s2-generate.mjs:18-27` captures every src × app selection with `showcase` both ways, and the
   subject text occurs in the same selections of both captures, so a change inside the literal would
   move the compared bytes. The control at `s2-compare.mjs:7-10` appends one byte and exercises only
   a length difference, never a difference located inside the literal. The comparison's own result
   rests on the writer's report; settle it with
   `git diff --no-index -- tmp/units/s2-captures/before.json tmp/units/s2-captures/after.json`.
7. **The inverted browser case plants and asserts the plant fails — CONFIRMED.**
   `tests/src/core/compilers.test.ts:1136-1159`: the plant is proven to have landed, and the case's
   own load-bearing assertion is then run against it. The same shape holds in
   `tests/src/core/templates.test.ts:1043-1052` and `1059-1067`, whose emitted-workspace controls
   fail with diagnostics only the planted mutation produces.
8. **The refusal requires both fields; `command` alone merges; the vendored file is unedited and
   passes — CONFIRMED.** `vite.config.ts:51`. The `command`-only case asserts the override's
   `build.sourcemap` won. `tests/config.test.ts` appears in no status output, and the verifier
   records the `config` project at 172 passed, 1 skipped.
9. **`findRefusals` replaces the former name; the constants were folded — CONFIRMED.** Searches for
   `findRefused`, `findParameters`, `plantParameter`, `FACTORY_PARAMETERS`, and `MERGE_PARAMETERS`
   return hits only in campaign records and one unrelated guide row.
10. **The showcase comment states the reason and the value is unchanged — CONFIRMED.** Vite's
    default verified independently at `node_modules/vite/dist/node/index.d.ts:2841-2844`.
11. **No emitted wrapper's effective configuration changed — CONFIRMED.** Traced each wrapper
    against `mergeConfigRecursively` at `node_modules/vite/dist/node/chunks/node.js:2806-2858`,
    where root-path `plugins` falls to the array concat with defaults first. The core wrapper's base
    declares no plugins; the server wrapper's entry matches neither boundary name; the bin wrapper
    carries no plugins; `appShowcase` reproduces the order the superseded branch produced. Key order
    inside the `build` record differs and carries no meaning to Vite.
12. **Byte-identity — CONFIRMED.** The case states its path population before comparing, reads each
    file from disk, compares as one relation, and carries a control.
13. **No vendored file changed; `host.json` unchanged after a build — CONFIRMED** from the
    independent verifier's status and empty diffstat.
14. **No banned syntax — CONFIRMED.** Searched every path the status lists for suppression comments,
    `: any`, `<any>`, ` as [A-Z]`, and a non-null assertion pattern. The only hits are prose and one
    import alias.
15. **Every instrument has a recorded red from a subject mutation — REFUTED.**
    `tests/src/core/compilers.test.ts:1488`, `emits every browser workspace configuration for a
    showcase selection and for none`, is added whole and matches no row of the report's red table.
    The rewritten `templates.test.ts:928` case carries no row either. The second conjunct — that
    each red came from mutating the subject rather than weakening the instrument — rests only on the
    writer's report, with no retained log. Settle it by re-running each named command against the
    named mutation and retaining the output.

## Findings

**F1. The hazard suite's comment asserts a control regime its cases do not have. Medium-low.**
`tests/src/core/compilers.test.ts:3026-3028` states "each carries the bare merge as its control" and
"against the real vendored boundary plugins". Both are false for the nested-entry, caller-order,
opaque-entry, and `command`-alone cases: none calls `mergeConfig`, and the last two use no vendored
boundary plugin. The next reader believes every case is paired with a control that must fail and
stops looking for the ones that are not. Name which cases carry the bare merge and which carry none,
or give a control to the cases that lack one.

**F2. `replaces a named base plugin in its position` admits the reading it exists to exclude. Low.**
The factory-driven half asserts only the mapped plugin names, so an implementation that kept the
base entry and discarded the replacement passes identically. The hand-written block above it does
exclude the reading, so no shipped behaviour is at risk. Add an identity assertion at the base's
position.

**F3. The template comment gives a reason the emitted comment contradicts. Low.**
`src/core/templates.ts:343-345` says the value is restated because the browser configuration writes
every asset as its own file and a showcase inlines instead. The showcase does not inline because of
that number: the single-file plugin overwrites `assetsInlineLimit` with `() => true` whenever
`useRecommendedBuildConfig` is true, and `src/core/templates.ts:354` passes it true. The file
carries two incompatible reasons for one constant.

**F4. The merge duplicates one replacement into every matching base slot. Low.**
`findIndex` runs fresh for each base entry and consults `used` only in the leftover loop. Where a
base declares two entries under one name, the same replacement object is pushed into both positions
and the second base entry is discarded. No emitted base reaches that shape — every factory was
enumerated. It is reachable only through the exported `mergeOverride` with a caller-supplied base,
so the proportionate close is documentation.

**F5. A new pinning test has neither a recorded red nor a control. Low.**
`tests/src/core/compilers.test.ts:1488`. It is not vacuous — the wrapper population is pinned with
`toStrictEqual` — but nothing in it or beside it has been shown to fail.

**F6. Root-configuration behaviour is proven from a mirrored module test. Observation.**
`tests/src/core/compilers.test.ts:3022-3137` imports the live `vite.config.ts` and proves the root
configuration's runtime behaviour, which `.claude/rules/tests.md` § Cross-cutting proofs assigns to
`tests/config.test.ts`. That file is vendored, so writing there moves `dist/host` and obliges a
release — the decision recorded as not carried. Raised for the next owner of the vendored set; not
counted against this round.

## Hazard rulings

- **The consumed-index hazard is real**, and is F4. No emitted base reaches the shape; a caller can
  construct it only through the exported function.
- **`mode` is a real `UserConfig` property and `command` is not.** `UserConfig` begins at
  `node_modules/vite/dist/node/index.d.ts:3477` and declares `mode?: string` at line 3517, with no
  `command` member; `command` appears on `ConfigEnv` at line 3326 and `ResolvedConfig` at line 3788.
  A caller writing an override literal carrying `command` is refused by excess-property checking
  before the merge runs, so a legitimate override carrying both is not constructible as a fresh
  literal. It is constructible by hoisting the value to a variable or spreading a `ConfigEnv`, and
  such a caller loses the entire override with no diagnostic. That silence is the settled design.
- **The narrowing introduces no gap.** Vitest calls a function project row at
  `node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:11365-11370` with `command` and `mode` both
  read off a resolved Vite config, where each is a required string. Vite never calls these factories
  itself: every emitted wrapper passes the factory's return value to `defineConfig`. The narrowing
  admits exactly one new class — an override carrying `command` and no `mode` — and `command` is
  off-contract for `UserConfig` anyway.
- **The wholesale `plugins` replacement is consistent.** No field is derived from root `plugins`.
  `mergeConfigRecursively` special-cases `input`, `resolve.alias`, `assetsInclude`,
  `ssr.noExternal`, `resolve.external`, `server.allowedHosts`, `worker.plugins`, and
  `server.hmr.server`; root `plugins` falls to the generic array concat. `worker.plugins` is a
  different root path the merge never touches.
- **`base.plugins` versus `merged.plugins`.** A literal base and a spread base behave identically. A
  base exposing `plugins` through a getter has that getter invoked twice, so a non-idempotent getter
  can make the `merged.plugins === undefined` test and the loop disagree. No emitted base uses a
  getter; reachable only through a foreign call.
- **The relocation capture covers every showcase-carrying selection**, confirmed from the retained
  captures. The control fails on a trailing byte, so it establishes that the comparison is not a
  no-op without establishing sensitivity to a difference inside the relocated literal.

VERDICT: REJECT
