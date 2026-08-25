# Unit F-ARM report — project-deadline fixture reordered so boot cannot inherit the heavy tree

## Outcome

The reorder landed in `tests/src/server/Probe.test.ts` exactly as the brief specifies. Every named
validation closed green. One evidence limitation qualifies the result and is stated in full under
"The reproducer did not reproduce".

## The reordered case's structure

The case `expires caller-named project resolution and serves through the recycled type stage` now
runs in this order, with the case timeout left at `240_000`:

1. Allocate the scratch directory and write only the small root files: `package.json`, the
   `node_modules` link, `tsconfig.json`, `src/core/index.ts`, `vite.config.ts`, `tmp/probe/.keep`.
2. Declare the generated project's path as a string (`projects/tsconfig.generated.json`). No file
   is written for it yet.
3. Construct the `Probe` with `deadline: 2_000` and the expiry recorder, and declare the claim.
4. Enter `try`. Race the `arm` event against a `60_000` guard, over that small tree.
5. Write `generated/**` (10,000 modules) and the include-heavy `projects/tsconfig.generated.json`,
   after the probe is armed.
6. Run the project-resolution expiry assertion and the `expirations.calls` assertion, both
   unchanged.
7. Remove the generated tree and the generated project file through the scratch helper's own
   `remove` method, which the installed `@orkestrel/test/server` exposes
   (`ScratchInterface.remove(target: string): void`, `node_modules/@orkestrel/test/dist/src/server/index.d.ts:347`).
8. Run the recovery `served` prove against `tsconfig.json` and assert its receipt.
9. `finally` teardown is unchanged: `scratch.destroy` then `probe.destroy` through `createTeardown`.

The comment above the arm race now states the constraint the audit established: boot's own control
inspections race the case's 2-second deadline, so the probe arms over the small tree; a boot that
expires rejects without emitting the `arm` event and only the next `prove` call retries the arming,
so a guard placed after the heavy tree waits for an event that can no longer fire.

The resolution-before-inspection ordering that keeps the expiry assertion deterministic is in the
source: `prove` awaits `#resolve(claim)` before either `#inspect` call
(`src/server/Probe.ts:143`), and `#resolve` is the only site that raises
`The type stage project resolution exceeded 2000 ms` (`src/server/Probe.ts:518`). No runtime
inspection ever runs for the expiring claim, so the heavy tree reaches only the project resolution
it is there to stress.

## The diff

```diff
diff --git a/tests/src/server/Probe.test.ts b/tests/src/server/Probe.test.ts
index 6e811cd..4029264 100644
--- a/tests/src/server/Probe.test.ts
+++ b/tests/src/server/Probe.test.ts
@@ -798,7 +798,7 @@ describe.sequential('probe', () => {

 	it(
 		'expires caller-named project resolution and serves through the recycled type stage',
-		{ timeout: 180_000 },
+		{ timeout: 240_000 },
 		async () => {
 			const scratch = createScratch({ prefix: 'probe-project-deadline-' })
 			scratch.write('package.json', '{"type":"module"}\n')
@@ -813,17 +813,7 @@ describe.sequential('probe', () => {
 				"import { defineConfig } from 'vitest/config'\nexport default defineConfig({ test: { projects: [{ test: { name: 'probe', include: ['tmp/probe/**/*.test.ts'], environment: 'node' } }] } })\n",
 			)
 			scratch.write('tmp/probe/.keep', '')
-			const include: string[] = []
-			for (let index = 0; index < 10_000; index += 1) {
-				const directory = `generated/d${index}`
-				scratch.write(`${directory}/index.ts`, 'export {}\n')
-				if (index < 1_200) include.push(`../${directory}/**/*.ts`)
-			}
 			const project = 'projects/tsconfig.generated.json'
-			scratch.write(
-				project,
-				`${JSON.stringify({ compilerOptions: { skipLibCheck: true, types: [] }, include })}\n`,
-			)
 			const expirations = createRecorder<[Claim]>()
 			const probe = new Probe({
 				workspace: scratch.path,
@@ -850,12 +840,29 @@ describe.sequential('probe', () => {
 				},
 			}
 			try {
+				// Boot runs its own control claims through the stages, and every one of those
+				// inspections races this case's 2-second deadline. The probe therefore arms over the
+				// small tree written so far, and the tree that outruns that deadline lands after it.
+				// A boot that expires rejects without emitting the `arm` event, and only the next
+				// `prove` call retries the arming, so a guard placed after that tree waits for an
+				// event that can no longer fire. The guard covers a spawn-and-initialize on a
+				// contended host, not an idle one.
 				await Promise.race([
 					new Promise<void>((armed) => probe.emitter.on('arm', () => armed())),
-					waitForDelay(10_000).then(() => {
+					waitForDelay(60_000).then(() => {
 						throw new Error('The project deadline fixture did not arm')
 					}),
 				])
+				const include: string[] = []
+				for (let index = 0; index < 10_000; index += 1) {
+					const directory = `generated/d${index}`
+					scratch.write(`${directory}/index.ts`, 'export {}\n')
+					if (index < 1_200) include.push(`../${directory}/**/*.ts`)
+				}
+				scratch.write(
+					project,
+					`${JSON.stringify({ compilerOptions: { skipLibCheck: true, types: [] }, include })}\n`,
+				)
 				await expect(probe.prove(claim)).rejects.toMatchObject({
 					name: 'ProbeError',
 					message: 'The type stage project resolution exceeded 2000 ms',
@@ -864,6 +871,11 @@ describe.sequential('probe', () => {
 					context: { stage: 'type', deadline: 2000 },
 				})
 				expect(expirations.calls).toStrictEqual([[claim]])
+				// The recovery claim runs every stage, and the runtime stage walks the whole
+				// workspace. Removing the generated tree first leaves that walk small, so the
+				// recovery clears the same 2-second deadline the project resolution just exceeded.
+				scratch.remove('generated')
+				scratch.remove(project)
 				const served = await probe.prove({
 					project: 'tsconfig.json',
 					case: {
```

