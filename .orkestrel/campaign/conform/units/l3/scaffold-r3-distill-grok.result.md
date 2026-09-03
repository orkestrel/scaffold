I'll read the brief first, then follow it exactly and read-only.The brief is a per-row evidence map. Next I’ll load the unit brief, audit brief, report, and evidence files.Inputs are loaded. I’ll pin each row’s current site, then match it against the diff, report, and sweeps.Sites for the guide rows are in. Next I’ll read the remaining source sites, the matching diff hunks, and the proof files.Sweeps need to stay on `src`, `tests`, and the named guides. I’ll restrict paths and pull residue, writing, and remaining site facts.Checking a few remaining line citations and whether the fleet tree is reachable for the breaking sweep.## Question

For every row of unit conform-scaffold, what does the tree at `/home/user/scaffold` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Evidence

### scaffold-subj-1

**Site now.** Brief `guides/scaffold.md:1508-1509` has moved. Current:

```1510:1517:guides/scaffold.md
The compiler, the materializer, and the upstream reader each publish an emitter; `WriteTransaction`
publishes none and reports through its return values and its thrown errors. The compiler emits
`compile`, `audit`, `block`, `error`, and `destroy`; the materializer emits `write`, `remove`,
`finish`, `error`, and `destroy`; the upstream reader emits `release`, `mirror`, `file`, `error`,
and `destroy`. Every error raised after construction is emitted on `error` immediately before it is
thrown, so an observer sees a refusal even where the caller catches it; a constructor refusal
precedes the emitter and is thrown alone.
```

`UpstreamEventMap` still lists `file` at `src/server/types.ts:303-309`.

**Diff at the site.** `guides/scaffold.md` `@@ -1504,10 +1508,13 @@`. Operative repair text is present in the `+` lines, split across two lines: `+the upstream reader emits `release`, `mirror`, `file`, `error`,` and `+and `destroy`.` Verbatim as a single line: no. Verbatim as the listed events in declaration order: yes.

**Old form sweep.** Pattern `upstream reader emits` over `src`, `tests`, `guides/scaffold.md`, `guides/README.md`, `README.md`: hit `guides/scaffold.md:1514` (corrected sentence, includes `file`). Exact stale list without `file`: no hit. Inflections `emit`/`emits`/`emitted`/`emitting` of that stale event list: no hit of the list without `file`.

**Report reading.** Table: `applied` — “`guides/scaffold.md` names `file` in the upstream reader's event list, in `UpstreamEventMap` order”. Sweep row cites `guides/scaffold.md:1511`; that line is now `1514`. The cited line number does not carry the sentence; `1514` does.

**Proof reading.** Documentation row. Report sweep for `upstream reader emits|reader emits \`release\`|\`mirror\`, \`error\`|Errors are emitted immediately` over `README.md`, `guides/*.md`, `src/**`, `tests/**`: “One hit, the corrected sentence at `guides/scaffold.md:1511`”. This sweep agrees on the hit and on the stale list being gone; the line number has moved to `1514`.

### scaffold-subj-2

**Site now.** Brief `guides/scaffold.md:1507` is now `1511-1517` (quoted above). `WriteTransaction` getters remain `target`, `expectations`, `open` at `src/server/WriteTransaction.ts:212-223`. Pattern `emitter` over that class file: no hit.

**Diff at the site.** Same hunk `@@ -1504,10 +1508,13 @@`. Operative replacements present in `+` lines: `+The compiler, the materializer, and the upstream reader each publish an emitter; `WriteTransaction`` / `+publishes none and reports through its return values and its thrown errors.` and `+Every error raised after construction is emitted on `error` immediately before it is` / `+thrown, so an observer sees a refusal even where the caller catches it; a constructor refusal` / `+precedes the emitter and is thrown alone.` Verbatim: yes, wrapped.

**Old form sweep.** `Every entity publishes` / `Errors are emitted immediately`: no hit in `src`, `tests`, `guides/scaffold.md`, `guides/README.md`, `README.md`. Inflections `publish`/`publishes`/`published`/`publishing` of the universal claim: no hit of “Every entity publishes an emitter”.

**Report reading.** Table: `applied` — “`guides/scaffold.md` replaces the universal emitter claim and qualifies the error-emission claim”. Matches the current paragraph. Sweep `emitter` over `src/server/WriteTransaction.ts`: “No match”. This sweep: no match.

**Proof reading.** Documentation row. Report’s combined old-form pattern includes `Every entity publishes`; this sweep finds no hit in the named paths. Agrees.

### scaffold-subj-3

**Site now.** Brief `README.md:72` is now `75-77`:

