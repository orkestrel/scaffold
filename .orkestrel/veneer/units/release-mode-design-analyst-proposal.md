Carry Vitest’s invocation mode into the returned Vite project configuration. Keep `--mode release` and the distribution proofs’ `import.meta.env.MODE` checks.

Completion requires a retained regression that fails with the discarded mode, passes with the propagated mode, and proves that unavailable release evidence causes failure. Fleet adoption closes only after scaffold publishes, targets re-pin and repair, and their gates pass.

**Channel ruling.** Translate the invocation record’s `mode` into the project’s top-level Vite `mode`. Continue discarding `command`, `isPreview`, `isSsrBuild`, and unrelated invocation fields.

The installed Vitest calls project factories with the root Vite mode, then initializes each project using `options.test?.mode || options.mode || ctx.config.mode`. Scaffold discards `options.mode`, leaving the `"test"` fallback. See the [factory invocation](/home/user/veneer-read/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:11365) and [project initialization](/home/user/veneer-read/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:11115).

Change the invocation branch in `mergeOverride` to this shape:

```ts
if (override === undefined) return base
if ('command' in override && 'mode' in override) {
	if (typeof override.mode !== 'string') {
		throw new Error('The project invocation requires a string mode')
	}
	return { ...base, mode: override.mode }
}
```

