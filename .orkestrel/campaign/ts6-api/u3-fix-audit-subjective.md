<!-- workflow wf_bf6a977b-49d, agent aa353a2c5bea24386, captured from journal.jsonl -->

## Per-claim verdicts — subjective lane (design fit, vocabulary, guide and template voice), Opus 5

**1. Seeds mirror the configs; browser takes the same shape; no dead-mechanism token; renderer assigns directly — PASS.**
`src/core/templates.ts:546-577` matches `configs/src/vite.core.config.ts:1-31` line for line, and `src/core/templates.ts:595-611` matches `configs/src/vite.server.config.ts:1-16` line for line; neither seed contains a backtick or `${` needing escaping. The browser seed `src/core/templates.ts:578-594` takes the server shape with `tsconfig.browser.json` and `srcBrowser`. No `vite-plugin-dts`, `dts(`, `beforeWriteFile`, or `{{replacement}}` survives in `src/core/templates.ts`, `src/core/compilers.ts`, `src/core/helpers.ts`, or `configs/helpers.ts`. The renderer assigns both seeds directly at `src/core/compilers.ts:928-933`. See finding A on the browser comment's vocabulary.

**2. `nameToRewrite` gone with nothing else lost — PASS.**
The symbol appears nowhere under `src/`, `tests/`, `guides/`, `configs/`, or `.claude/`; its TSDoc left with it at `src/core/helpers.ts:408`, its import at `src/core/compilers.ts:64-67`, its guide row at `guides/scaffold.md:235`. `matchesPrintWidth` and `serializeTypeScriptString` keep their exports (`src/core/helpers.ts:335`, `:407`), their guide rows (`guides/scaffold.md:235`, `:241`), their tests (`tests/src/core/helpers.test.ts:245`, `:272`), and live callers (`src/core/compilers.ts:850`, `:1246`, `:1254`, `:1330`).

**3. Compilers-test expectations and the parity gate — PASS on the expectations; CANNOT RULE on the gate.**
`tests/src/core/compilers.test.ts:1407-1422` reads `declarationRollup({`, `rewrite: rewriteCoreSpecifier,`, and the comment, and the name `reaches core through the rewrite in every emitted published face` names the property rather than the removed plugin. The gate clause has no round-2 evidence in my slice: the only verifier report present (`.orkestrel/campaign/ts6-api/u3-verify-report.md:47`) is round 1 and reports `GATES: RED`. The green reading rests on the writer's own report (`u3-fix-report.md:135-138`), which is not evidence. My text comparison under claim 1 supports the case passing; the run is missing.

**4. Scratch under `os.tmpdir()`, removed in the `finally`, nothing else touched under `dist` — PASS.**
`configs/helpers.ts:667` allocates with `mkdtempSync(join(tmpdir(), 'orkestrel-declarations-'))`; `:732` removes it in the `finally`; the only writes under the face output are the extractor's `untrimmedFilePath` and the `rewrite` write-back to that same path. The TSDoc names the location and the reason at `configs/helpers.ts:624-629`.

**5. One `createRequire`, and the comment states the `tsc`-versus-lint reason — PASS.**
Bound once at `configs/helpers.ts:656`, serving `load.resolve('typescript/bin/tsc')` at `:657` and `load('@microsoft/api-extractor')` at `:685`; the reason comment sits directly above the load at `:681-684`.

**6. `isExtractorModule` prose names its members, and the true branch has a case — PASS.**
`configs/helpers.ts:600-607` and the guard's TSDoc name `Extractor.invoke` and `ExtractorConfig.prepare`; no residual `both` tallies an unnamed set (`configs/helpers.ts:444`, `:606-607` each name their members in the same sentence). The true-branch case sits beside the false cases at `tests/config.test.ts:1823-1828`.

**7. The skip control asserts the resolved path — PASS.**
`tests/config.test.ts:1833-1835` asserts `existsSync(extractorPath)` against the value `require.resolve` returned at `:58`, so a hoisted layout passes. See finding C on how that path is held.

**8. Real `build()` with the rewrite and a control, every assertion kept, `serve` control intact — PASS.**
`tests/config.test.ts:1897-1921` drives both faces through Vite's `build()` with `declarationRollup` in `plugins`, with the rewrite and without it; `:1939-1943` keep the single-declaration and no-scratch assertions for each face; `:1945-1953` keep the rewritten-specifier and `@src/core` assertions in both directions; `:1923-1943` keep the `serve` control and its `existsSync(idle)` assertion. See finding B.