```73:77:README.md
workspace owns — its source, its own proofs, its README — is written once at creation and is never
rewritten here. Not everything is owned that way: `tests/distribution.test.ts` is restored when it
is absent and left alone when the workspace has replaced it, and the manifest's script region is
rewritten when its chain is the one scaffold generated and refused without a write when it is not.
```

Current `README.md:72` is `npx scaffold repair` (fence), not the owned-that-way sentence.

**Diff at the site.** `README.md` `@@ -69,7 +72,7 @@`. `+rewritten here. Not everything is owned that way: `tests/distribution.test.ts` is restored when it` — operative replacement verbatim: yes. Finder’s rewrite is not in the `+` lines.

**Old form sweep.** `Two paths are not owned`: no hit in `src`, `tests`, `guides/scaffold.md`, `guides/README.md`, `README.md`. Inflections of that phrase: no hit.

**Report reading.** Table: `applied` — “`README.md:72` count deleted; both count sweeps ruled”. The sentence lives at `README.md:75`, not `:72`. Count-sweep rulings at `:6`, `:40`, `:61`, `:74`, `:95` still match those lines (`:74` “the one scaffold generated” is now on `:77`).

**Proof reading.** Documentation row. Report: number-word sweep on `README.md` with five permitted hits; numeral-noun sweep no match. This sweep of `Two paths are not owned` over the named paths: no hit. Agrees on the old form being gone. Does not re-run the full number-word sweep of `README.md` here beyond confirming the old phrase is absent.

### scaffold-subj-4

**Site now.** Brief lines still hold the four names; summaries are imperative:

```227:229:guides/scaffold.md
| `isFloorPath`               | function | Test whether a destination's floor bytes survive a live overlay.              |
| `isRetainedPath`            | function | Test whether another surface owns a target's present bytes at a path.         |
```

```391:393:guides/scaffold.md
| `listCanonPaths`          | function | List the canon paths a target holds, filtered to a plan's groups.                     |
| `listDirectories`         | function | List a directory's descendant directories as sorted root-relative paths.              |
```

```403:405:guides/scaffold.md
| `pruneEmptiedDirectories` | function | Remove every directory one set of deletions emptied.                                  |
| `readAnchor`              | function | Capture one directory's physical identity.                                            |
```

**Diff at the site.** `@@ -222,8 +225,8 @@`, `@@ -385,7 +388,7 @@`, `@@ -397,7 +400,7 @@`. All four operative summaries present verbatim in `+` lines.

**Old form sweep.** Paths `src`, `tests`, `guides/scaffold.md`, `guides/README.md`, `README.md`.

- `Checks whether a destination`: `src/core/helpers.ts:251` (TSDoc for `isFloorPath`)
- `Checks whether another surface`: `src/core/helpers.ts:172` (TSDoc for `isDeferredPath`, not `isRetainedPath`)
- `Lists the canon paths`: `src/server/helpers.ts:834`
- `Removes every directory`: `src/server/helpers.ts:878`
- Inflection `removes every directory`: `guides/scaffold.md:1481`, `tests/src/server/WriteTransaction.test.ts:395`, `:563`
- `Checking`/`Checked`/`Listing`/`Listed`/`Removing`/`Removed` of those four summaries: no further hit

**Report reading.** Table: `applied` — “Four Surface summaries rewritten to the table's imperative form, column alignment preserved”. Matches the four cells. Report attributes the seven hits to TSDoc, `guides/scaffold.md:1478`, and the two test titles. Current guide prose is `1481`, not `1478`. TSDoc and test-title hits match.

**Proof reading.** Documentation row. Report sweep result “Seven hits, all outside the edited surfaces”. This sweep finds the same seven sites (guide prose line moved to `1481`). Agrees on the Surface cells; disagrees on the guide line number `1478`.

### scaffold-subj-6

**Site now.** `matchesDriftReachability` block is `src/core/helpers.ts:647-687`, `@example` at `:660-681`. Compilers:

- `blueprintToGuideArtifacts` `@example` `src/core/compilers.ts:1364-1371`, export `:1373`
- `blueprintToDocumentArtifacts` `@example` `:1436-1443`, export `:1445`
- `blueprintToOrchestrationArtifacts` `@example` `:1489-1498`, export `:1500`

`SERVICE_SCRIPT_PATH` is `'scripts/service.sh'` at `src/core/constants.ts:302`.

**Diff at the site.** `src/core/helpers.ts` `@@ -656,6 +656,29 @@`; `src/core/compilers.ts` `@@ -1360,6 +1360,15 @@`, `@@ -1423,6 +1432,15 @@`, `@@ -1467,6 +1485,17 @@`. Operative inline calls such as `matchesDriftReachability('birth', { path: 'README.md', … })` are not in the `+` lines. Present instead: named `Finding` values and `matchesDriftReachability('birth', aligned) // true` / `matchesDriftReachability('birth', stale) // false`. Compiler answers `'guides/README.md'`, `['README.md', 'AGENTS.md', 'CLAUDE.md']`, `[]`, `'scripts/service.sh'` are in the `+` lines. `.length` answers: not present.

