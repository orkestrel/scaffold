# Unit S3 — report

Checkout `C:/Users/mikes/WebstormProjects/scaffold`, baseline `a0440d3c`, clean at start except the
untracked `.orkestrel/campaign/` folder, and clean at return except the owned files and that same
folder. Every acceptance criterion is green. One deviation is open and recorded first.

## Deviation — `buildRefusal` is not in the installed entry

**Expected.** `references/statechart.md` opens with an import fence naming `StateTransition`,
`StateScenario`, `executeScenario`, `executeScenarios`, `buildRefusal`, `STATECHART_ATTRIBUTES`,
`STATECHART_STATUSES`, `StatechartStatus`, and `createHarness` (brief § The instructions to land,
item 5).

**Found.** The installed `@orkestrel/test` exports every one of those except `buildRefusal`.

**Evidence.**

```text
$ grep -n "buildRefusal" node_modules/@orkestrel/test/dist/src/core/index.d.ts \
    node_modules/@orkestrel/test/dist/src/browser/index.d.ts
(no output)

$ node -p "require('./node_modules/@orkestrel/test/package.json').version"
0.0.16
```

`readSkillExports(process.cwd(), '@orkestrel/test')` returns outcome `read` and does not list
`buildRefusal`; the same call for `@orkestrel/test/browser` does not list it either.

The installed tree is the T1 plus T2 surface rather than the T3 one the brief's § Evidence assumes.
Three T3 changes are absent from it:

- `dist/src/browser/index.js:2720` reads `if (quota !== void 0 && (!isInteger(quota) || quota < 0))`,
  where T3 item 5 replaced `isInteger` with `Number.isSafeInteger`;
- `grep -c "getRandomValues" dist/src/browser/index.js` reports `0`, where T3 item 15 derives
  `buildCensus`'s tokens from it;
- `dist/src/browser/index.js:2424` reads `const token = "census-authored-token"`, the literal T3
  item 15 removed.

**Done, and what is not.** `statechart.md` carries the fence with every other named symbol, and
teaches the refused build through the behaviour rather than the helper: § Run the table reads "a
builder that refuses raises `<name>: build refused` with its own refusal as the `cause`", and
§ Mount the harness reads "a builder that refuses fails its own row under the runner's own refusal
sentence rather than ending the run." Nothing in the skill names `buildRefusal`.

A fence naming it reports
`skill fence import @orkestrel/test does not export buildRefusal` and fails acceptance criterion 2.
The deviation contract names this a stop condition; stopping the unit over one binding would have
abandoned every other instruction in the brief, so the rest landed and this is reported open.

**Carrier.** After the test package publishes the T3 surface and this checkout re-installs it, add
`buildRefusal` to the `statechart.md` fence and name it in § Run the table's "Let the runner name the
failure" bullet and in § Mount the harness.

**Hypothesis.** The tarball installed here was packed between units T2 and T3.

## The instructions landed

