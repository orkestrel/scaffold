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