**Old form sweep.** Row adds examples; it does not rename or remove a symbol. No old-name population. Sweep of the four export names: they remain as the exports being documented.

**Report reading.** Table: `applied` — “Four `@example` fences added; each new claim driven and answered by `test:distribution`”. The four fences exist. Report does not cite a `file:line` for the example bodies.

**Proof reading.** Behavioural. Report: `npm run test:distribution` red `scaffold-proofs/subj6-red-control.txt`, green `scaffold-proofs/subj6-distribution.txt`. Files exist.

- `subj6-red-control.txt`: `Tests  2 failed | 3 passed (5)`; body includes `"matchesDriftReachability('birth', aligned) // false answered true"`
- `subj6-distribution.txt`: `Tests  1 failed | 4 passed (5)`; remaining failure is `installs the packed scaffold…` at `tests/distribution.test.ts:905`

Report’s quoted planted mismatch matches the red file. Report’s “4 passed and 1 failed” matches the green file’s Tests line. Report’s claim that `mismatched` stayed at two existing controls on the green run is not visible as a Tests summary in `subj6-distribution.txt` (that file shows the registry case only).

### scaffold-subj-7

**Site now.** Brief `guides/scaffold.md:16-17` is now `16-20`:

```15:20:guides/scaffold.md
That root stages the vendored set and the instruction canon, and a target meets them differently.
`HOST_PATHS` names the vendored set — the licence, the harness permission file, the
session-start hooks, the shared policy register, the shared policy proof, the shared policy plugin,
the shared configuration leaf and its proof, the byte-identical root dotfiles, and the guide mirrors
a generated workspace starts from, never its own guide — and each target carries its own copy of
the paths it selects, which the verbs write and compare.
```

`README.md:10-14` carries the parallel “Each target carries…” sentence. Vendored-root restatement `guides/scaffold.md:1196-1199`. `HOST_PATHS` members `src/core/constants.ts:132-153`. `@remarks` `src/core/constants.ts:114-120`.

**Diff at the site.** `guides/scaffold.md` `@@ -13,8 +13,11 @@`; `README.md` `@@ -7,15 +7,18 @@`; also `guides/scaffold.md` `@@ -1190,10 +1193,11 @@` and `src/core/constants.ts` `@@ -112,11 +112,12 @@`. Original operative replacement (“the licence, the harness permission file, the bench scripts, the shared policy register, the byte-identical root dotfiles, and the guide mirrors…”) is not verbatim in the `+` lines. The `+` lines carry the later expanded member list (session-start hooks, policy proof, plugin, configuration leaf, “never its own guide”).

**Old form sweep.** `the toolchain, the policy proofs` / `its toolchain, its policy proofs`: no hit in `src`, `tests`, `guides/scaffold.md`, `guides/README.md`, `README.md`. Residual `the bench scripts`: `guides/scaffold.md:945`, `src/core/templates.ts:2045`.

**Report reading.** Table: `applied` — “`guides/scaffold.md:16` and `README.md:10` name the set `HOST_PATHS` holds”. Those lines do start the expanded sentences. Fix-round 2 block quotes `README.md:10-14`, `guides/scaffold.md:16-20`, `:1195-1199`, `src/core/constants.ts:114-119`; those passages match the tree (`constants.ts` remarks run through `:120`).

**Proof reading.** Documentation row. Report’s old-form pattern includes `the toolchain, the policy proofs|its toolchain, its policy proofs`. This sweep: no hit of those exact phrases. Agrees. Report does not record `the bench scripts` at `guides/scaffold.md:945` / `src/core/templates.ts:2045`.

### scaffold-obj-1

**Site now.** `package.json:65` `"lint": "oxlint --config .oxlintrc.json --fix ."`. `lint:check` unchanged at `:73` `"oxlint --config .oxlintrc.json --deny-warnings ."`. Generator still emits the table form at `src/core/compilers.ts:286-287`.

**Diff at the site.** `package.json` `@@ -62,7 +62,7 @@`. `+"lint": "oxlint --config .oxlintrc.json --fix .",` — operative text verbatim: yes.

**Old form sweep.** `deny-warnings` in `src`, `tests`, `guides/scaffold.md`, `README.md`: `src/core/compilers.ts:287` (`lint:check`); `tests/src/core/fixtures/source-manifest.txt:44`; `tests/src/core/fixtures/setup-false-manifest.txt:44`. The mutating `lint` string with `--fix --deny-warnings`: no hit. `package.json:73` still has `--deny-warnings` on `lint:check` (outside the report’s sweep paths).

