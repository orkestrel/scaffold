# Propagation evidence — the unpublished 0.0.50 driven against real packages

Run 2026-08-23 on Linux, Node v22.22.2, against checkouts of published `@orkestrel` packages at
`origin/main`. The instruments are committed beside this file under `propagation/`.

Nothing was published and nothing was pushed to any target. Every target write is a local commit in
a scratch clone.

## How the artifact under test was delivered

`npm pack --ignore-scripts` produced `orkestrel-scaffold-0.0.50.tgz`, and that tarball was
**installed** into a scratch runner rather than linked, so the pack, the `files` list, and the
exports map are all under test. The installed tree carries `dist/bin`, `dist/host`, and `dist/src`,
and `dist/host/tests` carries the vendored proofs. Every visit drives that installed CLI.

The replaced range: no target's `@orkestrel/scaffold` devDependency was re-pinned. Each stays at
`^0.0.49`, because the propagation is driven by the running binary rather than by what the target
installs, and a target's gates import nothing from scaffold.

## The targets, and why these

Every shape the fleet census names is represented. `abort` and `contract` are core-only. `indexeddb`
publishes its browser face at the **root** subpath. `console`, `mcp`, `router`, and `test` carry all
three faces. `ollama` is server-only. `process`, `terminal`, and `supervisor` are core and server.
`mcp` and `process` carry bespoke distribution proofs. `ollama`, `process`, and `supervisor` carry
setup proofs. `supervisor` carries an app browser face and publishes none.

## Baseline

Every target's own gates — `format:check`, `lint:check`, `check`, `build`, `test` — were run before
propagation and every one exited 0. A red after propagation is therefore the propagation's.

## What propagation did

Each visit installed dependencies, checked the pre-write state in so `overwrite` had a clean
baseline and a revert point, ran `overwrite`, reinstalled, converged with `format`, and ran the
target's own gates.

Every target that accepted the write took the same shape: the generated
`tests/distribution.test.ts`, a `vite.config.ts` registering the `distribution` project, and a
manifest gaining `test:distribution` and the `npm run test:distribution -- --mode release` row in
`prepublishOnly`. All five gates stayed green in every one.

## The generated proof under `--mode release`, which is how `prepublishOnly` runs it

| Target      | Result       | Tests                  |
| ----------- | ------------ | ---------------------- |
| `abort`     | PASS         | 6 passed               |
| `contract`  | PASS         | 6 passed               |
| `indexeddb` | PASS         | 5 passed, 2 skipped    |
| `router`    | PASS         | 9 passed, 4 skipped    |
| `console`   | PASS         | 9 passed, 4 skipped    |
| `test`      | PASS         | 9 passed, 4 skipped    |
| `ollama`    | PASS         | 6 passed               |
| `terminal`  | PASS         | 8 passed               |
| `mcp`       | PASS         | its own bespoke proof  |
| `process`   | PASS         | its own bespoke proof  |

The skips are branch selection, not missing evidence: a browser entry skips the Node import and
require cases, and a Node entry skips the browser case. Confirmed under a verbose reporter on
`indexeddb`, where the root subpath's browser case reads
`✓ installed entry . > publishes what it declares to a real browser, and no more [requires a browser]`
in 947ms while its two Node cases skip.

That is the outlier the design turned on. `indexeddb` publishes its browser face at `.`, so a rule
keyed on a subpath's name would have driven a browser bundle through Node and passed.

## The gate fires

On `indexeddb`, with `PLAYWRIGHT_EXECUTABLE_PATH` naming a path that does not exist:

- Under `--mode release` it **fails**, exit 1: "The release gate requires a browser, and the
  executable at /nonexistent/chrome was rejected: Error: browserType.launch: Failed to launch
  chromium because executable doesn't exist".
- Outside release mode it **skips**, exit 0.

So the publish gate cannot be satisfied by missing browser evidence, which is the requirement the
objective lane raised and the user ruled for.

## Presence ownership, on real packages

`mcp` and `process` carry hand-written distribution proofs. After propagation, `git diff --quiet`
reports both byte-untouched, and their manifests already carried the rows so nothing moved there
either. A content-owned design would have destroyed both.

## The two non-green stages, and their controls

Neither is a scaffold defect. Both were controlled rather than assumed.

**`process`'s bespoke proof failed** with `expected 'test' to be 'release'`. That proof asserts
release mode at its first line, and its own `prepublishOnly` invokes it with `--mode release`. The
visit ran it bare. Under the flag it passes in 10.41s. **The instrument was wrong, not the
subject.** It also names a real asymmetry: a bespoke proof may require release mode, while the
generated proof runs in both and changes only what missing evidence does.

**`supervisor`'s `overwrite` refused**, naming custom Vitest projects the planned configuration does
not register — an app browser integration project, a guides project, and its live-service projects.
The published **0.0.49** was installed into a second runner and run against the same tree: it
refuses identically. **Pre-existing, not a regression.** The refusal wrote zero paths and every gate
stayed green, which is the compare-and-swap behaving as designed. The 0.0.50 message is the more
actionable of the two, naming the group to exclude rather than telling the operator not to use
scaffold's writing verbs.

## Coverage

Ten of the fleet's packages, plus `supervisor`. This proves the propagation against every measured
*shape*, not against every package. A target outside this set carrying a customized
`prepublishOnly` meets the manifest writer's refusal path, which is designed behaviour and surfaces
as the advisory naming the exact line to paste.
