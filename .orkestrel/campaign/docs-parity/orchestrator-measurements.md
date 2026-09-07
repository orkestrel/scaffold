# Orchestrator measurements — guide and TSDoc parity

Taken 2026-09-06 (23:3x to 23:5x UTC) on the four-CPU container, Node v22.22.2, scaffold at `f9117f0c`, guide at its phase A tip; scaffold's oxfmt 0.65.0 and oxlint 1.80.0, guide's oxlint 1.81.0. Each probe names its control.

## P1 — `renderMarkdown` fidelity (`instruments/p1/`, `p1-render.log.txt`)

Scaffold's `## Surface` table (19 committed lines, column-aligned) rendered through `@orkestrel/markdown`'s `renderMarkdown` comes back one-space padded (`| Name | Kind | Summary |`), so it is not byte-identical to the committed bytes; the render is idempotent over its own output. Control: an in-cell edit (`One` → `EDITED One` in the `Artifact` row) diffs the render; a first control that appended an extra cell did not, because the parser drops an excess cell, and is recorded as a mis-built control.

## P1b — oxfmt restores the committed form (`p1b-oxfmt-align.log.txt`)

`oxfmt --write` (0.65.0, scaffold's `.oxfmtrc.json`) over the one-space-padded render re-aligns the whole table byte for byte to the committed bytes. Reading: the gate compares parsed entries, never bytes; the propagation path is render or splice, then the checkout's own formatter, and the result is the committed form.

## P3 — the first equality run over scaffold's own guide (`instruments/p3/p3-equality.mjs`, `p3-equality.log.txt`)

Every exported declaration under `src/core` and `src/server` is paired by name with a Surface row and carries a doc block; every Surface row's `Summary` cell differs from its doc paragraph, and the difference is systematic: the guide carries the noun phrase (`One file in a plan, …`) and the doc block the third-person sentence (`Represents one file in a plan, …`; `Names …`; `Lists …`). The Methods rows differ the same way, and one method carries no doc block. Reading: under the amendment the guide cells adopt the sentence, which `npm run docs -- --to guide` does in one run per package, and the review of that run is the editorial cost the objective lane named. The instrument's guide reader locates the compared column by header (`Summary`, `Behavior`, `Role`) and its source reader attaches a block comment to the export it precedes by range through `parseSync`'s `ParseResult.comments`; the regex count of `/** … */ export` blocks exceeds the attached count by the non-declaration exports, which D1's control refines per shape.

## P4 — the `jsdoc` rewrite (`p4-jsdoc.log.txt`)

`oxfmt --write` with `jsdoc: true` over a copy of `src/core` rewrites every file that carries a block tag: it reorders tags (`@param` and `@returns` move after `@remarks` and `@example`), re-wraps lines, and tab-indents example fences inside the comment; the description paragraph's words are unchanged. Reading: `jsdoc` stays unset; the reader collapses whitespace and reads the paragraph before the first block tag, so wrapping is outside the comparison, and the `@example` reader unwraps the continuation marker and leading indentation before comparing bodies.

## P5 — an oxlint rule reporting on a comment (`instruments/p5/`, `p5-comment-report.log.txt`)

A throwaway plugin rule reads `context.sourceCode.getAllComments()`, whose members carry `type`, `value` (the text after `/*`, so a doc block's value begins with `*`), `start`, `end`, `range`, and `loc`, and `context.report` accepts both `{ node: comment }` and `{ loc: comment.loc }`; the diagnostic lands at the comment's position under oxlint 1.80.0 (scaffold) and 1.81.0 (guide). Reading: the voice rules can report on a doc block; `PolicyContext` re-declares that shape structurally.

## P6 — provenance spans

The installed `@orkestrel/markdown` declaration gives `parseProvenance` a `Map<MarkdownNode, MarkdownSpan>` with `start` and `end` per node, populated by the table and list collectors (`collectTable(lines, start, spans)`), so a table node's source span exists for the splice.

## P7 — the example pairs already known to disagree

`createBlueprint` (`src/core/factories.ts:36-42` against `guides/scaffold.md:762-773`, the guide's richer program executed by `tests/guides.test.ts:212-221`), `Materializer` (`src/server/Materializer.ts:117-127` against `guides/scaffold.md:1415-1426`, the guide adding the result read), and `Compiler` (`src/core/Compiler.ts:72-80` against `guides/scaffold.md:877-886`, diverged) — recorded from the absorption; under decision 4 the guide fence wins and the doc block adopts it in D6.

## P8 — a doc-comment edit moves the published declaration

`dist/src/core/index.d.ts` carries the doc blocks: the `@remarks`, `@example`, and `{@link` tags occur 291 times in the shipped file, so a TSDoc convergence changes the declaration a consumer installs and bumps the package under `.agents/orchestration.md` § What a bump obliges. The owner rules whether that bump rides the API-removal wave.

## P9 — the banned-term sweep over scaffold's own prose (`instruments/p9/`, `p9-terms.log.txt`)

The sweep D3 will vendor, run as a probe over every Markdown file scaffold authors (guides, `README.md`, `.claude/rules`, `.claude/agents`, `.codex`, `.agents`, `AGENTS.md`, `CLAUDE.md`, `ROADMAP.md`, `PROPOSAL.md`), with fence bodies and inline code spans excluded and every term of `.claude/rules/writing.md` § Substitutions whose ban is unconditional matched across inflections. Control: a file carrying one prose hit, one hit inside a fence, and one inside a code span reports the prose hit alone. `guides/scaffold.md`, `guides/README.md`, `README.md`, and `.claude/rules/writing.md` (its table's terms are code spans) report nothing. The hits: the fleet's guide mirrors under `guides/` (outside the sweep as mirrors; each package meets its own under D7.n), the `enterprise-bootstrap` references (`via`, `e.g.`, `etc.`, `easy`, `currently`, `just`), `.agents/orchestration.md`, `.agents/skills/orkestrel-debrief/references/field-testing.md`, `.agents/skills/orkestrel-falsify/references/reconcile.md`, `.claude/rules/architecture.md`, `.claude/rules/quality.md`, `AGENTS.md`, and `PROPOSAL.md` (outside the sweep's population). Reading: the canon the fleet vendors carries the hits, so a vendored sweep reds every target until scaffold's own prose is clean; a prose unit (D3-pre) precedes D3, and D3's brief names the population exactly.

## P10 — the first-sentence voice reading (`instruments/p10/p10b-voice.mjs`, `p10b-voice.log.txt`)

Every doc block that opens at a line start and is followed on the next line by an export declaration, over `src`, `configs`, `tests`, and `scripts`: the first word against the `-s` verb proxy and the first sentence against the declared name. The control file reports its noun-phrase opener, its imperative opener, and its name repeat, and passes its clean block. Reading at dispatch of D3-pre: `FLAGGED 272`, all in `tests/setupServer.ts`, `tests/setupPolicy.ts`, `configs/policy.ts`, `tests/setup.ts`, and `configs/helpers.ts`; `src/**` clean; no name repeat; `NODOC 35` exports with no doc block directly above (the vendored helper's chiefly, the rest inside template text the instrument's regex reaches and a comment-reading rule cannot). The proxy's known gap, recorded by the unit: a plural noun ending in `s` passes it, and the stop set the rule carries does not close that direction. The P9 figure the D3-pre brief quoted (`HITS 35`) was the run with the control file appended; the workspace alone reads `HITS 32`.

## P11 — the consumer gate run under D3 (`instruments/d3/`, `d3-distribution-deciding.log.txt`, `d3-gates-probe.log.txt`)

Taken 2026-09-07 02:38 to 02:41 UTC, alone on the container. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` over D3's uncommitted tree: exit 1 in 47.63 s at `tests/distribution.test.ts:935` (`gates.status` 1), the verifier's reading reproduced with nothing else running. The assertion discards the consumer's output, so `d3-gates-probe.sh` re-ran the test's steps (pack, install into a consumer, generate the `proof` blueprint through the installed copy, re-pin the generated manifest to the tarball, install, `npm run prepublishOnly`) with the output kept: the generated `@orkestrel/proof` workspace passes `format:check`, `lint:check`, `check`, and `build`, and `npm test` stops in `test:policy` with `3 failed | 87 passed` — the guide-accounting case (`isPolicyMirror(root, 'guides/scaffold.md')` is true where the package is `proof`), the population case (`.claude/rules/writing.md` absent), and the currency case (`ENOENT` on the same file). The generated workspace's Markdown population is `AGENTS.md`, `CLAUDE.md`, `README.md`, `guides/README.md`, `guides/guide.md`, `guides/scaffold.md`, and `.claude/agents/orkestrel.md`; its `.claude/` holds `agents/orkestrel.md` and `settings.json` and no `rules/`, the same shape as `/home/user/fleet/guide/.claude/`. Reading: the vendored `tests/policy.test.ts` runs in two populations, the canon repository and every target, and a case that assumes the canon's identity or its authored rule files reddens every target's gate. The D3 brief did not name that second population; `d3-fix-brief.md` names it under Standing conditions.

## P12 — the guide package cannot run its own source through Node's type stripping (2026-09-07, for the D5 fork)

```text
$ cd /home/user/fleet/guide && node --experimental-strip-types -e "import('./src/core/index.ts').then((m) => console.log('exports', Object.keys(m).length)).catch((e) => console.log('FAIL', e.code, e.message.split('\n')[0]))"
FAIL ERR_MODULE_NOT_FOUND Cannot find module '/home/user/fleet/guide/src/core/types.js' imported from /home/user/fleet/guide/src/core/index.ts
```

Reading: the guide's source imports its siblings with a `.js` extension that the bundler and the type checker map to `.ts`, and Node's stripping loader maps nothing, so a seed in the guide checkout that imports the package's own readers must import the built `dist/src/core/index.js` entry, after `npm run build`. That is the cost of every shape that gives the guide package a copy of the seed pointing at itself (options 1 and 2 of `d5-fork-design-brief.md`); a shape that runs the registry copy (option 3) pays a one-release lag instead.

## P13 — a package's own name resolves inside its checkout through its `exports` map (2026-09-07, M1 of the D5 fork)

```text
$ cd /home/user/fleet/guide && node -e "import('@orkestrel/guide').then((m) => console.log('resolved: exports', Object.keys(m).length, 'findDrift', typeof m.findDrift), (e) => console.log('FAIL', e.code))"
resolved: exports 102 findDrift function
$ cd /home/user/fleet/guide/tmp/m1 && node -e "import('@orkestrel/guide').then((m) => console.log('resolved from tmp/m1: exports', Object.keys(m).length), (e) => console.log('FAIL', e.code))"
resolved from tmp/m1: exports 102
$ cd /home/user/fleet/guide && npx tsc --noEmit -p tmp/m1/tsconfig.json      (probe.ts: `import type { Drift }` and `import { findDrift }` from '@orkestrel/guide'; instruments/d5/m1-probe.ts)
tsc exit=0
$ npx tsc --noEmit -p tmp/m1/tsconfig.json --traceResolution | grep -m2 …
Using 'exports' subpath '.' with target './dist/src/core/index.d.ts'.
======== Module name '@orkestrel/guide' was successfully resolved to '/home/user/fleet/guide/dist/src/core/index.d.ts' with Package ID '@orkestrel/guide/dist/src/core/index.d.ts@0.0.17'. ========
control (a scratch package named ctl-noexports with no exports map, importing itself by name):
control FAIL as expected: ERR_MODULE_NOT_FOUND
```

Reading: Node and `tsc` both resolve a package's own name from inside its tree through the `exports` map, to the built `dist/` entry, and a package without an `exports` map does not. The reason `.claude/rules/workspace.md:77-79` gives for refusing every `@orkestrel/*` import from a vendored file ("every such package is itself a target and cannot depend on itself") is false for a scaffold-generated package, which always carries an `exports` map. The true cost is that the resolution lands on `dist/`, so in the package that publishes the readers `npm run docs` runs after `npm run build`, and `npm run check` (`tsc --noEmit --project tsconfig.json`, whose program is everything outside `node_modules`, `dist`, and `tmp`) needs the workspace's own published specifiers mapped to its source in the root `tsconfig.json` to stay independent of a build.

## M6 and M7 of the D5 fork (2026-09-07)

```text
$ for d in /home/user/fleet/*/; do printf '%s %s\n' "$(basename $d)" "$(grep -c '"docs"' $d/package.json)"; done
every checkout 0 — no fleet manifest declares a docs script yet
$ npm run test:src:server            (scaffold, the tree as D5 left it; instruments/d5/m7-test-src-server-before.log.txt)
 FAIL  tests/src/server/helpers.test.ts:200  expect(imported).toEqual([])  — received ["scripts/docs.ts"]
 Test Files  1 failed | 4 passed (5)   Tests  1 failed | 431 passed (432)   Duration 4.32s   EXIT 1
```

## M8 — the distribution proof's install red is npm 10.9.7's, not this tree's (2026-09-07, after the D5 audit round)

```text
$ npm run test:distribution                         (default path: npm 10.9.7; instruments/d5/distribution-deciding-npm10.log.txt)
 FAIL  stages exactly the declared vendored host inventory        tests/distribution.test.ts:293  expected false to be true
 FAIL  installs the packed scaffold and passes one generated core/server workspace through prepublish   :908  expected 1 to be +0
 Tests  2 failed | 3 passed (5)   Duration 21.37s   EXIT 1
$ bash instruments/d5/install-reproduce.sh          (pack, materialize the proof workspace from dist/, point @orkestrel/scaffold at the tarball, npm install)
npm error Cannot read properties of null (reading 'edgesOut')      at #loadPeerSet (@npmcli/arborist/lib/arborist/build-ideal-tree.js:1289)   idealTree:node_modules/vitest
bisect A  registry @orkestrel/scaffold ^0.0.63 instead of the tarball        → the same crash
bisect B  the tarball, @orkestrel/guide removed                              → the same crash
bisect C  the tarball, --legacy-peer-deps                                    → exit 0
bisect D  an empty package with devDependencies { vitest: ^4.1.11 } alone    → the same crash
bisect E  an empty package with devDependencies { vite: ^8.2.2 } alone       → exit 0
$ which -a npm → /opt/node22/bin/npm (10.9.7), /usr/local/bin/npm (10.8.2); /opt/npm11/bin/npm → 11.19.1
instruments/d3/d3-gates-probe.sh:10  export PATH=/opt/npm11/bin:$PATH         (the last green distribution run: npm 11.19.1)
```

Reading: the first red is the hand-pinned vendored list at `tests/distribution.test.ts:250-285`, which lacks `scripts/docs.ts` — a file D5's brief failed to scope as one the change makes false; D5-fix-2 adds the row. The second red reproduces with the registry scaffold, without the guide dependency, and on a bare `vitest ^4.1.11` install, and clears with peer resolution disabled: it is npm 10.9.7's `#loadPeerSet` crash on `vitest`'s peer set, not this change's. The D3 probe ran the proof under npm 11.19.1 from `/opt/npm11/bin`, and the D5 verify brief had dropped that standing condition; it is restored, and the deciding run under npm 11 (`instruments/d5/distribution-deciding-npm11.log.txt`) rules the case.

## P14 — the guide checkout under scaffold's tip (2026-09-07, for D7.guide)

```text
$ cd /home/user/scaffold && npm pack --json --ignore-scripts --pack-destination <scratch>/packed      (tip 81ed3321)
orkestrel-scaffold-0.0.63.tgz 1158136 bytes, 140 entries                       (dist/host/scripts/docs.ts inside; the version unbumped)
$ npm pack @orkestrel/guide@0.0.17 && grep -c "findDrift\|locateComment\|replaceCell" package/dist/src/core/index.d.ts
0                                                                              (the registry's 0.0.17 exports none of the readers)
$ grep -n '"@orkestrel/scaffold"' package.json
81:		"@orkestrel/scaffold": "^0.0.63",                                           (the replaced range; the registry's 0.0.63 was installed before)
$ PATH=/opt/npm11/bin:$PATH npm install --no-save --ignore-scripts --no-audit --no-fund <scratch>/packed/orkestrel-scaffold-0.0.63.tgz
install exit 0; node_modules/@orkestrel/scaffold/dist/host/scripts/docs.ts present; the guide's tree clean after the install
$ node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline --json      (instruments/d7/guide-audit-offline.json)
exit 1: stale tsconfig.json, configs/helpers.ts, configs/policy.ts, .oxlintrc.json, tests/setupPolicy.ts, tests/policy.test.ts, tests/config.test.ts; missing scripts/docs.ts; package.json aligned; everything else aligned
```

Reading: the guide checkout's head start of scaffold is the unpublished tip at the published version number, so the replaced range (`^0.0.63`) is recorded here and the registry copy is restored before any release gate (`npm ci` restores it). `repair` from the installed entry would write the vendored files D3 and D5 changed (the policy plugin and its proofs, the lint config, the root `tsconfig.json` with the own-specifier entry, and the seed); it reports the manifest aligned, so whether the `docs` script is appended by `repair` or added by hand is a measurement the D7.guide unit takes at its first write. The registry's guide carries no reader, which is the dependency-order red scaffold's distribution proof shows.

P14 addendum: the head-start install reported `removed 30 packages, and changed 1 package`; `npm ls --depth=0` in the guide checkout then reports nothing missing, extraneous, or invalid, the lockfile's and the installed scaffold's runtime dependency sets are identical, and `npm run check` there passes, so the removed packages were extraneous to the guide's lockfile and the head start restores nothing the guide's gates read. `npm ci` there restores the registry copy before any release gate.

## P15 — the ground D7.guide's units stand on (2026-09-07, after the design round; `instruments/d7/p15/`, `instruments/d7/scratch/`)

```text
$ npm view @orkestrel/guide versions --json | tail -4
  "0.0.15", "0.0.16", "0.0.17" ]                                              (the list ends at 0.0.17; 0.0.18 is unpublished)
$ git -C /home/user/fleet/guide status -sb; git log --oneline -1
## claude/orkestrel-npm-audit-deps-14ibta...origin/…  b7dc578 (clean)
$ grep -rn '0\.0\.17' --include=*.ts --include=*.md --include=*.json . | grep -v node_modules | grep -v package-lock
./package.json:3 alone among the tracked .ts, .md, and .json files the pattern covered (the lockfile excluded by the grep; the vendored catalog carries other packages' ranges; tmp/ reports are untracked)
   R1 correction: package-lock.json:3 and :9 carried 0.0.17 outside that bound; closed by the lockfile-only install recorded in instruments/d7/u1fix/lockfile.log.txt
$ node instruments/d7/p15/p15-fleet-classes.mjs /home/user/scaffold/src /home/user/fleet/*/src
files read: 708, class/interface heads carrying @example: 307, titled: 0, untitled: 347
$ node instruments/d7/p15/p15b-fleet-heads.mjs /home/user/scaffold/src /home/user/fleet/*/src   (every keyword head)
titled: scaffold src/core/factories.ts createBlueprint :: Blueprint; src/core/helpers.ts catalogToLayers :: Fleet catalog; src/server/helpers.ts stageHost :: Vendored data root
files read: 708, declaration heads carrying @example: 2017, titled: 3, untitled: 2065
scratch clone of the guide checkout (node_modules linked to the head-started checkout), instruments/d7/scratch/:
$ node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline
wrote .oxlintrc.json, configs/helpers.ts, configs/policy.ts, tests/config.test.ts, tests/policy.test.ts, tests/setupPolicy.ts, scripts/docs.ts,
      package.json (the `docs` script row appended after `test:setup`), tsconfig.json (the `"@orkestrel/guide": ["./src/core/index.ts"]` paths entry after `@src/core`);
      every `@orkestrel/*` range untouched; README.md, guides/**, tests/guides.test.ts, tests/setup.ts, src/** untouched
$ npm run lint:check                                                           exit 1
tests/fixtures/broken/missing-example/module/helpers.ts:5:1  policy(no-malformed-summary)   (a block opening at its @example tag)
tests/fixtures/good/tests/widget.test.ts:1:1                policy(no-banned-term)          (`Dummy` in a line comment)
tests/setup.ts:13:1                                          policy(no-malformed-summary)   ("Require markdown whose first block is a table.")
$ npm run test:policy → 90 passed | 1 skipped;  npm run test:config → 172 passed | 1 skipped;  npm run check → exit 0
$ npm run build && npm run docs                                                exit 1
rows read: 1, disagreements found: 139                                         (every line `guide absent`: no table heads Summary; the pitch `readme absent`)
```

Reading: the widening of the example readers to every declaration head is inert across the fleet, because the only titled head blocks anywhere are scaffold's function blocks that already pair. `repair --offline` from the installed built entry lands the seed, the `docs` script, the own-specifier `paths` entry, and D3's policy plugin with its proofs, and leaves every hand-written file the units own untouched. The vendored voice rule reads the guide's own tree red at the sites the log names, each a one-line edit in a file the guide owns, and the vendored proofs and the typecheck read green. The seed runs only after a build, and before any header carries `Summary` every row reports absent.

## P16 — the seed's round trip over the guide's own tables (2026-09-07, `instruments/d7/p16/`)

```text
$ instruments/d7/p16/p16-round-trip.sh                                         (the scratch clone; sed renames each Behavior header to Summary: lines 60 79 154 178 192 250 263 295)
$ npm run docs                                                                 exit 1: rows read: 1, disagreements found: 139  (now text differences; the cells read)
$ npm run docs -- --to guide                                                   exit 1: rows read: 1, disagreements found: 139, written: 109, reported: 30
   reported: `class Guide`, `class Source`, `class SourceManager` (no Summary cell carries the key — the H3 sections carry no row),
             `type DeclarationKeyword` and the Types rows, `const *Shape` (the Types and Shapers tables carry no Summary column), the pitch
$ npx oxfmt --write guides/guide.md                                            exit 0 (oxfmt 0.66.0);  git diff --stat: 125 insertions(+), 125 deletions(-)
$ node p16-cells.mjs guide-before.md guide-after.md
rows compared: 145, non-final cells mismatched: 0, rows missing after: 0, rows after: 145
$ npm run docs                                                                 exit 1: rows read: 1, disagreements found: 30
$ npx oxfmt --check guides/guide.md                                            exit 0
```

Reading: `replaceCell` re-renders the guide's four-column tables, their nested code spans, and their escaped pipes without disturbing any cell outside the written column, and oxfmt 0.66.0 restores the committed alignment, so the seed's `--to guide` direction is safe over this guide. The written cells read verb-first from doc blocks that already open with a verb (the sample in the log: `SUMMARY`, `extractTagline`, `findDrift`, `isDrift`, `createGuide`), so the hand work is the information the data columns keep — the Constants literal that a `Value` column takes, the Types and Shapers literals that `Shape` keeps — and the rows the write cannot reach: the classes, the tables without the column, and the pitch.

## P17 — the fleet's exposure to the vendored voice rule (2026-09-07, `instruments/d7/p17/`, the P10 instrument over every fleet checkout but `guide`)

```text
$ node instruments/p10/p10b-voice.mjs /home/user/fleet/<pkg> src            (p17b-fleet-src-voice.log.txt)
FLAGGED 0 for every package but console 4, contract 1, html 1, markdown 1, mcp 2, middleware 2, router 1, server 1, terminal 1, toolbox 1 — and those are the proxy's name-repeat reading, not openers
$ node instruments/p10/p10b-voice.mjs /home/user/fleet/<pkg> tests scripts configs   (p17c-fleet-owned-voice.log.txt)
every package reads about 153 flagged sites in the vendored copies at 0.0.63's text (configs/policy.ts 75, tests/setupPolicy.ts 75, configs/helpers.ts 3), which `repair` replaces with the clean copies (dist/host: FLAGGED 0);
the package-owned remainder sits in each package's own test helpers: contract tests/setup.ts 107, mcp tests/setupConformance.ts 52, browser 53, database 52, html 36, agent 31, ollama 30, brief 24, codec 26, reason 22, sea 21, middleware 19, terminal 17, others under 16, abort budget emitter ndjson pool process sqlite template timeout tool worker workspace 0
```

Reading: the fleet's `src/**` doc blocks already open verb-first, so the cells the seed writes carry the rule's voice everywhere; the rule's red sits in the packages' own test helper doc blocks and comments, sized per package in the log.

## P18 — `repair` from the packed tip and the real rule, in scratch clones (2026-09-07, `instruments/d7/p18/`)

```text
$ p18-repair-lint.sh      (git clone of the checkout, node_modules linked to the checkout's, the tip's dist/bin/main.js run from an extracted tarball whose node_modules links to scaffold's)
abort: repair --offline → 9 written, 27 unchanged (the P15 list); npx oxlint --config .oxlintrc.json --deny-warnings . → 1 diagnostic (tests/src/core/Abort.test.ts, policy/no-banned-term)
mcp:   repair --offline → 9 written, 40 unchanged;                  lint → 183 diagnostics: 132 policy/no-malformed-summary, 51 policy/no-banned-term; tests/setupConformance.ts 54, tests/setup.ts 42, tests/setupServer.ts 25, tests/fixtures/browserServer.ts 10, src/core/types.ts 7, tests/src/server/middlewares.test.ts 6
```

Reading: `repair --offline` from the tip writes the same nine paths in every package, and the vendored rule's red is the package's own test helpers plus banned terms in comments, from one site (abort) to 183 (mcp). The P17 proxy under-reads `no-banned-term` (it reads openers alone), so each package's true count is the real rule's, taken at its unit's first step. The tip's CLI runs from an extracted tarball with scaffold's `node_modules` linked, so no head start install is needed for a scratch reading.

## P19 — the pilot's ground: abort in a scratch clone under the guide head start and the tip's repair (2026-09-07, `instruments/d7/p19/`)

```text
$ cd /home/user/fleet/guide && npm pack --ignore-scripts --pack-destination <scratch>/p19/packed      (tip c25c689)
orkestrel-guide-0.0.18.tgz
$ git clone /home/user/fleet/abort <scratch>/p19/abort; cp -r node_modules (a private copy); npm install --no-save --ignore-scripts <tgz>   (npm 11)
removed 30 packages, and changed 1 package; installed @orkestrel/guide 0.0.18; the tree clean
$ node <tip>/dist/bin/main.js audit --offline        → 8 of 35 planned paths drifted (the P15 configs and proofs stale, scripts/docs.ts missing) and the docs script line missing
$ node <tip>/dist/bin/main.js repair --offline       → 9 written, 27 unchanged (the P15 list)
$ npm run docs                                       (no dist/ in the checkout)   → exit 1: rows read: 1, disagreements found: 9      (M2: the seed needs no build outside the guide; M1: abort's drift is 9 rows)
$ npm run check                                      → exit 2: tests/guides.test.ts(138,28): Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'
$ npx oxlint --config .oxlintrc.json --deny-warnings . → 1 diagnostic: tests/src/core/Abort.test.ts:108 policy/no-banned-term (`just`)
$ npm run test:policy → 90 passed | 1 skipped;  npm run test:config → 172 passed | 1 skipped
$ npm run test:guides → 5 failed | 17 passed: `documents every interface method`, `documents no phantom method`, `Abort exposes no undocumented method` (each expected [] and met [{ name: 'abort', … }]),
                        `documents an example for every Surface function` (['validateAbortOptions', …]), `documents an example for every method` (TypeError: value.replace is not a function)
$ sed: the Methods header Behavior → Summary (abort.md:65); the Types table (:50, `Type | Kind | Shape`) left
$ npm run docs -- --to guide → rows read: 1, disagreements found: 9, written: 6, reported: 3;  npx oxfmt --write guides/abort.md;  p16-cells.mjs → rows compared: 14, non-final cells mismatched: 0
$ npm run docs → disagreements found: 3: the two interfaces in the Types table (no Summary column) and the pitch (readme absent)
```

Reading: the guide's 0.0.18 readers return records where 0.0.17 returned strings — `guide.methods()` groups carry `MethodEntry` records, `source.methods(name)` returns `MethodEntry` records, and `source.examples()` returns `SourceExample` records — so every fleet drop-in that passes those to `findMissing` or `findUnexampled` stops compiling and its cases red, the way scaffold's own suite did before D4-fix mapped each record to its `name` (`/home/user/scaffold/tests/guides.test.ts:123-151`). That adaptation is a mechanical per-package edit and a precondition of every other case, so it sits in each package's prep unit beside the head start or the re-pin. The seed runs without a build in a fleet checkout, the `--to guide` round trip over abort's three-column tables disturbs no cell, and the remaining disagreements after the write are the rows the converge unit owns.

## P20 — the vendored voice rule's reading in every fleet checkout after `repair` (2026-09-07, `instruments/d7/p20/`)

```text
$ p20-fleet-repair-lint.sh      (a scratch clone per checkout, node_modules linked, repair --offline from the extracted tip, then npx oxlint --config .oxlintrc.json --deny-warnings .)
total diagnostics per package, by rule (no-malformed-summary / no-banned-term) and the files that carry them — the full table in p20-fleet-repair-lint.log.txt:
  under ten: budget 2, emitter 2, form 2, msg 7, ndjson 5, pool 2, probe 4, process 1, queue 8, relation 3, sqlite 2, sse 5, template 0, timeout 0, tool 1, worker 6, workspace 4, lsp 9, test 9
  ten to twenty: console 13, csv 14, indexeddb 17, interpret 13, markdown 16, program 12, qualifier 15, rater 15, router 19, toolbox 11, websocket 13
  above twenty: codec 26, brief 31, reason 28, terminal 31, workflow 28, middleware 39, html 38, sea 47, server 23, agent 57, database 59, browser 60, ollama 61, contract 130, mcp 183
  the sites sit in tests/setup.ts and tests/setupServer.ts almost everywhere; sea, server, csv, and indexeddb carry theirs partly in src/**
```

Reading: the rule's red is created by `repair` in every checkout, and its size routes the prep unit — `builder` under twenty sites, the Opus `implementer` above — while the per-file lists tell each brief where the sites are. `test`'s reading is small despite its size, so it runs as a builder prep with a giant's converge.

## P23 — the equality gate's population and its controls, per converged package (2026-09-07, `instruments/d7/pass/p23/`)

`findDrift` compares every `## Surface` row whose symbol the source declares (the guide's `Summary` cell against the declaration's description paragraph), every `## Methods` row whose member the interface declares, and every titled fence with an `@example` of that title; `computeDrift` reports a pair unless the guide side is present and equals the source side, so a row with an absent cell, an absent paragraph, or both absent is reported, never passed. A guide row the source lacks and a member the interface lacks are the bijection cases' subject (`documents only barrel exports`, `documents no phantom method`), which run beside the gate.

```text
$ node census.mjs <clone>        (abort d714f6b, codec d216f4d, msg a11b9cb, sse 8f767de; head start 0.0.18)
abort  surface equal 7   methods equal 1  groups 1  unmatched [] undocumented [] bothAbsent []  pairs ["Create and abort"]
codec  surface equal 25  methods —        groups 0  unmatched [] undocumented [] bothAbsent []  pairs ["Encode and decode a byte sequence"]
msg    surface equal 124 methods equal 4  groups 2  unmatched [] undocumented [] bothAbsent []  pairs ["Factories"]
sse    surface equal 10  methods equal 3  groups 1  unmatched [] undocumented [] bothAbsent []  pairs ["Factories"]
$ p23-parity-controls.sh / p23b-parity-controls.sh   (a scratch clone per package; each control planted, measured, restored by copy)
  A  one Surface Summary cell altered            → docs 1 disagreement, the equality case red      (every package)
  B  one Methods Summary cell altered            → docs 1 disagreement, the equality case red      (abort, msg, sse; codec has no Methods table)
  C  the titled block's description first line   → docs 1 disagreement, the equality case red      (every package, p23b)
  H  another declaration's description first line→ docs 1 disagreement, the equality case red      (every package, p23b)
  D  the @example title removed                  → docs 0, the population pin red (both title sets named)
  E  the titled example body altered             → docs 1 disagreement, the equality case red
  F  the README pitch altered                    → docs 1 disagreement (pitch), the README case red
  G  one Summary header renamed to Behavior      → docs every row of that table `guide absent`, the equality case red (abort 1, codec 9, msg 25, sse per table)
  restored                                       → docs 0, the suite green, the clone's status clean
```

Reading: on every converged package the gate compares every documented declaration and every documented method, and every way a side can drift reddens both the seed and the suite. The first script's block control edited a `@remarks` line in abort and msg, which the comparison leaves unread by Ruling 7's design, so the successor plants it on the description's first line. Outside the gate by design: an implementing class's own method blocks (`Abort.abort`, `SSEParser.parse/flush/clear` carry none; the interface's block is the documented contract the Methods table compares), and every untitled fence (executed by the flagship tests, compared by nothing). P23 runs on every package after its converge unit lands, before its audit, as the Orchestrator's tracked command.
