# Unit: externalize declared peerDependencies in every published build face

## Role and engine

`implementer` on **GPT-5.6 Sol**. Compiler, template, and build-predicate work — objective and
constraint-heavy.

## Objective

A declared `peerDependency` is bundled into the published artifact instead of left external. Make the
generated build configuration externalize every specifier the workspace declares as a peer, in all
four published build faces, and prove it with the measured artifact.

The ruling is settled by a two-lane adversarial pass; `tmp/peer-external-reconciliation.md` carries
it in full. Do not reopen the fork.

## The defect, with its real cause

`@orkestrel/test` declares `"peerDependencies": { "vitest": "^4.1.10" }` and imports
`vitest/browser` from `src/browser/factories.ts:2` and `src/browser/helpers.ts:2`. The generated
browser predicate (`/workspace/test/vite.config.ts:61`) externalizes only `@src/core` and
`@orkestrel/*`, so the peer is bundled.

The cause is **not** a resolution failure. `vitest/browser` resolves to
`node_modules/vitest/browser/context.js`, a deliberate static-analysis stub whose exports are
literally `null` and which Vitest replaces with a virtual module at test time. Bundling inlined that
stub and tree-shook away its guard `throw`, so the published helper would call `null.getByRole(...)`
and fail silently. Published `0.0.6` is correct because it was built before this; the danger is the
next release.

## The design, fixed

1. **Read the peer list from the workspace's own manifest, not from a `Blueprint` fact.** The
   generated root `vite.config.ts` already reads `./tsconfig.json` through an import attribute
   (`src/core/templates.ts:61` region). Read `./package.json` the same way and derive the declared
   peer names at config load. A compiled copy of a manifest the workspace owns is a second writer of
   one fact and drifts the first time a peer is added by hand.
2. **Match a peer and its subpaths, nothing else:** `id === peer || id.startsWith(peer + '/')`.
   Never a bare `startsWith(peer)` — that would let a peer named `react` capture `react-dom`.
3. **Apply it to all four published faces.** Add the peer clause to each existing predicate without
   removing what it already externalizes:
   - core: `src/core/templates.ts:597` region
   - browser: `src/core/compilers.ts:633-635`
   - server: `src/core/compilers.ts:656-659`
   - bin: `src/core/templates.ts:195`

   Leave the two app faces (`src/core/templates.ts:277` region) alone. An app bundle is a deployment
   artifact and bundling is what it is for.
4. **Guard a malformed manifest.** A present non-object `peerDependencies` is a configuration error;
   fail loudly at config load rather than silently externalizing nothing.
5. **Do not** change what any predicate externalizes today, do not introduce a shared
   `isBareSpecifier` helper, and do not touch `configs/helpers.ts`. Fork B was considered and refused;
   the reconciliation records why.

## The headline acceptance criterion

After your change, rebuild `/workspace/test` and compare its packed `dist` against the published
`@orkestrel/test@0.0.6` tarball. **It must come back materially identical.** The Orchestrator's
comparator is at `tmp/publish-trigger1.sh` and its method is: `npm pack` both sides, compare every
non-`.map` file, normalize by stripping `//# sourceMappingURL=` and collapsing whitespace runs.

That criterion is the negative control on the entire ruling. If `test`'s dist does not come back
identical, the diagnosis was incomplete: **stop and report** rather than adjusting the criterion.

## Standing conditions — known, do not report as deviations

- The tree is clean at HEAD `61133b9` apart from ignored `tmp/`.
- Your sandbox denies loopback `listen`, `spawnSync git`, and `spawnSync oxlint`. Expect sandbox
  EPERM in `src:server`, `src:bin`, and `config` project runs; report those as sandbox-blocked, never
  as failures. The Orchestrator re-runs them unsandboxed.
- This repository formats with `oxfmt`. Check owned files with
  `npx oxfmt --config .oxfmtrc.json --check <files>`.
- `/workspace/test` is committed and clean; you may rebuild it and run `npm pack` there, but do not
  edit or commit anything in it.
- Do not run `npm run build` in `/home/user/scaffold`; the Orchestrator rebuilds and propagates.

## Pins that must not move — verify, and stop if one must

- `tests/src/core/compilers.test.ts` generated-manifest digest: this change emits no manifest
  difference, so the digest holds.
- `tests/src/core/compilers.test.ts:449` region, this repository's `vite.config.ts` byte-identity
  with its generated form. **This one WILL move**: scaffold has `src/core` and `src/bin`, so its own
  generated config gains the peer clause. Regenerate this repository's `vite.config.ts` to match and
  say so in your report — that is the sanctioned half of a template change, not a pin break.
- `tests/src/core/Compiler.test.ts` artifact counts (47 total, 32 host-origin): no `HOST_PATHS` row
  changes here.

## Scope

**Owned files:** `src/core/templates.ts`, `src/core/compilers.ts`, `vite.config.ts` (only to match
its regenerated form), and `tests/src/**` for proofs.

**Off-limits:** `configs/**` (including `configs/helpers.ts`), `package.json`, `tests/config.test.ts`,
`tests/policy.test.ts`, `tests/setupPolicy.ts`, `AGENTS.md`, `.claude/**`, `.agents/**`, `dist/**`,
and every file under `/workspace`.

**Permissions.** Do not commit, push, install, publish, or run `npm run build` in this repository.

## Execution

Perform this assignment directly. Spawn nothing.

## Governing law

`AGENTS.md` (TTTDD, minimal public API, no superfluous wrappers), `.claude/rules/workspace.md`
(build outputs, configuration authority), `.claude/rules/typescript.md`,
`.claude/rules/architecture.md`, `.claude/rules/tests.md`.

## Unknowns

- Whether the generated config can read `./package.json` through an import attribute under this
  project's TypeScript settings without a `resolveJsonModule` or `allowArbitraryExtensions` change.
  Probe it before committing to the mechanism; if it cannot, stop and report rather than falling back
  to a `Blueprint` fact.
- Whether any existing scaffold test asserts the exact generated predicate text and therefore needs
  updating. Find them by running `src:core`, not by grep alone.

## Acceptance criteria

1. `/workspace/test` rebuilt and packed is materially identical to published `@orkestrel/test@0.0.6`.
   Record the comparator's output.
2. A regression proof in `tests/src/**`: a generated config for a blueprint whose manifest declares a
   peer emits the peer clause in all four faces; one whose manifest declares none emits byte-identical
   output to today. Record it red before green — the red is the peer expectation failing before your
   change.
3. `npm run check` exits 0.
4. `npx vitest run --project src:core` passes; record counts before and after.
5. `npx vitest run --project policy` and `--project guides` pass.
6. `npx oxlint --config .oxlintrc.json --deny-warnings .` exits 0 (report sandbox EPERM separately).
7. `npx oxfmt --config .oxfmtrc.json --check <owned files>` exits 0.
8. The digest and artifact-count pins did not move; the `vite.config.ts` byte-identity proof passes
   against its regenerated form.

## Output

The import-attribute probe result; the final predicate text for each of the four faces; the
red/green record for criterion 2; the comparator output for criterion 1; test counts before and
after; each acceptance command's exit status with sandbox-blocked results labelled. No process diary.

## Deviation contract

Stop and report if `test`'s dist does not come back materially identical, if the import attribute
cannot be used, if a pin other than the `vite.config.ts` byte-identity moves, or if applying the
clause to a face changes another package's emitted bytes. Report expected, found, exact evidence,
done or not done, at most one hypothesis. Ancillary choices — where the derivation line sits, how the
guard message is worded, fixture naming — are yours.