**Report reading.** Table: `applied` — “`package.json:65` `lint` is `oxlint --config .oxlintrc.json --fix .`”. That line carries that value. Sweep: “Three hits, all `lint:check`”. This sweep agrees on those three paths.

**Proof reading.** Placement row. Report sweep and this sweep agree on `deny-warnings` remaining only on `lint:check` in `src`/`tests`/guides/README.

### scaffold-obj-2

**Site now.** Brief `src/core/factories.ts:44` is still `export function createBlueprint(...)`. The file is unchanged in the unit diff. Proof file exists at `tests/src/core/factories.test.ts` (new, `@@ -0,0 +1,114 @@`).

**Diff at the site.** No hunk in `src/core/factories.ts`. Repair text lives in the new test file. Present in `+` lines: defaults from `DEFAULT_VERSION`/`DEFAULT_ENGINES`, empty collections, flags `false`, supplied string/list/boolean win, `'description' in …` false/true, list push after call, `createBlueprint('Router').name` is `'Router'`, `isScaffoldError` / `INVALID`. Operative case (f) `src: ['browser', 'nowhere']` through an `unknown`-typed record: not present. Present instead: collection-bound `MAX_COLLECTION_ITEMS + 1` and empty name.

**Old form sweep.** Row adds a missing mirror; no renamed symbol. `describe('createBlueprint` now hits `tests/src/core/factories.test.ts` (several `describe('createBlueprint …')` blocks).

**Report reading.** Table: `applied` — “`tests/src/core/factories.test.ts` added; three planted-body controls read red, restored green”. File exists. Report does not claim the `nowhere` input.

**Proof reading.** Behavioural. Report command `npm run test:src:core`. Files exist:

- `obj2-red-control.txt`: `Tests  2 failed | 386 passed (388)`
- `obj2-red-control-2.txt`: `Tests  9 failed | 379 passed (388)`
- `obj2-red-control-3.txt`: `Tests  13 failed | 375 passed (388)`
- `obj2-green.txt`: `Tests  388 passed (388)`

Report’s red `2 failed, 386 passed (388)` and green `388 passed (388)` match `obj2-red-control.txt` and `obj2-green.txt`.

### scaffold-obj-3

**Site now.** Brief `tests/src/server/WriteTransaction.test.ts:206` is still the first skip:

```203:207:tests/src/server/WriteTransaction.test.ts
	// Skipped where `supportsMode` reports that a written mode does not round-trip
	// through `stat`, because a host that cannot store the bit cannot distinguish
	// a set bit from an unset one and the assertion would measure the host.
	it.skipIf(!supportsMode())('sets the executable bit when asked', () => {
```

Second skip `it.skipIf(!supportsMode())('clears the executable bit when not asked'` at `:227`. Helpers: `tests/src/server/helpers.test.ts:1578-1582`. Left unchanged: `WriteTransaction.test.ts:281` and `helpers.test.ts:596` still `it.skipIf(process.platform === 'win32')`.

**Diff at the site.** `WriteTransaction.test.ts` `@@ -15,7 +15,7 @@`, `@@ -200,10 +200,10 @@`, `@@ -221,10 +221,10 @@`; `helpers.test.ts` `@@ -88,7 +88,7 @@`, `@@ -1575,9 +1575,11 @@`. `+import { createScratch, supportsMode } from '@orkestrel/test/server'` and `+	it.skipIf(!supportsMode())` — operative text present: yes. Finder’s `matchesRoundTrippedMode`: not present.

**Old form sweep.** `it.skipIf(process.platform === 'win32')` in `src`/`tests`/`guides`/`README`: remaining `tests/src/server/helpers.test.ts:596`, `tests/src/server/WriteTransaction.test.ts:281` (the two the row said to leave). The three repaired titles no longer use that predicate. `matchesRoundTrippedMode`: no hit. `isBrowserVuePath` N/A here.

**Report reading.** Table: `applied` — “Three skips read `supportsMode` from `@orkestrel/test/server`; control proves the cases execute”. Matches the three sites. “`WriteTransaction.test.ts:281` and `helpers.test.ts:596` are unchanged”: those lines still skip on `win32`.

**Proof reading.** Behavioural. Report `npm run test:src:server`. Files exist:

- `obj3-red-control.txt`: `Tests  3 failed | 428 passed (431)`
- `obj3-green.txt`: `Tests  431 passed (431)`

Report’s red/green counts match those Tests lines.

### scaffold-obj-4

**Site now.** Brief `src/server/types.ts:356` still holds:

```355:357:src/server/types.ts
export interface ReadAllowance {
	remaining: number
}
```