| Instruction                                            | File                       | Section                                                       |
| ------------------------------------------------------ | -------------------------- | ------------------------------------------------------------- |
| Journey laws bind every declared family (D22)          | `SKILL.md`                 | Declare the families, final four bullets                      |
| Matrix population: role and name first (D22, D14)      | `SKILL.md`                 | Resolve the population                                        |
| Read the variant through `inject`, compose `apply`     | `SKILL.md`                 | Read the variant once, with its fence                         |
| `tests/setupBrowser.test.ts` runs in `setup:browser`   | `SKILL.md`                 | Import the journey layer, bullet 4                            |
| The transport family's `createStorage` conditions      | `SKILL.md`                 | Declare the transport family                                  |
| A stalled read belongs to the application's contract   | `SKILL.md`                 | Declare the transport family, last bullet                     |
| Commit through `pressKeys`, Tab, or a named button     | `SKILL.md`                 | Apply the journey laws, law 6; Import the journey layer        |
| The intents every surface owes (D25)                   | `SKILL.md`                 | Derive journeys from intents → The intents every surface owes  |
| The mutations (D23)                                    | `SKILL.md`                 | Mutate each assertion class                                   |
| The engine limit (D19)                                 | `SKILL.md`                 | Accept, closing paragraph                                     |
| Retained-verdict clause kept                           | `SKILL.md`                 | Load authority, closing paragraph                             |
| `orkestrel-polish-surface` handoff kept                | `SKILL.md`                 | Generate the portfolio                                        |
| Import fence over the taught vocabulary                | `references/layer.md`      | The vocabulary                                                |
| `pressKeys` verb row                                   | `references/layer.md`      | Input and traversal                                           |
| `waitForText` with `absent` and a region reader        | `references/layer.md`      | The waits, bullets 1 and 2                                    |
| `waitForState`, `waitForAnimations` rows               | `references/layer.md`      | The waits                                                     |
| `readRefusal`                                          | `references/layer.md`      | Reading a refusal                                             |
| Voices extended                                        | `references/layer.md`      | The resolver → The failure voices                             |
| Element-taking population updated                      | `references/layer.md`      | Which helpers take an element                                 |
| The named bans with their replacements (D22)           | `references/layer.md`      | The named bans                                                |
| `clickDisclosure` drives a native summary alone        | `references/layer.md`      | Disclosures                                                   |
| `JourneyVariant`, `CaptureVariant`, `inject('capture')` | `references/captures.md`  | The vocabulary; The hook; Variants                            |
| The published controls and their placement (D13)       | `references/styles.md`     | The published controls                                        |
| `readCensus` population reported, empty walk refused   | `references/styles.md`     | The authored-class census                                     |
| Focus through `traverseAccessible` or `pressKeys`      | `references/styles.md`     | Contrast and focus chrome, bullet 3                           |
| The per-variant run reading `inject('variants')`       | `references/styles.md`     | Run per variant                                               |
| The engine limit                                       | `references/styles.md`     | The engine bound                                              |
| `createHarness` (D3)                                   | `references/statechart.md` | Mount the harness                                             |
| The observable statuses (D4)                           | `references/statechart.md` | The observable statuses                                       |
| The worked table (D5)                                  | `references/statechart.md` | The worked table                                              |
| The gate reads the object and the markup               | `references/statechart.md` | Gate the harness                                              |
| A deep-linked page is optional product                 | `references/statechart.md` | A harness page is product                                     |
| Drop the `@orkestrel/probe` pin (D24)                  | `references/decide.md`     | The limit that decides the split                              |
| Route a watched widget to the run's frames             | `references/decide.md`     | The harness run                                               |
| The plan of record reconciled                          | `ROADMAP.md`               | Every row                                                     |
| The cp1252 file-write rule                             | `.agents/transports/codex.md` | Sol route, final paragraph                                 |

`SKILL.md` → Prove the statechart and Generate the portfolio route to the references rather than
restating them, and "Mount the harness" replaces "Build the harness a person watches" in both the
reference heading and the pointer.

The frontmatter `description` did not move, so `agents/openai.yaml` and the
`.claude/skills/orkestrel-prove-journey/SKILL.md` bridge are untouched and their parity holds.

## The fences and the entries they resolved against

Every binding resolved against the installed declaration entry the exports map names:
`@orkestrel/test` against `node_modules/@orkestrel/test/dist/src/core/index.d.ts`, and
`@orkestrel/test/browser` against `node_modules/@orkestrel/test/dist/src/browser/index.d.ts`.

**`SKILL.md`** — `JourneyVariant` (core); `CaptureVariant` (browser).

**`references/layer.md`** — core: `TextWaitOptions`, `WaitOptions`, `waitForText`. Browser:
`StateOptions`, `StorageOptions`, `WebStorageInterface`, `ACCESSIBLE_ROLES`, `FOCUSABLE_SELECTOR`,
`build`, `clearStorage`, `clickAccessible`, `clickAccessibleWithin`, `clickDisclosure`,
`commitInput`, `createDragEvent`, `createJournal`, `createPointerEvent`, `createStorage`,
`describeFocus`, `describeTree`, `fillAccessible`, `isOutsideViewport`, `isReachable`, `isRendered`,
`mount`, `pressKeys`, `readFocus`, `readHit`, `readName`, `readPage`, `readPerception`,
`readRefusal`, `readRole`, `readStates`, `readText`, `readValue`, `removeDatabase`, `render`,
`resolveAccessible`, `resolveRendered`, `traverseAccessible`, `typeAccessible`, `typeInput`,
`waitForAnimations`, `waitForFrame`, `waitForState`.

