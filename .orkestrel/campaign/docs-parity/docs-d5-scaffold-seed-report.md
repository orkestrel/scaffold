# Unit report — D5 `scaffold-seed`, `/home/user/scaffold`

`implementer`, Claude Opus 5, subjective lane. **Deviation: the brief's fixed design collides with a
standing rule and a gate outside my owned files.** The seed, the emission, the manifest script, the
tests, the guide, and the inventory all landed and every criterion the deviation does not touch is
green. The collision is stated under **Deviation** with its evidence and the ruling it needs.

## The deviation, first

**Expected** (brief, § What is fixed): "The seed is `scripts/docs.ts`, a `HOST_PATHS` row … The seed
… imports `@orkestrel/guide`".

**Found.** `.claude/rules/workspace.md:77-79` forbids exactly that pairing:

> When a file is vendored byte-identical, import nothing that fails to resolve in any target. Import
> no `@orkestrel/*` package from it: every such package is itself a target and cannot depend on
> itself.

`tests/src/server/helpers.test.ts:173-199` is that rule's gate. It walks every `HOST_PATHS` member
matching `/\.[cm]?[jt]s$/u` and asserts none matches an `@orkestrel/*` import. Evidence, run
read-only against the seed as it stands:

```text
$ node -e "const {readFileSync}=require('node:fs');const p=/\b(?:from\s*|(?:import|require)\s*\(\s*)(['\"\`])@orkestrel\/[^'\"\`]+\1/u;console.log(p.test(readFileSync('scripts/docs.ts','utf8')))"
true
```

The rule's reason is concrete rather than hypothetical. `/home/user/fleet/guide` is a scaffold target
— it carries `.claude/agents/orkestrel.md` and the vendored `scripts/{codex,cursor,deps,ollama}.sh`
set — and its `package.json` declares `"name": "@orkestrel/guide"` and no `@orkestrel/guide`
dependency, because `blueprintToDevDependencies` strips the workspace's own name
(`src/core/compilers.ts:229-234`). A vendored `scripts/docs.ts` lands in that checkout and cannot
resolve its own import.

**Done vs not done.** Everything else in the brief is done and green. Not done: nothing was removed
to dodge the collision — `scripts/docs.ts` sits in `HOST_PATHS` exactly as the brief fixes it, so the
tree shows the Orchestrator what it asked for and the gate reports the conflict rather than my
opinion of it.

**Hypothesis.** The seed wants to be a `template` artifact per workspace (the shape
`scripts/service.sh` and `tests/distribution.test.ts` already take) rather than a byte-identical
vendored row, because its import differs per target: `@orkestrel/guide` everywhere, and the guide
package's own `@src/core` in the one checkout that publishes the readers — which is the substitution
`/home/user/fleet/guide/tests/guides.test.ts` already makes for the same reason. That change owns
`src/core/templates.ts`, which this brief puts off-limits.

## Shared-file patches, report-only

**P1. `tests/src/core/Compiler.test.ts:71,74` — red now.** `HOST_PATHS` gained a member, so the
planned artifact tally moved. Measured: `expected [ …(40) ] to have a length of 39 but got 40`.

```diff
-		expect(plan.artifacts).toHaveLength(39)
+		expect(plan.artifacts).toHaveLength(40)
 		expect(plan.artifacts.filter(({ origin }) => origin === 'computed')).toHaveLength(1)
 		expect(plan.artifacts.filter(({ origin }) => origin === 'template')).toHaveLength(17)
-		expect(plan.artifacts.filter(({ origin }) => origin === 'host')).toHaveLength(21)
+		expect(plan.artifacts.filter(({ origin }) => origin === 'host')).toHaveLength(22)
```

**P2. `tests/src/server/helpers.test.ts:173-199` — red once run.** No patch offered. Narrowing the
population to admit `scripts/docs.ts` would retire the rule that catches the real defect, and the
right repair depends on the ruling the deviation asks for. Not run here: `npm run test:src:server` is
outside the brief's permitted commands, so P2 is a prediction from the pattern probe, not a suite
reading.

## The seed's command shape and output

One option, two values, and nothing else:

```text
npm run docs                     report every disagreement, write nothing
npm run docs -- --to guide       rewrite each Summary cell from its source side
npm run docs -- --to source      rewrite each description paragraph and each titled @example body
```

Any other argument prints one usage line and takes exit 2:

```text
usage: npm run docs [-- --to guide|--to source]
```

Line shapes. Every line is plain text, one line per fact, no colour and no table. A side's text is
rendered through `JSON.stringify`, so it is quoted, escaped, and always one line; an absent side is
the bare word `absent`, which no quoted text can be confused with.

| Line | Shape |
| --- | --- |
| A disagreement | `<spec> <key>: guide <text\|absent> source <text\|absent>` |
| The pitch pair | `<spec> pitch: readme <text\|absent> tagline <text\|absent>` |
| A file written | `wrote <path>` |
| A disagreement a write left | the disagreement's line, then `; <reason>` |
| The closing line, reporting | `rows read: <n>, disagreements found: <n>` |
| The closing line, writing | `rows read: <n>, disagreements found: <n>, written: <n>, reported: <n>` |
| After any write | `run npm run format` |

The reasons a write prints: `the guide fence owns an example`, `the source side carries no text`,
`no Summary cell carries the key`, `the guide side carries no text`, `no doc block carries the key`,
`the doc block refused the rewrite`, `the README pitch is authored by hand`.

Exit codes: `0` when no disagreement stands, `1` while any stands reported, `2` for an argument
outside the option.

### An example run over the fixture

The fixture is the workspace the cases build: a concept index, one guide carrying a Surface table, a
Methods table and a titled fence, one source file with doc blocks, a README with a blockquote pitch,
and `node_modules/@orkestrel/guide` linked to this checkout's installed copy.

```text
$ node --experimental-strip-types scripts/docs.ts
guides/widget.md function shape: guide "Shapes a widget from its parts." source "Shapes a widget from the parts it is given."
guides/widget.md Widget.paint: guide "Paints the widget onto the surface." source "Paints the widget onto the frame."
guides/widget.md Shape a widget: guide "ts\nshape('round')" source "ts\nshape('square')"
rows read: 1, disagreements found: 3
exit=1

$ node --experimental-strip-types scripts/docs.ts --to guide
wrote guides/widget.md
guides/widget.md Shape a widget: guide "ts\nshape('round')" source "ts\nshape('square')"; the guide fence owns an example
rows read: 1, disagreements found: 3, written: 2, reported: 1
run npm run format
exit=1

$ node --experimental-strip-types scripts/docs.ts --to source
wrote src/core/widget.ts
rows read: 1, disagreements found: 3, written: 3, reported: 0
run npm run format
exit=0

$ node --experimental-strip-types scripts/docs.ts
rows read: 1, disagreements found: 0
exit=0
```

The reported workspace, where neither disagreement has a side a write can take:

```text
$ node --experimental-strip-types scripts/docs.ts --to source
guides/widget.md function measure: guide "Measures a widget against the frame it fills." source absent; no doc block carries the key
guides/widget.md pitch: readme "A widget kit the sample workspace publishes." tagline "A widget toolkit the sample workspace publishes."; the README pitch is authored by hand
rows read: 1, disagreements found: 2, written: 0, reported: 2
exit=1
```

No `wrote` line and no `run npm run format` line appear, and both files come back byte for byte.

## Each edit

