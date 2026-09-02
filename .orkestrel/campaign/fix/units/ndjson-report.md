# Unit breaking-ndjson — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s18-03** — applied: reset() renamed to clear() on NDJSONParserInterface (src/core/types.ts:22) and on NDJSONParser (src/core/NDJSONParser.ts:46), types first per TTTDD. Every in-package consumer moved atomically: the class @example (NDJSONParser.ts:25), the member TSDoc (types.ts:16-22, first sentence rewritten to the third-person -s form per .claude/rules/typescript.md "The first sentence states what the symbol does in the third person with an -s verb"), the guide quote block (guides/ndjson.md:15), the Surface fence (:38), the Types row (:45), the Methods row (:84), the Methods fence (:92), the README prose (:9) and its usage fence (:39), and every test call site. No alias, re-export, or shim was added. The name clear() collides with no existing export: grep '\bclear\b' src returns only the three new sites. Guide table padding preserved by deriving column widths from the separator row, so format:check stays green.
- **s18-22** — applied: The rationale at tests/src/core/NDJSONParser.test.ts:610-616 attributed the swallow to a `#line` member wrapping JSON.parse in try/catch. NDJSONParser has no such member. Verified the true source in the staged dependency before writing it: node_modules/@orkestrel/contract/dist/src/core/index.js:7038 parseJSONAs delegates to parseJSON, and :7010-7016 parseJSON wraps INTRINSICS.decode in try/catch and returns undefined on throw. Rewrote the comment to attribute the swallow to parseJSONAs from @orkestrel/contract, keeping the engine-dependence point and the pin unchanged. Comment only; the test body and its assertions are untouched.

## Symbols moved

- NDJSONParserInterface.reset → NDJSONParserInterface.clear
- NDJSONParser.reset → NDJSONParser.clear

## Files touched

- /home/user/fleet/ndjson/src/core/types.ts
- /home/user/fleet/ndjson/src/core/NDJSONParser.ts
- /home/user/fleet/ndjson/tests/src/core/NDJSONParser.test.ts
- /home/user/fleet/ndjson/tests/src/core/factories.test.ts
- /home/user/fleet/ndjson/guides/ndjson.md
- /home/user/fleet/ndjson/README.md

## Tests changed

- tests/src/core/NDJSONParser.test.ts — describe block 'NDJSONParser — reset' renamed to 'NDJSONParser — clear'
- tests/src/core/NDJSONParser.test.ts — 'discards a buffered partial line so a later parse starts fresh': call site and its inline comment moved to clear()
- tests/src/core/NDJSONParser.test.ts — 'is a safe no-op with an empty buffer': both call sites moved to clear()
- tests/src/core/NDJSONParser.test.ts — 'keeps parsing normally across many reset calls (interleaved with parse)' renamed to '...many clear calls...'; three call sites and the 'back-to-back clears stay harmless' comment moved
- tests/src/core/NDJSONParser.test.ts — 'NDJSONParser — never-throws on adversarial nesting depth': rationale comment rewritten (s18-22); test body unchanged
- tests/src/core/factories.test.ts — 'clears buffered state on reset' renamed to 'drops buffered state on clear'; call site moved

## Gates

- `npm run format:check` → exit 0 — Checking formatting... All matched files use the correct format. Finished in 1911ms on 35 files using 4 threads.
- `npm run lint:check` → exit 0 — > oxlint --config .oxlintrc.json --deny-warnings .  (no diagnostics)
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json  (no diagnostics)
- `npm run build` → exit 0 — dist/src/core/index.js 2.34 kB | dist/src/core/index.cjs 2.49 kB | built in 1.63s | Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- `npm test` → exit 0 — test:src 70 passed (70) | test:policy 111 passed (111) | test:config 46 passed (46) | test:setup 18 passed (18) | test:guides 18 passed (18)
- `grep -rn '\breset\b' src tests guides` → exit 0 — Four hits, all in guides/test.md (lines 496, 2329, 2432, 2433) — the off-limits vendored @orkestrel/test mirror, describing that package's TCP peer reset and its counter reset, not this package's symbol. Zero hits for NDJSONParserInterface.reset. A case-insensitive sweep across inflections (grep -rniE '\breset(s|ting|ted)?\b' src tests guides README.md) returns the same four hits and nothing else.

## Diff stat

```text
README.md                           |  4 ++--
 guides/ndjson.md                    | 10 +++++-----
 src/core/NDJSONParser.ts            |  4 ++--
 src/core/types.ts                   |  5 +++--
 tests/src/core/NDJSONParser.test.ts | 33 +++++++++++++++++----------------
 tests/src/core/factories.test.ts    |  4 ++--
 6 files changed, 31 insertions(+), 29 deletions(-)
```