`@remarks` at `:347-353` still state deliberate mutability. No `ReadAllowance.ts` class file.

**Diff at the site.** No hunk in `src/server/types.ts`. Operative repair while the exemption stands: no edit. Matches.

**Old form sweep.** Row removes nothing. `remaining: number` (non-readonly) still at `:356`.

**Report reading.** Table: `noop` — “The row directs no edit while the exemption stands, and the Orchestrator has not overturned it”. Pointer `src/server/types.ts:355-357` still declares that interface; `:347-354` remarks still describe the mutability (remarks end `:353`).

**Proof reading.** Placement/exemption row. Report: no sweep of an old name. Nothing to agree or disagree on for an old-form sweep.

### scaffold-obj-5

**Site now.**

```565:577:src/bin/helpers.ts
 * A lone carriage return is folded as a break too, because a terminal repaints
 * the line already printed on one. The fold is a replacement rather than a line
 * split, so no bare `\r` is read as a line terminator here.
…
export function sanitizeLine(line: string): string {
	return stripControls(strip(line)).replace(/\r\n|\r|\n/gu, ' ')
}
```

`tests/src/bin/helpers.test.ts:540` `expect(sanitizeLine('first\rsecond')).toBe('first second')`. CLI case `tests/src/bin/CLI.test.ts:427-435` uses `createSink` (imported `:59` from `../../setupServer.js`) and `new CLI({ ...REGISTRY_OPTIONS, ...sink.options })`, not `new CLI(sink.options)`.

**Diff at the site.** `src/bin/helpers.ts` `@@ -562,6 +562,9 @@`, `@@ -571,7 +574,7 @@`; `helpers.test.ts` `@@ -537,6 +537,7 @@`; `CLI.test.ts` `@@ -424,6 +424,16 @@`. Operative body `replace(/\r\n|\r|\n/gu, ' ')` verbatim in `+` lines: yes. Finder’s `split(/\r\n|\r|\n/u)`: not present. CLI `new CLI(sink.options)` verbatim: no.

**Old form sweep.** `split(/\r?\n/)` / `.split(/\r?\n/).join(' ')`: no hit in `src`, `tests`, `guides/scaffold.md`, `guides/README.md`, `README.md`.

**Report reading.** Table: `applied` — “`sanitizeLine` folds a lone `\r`; helpers and CLI proofs read red first”. Matches the body and the two new assertions.

**Proof reading.** Behavioural. Report `npm run test:src:bin`. Files exist:

- `obj5-red-control.txt`: `Tests  2 failed | 243 passed (245)`
- `obj5-green.txt` and `obj5-green-final.txt`: `Tests  245 passed (245)`

Report’s red/green counts match. `obj5-red.txt` shows `Tests  7 failed | 238 passed (245)` as the earlier dirty capture the report describes.

### fleet-F1

**Site now.** `tests/setup.ts` exists (header imports from `@src/core`, including `HOST_PATHS` at `:32`). Pattern `isBrowserVuePath` over `src`, `tests`, `guides/scaffold.md`, `guides/README.md`, `README.md`: no hit. `tests/setup.test.ts`: no such file. `src/browser`, `app/browser`, `tests/setupBrowser.ts`: no such paths. `package.json` has no `test:setup` script. `vite.config.ts` uses `./tests/setup.ts` as `setupFiles` (`:44`, `:91`, `:124`, `:139`, `:150`, `:165`, `:176`, `:194`) and excludes `tests/setup.test.ts` at `:164`.

**Diff at the site.** No hunk in `tests/setup.ts`. Helper already absent.

**Old form sweep.** `\bisBrowserVuePath\b` and case-insensitive inflections: no hit in the named paths.

**Report reading.** Table: `noop` — “`tests/setup.ts` declares no `isBrowserVuePath` and no `tests/setup.test.ts` exists”. Matches. Report’s `ls` of `tests/` and `src/` (no browser environment) matches the globs above.

**Proof reading.** Placement row. Report sweep empty; this sweep empty. Agrees.

### fleet-F2

**Site now.** Pattern `readonly id: string` over `src`: no hit. Implementation classes’ fields are all `#`: `Compiler` `src/core/Compiler.ts:83-84`; `Materializer` `src/server/Materializer.ts:130-135`; `Upstream` `src/server/Upstream.ts:114-125`; `WriteTransaction` `src/server/WriteTransaction.ts:103-112`; `CLI` `src/bin/CLI.ts:147-152`. No public `readonly id` data field ahead of `#` fields.

**Diff at the site.** No hunk on those class files.

**Old form sweep.** `readonly id: string` in `src`: no hit.

**Report reading.** Table: `noop` — “No implementation class declares a public `readonly id: string` data field”. Matches the classes named in the report.