| File | Site | Change |
| --- | --- | --- |
| `scripts/docs.ts` | new, `:1-437` | The seed. `import type` plus one value import from `@orkestrel/guide`, and `node:fs`, `node:path`, `node:process`. Erasable syntax only. |
| `src/core/constants.ts` | `:140` | `'scripts/docs.ts'` joins `HOST_PATHS` after `'scripts/ollama.sh'`. |
| `src/core/constants.ts` | `:117` | `HOST_PATHS`'s `@remarks` names the documentation-parity seed in the vendored list. The description paragraph the equality gate compares is untouched. |
| `src/core/compilers.ts` | `:349-352` | `blueprintToScripts` emits `docs: node --experimental-strip-types scripts/docs.ts` beside `test:guides`, under the one `blueprint.guides` branch. |
| `src/core/compilers.ts` | `:448-452` | `blueprintToWritableScripts` admits `docs` beside every direct `test:<project>` script, so `repair` writes it into a target that adds the proof later. |
| `src/core/compilers.ts` | `:421-425` | That function's `@remarks` states the `docs` row and why the same fact selects it. |
| `package.json` | `:81` | `"docs": "node --experimental-strip-types scripts/docs.ts"`, beside `test:guides`, by hand. |
| `guides/scaffold.md` | `:16-20` | The vendored-set sentence names the documentation-parity seed. |
| `guides/scaffold.md` | `:607-609` | `audit` reports the `test:guides` **and** `docs` script lines until a write appends them. |
| `guides/scaffold.md` | `:1025-1044` | § Ownership and drift gains the equality-gate paragraphs: what the seed reads, what each direction writes, what it never writes, the exit codes, and `npm run format` after a write. |
| `tests/src/core/compilers.test.ts` | `:611-631` | `emits the documentation seed beside the guides proof`. |
| `tests/src/core/compilers.test.ts` | `:1806-2114` | The fixture constants, `buildSeedWorkspace`, `runSeed`, and `describe('the documentation seed')`. |
| `tests/src/core/helpers.test.ts` | `:17`, `:178-191` | `EXECUTABLE_PATHS` imported; `vendors the documentation seed without an executable bit or a canon claim`. |
| `host.json` | `:704-709` | The staged `scripts/docs.ts` entry, by regeneration. |

## The Unknowns, answered

**The `proof` workspace carries no guides, so it receives no `docs` script.**
`tests/distribution.test.ts:589` and `:857` both build
`createBlueprint('proof', { src: ['core', 'server'], bin: true, integration: true })`, and
`src/core/factories.ts:59` defaults `guides: input?.guides ?? false`. `blueprintToScripts` emits
`docs` only under `blueprint.guides`, so the generated proof workspace's manifest is unchanged.

**The seed's cases live in the `src:core` project, in `tests/src/core/compilers.test.ts`.** The
brief's deviation contract gives me the placement, and the Vitest project registry is closed to me:
`vite.config.ts` includes each root proof by exact path (`policy`, `config`, `guides`,
`conformance`, `distribution`, `integration`) and only `setup` takes a pattern
(`tests/setup*.test.ts`), while `tests/config.test.ts:108-198` asserts that exact registry and
`src/core/templates.ts` holds the generated copy — all off-limits here. A new `tests/docs.test.ts`
would be collected by no project. Under `tests/{app,src}/**` the mirror law
(`tests/setupPolicy.ts:146`, `POLICY_TEST_GLOB`) requires a matching module, and `src/core/docs.ts`
and `src/bin/docs.ts` do not exist, so a new file there reddens `test:policy`. That leaves an
existing collected file, and `tests/src/core/compilers.test.ts` is the one that owns the emission
naming the command — the compiler promises `node --experimental-strip-types scripts/docs.ts`, and
the proof that the command is real sits beside the promise. Cost, recorded: `src:core` is otherwise a
pure-projection project and its `testTimeout` is Vitest's 5000 ms default. Measured here, the
heaviest case (two spawns plus a second report run) takes 406 ms and the lightest 203 ms. A
`scripts/`-axis project is the proper long-term home and needs `vite.config.ts`,
`src/core/templates.ts`, `tests/config.test.ts`, `.claude/rules/tests.md`, and
`.claude/rules/workspace.md` together — a successor unit, not this one.

## Acceptance criteria, in order

**1. Membership and imports — met.**

```text
$ grep -n "scripts/docs.ts" src/core/constants.ts src/core/compilers.ts package.json host.json
src/core/constants.ts:140:	'scripts/docs.ts',
src/core/compilers.ts:351:		scripts.docs = 'node --experimental-strip-types scripts/docs.ts'
package.json:81:		"docs": "node --experimental-strip-types scripts/docs.ts",
host.json:706:			"storage": "scripts/docs.ts",
host.json:707:			"destination": "scripts/docs.ts",

$ grep -n "^import" scripts/docs.ts
19:import type { Drift, GuideInterface, GuideModule, SourceExample } from '@orkestrel/guide'
20:import {
38:import { existsSync, globSync, readFileSync, writeFileSync } from 'node:fs'
39:import { resolve } from 'node:path'
40:import process from 'node:process'
```