**9. The workspace rule's waiver — FAIL.**
`.claude/rules/workspace.md:74-76` reads: "Because it may import nothing, keep its own types, data, and functions in that one file, and extend that waiver to `configs/helpers.ts` as well: the centralized-kind placement in `.claude/rules/architecture.md` does not reach either vendored leaf."

What is wrong: the sentence names `configs/helpers.ts` and wraps inside 100 columns, but it states no reason for that file. The reason it does state, "Because it may import nothing", is false of `configs/helpers.ts`, which imports `vite`, `node:url`, `node:child_process`, `node:module`, `node:os`, `node:fs`, and `node:path` at `configs/helpers.ts:1-20`. The reason claim 9 requires — that no `configs/types.ts` may exist — appears nowhere. The waiver also lands in the bullet whose first clause is "Keep `configs/policy.ts` free of imports entirely" (`:71`), so a reader whose subject is `configs/helpers.ts` stops at that clause and reads the `configs/helpers.ts` bullet at `:67-70`, which is silent about it. Secondary: "either vendored leaf" tallies a pair while `:63` names three permitted leaves, so a workspace carrying `configs/browsers.ts` reads that file as excluded.

Why it matters: the rule is the waiver's only home, and an agent applying it to `configs/helpers.ts` gets a rationale that inspection of the file contradicts, which reads as drift rather than as a grant.

What right looks like: put the grant in the `configs/helpers.ts` bullet at `.claude/rules/workspace.md:67-70` with its own reason and name both files rather than counting them, for example — "Keep `configs/helpers.ts`'s own types, data, and functions in that one file: a leaf imports nothing from the workspace, so no `configs/types.ts` can exist for it to import. The centralized-kind placement in `.claude/rules/architecture.md` reaches neither `configs/helpers.ts` nor `configs/policy.ts`." Then restore `:74-76` to the policy-only sentence it was.

**10. Round-1 carries and scope honesty — PASS on scope and vocabulary; CANNOT RULE on the rollup bytes.**
The changed set is the fix brief's owned files plus `configs/src/vite.{core,server}.config.ts` (U3's round-1 files), `host.json`, and the campaign folder (`u3-fix.status.txt:1-13`); no other file moved. Options stay single-word — `project`, `types`, `rewrite` at `configs/helpers.ts:598-602`; `compilerOptions` and `files` transliterate the extractor's `overrideTsconfig` and their TSDoc names that source at `:59-60`. No `any`, `as`, `!`, or suppression appears in the diff. The report's flags are honest, including the diff-stat caveat. The rollup byte clause: no verifier `diff` hunks are in my evidence, so per the brief, CANNOT RULE.

**11. The flagged deviations are right — PASS.**
Deleting `joins the declaration rewrite only while the line it prints fits the width` is correct: it asserted the emitted browser and server config text varying by workspace name, a variation only the `{{replacement}}` span produced, and `blueprintToConfigArtifacts` now emits a fixed seed (`src/core/compilers.ts:928-933`). Nothing else was covered only there — `matchesPrintWidth` keeps its own cases at `tests/src/core/helpers.test.ts:245-259` and independent callers at `src/core/compilers.ts:850`, `:1254`, `:1330`. The `MAX_NAME_LENGTH` and `isNumber` removals follow: `MAX_NAME_LENGTH` has no remaining reader in that file and stays exercised at `tests/src/core/templates.test.ts:730`, `:1117`, while `isRecord` and `readFileSync` were correctly kept for `tests/src/core/helpers.test.ts:265-266`. The split at `tests/config.test.ts:1833-1841` keeps both assertions' substance and complementary applicability (`!extractorResolved` and `extractorResolved`), so exactly one runs.

**12. Test names and project membership — PASS.**
`reaches core through the rewrite in every emitted published face`, `finds the resolved extractor on disk`, and `rejects resolving the unavailable extractor` each name the proved property, not the control that specified it. `tests/config.test.ts` is collected by `vite.config.ts:149` and `tests/src/core/**/*.test.ts` by `vite.config.ts:43`.

## Findings outside the claims