Diffstat against `HEAD` (`7753727`), which includes the diagnosis-era guard and timeout values the
brief hands over as reshapeable:

```text
 tests/src/server/Probe.test.ts | 36 ++++++++++++++++++++++++------------
 1 file changed, 24 insertions(+), 12 deletions(-)
```

`package.json` and `package-lock.json` remain modified from the 0.0.5 release prep this unit did
not touch.

## Validation, closing lines

Format, `npx oxfmt --config .oxfmtrc.json --check tests/src/server/Probe.test.ts`:

```text
All matched files use the correct format.
Finished in 9ms on 1 files using 4 threads.
FMT_EXIT:0
```

Lint, `npx oxlint --config .oxlintrc.json --deny-warnings tests/src/server/Probe.test.ts`: no
output, `LINT_EXIT:0`.

Typecheck, `npx tsc --noEmit --project tsconfig.json`: no output, `TSC_EXIT:0`.

Scoped file run, `npx vitest run --config vite.config.ts --reporter=dot --project src:server tests/src/server/Probe.test.ts`
(`tmp/units/f-arm-postfix-validate.log`):

```text
 Test Files  1 passed (1)
      Tests  26 passed (26)
   Duration  158.28s (transform 841ms, setup 210ms, import 896ms, tests 156.93s, environment 0ms)
SCOPED_EXIT:0
```

Reproducer, `npm run test:src` (same log):

```text
 Test Files  11 passed (11)
      Tests  204 passed (204)
   Duration  170.89s (transform 2.02s, setup 1.10s, import 3.83s, tests 346.64s, environment 2ms)
TESTSRC_EXIT:0
```

## The reproducer did not reproduce

`npm run test:src` was run on this host against the untouched baseline before any edit, to record
the failing count the repair discipline requires. It closed green
(`tmp/units/f-arm-prefix-test-src.log`):

```text
 Test Files  11 passed (11)
      Tests  204 passed (204)
   Duration  169.43s (transform 3.12s, setup 1.21s, import 5.15s, tests 340.66s, environment 2ms)
EXIT:0
```

So the post-fix green above does not discriminate: this host, at this load, does not reproduce the
five failures the campaign recorded. The failure is contention-dependent, and the pre-fix guard in
the tree was already 150 seconds, which the audit shows cannot help a rejected arming promise
whatever its length. Treat the green `npm run test:src` as a no-regression result rather than as
proof the defect is closed.

The one directional measurement available on an idle host is the case's own duration, from
`--reporter=verbose` scoped runs of the file before and after the edit, both green:

| Run                                                | Case duration |
| -------------------------------------------------- | ------------- |
| Pre-fix (`tmp/units/f-arm-prefix-scoped.log:14`)   | 11751 ms      |
| Post-fix (`tmp/units/f-arm-postfix-scoped-verbose.log:14`) | 8677 ms |

The case sheds roughly 3.1 seconds of work, which is the boot inspections no longer walking and
hashing the 10,000-module tree. That is a single unreplicated pair on an idle host, so read it as
consistent with the mechanism the audit names, not as a measurement of the contended case.

## Deviation state

No deviation. None of the three stop conditions fired: the expiry assertion still rejects with
`The type stage project resolution exceeded 2000 ms` after arming first, the recovery claim serves
and mints its receipt after the tree removal, and `npm run test:src` is green. Nothing outside
`tests/src/server/Probe.test.ts` was edited, and nothing was committed.

Instruments and evidence retained under `tmp/units/`: `f-arm-validate.sh`,
`f-arm-prefix-test-src.log`, `f-arm-prefix-scoped.log`, `f-arm-postfix-scoped-verbose.log`,
`f-arm-postfix-validate.log`.