**`references/captures.md`** — core: `JourneyVariant`. Browser: `CaptureVariant`, `FrameOptions`,
`FrameReading`, `PortfolioInterface`, `PortfolioOptions`, `captureFrame`, `createPortfolio`,
`expandCaptures`, `readFrame`.

**`references/styles.md`** — browser only: `CaptureVariant`, `CensusFixture`, `CensusReading`,
`Color`, `ContrastFixture`, `EscapeFixture`, `CANVAS_COLOR`, `blendColor`, `buildCensus`,
`buildContrast`, `buildEscapes`, `extractOrphans`, `extractStyles`, `findKeyframes`, `findRule`,
`matchesColor`, `measureContrast`, `measureLuminance`, `parseCSSColor`, `pressKeys`, `readBackdrop`,
`readCascade`, `readCensus`, `readClasses`, `readContrast`, `readLayers`, `readPixels`, `readRing`,
`readRootToken`, `readRows`, `readStyle`, `readToken`, `traverseAccessible`, `waitForAnimations`.

**`references/statechart.md`** — three fences. Core: `StateScenario`, `StateTransition`,
`StatechartStatus`, `STATECHART_ATTRIBUTES`, `STATECHART_STATUSES`, `executeScenario`,
`executeScenarios`, `requireValue`. Browser: `HarnessInterface`, `HarnessOptions`,
`clickAccessible`, `clickDisclosure`, `createHarness`, `readStates`, `render`.

**`references/decide.md`** — no fence. It names no package symbol its siblings do not already fence.

## ROADMAP rows

**Struck**, each row rewritten as `**Closed.**` with the clause naming what closed it, and each
keeping its own number: 1, 10, 11, 12, 13, 16, 18, 19, 20, 21, 30, 31, 32.

| Row | Closing clause, in short                                                                 |
| --- | ----------------------------------------------------------------------------------------- |
| 1   | The generated `setup:browser` project collects `tests/setupBrowser.test.ts` in a browser  |
| 10  | `statechart.md` carries the executed disclosure table                                     |
| 11  | `SKILL.md` names the journey mutation and the refusal mutation                            |
| 12  | `decide.md` instructs confirming the limit against the installed version                  |
| 13  | `statechart.md` names the reading each harness status carries                             |
| 16  | The vendored `inspectSkillImports` reader checks a skill's fenced imports                 |
| 18  | `pressKeys` publishes, with the nothing-focused refusal                                   |
| 19  | `waitForText` publishes in the core entry, with `exact` and `absent`                      |
| 20  | `readRefusal` ruled not superfluous and shipped                                           |
| 21  | `pressKeys` is a published export and the skill's fences resolve                          |
| 30  | The local invocation-record case was deleted against the vendored one                     |
| 31  | The shadow-tree boundary is documented on each predicate                                  |
| 32  | Closed in 0.0.73                                                                          |

**Restated:** 17, which names `.agents/skills/orkestrel-debrief/references/field-testing.md` as the
method to follow. `grep -n "field-testing" ROADMAP.md` resolves to that path alone.

**Kept unchanged:** 2, 3, 4, 5, 6, 7, 8, 9, 14, 15, 22, 23, 24, 25, 26, 27, 28, 29, 33, 34.

**Added, appended:**

- 35 — rule whether `@orkestrel/guide` repairs `extractFenceImports`, which drops a binding preceded
  by a comment inside the import braces, measured 2026-09-17 against the installed package; the
  scaffold sweep parses each fence with Oxc for that reason.
- 36 — reopen browser-engine selection on its stated condition, which lives in the emitted
  `configs/browsers.ts` doc block and this skill's Accept list.
- 37 — author `aria-expanded` on the roughnotes menu trigger, whose disclosure cannot be settled
  through `waitForState` until it does.

The file gains a two-line preamble stating that a `**Closed**` row names what ended it and keeps its
number. `oxfmt` leaves an ordered list's written numbers alone, measured on a scratch copy, so no
number moved.

## The transport rule, exact text

Appended to `.agents/transports/codex.md` § Sol route as its final paragraph:

```text
On a Windows host the exec's file writes can round-trip through cp1252, so a line carrying a
non-ASCII code point comes back with that code point replaced. The brief tells the unit never to
rewrite such a line through its shell, to edit a file carrying one only through the exec's own
patch tool, and to report every line it had to touch. The Orchestrator's review evidence includes a
sweep of the diff for a removed line carrying a code point above `0x7F` whose replacement carries
none.
```

