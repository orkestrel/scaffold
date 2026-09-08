# Unit d7n-scaffold-path-fix

## Assignment

Act as the native implementer on the objective writing route. Perform this bounded unit
directly; delegate nothing. You are the sole writer in the isolated checkout
C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path, at
c87021bdc6367d27463139b293287a586de18240. The primary scaffold checkout has owner manifest
and lockfile edits. You are not alone in the workspace: preserve other work and never
write in the primary checkout except your report under tmp/units.

## Authority

Read this checkout's AGENTS.md and .agents/orchestration.md; read the rules for names,
TypeScript, architecture, tests, workspace, portability, documentation, writing, and
quality. Use orkestrel-harden-package and its centralization.md and contract.md
references. Read guides/README.md, guides/scaffold.md sections Vendored data root and
Limits, and ROADMAP.md. The existing policy-sweep cleanup is outside this unit.

No any, assertions, suppression, mocks, new dependency, nested function declaration,
default export, skipped proof, or public API expansion. Reusable types belong in their
designated types file; this unit needs no new reusable type. Preserve readonly contracts.
Use native Node path and URL APIs, and preserve real binary integration. Write no prose
counts or fixed model identifiers. Use forward-slash host paths in commands and reports.
Keep each shell invocation a plain command; save any multistep program as a script.

## Reconciled design

Add exported normalizePolicyFilename(root: string, filename: string): string beside
normalizePolicyPath in tests/setupPolicy.ts. Resolve root with node:path.resolve.
Reserve the file: prefix for file URLs at this diagnostic boundary; convert those with
node:url.fileURLToPath. Treat other inputs as native paths, resolve them against the
resolved root, relativize from that root, then call normalizePolicyPath on the result.
Do not broadly URL.parse native filenames: a colon can belong to a native filename.
Leave normalizePolicyPath and every unrelated caller unchanged. Do not catch malformed
file URLs, case-fold, remove directory context, decode native percent text, or add a
containment guard. The helper is comparison-only; outside-root paths stay distinguishable.
Give the helper complete TSDoc for its boundary, parameters, return, and malformed-URL
failure. No new host-specific branch is needed.

In the real configured-policy test in tests/config.test.ts, derive the comparison base
from realpathSync(scratch.path). Pass every diagnostic filename and every expected
filename through normalizePolicyFilename using that same base. Express existing code
and filename expectations as pairs if needed; preserve every rule code, path, positive
assertion, negative assertion, process cwd, shape guard, status assertion, and clean
fixture assertion. Do not weaken comparison to a basename, suffix, or inclusion check.

Add direct regression coverage in tests/setupPolicy.test.ts, which the existing setup
project collects. Put reusable filename case data in tests/setup.ts as a readonly
declaration; do not add host imports to that host-independent register. Build native
paths with node:path and URLs with pathToFileURL in the proof. Cover native relative
and absolute paths, generated file URLs, spaces, percent signs, hash characters,
Unicode, literal %20 preservation in native input, different files and roots remaining
distinct, malformed file URLs throwing, and the old logical normalizer remaining
separator-only. Keep data declarations out of the proof file. Use the minimal existing
test infrastructure; no fixtures pretending to be Oxlint.

In .claude/rules/portability.md, directly after the pathToFileURL directive, add exactly:

- Convert a `file:` URI to a host path with `fileURLToPath`. Never read `URL.pathname` as
  a host path or strip the scheme, decode escapes, or rewrite a drive prefix by hand.

Do not edit CLAUDE.md or AGENTS.md. They already route to that rule.

## Ownership

Own tests/setupPolicy.ts, tests/config.test.ts, tests/setupPolicy.test.ts,
tests/setup.ts, and .claude/rules/portability.md in the isolated checkout only.
Do not edit host.json, src, configs, package.json, package-lock.json, other tests, any
target repository, or any existing campaign report. Do not install, build, pack,
regenerate inventory, commit, push, or publish. Root regenerates inventory and host
staging before the full chain. Stop on any plan deviation and report exact evidence.

## Proof and acceptance

Root already ran the existing real-binary case red on Windows in this clean checkout;
its log is C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path-log.UOq5l7/test-config.log.
Repeat that command before edits and record its output:

    npm run test:config -- tests/config.test.ts -t "loads every configured policy rule through the real binary"

Root's direct Probe fragment receipt is
probe:fc059c1c8bc72a11ccb0c80ed4f98edf:runtime:typescript@6.0.3:oxlint@1.80.0:vitest@4.1.11:configs/src/tsconfig.server.json@8a558fae42253d61062900b227379899
Its URL.pathname control failed at runtime. This is not a registered MCP receipt and
does not replace permanent tests or prove Linux. The registered transport failed on an
older installed dependency closure; do not block this implementation on that tool.

After implementation run the named config case, the setup project, scoped format and
lint checks, and the root TypeScript project. Run mutating scoped lint then format
only if needed to converge. Do not run an unfiltered config project against stale
host.json, or a full suite. Report exact commands, exit codes, and output paths.

Return the diff and git status by path with your report at
C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-scaffold-path-fix-report.md.
Root retains your report unchanged and independently reviews the actual diff.