**A. Two vocabularies for one mechanism in the shipped seeds, and a proof shaped around the difference. Required change.**
`src/core/templates.ts:582-583` writes "through a **source path** the tarball does not carry … the package's **own root export**"; `src/core/templates.ts:599-600` and `configs/src/vite.server.config.ts:5-6` write "through a **specifier** the tarball does not carry … the package's **own published root export**". One mechanism, one `rewriteCoreSpecifier` function, two spellings, both shipped into every generated workspace. `AGENTS.md` § Design laws fixes one term per concept. The cost is visible in the proof: `tests/src/core/compilers.test.ts:1418-1421` splits what should be one `toContain` into two spans that straddle the divergence, so the assertion can no longer see a face whose comment is truncated or reordered between them. Right: make the browser comment read exactly as the server comment does apart from the word `browser`, and collapse `:1418-1421` back to one `toContain` over the whole sentence pair.

**B. The roll-up proof hand-rolls a scratch the file already imports a helper for, and puts it back inside the repository. Required change.**
`tests/config.test.ts:1848-1849` calls `mkdirSync(resolve(root, 'tmp'))` then `mkdtempSync` under it, writes fixtures with bare `writeFileSync` at `:1855-1887`, and removes the tree with an unconditional `rmSync(workspace, { recursive: true, force: true })` at `:1955`. The same file imports `createPolicyScratch` at `:44` and uses it at `:1352`; that helper allocates under `tmpdir()`, contains every write against escape, and destroys itself (`tests/setupPolicy.ts:42-69`). This duplicates shared infrastructure that `.claude/rules/tests.md` § Shared test infrastructure tells a test file to import, and it does so in the one test whose subject is edit 5's ruling that a scratch belongs outside the tree under `os.tmpdir()`. Right: build the fixture workspace with `createPolicyScratch({ prefix: 'orkestrel-config-rollup-' })`, write the project and sources through `scratch.write`, and close with `scratch.destroy()` in the `finally`.

**C. The fix introduced an empty-string sentinel beside a flag derived from it. Required change.**
`tests/config.test.ts:55-61` declares `let extractorResolved = true` and `let extractorPath = ''`, then sets both in a `try`/`catch`. `AGENTS.md` § Design laws bans an invented sentinel such as `''` for absence and bans storing a second flag that can drift from a fact already present. Right: `let extractorPath: string | undefined`, with the skips reading `it.skipIf(extractorPath === undefined)` and `it.skipIf(extractorPath !== undefined)` at `:1833` and `:1837`, and the existence assertion reading the narrowed value. (`configs/helpers.ts:636`'s `let source = ''` is the same shape but is round-1 code a passed claim already covers; I am not reopening it.)

**D. A generated workspace still installs the removed plugin. Needs a carrier, not a change here.**
`src/core/constants.ts:508-511` still pins `vite-plugin-dts` in `DECLARATION_DEV_DEPENDENCIES`, and `guides/scaffold.md:121` documents that constant, while no seed emitted by `src/core/templates.ts` uses the plugin any more. `src/core/constants.ts` is off-limits to this unit, so the builder was right to leave it; the round-1 verdict carried the remaining `vite-plugin-dts` sites to U6 without naming this one. Confirm U6's brief carries `src/core/constants.ts:510` and the fixture manifests derived from it (`tests/src/core/fixtures/source-manifest.txt:74`, `tests/src/core/fixtures/setup-false-manifest.txt:74`, `tests/src/core/compilers.test.ts:408`, `:417`, `:424`, `tests/src/bin/CLI.test.ts:1063`, `:1104`).

**E. The omnibus case absorbed another assertion. Observation.**
`tests/config.test.ts:1766-1829` — named `reads the compiler scope and fixed extractor override a declaration roll-up requires` — now also asserts `isStringList`, `rewriteCoreSpecifier`, resolution rejection, and the whole `isExtractorModule` truth table, including the case edit 10 added at `:1823-1828`. The name covers a fraction of what the case proves. The placement was prescribed by the fix brief, so this is not the builder's deviation; a successor unit splitting that case by subject would restore names that state what each proves.

## Referrals to the objective lane

- Whether `tests/config.test.ts:1933-1936` type-checks and behaves as a `serve` control under Vite's `ObjectHook` typing, given `Reflect.apply` with a partial config literal.
- Whether the round-2 gate chain is green, in particular the byte-identity parity case and `test:config`, and whether the core rollup differs from U1's copy only inside the `CONFIG_TEMPLATES.vites.src.*` literal types.

VERDICT: FAIL 9
