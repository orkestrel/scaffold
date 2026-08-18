# Fix round: close the audit findings against commit a58e0ed

## Role and engine

`implementer` on **Opus 5**. These are the Opus auditor's own prescriptions, reproduced for verbatim
adoption, so this round closes on a mutation probe rather than a fresh cross-engine audit. Do not
redesign a prescription. If one is wrong, stop and report.

## Where these came from

An Opus 5 `reviewer` lane audited `a58e0ed` (externalize declared peer dependencies) against eight
claims and returned `VERDICT: FAIL` on C6, plus five findings outside the claims. The published
artifacts are correct and already released — `@orkestrel/scaffold@0.0.41` and
`@orkestrel/browser@0.0.11` are on the registry. Nothing here is a defect in shipped code; every item
is a gap in the proofs or the documentation around it.

The audit's one open referral is already settled by the Orchestrator and needs no work from you:
the array-to-function `external` form change is inert. Measured by building `d563c9d` in a worktree
and comparing emits — `dist/bin/main.js` externalizes an identical set of seven specifiers before and
after, and `dist/src/core/index.js` gains only template text.

## F-C6 — the browser-without-core predicate is asserted by nothing

`src/core/compilers.ts` emits six predicate sites. `tests/src/core/compilers.test.ts:515` counts four
of them through a blueprint that includes `core`, and the two exact-text pins at `:637` and `:640`
are server-only. **Delete the `peers.some(...)` clause from the browser-without-core branch
(`src/core/compilers.ts:638-640`) and the suite stays green** — while a browser-only package with a
declared peer ships the exact defect `a58e0ed` fixed.

Add both browser variants beside the existing server pair at `tests/src/core/compilers.test.ts:636-641`,
in the same exact-text form that pair already uses. Verify the exact emitted text and indentation
yourself rather than copying the auditor's transcription. Update the comment at `:634-635` to name
both faces.

## F1 — this repository's own core config is stale against its template

`configs/src/vite.core.config.ts:32` reads `rolldownOptions: { external: [/^node:/, /^@orkestrel\//] },`
— the pre-change array form. Its template (`src/core/templates.ts:585-624`) now emits the
`peers`-importing form. So scaffold's own core build face does not externalize declared peers, and
the package that generates every target's configuration ships a materialized copy of its own template
two revisions behind.

Regenerate it from `blueprintToConfigArtifacts` for this repository's blueprint. Scaffold declares no
peer today, so no published byte moves — but the next `scaffold overwrite` here rewrites the file and
produces an unexplained diff, and the moment scaffold declares a peer its own core artifact regresses.

`configs/**` was off-limits to the unit that landed `a58e0ed`, which is why this was left; it is
**granted to you** for this file alone.

## F2 — no gate can see F1

`tests/src/core/compilers.test.ts:475` pins `vite.config.ts` against its generated form and is the
only such pin. `tests/config.test.ts:263-270` checks the `configs/src/vite.*.config.ts` files exist,
never what they contain, and `stageRootConfig` (`tests/src/core/templates.test.ts:171-182`) stages
only `vite.config.ts`, `tsconfig.json`, and `configs/browsers.ts`, so no emitted-workspace gate ever
typechecks a `configs/src/*.config.ts` face.

Extend the byte-identity proof at `compilers.test.ts:475` to every non-host artifact this repository
materializes, rather than the root config alone. One assertion over the artifact list closes the
class, and it is what would have reddened on F1.

## F3 — the shipped proof measures text, not externalization

`compilers.test.ts:490` is named "externalizes each package peer through every published build face"
and its body compares emitted configuration strings. It proves the clause is present, not that any
build externalizes anything.

Rename it to what it measures — "emits the peer clause in every published build face" or your own
wording — **and** promote the real instrument into the `emitted workspaces under their own gates`
block, which already builds real scratch workspaces. The real instrument is: a scratch workspace whose
manifest declares a peer, built for real, whose emitted bundle retains the peer as an `import` rather
than inlining it. If that block cannot host a build without an unacceptable cost, rename only and say
so with the measured cost.

## F4 — record why the regression fixture is `@orkestrel/emitter`

`blueprintToQuestions` validates `blueprint.peers` against `DEPENDENCY_NAME_PATTERN`
(`src/core/constants.ts:266`, `/^@orkestrel\/[a-z][a-z0-9-]*$/`) and raises a blocking question
otherwise, so scaffold cannot generate a workspace declaring `vitest` as a peer. Every peer the
Blueprint vocabulary can express is already externalized by the pre-existing `@orkestrel/` clause,
which is why the fixture at `compilers.test.ts:491` had to be `@orkestrel/emitter`.

