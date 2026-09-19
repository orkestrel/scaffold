# Preserve generated browser discovery evidence

The child Vitest runner uses `--reporter=verbose`. The assertions that require the `setup:browser` project label and `tests/setupBrowser.test.ts` path remain intact. The compiler/template source repair remains frozen.

The effective successor brief is `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/setup-vue-fix-brief-2.md`. This report supersedes the original unit report only for the child reporter and post-rebuild consumer observation; the original report remains the source repair, regression, and scoped-suite evidence.

## Parent reproduction

The Orchestrator rebuilt the artifact and ran the same command:

```text
npm.cmd run test:distribution -- --mode release tests/distribution.test.ts -t "renders a Vue SFC through the generated browser setup project"
```

The retained log is `tmp/setup-vue-consumer-green.log.txt` in this checkout. Despite its filename, the log records an instrument failure rather than the final green. The inner generated Chromium consumer exited 0 and reported `Tests 1 passed (1)`, duration `1.42s`. The outer run exited 1 and reported `Tests 1 failed | 7 skipped (8)`, duration `29.78s`. The child dot reporter omitted the project label and proof path, so the preserved discovery assertion failed at `tests/distribution.test.ts:1034` after the child exit-code assertion passed.

## Correction and validation

The only tracked change in this successor is the reporter argument in `tests/distribution.test.ts`, replacing `--reporter=dot` with `--reporter=verbose`. The change preserves real Chromium rendering and the project/path assertions. No install or rebuild ran in this writer's turn. The existing `host.json` modification belongs to the parent build and was preserved.

The scoped checks ran on Windows, 2026-09-18:

```text
node node_modules/oxfmt/bin/oxfmt --config .oxfmtrc.json --check tests/distribution.test.ts
node node_modules/oxlint/bin/oxlint --config .oxlintrc.json --deny-warnings tests/distribution.test.ts
git diff --check -- tests/distribution.test.ts
```

Each command exited 0. Oxfmt reported correct formatting; Oxlint and the diff check printed no diagnostic. The successor patch changes the reporter argument only. No shared-file patch is requested.

The parent must replay the exact consumer command and record its passing result. The source artifact needs no rebuild because this correction changes the outer proof's child command only. This writer does not claim final consumer green or acceptance.