Status at return (writer's reading): `Both assigned rows applied. Full gate chain green: npm run format:check, npm run lint:check, npm run check, npm run build, npm test all exit 0. git status --short shows only the six owned files modified; package.json, package-lock.json, configs/**, .claude/**, tests/setupPolicy.ts, tests/policy.test.ts, guides/README.md, and every vendored dependency guide mirror are untouched. No commit, stage, push, install, or discarding git command was run.`
Built `dist/` moves: true

## Observations

- Red-then-green record. Before: grep -rn '\breset\b' src tests guides/ndjson.md README.md returned 22 hits across src/core/types.ts, src/core/NDJSONParser.ts, both test files, guides/ndjson.md, and README.md. After: 0 hits in those paths. Baseline gates were already green before editing (format:check 0, lint:check 0, check 0, test:src 70 passed), so the rename is proven by the grep transition plus the unchanged 70-passing src:core count, not by a suite that went red.
- dist moves, as expected for a rename. dist/src/core/index.js:43 and index.d.ts:46,70 now emit clear(); grep -rn '\breset\b' over dist/src/core/index.js, index.cjs, and index.d.ts returns nothing.
- Staged closure verified before typechecking: node /home/user/work/verify-stage.mjs ndjson exits 0 and reports @orkestrel/contract, @orkestrel/guide, @orkestrel/html, @orkestrel/markdown, and @orkestrel/test each matching its register tarball. npm run check against that closure exits 0 with no diagnostics, so the adoption list the brief pointed at is empty: this package imports only isRecord, parseJSONAs, and seededRandom from @orkestrel/contract, none of which the L0 landing renamed, and tests/guides.test.ts already carries the renamed guide helpers from commit 1d50483.
- NDJSONParserInterface extends nothing, so the W-DEV Source.methods-follows-extends condition is inert here; the guide's single Methods table matches the interface's call-signature members exactly and test:guides passes.
- The parity INTERNAL list in tests/guides.test.ts is Object.freeze([]) and stays empty: no symbol was removed, only renamed, so nothing became stranded.
- Centralization sweep over the touched files found nothing to change: src/core/types.ts holds interfaces only, src/core/NDJSONParser.ts holds one class plus imports with no module-scope declaration and no nested function declaration or assignment, src/core/index.ts re-exports all three modules unchanged, and no wrapper, alias, or 1:1 delegate was introduced. All six touched files decode as valid UTF-8 with no replacement character, no stray control character, and no trailing whitespace.
- Wording decision recorded per the deviation contract. The guide Methods table's sibling row for parse uses the imperative ('Append `chunk`, then return...'). I wrote the clear row's Behavior cell in the same imperative voice ('Drop any buffered partial line, leaving the handle ready for a fresh stream.') rather than the third-person form, so the diff introduces no voice split inside a table this row only partly owns. The TSDoc block in src/core/types.ts does take the third-person -s form ('Drops any buffered partial line...') that .claude/rules/typescript.md fixes for TSDoc.
- Guide table padding is load-bearing for format:check: the Types and Methods tables are padded to fixed display widths, and awk byte counts read 2 high on rows carrying an em dash. Both rewritten rows were re-padded from widths derived from their separator row and assert-checked to the original character length before writing, which is why format:check stayed green with no converging npm run format run.
- Out-of-scope findings, recorded against the capability that owns them rather than repaired here. README.md:50 links to `guides/src/ndjson.md`, which does not exist (the guide is at `guides/ndjson.md`); the guides parity test walks guide links only, not README links, so nothing catches it. README.md:20 states 'Node.js >= 24' while package.json engines.node declares '>=22.12.0'. guides/ndjson.md:77 cites 'AGENTS §22' and tests/src/core/NDJSONParser.test.ts:11 cites 'AGENTS §16', section numbers the current AGENTS.md does not carry. tests/setup.ts:14 calls vi.restoreAllMocks() in an afterEach.
- Whole-suite timing on this host was unremarkable and is reported as an observation, not a criterion: src:core 996ms, policy ~1.2s, config 1.98s, setup 255ms, guides 331ms. No test was timing-suspect and none needed a re-run.

## Deviations

- Brief-fact correction, no stop. The Law section states that .claude/rules/names.md, typescript.md, architecture.md, patterns.md, tests.md, documentation.md, quality.md, workspace.md, and portability.md are 'all vendored in the repository'. They are not: /home/user/fleet/ndjson/.claude contains only agents/orkestrel.md and settings.json, and the repository's own AGENTS.md is a 27-line pointer that resolves every rule path against scaffold. I read the rules from /home/user/scaffold/.claude/rules/, which is the resolution that same AGENTS.md prescribes for a scaffold checkout sitting beside the repository. No stop trigger fired (no name collision, no two rows moving one symbol, no off-limits edit required, no unattributable gate failure), and the brief's Vocabulary section quoted the binding text directly, so the ruling was reachable either way. Confirmed the governing text at scaffold's .claude/rules/names.md § Fixed lifecycle vocabulary: `clear` = 'Reset state without destroying the entity', followed by 'Never introduce synonyms such as `cancel`, `reset`, or `run` for these meanings.'
- Scope note on acceptance criterion 1. The criterion reads 'grep -rn \'\\b<old-name>\\b\' src tests guides returns no hit'. It returns four hits, every one of them in guides/test.md — a file the brief's own Off-limits list names ('vendored dependency guide mirrors'). Those lines document @orkestrel/test's socket peer reset and its counter reset, not NDJSONParserInterface.reset, and .claude/rules/documentation.md forbids rewriting a mirror ('Refresh a mirror rather than rewriting it'). The criterion is met for the renamed symbol; the residue is an off-limits file the criterion's grep bound could not exclude.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/ndjson.diff`,
`tmp/units/breaking/ndjson.status`.
