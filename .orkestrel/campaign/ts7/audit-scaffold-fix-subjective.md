<!-- workflow wf_771a9101-0fb, agent a5a611f220aaccb1d, captured from journal.jsonl -->

Lane held: subjective (design fit, prose, guide voice, test naming, builder shape and its TSDoc).

## Per-claim verdicts

**1. Prose items 1 to 10 read as prescribed and obey the writing law — BROKEN**

Every site reads as the brief prescribes, verbatim: item 1 at `guides/scaffold.md:1149`; item 2 at `:1150-1156` (the F3 sentence sits immediately after "the rollup then resolves no global type."); item 3 at `:1159-1162`; item 4 at `:1792-1794`; item 5 at `ROADMAP.md:41-43`; item 6 at `ROADMAP.md:83-85`; item 7 at `ROADMAP.md:48` ("an added rule"); item 8 at `tests/src/core/constants.test.ts:191-194`; items 9 and 10 at `PROPOSAL.md:47-49`, `:354-359`, `:1031-1034`, `:1159-1166`. No substitution-table term appears in any amended sentence.

The clause "no count of a growable set" fails. `guides/scaffold.md:1159` states "That workspace's `audit` reports **one** non-blocking `dependencies` question". That number answers "how many questions does the audit report", over a set the code grows: `releasesToQuestions` (`src/bin/helpers.ts:383`) returns "One non-blocking question for each stale floor and each crossed major", pushing independently at `:408` and at `:419`. The appositive names one member but the number asserts exhaustiveness, and exhaustiveness is not what the code produces. The prior text carried no number ("reports the shared major as a non-blocking `dependencies` question"), so this round introduced the count.

Right looks like: "That workspace's `audit` reports the crossed-major `dependencies` question every foreign row earns, non-blocking: the workspace declares major 6 while the registry serves a later major." The unit followed the brief exactly here — the count is in item 3's prescribed text, so the correction belongs to the brief as much as to the file.

**2. § Dependency floors is true of the code it describes — BROKEN on the umbrella; every enumerated pointer CONFIRMED**

Enumerated pointers, each read at its cited site:
- The `audit` question names the major the registry serves. `src/bin/helpers.ts:421` emits `declares major ${declared}, while the registry serves major ${published}`, and `published` comes from the served lookup at `:414-417`. The guide's "the workspace declares major 6 while the registry serves a later major" matches; `APP_BROWSER_TYPESCRIPT_RANGE` is `'^6.0.3'` (`src/core/constants.ts:549`), so major 6 is right.
- The override sentence names `''` (`guides/scaffold.md:1150-1151`).
- The lib-set versions match the installed declarations: `node_modules/@microsoft/api-extractor/package.json:3` is `7.59.0`, and its nested copy at `node_modules/@microsoft/api-extractor/node_modules/typescript/package.json:5` is `5.9.3`.
- The test-map sentence matches what the file proves: seeded rows as a set (`constants.test.ts:95`, `:109`), the floor form across the shared tables and the manifest (`:132`, `:145`, `:158`), the emitted range (`:182`) and the browser fork (`:195`).

The umbrella fails on the same sentence claim 1 names. `tests/src/bin/CLI.test.ts:1267-1308` is the executed proof that a single row at `^6.0.3` against a registry serving `6.0.4` and `7.0.0` earns two non-blocking `dependencies` questions — the stale floor and the crossed major — so the section states as one what the code emits as one-per-condition. One fix closes claims 1 and 2.

**3. The added compilers test — CONFIRMED**

`tests/src/core/compilers.test.ts:1449-1456` asserts `invokeOptions: { typescriptCompilerFolder: '' },` in the emitted `configs/src/vite.{core,browser,server}.config.ts` faces; `:1457-1459` asserts the bin face is defined and carries no `typescriptCompilerFolder`; the blueprint at `:1447` carries `bin: true`, so the control exists. `src/core/templates.ts:611` is the browser template's sole copy of that string (core at `:571`, server at `:641`), and the browser face's content derives from the template block at `:592-622`, so deleting `:611` breaks the loop's browser iteration. No `src/core/templates.ts` hunk appears in the diff and the status does not list the file.

**4. `buildPackument` — CONFIRMED**

`tests/setupServer.ts:1677-1699`: the first parameter is `string | readonly string[]`; for a string the emitted JSON is byte-identical to the prior form (same key order `dist-tags`, `name`, `versions`, same per-record `name`, `version`, spreads), so no existing call site changes behaviour and every one still typechecks; `latest` is the first array element and is what `dist-tags.latest` carries (`:1681`, `:1684`); the edge spreads sit inside the per-record map (`:1692-1694`), so they land on every published record; an empty array leaves `latest` undefined and throws (`:1682`). The TSDoc states the form at `:1655-1656` and explains the tag and edge decisions at `:1671-1675`. `tests/setupServer.test.ts` gains exactly one row over the multi-version form. Both shared `/typescript` rows in `tests/src/bin/CLI.test.ts` (`:142-148`, `:265-271`) call `buildPackument` with no inline `JSON.stringify`. The two per-test packuments at `:1273` and `:1336` are recorded in the report's deviation 4 at those exact lines, so neither is hidden — see finding F3 for what that record gets wrong.

