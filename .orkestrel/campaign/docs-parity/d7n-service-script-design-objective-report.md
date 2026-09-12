Objective lane held.

## Decision

Add `readonly provisioned: boolean` to `Blueprint`.

`provisioned` means that the workspace already carries a physical, exact-case
`scripts/service.sh`. It does not name vendors and does not select the live-service test project.
The name is a past participle, is entity-scoped, and states the structural fact as a boolean.

This fact is necessary because the current contract cannot represent the failing state. An empty
`vendors` collection currently means that no vendor inventory was declared. It cannot also mean
that an existing provisioner with an intentionally unknown inventory must remain owned. `service`
already means that `tests/setupService.ts` selects the live-service project and must remain
independent (`src/core/types.ts:201`, `guides/scaffold.md:847`).

Default `provisioned` to `false` in `createBlueprint`. Target-reading CLI calls set it from:

```ts
const provisioner = resolveContainedPath(target, SERVICE_SCRIPT_PATH)

provisioned: provisioner !== undefined && isExactCaseFile(provisioner)
```

Use the existing `resolveContainedPath` and `isExactCaseFile` calls. The former preserves the
target containment boundary; the latter rejects absent paths, recased paths, directories, and
symbolic links (`src/server/helpers.ts:352`, `src/server/helpers.ts:558`). Do not read the script
text and do not derive vendor names.

Change `blueprintToOrchestrationArtifacts` to plan `scripts/service.sh` when
`blueprint.vendors.length > 0 || blueprint.provisioned`. Keep the artifact's existing
`ownership: 'birth'`, group, origin, path, and template mechanism. Birth ownership always compares
as aligned, including when bytes differ or the path becomes absent (`src/core/helpers.ts:555`). The
existing target therefore contributes only path ownership: audit stops calling it foreign, repair
does not replace it, and overwrite cannot select it for removal. Its edited bytes remain untouched.

Keep CLI `new` unchanged. It never derives `provisioned`; a newly requested workspace gets the
script only from a nonempty declared `vendors` collection. A target with neither declared vendors
nor an exact physical provisioner still compiles no service artifact. Reading verbs alone derive
the new fact from an existing target. The current template content is immaterial in that branch
because reading verbs see the birth-owned artifact as aligned and never schedule it for writing.

Keep `service` logic unchanged. `tests/setupService.ts` still selects the Vitest project and its
scripts. A provisioner without that setup file remains owned without registering service tests. A
setup file without a provisioner still registers service tests without producing a provisioner.

## Contract propagation

- `src/core/types.ts`: add and document the readonly `Blueprint.provisioned` structural fact beside
  `service` and `vendors`.
- `src/core/factories.ts`: default `provisioned` to `false` and preserve a supplied value.
- `src/core/validators.ts`: require `provisioned` through `isBoolean`. `parseBlueprint` in
  `src/core/parsers.ts` remains the thin parser over that guard; its accepted record changes with
  the guard and needs no new parsing logic.
- `src/core/compilers.ts`: include the birth-owned orchestration artifact for declared vendors or
  an observed provisioner. Keep vendor rendering based only on `vendors`.
- `src/bin/CLI.ts`: resolve `SERVICE_SCRIPT_PATH` through the same contained exact-file seam as the
  other structural facts and pass `provisioned` to `createBlueprint`.
- `tests/setup.ts`: add the false default to `buildBlueprint` so every direct test value remains a
  complete valid `Blueprint`.
- `tests/src/core/factories.test.ts`: bind the default and supplied boolean.
- `tests/src/core/parsers.test.ts` and the relevant validator shape checks: accept a complete record
  carrying the boolean and reject omission or a non-boolean value.
- `tests/src/core/compilers.test.ts`: retain the declared-vendor generation assertion; add the
  provisioned-without-vendors ownership assertion and the absent control.
- `tests/src/bin/CLI.test.ts`: own the real target-reading regression and the independence controls.
- `guides/scaffold.md`: add `provisioned` to the Blueprint structural-fact prose and target-reading
  mapping. State that `vendors` generates a new provisioner, while `provisioned` retains an existing
  exact-case physical script without reconstructing inventory. Keep the scripts-directory foreign
  ownership and overwrite rows unchanged.

The core barrel already exposes `Blueprint` through its types surface, so it needs no new export.
The installed Contract and Test declarations provide guards and temporary contained filesystem
fixtures, but no primitive represents this Scaffold-specific structural fact or augments a Scaffold
plan. Reuse the installed primitives already named above; add no dependency or wrapper.

The published `Blueprint` shape changes, so release preparation must update `package.json` and
`package-lock.json` together after source acceptance. Root owns release timing and downstream
tarball propagation.

## Red proof

Plant this case in `tests/src/bin/CLI.test.ts` beside the tracked unplanned-script overwrite case:

```ts
it('retains an exact tracked provisioner while removing a retired tracked script', async () => {
	const workspace = createScratch({ prefix: SCRATCH_PREFIX })
	const server = await createUpstreamServer({
		...FLEET_RELEASE_REPLIES,
		...FLEET_MIRROR_REPLIES,
		[FLEET_UPSTREAM_PATHS.organization]: {
			status: 200,
			body: buildOrganization(FLEET_NAMES),
		},
		[FLEET_UPSTREAM_PATHS.packages.guide]: { status: 200, body: buildPackument('0.1.0') },
		[FLEET_UPSTREAM_PATHS.mirrors.guide]: {
			status: 200,
			body: '# Guide\n',
			type: 'text/plain',
		},
	})
	try {
		const host = createStagedHost(workspace)
		const target = workspace.ensure('retained-service')
		await new CLI(buildCLIOptions(createSink(), server.base)).execute([
			'new',
			'widget',
			'--src',
			'core',
			'--from',
			host,
			'--target',
			target,
		])
		const service = '#!/usr/bin/env sh\nset -eu\n# consumer edit\n'
		workspace.write('retained-service/scripts/service.sh', service)
		workspace.write('retained-service/scripts/docs.ts', 'retired\n')
		createRepository(target)
		trackFiles(target)

		const inspected = createSink()
		await new CLI({ ...REGISTRY_OPTIONS, ...inspected.options }).execute([
			'audit',
			'--offline',
			'--groups',
			'orchestration',
			'--from',
			host,
			'--target',
			target,
			'--json',
		])
		const audit: Audit = JSON.parse(inspected.output[0] ?? '')
		const overwritten = createSink()
		expect(
			await new CLI(buildCLIOptions(overwritten, server.base)).execute([
				'overwrite',
				'--dirty',
				'--from',
				host,
				'--target',
				target,
				'--json',
			]),
		).toBe(EXIT_CLEAN)
		const result: OverwriteResult = JSON.parse(overwritten.output[0] ?? '')

		expect({
			foreign: audit.findings
				.filter(({ drift }) => drift === 'foreign')
				.map(({ path }) => path),
			removed: result.removed,
			docs: workspace.read('retained-service/scripts/docs.ts'),
			service: workspace.read('retained-service/scripts/service.sh'),
		}).toStrictEqual({
			foreign: ['scripts/docs.ts'],
			removed: ['scripts/docs.ts'],
			docs: undefined,
			service,
		})
	} finally {
		await server.destroy()
		workspace.destroy()
	}
})
```

Run the planted test before the fix:

```text
npm run test:src:bin -- tests/src/bin/CLI.test.ts -t "retains an exact tracked provisioner while removing a retired tracked script"
```

The current implementation must fail the composite expectation. Its audit population includes
`scripts/service.sh`, overwrite removes that tracked path, and the final service read is
`undefined`. Preserve that failing receipt, then run the same command after the correction. The
green result must show only `scripts/docs.ts` as foreign and removed, with exact `service` byte
equality. Root should also bind the TypeScript edit through the repository's `prove` instrument for
project `src:bin` and this named case before relying on the claim.

## Adjacent controls

- Start without vendors, `tests/setupService.ts`, or `scripts/service.sh`; audit and overwrite must
  leave the service path absent.
- Supply declared vendors to `new`; the existing generated script must still contain their names.
- Place `scripts/Service.sh`; target reading must leave `provisioned` false. The recased tracked path
  remains foreign under scripts-directory ownership and must not cause creation of the lowercase
  path.
- Place a symbolic link at `scripts/service.sh`; `isExactCaseFile` must reject it. An external link
  target must never become the observed provisioner or a read source.
- Place only `tests/setupService.ts`; service registration remains present and no service script is
  planned. Place only an exact physical `scripts/service.sh`; the path is retained while service
  registration remains absent.
- Keep `scripts/docs.ts` and another tracked unplanned script foreign and removable. Keep the
  existing untracked and dirty-worktree refusal controls unchanged.

## Rejected alternatives

- Do not exempt `scripts/service.sh` in removal. Audit would remain red, and the target would still
  contradict the plan.
- Do not infer vendor names from shell text, `tests/setupService.ts`, package identity, or service
  tests. None is the vendor declaration, and the guide forbids reconstruction.
- Do not protect the whole scripts directory. Scaffold owns that directory; tracked retired and
  custom members must remain deletion candidates.
- Do not encode the fact as a sentinel vendor name, an optional boolean literal, or a mode union.
  Those shapes conflate inventory with presence or violate the boolean and absence laws.
- Do not add raw target bytes to `Blueprint` or add a generic target-origin artifact variant. Birth
  ownership already supplies the needed byte-preservation rule; a new artifact platform would
  broaden the public API beyond this consumer.
- Do not post-process the plan in CLI. That would split artifact construction and plan hashing away
  from `Compiler`, duplicate the orchestration artifact shape, and hide the structural fact from the
  plan's blueprint.

## Acceptance boundary

Accept the source correction when the planted public CLI test has a retained red receipt and passes
unchanged after the fix; the absence, casing, symbolic-link, and service-independence controls pass;
the core factory, parser, validator, and compiler tests bind the new field; the guide states the
split between declared vendors and observed provisioner ownership; and the required ordered package
gates pass from the final source. Do not run overwrite against canonical Ollama until a packed fixed
Scaffold is installed and its read-only orchestration audit omits `scripts/service.sh` while still
reporting `scripts/docs.ts`.

No design question remains open.

DESIGN: READY