Retain the existing ordinary-override merge after that branch. This projects an accepted configuration field instead of merging the invocation record wholesale. Vite documents `mode` as a configuration option. See [Vite’s mode contract](https://vite.dev/config/shared-options.html#mode).

Rule on the alternatives as follows:

- **`provide` and `inject`:** viable, but unnecessary here. An executed initialization probe preserved `release: true` through `provide`. Adopting it would also require typed context declarations and migration of existing, presence-owned distribution proofs. See [Vitest’s provided-context contract](https://vitest.dev/config/provide).
- **Dedicated release project:** reject. It duplicates project selection and configuration while the existing project can receive the invocation mode.
- **Root configuration callback:** reject as unnecessary. Vitest already delivers the root mode to registered factories.
- **Environment variable:** reject as unnecessary. It introduces another channel and launcher contract.
- **Explicit project mode:** adopt. It preserves existing proof readers and portable npm commands without another dependency.

I executed this comparison against the installed Vitest:

```sh
node --input-type=module <<'NODE'
import { createVitest } from '/home/user/veneer-read/node_modules/vitest/dist/node.js'
for (const carry of [false, true]) {
 const runner = await createVitest('test', { root: '/home/user/veneer-read', config: false, mode: 'release', watch: false, cache: false }, {
  server: { watch: null },
  test: { projects: [(invocation) => ({ ...(carry ? { mode: invocation.mode } : {}), test: { name: 'release-reading', include: [] }, server: { watch: null } })] }
 })
 try {
  for (const project of runner.projects) console.log(JSON.stringify({ carry, root: runner.vite.config.mode, project: project.vite.config.mode, environment: project.vite.config.env.MODE }))
 } finally { await runner.close() }
}
NODE
```

The output was:

```text
{"carry":false,"root":"release","project":"test","environment":"test"}
{"carry":true,"root":"release","project":"release","environment":"release"}
```

A separate in-memory module loaded through the real project runner evaluated `import.meta.env.MODE === "release"` as `false` without propagation and `true` with propagation. These readings establish project initialization and module evaluation on Linux; they do not replace worker, npm-lifecycle, or Windows acceptance.

**Vendored-contract ruling.** Replace the misleading factory-shape claim with behavioral assertions against the registered factories.

In [tests/config.test.ts](/home/user/scaffold/tests/config.test.ts:373):

- Rename the factory case to `forwards the invocation mode through registered project factories`. Keep callable registration as a prerequisite. Invoke the factories with release and ordinary invocation records, and assert that each returned project carries the supplied mode. Include an eagerly evaluated project and a mode-dropping factory as rejecting controls.
- Rename the invocation-filtering case to `projects the invocation mode without merging invocation fields`. Assert the returned `mode` separately. Continue rejecting leaked `command`, `isPreview`, `isSsrBuild`, and sentinel fields. Use a wholesale-record merge as its rejecting control.
- Preserve ordinary caller overrides, plugin selection, and input immutability in the existing merge proofs.

These assertions fail directly when `mergeOverride` returns the base unchanged. Retain an executed Vitest regression as well; factory-return assertions alone cannot detect a future runner change.

**Template and scaffold ruling.** Change the shared `mergeOverride` implementation in [src/core/templates.ts](/home/user/scaffold/src/core/templates.ts:115) and scaffold’s [vite.config.ts](/home/user/scaffold/vite.config.ts:54). Keep the root configuration object and factory registrations.

Keep these contracts unchanged:

- `RELEASE_PROOF_COMMAND` remains `npm run test:distribution -- --mode release`.
- `package.json` retains that command in `prepublishOnly`.
- Generated and scaffold-owned distribution proofs continue reading `import.meta.env.MODE`.
- Existing registry and browser failure branches retain their behavior.

Correct the explanations in `src/core/constants.ts`, `src/core/compilers.ts`, the affected compiler/template tests, and `guides/scaffold.md`: callable registration supplies the invocation record; explicitly returning its mode makes the project use it. Update exact emitted-text fixtures and guide parity where affected.

The existing testing rule remains valid under this design. The implementation must satisfy its release-mode contract.

Publish scaffold because the template surface and vendored config proof change. After publication, re-pin scaffold in each target, run `repair`, and verify the target. Development dependency adoption alone does not require publishing a target; compare its built artifact with its published artifact before deciding. See [Publishing the fleet](/home/user/scaffold/.agents/orchestration.md:891).

**Veneer ruling.** Prepare and exercise the exact template change ahead of scaffold publication, but do not accept a complete Veneer landing against the old vendored contract.

The old `tests/config.test.ts` forbids the returned `mode`, so the corrected configuration necessarily fails that assertion. Do not edit Veneer’s vendored test to bypass it. The fleet rule also requires consumers to build against published scaffold. The complete landing therefore depends on scaffold publication and `repair`.

The early Veneer work can still settle the release-host blocker: apply the exact emitted `mergeOverride` change in its isolated unit checkout, run the release-host proof with missing receipt evidence, and require its named failure instead of a skip. Record the old vendored assertion as an expected adoption blocker, not a green gate.

After publication, repair Veneer and compare its mode-handling implementation with the emitted template. Re-run the ordinary and release distribution commands, then the complete gates. E-RECEIPTS closes only with the required matching host receipt and a passing release run.

**Closing-proof ruling.** Retain distinct evidence for the configuration defect and the release failure behavior.

Before implementation, add the behavioral factory assertion and run:

```sh
npm run test:config -- -t 'forwards the invocation mode through registered project factories'
```

Require a collected assertion failure because the returned mode is absent. Run the same command after implementation and retain its passing output.

In scaffold’s isolated distribution project, add `enforces release mode in generated consumers`. Exercise a real generated configuration and its generated distribution proof through npm. Supply a local HTTP registry fixture that returns a failed ping response. Keep fixture serving asynchronous while the child runs.

The retained test must assert:

- Ordinary mode reaches the documented skip behavior.
- Release mode exits unsuccessfully with the registry diagnostic.
- The generated manifest retains the release invocation in `prepublishOnly`.
- Removing mode propagation makes this regression fail because the release child skips.
- A malformed configuration, collection failure, timeout, or unrelated assertion cannot satisfy the expected release failure.

Run the same retained case before and after implementation:

```sh
npm run test:distribution -- -t 'enforces release mode in generated consumers'
```

Exercise the actual npm lifecycle during host acceptance with `npm run prepublishOnly`. Use real registry access for the successful artifact-install proof. Keep the deliberate refusal fixture confined to the regression.

For Veneer, retain the missing-receipt release failure and the subsequent passing release-host run with matching evidence. The retained ER-MECH log already demonstrates why a nonzero suite exit is insufficient: its CSS assertion failed while the release-host case skipped.

The implementation unit must use the registered `prove` instrument where applicable and retain its receipt. The npm/process regression also requires the real host execution that instrument does not replace.

The units have these boundaries:

| Unit | Role and engine | Owned files | Dependencies and acceptance |
|---|---|---|---|
| `RM-SCAFFOLD` | `sol`, GPT-6 Astra | `src/core/templates.ts`, `src/core/constants.ts`, `src/core/compilers.ts`, `vite.config.ts`, `tests/config.test.ts`, affected compiler/template tests, `tests/distribution.test.ts`, `tests/setupServer.ts`, `guides/scaffold.md` | Depends on the reconciled design. Close with failing-first evidence, passing retained regressions, emitted-template parity, and unchanged ordinary override behavior. |
| `RM-VENEER` | `builder`, Terra | Veneer’s `vite.config.ts`; retained unit evidence | Depends on the accepted template patch and the ER-MECH checkout carrying the release-host case. Apply the exact patch and demonstrate the missing-receipt failure. Full acceptance waits for published scaffold and repair. |
| `RM-AUDIT` | `analyst`, GPT-6 Astra; `reviewer`, Opus 5.5 | Retained audit reports; source read-only | Depends on implementation. Attempt mode loss, invocation leakage, eager factory evaluation, and false-positive release diagnostics. The Orchestrator reconciles. |
| `RM-VERIFY` | `verifier`, Terra | Retained Linux and Windows gate logs; source read-only | Depends on accepted implementation. Run the required gate chain and npm lifecycle on each claimed host. Record unavailable host execution as unproved. |
| `RM-RELEASE` | Orchestrator, GPT-6 Astra in Codex | Scaffold release metadata, lockfile, and generated release inventory | Depends on accepted audits, gates, the user’s release decision, and npm approval code. Confirm the registry artifact. |
| `RM-ADOPT` | `builder`, Terra, for the adoption script; Orchestrator for mutation; `verifier`, Terra, for gates | Adoption script; target manifests, lockfiles, and files written by `repair` | Depends on scaffold publication. Re-pin, repair, verify template alignment, run target gates, and decide target publication from material artifact changes. |

**Risks.** Propagating Vite mode also selects mode-specific environment loading. Verify that behavior on the claimed hosts. Existing `test.mode` overrides take precedence in the installed runner; the executed regression must reject a distribution project that still resolves to ordinary mode. Old vendored tests block early acceptance until repair. Presence-owned custom proofs remain adopter-maintained, so fleet verification must exercise their release refusal behavior.

**Brief correction.** Absence from the vendored manifest does not make `vite.config.ts` adopter-owned. Scaffold explicitly plans it as template-origin, content-owned configuration. Distribution proofs are presence-owned. See the [configuration artifact declaration](/home/user/scaffold/src/core/compilers.ts:929), [distribution artifact declaration](/home/user/scaffold/src/core/compilers.ts:1332), and [ownership contract](/home/user/scaffold/src/core/types.ts:20).

This executed command checked the built compiler:

```sh
node --input-type=module <<'NODE'
import { createBlueprint, blueprintToConfigArtifacts, blueprintToTestArtifacts } from './dist/src/core/index.js'
const blueprint = createBlueprint('sample', { src: ['core'] })
for (const artifact of [...blueprintToConfigArtifacts(blueprint), ...blueprintToTestArtifacts(blueprint)]) {
 if (['vite.config.ts', 'tests/distribution.test.ts'].includes(artifact.path)) console.log(JSON.stringify({ path: artifact.path, ownership: artifact.ownership, origin: artifact.origin }))
}
NODE
```

It returned:

```text
{"path":"vite.config.ts","ownership":"content","origin":"template"}
{"path":"tests/distribution.test.ts","ownership":"presence","origin":"template"}
```

The brief’s measured mode-loss finding is supported. Its quoted claim that factory registration alone carries release mode is false; the missing operation is propagation into the returned project configuration.