Line `:20` opens the one value import from `@orkestrel/guide`, closed at `:37`.

**2. `format:check`, `lint:check`, `check` — met, exit 0 each.**

```text
$ npm run format:check        exit=0    All matched files use the correct format.
                                        Finished in 9231ms on 223 files using 4 threads.
$ npm run lint:check          exit=0    (no diagnostic; oxlint reads scripts/** per .oxlintrc.json:441)
$ npm run check               exit=0    tsc --noEmit -p configs/src/tsconfig.bin.json
```

**3. `npm run test:src:core` — NOT met, for P1 alone.** Exit 1.

```text
 FAIL  |src:core| tests/src/core/Compiler.test.ts > Compiler artifacts > emits every selected group through its correct origin
AssertionError: expected [ …(40) ] to have a length of 39 but got 40
 Test Files  1 failed | 8 passed (9)
      Tests  1 failed | 391 passed (392)
```

Every case this unit owns passes, and the seed's project is the same command:

```text
✓ tests/src/core/helpers.test.ts > isCanonPath > vendors the documentation seed without an executable bit or a canon claim 1ms
✓ tests/src/core/compilers.test.ts > blueprintToScripts config projects > emits the documentation seed beside the guides proof 1ms
✓ tests/src/core/compilers.test.ts > the documentation seed > names every planted disagreement and writes nothing without a direction 209ms
✓ tests/src/core/compilers.test.ts > the documentation seed > carries every summary to the guide and leaves the example and every other byte 225ms
✓ tests/src/core/compilers.test.ts > the documentation seed > carries every summary and example to the source, and reads back clean 406ms
✓ tests/src/core/compilers.test.ts > the documentation seed > reports a key no doc block carries and the pitch, and leaves both files 203ms
✓ tests/src/core/compilers.test.ts > the documentation seed > prints one usage line and takes exit 2 for an argument outside its option 363ms
 Test Files  2 passed (2)
      Tests  210 passed (210)
```

**4. `npm run build` and the inventory's stability — met.**

```text
$ npm run build               exit=0    build-host: staged 122 file(s) into dist/host
                                        build-inventory: staged 122 file(s) into host.json
$ sha256sum host.json                   f0d527b9a0a4cac4798e2b23c86c381c2c22b44eaf70624e4b68fbe8a1951b8e
$ npm run build:inventory
$ sha256sum host.json                   f0d527b9a0a4cac4798e2b23c86c381c2c22b44eaf70624e4b68fbe8a1951b8e
```

**5. Observation over this checkout — recorded, and the keys match D4's list.**

```text
$ npm run docs
guides/scaffold.md const isArtifact: guide "Test whether a value is a planned artifact." source "Tests whether a value is a planned artifact."
… 314 further disagreement lines …
guides/scaffold.md pitch: readme absent tagline "Scaffold compiles a workspace specification into an ordered list of files, compares that list to a real directory, and writes the difference. It ships one executable, `scaffold`, and library entry points: `@orkestrel/scaffold` is the pure compiler and its data contracts, and `@orkestrel/scaffold/server` is the filesystem writer and the network reader. Source: `src/core/index.ts` and `src/server/index.ts`."
rows read: 1, disagreements found: 316
exit=1
```

`d4-scaffold-gate-report.md` records one index row, `guides/scaffold.md`, carrying 315 drift entries
with no absent side, and the README pitch reading `undefined`. The seed reports the same 315 keys —
the sorted key set extracted from this run diffs empty against the report's two fenced key lists —
plus the pitch line, which is why the tally is 316. The pitch's README side prints `absent`, which is
the `undefined` D4 recorded.

## Failing-first evidence

The seed's example path was authored red. Before the fix, `findExample` passed
`locateComment`'s raw block to `collectExamples`, whose `@param` takes the unwrapped text
`normalizeComment` returns; the `--to source` run over the fixture reported
`rows read: 1, disagreements found: 4, written: 2, reported: 2` and left the `@example` body
unchanged, with `guides/widget.md Shape a widget: …; no doc block carries the key`. With
`normalizeComment` in place (`scripts/docs.ts:227`) the same run reports `written: 3` and the body is
rewritten, which is the case
`carries every summary and example to the source, and reads back clean` asserts. Every other case's
expected output was taken from a measured run before it was written down.