It has one home: no other file in this checkout states it, and it records no campaign history.

## Gates

Every command was run from `C:/Users/mikes/WebstormProjects/scaffold` after the last edit.

| Command                                                                     | Exit | Reading                                          |
| --------------------------------------------------------------------------- | ---- | ------------------------------------------------ |
| `./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --write <owned files>` | 0    | `Finished in 459ms on 8 files using 16 threads.` |
| `npm run format:check`                                                       | 0    | `All matched files use the correct format.` over 227 files |
| `npm run lint:check`                                                         | 0    | no diagnostics                                   |
| `npm run test:policy`                                                        | 0    | `Test Files 1 passed (1)`, `Tests 110 passed (110)` |

The scoped formatter population was
`.agents/skills/orkestrel-prove-journey/SKILL.md .agents/skills/orkestrel-prove-journey/references ROADMAP.md .agents/transports/codex.md`.
No tree-wide mutating command ran: `format:check` and `lint:check` both read without writing.

Baseline reading before any edit, same command: `npm run test:policy` exit 0,
`Tests 110 passed (110)`. The policy total is unchanged because the skill sweep is a single case
over the whole family rather than one case per fence.

### The controls

**S3-C1 — every fenced import resolves, and the sweep reports nothing for the skill.** Probe
`.orkestrel/campaign/s3-instruments/s3-sweep.test.ts`, run with
`npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe .orkestrel/campaign/s3-instruments/s3-sweep.test.ts`,
exit 0, `Tests 2 passed (2)`. It read each skill file from disk, counted the fenced `@orkestrel/*`
bindings, and ran `inspectSkillImports(process.cwd(), path, content)` over each:

```text
POPULATION .agents/skills/orkestrel-prove-journey/SKILL.md 2
POPULATION .agents/skills/orkestrel-prove-journey/references/layer.md 46
POPULATION .agents/skills/orkestrel-prove-journey/references/captures.md 10
POPULATION .agents/skills/orkestrel-prove-journey/references/styles.md 34
POPULATION .agents/skills/orkestrel-prove-journey/references/statechart.md 24
POPULATION .agents/skills/orkestrel-prove-journey/references/decide.md 0
POPULATION TOTAL 116
VIOLATIONS <each path> []
```

Before this change, `grep -rn "from '@orkestrel/" .agents/skills` matched nothing, so the sweep's
population over this skill was empty. Re-measured after the final formatting pass with
`.orkestrel/campaign/s3-instruments/s3-population.mts`: the same readings.

**S3-C2 — the sweep reads the population it was given.** The probe copied
`references/layer.md` to a scratch copy under the checkout's git-ignored probe directory (deleted) with `pressKeys2,` inserted into the
browser fence beside `pressKeys,`, asserted the copy differed from the source, and ran
`inspectSkillImports` over the copy:

```text
PLANTED [{"rule":"skill","path":"tmp/probe/s3/planted-layer.md","message":"skill fence import @orkestrel/test/browser does not export pressKeys2"}]
```

One violation, naming the binding. The planted copy is deleted. The probe test files are retired to
`.orkestrel/campaign/s3-instruments/s3-sweep.test.ts.txt` and `.orkestrel/campaign/s3-instruments/s3-exports.test.ts.txt` so the `probe` project no
longer collects them and the instruments survive for retention.

**S3-C3 — no dangling verb and no stale version pin.**

```text
$ grep -rn "userEvent.keyboard" .agents/skills/orkestrel-prove-journey
(no output)

$ grep -rn "0.0.11" .agents/skills/orkestrel-prove-journey
(no output)
```

`references/layer.md:77` still names `userEvent` alone, in the factual sentence about what the
published verbs import from `vitest/browser`. The criterion's pattern is `userEvent.keyboard`, which
matches nothing.

**S3-C4 — the plan of record.** Every struck row names its closing clause, shown in the preceding
table, and:

```text
$ grep -n "field-testing" ROADMAP.md
20:17. Re-run the journey skill's field pass … Follow the method in the
`.agents/skills/orkestrel-debrief/references/field-testing.md` file: …
```

