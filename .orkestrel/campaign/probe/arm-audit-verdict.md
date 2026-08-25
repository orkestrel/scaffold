The `arm` event is not waiting for 150 seconds. Under the full project schedule, boot most likely exceeds the fixture’s 2-second stage deadline and rejects. The constructor observes that rejection without emitting an event, so the test waits forever for an event that cannot fire.

1. `Probe` boot work before `arm`

Construction resolves installed tool versions, creates the stages and local queues, and starts `#arm()` immediately ([Probe.ts:84](/home/user/orkestrel/probe/src/server/Probe.ts:84), [Probe.ts:96](/home/user/orkestrel/probe/src/server/Probe.ts:96), [Probe.ts:103](/home/user/orkestrel/probe/src/server/Probe.ts:103), [Probe.ts:118](/home/user/orkestrel/probe/src/server/Probe.ts:118)).

Boot then:

- Creates unique type and runtime dependency files under the scratch workspace ([Probe.ts:243](/home/user/orkestrel/probe/src/server/Probe.ts:243), [Probe.ts:248](/home/user/orkestrel/probe/src/server/Probe.ts:248), [Probe.ts:288](/home/user/orkestrel/probe/src/server/Probe.ts:288)).
- Awaits the clean type-control case ([Probe.ts:304](/home/user/orkestrel/probe/src/server/Probe.ts:304)).
- Awaits the clean runtime-control case ([Probe.ts:305](/home/user/orkestrel/probe/src/server/Probe.ts:305)).
- Mutates the type dependency and awaits the type control ([Probe.ts:313](/home/user/orkestrel/probe/src/server/Probe.ts:313), [Probe.ts:315](/home/user/orkestrel/probe/src/server/Probe.ts:315)).
- Mutates the runtime dependency and awaits the runtime control ([Probe.ts:338](/home/user/orkestrel/probe/src/server/Probe.ts:338), [Probe.ts:343](/home/user/orkestrel/probe/src/server/Probe.ts:343)).
- Deletes its files before emitting `arm` ([Probe.ts:355](/home/user/orkestrel/probe/src/server/Probe.ts:355), [Probe.ts:214](/home/user/orkestrel/probe/src/server/Probe.ts:214)).

Each inspection concurrently enqueues type, lint, and runtime work, then awaits all stage results ([Probe.ts:372](/home/user/orkestrel/probe/src/server/Probe.ts:372), [Probe.ts:382](/home/user/orkestrel/probe/src/server/Probe.ts:382)). Each operation races the fixture’s 2-second deadline; expiry also awaits stage recycling before rejecting ([Probe.ts:425](/home/user/orkestrel/probe/src/server/Probe.ts:425), [Probe.ts:443](/home/user/orkestrel/probe/src/server/Probe.ts:443), [Probe.ts:449](/home/user/orkestrel/probe/src/server/Probe.ts:449)).

The stages own these waits and resources:

- `TypeStage` holds in-process TypeScript language services. It awaits module warming and yields between diagnostic batches; it spawns no child ([TypeStage.ts:53](/home/user/orkestrel/probe/src/server/stages/TypeStage.ts:53), [TypeStage.ts:135](/home/user/orkestrel/probe/src/server/stages/TypeStage.ts:135), [TypeStage.ts:147](/home/user/orkestrel/probe/src/server/stages/TypeStage.ts:147)).
- `LintStage` spawns one Oxlint Language Server Protocol child and awaits its `initialize` response, then diagnostic publications for opened documents ([LintStage.ts:198](/home/user/orkestrel/probe/src/server/stages/LintStage.ts:198), [LintStage.ts:214](/home/user/orkestrel/probe/src/server/stages/LintStage.ts:214), [LintStage.ts:101](/home/user/orkestrel/probe/src/server/stages/LintStage.ts:101), [LintStage.ts:105](/home/user/orkestrel/probe/src/server/stages/LintStage.ts:105)).
- `RuntimeStage` creates a resident Vitest service configured with the threads pool ([RuntimeStage.ts:287](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:287), [RuntimeStage.ts:312](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:312), [RuntimeStage.ts:319](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:319)). Each boot inspection awaits that runner, runs a generated specification in a nested worker, and awaits result-cache eviction ([RuntimeStage.ts:154](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:154), [RuntimeStage.ts:196](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:196), [RuntimeStage.ts:200](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:200), [RuntimeStage.ts:221](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:221)).

The fixture creates the generated tree before construction ([Probe.test.ts:816](/home/user/orkestrel/probe/tests/src/server/Probe.test.ts:816), [Probe.test.ts:828](/home/user/orkestrel/probe/tests/src/server/Probe.test.ts:828)). Consequently, every runtime boot inspection walks the whole scratch workspace and hashes every matching module ([RuntimeStage.ts:172](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:172), [RuntimeStage.ts:705](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:705), [RuntimeStage.ts:777](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:777)). The caller-named generated project is not otherwise involved in boot: boot uses `tsconfig.json` ([Probe.ts:265](/home/user/orkestrel/probe/src/server/Probe.ts:265), [Probe.ts:275](/home/user/orkestrel/probe/src/server/Probe.ts:275)).

2. Shared resources

No traced boot resource provides a global logical lock or pool cap that can indefinitely block this probe.