**5. `PROPOSAL.md` — CONFIRMED**

Token-by-token over each hunk's removed and added lines: the `:44-49` and `:1031-1034` paragraphs are pure rewraps with an identical token sequence; the `:354-359` and `:1159-1166` paragraphs differ only by the two prescribed amendments — the inserted ", preview surfaces that 7.1 replaces," and the replacement of "at no dependency cost because …" with "because … ; that entry is a preview surface (TypeScript 7.1 ships a different API) and spawns the platform's native compiler binary, so the swap is a measured cost rather than a free one". Every rewrapped line sits at or under 100 columns.

Both amended sentences are true against the record: `.orkestrel/campaign/ts7/orchestrator-measurements.md:86` states Microsoft's 7.0 post says 7.0 ships "without shipping an API" and 7.1 ships "a new (and different) API", so `unstable/*` is a preview with no stability promise; `.orkestrel/campaign/ts7/absorb-distillate.md:94` records that `typescript/unstable/sync` uses `getExePath` plus a `spawn` of the platform binary `@typescript/typescript-<platform>`.

**6. `host.json` — CONFIRMED.** The diff carries two hunks only: the `guides/scaffold.md` entry digest at `:685` and the root digest at `:775`.

**7. No file outside the owned set changed — CONFIRMED.** The diff touches `PROPOSAL.md`, `ROADMAP.md`, `guides/scaffold.md`, `host.json`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/src/bin/CLI.test.ts`, `tests/src/core/compilers.test.ts`, `tests/src/core/constants.test.ts` — all owned. `src/core/templates.ts` is absent from both the diff and the status. The status's other entries are all under `.orkestrel/campaign/ts7/`.

## Findings outside the claims

**F1. `tests/src/core/compilers.test.ts:1445` — the test name names a population it then refutes.** The name is "sets the rollup's compiler folder override in every emitted published face", and `:1457-1459` asserts the emitted `configs/src/vite.bin.config.ts` face carries no override. The bin face is emitted and its output is published, so the name's plain reading contradicts the test's own control. The sibling at `:1407` uses the identical phrase "every emitted published face" for a different population — `{browser, server}` — per its comment at `:1404`. This matters because a reader who reddens either test reads the name first, and one phrase now names three populations across two adjacent tests, against "one concept, one term". Right looks like: name the new test for the population it proves — `sets the rollup's compiler folder override in every declaration-rolling face` — and keep bin named as the control in the comment at `:1440-1444`, which already states it correctly.

**F2. `tests/setupServer.ts:1681, 1687` — the builder destructures a list only to rebuild it.** `const [latest, ...rest] = …` at `:1681` is followed by `[latest, ...rest].map(…)` at `:1687`, which reconstructs the same list the destructure came from. The `rest` binding earns nothing and the reader has to check that the rebuilt array is the original. Right looks like: bind the list once — `const published = typeof version === 'string' ? [version] : version` — take `const latest = published[0]`, keep the `undefined` throw, and map over `published`.

**F3. `tmp/units/ts7-seven-fix-report.md:156-160` — deviation 4's record of the remaining leftovers is wrong twice.** It reads "Two inline `/typescript` packuments remain in `tests/src/bin/CLI.test.ts`, at `:1271` and `:1336`." The packument at `tests/src/bin/CLI.test.ts:1336` serves `/oxfmt`, not `/typescript` (`:1334`), and a third inline `JSON.stringify` packument sits at `:3588`, also `/oxfmt`, which the record does not mention at all. This matters because the deviation is explicitly written for "whichever change next owns that file": that unit will search for two typescript rows, find one, and leave the third leftover unconverted. Right looks like: record the leftovers by site and endpoint — `:1273` (`/typescript`), `:1336` (`/oxfmt`), `:3588` (`/oxfmt`) — and state that each is a per-test override shaped for its own scenario.

**F4. `PROPOSAL.md:355` — the inserted clause outruns its source and reads as a list item.** "preview surfaces that 7.1 replaces" asserts replacement, where `.orkestrel/campaign/ts7/orchestrator-measurements.md:86` records only that 7.1 ships "a new (and different) API" over a surface with no stability promise; `ROADMAP.md:61` states the same fact in the weaker form the record supports. Set inside commas between "entries" and "and `@orkestrel/guide`'s `Source` is text-only", the appositive also reads as the second item of a three-item list. Right looks like: "entries — preview surfaces TypeScript 7.1 supersedes with a different API — and `@orkestrel/guide`'s `Source` is …", which fixes both the strength and the parse.

## Referral

**R1 (objective lane, or the Orchestrator while it holds every lane).** `tests/setupServer.ts:1682` adds a throw on an empty array, and `tests/setupServer.test.ts` gains only the multi-version happy-path row. `.claude/rules/tests.md` § Test contract names empty input as a case to cover, and the `setup` project is where this builder's behaviour is proven. Whether that boundary needs its own row is a test-sufficiency ruling I do not make in this lane.

VERDICT: FAIL 1, 2; outside the claims: F1, F2, F3, F4