**The banned-term sweep.** `.orkestrel/campaign/s3-instruments/s3-terms.mts` runs `stripPolicyCode` and every
`POLICY_BANNED_TERMS` pattern from `configs/policy.ts` over each owned file, then every
`POLICY_JUDGED_TERMS` word. Zero banned hits across
`SKILL.md`, the five references, `ROADMAP.md`, and `.agents/transports/codex.md`. The judged hits and
my ruling on each: `once` in every site is the frequency sense; `new` at `captures.md` and
`decide.md` is "part old and part new", a state rather than a date; `above` at `layer.md` is "a cap
above the cycle", a magnitude; `above` at `codex.md` is "a code point above `0x7F`", a numeric
comparison. Each is permitted.

## Observations, not criteria

- `npm run test:config` exits 1 with `Tests 1 failed | 172 passed | 1 skipped (174)`. The failing
  case is `root configuration > keeps the committed host inventory aligned with the vendored
  checkout bytes`, and it names exactly the seven vendored files this unit owns:
  `.agents/skills/orkestrel-prove-journey/SKILL.md`, its five references, and
  `.agents/transports/codex.md`. `host.json` is off-limits to this unit and the Orchestrator's build
  regenerates it. This is the standing condition the brief names.
- `npx vitest run --config vite.config.ts --no-cache --project probe` exits 1 on
  `.orkestrel/campaign/s1-3-instruments/s1-wrapper/proof.test.ts > receives a variant from the wrapper project`
  (`expected [ 'desktop', 'compact' ] to include undefined`). That is unit S1's retained instrument,
  which passes only under its own wrapper configuration. It is outside this unit's scope and
  untouched; `tmp/` is git-ignored.
- The whole `npm test` chain was not run here. Its authoritative reading is the Orchestrator's.

## Where the design verdict and the test package's guide differ

I read `C:/Users/mikes/WebstormProjects/test/guides/test.md` § Limits and § Bounds a shipped helper
carries before writing each helper instruction. The verdict and the guide agree on every ruling I
had to write against, with these two places where the guide is wider than the verdict, and one where
the guide is ahead of the installed package.

1. **`waitForAnimations`' exclusions.** D9 names the infinite-iteration exclusion alone. The guide's
   Bounds bullet and the `@remarks` in the installed declaration also exclude a finished animation
   filling its target and a paused one, which the T1 report flags as its own ruling rather than the
   design round's. I taught the guide's wider set, because it is the shipped behaviour and a reader
   who assumes the narrower one writes a wait that returns sooner than they expect
   (`references/layer.md` → The waits, last bullet).
2. **The harness page.** D3 refuses a deep-linked application page and a generated page; the guide's
   Limits row `A generated or published harness page` refuses it as product policy and adds the
   mechanical reason — the browser entry imports `vitest/browser` at module scope, so an application
   page cannot import it. I carried both into `references/statechart.md` → A harness page is
   product. No disagreement, only a reason the verdict left out.
3. **The guide is ahead of the installed package, which is the deviation.** The guide documents
   `buildRefusal`, and D4's terminal-status sentence, as shipped. The tarball installed in this
   checkout carries neither. See § Deviation.

Nothing in the skill contradicts a Limits ruling. `isPainted` is refused and the skill names
`element.checkVisibility()` and a non-zero box as the native door; the stalled-read store is refused
and the skill routes a stalled read to the application's own asynchronous store contract;
`readHarness` is refused and the gate reads the object's own tally beside the markup; a
framework-class disclosure settle is refused and the skill names `waitForState` with the
surface-finding fallback.

## Claims I flag as least certain

1. **D4's terminal-status sentence is taught as the rule while the installed build disagrees.**
   `references/statechart.md` → The observable statuses reads "a run the `state` reader ends writes
   `failed` and then rejects with that reader's value by identity". That is the design verdict, the
   test checkout's source, and its guide. The tarball installed here leaves the status at `running`
   on that path, which the T2 report records as its own ruling and T3 item 2 changed. An executor
   running against a build predating T3 whose `state` reader throws sees a harness parked at
   `running`. The gate bullet I wrote polls for a terminal status under a budget, so it fails on the
   budget rather than hanging, but the sentence itself is unverifiable in this checkout.