**Proof reading.** Placement row. Report `grep -rn "readonly id: string" …/src` empty. This sweep empty. Agrees.

---

### Scope

Status paths from `/home/user/work/evidence/conform-scaffold.status`, tagged against the brief’s § Scope plus the round-1 amendment (`host.json` owned; `.orkestrel/**` campaign record, neither Owned nor Off-limits):

| Path | Tag |
| --- | --- |
| `.orkestrel/campaign/conform/reports/conform-scaffold-report.md` | neither (campaign record) |
| `.orkestrel/campaign/conform/units/l3/scaffold-fix2-sol-result.md` | neither (campaign record) |
| `README.md` | owned |
| `guides/scaffold.md` | owned |
| `host.json` | owned (amendment) |
| `package.json` | owned (`scripts.lint`) |
| `src/bin/helpers.ts` | owned |
| `src/core/compilers.ts` | owned |
| `src/core/constants.ts` | owned |
| `src/core/helpers.ts` | owned |
| `tests/guides.test.ts` | owned (not in the vendored exception list) |
| `tests/src/bin/CLI.test.ts` | owned |
| `tests/src/bin/helpers.test.ts` | owned |
| `tests/src/core/factories.test.ts` | owned |
| `tests/src/server/WriteTransaction.test.ts` | owned |
| `tests/src/server/helpers.test.ts` | owned |

Hunks whose **file** no row’s Where names (`file @@ hunk`, first `+` line):

- `.orkestrel/campaign/conform/reports/conform-scaffold-report.md @@ -338,3 +338,31` first `+` is blank, then `+## Fix round 2`
- `.orkestrel/campaign/conform/units/l3/scaffold-fix2-sol-result.md @@ -0,0 +1,54` `+## New passages`
- `host.json @@ -682,7 +682,7` `+			"digest": "64cad29a5d5259c02ea49ea4323ff0b25e8a15a7c1cdef9edf506ce19cc6ab0b"`
- `host.json @@ -772,5 +772,5` `+	"digest": "506992abfc264b6aeebf3fc41141e749553bf0fca1a7d694a1887da0da345e22"`
- `src/core/constants.ts @@ -112,11 +112,12` `+ * These are the files the fleet shares verbatim, and each target holds a copy`
- `src/core/compilers.ts @@ -1360,6 +1360,15` `+ *` (then `@example`); `@@ -1423,6 +1432,15`; `@@ -1467,6 +1485,17`
- `tests/guides.test.ts @@ -3,12 +3,12` `+	fenceImports,`; `@@ -99,7 +99,7` `+			for (const key of missingSymbols(source.surface(), guide.surface())) {`; `@@ -109,7 +109,7`; `@@ -185,7 +185,7` `+				for (const statement of fenceImports(fence.code)) {`
- `tests/src/bin/CLI.test.ts @@ -424,6 +424,16` `+	it('repaints no printed line from a lone carriage return in an argument', async () => {`
- `tests/src/bin/helpers.test.ts @@ -537,6 +537,7` `+		expect(sanitizeLine('first\rsecond')).toBe('first second')`
- `tests/src/core/factories.test.ts @@ -0,0 +1,114` `+import type { Dependency } from '@src/core'`
- `tests/src/server/helpers.test.ts @@ -88,7 +88,7` `+import { createScratch, supportsFileLinks, supportsMode } from '@orkestrel/test/server'`; `@@ -1575,9 +1575,11`

`src/core/factories.ts` is named in obj-2 Where and has no diff hunk.

### Residue

**Diff `+` lines** for `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`: no `+` line hit. The `console.log` on the `copy` script at `conform-scaffold.diff:246` is hunk context, not a `+` line.

**Tree `src` and `tests`**, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:

`\.skip\(`:
- `src/core/templates.ts:1732` `return context.skip('…')`
- `src/core/templates.ts:1965` `return context.skip(\`No browser launched. …\`)`

`\.only\(` / `\.todo\(` / `TODO` / `FIXME` / `debugger` in that population: no hit (`debugger` only in excluded `tests/setupPolicy.ts:1991`, `:2002`).

`retry`:
- `src/server/types.ts:320`
- `src/server/validators.ts:446`
- `tests/src/server/WriteTransaction.test.ts:262`
- `tests/src/server/Upstream.test.ts:704`

