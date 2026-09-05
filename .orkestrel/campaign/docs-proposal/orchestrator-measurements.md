# Orchestrator measurements for the docs-proposal campaign

Taken by the Orchestrator on 2026-09-05 in `/home/user/scaffold`, each with the command that produced it.

## oxfmt already checks Markdown in this tree

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/scaffold.md README.md .claude/rules/writing.md
All matched files use the correct format.
Finished in 1384ms on 3 files using 4 threads.

$ npx oxfmt --config .oxfmtrc.json --check .        (at 792a9739)
ROADMAP.md (167ms)
Format issues found in above 1 files. Run without `--check` to fix.
Finished in 8083ms on 221 files using 4 threads.
```

Reading: oxfmt 0.65.0 formats Markdown by default under the repository's `.oxfmtrc.json`, and `npm run format:check` covers every `guides/*.md` mirror, `README.md`, and the rule files today. The one red file was `ROADMAP.md`, whose line 332 carried a trailing space; `oxfmt --write ROADMAP.md` changed that line only, committed as `a74686b8`. A mirror fetched from upstream therefore already passes the same formatter the upstream runs, which is the reason the fetched bytes and the formatted bytes agree.

## TSDoc survives the declaration rollup

```text
$ npm run build:src:core          (vite build + vite-plugin-dts with api-extractor rollup)
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
exit=0
$ ls -l dist/src/core/index.d.ts  → 229169 bytes
$ grep -c '^\s*/\*\*' dist/src/core/index.d.ts → 202 ; '@remarks' → 129 ; '@example' → 87 ; '{@link' → 77
$ grep -n -m1 -A8 'Names how an artifact' dist/src/core/index.d.ts
2686:        * Names how an artifact's content is produced.
2688-        * @remarks
2689-        * `host` is byte-copied from this package's vendored data root. `template` is
2694-       export declare type Origin = 'host' | 'template' | 'computed';
```

Reading: every tag class in the source reaches the published `.d.ts`, so an IDE hover, a consumer's type-check, and a documentation generator reading the rollup all see the same TSDoc the source carries. The source counted 215 doc blocks over 212 exports in `src/core` (`grep -c '^\s*/\*\*' src/core/*.ts`, summed); the rollup's 202 blocks cover the exported declarations after re-exports are folded.

## Baseline gates

`npm run format:check` and `npm run lint:check` were green at `792a9739` except for the `ROADMAP.md` line above; `git diff --check` is clean at `a74686b8`.

## tsc declaration emit keeps TSDoc

```text
$ cat sample.ts   (scratchpad probe, a type with a summary, @remarks, and @example)
$ npx tsc --declaration --emitDeclarationOnly --outDir out sample.ts && cat out/sample.d.ts
/**
 * Names one environment a probe selects.
 *
 * @remarks
 * A remark that must survive declaration emit.
 * @example
 * const env: Sample = 'core'
 */
export type Sample = 'core' | 'server';
```

Reading: TypeScript 6.0.3 copies the whole doc block into the emitted declaration without any flag, so the rollup reading earlier holds for plain `tsc` too.

## Bench and ladder record for the research rows

The Grok research lane (session `43b1dc08-413c-41f2-ab96-6a65e288c597`, 04:37:30 to 04:42:26, containment clean) answered every installed-package row from `node_modules/` and reported `User Rejected` for every WebFetch and WebSearch call in the Cursor CLI. The web rows stepped to `researcher` on Sonnet (the Luna step is unavailable while the Codex bench is dark), brief `tmp/units/docs-research-web-brief.md`, report `tmp/units/docs-research-web-report.md`.
