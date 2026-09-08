# Unit d7n-layer-inventory-instrument

## Route and task

Act as builder on the native Terra route. Author a fully specified read-only fleet
inventory instrument; do not execute it. Spawn nothing. You are not alone in this
workspace. Own only C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/layer-inventory.mjs
and your report at tmp/units/d7n-layer-inventory-instrument-report.md. Preserve all other
work, especially primary scaffold package.json and package-lock.json, the isolated
scaffold-path writer, and uncommitted guide and ollama candidates.

Read scaffold AGENTS.md, .agents/orchestration.md, the portability, writing, quality,
workspace, and TypeScript rules; orkestrel-align-packages/SKILL.md and references/fleet.md;
guides/README.md and guides/scaffold.md section Fleet catalog. This instrument collects
facts, not package policy or a version decision. Add no dependencies, assertions,
suppression, fake behavior, or source parser. Use native JSON, filesystem, path, process,
crypto, and fetch APIs. Export reusable module helpers. No credential reads or prints.

## Inputs and package population

The Node script takes fleet root, output directory, and npm CLI JavaScript path as
positional arguments. Validate each input and require an absent output directory before
creating it. Build filesystem paths with node:path and file URLs with node:url. No
manual drive or separator rewrites. The host run will supply
C:/Users/mikes/WebstormProjects, a fresh directory under scaffold/tmp/pass, and
C:/Users/mikes/scoop/apps/nodejs-lts/current/node_modules/npm/bin/npm-cli.js.

Use the exact pass population:
abort, agent, brief, browser, budget, codec, console, contract, csv, database, emitter,
form, guide, html, indexeddb, interpret, lsp, markdown, mcp, middleware, msg, ndjson,
ollama, pool, probe, process, program, qualifier, queue, rater, reason, relation, router,
scaffold, sea, server, sqlite, sse, table, template, terminal, test, timeout, tool,
toolbox, websocket, worker, workflow, workspace.
Supervisor remains excluded. Do not enumerate unrelated sibling repositories.

## Collection

For each package, capture its manifest name/version, engines, os/cpu constraints,
exports, dependencies, devDependencies, peerDependencies, peerDependenciesMeta,
optionalDependencies, bundledDependencies or bundleDependencies, overrides, and
packageManager when present. Keep foreign declarations too for compatibility evidence;
make no recommendation to upgrade them. Read the lockfile's root and every package
entry whose declared name or node_modules path identifies an @orkestrel package.
Keep version, resolved, integrity, link, peer, optional, dev, engines, dependency maps,
and peer metadata. Do not include user or environment credential data.

Capture SHA-256 of manifest and lockfile bytes and git -C <checkout> status --porcelain,
branch --show-current, rev-parse HEAD, rev-parse origin/main, and merge-base --is-ancestor
origin/main HEAD exit. Do not fetch, merge, stage, install, build, or mutate any checkout.
origin/main is a cached reading until root refreshes it; label that limit.

Run process.execPath with the supplied npm CLI path and arguments ls --all --json --long
in each checkout, with shell disabled. Capture stdout, stderr, exit, and signal with a
bounded timeout and buffer. A nonzero npm exit is evidence, not permission to fix it.
Keep the raw JSON and a compact recursive projection with name, version, path,
resolved, integrity, invalid, extraneous, missing, problems, and dependencies. Read each
resolved @orkestrel package's on-disk manifest from the npm-reported path to attest its
name/version and dependency maps; hash any dist/src/core/index.js and
dist/src/server/index.js present. Do not load source modules or mutate node_modules.
If the tree is incomplete or malformed, record the exact failure and mark it incomplete.
Never silently omit a failed package or unresolved node.

Fetch each named package's public abbreviated npm packument directly from
https://registry.npmjs.org/ using fetch, encoded package identifiers, an explicit Accept
header, and a bounded timeout. Send no authorization header, cookie, or local npm config.
Retain only name, dist-tags, available version identifiers, and the latest version's
manifest fields listed earlier plus dist.integrity and dist.shasum. Record timestamp,
HTTP status, and URL. A lookup failure is an explicit unknown, not an invented version.
Run sequentially; root will schedule later agent fan-outs separately.

Write JSON evidence beneath the fresh output directory and a summary.json linking the
per-package files. Capture checkout status and manifest/lockfile hashes again at the end;
report changes but never undo them. Print the summary path and overall completeness.
Exit nonzero for incomplete collection or changed package bytes/status, while retaining
every successful reading. Known owner changes that remain identical do not fail the run.

## Output and review

Do not execute any collection, install anything, or edit package sources. Return the
created-file diff and current root status as evidence beside your report. Use git -C
for every git command; a --no-index diff against /dev/null represents the created file.
Write with apply_patch and retain no bare .log output. Stop on a requirement you cannot
implement as specified. Root reviews, runs controls, and executes the instrument.