## Decisions the deviation contract left me, recorded

- **The pitch pair's own guide is `guides/<manifest short name>.md`, read from `package.json`.** The
  seed reads the manifest's `name` and takes the segment after the scope, which is the mechanism
  `nameToGuide` and `selectHostPaths` already use to keep a workspace from mirroring its own guide.
  This is one read beyond the brief's enumerated inventory, and it is guarded: a missing or
  unparseable manifest, a missing `README.md`, and an index carrying no such row each report no
  pitch line rather than throwing.
- **The option takes the two-token form alone.** `--to guide` and `--to source`; `--to=guide` prints
  the usage line. One form, so the guide and the usage agree.
- **`JSON.stringify` renders a side.** It guarantees one line, escapes the text, and cannot collide
  with the bare `absent`.
- **The fixture and its helpers are module-scope in the test file.** `.claude/rules/tests.md:184`
  prefers shared infrastructure, and both `tests/setup.ts` and `tests/setupServer.ts` are off-limits
  here. The campaign already ruled this shape: the D2 re-baseline records "the test-infrastructure
  readers at module scope in `tests/src/core/helpers.test.ts` promote together when a second suite
  needs them". These promote on the same trigger.
- **The scratch link is a `junction`.** `symlinkSync(…, 'junction')` needs no elevation on Windows
  and the type argument is ignored elsewhere. Probed read-only that a recursive `rmSync` unlinks the
  link and leaves the target directory, so destroying a scratch cannot reach this checkout's
  `node_modules`.
- **The seed's module-scope declarations stay local**, and the header states why:
  `.claude/rules/architecture.md` § Declaration placement permits them in a self-contained entry that
  cannot import siblings, which is what a vendored root script is.

## Flagged claims

- **P2 is a prediction, not a suite reading.** `npm run test:src:server` is outside the brief's
  permitted commands. The pattern probe run against the seed is the evidence; the case's own red was
  not observed.
- **The timing figures are this unit's, taken inside its own exec.** The authoritative reading of
  `npm run test:src:core` under load belongs to the Orchestrator after this unit exits.
- **The 315-key match is a set comparison, not a text comparison.** The keys were extracted from this
  run's lines and diffed against the two fenced key lists in `d4-scaffold-gate-report.md`; the diff
  reported only the five non-key tokens those fences carry outside the lists
  (`@orkestrel/scaffold`, `@orkestrel/scaffold/server`, `scaffold`, `src/core/index.ts`,
  `src/server/index.ts`). The text each side carries was not compared entry by entry.
- **No `--to guide` or `--to source` run was made over this checkout.** Both are outside the
  permitted commands and both would write files D6 owns.

## Tree state

```text
$ git status --short
 M .claude/rules/documentation.md      (D4, untouched here)
 M .claude/rules/tests.md              (D4, untouched here)
 M .claude/rules/workspace.md          (D4, untouched here)
 M guides/scaffold.md
 M host.json
 M package.json
 M src/core/compilers.ts
 M src/core/constants.ts
 M tests/guides.test.ts                (D4, untouched here)
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
?? scripts/docs.ts

$ git diff --stat
 .claude/rules/documentation.md   |  11 +-
 .claude/rules/tests.md           |  20 +--
 .claude/rules/workspace.md       |  20 +--
 guides/scaffold.md               |  32 +++-
 host.json                        |  16 +-
 package.json                     |   1 +
 src/core/compilers.ts            |  16 +-
 src/core/constants.ts            |  10 +-
 tests/guides.test.ts             |  51 +++++-
 tests/src/core/compilers.test.ts | 338 ++++++++++++++++++++++++++++++++++++++-
 tests/src/core/helpers.test.ts   |  15 ++
 11 files changed, 482 insertions(+), 48 deletions(-)
```

The first three rule files and `tests/guides.test.ts` are D4's uncommitted work, unchanged by this
unit. `host.json` carries D4's three rule digests and this unit's `guides/scaffold.md` digest and
`scripts/docs.ts` entry, all from one `npm run build` regeneration. `scripts/docs.ts` is untracked
because it is new.