`timeout`:
- `src/core/types.ts:60`
- `src/core/templates.ts:1092`
- `src/server/types.ts:316`, `:317`, `:330`, `:334`
- `src/server/constants.ts:103`, `:127`
- `src/server/validators.ts:208`, `:462`, `:463`
- `src/server/Upstream.ts:96`, `:108`, `:163`, `:168`, `:764`, `:771`, `:778`, `:787`, `:788`, `:797`, `:801`, `:808`, `:815`, `:826`
- `tests/setupServer.ts:167`, `:362`, `:364`, `:652`, `:654`, `:658`, `:660`
- `tests/src/server/WriteTransaction.test.ts:280`
- `tests/src/core/compilers.test.ts:1132`
- `tests/src/server/Upstream.test.ts:1471`, `:1477`
- `tests/src/core/templates.test.ts:1091`
- `tests/src/bin/main.test.ts:137`, `:160`, `:192`

`console.`:
- `src/core/compilers.ts:283` (`copy` script template)
- `tests/src/core/templates.test.ts:247`

### Parity

The unit diff does not touch `src/**/types.ts` or a class file. No interface call-signature / `## Methods` pairing is owed to a types or class hunk.

Readonly data on `WriteTransaction` (unchanged class, named in added guide prose): `get target` `src/server/WriteTransaction.ts:212`, `get expectations` `:217`, `get open` `:222`. Guide Classes row `guides/scaffold.md:424`; method table `guides/scaffold.md:464-473` lists `write`, `copy`, `establish`, `remove`, `commit`, `discard` and does not list `target` / `expectations` / `open`. `CompilerInterface` `src/core/types.ts:590-614` members `emitter`, `compile`, `audit`, `destroy`; guide `guides/scaffold.md:433-439` lists `compile`, `audit`, `destroy` (no `emitter` row). Diff did not edit those files.

Backticked identifiers in **added** guide sentences (`+` lines of `guides/scaffold.md`):

| Identifier | Barrel |
| --- | --- |
| `HOST_PATHS` | `src/core/index.ts:2` `export * from './constants.js'` |
| `WriteTransaction` | `src/server/index.ts:5` `export * from './WriteTransaction.js'` |
| `compile`, `audit`, `block`, `error`, `destroy`, `write`, `remove`, `finish`, `release`, `mirror`, `file` | event names, not barrel exports |
| `isFloorPath`, `isRetainedPath` | via `src/core/index.ts:8` `./helpers.js` |
| `listCanonPaths`, `pruneEmptiedDirectories` | via `src/server/index.ts:4` `./helpers.js` |

Surface-table backticks in the same hunks are existing names with rewritten summaries, not new exports.

### Gates

Quoted from the report’s § Gates table:

| Gate | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | `gate-format-check-final.txt` |
| `npm run lint:check` | 0 | `gate-lint-check-final.txt` |
| `npm run check` | 2 | Two errors, both in `tests/guides.test.ts` — see § Deviation |
| `npm run check:src` | 0 | `gate-check-src.txt`; the scoped core, server, and bin isolation passes |
| `npm run build` | 0 | `gate-build.txt` |
| `npm test` | 1 | Three failures, all in the `guides` project — see § Deviation |

Control files: `gate-format-check-final.txt` contains “All matched files use the correct format.” `gate-lint-check-final.txt` contains only the npm script banner (no oxlint body). `gate-check.txt` still shows `extractFenceImports` / `findMissingSymbols` errors in `tests/guides.test.ts`; the tree now imports `fenceImports` / `missingSymbols` at `tests/guides.test.ts:6`, `:11`, `:102`, `:188`. `gate-test.txt`: `Tests  3 failed | 14 passed (17)` for guides; `src:core` `388 passed (388)`; `src:server` `431 passed (431)`; `src:bin` `245 passed (245)`.

### Breaking

Report § Breaking: “No published symbol was renamed or removed, so no consumer edit is obliged.” It then records the vendored `guides/scaffold.md` surface moving (`host.json` digests). No renamed published scaffold symbol is named, so the old-name fleet sweep has an empty population from that section.

The Orchestrator-applied `tests/guides.test.ts` import rename (`extractFenceImports` → `fenceImports`, `findMissingSymbols` → `missingSymbols`) is of `@orkestrel/guide` symbols, not this package’s published API. Those old names are absent from `/home/user/scaffold/src` and `/home/user/scaffold/tests`. They remain in other fleet checkouts’ `tests/guides.test.ts`, including `/home/user/fleet/program/tests/guides.test.ts:22`, `:24`, `:84`, `:88`, `:92`, `:95`, `:98`, `:158`; `/home/user/fleet/workflow/tests/guides.test.ts:26`, `:28`, `:99`, `:103`, `:107`, `:110`, `:113`, `:173`; `/home/user/fleet/worker/tests/guides.test.ts:13`, `:15`, `:94`, `:98`, `:102`, `:105`, `:108`, `:168`; `/home/user/fleet/brief/tests/guides.test.ts:13`, `:15`, `:123`, `:124`, `:128`, `:129` (Grep truncated; further fleet files exist).

### Writing sweep