2. **The `inject` teaching rests on a type augmentation nothing generates.** No scaffold template
   declares `ProvidedContext`, measured with
   `grep -rn "ProvidedContext\|inject(" src/core/templates.ts tests/setup.ts`, which matched nothing.
   `SKILL.md` therefore instructs the workspace to augment it in the browser test setup module. The
   augmentation shape is read from `node_modules/vitest/dist/chunks/traces.d.D2T_R8rx.d.ts:21`
   (`interface ProvidedContext {}`) and `dist/index.d.ts:105`
   (`declare function inject<T extends keyof ProvidedContext & string>(key: T): ProvidedContext[T]`).
   I did not compile the fence.
3. **The fences are checked for names, never for signatures.** `inspectSkillImports` proves each
   binding is exported and nothing more, so a verb table cell naming the wrong parameter order would
   pass every gate this unit ran. I read each signature from the installed `.d.ts` while writing the
   tables, and that reading is the only thing behind them.
4. **The voices table transcribes messages read from the installed build, not from a run.** Each row
   was matched against `dist/src/browser/index.js` and `dist/src/core/index.js` — for example
   `dist/src/browser/index.js:575` for the `pressKeys` refusal and `:989` for the `waitForState`
   augmentation — but no journey was driven to raise one. The `readContrast`, `readCensus`,
   `buildContrast`, and `removeDatabase` rows sit in `layer.md`'s table while their fences live in
   `styles.md` and `captures.md`; that placement is my decision, on the ground that the voice table
   is one home for every message a journey asserts.
5. **ROADMAP row 35's measurement is the S2 audit's, not mine.** I carried the
   `extractFenceImports` finding and its 2026-09-17 date from
   `.orkestrel/campaign/s2-audit-verdict.md` § Confirmed on evidence. I did not re-run
   `probe-fence-imports.mjs`.
6. **`configs/browsers.ts`'s reopening condition is quoted from the emitting template, not from a
   generated workspace.** I read `src/core/templates.ts` and the `resolveBrowser` doc block it
   carries. No workspace was generated to confirm the emitted bytes carry that paragraph.

## Review evidence

```text
$ git status --short
 M .agents/skills/orkestrel-prove-journey/SKILL.md
 M .agents/skills/orkestrel-prove-journey/references/captures.md
 M .agents/skills/orkestrel-prove-journey/references/decide.md
 M .agents/skills/orkestrel-prove-journey/references/layer.md
 M .agents/skills/orkestrel-prove-journey/references/statechart.md
 M .agents/skills/orkestrel-prove-journey/references/styles.md
 M .agents/transports/codex.md
 M ROADMAP.md
?? .orkestrel/campaign/

$ git diff --stat
 .agents/skills/orkestrel-prove-journey/SKILL.md    | 183 +++++++++++--
 .../orkestrel-prove-journey/references/captures.md |  54 +++-
 .../orkestrel-prove-journey/references/decide.md   |  49 +++-
 .../orkestrel-prove-journey/references/layer.md    | 272 +++++++++++++++----
 .../references/statechart.md                       | 301 +++++++++++++++++----
 .../orkestrel-prove-journey/references/styles.md   | 135 +++++++--
 .agents/transports/codex.md                        |   7 +
 ROADMAP.md                                         |  34 ++-
 8 files changed, 844 insertions(+), 191 deletions(-)
```

The diffstat predates the last two prose edits in `layer.md` and `decide.md` and the formatting pass
that followed; the file list is final.

No off-limits file was written: `guides/**`, `src/**`, `tests/**`, `.claude/**`, `.codex/**`,
`.cursor/**`, every other skill, `host.json`, and `package.json` are all absent from the status
output, as are `agents/openai.yaml` and the `.claude/skills/orkestrel-prove-journey` bridge, which
needed no change because the `description` did not move. Nothing was committed, pushed, or
installed, and no `git checkout`, `restore`, `stash`, `reset`, or `clean` was run.

## Instruments left on disk

Retained under `.orkestrel/campaign/s3-instruments/`:

- `s3-sweep.test.ts.txt` — the S3-C1 population reading and the S3-C2 planted-fence control.
- `s3-exports.test.ts.txt` — the dump of every name the installed core and browser entries export,
  which is what the fence lists were written against.
- `s3-population.mts` — the re-measurement of the fenced-binding population after formatting.
- `s3-terms.mts` — the banned-term and judged-term sweep over the owned files.
- `s3-lint.txt`, `s3-policy.txt` — the final gate logs.
