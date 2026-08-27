# Release: @orkestrel/scaffold 0.0.57

Date: 2026-08-27. Operator: the Orchestrator, session `claude/scaffold-proposal-impl-nabmm9`.
Round: `@orkestrel/scaffold` alone, following 0.0.56 within the same session.

## Why this bump exists

The 0.0.56 release run falsified the approval mechanics in
`.agents/skills/orkestrel-publish/references/window.md`, and the correction landed in commit
`6ca4091`. That file and its skill ship inside `dist/host`, which a target reads in place through
its `AGENTS.md` pointer rather than receiving as a vendored copy. A target therefore reaches the
corrected canon only by re-pinning `@orkestrel/scaffold`, so the correction obliges a release.

## Registry evidence

`npm view @orkestrel/scaffold version` returned 0.0.56 immediately before the bump. Every
`@orkestrel` range in the manifest already names what the registry serves, unchanged from the
0.0.56 round, so the layer takes no re-pin.

## Self-pins swept

- `package.json` and the lockfile's version fields moved to 0.0.57. The lockfile keeps its
  committed bytes otherwise, because this container's npm 10.9.7 strips the `libc` metadata npm 12
  recorded on optional platform binaries.
- The generated-manifest fixtures `app-only-toolchain.txt`, `source-manifest.txt`, and
  `setup-false-manifest.txt` under `tests/src/core/fixtures/` moved to `^0.0.57`, because
  `BASE_DEV_DEPENDENCIES` derives that pin from the manifest version.
- `dist/` was rebuilt after the bump; the rebuilt core entry answers `^0.0.57`.
- `host.json` held at 116 entries. The version reaches no vendored file.

## Gate evidence

An independent `verifier` ran the `prepublishOnly` chain command by command over the bumped tree.
Every command exited 0: `format:check` 212 files, `lint:check` no diagnostics, `check` clean on the
root and the three isolation scopes, `build` staging 116 files into `dist/host` and 116 entries into
`host.json`, `npm test` across src:core 373, src:server 431, src:bin 209, policy 111, config 46,
guides 17, and `test:distribution -- --mode release` 5 tests in 53.15s.

The run named the expected stderr in `tests/src/core/templates.test.ts` as an anomaly rather than a
failure. It also reported `host.json` as untracked; the file is tracked and committed, and that
reading is wrong without affecting any gate result.

## The upload

Pending the user's one-time code. The command is
`npm publish --ignore-scripts --browser=false --otp=<code>`, run inside the code's own life, on the
terminal arming `.agents/skills/orkestrel-publish/references/window.md` § Arm the terminal
prescribes. The session credential from the 0.0.56 run still holds; re-probe `npm whoami` before
the upload.

## After the upload

The propagation wave follows: every target re-pins `@orkestrel/scaffold` to `^0.0.57`, takes the
migration visit in `.agents/skills/orkestrel-publish/references/wave.md`, and proves its own gates.
Cutting this release before that wave means each target pins one version rather than two.