Over the diff’s `+` lines in `guides/**`, `README.md`, doc comments in `src/**`, and test titles and comments in `tests/**`:

Word list `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`: no hit in that population. (Hits outside it: `.orkestrel/.../scaffold-fix2-sol-result.md` `+## New passages` and `registry's latest releases`; `tests/src/bin/CLI.test.ts` body `+			await new CLI({ ...` — constructor call, not a title or comment.)

Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` on those `+` lines: no hit.

## Distillate

- scaffold-subj-1: site now `guides/scaffold.md:1514-1515` (brief `:1508-1509`) | diff present yes | old form hits 0 | report matches no (`:1511` cited; sentence is `:1514`)
- scaffold-subj-2: site now `guides/scaffold.md:1511-1517` (brief `:1507`) | diff present yes | old form hits 0 | report matches yes
- scaffold-subj-3: site now `README.md:75` (brief `:72`; `:72` is now the `repair` fence) | diff present yes | old form hits 0 | report matches no (cites `:72`)
- scaffold-subj-4: site now `guides/scaffold.md:228,229,391,403` | diff present yes | old form hits 7 | report matches no (cites guide `:1478`; prose is `:1481`)
- scaffold-subj-6: site now `src/core/helpers.ts:660-681` and `src/core/compilers.ts:1364-1371,1436-1443,1489-1498` | diff present yes (answers yes; inline objects no) | old form hits 0 | report matches yes
- scaffold-subj-7: site now `guides/scaffold.md:16-20` and `README.md:10-14` | diff present yes (original operative “bench scripts” text no; expanded list yes) | old form hits 2 (`the bench scripts` at `guides/scaffold.md:945`, `src/core/templates.ts:2045`) | report matches yes (table cites `:16` and `:10`, which start the expanded sentences)
- scaffold-obj-1: site now `package.json:65` | diff present yes | old form hits 3 (`deny-warnings` on `lint:check` only) | report matches yes
- scaffold-obj-2: site now `src/core/factories.ts:44` unchanged; proof `tests/src/core/factories.test.ts` | diff present yes (case (f) `nowhere` no) | old form hits 0 | report matches yes
- scaffold-obj-3: site now `tests/src/server/WriteTransaction.test.ts:206,227` and `helpers.test.ts:1582` | diff present yes | old form hits 2 (left `win32` skips at `:281` and `helpers.test.ts:596`) | report matches yes
- scaffold-obj-4: site now `src/server/types.ts:355-357` | diff present no | old form hits 0 | report matches yes (`noop`)
- scaffold-obj-5: site now `src/bin/helpers.ts:577` | diff present yes | old form hits 0 | report matches yes
- fleet-F1: site now helper absent; no `tests/setup.test.ts` | diff present no | old form hits 0 | report matches yes (`noop`)
- fleet-F2: site now no public `readonly id` field | diff present no | old form hits 0 | report matches yes (`noop`)

Scope tags: see Evidence § Scope. `.orkestrel/**` neither; `host.json` owned by amendment; remaining status paths owned. No off-limits path in the status file.

Residue: no `+` line hit for the residue pattern. Tree hits listed under Evidence § Residue (`context.skip` in `src/core/templates.ts`, plus `retry`/`timeout`/`console.` sites).

Writing: no in-scope `+` line hit for the word list or the count pattern.

Parity: no types.ts or class file in the unit diff. Added guide backticks: `HOST_PATHS` and `WriteTransaction` barrelled; event names `compile`/`audit`/`block`/`error`/`destroy`/`write`/`remove`/`finish`/`release`/`mirror`/`file` not barrel exports; Surface names `isFloorPath`/`isRetainedPath`/`listCanonPaths`/`pruneEmptiedDirectories` barrelled.

## Unknowns

- `gate-lint-check-final.txt` has no oxlint summary body, so this lane cannot read an exit code from that file itself.
- `gate-check.txt` / `gate-test.txt` record `extractFenceImports` / `findMissingSymbols` failures; the tree now uses `fenceImports` / `missingSymbols`. Whether a later uncaptured `check`/`test` run is green is not in the named proof files.
- Report’s full `README.md` number-word sweep (five permitted hits) was not re-run line-by-line beyond the old phrase `Two paths are not owned`.
- Fleet Grep for `extractFenceImports`/`findMissingSymbols` truncated; further `tests/guides.test.ts` files exist beyond the four packages named.
- Glob of `/home/user/fleet/*` timed out; package directory inventory for the Breaking sweep is incomplete.
- `.agents/skills/grok/SKILL.md` is not in this tree.

## Journal

## Deviation

This lane made no tree change (read-only; no write, no mutating command). Fleet directory listing via Glob timed out. `gate-lint-check-final.txt` could be read but contains only the npm script banner.