That fact is the reason the design reads the live manifest instead of compiling a `Blueprint` fact,
and it currently lives in no durable artifact. Put it in one comment beside that fixture. State also
that a hand-added peer survives `overwrite`, because the manifest artifact is `ownership: 'birth'`
(`src/core/Compiler.ts:287`) and `overwrite` rewrites only the `@orkestrel/*` range set.

## F5 — the guide does not describe what this ships

`guides/scaffold.md:588-591` owns the peer concept and says only that `dependencies` and `peers` are
runtime `@orkestrel/*` packages. Nothing states that a workspace's declared `peerDependencies` are
left external by every published build face, and nothing distinguishes the two peer sets: the
`Blueprint.peers` field (`@orkestrel/*` only, blocking otherwise) and the generated config's `peers`
binding (any name in the manifest). A developer reading it today concludes a `vitest` peer is outside
scaffold's peer concept — exactly the case the change was built for.

Add two sentences to that paragraph: the two peer sets and their different membership rules, and the
externalization guarantee. No parity test can see this gap, so it closes on review alone.

## F6 — say why the peers block is unconditional

`src/core/templates.ts:61,69-79` emits the manifest import and `peers` derivation into every generated
root config, including an app-only workspace where nothing reads it. The template carries conditional
spans elsewhere (`{{imports}}`, `{{helpers}}`, `{{browsers}}`), so the fixed block departs from its
own rule. **Keep it unconditional** — one fixed block beats a fifth conditional branch, and an unread
export is harmless. Add one comment line at `templates.ts:69` saying so, so the next reader does not
re-litigate it.

## The mutation probe — this round's proof

This round closes on a probe instead of a second audit, so it is load-bearing. Run and record:

Delete the `peers.some(...)` clause from the **browser-without-core** branch
(`src/core/compilers.ts:638-640`), run `npx vitest run --project src:core`, and record it **red**
naming your new assertion. Restore it and record **green**. Before your change that same mutation
leaves the suite green — state that you confirmed it, because it is the whole point of C6.

Then do the same for F2: revert `configs/src/vite.core.config.ts` to its stale array form, run the
extended byte-identity proof, record it red, restore, record green.

## Standing conditions

- The tree is clean at `7d7fc57` apart from ignored `tmp/`.
- `@orkestrel/scaffold@0.0.41` and `@orkestrel/browser@0.0.11` are already published. Do not bump a
  version, do not publish, do not edit `package.json`.
- This repository formats with `oxfmt`, not prettier:
  `npx oxfmt --config .oxfmtrc.json --check <files>`.
- Do not run `npm run build`; the Orchestrator rebuilds and propagates.

## Pins that must not move

- The generated-manifest digest `c9e509be…` at `tests/src/core/compilers.test.ts:98`.
- `tests/src/core/fixtures/setup-false-manifest.txt`, which carries the `^0.0.41` self-pin.
- Artifact counts 47 total / 32 host-origin in `tests/src/core/Compiler.test.ts`.

If regenerating `configs/src/vite.core.config.ts` moves any of these, stop and report.

## Scope

**Owned:** `src/core/compilers.ts`, `src/core/templates.ts`, `configs/src/vite.core.config.ts`,
`guides/scaffold.md`, `tests/src/core/compilers.test.ts`, `tests/src/core/templates.test.ts`,
`tests/config.test.ts` **only if** F2 genuinely belongs there rather than in `compilers.test.ts` —
say which you chose and why.

**Off-limits:** `package.json`, `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, `src/core/constants.ts`, `AGENTS.md`, `.claude/**`,
`.agents/**`, `dist/**`, everything under `/workspace`.

**Permissions.** No commit, push, install, publish, or build.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

1. Both mutation probes recorded red-then-green, with the pre-change green confirmation for C6.
2. `npm run check` exits 0.
3. `npx vitest run --project src:core` passes; record counts before and after.
4. `npx vitest run --project config`, `--project policy`, `--project guides` pass.
5. `npx oxlint --config .oxlintrc.json --deny-warnings .` exits 0.
6. `npx oxfmt --config .oxfmtrc.json --check <owned files>` exits 0.
7. The three pins did not move.

## Output

Per finding C6, F1-F6: what you changed and the evidence it closed. The two mutation probes with
counts and commands. Each acceptance command's exit status. For F3, whether you promoted the real
instrument or renamed only, with the measured cost. No process diary.

## Deviation contract

Stop and report if a prescription is wrong, a line number does not match, a pin must move, or closing
one finding reopens another. Report expected, found, exact evidence, done or not done, at most one
hypothesis. Wording, comment placement, and fixture naming are yours.