- The Probe queues and stage caches are instance fields, so they are not shared across fixtures ([Probe.ts:67](/home/user/orkestrel/probe/src/server/Probe.ts:67), [TypeStage.ts:55](/home/user/orkestrel/probe/src/server/stages/TypeStage.ts:55)).
- The Oxlint child belongs to its `LintStage` instance and uses the scratch workspace as its working directory ([LintStage.ts:200](/home/user/orkestrel/probe/src/server/stages/LintStage.ts:200)).
- The nested Vitest service belongs to its `RuntimeStage`; it does not request a worker from the outer Vitest pool ([RuntimeStage.ts:106](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:106), [RuntimeStage.ts:312](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:312)).
- Boot opens no listening port.
- Generated specification and dependency names contain the process identity and a UUID ([Probe.ts:248](/home/user/orkestrel/probe/src/server/Probe.ts:248), [RuntimeStage.ts:439](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:439)).
- The fixture’s `node_modules` link does expose the nested Vitest cache outside the scratch allocation ([Probe.test.ts:805](/home/user/orkestrel/probe/tests/src/server/Probe.test.ts:805)). Vitest derives that cache below `node_modules/.vite` ([cli-api.CnMVyzaz.js:607](/home/user/orkestrel/probe/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:607)), and `RuntimeStage` writes its result cache during eviction ([RuntimeStage.ts:613](/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts:613)). The installed implementation uses an unlocked direct file write ([cli-api.CnMVyzaz.js:582](/home/user/orkestrel/probe/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:582)); cache-read failures are caught during warm ([cli-api.CnMVyzaz.js:13213](/home/user/orkestrel/probe/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:13213)). This cache can race or lose data, but it does not serialize or wait indefinitely.

The actual shared resources are host CPU, filesystem throughput, process descriptors, and scheduler time. The outer invocation leaves worker settings at Vitest defaults ([vite.config.ts:214](/home/user/orkestrel/probe/vite.config.ts:214)); on the measured host, Vitest derives three outer workers from four available processors ([cli-api.CnMVyzaz.js:3832](/home/user/orkestrel/probe/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:3832)). Adding `src:core` changes which files overlap in that pool. It does not create a new logical cap. Under that overlap, repeated tree scans and nested tool work can cross the fixture’s 2-second deadline.

The exact expired stage is not recorded in the supplied measurements. `RuntimeStage` is the source-supported attribution because its boot cost directly scales with every generated file. Type boot reads the small root project, while the expensive caller-named project has not been resolved yet.

3. Why `arm` never arrives

A recoverable boot error permanently ends this arming attempt.

`#arm()` wraps any boot rejection and exits before emitting `arm` ([Probe.ts:200](/home/user/orkestrel/probe/src/server/Probe.ts:200), [Probe.ts:204](/home/user/orkestrel/probe/src/server/Probe.ts:204), [Probe.ts:216](/home/user/orkestrel/probe/src/server/Probe.ts:216)). The constructor attaches an empty rejection observer, so no unhandled rejection exposes that failure and no emitter `error` event fires ([Probe.ts:118](/home/user/orkestrel/probe/src/server/Probe.ts:118), [Probe.ts:122](/home/user/orkestrel/probe/src/server/Probe.ts:122)).

Recovery occurs only when `prove()` calls `#ready()`. That method replaces a rejected arming attempt and retries it ([Probe.ts:133](/home/user/orkestrel/probe/src/server/Probe.ts:133), [Probe.ts:185](/home/user/orkestrel/probe/src/server/Probe.ts:185), [Probe.ts:193](/home/user/orkestrel/probe/src/server/Probe.ts:193)). The fixture does not call `prove()` until after `arm`; it only races an event listener against a timer ([Probe.test.ts:857](/home/user/orkestrel/probe/tests/src/server/Probe.test.ts:857)). Therefore, after a contended boot expiry, the listener can wait for any guard length and still receive nothing.

This also explains why raising the guard from 10 seconds to 150 seconds has no effect. The state is rejected, not pending.

4. Smallest correct fix

Move Probe construction and the `arm` wait before creating `generated/**` and the include-heavy caller project. After arming, create the heavy tree, run the project-resolution expiry assertion, and remove the generated tree before the recovery claim if that claim must prove only type-stage recycling.

Option costs:

- Moving the heavy setup after arming preserves the project-resolution stress while removing unrelated boot work. It changes only the fixture and is the smallest correct fix.
- Reducing the generated tree lowers suite cost, but it requires a measured replacement workload that still exceeds the 2-second project-resolution budget under the supported hosts.
- Serializing the case or project reduces contention but broadens configuration and suite time. It also leaves the fixture coupling boot to unrelated generated files.
- Changing server boot is not warranted by this evidence. Failed boot is deliberately retained for a retry by the next `prove()` call. Automatic retry would add background retry policy, while a separate boot deadline would expand the public contract.
- Increasing the arm guard cannot fix a rejected arming promise.

ROOT CAUSE: The full project schedule pushes the fixture’s generated-tree runtime boot work past its 2-second stage deadline, and the rejected initial arming promise emits neither `arm` nor `error`, so the event-only guard waits forever rather than observing a late arm.

FIX: Construct and await the Probe’s `arm` event before generating the deadline project’s large tree, then create that tree only for the project-resolution assertion.