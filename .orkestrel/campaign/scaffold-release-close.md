# Release close — scaffold

Package `@orkestrel/scaffold`, tooling layer, publishes alone and propagates as vendored files.

| prior registry | published | tip | journal line |
| --- | --- | --- | --- |
| `0.0.64` | `0.0.65` | `72ba0dd` | `+ @orkestrel/scaffold@0.0.65` |

Uploaded on 2026-09-13 from the pre-packed tarball `orkestrel-scaffold-0.0.65.tgz` (141 files, shasum `6b9c22c13c88d7a4e31a27f61b502b3a3f8cc143`) with the account's one-time code, under `evidence/linux-gate/publish-tarball.sh`; journal `publish-scaffold.log.txt`. A first attempt with an earlier code ran `npm publish` from the tree, packed inside the code's life, and was refused to npm's interactive one-time-password prompt (`publish-scaffold-refused.log.txt`); the second attempt published the pre-packed tarball within seconds of the fresh code and landed. Login: `npm whoami` read `mikesaintsg` immediately before each attempt.

Gates that proved the shipped artifact ran outside the window on this host, each project singly,
then the literal `prepublishOnly`: `evidence/linux-gate/final6.status.txt`, after the fifth fix round. The artifact's file list
at the tip: `evidence/linux-gate/pack-dry-run-5.md`.

Bump rulings: both triggers, confirmed against the registry's `0.0.64` tarball
(`linux-gate-npm-probe-report.md` § Bump confirmation).

Obligations this release places on its targets, per `.agents/orchestration.md` § What a bump
obliges: a development-only re-pin of `@orkestrel/scaffold` in toolbox and ollama, an online
`overwrite` (which refreshes the mirrored guide through `catalog`), an `audit`, and a green gate run.
No target bumps and no target republishes. Pre-flighted green against the staged tarball
(`linux-gate-target-preflight-report.md`, `evidence/linux-gate/preflight-*.status.txt`).

## Post-publish visits

Each target ran `evidence/linux-gate/postpublish-visit.sh` after the registry served `0.0.65`:
re-pin to `^0.0.65` and install (the preparation commit), then the online `overwrite`, an `audit`
at exit 0 with nothing drifted, the full install, the mutating `format`, and every gate singly
through the release-mode distribution proof. The range sweep (`range-sweep-<target>.log.txt`) read
every other `@orkestrel` range at the registry caret; the self-pin sweep found no prior scaffold
range literal in `tests/` or `src/`; the rebuilt `dist/` of each target matched its published
tarball in material content (`dist-compare-<target>.log.txt`, 0 differing entries), so no target
bumps and no target republishes.

| target | preparation commit | visit commit | published, unchanged |
| --- | --- | --- | --- |
| toolbox | `d92f805` | `714e25f` | `0.0.13` |
| ollama | `b495097` | `e4b3a7c` | `0.0.15` |

The ollama overwrite's declare step also raised the toolchain development ranges
(`@microsoft/api-extractor`, `@types/node`, `oxfmt`, `oxlint`, `vite`); toolbox's were current.
