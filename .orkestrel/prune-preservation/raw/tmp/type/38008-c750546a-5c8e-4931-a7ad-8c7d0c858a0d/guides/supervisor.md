# Supervisor

> A fenced record for external work launched by a workflow: one durable row per attempt, one
> renewable owner epoch, and one honest answer when a process disappears between launch and
> identity commit.

A workflow task launches provider work. Without a supervisor, five different views can all appear
to own what happened: the workflow snapshot, an MCP task projection, notifications, the provider's
native session, and the local process. That ambiguity produces four practical failures:

- **Authority fragments.** A reconnect trusts an event or process listing instead of reading one
  durable record, so two owners can publish different stories about the same attempt.
- **Cancellation becomes fiction.** A caller reports “terminated” when it has only requested a
  stop and the external process is still running.
- **Continuation uses the wrong verb.** Native provider reattachment is confused with workflow's
  `Task.resume()`, which only opens a live cooperative pause gate.
- **A crash erases the answer.** The provider may have accepted work before its native identity was
  persisted, leaving restoration unable to prove whether relaunch would duplicate an effect.

`@orkestrel/supervisor` closes those failures without becoming another workflow engine. Workflow
remains authoritative for logical execution and its snapshot. The supervisor owns the external
effect record, leases, executors, journals, and process trees it launched. MCP task state and
notifications are projections of those authorities, never new authorities. Application policy—
authorization, enabled executors, workspace choice, and retention choice—stays outside this
package.

Core is host-independent and published through `@orkestrel/supervisor`. Node provider-process
integration is published through `@orkestrel/supervisor/server`. The published package still has no
browser environment: the browser code documented here is `app/browser`, the private application's
own human interface, bundled with the reference composition and never published. Its showcase is a
separate private target outside the default build; the runnable examples below and the guide-parity
suite remain the executable public-API proof.

## Surface

The guide follows the same path as a real supervised run: establish the record, hold and drive a
run, adapt workflow, execute external work, recover, and verify real provider services.

### The fenced record closes competing authority

The record has two identities at different scopes. A `Lease` gives one supervisor owner tenure over
one workflow id. Its monotonic `epoch` is the fencing generation. A `UnitContext` addresses one
workflow attempt, and `deriveToken` encodes it exactly as
`JSON.stringify([workflow, phase, task, attempt])`. The phase is required because a workflow task id
is unique only inside its phase.

`RunSnapshot` joins that lease to the complete per-attempt unit history. Each authorized launch
inserts a new `UnitRecord`; the task never has one replaceable “current unit” slot. That distinction
keeps a timed-out attempt addressable even when a later attempt starts. An absent `identity` means
only that the provider identity did not become durable. The correlation token was already committed
and remains the address inside that interval.

| Name                                  | Kind      | Readonly data and role                                                                                   |
| ------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| `UnitContext`                         | interface | `workflow`, `phase`, `task`, and `attempt` form one durable launch key.                                  |
| `Lease`                               | interface | `run`, `owner`, `epoch`, and `expiry` form the workflow fence.                                           |
| `UnitRecord`                          | interface | Common unit identity, executor, fence generation, revision, payload, timestamps, and optional native id. |
| `RunningUnit`                         | interface | A unit row whose external terminal outcome is not durable.                                               |
| `SettledUnit`                         | interface | A unit row with a durable workflow-compatible `result`.                                                  |
| `QuarantinedUnit`                     | interface | A terminal unit row whose launch outcome is undeterminable, with a required `reason`.                    |
| `UnitSnapshot`                        | type      | Running, settled, or quarantined durable unit row, discriminated by `status`.                            |
| `UnitStatus`                          | type      | The status vocabulary derived from `UnitSnapshot`.                                                       |
| `RunSnapshot`                         | interface | One `lease` and its readonly, ordered `units` history.                                                   |
| `RunRecord`                           | interface | One catalog entry: the run id, its first acquisition, its ordering instant, and any release instant.     |
| `RunCursor`                           | interface | One traversal's fixed `until` watermark and its exclusive `(updated, id)` continuation boundary.         |
| `RunListOptions`                      | interface | Optional cursor, limit, id prefix, candidate ids, and held-or-released selection for one catalog page.   |
| `RunPage`                             | interface | One frozen catalog page, carrying a `cursor` only while another page exists.                             |
| `SupervisorStoreOptions`              | interface | Optional default `lease` settings for a store.                                                           |
| `LeaseOptions`                        | interface | Optional positive-integer lease `ttl`.                                                                   |
| `SupervisorStoreInterface`            | interface | The transactional lease and unit-row persistence boundary.                                               |
| `MemorySupervisorStore`               | class     | Process-local store with indivisible synchronous lease and row transitions.                              |
| `DatabaseSupervisorStore`             | class     | Durable store using one scoped native database transaction per operation.                                |
| `createDatabaseSupervisorStore`       | function  | Compose the durable store over a required transaction-capable borrowed driver.                           |
| `Brief`                               | type      | Immutable caller-minted agent instruction with authorship, lineage, and retirement.                      |
| `BriefStoreInterface`                 | interface | Standalone point access plus linear succession and withdrawal.                                           |
| `DatabaseSupervisorPersistence`       | type      | Named supervisor and brief stores composed over one five-table database.                                 |
| `MemoryBriefStore`                    | class     | Process-local write-once brief store with indivisible lineage transitions.                               |
| `DatabaseBriefStore`                  | class     | Durable brief store sharing the supervisor database and native transaction boundary.                     |
| `createDatabaseSupervisorPersistence` | function  | Compose both standalone stores over one transaction-capable borrowed driver.                             |
| `Lane`                                | class     | First-in, first-out admission over one exclusive resource; a rejection never poisons the queue.          |
| `SUPERVISOR_TABLES`                   | const     | The `leases`, `runs`, and `units` column shapes every durable route composes.                            |
| `SUPERVISOR_INDEXES`                  | const     | The catalog and unit indexes declared once beside those tables.                                          |
| `LEASE_TTL`                           | const     | Default lease validity: 30,000 milliseconds.                                                             |
| `RUN_LIMIT`                           | const     | Default run-catalog page size: 50 records.                                                               |

`SupervisorStoreInterface.set` is the fence. In one transaction it re-reads the lease, confirms
the caller's run, owner, epoch, and unexpired tenure, then inserts revision one or compare-and-sets
a later revision. A takeover owner may update a prior-epoch unit row: the stored lease is compared
with the caller's lease; the row's own epoch records where it was minted and does not veto recovery.
Reads return units in ascending phase, task, and numeric-attempt order.

`SupervisorStoreInterface.list` is the second read, and it answers about runs rather than about one
run. Every acquisition, release, and unit write stamps that run's `RunRecord`, so the catalog is a
by-product of the record rather than a second authority over it: `created` is preserved across every
takeover, `updated` carries the latest ordering instant, and `released` is present only while the
last tenure has expired in place. A page descends by `(updated, id)` and defaults to `RUN_LIMIT`
records. `prefix` matches a case-sensitive run-id prefix, `runs` narrows to caller-supplied candidate
ids without importing authorization policy, and `released` selects released records, held records, or
— when absent — both.

Paging is honest about what one instance can promise. The first page fixes an inclusive `until`
watermark; each continuation keeps that watermark and resumes strictly below the exclusive
`(updated, id)` boundary of the record it last returned. Across one store instance's serialized
reads an unchanged catalog therefore never duplicates or skips a record, and a record already
returned cannot come back, because its next ordering instant rises above the boundary that excluded
it. Two things fall outside that guarantee and are stated rather than papered over: mutating a record
lifts it out of the traversal and onto a later fresh first page, and a sibling store instance sharing
the same database can write a record within the watermark between two of your pages.

`MemorySupervisorStore` is the in-process reference. `createDatabaseSupervisorStore` requires a
driver with a real transaction capability and borrows that driver's lifetime. A transaction-less
driver is rejected with `UNSUPPORTED`: fallback transactions cannot provide a cross-process fence.
Such a host can observe and drive through another owner, but it cannot hold the durable lease
through this database store.

```ts
import { createSQLiteDriver } from '@orkestrel/database/server'
import { MemorySupervisorStore, createDatabaseSupervisorStore } from '@orkestrel/supervisor'

const memory = new MemorySupervisorStore({ lease: { ttl: 30_000 } })
const driver = createSQLiteDriver()
const durable = createDatabaseSupervisorStore(driver)

const inProcess = await memory.acquire('build', 'worker-1')
const persisted = await durable.acquire('deploy', 'worker-1')
if (!inProcess.success) throw inProcess.error
if (!persisted.success) throw persisted.error

await memory.release(inProcess.value)
await durable.release(persisted.value)
await driver.close()
```

### Briefs make agent instructions reusable without becoming another channel

A `Brief` is one exact agent payload: a caller-minted non-empty `id`, non-empty `instruction`,
non-empty `author`, optional `parent`, creation instant, and optional retirement instant. It is a
type alias, so it satisfies the existing `JSONRecord` payload contract directly. No unit, launch,
execution, run, or supervisor interface gains a parallel brief member. The unit row's immutable
`payload` already answers what that attempt ran under without another lookup.

`parent` means that this brief replaces exactly one earlier brief. `BriefStoreInterface.set` is
write-once, permits at most one child, and inserts the child, indexes it, and retires the parent in
one transition. `retire` withdraws a brief without a successor and preserves the first retirement
instant across repeated calls. Fix-round asks are independent briefs with no parent; findings stay
in the audited unit's settled result and are named in the next instruction rather than modelled as
a relation the package cannot query.

Brief writes are deliberately unfenced. They precede runs, may drive units in several runs, and
cannot overwrite content: the only mutations are a uniqueness-guarded insertion and idempotent
retirement. `MemoryBriefStore` performs those transitions synchronously in process.
`DatabaseBriefStore` performs read-then-write checks inside one native database transaction, with a
primary-keyed `children` table as defence in depth. `SUPERVISOR_TABLES` and `SUPERVISOR_INDEXES`
declare the `leases`, `runs`, and `units` schema once. `createDatabaseSupervisorStore` and
`createDatabaseSupervisorPersistence` are two supported routes over those constants; a
caller-declared database is the third, composing the same exported constants beside its own tables
and indexes. The combined factory adds `briefs` and `children` and returns named `supervisor` and
`brief` stores over that database.

Sharing one database also shares its single transaction slot, so the two stores share one `Lane`.
Store operations are linearized: overlapping calls execute serially in invocation order, and a
brief write overlapping a supervisor read queues behind it instead of being refused. Callers keep
issuing concurrent promises and do not arrange their own turn-taking — `Run` could not honour such
a request anyway, since its renewal timer overlaps tracked unit writes from inside the package. A
rejected operation is absorbed rather than propagated down the lane, so one corrupt row refuses
only its own read. Because contention is queued rather than refused, a store's `CONFLICT` always
names durable state: a live lease held by another owner, a duplicate unit revision, a taken brief
id, or a parent that already has its one successor. An infrastructure failure is `STORE`, carrying
the originating `DatabaseError` as its `cause`. The database backend proves that durable state
instead of reading it off a driver code: a driver reports every substrate constraint — primary key,
check, foreign key, trigger — as one `CONFLICT`, so a refused lineage insertion becomes a brief
conflict only when a row already occupies that parent's key, and every other refusal stays `STORE`. The memory stores already satisfy this — their
transitions complete without yielding — so linearization is a property of `SupervisorStoreInterface`
and `BriefStoreInterface`, not a detail of the database backend. `Unit` orders its own row's
revisions on a lane of its own: a revision waits for the one before it there, then waits for its
turn at the database here.

Two limits are exact. The lane is process-local: it orders the callers sharing one composed
instance and says nothing about a second process opening the same file, which is what the lease
`epoch` fence is for. And it orders one `Database`, not one driver — a second `Database` built
elsewhere over the same borrowed driver contends beneath the lane, where nothing composed here can
see it. The guarantee covers the stores these factories compose over one database, and nothing
below that.

The application closes the process-local limit by owning its workspace root outright.
`ApplicationRuntime` takes an `ApplicationLease` on the resolved `APP_WORKSPACE` before it opens any
store, driver, or ledger under it. `destroy()` attempts every teardown step regardless of an
earlier failure, attempts the lease release last, and propagates the first failure it caught.
While a live process holds a root, every other construction over the same root refuses at
once with `CONFLICT`, naming the root, the holder its `lease.json` sidecar reports, and the two ways
out — stop that holder, or point `APP_WORKSPACE` somewhere else. Exclusion is per acquisition rather
than per process, so a second runtime inside one process refuses exactly as a second process does,
and the refusal names the holder rather than a hosting process because the pid it prints can be the
reader's own. `runtime.lease` and `runtime.policy.lease` are two different things: the first is
kernel-held ownership of the root with no expiry, and the second is the workflow-lease tenure
`APP_LEASE` sets on each unit.

Ownership is one exclusive SQLite transaction held open on a dedicated `lease.db` inside the root,
and that lock is the whole authority. The operating system releases it when the holding process
exits, so a crashed holder leaves a root the next start reacquires with no cleanup step, and the
mechanism carries no process id, no expiry, and no renewal to go stale. The `lease.json` sidecar
beside it records `owner`, `pid`, and `started` for whoever reads the directory; nothing decides
anything from it, and an absent or unreadable sidecar costs only an unnamed holder in the refusal.
An acquisition that fails for any other reason — an unreadable path, a file where the lock belongs —
is reported as `STORE` with its cause, because that is infrastructure rather than contention.
`SQLITE_LOCKED` is one of those reasons rather than a refusal: it reports contention inside one
connection or across a shared cache, which two separate connections never produce.

Single ownership is also what makes `HumanLedgerInterface.wait` sound. A parked waiter is woken
through the ledger instance that holds it, so a second process answering the same durable ticket
would leave the first parked forever. Root ownership makes that case unreachable by construction
rather than documented as a limit: the second process never gets its root. Two supervisors over one
workspace therefore refuse at startup instead of interleaving, which also means launching the
application a second time in the same directory reports the conflict rather than handing off to the
running instance — the handoff still covers a second instance that binds the same port from its own
workspace.

Core does not refuse a retired brief at `RunInterface.launch`: doing so would make the universal
launch path interpret an agent-specific payload. The application `AgentExecutor` applies `isBrief`
at its own payload boundary, sends a live brief's `instruction` to the provider, and refuses a
retired one with a typed `CONFLICT` cause under the boundary's ordinary `LAUNCH` failure, so a
consumer can tell a withdrawn brief from an unreadable payload. Other executors remain unaware. The
payload copy in a unit row is not cross-checked against the store copy; immutability and write-once
identity preserve each record, but they do not make the copies self-verifying.

```ts
import type { Brief } from '@orkestrel/supervisor'
import { createDatabaseSupervisorPersistence } from '@orkestrel/supervisor'
import { createSQLiteDriver } from '@orkestrel/database/server'

const driver = createSQLiteDriver()
const persistence = createDatabaseSupervisorPersistence(driver)
const brief: Brief = {
	id: 'release-review',
	instruction: 'Review the release evidence.',
	author: 'orchestrator',
	created: Date.now(),
}
const written = await persistence.brief.set(brief)
if (!written.success) throw written.error
await persistence.brief.child(brief.id)
await persistence.brief.retire(brief.id)
await driver.close()
```

The guard earns its keep at an executor boundary, where the payload is still unknown — exactly the
read the application's agent executor performs before it composes a turn:

```ts
import { isBrief, type ExecutionInput } from '@orkestrel/supervisor'

declare const payload: ExecutionInput['payload']

const instruction =
	isBrief(payload) && payload.retired === undefined ? payload.instruction : undefined
```

### The journal records observations without becoming authority

Executors report immutable `Observation` values. Identity and settlement observations mark protocol
moments; activity and request observations can also project onto workflow activity; diagnostics stay
journal-only. The terminal outcome itself lives once, on the settled unit row. A
`SettlementObservation` says that the executor saw the outcome—it does not duplicate that outcome.
Each `RequestObservation` constraint is one addressable request: its `id` is the exact reply identity
accepted by `UnitInterface.reply`.

`MemoryJournal` owns, validates, redacts, and byte-bounds each observation before retention. Entry,
byte, age, and note limits apply independently per unit. A single entry larger than the byte cap is
accepted so its fence advances, but the entry is not retained and existing history remains intact.
Reads are intentionally unfenced and return the retained tail in ascending sequence order. Appends
reject expired leases, stale epoch/revision high-water marks, and repeated or regressing sequences.

| Name                    | Kind      | Readonly data or role                                                    |
| ----------------------- | --------- | ------------------------------------------------------------------------ |
| `ObservationRecord`     | interface | Immutable `sequence`, `timestamp`, and optional redacted `note`.         |
| `ActivityObservation`   | interface | Activity category with optional operations, constraints, and progress.   |
| `IdentityObservation`   | interface | Identity category with the required native `identity`.                   |
| `RequestObservation`    | interface | Request category whose constraint ids address the corresponding replies. |
| `SettlementObservation` | interface | Settlement category; the durable result stays on the unit row.           |
| `DiagnosticObservation` | interface | Diagnostic category with a required bounded redacted note.               |
| `Observation`           | type      | The five observation categories, discriminated on `category`.            |
| `ObservationCategory`   | type      | The category vocabulary derived from `Observation`.                      |
| `JournalInterface`      | interface | Fenced appends, unfenced bounded reads, and retention pruning.           |
| `JournalOptions`        | interface | Optional `entries`, `bytes`, `age`, and `note` caps.                     |
| `MemoryJournal`         | class     | Capped, redacting, revision-and-sequence-fenced in-process journal.      |
| `createMemoryJournal`   | function  | Create the default bounded in-process journal.                           |
| `JOURNAL_ENTRIES`       | const     | Default retained observations per unit: 1,000.                           |
| `JOURNAL_BYTES`         | const     | Default retained serialized bytes per unit: 65,536.                      |
| `JOURNAL_AGE`           | const     | Default maximum observation age: 86,400,000 milliseconds.                |
| `JOURNAL_NOTE`          | const     | Default retained note bytes per observation: 4,096.                      |
| `JOURNAL_MARKER`        | const     | Marker appended to text truncated within its UTF-8 byte budget.          |

### Record boundaries stay exact and inspectable

Wire guards are total over hostile input, identity-bearing strings are non-empty, and
`isUnitSnapshot` requires the row id to equal the token derived from its own context. JSON shape and
container depth are separate checks. Redaction covers conservative credential, bearer, and PEM
patterns; `truncateText` never splits a multi-byte character. Applications with broader redaction
policy can supply another `JournalInterface`.

| Name                       | Kind      | Summary                                                                                 |
| -------------------------- | --------- | --------------------------------------------------------------------------------------- |
| `SupervisorErrorOptions`   | interface | Required error `code`, optional structured `context`, and optional originating `cause`. |
| `SupervisorErrorCode`      | type      | Conflict, fence, launch, protocol, quarantine, store, and unsupported categories.       |
| `SupervisorError`          | class     | Typed supervised failure preserving code, context, and cause.                           |
| `isSupervisorError`        | function  | Narrow an unknown caught value at a guarded boundary.                                   |
| `createLeaseConflictError` | function  | Create the shared live-lease acquisition conflict.                                      |
| `createLeaseFenceError`    | function  | Create the shared stale-or-expired tenure failure.                                      |
| `createUnitAddressError`   | function  | Create the invalid-argument store failure for a workflow-address mismatch.              |
| `createUnitConflictError`  | function  | Create the compare-and-set conflict for a unit revision.                                |
| `createUnitSnapshotError`  | function  | Create the invalid-durable-snapshot store failure.                                      |
| `createBriefConflictError` | function  | Create a durable-state conflict for one brief id.                                       |
| `createBriefSnapshotError` | function  | Create the unwritable-brief store failure, optionally naming its safely read id.        |
| `createRunIdError`         | function  | Create the invalid-run-id store failure.                                                |
| `createRunOptionsError`    | function  | Create the invalid-list-options store failure.                                          |
| `createRunRecordError`     | function  | Create the unreadable-catalog-record store failure for one run id.                      |
| `deriveToken`              | function  | Encode the four-part unit context as an injective JSON tuple.                           |
| `deriveAddress`            | function  | Derive a frozen token-first executor address from a unit row.                           |
| `observationToActivity`    | function  | Project reportable observations onto workflow activity input.                           |
| `projectWorkflowRecovery`  | function  | Own a workflow snapshot and project matching running-task quarantines.                  |
| `trackWrite`               | function  | Track an admitted write until it settles so disposal can drain it.                      |
| `validateLeaseTTL`         | function  | Validate a finite positive-integer tenure as a typed result.                            |
| `validateRunEvent`         | function  | Validate one supervisor-stamped ordering instant below the saturation boundary.         |
| `compareUnitSnapshots`     | function  | Order unit rows by phase, task, then numeric attempt.                                   |
| `compareRunRecords`        | function  | Order catalog records by descending update instant, then by id.                         |
| `computeRunUpdated`        | function  | Ratchet one record's next ordering instant above the instance watermark.                |
| `computeRunUntil`          | function  | Compute a traversal's inclusive first-page watermark, or keep the cursor's own.         |
| `recordsToRunPage`         | function  | Filter, order, bound, and freeze one catalog page and its continuation cursor.          |
| `redactText`               | function  | Replace conservative credential and PEM patterns with a redaction marker.               |
| `truncateText`             | function  | Bound text by UTF-8 bytes without splitting a multi-byte character.                     |
| `matchesJSONDepth`         | function  | Check container depth independently from JSON-shape validation.                         |
| `isNonNegativeNumber`      | function  | Accept finite non-negative numbers while rejecting negative zero.                       |
| `isNonNegativeInteger`     | function  | Accept finite non-negative integers while rejecting negative zero.                      |
| `isBoundedJSONValue`       | function  | Accept cycle-free JSON values within the tracked depth cap.                             |
| `isBoundedJSONRecord`      | function  | Accept record-rooted bounded JSON values.                                               |
| `isBrief`                  | function  | Accept only an exact accessor-free brief with non-empty identity and valid timestamps.  |
| `isUnitContext`            | function  | Guard the exact four-part durable unit identity.                                        |
| `isLease`                  | function  | Guard an exact workflow lease and fence.                                                |
| `isUnitSnapshot`           | function  | Guard exact unit variants whose id derives from their context.                          |
| `isRunSnapshot`            | function  | Guard a complete durable workflow record.                                               |
| `isRunRecord`              | function  | Guard one exact catalog record, including its optional release instant.                 |
| `isRunCursor`              | function  | Guard one exact catalog continuation boundary.                                          |
| `isRunListOptions`         | function  | Guard exact catalog page options over hostile input.                                    |
| `parseRunListOptions`      | function  | Own one caller's list options, or report them unusable.                                 |
| `isObservation`            | function  | Guard exact executor observation variants.                                              |
| `unitRecordGuards`         | const     | Shared guard map for the nine fields common to every unit row.                          |
| `taskMilestoneGuards`      | const     | Shared guard map for workflow milestone id, name, and start time.                       |

The following boundary example uses the record helpers without private aliases:

```ts
import type { Observation, RunRecord, UnitSnapshot } from '@orkestrel/supervisor'
import {
	JOURNAL_MARKER,
	MemoryJournal,
	SupervisorError,
	compareRunRecords,
	compareUnitSnapshots,
	computeRunUntil,
	computeRunUpdated,
	createBriefConflictError,
	createBriefSnapshotError,
	createLeaseConflictError,
	createLeaseFenceError,
	createMemoryJournal,
	createRunIdError,
	createRunOptionsError,
	createRunRecordError,
	createSupervisor,
	createUnitAddressError,
	createUnitConflictError,
	createUnitSnapshotError,
	deriveAddress,
	deriveToken,
	isBoundedJSONRecord,
	isBoundedJSONValue,
	isLease,
	isNonNegativeInteger,
	isNonNegativeNumber,
	isObservation,
	isRunSnapshot,
	isSupervisorError,
	isUnitContext,
	isUnitSnapshot,
	matchesJSONDepth,
	observationToActivity,
	projectWorkflowRecovery,
	recordsToRunPage,
	redactText,
	taskMilestoneGuards,
	trackWrite,
	truncateText,
	unitRecordGuards,
	validateLeaseTTL,
	validateRunEvent,
} from '@orkestrel/supervisor'

const context = { workflow: 'build', phase: 'verify', task: 'test', attempt: 1 }
const lease = { run: 'build', owner: 'worker-1', epoch: 1, expiry: 1_800_000_000_000 }
const unit: UnitSnapshot = {
	id: deriveToken(context),
	context,
	executor: 'function',
	epoch: lease.epoch,
	revision: 1,
	payload: { command: 'npm test' },
	created: 1_799_999_999_000,
	updated: 1_800_000_000_000,
	status: 'running',
}
const observation: Observation = {
	category: 'settlement',
	sequence: 1,
	timestamp: 1_800_000_000_000,
}
const error = new SupervisorError('Lease tenure moved', {
	code: 'FENCED',
	context: { run: lease.run, epoch: lease.epoch },
	cause: new Error('store unavailable'),
})
const journal = createMemoryJournal({ entries: 100, note: 1_024 })
const supervisor = createSupervisor({ id: 'worker-1', lease: { ttl: 30_000 } })
const writes = new Set<Promise<unknown>>()
const record: RunRecord = {
	id: lease.run,
	created: 1_799_999_999_000,
	updated: 1_800_000_000_000,
	released: 1_800_000_000_000,
}

isSupervisorError(error)
new MemoryJournal({ age: 60_000 })
redactText('api-key=hunter2')
truncateText('bounded diagnostic', 20)
JOURNAL_MARKER
await journal.entries(context)
createLeaseConflictError(lease)
createLeaseFenceError(lease, 'renew')
createBriefConflictError('release-review')
createBriefSnapshotError('release-review')
createUnitAddressError(lease, unit)
createUnitConflictError(unit)
createUnitSnapshotError(lease.run)
createRunIdError()
createRunOptionsError()
createRunRecordError(record.id)
validateLeaseTTL(30_000)
validateRunEvent(record.updated)
compareUnitSnapshots(unit, unit)
compareRunRecords(record, record)
computeRunUpdated(record, record.updated, Date.now())
recordsToRunPage([record], { released: true }, computeRunUntil([record], undefined, 0, Date.now()))
deriveAddress(unit)
observationToActivity(observation)
isNonNegativeNumber(0.5)
isNonNegativeInteger(context.attempt)
matchesJSONDepth(unit.payload)
isBoundedJSONValue([unit.payload])
isBoundedJSONRecord(unit.payload)
isUnitContext(context)
isLease(lease)
isUnitSnapshot(unit)
isRunSnapshot({ lease, units: [unit] })
isObservation(observation)
unitRecordGuards.executor('function')
taskMilestoneGuards.id('test')
projectWorkflowRecovery(
	{
		id: 'empty',
		name: 'Empty',
		status: 'pending',
		bail: false,
		phases: [],
		created: 1,
		updated: 1,
	},
	[],
)
await trackWrite(writes, Promise.resolve())
await supervisor.destroy()
```

### Running work closes false cancellation

`SupervisorInterface.open` acquires one workflow lease or returns the already-held `RunInterface`
at the same epoch. That in-memory idempotency lets concurrent tasks in one workflow share one fence;
the store itself refuses every live lease acquisition. `RunInterface` owns renewal, launch,
reconciliation, inspection, and disposal. `UnitInterface` is the only external-effect control
surface, and its state is always projected from the latest accepted durable row.

| Name                       | Kind      | Readonly data or role                                                                            |
| -------------------------- | --------- | ------------------------------------------------------------------------------------------------ |
| `ExecutionInterface`       | interface | Native identity, bounded events, terminal result, and local disposal for one external execution. |
| `ExecutionResult`          | type      | JSON-safe success or workflow task failure.                                                      |
| `ExecutionInput`           | interface | Durable unit, correlation token, payload, and folded signal supplied at launch.                  |
| `ExecutionContext`         | interface | Correlation token plus optional provider identity used to address an external unit.              |
| `ExecutionOptions`         | interface | Optional attachment `signal`.                                                                    |
| `ProbeStatus`              | type      | Authoritative `present` or `absent`; failure means the answer is undetermined.                   |
| `RecoveryMode`             | type      | The reattach, relaunch, or quarantine decision produced by reconciliation.                       |
| `ExecutorInterface`        | interface | Named universal launch plus optional attach, probe, stop, steer, and reply capabilities.         |
| `ExecutorOptions`          | interface | Optional executor registry `name`.                                                               |
| `UnitInterface`            | interface | Fenced row projection, recovery decision, execution handle, mutation, and control.               |
| `UnitManagerInterface`     | interface | Readonly count and access to one run's units.                                                    |
| `UnitManager`              | class     | Readonly view over a run-owned unit registry.                                                    |
| `ExecutorManagerInterface` | interface | Readonly count plus executor registration and access.                                            |
| `ExecutorManager`          | class     | Mutable registry keyed by each executor's own non-empty name.                                    |
| `RunManagerInterface`      | interface | Readonly count and access to held runs.                                                          |
| `RunManager`               | class     | Readonly view over a supervisor-owned run registry.                                              |
| `LaunchInput`              | interface | Unit address, executor name, durable payload, and caller signal for one fenced launch.           |
| `RunInterface`             | interface | Held id, renewable lease, unit manager, launch, reconciliation, inspection, and disposal.        |
| `ReconcileResult`          | interface | Owned workflow snapshot and the readonly units changed by reconciliation.                        |
| `SupervisorInterface`      | interface | Root emitter, owner id, executor/run managers, journal, open, and disposal.                      |
| `SupervisorEventMap`       | type      | Open, launch, observe, settle, quarantine, fence, and close record events.                       |
| `SupervisorHooks`          | type      | Initial listeners for supervisor record events.                                                  |
| `SupervisorOptions`        | interface | Initial hooks, owner, borrowed collaborators, executors, and lease settings.                     |
| `Supervisor`               | class     | Root owner of executor registration, workflow leases, and record events.                         |
| `Run`                      | class     | Renewable fenced workflow tenure and intent-before-effect launch owner.                          |
| `Unit`                     | class     | Fenced live surface over one durable external-unit row.                                          |
| `createSupervisor`         | function  | Create a supervisor with memory defaults and optional borrowed collaborators.                    |

Stopping is observed, not inferred. `UnitInterface.stop` returns `UNSUPPORTED` when the executor
has no stop capability. `FunctionExecutor.stop` aborts its owned signal and waits for the function
to settle; a signal-ignoring function leaves that wait pending. `ProviderExecutor.stop` asks its
owned local process group to terminate, escalates after the configured grace, and resolves only
after the child exit is observed. A successful stop therefore means the executor observed
termination. The durable outcome still travels through `ExecutionInterface.result` and
`UnitInterface.settle`; a stop request alone never fabricates a settled row.

`destroy` has a different responsibility. A run first refuses new work, stops renewal, aborts its
run-scoped signal, disposes local execution handles, drains admitted writes, and then releases the
lease. It does not call unit stop after losing its fence. The store, journal, executors, and database
driver are borrowed collaborators; supervisor disposal never destroys them.

A held run maintains one renewal timer, scheduled from the absolute lease expiry at the first third
of the tenure. A successful renewal extends expiry at the same epoch. Transient store failures retry
while preserving a final recoverable part of the window; expiry itself remains authoritative. A
fenced renewal closes the run from memory, aborts and detaches its handles, and admits no stale
publication.

Lifecycle vocabulary stays separate: launch creates one newly authorized unit, start begins or
restarts workflow work and creates no unit row, and attach adopts an external unit this process did
not launch.

### The launch transaction makes intent precede effect

Every external effect follows one sequence in `RunInterface.launch`:

```text
0. supervisor.open(workflow) acquires one epoch for the whole run
1. workflow's required attempt checkpoint has already made the four-part unit key durable
2. store.set commits revision-one intent under the live lease
3. executor.launch crosses the external boundary for the first time
4. unit.identify commits the provider identity at the next revision
5. observations, control, and settlement continue only through the lease and row fences
```

The lease grant and intent insertion are separate commits because one lease covers many attempts.
The load-bearing atomic step is the second one: lease confirmation and intent insertion occur in
the same transaction. If the intent write fails or the lease expires, no executor is reached. If a
crash follows executor acceptance, the revision-one row and correlation token remain durable.

Identity commitment is sequenced with settlement and registered in the run's admitted-write set as
soon as launch returns. If the identity store write fails, the row deliberately remains at revision
one and receives a diagnostic observation when possible. Erasing it would destroy the only address
after an effect may already exist.

### The workflow adapter closes the continuation confusion

Native provider reattachment and workflow's `Task.resume()` are different verbs for different
facts — one recovers an external session, the other reopens a live cooperative pause gate — and
keeping them apart is this seam's job. `createWorkflowFunction` is the one adapter from any
`ExecutorInterface` to workflow's ordinary task-function seam. The composition opens the supervisor run before workflow execution. The adapter
derives `UnitContext` from the active workflow, phase, task, and attempt; commits and launches through
the held run; admits each executor observation to the fenced journal before projecting reportable
activity; awaits the external result; settles the unit; then returns the value or throws the failure
message through workflow's existing handler boundary.

| Name                      | Kind      | Summary                                                                |
| ------------------------- | --------- | ---------------------------------------------------------------------- |
| `WorkflowFunctionOptions` | interface | Required `supervisor` plus optional durable payload derivation.        |
| `PayloadFunction`         | type      | Derive a durable JSON record from the active workflow task controller. |
| `createWorkflowFunction`  | function  | Adapt one registered executor into a supervised workflow function.     |

Native continuation never uses `Task.resume()`. That workflow method only opens an in-memory pause
gate for code already running. External continuation is `ExecutorInterface.attach`, chosen during
reconciliation and adopted by a later supervised launch. Workflow still owns logical task status
and retry accounting; the supervisor owns whether the external unit was reattached, relaunched, or
quarantined.

```ts
import { createWorkflowRunner } from '@orkestrel/workflow'
import {
	createFunctionExecutor,
	createSupervisor,
	createWorkflowFunction,
} from '@orkestrel/supervisor'

const executor = createFunctionExecutor(async ({ payload, signal }) => {
	if (signal.aborted) throw signal.reason
	return { validated: payload.command ?? null }
})
const supervisor = createSupervisor({ id: 'worker-1', executors: [executor] })
const opened = await supervisor.open('build')
if (!opened.success) throw opened.error

const result = await createWorkflowRunner().execute(
	{
		id: 'build',
		name: 'Build',
		phases: [
			{
				id: 'verify',
				name: 'Verify',
				tasks: [{ id: 'test', name: 'Test', run: 'supervised' }],
			},
		],
	},
	{
		functions: { supervised: createWorkflowFunction(executor, { supervisor }) },
		phases: {
			verify: { tasks: { test: { metadata: { command: 'npm test' } } } },
		},
	},
)
const record = await opened.value.inspect()
if (!record.success) throw record.error

result.results[0]?.result
const latest = record.value.units[0]
if (latest?.status === 'settled') latest.result
await supervisor.destroy()
```

Two concurrent tasks in the same workflow resolve the same held `RunInterface` and therefore share
one epoch. A failed external result is durable before the adapter throws. Workflow then records the
adapter throw with its own handler origin, while the supervisor row retains the executor's original
failure origin.

### Executors separate effect ownership from protocol translation

The core `FunctionExecutor` is the reference implementation. It mints an identity immediately,
keeps a process-local token registry, emits no synthetic activity, and runs the supplied function
under the same fenced record as every external provider. Its registry can prove absence only within
that process lineage. A partitioned stale function may still perform effects after losing its lease,
but it cannot publish through the lost fence.

| Name                     | Kind     | Summary                                                                          |
| ------------------------ | -------- | -------------------------------------------------------------------------------- |
| `ExecutionFunction`      | type     | Plain in-process function over durable input and a folded signal.                |
| `FunctionExecutor`       | class    | In-process executor with immediate identity, live probing, and cooperative stop. |
| `createFunctionExecutor` | function | Create the reference function executor with an optional registry name.           |

Node provider support splits two responsibilities. A `ProviderInterface` is immutable-configured
and stateless per frame: it builds commands and translates untrusted protocol frames. A
`ProviderExecutor` alone spawns commands, owns local process groups, frames JSON Lines, sequences
observations, exposes result channels, writes live input, bounds probes, and observes termination.
An adapter never kills a process and never retains cross-execution state.

Every decoded frame is offered independently to `ProviderInterface.observe` for journal activity
and `ProviderInterface.settle` for the result channel. The first defined settlement wins. If the
process exits first, every provider produces the same honest failure naming the exit code or signal
and the absence of a terminal frame; exit code zero is not an outcome. Unknown decoded frames are
ignored for forward compatibility, while malformed JSON Lines reject as `PROTOCOL`.

The generic channel is request-capable without pretending every provider is. A protocol-faithful
fixture sends an App Server `execCommandApproval` request, which translates into a
`RequestObservation`; feeding its constraint id to `unit.reply(id, text)` sends the schema-shaped
response back through the executor-owned stdin channel. A provider exposes that control surface only
when its adapter has a real encoder and its launched process has a genuine live input channel. The
write is confirmed rather than assumed: `ProviderExecutionInterface.send` resolves the delivery
confirmation the process channel reports, and a steer or reply the channel did not deliver fails as
`PROTOCOL` instead of reporting a silent success.

| Name                         | Kind      | Readonly data or role                                                                    |
| ---------------------------- | --------- | ---------------------------------------------------------------------------------------- |
| `Transcript`                 | interface | Verbatim live-only provider text, correlated by token and labeled by process stream.     |
| `TranscriptHandler`          | type      | Synchronous handoff for one unbuffered provider transcript fragment.                     |
| `ProviderInput`              | interface | Durable unit, token, payload, and configured workspace translated into a command.        |
| `ProviderMessage`            | interface | Live-channel steer or reply text, with optional request identity.                        |
| `ProviderExecutionInput`     | interface | Workspace, grace, token, writable state, signal, transcript, and process-registry hooks. |
| `ProviderExecutionInterface` | interface | Framed execution channels plus live send and bounded local stop.                         |
| `ProviderOptions`            | interface | Optional native launch `model` plus the Codex probe's host-application `client` name.    |
| `ProviderInterface`          | interface | Stateless command builders, frame translators, and optional native capabilities.         |
| `ProviderExecutorOptions`    | interface | Required `workspace` plus optional name, lifecycle bounds, and live transcript handler.  |
| `ProviderExecution`          | class     | Framed handle over one executor-owned local provider process.                            |
| `ProviderExecutor`           | class     | Owner of provider process groups, framing, result channels, and bounded teardown.        |
| `ClaudeProvider`             | class     | Claude Code 2.1.220 command and stream translation.                                      |
| `CodexProvider`              | class     | Codex CLI 0.146.0 exec/resume translation and App Server thread-read probing.            |
| `CursorProvider`             | class     | Cursor Agent 2026.07.23-e383d2b translation with fail-closed recovery.                   |
| `createProviderExecutor`     | function  | Compose process ownership around one stateless provider adapter.                         |
| `createClaudeProvider`       | function  | Create the shipped Claude adapter.                                                       |
| `createCodexProvider`        | function  | Create the shipped Codex adapter.                                                        |
| `createCursorProvider`       | function  | Create the shipped Cursor adapter.                                                       |
| `formatProviderNote`         | function  | Convert provider text or errors into one redacted, byte-bounded note.                    |
| `validateProviderModel`      | function  | Preserve an absent or non-empty native model and reject an empty configured value.       |
| `PROVIDER_GRACE`             | const     | Default process-tree termination grace: 5,000 milliseconds.                              |
| `PROVIDER_TIMEOUT`           | const     | Default read-only provider probe timeout: 30,000 milliseconds.                           |
| `PROVIDER_EVIDENCE`          | const     | Maximum rolling stderr evidence retained for frameless settlement: 2,048 bytes.          |
| `CODEX_CLIENT_VERSION`       | const     | Client version reported by the static Codex App Server probe.                            |

Each adapter factory accepts `{ model?: string }`. A model adds the provider's native model flag to
new launch commands only; attach and probe stay identity-addressed and unchanged. Codex also reads
the optional `client` name from `ProviderOptions` for App Server initialization; omission reports
the neutral `host-application` identity instead of attributing the host's probe to this package.

```ts
import type { PendingForm } from '@orkestrel/terminal'
import {
	createClaudeProvider,
	createCodexProvider,
	createCursorProvider,
	createProviderExecutor,
	formatProviderNote,
	validateProviderModel,
} from '@orkestrel/supervisor/server'

const claude = createClaudeProvider({ model: 'haiku' })
const codex = createCodexProvider({ client: 'build-host' })
const cursor = createCursorProvider()
const executor = createProviderExecutor(claude, {
	workspace: process.cwd(),
	grace: 5_000,
	timeout: 30_000,
})

claude.name
codex.name
cursor.name
executor.name
formatProviderNote(new Error('provider failed'))
validateProviderModel(undefined)
```

The shipped recovery policy is fail-closed wherever positive evidence is unavailable:

| Executor    | Probe evidence                                    | Shipped recovery decision                               |
| ----------- | ------------------------------------------------- | ------------------------------------------------------- |
| Function    | Token registry in the owning process lineage      | Relaunch on proven local absence; quarantine otherwise. |
| Claude Code | Recorded identity in `agents --json --all`        | Reattach on present; quarantine otherwise.              |
| Codex       | Recorded identity succeeds through `thread/read`  | Reattach on present; quarantine otherwise.              |
| Cursor      | No authoritative scriptable read-only probe ships | Quarantine.                                             |

Claude and Codex answers never infer absence from a missing or malformed reply. Cursor exposes
neither probe nor attach even though the upstream CLI has interactive resume: without an
authoritative read-only probe, the adapter cannot prove reattachment safe. None of the shipped
adapters exposes live input today, so `ProviderExecutor` structurally omits steer and reply for
them. At Claude Code 2.1.220, permission requests route through hooks outside the recorded headless
stream. The shipped Codex adapter uses one-shot `codex exec`, whose stream carries no App Server
approval/input frames or reply channel. Recorded Codex 0.146.0 `item.updated` frames contain only
`todo_list` state, and the inspected App Server schema defines no such frame; the adapter therefore
fabricates neither request observations nor incremental agent text. Claude carries final result
text as its success value. Codex terminal frames carry bounded usage; the final agent message
remains journaled activity. Cursor maps its result frame and falls back to the uniform
missing-terminal failure when no result arrives.

### Live viewing keeps two registers separate

The record and the transcript answer different questions. The record is the bounded, redacted,
sequenced, fenced `Observation` history. Its live view is `SupervisorEventMap.observe`, emitted
only after the journal accepts an append; reconnect reads the journal tail. The transcript is the
verbatim provider stdout and stderr needed by a human watching work now. It is unbounded,
unredacted, unfenced, live-only, and gone with the process. Reconnect never replays it.

Installing `ProviderExecutorOptions.transcript` is an explicit host-application security decision.
Raw provider text can contain prompts, credentials, stack traces, workspace paths, and command output.
The package calls the synchronous `TranscriptHandler` once per stdout line before JSON parsing and
once per stderr chunk, retains no transcript buffer, and drops a throwing handler after one
diagnostic observation. The application must authorize every viewer and own slow-viewer queues,
display, redaction, and any retention; persisting or logging the tap silently turns live
secret-bearing text into a second record. The fail-closed default is no handler.

Stderr also supplies a different, record-safe signal. `ProviderExecution` continuously keeps only
the latest `PROVIDER_EVIDENCE` bytes. If the process exits without a terminal frame, that tail is
redacted and byte-bounded before it supports the exit evidence in the task failure. Probe
subprocesses never enter the transcript seam.

### The application composes policy around the record

The private `app/` tree is the reference composition, not another published supervisor surface.
`app/core` owns host-independent authorization, deployment-policy, live-frame, and prompt-codec
contracts. `app/server` parses the complete environment before binding, then composes the installed
router, middleware, and server lifecycle around a caller-owned live workflow and the fenced
supervisor record.

That environment is not always the process's own alone. When it names no roster — no
`APP_PRINCIPALS`, no `APP_USERS`, no `APP_SETUP` — `ApplicationSetup` reads `APP_SETUP_FILE` from the
process working directory and lays the two together through `composeApplicationEnvironment`: the file
supplies what the environment omitted, and every defined process value wins its own key. That is the
whole precedence, and it has exactly two sources. There is no dotenv layer, nothing mutates
`process.env`, and an environment that names a roster — or an injected `ApplicationSetupOptions`
`values` record — never opens the file at all, so a developer's own `.supervisor.local` cannot reach
a deployment that configured itself. `APP_SETUP` alone is a complete environment-owned human path:
`ApplicationSetup` mints its per-process random wildcard principal into the composed values before
policy parsing. It is neither printed nor stored, so bearer clients still name `APP_PRINCIPALS`
explicitly. A bare `parseApplicationPolicy` caller must supply principals, and a file-sourced
`APP_SETUP` without its generated `APP_PRINCIPALS` is a corrupt half-file that refuses startup.

A first boot that finds neither generates one: a fresh `createApplicationToken` granting every
workflow, a grouped-hex `createApplicationPassword`, and both signing secrets, written by
`writeApplicationSetup` with exclusive creation and owner-only permissions, so a lost race re-reads
the winner's file instead of overwriting it and an unwritable directory refuses to boot rather than
serving a login it could not persist. Generation happens only on an interactive terminal: a headless
launch with no roster keeps the `CONFIG` refusal that names both ways out, because a credential
minted into a service log is one nobody read and anybody has. While `APP_SETUP` is the roster's
source the deployment is provisional, which the server enforces by refusing to bind anything but
loopback with a memory store. A provisional host name is resolved once; every returned address must
be loopback, and the server binds the selected numeric address rather than resolving the name again.
Every owned roster write ends that deployment state by rewriting the file with `APP_USERS` in place
of `APP_SETUP`: `add`, `grant`, `remove`, `regenerate`, and `replace` all perform that promotion. A
roster the environment configured is never
provisional and never replaceable: `APP_SECRET_PATH` answers it `FORBIDDEN`, because a file the
server does not own is not a file it may rewrite.

`APP_PRINCIPALS` maps raw bearer tokens to durable workflow ids. Authentication runs before the
token-or-IP limiter and request-body parser, so rejected 401s consume no limiter budget. Every
workflow command, unit command, and live subscription checks the requested workflow id against that
roster; an authenticated principal addressing another workflow receives 403. Health, `/`, and the
existing asset tree remain public and unmetered. The fixed-window limiter is process-local
deployment policy, not a distributed quota, and the loopback default is the fail-closed posture
until a deployment deliberately exposes it.

Two credentials reach the same `Principal`, and one request may carry only one of them.
`APP_PRINCIPALS` is the automation credential, sent as a bearer by MCP clients and scripts.
`APP_USERS` is the human one: a required JSON roster of `name`, `secret`, and the principal token
that user borrows, parsed before the server binds so a malformed entry, a duplicate name, or a
dangling principal reference refuses to start instead of refusing a login hours later. A request
arriving with both a bearer and a session cookie is refused as ambiguous rather than resolved in
either credential's favour — and the session it carried is destroyed on the way out — because an
application that guesses which credential a caller meant can be made to guess wrong.

The API token never enters the browser. `POST /session` is the sole anonymous route past that
arbiter — `matchesApplicationSession` is that whole exception, matching `POST` on `APP_SESSION_PATH`
and nothing else. It accepts exactly `{ name, secret }`, compares the secret in constant time — an
unknown name is compared against a process-lifetime decoy verifier, so absence and mismatch cost the
same derivation — and answers one uniform `AUTH` refusal for an unknown name, a wrong secret, and a
name whose principal no longer resolves. Which half was wrong never crosses the wire. A successful
login clears the session's data, writes the user's name and the stamp of the verifier that admitted
them as its only two keys, and regenerates the session id, so an id fixated before the credential
change cannot survive it; a refused login destroys the session outright. The immutable startup policy keeps its parse-time users only as the runtime seed;
login, session access, setup rendering, and replacement read `ApplicationSetupInterface.roster`, the
live view replacement swaps. The name is therefore re-resolved through the current roster and the
startup principals on every later request.

`GET /session` is the self-view — `{ user, workflows, csrf, provisional?, confined? }`: who the
reader is, which runs they may address, and the token their next mutation must submit.
`provisional` is the login-scoped fact that its generated password still needs replacement;
`confined` says the server was booted confined to loopback and memory, and that deployment fact
holds until restart. Neither optional fact implies the other. A successful `PUT /secret` rotates
the session and returns an empty `204`; it cannot answer a CSRF minted for the new session because
tokens are minted only on safe requests. The browser therefore follows success with `GET /session`,
whose post-replacement self-view omits `provisional` and carries the rotated session's usable CSRF.
`DELETE /session` destroys the session
and clears that token's cookie. `supervisor-session` is `httpOnly`, `SameSite=Strict`, host-only,
and `Secure` whenever the request's own transport is TLS, so a loopback HTTP deployment still
receives a cookie no page can read. `supervisor-csrf` is its readable double-submit companion,
minted on safe requests and submitted back in `x-csrf-token` on every state-changing one. The
battery runs only for session-carrying requests: a bearer caller holds no cookie a browser could
replay, so there is nothing there to defend. A missing or mismatched token is `403`, deliberately
distinct from the `401` a spent session earns, because one asks the reader to retry and the other
asks them to login again. `POST /mcp` stays bearer-only, and it is verified before it is refused: a
session-carried MCP request without a valid token is still a CSRF `403`, and only a verified one
reaches the refusal that says the route wants a bearer.

`APP_USERS_PATH`, `APP_USER_PATH`, and `APP_USER_SECRET_PATH` are the manager's half of that human
credential, and `requireApplicationManager` is the whole gate in front of them: session
authentication, and a login holding the wildcard grant. A bearer never passes it, because automation
that could mint human logins would make the API token a superuser by a second route, and a session
holding named workflows is refused rather than shown a directory it may not act on. Both refusals are
`FORBIDDEN`, since neither is a claim that the credential expired. `ApplicationUserHandlers` reads and
writes through `ApplicationSetupInterface`, so an environment-configured roster refuses all four
mutations for the reason `APP_SECRET_PATH` already refuses: a file the server does not own is not a
file it may rewrite.

What those routes answer is an `ApplicationDirectory`, and its shape is the guarantee.
`buildApplicationDirectory` projects the live roster through `userToLogin`, which resolves each
user's principal token to that token's grants and then drops the token, so an `ApplicationLogin`
carries a name, its resolved `workflows`, and `provisional` — and has no field a secret or a bearer
token could occupy by mistake. `environment` says the roster came from `APP_USERS`, which a browser
renders without management controls rather than offering buttons the server will refuse.
`ApplicationSecret` is the one value that leaves the projection, and it leaves exactly once: adding a
login and regenerating one answer the generated password beside the post-change directory, because
the supervisor compiled it to a verifier and kept no plaintext. A caller that discards it regenerates
the login rather than asking again.

A grant change mints rather than edits. `resolveApplicationToken` issues the login a fresh private
principal token carrying its complete replacement roster and retires the former one — unless another
login was borrowing that token, in which case the borrowed entry stands untouched, because retiring
it would silently unauthorize somebody else. `formatApplicationPrincipals` serializes the result back
into the accepted `APP_PRINCIPALS` grammar and `replaceApplicationSetup` promotes the rewritten
overlay through an owner-only sibling temporary file, so a failed write leaves the previous roster
whole instead of a half-written one. The bodies are exact: `parseApplicationLoginInput` accepts
`{ name, workflows }` and `parseApplicationGrantInput` accepts `{ workflows }`,
`parseApplicationName` trims one path-safe name bounded by `APP_NAME_LENGTH`, and
`parseApplicationGrants` takes one to `APP_GRANT_COUNT` workflow ids or the sole wildcard, never a
mixture. The last login holding the wildcard survives all four mutations: a deployment that could
lock every manager out of its own roster would have to be repaired by editing the file by hand.

Every stored password is a verifier rather than a password. `createApplicationVerifier` derives one
under a pinned scrypt profile with a fresh random salt — `APP_VERIFIER_PREFIX`,
`APP_VERIFIER_VERSION`, `APP_VERIFIER_COST`, `APP_VERIFIER_BLOCK`, `APP_VERIFIER_PARALLEL`,
`APP_VERIFIER_SALT`, and `APP_VERIFIER_DIGEST` — and writes `scrypt$1$32768$8$3$<salt>$<digest>`. The
parameters are echoed so a stored verifier describes itself to a reader, not so a writer may vary
them: `isApplicationVerifier` requires equality with the profile rather than a floor, so a downgraded
cost is off-shape rather than merely weaker, and a changed profile ships as version 2.
`matchesApplicationSecret` re-derives under `APP_VERIFIER_MAXMEM` and compares in constant time,
answering false for a malformed verifier or a failed derivation rather than throwing, and the login
handler admits at most `APP_VERIFIER_CONCURRENCY` derivations at once so a memory-hard credential
check cannot become the cheapest way to exhaust the process.

A session records which verifier admitted it. `deriveStamp` truncates a SHA-256 of the stored
verifier to `APP_SESSION_STAMP_LENGTH` base64url characters, and login writes it under
`APP_SESSION_STAMP_KEY` beside `APP_SESSION_USER_KEY`. Every later session request re-derives that
stamp from the roster's current verifier and refuses when the two disagree, so replacing a password —
the reader's own through `APP_SECRET_PATH`, or a manager's through the regeneration route — ends
every session that predates it on its next request, with no revocation list and without disturbing
the sessions it should not.

The limiter keys a bearer call by its token and every session or anonymous call by client IP, so
login attempts are metered by the machine making them while automation is metered by the credential
it presented. Sessions follow `APP_STORE`: the battery's process-local map under `memory`, or its
own table in the same SQLite database otherwise. `APP_SESSION_SECRET` and `APP_CSRF_SECRET` are
therefore required exactly when sessions are durable. A memory deployment mints a random secret per
process, which is honest because a restart discards the sessions those signatures protected anyway;
a SQLite deployment doing the same would greet every restart with a store full of ids it can no
longer verify. The durable application spine is one database and one lane: every supervisor,
snapshot, and session read, every write, and shutdown itself is admitted through that lane.
`ApplicationPersistence` is that spine made explicit. It composes `SUPERVISOR_TABLES` and
`SUPERVISOR_INDEXES` beside its own `snapshots` and `sessions` tables in one database, mints the one
`Lane`, and exposes three admitted views: the supervisor store itself, `LaneWorkflowStore`, and
`LaneSessionStore`. The two lane stores add nothing but that admission — each forwards its own
contract through `Lane.execute`, so a snapshot write and a session read queue behind supervisor work
instead of contending for the same transaction slot. Its `destroy` closes the database on the lane
too, so shutdown waits for the work already admitted rather than cutting it off.

Sessions expire twice: idle after `APP_SESSION_TTL` and absolutely after `APP_SESSION_LIFETIME`.
The eight-hour idle default exists because the live stream deliberately does not touch it — a
reader watching a run all afternoon sends no request, and a short idle window would strand exactly
the reader who is paying attention. Stream authorization is decided once, at the handshake: a
subscription that was authorized when it opened keeps delivering frames until it is aborted or the
server closes it, even if the session behind it expired or was logged out in another tab. That
limit is stated rather than papered over — revoking a live stream would need per-frame revocation
machinery this composition does not have — and every command travels a durable route that
re-checks the credential on each request.

Each accepted definition creates one caller-owned `WorkflowInterface`; workflow remains the owner of
pause, resume, and logical completion while the supervisor owns external units. `start`, `inspect`,
`pause`, `resume`, and `stop` drive those two authorities. `stop` requests termination from every
live unit and reports success only after the executor and workflow observe settlement; the request
therefore remains held for however long the unit actually takes to die. Provider executors create
`{APP_WORKSPACE}/{workflow}` only after validating the workflow id as one path segment. That is
single-tenant workspace separation, not an operating-system sandbox.

An application start accepts only an id with neither a live execution nor retained workflow or
supervisor state. A retained id is `CONFLICT`; when its proposed definition differs, the refusal
names that conflict and directs the caller to inspect the retained workflow or choose a new id.
This fail-closed application policy prevents a replacement definition from hiding prior running
unit rows. It deliberately does not claim that resetting workflow attempts can supersede those
rows: the published supervisor retains every attempt address and terminalizes one only from an
observed executor outcome.

The application enables function, Claude, Codex, Cursor, local agent, and human executors. Provider
processes are constructed per workflow workspace. The agent executor streams a borrowed
`@orkestrel/agent` provider—Ollama by default—and maps token/thinking, tool, and usage chunks to
bounded activity observations; it deliberately has no probe, so recovery quarantines rather than
duplicating a possibly effectful turn. The human executor parks a terminal prompt, records the
ticket id as both native identity and request constraint address, and persists pending and answered
or stopped tickets. A ticket retains the validated form schema itself, so `isHumanTicket` is the one
place that schema is validated and every reader of a returned ticket uses `form` directly instead of
parsing it again. The ticket's `status` is its own lifecycle — `pending`, `answered`, or `stopped` —
and no second status travels with it. Its token-only probe returns present for every retained state,
and attach collects an answer after a process restart instead of asking again. Each human request owns its own terminal prompt lifetime,
so stop records a durable stopped ticket, releases that prompt without inventing an answer, and lets
the supervised attempt settle before the run-level command acknowledges termination.

The application also exposes a direct CLI-backed implementation of the agent inference seam over
three stateless vendor backends. Recorded evidence confirms that Claude, Codex, and Cursor all
receive the flattened ordered transcript on stdin, and the prompt never enters argv. Claude
disables its built-in tool set with `--tools ''`; project- or user-configured MCP tools are outside
that flag, and the provider's scratch working directory carries no project configuration. Codex
runs in its native read-only sandbox. Cursor combines required trusted headless execution with
read-only `--mode ask` and never uses `--force`. The engine refuses non-empty tools, schema options,
tool-role messages, calls, and images before spawn because these one-shot harnesses cannot preserve
those inference semantics. Each child inherits the application environment and runs in a newly
created and removed scratch directory unless the embedding caller supplies one. That scratch
directory is a working directory, not an operating-system sandbox. These coding-agent binaries
prove the relay translation and process lifecycle, not semantic substitutability with a native
inference provider; API-backed mirrors remain the real inference path.

`formatInferencePrompt` is deliberately an approximation: it preserves message order, roles, and
text while collapsing the conversation into one instruction. Claude and Cursor surface assistant
text frames and may repeat terminal text; Codex surfaces completed agent-message items and no
terminal text. `CLIProvider` adopts terminal text as one content delta only when no content was
streamed, so concatenated deltas always equal `ProviderResult.content`. Claude maps only the
top-level snake_case aggregate `usage` and ignores its per-model `modelUsage` telemetry; Codex maps
snake_case turn usage; Cursor maps camelCase result usage when present. Abort and timeout terminate
the whole owned process group and reject both provider faces with `ProviderAbortError` carrying the
partial result. A nonzero frameless exit is `EXIT` with a redacted bounded stderr tail, a spawn
failure is `LAUNCH`, and a clean frameless exit is `PROTOCOL`. Vendor thinking frames are never
surfaced, so the `think` preference has no effect and results never carry `thinking`.

`APP_INFERENCE` parses the comma-separated enabled-vendor roster into deployment policy and
defaults to an empty list. The authenticated `POST /inference/:vendor` relay mounts only that
roster, so the default refuses every vendor with the application's typed 404 `NOT_FOUND`. The route
uses the existing bearer, token-or-IP limiter, and JSON body boundary without an exception. A
non-streaming request returns one no-store `ProviderResult`. A streaming request returns
`application/x-ndjson`: each line is one `InferenceFrame`, ordered as provider deltas followed by a
terminal result, abort, or error.
A provider failure on the non-streaming path answers 502 with the same fixed-message error frame;
an aborted or timed-out call answers with the abort frame carrying the partial.

`InferenceStream` gives its response body no application pump. Each WHATWG stream pull advances the
provider iterator once, so the server and router's socket-drain discipline propagates pressure back
to the CLI generator. A response-side client disconnect aborts the request signal; the provider
then terminates its owned process group and preserves any already-produced content in the internal
abort frame. Public error frames use one fixed message per `InferenceErrorCode`; executable paths,
argv, stderr, signals, and exit codes never cross the relay boundary.

Inference authorization is deliberately coarser than workflow authorization. `Principal` carries
workflow grants but no inference grants, so every authenticated principal may call every mounted
vendor even when that principal cannot address a particular workflow. Deployments needing
vendor-specific grants must keep the roster private or add an application-owned authorization
layer before exposing this reference composition.

Backend executable, model, scratch directory, lifecycle bounds, and environment remain trusted
embedding configuration rather than request fields. The runtime omits the directory for every
mounted vendor, so the engine creates one per-call temporary scratch directory and removes it after
that call. It also deliberately omits a model, preserving that CLI's default. The grouped
`ApplicationPolicy.agent` policy configures only the local agent executor: `APP_AGENT_MODEL`
selects its model, `APP_AGENT_URL` aims the lane at an inference endpoint other than the local
daemon's default, `APP_AGENT_TIMEOUT` bounds inference in milliseconds, and `APP_AGENT_KEEP`
controls model residency. Absence of a URL is `undefined` and keeps the provider's own default.
The runtime translates policy `keep` to the Ollama provider's `keepAlive` option at composition.
Direct backend injection exists for trusted embedding and protocol-fixture composition, never on
the HTTP wire.

The live broker subscribes to observations only after journal admission. It also receives provider
transcript fragments and terminal-output tee frames without retaining either. Durable observation
frames carry the observation's own timestamp; transcript and terminal frames record when they enter
the broker, and a gap records when the viewer announces its discontinuity. Each workflow viewer has
a 262,144-byte queue; overflow drops the oldest frames and emits a gap. The authorized SSE route
first replays the durable observation tail oldest-first, then emits live `observe`, `transcript`,
`terminal`, `gap`, and `fault` events and releases the viewer on disconnect. The broker holds each
viewer's `LiveFrameHandler`, granted once by the `LiveViewerOptions` attach collaborator at
construction and returned by its release collaborator at destruction, so the viewer itself carries
only `close` and `destroy`, giving it power over its lifetime but never over its queue.

Both viewers yield packets rather than bare values. A frame or a snapshot is serialized once, at
admission, into a `Packet` carrying the value, its canonical JSON `text`, and that text's UTF-8
`bytes`; `createPacket` is the only place that serialization happens. Each consumer then reads the
face it needs from one act of work: the live viewer's byte budget spends `bytes`, the SSE pump
writes `text` straight to the wire, the MCP watch path projects `value`, and the roster viewer
coalesces on `text`. `bytes` is an encoded length rather than a character count, so a frame carrying
text outside ASCII is charged what the wire actually carries. A value carrying no JSON text at all —
`undefined`, a bare function, a symbol — is refused there with an `ApplicationError` coded
`PROTOCOL`, because a packet's `text` is a string.

The live path packetizes each frame exactly once and carries that packet the rest of the way.
`LiveBrokerInterface.publish` serializes the frame it is given and hands every viewer the same
packet, so fan-out to ten viewers costs one serialization and an unwatched broker costs none.
Replay packetizes each frame as it is built from the journal, `boundObserveFrames` bounds those
packets by the `bytes` each already carries, and `LiveReplay.frames` delivers them to the viewer,
so a frame surviving several unit passes is measured once rather than once per pass. Gap frames are
the one live construction made per viewer, and they are per-viewer values: each names that viewer's
own `dropped` count.

`gap` and `fault` are two discontinuities with two owners, and neither emitter takes the other's
word. A `GapFrame` is the live viewer's alone: it announces the frames its own byte budget evicted,
and `dropped` is the exact count it took. A `FaultFrame` is the live broker's alone: it announces a
record the supervisor could not project, names in `row` the durable stack row that record belonged
to, and states no count, because nothing measured the loss. A row token is
`JSON.stringify([workflow, phase, task, attempt])`, or its one-element prefix
`JSON.stringify([workflow])` for the workflow's own row. The broker emits a fault where a projection
fails — the run is gone, the inspection refuses, the inspected snapshot holds no such unit row, or
the read throws — and where a journal replay cannot be read, which loses the whole run's tail
rather than one unit's record and therefore names the workflow's own row. The broker publishes no
gap, and the compiler holds that rule rather than the convention: `publish` takes `BrokerFrame`,
which is every live arm but the viewer's own. To the viewer a fault is an ordinary frame: it is
charged for its own bytes, it is evictable, and an evicted one counts as one loss like any other
frame.

The roster path is deliberately the other way around. `RosterViewer` serializes after its own grant
filter, so two viewers with different grants hold genuinely different snapshots and one shared
packet would be wrong. That is one serialization per viewer per distinct filtered snapshot, and it
is the value the coalescing comparison needs.

Both viewers park on one shared engine. `Relay` owns the single-consumer `events` iterable, the one
slot a read parks in, the handoff into that slot, the refusal a second concurrent read rejects with,
and the done settlement. Every retention decision stays with the viewer that owns it: the live
viewer's byte-bounded queue, gap accounting, and replay admission, and the roster viewer's
newest-snapshot slot and grant filtering. A read consults the owner's retention through
`RelayOptions.pull` and parks in the same turn, so a frame offered to an unparked viewer is retained
rather than lost, and `RelayOptions.ready` is where the live viewer's replay load is awaited before
any frame is yielded.

```ts
import { Relay } from '@app/server'

const retained: string[] = []
const relay = new Relay<string>({ name: 'Example viewer', pull: () => retained.shift() })
const reader = relay.events[Symbol.asyncIterator]()
const first = reader.next()

// The owner hands a value straight to a parked reader and retains it otherwise.
if (relay.parked) relay.deliver('one frame')
else retained.push('one frame')

await first // { done: false, value: 'one frame' }

relay.destroy()
await reader.next() // { done: true, value: undefined }
```

Replay retains the newest workflow-wide suffix within the configured `APP_JOURNAL_ENTRIES` and
`APP_JOURNAL_BYTES` values. A larger record is therefore explicitly truncated; no second retention
knob or hidden unbounded merge exists. The authorized `GET /workflows/:workflow/journal` route
returns that same bounded observation-frame tail under the response's `tail` key, beside a
`terminal` boolean reading the persisted workflow snapshot at the moment the tail was read. Those
two facts together are `ApplicationTail`, which is what `ApplicationInterface.tail` answers: a
reader that has just replayed a run learns from the same answer whether the run had already
finished, without asking a second route. A missing retained workflow is 404 and a workflow outside
the principal roster is 403. If replay cannot read the record, the viewer receives a live fault
naming the workflow's own row rather than a fabricated replay frame, while the existing redacting
diagnostic seam reports the store failure to the operator.

Two authorized routes answer about runs rather than about one run. `GET /roster` returns the
principal's live workflows and the registered executor commands, and `GET /roster/live` is the same
answer as an SSE subscription: `LiveBrokerInterface.roster` holds one `RosterBroker`, the
application republishes the complete roster on every workflow start, completion, failure, pause,
resume, skip, and stop, and each `RosterViewer` filters that complete snapshot through its own
copied grants. A viewer is complete-state rather than incremental — it retains only the newest
snapshot, so a reader that falls behind receives the current roster instead of a queue of stale
ones — and an offer whose filtered snapshot carries the same packet text as the last one offered is
dropped, so a run outside a reader's grants never wakes them. That coalescing is the viewer's own
retention above the shared `Relay`, which holds nothing but the read in flight, so a snapshot a slow
reader has not taken is replaced rather than queued behind. Every frame carries the whole roster
under the fixed `roster` event name, which is why a subscription needs no cursor and no gap frame.

`GET /history` is the durable counterpart. It reads the run catalog through
`SupervisorStoreInterface.list` with `released: true`, narrowed to the principal's own workflows
unless that principal holds the wildcard grant, then joins each catalog record to its persisted
workflow snapshot and keeps only the runs whose status is terminal. `parseHistoryQuery` owns the
query exactly: `cursor`, `limit`, `name`, and `prefix` are the only accepted keys, a repeated or
unknown key is `PROTOCOL`, `limit` defaults to `APP_HISTORY_COUNT` and is bounded by
`APP_HISTORY_MAXIMUM`, and the opaque cursor is bounded by `APP_HISTORY_INPUT` before it is decoded.
That cursor is a `RunCursor` encoded base64url by `formatHistoryCursor` and decoded by
`parseHistoryCursor`, so a caller carries the store's own continuation boundary without being able
to read or forge one that means anything else.

Qualification runs after the store applies its page limit, so a page can carry fewer runs than the
limit — or none at all — while still returning a cursor. Cursor presence alone says another page can
be asked for; row count never does. The two filters are applied in different places for a reason
worth stating: `prefix` is a case-sensitive run-id prefix applied at the store, inside the
traversal, while `name` is a case-insensitive fuzzy subsequence applied by `matchesRunName` to
the joined snapshot name after the join, routed through the general `matchesFuzzy` leaf: every
character of the query must appear in the name in order, not necessarily contiguously, so `r43`
admits `release-4-3`. Both filters are combined with AND, and both search the whole catalog rather
than the page a caller happens to be holding. `matchesFuzzy` lowercases both sides, which is simple
case folding and no more: scripts whose case rules are not one-to-one do not match the way a reader
might assume, so `straße` and `STRASSE` are different names here.

Transcript authorization is a deliberate security boundary: provider output is verbatim,
unredacted, secret-bearing, and never replayed or returned by the journal route. The viewer queue
bounds application retention, and the SSE pump writes one bounded frame at a time and parks on the
substrate's `drain()` signal before pulling another when `write()` reports pressure. Because the
substrate's response delivery also honors socket drain, pressure propagates through the
process-local stream queue back to the viewer's byte budget and gap discipline. The `drain()`
readiness signal reflects only that process-local queue; it is not proof that the remote peer
received any byte. When a peer never drains, the pump stays parked for the connection's lifetime
while that viewer retains only its bounded 262,144-byte queue—oldest frames drop with a gap
frame—and this runtime does not bound how long the peer may stall; the substrate's socket caps and
timeouts are deployment knobs.

The same server exposes one stateless `POST /mcp` route through the installed
`createMCPRoutes`; it opens no second listener and mints no MCP sessions. Bearer authentication runs
before the same process-local limiter on this route too. The route's synchronous caller extractor
reads the authenticated principal from request-owned state and the MCP transport carries it
opaquely to both tool bodies and the watch method. Each handler narrows that value through the
application's total `isPrincipal` guard at entry. An absent extractor, absent principal, or
off-shape caller fails closed with the typed `AUTH` result; no default principal and no
transport-level JSON-RPC error substitutes for authorization.

Two tools split the surface by effect, and the split is the whole design. The mutating tool is
named `supervisor` and carries the five commands that change a run; the read tool is named
`observer` and carries the two that change nothing. Each schema is an object discriminated by
`command`, every branch is closed to exactly the keys in its table, and `answer` is documented as
form values keyed by the field names in the retained schema. Both tool descriptions are written for an unaided model and ordered
so a model that stops reading early still holds the critical path. The mutating description names
its five commands, then the exact `start` shape with one complete one-phase, one-task human
confirmation example — so clients that abbreviate JSON Schema still receive the nested start shape —
and only then the acknowledgement-versus-state split and the ids `reply` addresses. The read
description names `inspect` first and then the whole `watch` drain loop. Each names its paired tool.
Thus `tools/list` alone teaches the surface without a prompt that repeats it.

The `supervisor` tool changes one workflow:

| Command  | Additional input                        | Result                                                                                       |
| -------- | --------------------------------------- | -------------------------------------------------------------------------------------------- |
| `start`  | `input` (definition plus task payloads) | `{ workflow, status: 'accepted' }` as `structuredContent`, promptly while work remains live. |
| `pause`  | `workflow`                              | `{ workflow, status: 'paused' }` after closing workflow dispatch gates.                      |
| `resume` | `workflow`                              | `{ workflow, status: 'running' }` after reopening those gates.                               |
| `stop`   | `workflow`                              | `{ workflow, status: 'stopped' }` only after observed cooperative termination.               |
| `reply`  | `workflow`, `unit`, `request`, `answer` | `{ workflow, status: 'accepted' }` after the typed answer crosses the existing reply codec.  |

`start.input` carries `definition` and optional `payload`. The description's complete compact
example is `{"command":"start","input":{"definition":{"id":"review","name":"Review","phases":[{"id":"phase","name":"Review","tasks":[{"id":"task","name":"Approve","run":"human"}]}]},"payload":{"phase":{"task":{"fields":[{"control":"confirm","name":"approve","label":"Approve?"}]}}}}}`.
The sparse executor-data map is keyed first by each `definition.phases[].id`, then by that phase's
`tasks[].id`; phase and task names are labels, not addresses, and an unknown payload key is refused
before a workflow is created. Definition refusals name the installed contract's first fault at its
workflow, phase, or task path. App-owned strictness also refuses unknown keys, duplicate phase or
task ids, and present schema-typed values that would otherwise be coerced. A task with human payload
declares `run: 'human'`; a payload for a
task with no `run` behavior is refused because nothing can consume it. The served task schema also
names every behavior registered by that application instance, JSON-encoding each behavior name.
Every human payload is a `FormSchema`: `fields` is required, and every field carries a unique
non-empty `name` plus one of the twelve controls `text`, `editor`, `password`, `number`, `date`,
`time`, `datetime`, `color`, `confirm`, `select`, `checkbox`, or `file`. Form labels, help, groups,
field state, rules, choices, defaults, and other control-specific settings retain the installed
form package's own shapes and validation. A launch-time human-payload refusal retains both the
product-level launch message and the form parser reason in the durable task failure.

The `observer` tool reads one workflow and changes nothing:

| Command   | Additional input              | Result                                                               |
| --------- | ----------------------------- | -------------------------------------------------------------------- |
| `inspect` | `workflow`                    | The live workflow snapshot and fenced unit rows.                     |
| `watch`   | `workflow`, optional `cursor` | One immediate bounded page: `{ frames, cursor, more, gap, closed }`. |

The two registers never mix. A `supervisor` result is an acknowledgement: `{ workflow, status }` is
a constant function of the command that was accepted, never a reading of the run, so a client that
starts a workflow learns its id and nothing else about it. Every fact about what is true now comes
from `observer` — `inspect` for the whole current snapshot, `watch` for what has been observed since
a position the caller names. `start` never waits for settlement, and `stop` stays pending for as
long as the executor takes to observe termination, so `{ status: 'stopped' }` is the most expensive
acknowledgement of the five and still is not a snapshot. An application refusal is an MCP
tool-failure result (`isError: true`) on both tools alike, not a JSON-RPC protocol error. The
command axis exists only on the mutating tool, so losing a watcher cannot cancel work, and a client
holding `observer` alone can read every workflow its principal grants and change none of them.
Protocol refusals name missing and unexpected keys, the offending nested key path, and the expected
shape, so a caller can correct one malformed level without guessing at the rest of the command.
Interpolated identifiers are JSON-encoded and retain at most 48 characters before an ellipsis;
candidate lists name at most 16 identifiers. A
refusal never names only its subject: an unsupported command lists the accepted commands and points
at the tool carrying the other register, a malformed cursor mark states the whole mark contract, and
a rejected workflow id states every character rule it broke.

The `observer` tool's `watch` returns durable observation frames only — never transcript, never
terminal render — and never holds its response open. Called without a `cursor` it starts at the
retained tail. The returned `cursor` is a vector of `{ unit, sequence }` marks, because observation
sequences are unit-local durable facts and no scalar can order two units against each other; the
caller passes it back unchanged. A page carries at most 64 frames and 65,536 serialized bytes.
`more` reports that another immediate call drains more of the retained tail, `gap` reports that the
supplied marks could not be honored — pruned, or not representable within the 512-mark,
65,536-byte cursor bound — so the caller re-`inspect`s before trusting the page as an increment, and
`closed` reports that the workflow is terminal and its retained history is fully drained. When an
observed unit cannot fit the mark vector, the page is empty and the cursor does not advance, `gap: true`,
`more: false`, and `closed: false`; that result persists until the observed unit set fits, so the
caller switches to `inspect`. A single frame too large for the page is skipped with `gap` and an
advanced mark; that oversized-frame arm cannot wedge the drain loop. A refused `watch` fails exactly
as a refused `inspect` does, through the typed tool-failure path; it never returns a success carrying
a refused state.

One run, followed to its end, is six `tools/call` bodies and three flags:

```text
supervisor  { "command": "start", "input": { "definition": { "id": "build", … }, "payload": { … } } }
         →  { "workflow": "build", "status": "accepted" }

observer    { "command": "watch", "workflow": "build" }
         →  { "frames": [ … 64 frames … ],
              "cursor": [{ "unit": "[\"build\",\"verify\",\"test\",1]", "sequence": 64 }],
              "more": true, "gap": false, "closed": false }

observer    { "command": "watch", "workflow": "build",
              "cursor": [{ "unit": "[\"build\",\"verify\",\"test\",1]", "sequence": 64 }] }
         →  { "frames": [ … 9 frames … ],
              "cursor": [{ "unit": "[\"build\",\"verify\",\"test\",1]", "sequence": 71 },
                         { "unit": "[\"build\",\"verify\",\"lint\",1]", "sequence": 2 }],
              "more": false, "gap": false, "closed": false }

observer    { "command": "watch", "workflow": "build", "cursor": [ … both marks, unchanged … ] }
         →  { "frames": [ … 3 frames … ], "cursor": [ … ], "more": false, "gap": true,
              "closed": false }

observer    { "command": "inspect", "workflow": "build" }
         →  the current snapshot and every durable unit row

observer    { "command": "watch", "workflow": "build", "cursor": [ … from the gapped page … ] }
         →  { "frames": [ … 2 frames … ], "cursor": [ … ], "more": false, "gap": false,
              "closed": true }
```

The first `watch` omits `cursor` and starts at the retained tail. The second passes back exactly
what the first returned — unchanged, both marks, no arithmetic — and the second unit's mark appears
because that unit produced its first observations between the two calls. `more: true` means another
immediate call drains more of the retained tail, so a client loops on it rather than sleeping.
`gap: true` on the fourth call means the position asked for was no longer available, so that page is
a page rather than an increment: `inspect` restores the truth, and watching resumes from the cursor
the gapped page returned. `closed: true` on the last call means the workflow is terminal and its
retained history is fully drained, which is the one answer that says stop calling.

The modern `supervisor/watch` method takes one `workflow` and holds its POST response open as MCP
SSE after authorization succeeds. It uses the same broker and yields
`notifications/supervisor/observe`, `notifications/supervisor/transcript`,
`notifications/supervisor/gap`, and `notifications/supervisor/fault`; terminal-render frames remain
local. The workflow tail is replayed before live delivery and a replay/live copy of the same unit
sequence is delivered once. A pending input state appears only when a real
`RequestObservation` exists, whose unit id and constraint id are the `reply` address. Graceful
settlement returns `{ state: 'closed' }`; authorization or caller-context refusal returns
`{ state: 'refused', code, message }`. Disconnect aborts the viewer and leaves no broker listener.
`{ state: 'closed' }` means this stream ended; it does not assert that the workflow settled.
Refusal returns that typed result as a plain terminating JSON-RPC response before any stream is
constructed. That method is for protocol-native clients: reaching it means the modern revision's
reserved `_meta` keys and the matching `MCP-Protocol-Version` and `Mcp-Method` headers, which
`createHTTPClientTransport` supplies on its own. [`mcp.md`](./mcp.md) carries the transport's worked
example, so this guide points at it rather than keeping a second copy. Client hookup, below, records
the exact commands each supported agent client needs and which part of this route each one can
actually reach.

The MCP server keeps its installed hostile-input limits at secure defaults. Because the stateless
transport owns its JSON parse rather than the application body middleware's cached parse, a narrow
front middleware uses the server package's byte collector to enforce `APP_BODY_BYTES`, then forwards
the still-unparsed bytes to MCP.

`TerminalOutput` remains the terminal-register composition piece, but this headless runtime does not
silently install it: its human path is the HTTP prompt codec. An embedding application owns the
terminal producer and can tee real output into an authorized workflow viewer explicitly:

```ts
import type { OutputStreamInterface } from '@orkestrel/terminal/server'
import { TerminalOutput, createLiveBroker } from '@app/server'

declare const output: OutputStreamInterface

const broker = createLiveBroker()
const terminal = new TerminalOutput('build', output, broker)
terminal.write('visible to the terminal and the live workflow viewer')
```

| Environment variable    | Default              | Application effect                                                                                                                                                         |
| ----------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `APP_PRINCIPALS`        | Generated first boot | Comma-separated `token:workflow[,workflow...]` roster; `*` grants all workflows. `APP_SETUP` alone derives an unreported process-local wildcard token for its human login. |
| `APP_USERS`             | From `APP_SETUP`     | JSON array of `name`, `secret`, and the `principal` token each human login borrows.                                                                                        |
| `APP_SETUP`             | Generated first boot | One password for the fixed `operator` login; provisional while it comes from the setup file, and refused beside `APP_USERS`.                                               |
| `APP_STORE`             | `memory`             | Select process-local supervision or a SQLite path; SQLite also selects a durable ledger and session table.                                                                 |
| `APP_WORKSPACE`         | `{cwd}/.supervisor`  | Root for the ledger and validated per-workflow provider workspaces; one live process owns it for its whole life and every other one refuses `CONFLICT` until it exits.     |
| `APP_ASSETS`            | `dist/app/browser`   | Filesystem browser-build root resolved against the startup working directory; startup requires its `index.html` shell. SEA uses the build-validated embedded blob instead. |
| `APP_JOURNAL_ENTRIES`   | `1,000`              | Maximum retained observations per unit.                                                                                                                                    |
| `APP_JOURNAL_BYTES`     | `65,536`             | Maximum retained serialized bytes per unit.                                                                                                                                |
| `APP_JOURNAL_AGE`       | `86,400,000` ms      | Maximum retained observation age.                                                                                                                                          |
| `APP_JOURNAL_NOTE`      | `4,096` bytes        | Maximum retained UTF-8 note bytes.                                                                                                                                         |
| `APP_LEASE`             | `30,000` ms          | Store tenure; after owner loss, wait for expiry, acquire the next epoch, and reconcile before work.                                                                        |
| `APP_LEDGER`            | `86,400,000` ms      | Human prompt timeout and pending/answered ticket retention.                                                                                                                |
| `APP_LIMIT`             | `60`                 | Requests admitted per token-or-IP key in one fixed window.                                                                                                                 |
| `APP_WINDOW`            | `60,000` ms          | Fixed-window limiter duration.                                                                                                                                             |
| `APP_SESSION_SECRET`    | Random per process   | Session cookie signing secret; required once `APP_STORE` persists sessions.                                                                                                |
| `APP_CSRF_SECRET`       | Random per process   | Independent double-submit signing secret; required on the same condition.                                                                                                  |
| `APP_SESSION_TTL`       | `28,800,000` ms      | Idle session expiry, which the live stream never refreshes.                                                                                                                |
| `APP_SESSION_LIFETIME`  | `86,400,000` ms      | Absolute session expiry counted from login, regardless of activity.                                                                                                        |
| `APP_AGENT_MODEL`       | `qwen3.5:2b-q4_K_M`  | Local model used by the application agent executor unless a provider is injected.                                                                                          |
| `APP_AGENT_URL`         | Provider default     | Absolute HTTP inference endpoint for the agent lane; absent keeps the local daemon default.                                                                                |
| `APP_AGENT_TIMEOUT`     | `360,000` ms         | Positive safe-integer inference deadline; three times the 120,000ms bound a loaded cold start exceeded without completing.                                                 |
| `APP_AGENT_KEEP`        | `5m`                 | Non-empty Ollama model-residency duration translated to provider `keepAlive`.                                                                                              |
| `APP_INFERENCE`         | Empty                | Comma-separated Claude, Codex, and Cursor deployment-policy roster.                                                                                                        |
| `APP_HOST` / `APP_PORT` | `127.0.0.1` / `3000` | Loopback-safe network bind.                                                                                                                                                |

`OLLAMA_LIVE_MODEL` belongs only to the isolated `service:ollama` proof; it never configures the
application runtime.

The application surface is intentionally explicit so its composition remains guide-audited even
though it is bundled rather than published.

| Name                              | Kind      | Application role                                                    |
| --------------------------------- | --------- | ------------------------------------------------------------------- |
| `APP_NAME`                        | const     | Shared application name.                                            |
| `APPLICATION_COMMAND_STATUS`      | const     | Shared command acknowledgement values.                              |
| `PROMPT_FORM_CONTRACT`            | const     | Answer-value contracts for all twelve human form controls.          |
| `PROMPT_VALUE_SHAPE`              | const     | Human-reply value hints keyed by form control.                      |
| `APP_HEALTH_PATH`                 | const     | Public application health route path.                               |
| `APP_ROSTER_PATH`                 | const     | Authenticated live-run and executor-command roster path.            |
| `APP_ROSTER_LIVE_PATH`            | const     | Authenticated live roster SSE route path.                           |
| `APP_ROSTER_EVENT`                | const     | Fixed SSE event name carrying one complete roster.                  |
| `APP_HISTORY_PATH`                | const     | Authenticated completed-history route path.                         |
| `APP_SESSION_PATH`                | const     | Human session resource path: self-view, login, and logout.          |
| `APP_SECRET_PATH`                 | const     | Session-only password-replacement route.                            |
| `APP_USERS_PATH`                  | const     | Managed-login directory route: read the roster, add one login.      |
| `APP_USER_PATH`                   | const     | One managed login's route: replace its grants, remove it.           |
| `APP_USER_SECRET_PATH`            | const     | One managed login's password-regeneration route.                    |
| `APP_WORKFLOW_PATH`               | const     | Workflow collection route path.                                     |
| `APP_WORKFLOW_INSPECT_PATH`       | const     | Authorized workflow snapshot route path.                            |
| `APP_WORKFLOW_PAUSE_PATH`         | const     | Authorized workflow pause route path.                               |
| `APP_WORKFLOW_RESUME_PATH`        | const     | Authorized workflow resume route path.                              |
| `APP_WORKFLOW_STOP_PATH`          | const     | Authorized workflow stop route path.                                |
| `APP_WORKFLOW_LIVE_PATH`          | const     | Authorized workflow SSE route path.                                 |
| `APP_WORKFLOW_JOURNAL_PATH`       | const     | Authorized workflow journal-tail route path.                        |
| `APP_UNIT_STOP_PATH`              | const     | Authorized supervised-unit stop route path.                         |
| `APP_UNIT_STEER_PATH`             | const     | Authorized supervised-unit steer route path.                        |
| `APP_UNIT_REPLY_PATH`             | const     | Authorized supervised-unit reply route path.                        |
| `APP_LEDGER_AGE`                  | const     | Default human-ticket retention.                                     |
| `APP_BROKER_BYTES`                | const     | Per-viewer live queue budget.                                       |
| `APP_LIMIT_COUNT`                 | const     | Default per-caller request count.                                   |
| `APP_LIMIT_WINDOW`                | const     | Default limiter window.                                             |
| `APP_SESSION_IDLE`                | const     | Default idle session expiry: eight hours.                           |
| `APP_SESSION_AGE`                 | const     | Default absolute session lifetime: twenty-four hours.               |
| `APP_CSRF_HEADER`                 | const     | Header a state-changing session request submits its token in.       |
| `APP_WORKSPACE_DIRECTORY`         | const     | Default workspace subdirectory.                                     |
| `APP_ASSETS_DIRECTORY`            | const     | Default browser-build directory.                                    |
| `APP_NUMBER_INPUT`                | const     | Numeric environment input bound.                                    |
| `APP_MODEL_INPUT`                 | const     | Application model input bound.                                      |
| `APP_AGENT_KEEP_INPUT`            | const     | Application agent keep-duration input bound.                        |
| `APP_AGENT_URL_INPUT`             | const     | Application agent endpoint input bound.                             |
| `APP_PRINCIPALS_INPUT`            | const     | Principal-roster input bound.                                       |
| `APP_USERS_INPUT`                 | const     | Human-user roster input bound.                                      |
| `APP_SECRET_INPUT`                | const     | Session and CSRF signing-secret input bound.                        |
| `APP_SETUP_FILE`                  | const     | The local overlay file the server reads beside the workspace.       |
| `APP_SETUP_USER`                  | const     | The generated first login's name.                                   |
| `APP_SETUP_BYTES`                 | const     | Random bytes behind one generated password.                         |
| `APP_TOKEN_BYTES`                 | const     | Random bytes behind one generated bearer token.                     |
| `APP_SETUP_LENGTH`                | const     | Minimum replacement password length.                                |
| `APP_SETUP_INPUT`                 | const     | Overlay file input bound.                                           |
| `APP_INFERENCE_INPUT`             | const     | Inference-vendor roster input bound.                                |
| `APP_WORKFLOW_LENGTH`             | const     | Workflow path-segment length bound.                                 |
| `APP_NAME_LENGTH`                 | const     | Managed login-name length bound, not an `APP_NAME` bound.           |
| `APP_GRANT_COUNT`                 | const     | Workflow grants accepted for one managed login: 64.                 |
| `APP_VERIFIER_PREFIX`             | const     | Key-derivation algorithm naming every stored password verifier.     |
| `APP_VERIFIER_VERSION`            | const     | Stored-verifier grammar version this deployment writes and accepts. |
| `APP_VERIFIER_COST`               | const     | Pinned scrypt CPU and memory cost (`N`).                            |
| `APP_VERIFIER_BLOCK`              | const     | Pinned scrypt block size (`r`).                                     |
| `APP_VERIFIER_PARALLEL`           | const     | Pinned scrypt parallelization (`p`).                                |
| `APP_VERIFIER_SALT`               | const     | Random salt bytes carried by one stored verifier.                   |
| `APP_VERIFIER_DIGEST`             | const     | Derived digest bytes carried by one stored verifier.                |
| `APP_HISTORY_COUNT`               | const     | Default completed runs per history page: 25.                        |
| `APP_HISTORY_MAXIMUM`             | const     | Maximum completed runs one history request may ask for: 50.         |
| `APP_HISTORY_INPUT`               | const     | Maximum encoded characters accepted for one history cursor.         |
| `OLLAMA_MODEL`                    | const     | Default local inference model.                                      |
| `OLLAMA_KEEP`                     | const     | Default local model residency.                                      |
| `OLLAMA_TIMEOUT`                  | const     | Default application agent inference deadline.                       |
| `INFERENCE_ERROR_MESSAGES`        | const     | Fixed public message for each inference failure code.               |
| `ApplicationErrorCode`            | type      | Application configuration and boundary failure vocabulary.          |
| `InferenceVendor`                 | type      | Claude, Codex, or Cursor backend vocabulary.                        |
| `InferenceErrorCode`              | type      | CLI launch, exit, protocol, and capability failure codes.           |
| `InferenceFrame`                  | type      | Delta, result, abort, or error relay frame.                         |
| `ApplicationCommandStatus`        | type      | Shared command acknowledgement vocabulary.                          |
| `ExecutorCommand`                 | type      | Browser-callable executor command vocabulary.                       |
| `TerminalStatus`                  | type      | The terminal members of workflow's own lifecycle vocabulary.        |
| `PromptOptionType`                | type      | JSON Schema value tags used by form-field answer contracts.         |
| `PromptOptionContract`            | type      | One form control's declarative answer-value rule.                   |
| `PromptFormContract`              | type      | Closed answer-property contract used to derive a field schema.      |
| `ApplicationEnvironment`          | type      | Host-independent environment record.                                |
| `ApplicationOverlay`              | type      | Flat documented `APP_*` string record the overlay file supplies.    |
| `LiveFrame`                       | type      | Observe, transcript, terminal, gap, or fault frame.                 |
| `BrokerFrame`                     | type      | The producer-authored frames the broker publishes; no gap.          |
| `ApplicationErrorOptions`         | interface | Typed application error construction.                               |
| `InferenceErrorOptions`           | interface | Typed CLI inference error construction.                             |
| `InferenceRequest`                | interface | Messages, streaming choice, and optional agent options.             |
| `Principal`                       | interface | Bearer identity and authorized workflows.                           |
| `ApplicationUser`                 | interface | One human login name, secret, and the principal it borrows.         |
| `ApplicationSession`              | interface | Self-view with independent optional provisional and confined facts. |
| `ApplicationSessionInput`         | interface | The exact `name` and `secret` a login submits.                      |
| `ApplicationSecretInput`          | interface | The exact `secret` a password replacement submits.                  |
| `ApplicationLogin`                | interface | One roster entry projected for its owner, without its token.        |
| `ApplicationDirectory`            | interface | The managed-login roster and whether the environment owns it.       |
| `ApplicationLoginInput`           | interface | One new managed login: its name and complete grant roster.          |
| `ApplicationGrantInput`           | interface | One replacement grant roster for an existing managed login.         |
| `ApplicationSecret`               | interface | One generated password, named and answered exactly once.            |
| `ApplicationSnapshot`             | interface | Workflow snapshot, live pause fact, and durable units.              |
| `ApplicationWorkflowInput`        | interface | Definition plus phase-ID/task-ID payloads.                          |
| `Executor`                        | interface | Executor name and advertised optional commands.                     |
| `ApplicationRun`                  | interface | One live run projected for roster discovery, with its pause fact.   |
| `ApplicationRoster`               | interface | Authorized live runs and executor commands.                         |
| `HistoryRun`                      | interface | One completed run joined with its supervisor release instant.       |
| `HistoryQuery`                    | interface | One decoded, bounded completed-history request.                     |
| `HistoryPage`                     | interface | Completed runs and the opaque token that asks for older ones.       |
| `ApplicationPolicy`               | interface | Fully parsed deployment policy with grouped agent settings.         |
| `ObserveFrame`                    | interface | Journal-admitted observation frame carrying its durable time.       |
| `ApplicationTail`                 | interface | Durable frames plus persisted terminal status.                      |
| `TranscriptFrame`                 | interface | Timestamped live-only provider transcript frame.                    |
| `TerminalFrame`                   | interface | Timestamped live-only terminal-output frame.                        |
| `GapFrame`                        | interface | Timestamped viewer discontinuity frame naming its own drop count.   |
| `FaultFrame`                      | interface | Timestamped broker projection failure naming the row it lost.       |
| `Packet`                          | interface | One value with its single serialization and that text's byte count. |
| `ViewerInterface`                 | interface | One single-consumer asynchronous view over an owned subscription.   |
| `LiveViewerInterface`             | interface | Workflow-addressed event-parked viewer.                             |
| `RosterViewerInterface`           | interface | Complete-state roster viewer; it adds no member of its own.         |
| `PromptAnswer`                    | interface | Form values keyed by field name for the reply boundary.             |
| `PromptCodecInterface`            | interface | String reply-seam codec.                                            |
| `AgentPayload`                    | interface | Plain agent payload carrying one non-empty `instruction`.           |
| `ApplicationError`                | class     | Typed application boundary failure.                                 |
| `InferenceError`                  | class     | Typed CLI inference boundary failure.                               |
| `PromptCodec`                     | class     | Exact form-values JSON codec.                                       |
| `hasApplicationControl`           | function  | Detect ASCII controls in application text.                          |
| `allowsWorkflow`                  | function  | Decide whether a copied grant roster admits one workflow.           |
| `resolveLiveFrameEvent`           | function  | Read the SSE event name a guarded live frame carries.               |
| `formatHistoryCursor`             | function  | Encode one catalog cursor as an opaque URL-safe token.              |
| `matchesFuzzy`                    | function  | Test whether a case-folded query is a subsequence of a value.       |
| `matchesRunName`                  | function  | Match a run name by case-insensitive fuzzy subsequence.             |
| `parseApplicationInteger`         | function  | Parse one positive integer policy knob.                             |
| `parseWorkflowSegment`            | function  | Validate a workflow id as one safe path segment.                    |
| `parseApplicationPrincipals`      | function  | Parse the bearer authorization roster.                              |
| `parseApplicationUsers`           | function  | Parse the human login roster against configured principals.         |
| `parseApplicationName`            | function  | Parse one trimmed, bounded, path-safe managed login name.           |
| `parseApplicationGrants`          | function  | Parse one grant roster: named workflows or the sole wildcard.       |
| `parseApplicationLoginInput`      | function  | Parse the exact `{ name, workflows }` a new login submits.          |
| `parseApplicationGrantInput`      | function  | Parse the exact `{ workflows }` a grant change submits.             |
| `parseApplicationSecret`          | function  | Parse one signing secret, requiring it for durable sessions.        |
| `parseApplicationSessionInput`    | function  | Parse one exact human credential body.                              |
| `parseApplicationSecretInput`     | function  | Parse one exact bounded replacement-secret body.                    |
| `parseApplicationOverlay`         | function  | Parse the strict flat overlay record, or refuse startup.            |
| `parseApplicationSetup`           | function  | Derive the one-operator roster from a setup password.               |
| `parseApplicationStore`           | function  | Parse memory-or-SQLite store selection.                             |
| `parseBearerToken`                | function  | Parse one strict Authorization header.                              |
| `parseApplicationPolicy`          | function  | Parse and default all deployment policy.                            |
| `parseInferenceRequest`           | function  | Own and validate one inference wire request.                        |
| `parseApplicationModel`           | function  | Parse and default the application agent model.                      |
| `parseApplicationKeep`            | function  | Parse and default the application agent residency duration.         |
| `parseApplicationURL`             | function  | Parse the optional application agent inference URL.                 |
| `parseHistoryCursor`              | function  | Decode one opaque history continuation token, or refuse it.         |
| `parseHistoryQuery`               | function  | Parse the exact bounded query the history route accepts.            |
| `parseHumanPrompt`                | function  | Parse a durable executor payload as a form schema.                  |
| `parseAgentInstruction`           | function  | Parse a plain agent payload's instruction.                          |
| `parsePromptAnswer`               | function  | Parse a keyed form-values record at an HTTP or MCP boundary.        |
| `matchesPromptValue`              | function  | Guard keyed values against one form schema.                         |
| `parsePromptOptions`              | function  | Parse exact keyed values against one form schema.                   |
| `parsePromptJSON`                 | function  | Parse one JSON reply carrier.                                       |
| `findPrincipal`                   | function  | Resolve a configured bearer identity.                               |
| `findApplicationUser`             | function  | Resolve one human login name in the current roster.                 |
| `resolveApplicationUserPrincipal` | function  | Resolve a login name to the principal it currently borrows.         |
| `userToLogin`                     | function  | Project one roster user as its token-free directory entry.          |
| `authorizePrincipal`              | function  | Enforce workflow authorization.                                     |
| `inferenceFailureFrame`           | function  | Project provider failures without leaking diagnostics.              |
| `isPrincipal`                     | function  | Guard unverified caller context as an application principal.        |
| `isApplicationUser`               | function  | Guard one configured human user entry.                              |
| `isApplicationVerifier`           | function  | Guard one stored verifier against the pinned scrypt profile.        |
| `isApplicationOverlay`            | function  | Guard a flat documented overlay record.                             |
| `isApplicationError`              | function  | Guard typed application failures.                                   |
| `isInferenceError`                | function  | Guard typed CLI inference failures.                                 |
| `isExecutorCommand`               | function  | Guard browser-callable executor commands.                           |
| `isTerminalStatus`                | function  | Guard a workflow status eligible for completed history.             |
| `isInferenceVendor`               | function  | Guard the supported inference vendor vocabulary.                    |
| `createPacket`                    | function  | Serialize one value once into the faces its consumers read.         |
| `createPromptCodec`               | function  | Create the reply-seam codec.                                        |
| `createApplicationPassword`       | function  | Generate one grouped-hex password for any managed login.            |
| `createApplicationToken`          | function  | Generate one bearer token.                                          |

| Name                               | Kind      | Server-composition role                                                                                           |
| ---------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| `DEFAULT_APP_HOST`                 | const     | Loopback bind default.                                                                                            |
| `DEFAULT_APP_PORT`                 | const     | Server port default.                                                                                              |
| `APP_HOST_LABEL_PATTERN`           | const     | Valid syntax for one DNS host label.                                                                              |
| `APP_NUMERIC_HOST_PATTERN`         | const     | Numeric-looking invalid-host detector.                                                                            |
| `APP_BODY_BYTES`                   | const     | Maximum JSON request bytes.                                                                                       |
| `APP_AGENT_NOTE`                   | const     | Maximum mapped agent-note bytes.                                                                                  |
| `APP_LEASE_FILE`                   | const     | Workspace-root file whose held lock is the ownership proof.                                                       |
| `APP_LEASE_SIDECAR`                | const     | Workspace-root file naming the current holder for an operator.                                                    |
| `APP_LEDGER_FILE`                  | const     | Workspace-root file holding the durable human-prompt ledger.                                                      |
| `APP_LEASE_BUSY_CODES`             | const     | SQLite primary result codes in the busy family alone.                                                             |
| `APP_INFERENCE_TIMEOUT`            | const     | Default CLI inference completion bound.                                                                           |
| `APP_INFERENCE_GRACE`              | const     | CLI process-group termination grace.                                                                              |
| `APP_HANDOFF_TIMEOUT`              | const     | Same-application SEA handoff probe bound.                                                                         |
| `APP_INFERENCE_PATH`               | const     | Authenticated opaque-key inference relay route.                                                                   |
| `APP_MCP_PATH`                     | const     | Stateless MCP Streamable-HTTP route.                                                                              |
| `APP_SESSION_COOKIE`               | const     | Signed host-only cookie carrying the opaque session id.                                                           |
| `APP_CSRF_COOKIE`                  | const     | Signed double-submit cookie carrying the CSRF token.                                                              |
| `APP_SESSION_USER_KEY`             | const     | The first of the two keys a session retains: its user's name.                                                     |
| `APP_SESSION_STAMP_KEY`            | const     | The second: the stamp of the verifier that admitted that user.                                                    |
| `APP_SESSION_STAMP_LENGTH`         | const     | Base64url characters retained from that verifier stamp.                                                           |
| `APP_VERIFIER_MAXMEM`              | const     | Memory ceiling every scrypt derivation runs under.                                                                |
| `APP_VERIFIER_CONCURRENCY`         | const     | Simultaneous login derivations one handler admits.                                                                |
| `APP_MCP_VERSION`                  | const     | Fixed application-projection identity version.                                                                    |
| `APPLICATION_WORKFLOW_CONTRACT`    | const     | Frozen installed workflow definition boundary.                                                                    |
| `SUPERVISOR_TOOL_SCHEMA`           | const     | Mutating supervisor command JSON Schema.                                                                          |
| `OBSERVER_TOOL_SCHEMA`             | const     | Read-only observer command JSON Schema.                                                                           |
| `WORKFLOW_ARGUMENT_SCHEMA`         | const     | Workflow-id argument shared by both tool schemas.                                                                 |
| `buildPromptFormSchemas`           | function  | Build human payload schemas from the app-core form contract.                                                      |
| `deriveSupervisorToolSchema`       | function  | Derive the served schema with live executor behavior names.                                                       |
| `SUPERVISOR_TOOL_DESCRIPTION`      | const     | The whole manual a model gets for the mutating tool.                                                              |
| `OBSERVER_TOOL_DESCRIPTION`        | const     | The whole manual a model gets for the read-only tool.                                                             |
| `APP_RESULT_KEYS`                  | const     | Maximum total keys admitted in one projected MCP result.                                                          |
| `APP_WATCH_FRAMES`                 | const     | Maximum frames in one observer watch page.                                                                        |
| `APP_WATCH_BYTES`                  | const     | Maximum serialized bytes in one observer watch page.                                                              |
| `APP_CURSOR_MARKS`                 | const     | Maximum unit marks in one observer watch cursor.                                                                  |
| `APP_CURSOR_BYTES`                 | const     | Maximum empty-page bytes carrying one observer watch cursor.                                                      |
| `APP_IDENTIFIER_LENGTH`            | const     | Maximum identifier characters retained in one protocol message.                                                   |
| `APP_IDENTIFIER_CANDIDATES`        | const     | Maximum identifier candidates named in one protocol message.                                                      |
| `WORKFLOW_EXPECTATION`             | const     | Product expectation phrases keyed by workflow fault kind.                                                         |
| `ApplicationBodyParser`            | type      | JSON request-record parser.                                                                                       |
| `WorkflowDefinitionParser`         | type      | Workflow definition parser.                                                                                       |
| `WorkspaceExecutorFactory`         | type      | Workspace-bound executor builder.                                                                                 |
| `ApplicationAssetLookupHandler`    | type      | Partial embedded-asset lookup by browser-relative path.                                                           |
| `ApplicationAssetReadHandler`      | type      | Total reader for one known native embedded asset.                                                                 |
| `ApplicationServerProbeHandler`    | type      | Asynchronous same-application origin probe.                                                                       |
| `ApplicationSetupWriteHandler`     | type      | Exclusive owner-only overlay write seam.                                                                          |
| `ApplicationServerOpenHandler`     | type      | Host-platform application-origin opener.                                                                          |
| `ApplicationAddressLookupHandler`  | type      | One-shot host-to-numeric-address resolver.                                                                        |
| `SupervisorCommand`                | type      | Exact five-arm mutating tool command.                                                                             |
| `ObserverCommand`                  | type      | Exact two-arm read tool command.                                                                                  |
| `SupervisorStreamResult`           | type      | Honest closed-or-refused stream result.                                                                           |
| `CLIEvent`                         | type      | Shared content, completion, or failure backend event.                                                             |
| `CLIBackendInput`                  | interface | Stdin prompt plus optional native model.                                                                          |
| `CLIBackendInterface`              | interface | Stateless vendor argv and frame translation.                                                                      |
| `CLIProviderOptions`               | interface | Backend, model, directory, lifecycle, and environment.                                                            |
| `InferenceRoster`                  | type      | Mounted vendor-to-provider roster.                                                                                |
| `InferenceStreamOptions`           | interface | Provider, parsed request, and abort boundary.                                                                     |
| `ApplicationHandlersOptions`       | interface | Application, codec, and inference handler collaborators.                                                          |
| `ApplicationState`                 | interface | Readonly view of one request-owned context entity.                                                                |
| `ApplicationServerOptions`         | interface | Direct server collaborators.                                                                                      |
| `ApplicationSetupInterface`        | interface | Overlay owner with terminal truth and a live replaceable roster.                                                  |
| `ApplicationSetupOptions`          | interface | Working directory, environment, and write-seam injection.                                                         |
| `ApplicationServerInterface`       | interface | Composed server lifecycle owning its exact setup.                                                                 |
| `ApplicationServerRunnerEventMap`  | type      | Ready, SEA handoff, and lifecycle-failure outcomes.                                                               |
| `ApplicationServerRunnerInterface` | interface | Signal-owning lifecycle with a readonly observable `emitter`.                                                     |
| `ApplicationServerRunnerOptions`   | interface | Initial hooks, listener-error handling, and SEA collaborators.                                                    |
| `SupervisorCommandResult`          | interface | Workflow-addressed command acknowledgement.                                                                       |
| `ObserverMark`                     | interface | One unit-local durable observation position.                                                                      |
| `ObserverWatchResult`              | interface | Bounded observation page, cursor, and drain flags.                                                                |
| `WorkflowFault`                    | type      | Position-free workflow fault fields used in application copy.                                                     |
| `MCPProjectionOptions`             | interface | Application and prompt-codec collaborators.                                                                       |
| `ApplicationUnitManagerInterface`  | interface | Authorized unit commands.                                                                                         |
| `ApplicationInterface`             | interface | Workflow/unit application plus principal-free executor registry.                                                  |
| `HumanTicket`                      | interface | Durable prompt carrying its validated schema and own status.                                                      |
| `HumanTicketRow`                   | interface | Serialized ticket database row.                                                                                   |
| `HumanWaiter`                      | interface | Process-local ticket waiter.                                                                                      |
| `HumanLedgerInterface`             | interface | Durable prompt persistence and wakeup.                                                                            |
| `HumanPromptInterface`             | interface | Independently stoppable terminal prompt lifecycle.                                                                |
| `HumanExecutorOptions`             | interface | Human executor collaborators.                                                                                     |
| `AgentExecutorOptions`             | interface | Agent provider and note policy.                                                                                   |
| `LiveBrokerOptions`                | interface | Viewer budget plus optional durable replay collaborators.                                                         |
| `RelayPullHandler`                 | type      | Read one owner's retention for one parked read.                                                                   |
| `RelayOptions`                     | interface | Owner name, retention, readiness, and teardown collaborators.                                                     |
| `RelayInterface`                   | interface | One parked single-consumer handoff, with readonly `events`, `parked`, and `destroyed`, over an owner's retention. |
| `LiveFrameHandler`                 | type      | Offer one live frame packet to a viewer's bounded queue.                                                          |
| `LiveViewerOptions`                | interface | Workflow, budget, replay, attach, and release collaborators.                                                      |
| `LiveReplay`                       | interface | Bounded observation-only replay packets plus stream-closed state.                                                 |
| `LiveBrokerInterface`              | interface | Workflow-scoped bounded fan-out, holding the process roster broker.                                               |
| `RosterSnapshotHandler`            | type      | Offer one complete roster snapshot to a coalescing viewer.                                                        |
| `RosterViewerOptions`              | interface | Grants, first snapshot, and the broker's attach and release seams.                                                |
| `RosterBrokerInterface`            | interface | Complete-state roster fan-out with one pending snapshot per viewer.                                               |
| `ApplicationRosterPumpHandler`     | type      | Pump one roster viewer through an opened response stream.                                                         |
| `WorkflowTranscriptInterface`      | interface | Workflow-correlated transcript sink.                                                                              |
| `ApplicationOptions`               | interface | Application composition collaborators.                                                                            |
| `ApplicationPersistenceOptions`    | interface | Driver plus lease and session tenure for one durable context.                                                     |
| `ApplicationPersistenceInterface`  | interface | One merged durable context and its admitted store views.                                                          |
| `LaneWorkflowStoreOptions`         | interface | Shared lane and the workflow store it admits.                                                                     |
| `LaneSessionStoreOptions`          | interface | Shared lane and the session store it admits.                                                                      |
| `HumanLedgerOptions`               | interface | Ledger driver and retention.                                                                                      |
| `WorkspaceExecutorOptions`         | interface | Per-workflow provider construction.                                                                               |
| `ApplicationLeaseOptions`          | interface | The one workspace root a lease takes.                                                                             |
| `ApplicationLeaseHolder`           | interface | Diagnostic identity of the process holding a root.                                                                |
| `ApplicationLeaseInterface`        | interface | Single-process ownership of one workspace root.                                                                   |
| `ApplicationRuntimeInterface`      | interface | Pre-bind assembled runtime.                                                                                       |
| `ApplicationRuntimeOptions`        | interface | Runtime environment and injected seams.                                                                           |
| `AgentExecution`                   | class     | Agent stream projected as supervised execution.                                                                   |
| `AgentExecutor`                    | class     | Local inference executor with no probe.                                                                           |
| `ApplicationFunctionExecution`     | class     | Observable wrapper over real function execution.                                                                  |
| `ApplicationFunctionExecutor`      | class     | Function executor used by the HTTP sample.                                                                        |
| `ApplicationHandlers`              | class     | Fetch-standard application handlers.                                                                              |
| `ApplicationContext`               | class     | Request state entity owning authentication and body writes.                                                       |
| `ApplicationUnitHandlers`          | class     | Unit handlers nested under the `units` route surface.                                                             |
| `ApplicationRosterHandlers`        | class     | Roster handlers nested under the roster read and live surface.                                                    |
| `ApplicationUserHandlers`          | class     | Managed-login handlers behind the wildcard-session gate.                                                          |
| `ApplicationRoutes`                | class     | Installed dispatcher and literal route table.                                                                     |
| `ApplicationRuntime`               | class     | Store, journal, executors, ledger, and broker composition.                                                        |
| `ApplicationLease`                 | class     | Kernel-released exclusive ownership of one workspace root.                                                        |
| `ApplicationPersistence`           | class     | One database, one lane, and the three stores composed over them.                                                  |
| `LaneWorkflowStore`                | class     | Workflow snapshots admitted through the shared durable lane.                                                      |
| `LaneSessionStore`                 | class     | Sessions admitted through that same lane.                                                                         |
| `ApplicationServer`                | class     | Router/middleware/server composition.                                                                             |
| `ApplicationSetup`                 | class     | Local overlay discovery, first-boot generation, live replacement.                                                 |
| `ApplicationServerRunner`          | class     | Generation-safe signal owner.                                                                                     |
| `ApplicationUnitManager`           | class     | Workflow-authorized unit controls.                                                                                |
| `ClaudeCLIBackend`                 | class     | Claude no-tools argv and stream-json translator.                                                                  |
| `CLIProvider`                      | class     | Shared one-shot coding-harness inference engine.                                                                  |
| `InferenceStream`                  | class     | Pull-driven NDJSON response over one provider stream.                                                             |
| `CodexCLIBackend`                  | class     | Codex read-only argv and JSON Lines translator.                                                                   |
| `CursorCLIBackend`                 | class     | Cursor trusted-headless argv and stream-json translator.                                                          |
| `HumanExecution`                   | class     | Durable prompt result and observations.                                                                           |
| `HumanExecutor`                    | class     | Prompt broker plus durable-ledger executor.                                                                       |
| `HumanLedger`                      | class     | Memory/SQLite human ticket ledger.                                                                                |
| `HumanPrompt`                      | class     | Per-request composition over terminal prompt brokers.                                                             |
| `LiveBroker`                       | class     | Bounded live fan-out.                                                                                             |
| `LiveViewer`                       | class     | One parked byte-bounded subscription.                                                                             |
| `Relay`                            | class     | The one parked-handoff engine, owning no retention of its own.                                                    |
| `RosterBroker`                     | class     | Complete-roster fan-out, delegating grant filtering to viewers.                                                   |
| `RosterViewer`                     | class     | One parked roster subscription retaining only the newest snapshot.                                                |
| `MCPProjection`                    | class     | Composed MCP server with command, read, and stream surfaces.                                                      |
| `SupervisorApplication`            | class     | Caller-owned workflow composition.                                                                                |
| `TerminalOutput`                   | class     | Real-output-preserving terminal tee.                                                                              |
| `WorkflowTranscript`               | class     | Live-only provider transcript bridge.                                                                             |
| `WorkspaceProviderExecutor`        | class     | Per-workflow provider workspace router.                                                                           |
| `applicationErrorStatus`           | function  | Map application errors to HTTP status.                                                                            |
| `toApplicationError`               | function  | Normalize unknown application failures.                                                                           |
| `parseApplicationHost`             | function  | Parse the server host.                                                                                            |
| `parseApplicationPort`             | function  | Parse the server port.                                                                                            |
| `parseApplicationServerOptions`    | function  | Own direct server options.                                                                                        |
| `isApplicationEnvironment`         | function  | Guard environment values.                                                                                         |
| `isApplicationAddressLookup`       | function  | Guard the provisional host-resolution seam.                                                                       |
| `isApplicationAssetReader`         | function  | Guard the embedded-asset reader seam.                                                                             |
| `isAgentProvider`                  | function  | Guard the borrowed agent seam.                                                                                    |
| `isCLIBackend`                     | function  | Guard a trusted CLI backend injection.                                                                            |
| `parseWorkflowDefinition`          | function  | Validate through workflow's installed contract.                                                                   |
| `parseApplicationWorkflow`         | function  | Own a definition and validate its ID-addressed payloads.                                                          |
| `parseSupervisorCommand`           | function  | Parse one exact mutating command arm.                                                                             |
| `parseObserverCommand`             | function  | Parse one exact read-only observer command arm.                                                                   |
| `parseObserverCursor`              | function  | Parse one bounded vector of unit observation marks.                                                               |
| `parseSupervisorWorkflow`          | function  | Parse a protocol-safe workflow address.                                                                           |
| `parseSupervisorWatch`             | function  | Parse modern watch parameters.                                                                                    |
| `formatApplicationKeyMismatch`     | function  | Format missing and unexpected protocol-key clauses.                                                               |
| `formatIdentifiers`                | function  | Format one bounded list of protocol identifier candidates.                                                        |
| `formatIdentifier`                 | function  | JSON-encode one length-bounded protocol identifier.                                                               |
| `formatWorkflowFault`              | function  | Translate one installed workflow fault into product voice.                                                        |
| `formatWorkflowLevel`              | function  | Enforce one workflow level's app-owned strictness.                                                                |
| `formatWorkflowPhaseSubject`       | function  | Name one phase by id or its consistently quoted definition path.                                                  |
| `formatWorkflowTaskSubject`        | function  | Name one task by id or its consistently quoted definition path.                                                   |
| `parseApplicationBody`             | function  | Require a JSON object body.                                                                                       |
| `measureWatchPage`                 | function  | Compute exact observer watch-page bytes.                                                                          |
| `buildObserveFrame`                | function  | Build a journal-admitted live frame.                                                                              |
| `deriveObserveFrameKey`            | function  | Derive the replay/live observation identity.                                                                      |
| `compareObserveFrames`             | function  | Order observation frames deterministically.                                                                       |
| `boundObserveFrames`               | function  | Retain the newest count-and-byte-bounded packet suffix.                                                           |
| `projectObserverWatch`             | function  | Project one bounded observer page from a tail and cursor.                                                         |
| `liveFrameToMCPNotification`       | function  | Map an authorized frame to its MCP notification.                                                                  |
| `requireApplicationResult`         | function  | Unwrap or throw one typed application result.                                                                     |
| `buildSupervisorCommandResult`     | function  | Build an immutable command acknowledgement.                                                                       |
| `createApplicationState`           | function  | Build extensible request-owned state.                                                                             |
| `extractApplicationCaller`         | function  | Read the authenticated principal for MCP caller delivery.                                                         |
| `createWorkflowTranscriptHandler`  | function  | Bind transcript fragments to a durable workflow.                                                                  |
| `authenticateApplicationState`     | function  | Install and return a bearer principal, or return undefined.                                                       |
| `matchesApplicationSession`        | function  | Match the one anonymous route the session battery may mint on.                                                    |
| `requireApplicationManager`        | function  | Require a session authorized for every workflow, or refuse.                                                       |
| `matchesApplicationSecret`         | function  | Compare one submitted secret against a stored verifier.                                                           |
| `deriveStamp`                      | function  | Derive the short session binding one stored verifier earns.                                                       |
| `buildApplicationDirectory`        | function  | Project a live roster as its secret-incapable directory.                                                          |
| `resolveApplicationToken`          | function  | Mint one login's replacement token, retiring only an unborrowed one.                                              |
| `formatApplicationPrincipals`      | function  | Serialize a principal roster back into its accepted grammar.                                                      |
| `matchesApplicationLoopback`       | function  | Judge one parsed host or numeric address as loopback.                                                             |
| `composeApplicationEnvironment`    | function  | Lay defined process values over the overlay, key by key.                                                          |
| `hasApplicationRoster`             | function  | Detect whether an environment names any roster source.                                                            |
| `ownApplicationEnvironment`        | function  | Copy only the defined string entries of a process environment.                                                    |
| `resolveApplicationHost`           | function  | Resolve once and select a numeric provisional loopback bind.                                                      |
| `formatApplicationOverlay`         | function  | Render one overlay record as its durable file text.                                                               |
| `writeApplicationSetup`            | function  | Write the overlay exclusively, owner-only where the host honours it.                                              |
| `replaceApplicationSetup`          | function  | Replace the overlay atomically through an owner-only sibling.                                                     |
| `renderApplicationSetup`           | function  | Render the provisional login block, or nothing when none applies.                                                 |
| `isNodeErrorCode`                  | function  | Guard one Node error by its code.                                                                                 |
| `isSQLiteBusy`                     | function  | Tell a contended lock from every other SQLite failure.                                                            |
| `isApplicationLeaseHolder`         | function  | Guard the diagnostic workspace-lease sidecar.                                                                     |
| `isApplicationSetup`               | function  | Guard the setup contract.                                                                                         |
| `renderApplicationJSON`            | function  | Render one no-store JSON application response.                                                                    |
| `renderApplicationError`           | function  | Render a caught failure as the stable public error shape.                                                         |
| `deriveHumanTicketId`              | function  | Derive a token/prompt ledger key.                                                                                 |
| `isHumanTicket`                    | function  | Guard a retained ticket.                                                                                          |
| `matchesApplicationKeys`           | function  | Guard an exact application record key set.                                                                        |
| `agentChunkToObservation`          | function  | Map an agent chunk to workflow activity.                                                                          |
| `formatInferencePrompt`            | function  | Flatten ordered messages into one role-labelled prompt.                                                           |
| `identifyInferenceMessages`        | function  | Add stable request-local identities to parsed messages.                                                           |
| `parseTokenUsage`                  | function  | Parse exact aggregate agent token usage.                                                                          |
| `requireApplicationPrincipal`      | function  | Require middleware-installed identity.                                                                            |
| `parseExecutionWorkflow`           | function  | Parse workflow correlation from an execution token.                                                               |
| `buildApplicationPhases`           | function  | Map task payloads to workflow metadata.                                                                           |
| `matchesWorkflowDefinition`        | function  | Compare retained workflow definitions.                                                                            |
| `createApplicationAccess`          | function  | Create the fail-closed bearer-or-session credential arbiter.                                                      |
| `createApplicationCSRF`            | function  | Create the session-only double-submit CSRF middleware.                                                            |
| `createApplicationAssets`          | function  | Create embedded-browser-asset middleware.                                                                         |
| `createApplicationMCPBoundary`     | function  | Bound raw MCP bytes before protocol parsing.                                                                      |
| `probeApplicationServer`           | function  | Probe an origin for this application's health identity.                                                           |
| `reportApplicationServerError`     | function  | Report a sanitized process failure.                                                                               |
| `createLiveBroker`                 | function  | Create the bounded broker.                                                                                        |
| `createMCPProjection`              | function  | Create the composed application MCP server.                                                                       |
| `createHumanLedger`                | function  | Create durable human persistence.                                                                                 |
| `createHumanExecutor`              | function  | Create the human executor.                                                                                        |
| `createAgentExecutor`              | function  | Create the local agent executor.                                                                                  |
| `createClaudeCLIBackend`           | function  | Create the Claude CLI backend.                                                                                    |
| `createCodexCLIBackend`            | function  | Create the Codex CLI backend.                                                                                     |
| `createCursorCLIBackend`           | function  | Create the Cursor CLI backend.                                                                                    |
| `createCLIProvider`                | function  | Create the shared CLI inference provider.                                                                         |
| `createWorkspaceProviderExecutor`  | function  | Create the per-workflow provider wrapper.                                                                         |
| `createApplicationRuntime`         | function  | Assemble pre-bind resources.                                                                                      |
| `createApplicationAssetReader`     | function  | Create a guarded reader over native embedded asset keys.                                                          |
| `createApplicationVerifier`        | function  | Compile one plaintext secret into the pinned verifier grammar.                                                    |
| `createApplicationServer`          | function  | Create a stopped application server.                                                                              |
| `createApplicationSetup`           | function  | Create the local-overlay setup owner.                                                                             |
| `startApplicationServer`           | function  | Start and return an explicit runner handle.                                                                       |

Those rows carry data only; the `ApplicationInterface` row includes its readonly, principal-free
`executors` registry. Every call-signature member behind them — the workflow and unit commands, the
server and runner lifecycles, the request-state, ledger, broker, transcript, and codec seams,
including the `roster` read that pairs the registry with authorized live runs — is tabled under
[`## Methods`](#methods).

The core policy and codec can be exercised without a host:

```ts
import {
	APP_INFERENCE_INPUT,
	INFERENCE_ERROR_MESSAGES,
	allowsWorkflow,
	authorizePrincipal,
	createPacket,
	createPromptCodec,
	findApplicationUser,
	findPrincipal,
	formatHistoryCursor,
	hasApplicationControl,
	isTerminalStatus,
	matchesFuzzy,
	matchesRunName,
	resolveLiveFrameEvent,
	isApplicationError,
	isApplicationUser,
	isApplicationVerifier,
	isExecutorCommand,
	isInferenceError,
	isInferenceVendor,
	inferenceFailureFrame,
	isPrincipal,
	matchesPromptValue,
	parseAgentInstruction,
	parseApplicationGrantInput,
	parseApplicationGrants,
	parseApplicationInteger,
	parseApplicationKeep,
	parseApplicationLoginInput,
	parseApplicationModel,
	parseApplicationName,
	parseApplicationURL,
	parseApplicationPolicy,
	parseApplicationPrincipals,
	parseApplicationSecret,
	parseApplicationSessionInput,
	parseApplicationStore,
	parseApplicationUsers,
	parseBearerToken,
	resolveApplicationUserPrincipal,
	userToLogin,
	parseHistoryCursor,
	parseHistoryQuery,
	parseHumanPrompt,
	parseInferenceRequest,
	parsePromptAnswer,
	parsePromptJSON,
	parsePromptOptions,
	parseWorkflowSegment,
} from '@app/core'
import type { InferenceFrame, InferenceRequest, LiveFrame } from '@app/core'

declare const frame: LiveFrame

const principals = parseApplicationPrincipals('token:build')
const principal = findPrincipal(principals, 'token')
if (principal === undefined) throw new Error('principal missing')
authorizePrincipal(principal, parseWorkflowSegment('build'))
allowsWorkflow(principal.workflows, 'build')
resolveLiveFrameEvent(frame)
const packet = createPacket(frame)
packet.text // the frame's canonical JSON, written to the wire without a second serialization
packet.bytes // that text's UTF-8 byte length, which is what the viewer's budget spends
const token = formatHistoryCursor({
	until: 1_800_000_000_000,
	updated: 1_799_999_999_000,
	id: 'build',
})
parseHistoryCursor(token)
parseHistoryQuery(new URLSearchParams({ limit: '25', name: 'release', prefix: 'release-' }))
matchesRunName('Release 4.1', 'release')
matchesFuzzy('Release 4.1', 'r41')
isTerminalStatus('completed')
const roster = '[{"name":"operator","secret":"winter-harbour-42","principal":"token"}]'
const users = parseApplicationUsers(roster, principals)
findApplicationUser(users, 'operator')
isApplicationUser(users[0])
resolveApplicationUserPrincipal(users, principals, 'operator')
const managed = users[0]
if (managed !== undefined) userToLogin(managed, principals)
parseApplicationName('  ada  ')
parseApplicationGrants(['build', 'release'])
parseApplicationLoginInput({ name: 'ada', workflows: ['build'] })
parseApplicationGrantInput({ workflows: ['*'] })
isApplicationVerifier(
	'scrypt$1$32768$8$3$AQIDBAUGBwgJCgsMDQ4PEA$AwoRGB8mLTQ7QklQV15lbHN6gYiPlp2kq7K5wMfO1dw',
)
parseApplicationSecret(undefined, 'APP_SESSION_SECRET', false)
parseApplicationSessionInput({ name: 'operator', secret: 'winter-harbour-42' })
parseApplicationSecretInput({ secret: 'winter-harbour-42' })
const overlay = parseApplicationOverlay('{"APP_SETUP":"3f9c1-7ae4b-8d206-5c1fa-9b3e7-04d8c"}')
isApplicationOverlay(overlay)
parseApplicationSetup('3f9c1-7ae4b-8d206-5c1fa-9b3e7-04d8c', principals)
const password = createApplicationPassword()
const token2 = createApplicationToken()
const policy = parseApplicationPolicy({ APP_PRINCIPALS: 'token:build', APP_USERS: roster })
policy.agent
const inference: InferenceRequest = parseInferenceRequest({
	messages: [{ role: 'user', content: 'Summarize the build.' }],
	stream: true,
})
const inferenceFrame: InferenceFrame = {
	event: 'error',
	code: 'UNSUPPORTED',
	message: 'Tools are unavailable',
}
parseApplicationInteger('60', 'APP_LIMIT', 60)
parseApplicationKeep('5m')
parseApplicationURL('http://127.0.0.1:11434')
parseApplicationModel('qwen3.5:2b-q4_K_M')
parseApplicationStore('memory')
parseBearerToken('Bearer token')
hasApplicationControl('build')
parseAgentInstruction({ instruction: 'summarize' })
const schema = parseHumanPrompt({
	fields: [{ control: 'confirm', name: 'approve', label: 'Approve?' }],
})
const answer = parsePromptAnswer({ approve: true })
parsePromptOptions(schema, answer)
matchesPromptValue(schema, answer)
const codec = createPromptCodec()
const encoded = codec.encode(answer)
if (encoded.success) {
	parsePromptJSON(encoded.value)
	codec.decode(schema, encoded.value)
}
isApplicationError(new Error('boundary'))
isExecutorCommand('stop')
isInferenceError(new Error('inference boundary'))
isInferenceVendor('claude')
isPrincipal(principal)
APP_INFERENCE_INPUT
INFERENCE_ERROR_MESSAGES
inferenceFailureFrame(new Error('provider failure'))
void inference
void inferenceFrame
```

The server composition exposes its leaves for focused tests while classes own stateful lifecycle:

```ts
import {
	createPacket,
	createPromptCodec,
	parseApplicationPolicy,
	type ApplicationError,
} from '@app/core'
import type {
	MessageInterface,
	ProviderInterface as AgentProviderInterface,
} from '@orkestrel/agent'
import type { Observation, UnitSnapshot } from '@orkestrel/supervisor'
import type { ProviderInterface as ProcessProviderInterface } from '@orkestrel/supervisor/server'
import type {
	ApplicationState,
	CLIBackendInput,
	CLIEvent,
	CLIProviderOptions,
	HumanTicket,
	InferenceRoster,
	InferenceStreamOptions,
	WorkflowTranscriptInterface,
} from '@app/server'
import { definitionToSnapshot } from '@orkestrel/workflow'
import {
	APPLICATION_WORKFLOW_CONTRACT,
	agentChunkToObservation,
	applicationErrorStatus,
	authenticateApplicationState,
	buildApplicationPhases,
	buildObserveFrame,
	buildPromptFormSchemas,
	buildSupervisorCommandResult,
	parseTokenUsage,
	boundObserveFrames,
	buildApplicationDirectory,
	HumanPrompt,
	ClaudeCLIBackend,
	CLIProvider,
	CodexCLIBackend,
	compareObserveFrames,
	createAgentExecutor,
	createApplicationAccess,
	createApplicationAssetReader,
	createApplicationAssets,
	createApplicationCSRF,
	createApplicationMCPBoundary,
	createApplicationRuntime,
	createApplicationServer,
	createApplicationState,
	createApplicationVerifier,
	createClaudeCLIBackend,
	createCLIProvider,
	createCodexCLIBackend,
	createCursorCLIBackend,
	createHumanExecutor,
	createHumanLedger,
	createLiveBroker,
	createMCPProjection,
	createWorkspaceProviderExecutor,
	createWorkflowTranscriptHandler,
	CursorCLIBackend,
	deriveHumanTicketId,
	deriveObserveFrameKey,
	deriveStamp,
	deriveSupervisorToolSchema,
	extractApplicationCaller,
	formatApplicationKeyMismatch,
	formatApplicationPrincipals,
	formatIdentifiers,
	formatInferencePrompt,
	formatIdentifier,
	formatWorkflowFault,
	formatWorkflowLevel,
	formatWorkflowPhaseSubject,
	formatWorkflowTaskSubject,
	APP_INFERENCE_GRACE,
	APP_INFERENCE_PATH,
	APP_INFERENCE_TIMEOUT,
	identifyInferenceMessages,
	InferenceStream,
	isAgentProvider,
	isApplicationAddressLookup,
	isApplicationAssetReader,
	isApplicationEnvironment,
	isApplicationLeaseHolder,
	isCLIBackend,
	isHumanTicket,
	isSQLiteBusy,
	liveFrameToMCPNotification,
	matchesApplicationKeys,
	matchesApplicationSecret,
	matchesApplicationSession,
	matchesWorkflowDefinition,
	measureWatchPage,
	parseApplicationBody,
	parseExecutionWorkflow,
	parseApplicationHost,
	parseApplicationPort,
	parseApplicationServerOptions,
	parseApplicationWorkflow,
	parseObserverCommand,
	parseSupervisorCommand,
	parseObserverCursor,
	parseSupervisorWatch,
	parseSupervisorWorkflow,
	parseWorkflowDefinition,
	probeApplicationServer,
	projectObserverWatch,
	renderApplicationError,
	renderApplicationJSON,
	renderApplicationSetup,
	replaceApplicationSetup,
	reportApplicationServerError,
	resolveApplicationHost,
	resolveApplicationToken,
	requireApplicationManager,
	requireApplicationPrincipal,
	requireApplicationResult,
	startApplicationServer,
	toApplicationError,
} from '@app/server'

declare const agent: AgentProviderInterface
declare const applicationError: ApplicationError
declare const human: Parameters<typeof createHumanExecutor>[0]
declare const ledger: Parameters<typeof createHumanLedger>[0]
declare const observation: Observation
declare const processProvider: () => ProcessProviderInterface
declare const state: ApplicationState
declare const ticket: HumanTicket
declare const transcript: WorkflowTranscriptInterface
declare const unit: UnitSnapshot

const environment = {
	APP_PRINCIPALS: 'token:*',
	APP_USERS: '[{"name":"operator","secret":"winter-harbour-42","principal":"token"}]',
}
const inferenceMessages: readonly MessageInterface[] = [
	{ id: 'message', role: 'user', content: 'Summarize the build.' },
]
const identified = identifyInferenceMessages([{ role: 'user', content: 'Summarize the build.' }])
const prompt = formatInferencePrompt(inferenceMessages)
const backendInput: CLIBackendInput = { prompt, model: 'smallest' }
const claude = createClaudeCLIBackend()
const codex = createCodexCLIBackend()
const cursor = createCursorCLIBackend()
claude.build(backendInput)
codex.parse({ type: 'turn.started' })
cursor.build({ prompt })
const providerOptions: CLIProviderOptions = { backend: claude }
const cli = createCLIProvider(providerOptions)
const direct = new CLIProvider({ backend: new ClaudeCLIBackend() })
const inferenceRoster: InferenceRoster = new Map([['claude', cli]])
const inferenceOptions: InferenceStreamOptions = {
	provider: cli,
	request: { messages: [{ role: 'user', content: 'Summarize the build.' }], stream: true },
	signal: new AbortController().signal,
}
const inferenceStream = new InferenceStream(inferenceOptions)
new CodexCLIBackend().build({ prompt })
new CursorCLIBackend().parse({ type: 'system' })
const usage = parseTokenUsage(2, 3)
if (usage === undefined) throw new Error('token usage missing')
const cliEvent: CLIEvent = { event: 'complete', usage }
void cli.generate(inferenceMessages, new AbortController().signal)
void direct.stream(inferenceMessages, new AbortController().signal)
void cliEvent
APP_INFERENCE_TIMEOUT
APP_INFERENCE_GRACE
APP_INFERENCE_PATH
isCLIBackend(claude)
void identified
void inferenceRoster
void inferenceStream.response

parseApplicationHost('127.0.0.1')
parseApplicationPort('3000')
parseApplicationServerOptions({ host: '127.0.0.1', port: 3000 })
parseApplicationBody({})
const definition = parseWorkflowDefinition({ id: 'build', name: 'Build', phases: [] })
parseApplicationWorkflow({ definition })
buildPromptFormSchemas()
deriveSupervisorToolSchema(['function', 'human'])
formatApplicationKeyMismatch(
	{ command: 'watch', foo: true },
	['command', 'workflow'],
	['command', 'workflow', 'cursor'],
)
formatIdentifier('phase')
formatIdentifiers(['phase', 'review'])
formatWorkflowLevel(
	{ id: 'build', name: 'Build', phases: [] },
	APPLICATION_WORKFLOW_CONTRACT.schema,
	'Workflow definition',
)
formatWorkflowFault({ reason: 'missing', expected: 'string' }, 'Task "task"', 'name')
formatWorkflowPhaseSubject({ id: 'phase' }, 0)
formatWorkflowTaskSubject({ id: 'task' }, 0, 0)
matchesWorkflowDefinition(definitionToSnapshot(definition), definition)
isApplicationEnvironment(environment)
isApplicationAddressLookup(async () => ['127.0.0.1'])
isAgentProvider(agent)
isHumanTicket(ticket)
createApplicationState({ ip: '127.0.0.1', encrypted: false })
extractApplicationCaller(new Request('http://127.0.0.1/mcp'), undefined)
authenticateApplicationState(state, 'Bearer token', [{ token: 'token', workflows: ['*'] }])
state.authenticate({ token: 'token', workflows: ['*'] }, 'bearer', 'token')
requireApplicationPrincipal(state)
matchesApplicationSession({ method: 'POST', url: new URL('http://127.0.0.1/session') })
requireApplicationManager(state)
const verifier = createApplicationVerifier('winter-harbour-42')
void matchesApplicationSecret(verifier, 'winter-harbour-42')
deriveStamp(verifier)
const managed = [{ name: 'ada', secret: verifier, principal: 'token' }]
const regranted = resolveApplicationToken(
	[{ token: 'token', workflows: ['build'] }],
	managed,
	'ada',
	['build', 'release'],
	'9f41c0a7e3b25d64',
)
formatApplicationPrincipals(regranted)
buildApplicationDirectory(managed, regranted, false)
matchesApplicationLoopback('127.0.0.1')
const owned = ownApplicationEnvironment(process.env)
hasApplicationRoster(owned)
composeApplicationEnvironment({ APP_PORT: '3100' }, owned)
formatApplicationOverlay({ APP_SETUP: '3f9c1-7ae4b-8d206-5c1fa-9b3e7-04d8c' })
writeApplicationSetup('.supervisor.local', '{}')
replaceApplicationSetup('.supervisor.local', '{}')
await resolveApplicationHost('localhost')
isNodeErrorCode(new Error('busy'), 'EADDRINUSE')
isSQLiteBusy(new Error('database is locked'))
isApplicationLeaseHolder({ owner: 'a2f1', pid: 4821, started: 1_767_225_600_000 })
isApplicationSetup(setup)
const setup2 = createApplicationSetup({ directory: process.cwd() })
renderApplicationSetup(setup2, 'http://127.0.0.1:3000')
deriveHumanTicketId('token', 'prompt')
parseExecutionWorkflow('["build","phase","task",1]')
createWorkflowTranscriptHandler(
	'build',
	transcript,
)({
	token: 'unit',
	stream: 'output',
	text: 'live',
})
buildApplicationPhases({})
const frame = buildObserveFrame('build', unit, observation)
measureWatchPage([frame], [{ unit: unit.id, sequence: observation.sequence }])
deriveObserveFrameKey(frame)
compareObserveFrames(frame, frame)
boundObserveFrames([createPacket(frame)], 1000, 65_536)
liveFrameToMCPNotification(frame)
buildSupervisorCommandResult('build', 'accepted')
agentChunkToObservation({ type: 'token', content: 'running' }, 1, 4096)
applicationErrorStatus(applicationError)
toApplicationError(new Error('store'), 'STORE', 'Store failed')
renderApplicationJSON({ name: 'supervisor', status: 'ok' })
renderApplicationError(applicationError)
const policy = parseApplicationPolicy(environment)
createApplicationAccess(policy, setup2)
createApplicationCSRF(policy.csrf.secret)
const assetReader = createApplicationAssetReader(['index.html'], () => new Uint8Array([0]).buffer)
isApplicationAssetReader(assetReader)
createApplicationAssets(assetReader)
const handoffProbe: typeof probeApplicationServer = probeApplicationServer
void handoffProbe
createApplicationMCPBoundary(1_048_576)
const broker = createLiveBroker()
createAgentExecutor({ provider: agent })
const humanLedger = createHumanLedger(ledger)
const humanPrompt = new HumanPrompt(60_000)
const humanPromptTicket = humanPrompt.park({
	fields: [{ control: 'text', name: 'name', label: 'Your name' }],
})
humanPrompt.pending(humanPromptTicket.id)
humanPrompt.answer(humanPromptTicket.id, { name: 'operator' })
humanPrompt.stop(humanPromptTicket.id)
createHumanExecutor(human)
createWorkspaceProviderExecutor({ root: '.supervisor', provider: processProvider })
const runtime = createApplicationRuntime({ environment, provider: agent })
const projection = createMCPProjection({
	application: runtime.application,
	codec: createPromptCodec(),
})
parseSupervisorCommand({ command: 'pause', workflow: 'build' })
parseObserverCommand({ command: 'inspect', workflow: 'build' })
const marks = parseObserverCursor([{ unit: unit.id, sequence: 1 }])
projectObserverWatch([frame], marks, false)
parseSupervisorWorkflow('build')
parseSupervisorWatch({ workflow: 'build' })
matchesApplicationKeys({ command: 'stop', workflow: 'build' }, ['command', 'workflow'])
requireApplicationResult({ success: true, value: 'accepted' })
const server = createApplicationServer({ environment, provider: agent })
const runner = startApplicationServer({ environment, provider: agent })
reportApplicationServerError(applicationError)
void server.destroy()
void runner.stop()
void runtime.destroy()
broker.publish(frame)
void humanLedger.wait('token', 'prompt')
void humanLedger.stop('token', 'prompt')
humanPrompt.destroy()
void projection.identity
```

### The browser interface reads that composition without adding an authority

`app/browser` is the reference composition's human interface: a Vue application the application
server serves at `/` from the public asset tree, addressing that same origin's session-authenticated
REST and SSE routes. It is private application code — bundled, never published — and it is not a
second authority. Rows come from `inspect`, live frames from the authorized SSE route, and the
replayed observation tail from the journal route. The run rail comes from the roster route and its
live companion, and completed runs come from the history route; both are the server's answers, read
and rendered rather than assembled here. Nothing is re-derived locally from settlement
events, and nothing this page stores survives the tab except the reader's own reload view and the
pointer naming which run they had open. The one thing that outlives it is the server's session
cookie, which the page can neither read nor forge.
There is no MCP client in the browser: the MCP route serves agents, and the human path is REST plus
one stream.

The session gates everything below it — its presence chooses between the login form and the
application — and beneath that gate three states span the interface. The **stack** is the projected
rows of one workflow, the **content** view renders whichever row is selected, and the **selection**
is one row id on the composition root. Selection never mutates the stack: it decides which renderer
answers and how the feed is filtered, and nothing else.

One session carries a second fact beside identity and grants: whether the login the reader arrived
with is the one the supervisor generated for its own first boot. While it is, a band under the bar
states what that costs in the tense the deployment is actually in — until a password is chosen this
server _can bind_ only loopback with a memory store, which is a rule read at startup rather than a
socket that moves — and carries the one control that ends it. The band announces politely: it is a
condition the reader arrived in rather than the outcome of anything they did, and the assertive
channel is spent on the one thing that answers a reader's own act, which is the toast saying the
password was saved. That control raises the platform's own
`<dialog>`, shown modal, so the inert page behind it, the backdrop, Escape, and the focus returned
on the way out are the browser's rather than this application's — and the arrival raises it too. A
reader who lands on a generated login meets the dialog rather than a control they have to notice
first, because what it lifts is a condition of the deployment rather than a preference, and a surface
that waits to be found is a surface that stays confined. Once per arrival is the whole of that rule:
the shell latches the arrival rather than the dialog, so a reader who closes it is left with the band
and is never asked again in that session, a replacement retires the fact behind it, and only a new
provisional arrival — the next login on this machine — opens one again. The band is the standing way
back and never depended on the latch. Nothing takes the dialog down when the fact departs, which is
what leaves it standing when the session expires underneath it. A password short of
`APP_SETUP_LENGTH` and a copy that disagrees with it are answered in the dialog, so neither ever
reaches the network; what does is one `PUT` to `APP_SECRET_PATH` carrying the session's CSRF. Its
empty `204` rotates the session without pretending the old request token belongs to the new one,
then the browser reads `GET /session`: that safe response mints the rotated session's CSRF and
answers the identity, grants, and now-absent provisional fact. Neither response echoes a password.
The band goes, the shell
states the replacement once on the surface it already speaks from, and the run the reader had open
is untouched throughout — replacing a password is not a claim about any run. The dialog is mounted
beside both faces of the shell rather than inside the authenticated one, because the session can
expire underneath it: the page behind then becomes the login form, and the dialog stays up naming
the way back — and carrying it, as an unfilled control on the expiry sentence that takes the
keyboard, because a named way back a reader has to go looking for is one only the reader who already
knew about it can take.

A password manager reads that dialog as well as the reader, and what it reads decides whether the
entry they already hold is updated or a second one is saved beside it. Both fields are
`new-password`, because `current-password` belongs to a login and a manager told this is one would
offer the password being replaced. Above them is the session's own name on a readonly anchor carrying
`autocomplete="username"`, out of the tab order and out of the accessibility tree: it is the only way
a manager can learn whose password this is, and the bar behind the dialog already tells the reader.
Whether a given browser then updates rather than duplicates is its own unpublished heuristic, so what
is promised here is a form stating everything such a heuristic is entitled to read, not the outcome
it reaches. The first field also carries `passwordrules` naming the same minimum, for the generators
that read it. Both fields state that minimum natively and the form declines to enforce it: this
dialog has one voice, and letting the browser answer a short password would refuse it in a bubble
that vanishes on the next keystroke, tells assistive technology nothing, and has no counterpart for
the copy that disagrees — so the reader would meet a different kind of refusal depending on which of
the two mistakes they made. Neither field blocks paste, copy, or cut: pasting a generated password is
the case this dialog exists for.

Two collections stand beside that gate, and they answer different questions. The **run rail** lists
the runs the roster reports live, plus the ones that have left it during this session. Completed
**history** is the durable list of runs that finished, and it is a second destination in the content
area rather than a second rail or a level inside the open run's stack: opening it displaces the run
the reader had open and leaves that run untouched underneath, so going back is a return to a pane
that never left rather than a second open. The History door is a toggle rather than a one-way
entrance, so pressing it again is the same way back, and choosing a row from the stack is itself a
way back: picking a different pane to look at is leaving the one history stood in front of.

The stack is flat rows over the real hierarchy rather than a nested tree. `snapshotToRows` projects
one `WorkflowSnapshot`, its live `paused` fact, and its durable `UnitSnapshot` rows into
`WorkflowRow`, `PhaseRow`, `TaskRow`, and `UnitRow` values discriminated by `tier`, in lineage order.
A row id is the tuple-prefix encoding
of the durable correlation token — `["build"]`, `["build","verify"]`, `["build","verify","test"]` —
and an attempt row's id is `UnitSnapshot.id` verbatim, so a selected attempt addresses the unit
command routes byte for byte without a second encoding. A durable attempt whose phase or task the
definition no longer contains still produces a row, attached to the deepest prefix that does exist,
because hiding it would claim the run had fewer attempts than it did; such a row never inflates its
ancestor's `count`. Rows carry no depth field: `tier` is the depth, `ROW_INDENT` is its only
rendered projection. `deriveUnitRowStatus` keeps `settled` in the durable contract while projecting
its boxed success as `completed` and boxed failure as `failed`; it also prevents a running intent
beneath a terminal task from presenting as live. `deriveTone` maps that projection through
`ROW_TONE` so no template carries a status branch of its own. Every row reserves the same disclosure
gutter whether or not it folds anything, because indentation is the only thing that renders the
hierarchy and a childless task that dropped its gutter would outdent past its own phase. `ROW_TONE`
spends five colours on eight rendered statuses and never `light` or `dark`: a colour names a
status's character — nothing happened, in flight, halted short of an outcome, or one of the two
verdicts — the status word always renders beside it, and the two theme-coloured pairs exist to sit
against one theme's own surface, so either would erase a status in half the deployments. The two
`secondary` statuses are separated by fill rather than by hue, because "never ran" and "deliberately
not run" are different operator facts: `pending` is filled with the grey and `skipped` wears the
palest tint of the same grey inside a ring of it. The hollow half names that tint rather than
leaving the fill unsaid, because a badge supplies one either way: a tone carrying only a border
prints the status word on the solid grey the component brought, which no reader can make out. Each
tone owes the word beside it a readable contrast in both themes, so the hollow half takes the body's
secondary text colour — the same grey in the light theme, one step lighter in the dark one, where
the emphasis token falls just short on the tint it now sits on.
The stack's own mark is a second map, `ROW_MARK`, because the row and the badge answer the same
question in media that do not share a bar. A badge prints the status word and can hold its colour as
a fill; a stack row prints no status word at all, so its mark is the whole of what the row says and
owes the wordless bar on its own — and no box can pay that here, since every neutral background and
border token retunes per theme and the secondary grey bottoms out below the bar in the dark one.
Only a foreground survives both themes, so the mark is a glyph: `bi-circle-fill` for work that
happened or will, `bi-circle` for the step deliberately left out, in the same colour, which
keeps the two neutral statuses separated by fill in a medium where both readings hold. The two
glyphs share one advance width, so a skipped row's label starts exactly where its siblings' do. It
is drawn at the dot size the `status` class fixes rather than at the label's own type size, because
a mark that size is punctuation beside the label and a mark at the label's size is a second object
competing with it.
The colour itself is not a framework class. `ROW_MARK` names one of five characters — `idle`,
`live`, `held`, `done`, `failed` — and the palette tokens in `app/browser/styles/tokens.css` decide
what each character resolves to. That indirection is the point: the framework offers every hue
saturated and emphasized, and neither family reads in both themes, so the light theme wears the
saturated hue a reader recognises as a status colour and the dark theme wears the emphasized tint
lifted for a dark surface. `held` is the one character that wears the emphasized tint in both, and
the reason is the pigment rather than the rule — a saturated yellow reaches 1.36:1 on a light
surface. Measured on the rail, light theme then dark: `idle` 4.38 and 4.88, `live` 4.32 and 4.84,
`held` 4.96 and 12.11, `done` 4.16 and 8.77, `failed` 4.46 and 5.29, against the 3:1 a wordless mark
owes. The same five characters paint the banner's fleet marks, read straight off `ROW_MARK`, so the
bar and the rail beneath it cannot drift.
Colour is the one fact the selection overrides: a selected row fills with the same primary the
running status wears — `rgb(0, 102, 255)` in both themes — and swallows every status colour at once,
so that row keeps its glyph and carries no character, letting the fill's own contrast colour take
the mark at 4.83:1. Dropping a colour costs no width, so selecting a row never
shifts its label. Task
rows enter the stack collapsed, so the resting stack reads
workflows, phases, and tasks while attempts remain first-class addressable rows one expansion away.
That fold is a button carrying `aria-expanded`, not a native disclosure, because what it reveals is
not inside it: the rows it hides are flat siblings in the same list, so there is no element for
`aria-controls` to name and the expanded fact belongs to `StackManager.collapsed`, which the reload
view persists. The content pane's sections fold the other way — each is a native `details` holding
the content it reveals — and the two mechanisms are chosen by that structural difference rather than
by taste.

`Operator` is the composition root the application provides: one session, one `StackManager`, one
`FeedManager`, one `RosterManager`, one `HistoryManager`, one `UsersManager`, one `Client`, and one
selection. `open`
inspects the workflow, restores that
workflow's stored view, replays the durable tail into the feed, and subscribes. Nothing polls: the
operator re-inspects when a settlement observation arrives on the stream, when that stream ends
cleanly under a current generation, after a command a component issued, and on an explicit
`refresh`; ordinary triggers that fire at once join one read rather than racing two. A clean stream
end is the exception: it waits for any read already in flight and then calls `refresh`, so the
end never joins a read that began before it was observed. Every open takes the next of one
monotonically increasing generation instead of a lock, so two overlapping opens end with the later
one owning the state and work suspended across an await writes nothing once its generation is stale.
`ended` and `fault` are exclusive claims about one run: once a snapshot has been read, a later
`ABSENT` answer on any route — the tail, a re-inspect, or the subscription itself — is the run's
durable end, and the retained rows keep rendering as an ended run instead of reporting a workflow
that cannot be found. An `ABSENT` answer with no prior success is an ordinary refusal and is shown as
one.

`terminal` and `ended` are different facts and neither implies the other. `terminal` is read from the
retained snapshot's own workflow status, so it follows every inspect the operator takes and no second
copy of it can drift: a run whose snapshot is terminal attaches no live subscription, and the
interface renders a finished run rather than an idle one. A run that finishes while the viewer is
open is reported from the post-close inspect its own stream ending guarantees: the end waits for an
earlier read to finish, rechecks that its generation still owns the view, and asks again. The end
therefore starts a read after it was observed, or joins one that necessarily started after it. The
ending is the only announcement such a run makes — the settlement observation before it lands while
the workflow is still running. `ended` says durable state disappeared after a snapshot had already
been read. A run that finished normally is `terminal`; a run whose retained state was later removed
is `ended`; a run that was already terminal when it was opened is never reported missing on either
count.

The reader's session is one field, and the whole interface gates on its presence rather than on a
companion boolean that could disagree with it. `identify` asks the server once as the interface
mounts, because an `httpOnly` cookie restored by a reload is a credential the page can neither read
nor prove; an unauthenticated answer leaves `session` undefined and `fault` untouched, since holding
no session is a resting state rather than a failure. `login` is the reader's own question, so its
refusal is a fault like any other, and succeeding on a workflow that was already open reopens it
immediately. Every operator method records its failure in `fault` instead of throwing, because each
is called from a template handler with nowhere to catch, and any success clears it.

Adopting a session also restores the run the reader had open. `OperatorStoreInterface.pointer` holds
one workflow id under `POINTER_KEY`, written when an open completes and removed on logout, and both
`identify` and `login` follow it through the ordinary `open`. A restore counts as successful only
after that open has inspected, restored its stored view, read the tail, and either attached a live
subscription or established a durable end; anything earlier returns the reader to the run rail with
`notice` naming the workflow and why. The two reasons are separated because they mean different
things to the reader: `gone` is an `ABSENT` answer and clears the fault with it, since a run that no
longer exists is not an error anyone can act on, while `refused` is every other refusal and keeps
its ordinary fault beside the notice. The pointer itself is dropped for `ABSENT` and for
`FORBIDDEN`, the two answers that say this reader will not reach that run again. An `AUTH` refusal
is neither: it produces no notice and leaves the pointer standing, so logging back in returns the
reader to the same run.

Expiry and logout are different events and clear different things. An `AUTH` answer on any route —
including one a component issued through the client, which crosses the same seam — means the
credential is gone: the session clears so the interface asks for it again, while the retained
snapshot, its rows, the feed, the selection, and the workflow that was open all stand, because a
spent credential is not a claim about the run. Expiry does release the two subscriptions the session
owned — the live stream and the roster stream — and discards the loaded history pages, because those
are the reads the credential was paying for. Logging in again therefore returns the reader to
exactly what they were watching. `logout` is a decision rather than an accident, so it clears all of
it — both subscriptions, snapshot, rows, feed, selection, loaded history, the roster's own memory,
that workflow's stored view, and the restore pointer — and the next
reader of a shared machine inherits nothing but the login form. A storage that refuses to forget the
pointer is the one part of that clean-up the reader is told about: the refusal becomes the
interface's fault, and the residue is suppressed for the rest of the page rather than silently
restoring the previous reader's run.

`Client` mirrors the server's application surface member for member, so one vocabulary spans the
server, the MCP tools, and this interface. Three differences are real rather than cosmetic: the
server's `principal` parameter has no browser analogue, because the browser's credential is the
reader's own session; `pause` and `resume` are synchronous on the server and are requests here; and
`start` answers the accepted workflow snapshot the route returns rather than a live workflow entity
the browser cannot hold. Authentication is one resource with three verbs — `login` establishes the
session, `session` reads the self-view it grants, and `logout` ends it — and every request is sent
with `credentials: 'same-origin'` to the page's own origin. The client publishes no authorization
flag: the cookie is `httpOnly`, so a flag would be a guess the server never confirmed, and the
answer to each request is the only authority on whether the credential still holds. The one thing
the client keeps is the session-bound CSRF token, held privately and attached to every mutation,
dropped the moment any route answers `AUTH`; a token any component could read is a token any
component could leak, and no caller has a use for it. Commands answer a `Result` and never throw
for a refusal. `watch` is the sole exception — a stream that cannot open, or breaks mid-flight,
throws a `BrowserApplicationError` from its iteration, because an async iterable cannot carry a
refusal in its element type honestly. `tail` answers the whole `ApplicationTail` rather than the
frame list alone, unwrapping the route's `tail` and `terminal` keys into the two facts a caller
needs together.

Four readonly sub-entities hang off the client, each grouping the transport for one surface rather
than widening the client's own member list: `units` carries the unit commands, `roster` carries the
current roster read and its live subscription, `history` carries the completed-run page read, and
`users` carries the managed-login directory and its four mutations.
`ClientUnitManager` scopes its commands under an authorized workflow and requires each route's own
acknowledgement: `stopped` for `stop`, `accepted` for `steer` and `reply`. `ClientRoster.watch` and
`ClientInterface.watch` are the same mechanism pointed at different routes, and `ClientHistory.read`
sends `limit`, `cursor`, `name`, and `prefix` through as query values verbatim — the browser trims
nothing and lower-cases nothing, because a filter that quietly altered what was typed would report
matches the reader never asked for. `describeCommandRefusal` is the one product vocabulary for
command failures, so executor and server diagnostics remain in the typed error context rather than
becoming interface copy.

`ClientUsers` is the fourth, and it is the only transport whose answers a reader must be shown once
or not at all. Every mutation answers an `ApplicationDirectoryResult` carrying the complete post-change
`ApplicationDirectory`, so the rendered roster is always the server's own count rather than a local
edit applied to a stale list; `add` and `regenerate` answer an `ApplicationSecretResult`, which is that same
directory plus the `ApplicationSecret` the server will never repeat. `UsersManager` holds the result
for exactly as long as the reader's session does. Its `logins` and `environment` are the last
directory it was given, `loading` is one generation latch so an abandoned request cannot land after a
newer one, `fault` keeps the server's own sentence verbatim rather than translating a rule this
page does not own, and `secret` retains the one-time password until one of three triggers fires, in
order: `release()` drops it explicitly; the next current-generation request settlement drops the old
value before adopting that request's answer, so stale reveal data cannot outlive the authoritative
directory or refusal that replaced it; and `clear()` drops it with the rest of the session-lived
state. It is the single place in the interface where a value is kept because dropping it would lose
it for good.
Everything it holds is dropped on `identify`, `login`, `logout`, and every `AUTH` answer, because a
directory is a manager's view and nothing about it survives the credential that earned it.

`ApplicationSnapshot.paused` is the live workflow's runtime dispatch-gate fact. It is projected by
`inspect` beside the installed workflow snapshot because the workflow package deliberately keeps
pause out of its durable lifecycle status; a retained snapshot read after settlement carries
`paused: false`. The workflow row, its status badge, the run rail's own row, and the Pause/Resume
controls therefore read one fact instead of inferring it from an acknowledgement.

The banner reads the fleet rather than the open run, because what the chrome owes a reader is
whether anything they can reach is moving, while the rail beside it is where a single run states its
own status. Every mark on it is a fact the roster already reported: how many runs it lists, how many
of those are held at their dispatch gates, and whether the stream carrying them has stopped. The
marks are shapes and colours that never move — nothing waits, spins, or blinks — and each carries
the word that says what it means, because no colour carries that alone. Above `lg` the marks are
read straight off the bar beside the rail; below it the same marks ride the control that brings the
rail out, and its accessible name spells every one of them out.

`LiveStream` is a fetch-SSE subscription rather than an `EventSource`. The session cookie would ride
either one, but the platform stream reports every refusal as a single untyped `error` event and then
reconnects on its own schedule, and this interface has to tell a `404 NOT_FOUND` that ended a run
from a `401` that ended a session — a stream quietly re-opening itself after either would contradict
the state the reader is being shown. The subscription can be consumed once, requires a
`text/event-stream` answer, and ends silently when its signal aborts. It feeds decoded chunks to
`@orkestrel/sse`'s installed parser, which owns line endings, partial lines, event blocks, and split
`\r\n` pairs. One stream serves both live surfaces: `LiveStreamOptions` carries the route, its
segments, the guard the values must pass, and the event name they must arrive under — either a fixed
name, as the roster's `roster` is, or a `LiveStreamEventHandler` deriving it from the value, as the
workflow stream derives it from a frame's own `source`. The application keeps only its projection:
unnamed dispatches are ignored, and every named frame must both pass its guard and arrive under the
event name that guard's value declares — a mismatch
is a boundary failure, not a frame to render. Refusals cross `deriveResponseErrorCode`, the one place
the whole transport agrees on what a status means: `401` is `AUTH`, a `403` is the application's own
`FORBIDDEN` only when it says so and `AUTH` otherwise, a `404 NOT_FOUND` becomes `ABSENT` through
`matchesAbsentResponse`, and everything else is `REQUEST` with its received status kept in the
error's context. The two kinds of `403` therefore reach the reader differently: a workflow their
session may not address leaves them logged in and refused, while a stale CSRF token drops the held
token and sends them back through the login form that restocks it.

`RosterManager` owns that subscription and the facts derived from it. It retains the last complete
snapshot, so a stream that breaks leaves a list that is merely old rather than a list that vanishes,
and consumers read `snapshot` plus `fault` instead of a second status label that could disagree with
either. `live` states independently whether the one owned consumption loop is attached, which is the
fact a reader needs when the two disagree — retained rows, no stream. An `AUTH` refusal is not a
roster fault: it crosses `RosterExpiryHandler` once, so the composition root returns to login while
its open-workflow memory stands.

The rail lists more than the roster does. `departed` remembers the runs that were in the previous
snapshot and are not in this one, carrying the last state the roster reported for each, and the rail
renders that union — live runs and departed ones together, ordered by `created` then id so two
readers and two reloads of the same runs see one list. A departed row wears `ENDED_TONE` and is
marked "Last seen", because the last status the roster reported is not a terminal verdict and a
filled status colour ranks live work this row no longer does. A run that reappears in a later
snapshot leaves the departure memory; adopting a new session or clearing the manager resets it;
retry and abort preserve it.

Completed history is the durable answer the rail cannot give, and `HistoryManager` holds it. `load`
replaces the active filter and reads a fresh first page, `older` extends the listed page while the
server is still handing back a cursor, `retry` repeats whichever of the two failed without changing
its query, and `clear` resets every session-lived fact and invalidates any read still in flight.
Paging is a press: nothing loads on scroll, nothing arrives on a timer, and the rows already read
stay where the reader left them. One page is one press even when it comes back empty, because the
server qualifies terminal runs after applying its page limit — so an empty page with a cursor means
"read further back", not "there is nothing".

Five states are derived from those facts rather than stored beside them: `loading` while a read is
outstanding and nothing is listed, `error` for a failure with no rows, `partial` for a failure with
rows already listed, `empty` for a successful read that listed none, and `ideal` for one that did.
The distinction between `error` and `partial` is what decides whether the refusal replaces the list
or sits beside it, and a page that loaded followed by a continuation that did not is a list that is
merely short.

`changed` is the one affordance that watches something other than history itself. A first-page read
captures which runs have left the live roster; when that departure record moves afterwards, a run has
finished since the listed page was read, so the page may no longer be the newest one. The fact is
stated and nothing else happens: no reorder, no append, no scroll, and the reader refreshes if they
want the newer page. `older` deliberately never clears it — extending a page backwards says nothing
about whether its front is current — so only the next successful first-page read establishes
freshness again. When no roster snapshot had arrived at capture time the baseline is absent and
`changed` stays false, because the roster's first arrival alone is not evidence that a run ended.

The two filters are the server's, and the interface says so where the doubt arises: both search the
whole completed history rather than the rows on screen, and pages are read newest first. `name` is a
case-insensitive fuzzy subsequence of the run's name — its letters must appear in order, not
necessarily contiguously — and `prefix` matches the start of the run id exactly as typed; the two combine with AND, and either field submits the pair. Both halves travel
verbatim, so an all-blank submission applies no filter at all. Three sentences answer an empty
list, and which one appears turns on two facts the reader can act on: with no filter standing,
nothing has completed yet and live runs are where to look; with a filter and no cursor, nothing in
the whole history matches and clearing the filter is the way on; with a filter and a cursor, nothing
matches _in the pages read so far_, and Older reads further back. The third exists because claiming
an absence the pages already read cannot support is the one thing a filtered list must not do.

Two facts are stated where the reader meets them rather than left to be inferred. A run appears here
only once its release is durably recorded and its persisted snapshot is terminal, so a run that
finished a moment ago can be in both collections at once — listed here, and still on the rail marked
"Last seen" for the rest of the session. And nothing here is ever removed: this version deletes no
completed run, so the list keeps every run for as long as the deployment keeps its storage.

The feed is one chronological column whose five registers differ only in chrome: the bounded
redacted `record`, the verbatim `transcript`, the `terminal` copy the human stream now delivers, the
viewer's own `gap`, and the broker's `fault`. Entries are held by identity, so ordering,
deduplication, and retention are one fact — a record entry's identity comes from its unit and
observation sequence, which makes the replayed tail and the live stream deliver one retained entry
for the same admitted observation, while every live-only entry carries a minted ordinal that cannot
collide with a JSON tuple. Every entry also carries the source event time: an observation's durable
timestamp or the broker admission time on a transcript, terminal, gap, or fault frame. Retention
drops the oldest entry at `MAX_FEED_ENTRIES` and never fabricates a gap for its own trimming: a gap
describes a discontinuity the server reported. `sequence` counts admissions and never falls, because
at the retention bound every arrival costs an eviction and the retained length stops moving while
the feed is still moving. `useFeed` filters the column by the selected row's lineage through
`matchesLineage`, decoding both tuples rather than comparing text, so a JSON-escaped id can neither
falsely match nor falsely miss. A gap and a fault both render in every filtered view, and neither
carries a filter arm of its own: each describes the column rather than one register a reader chose
to read, and a fault names a row without being filtered by one, because a lost record is missing
from the feed whichever row the reader stands on. A terminal fragment belongs to the run rather than
to any attempt, so it renders at the workflow tier and steps aside once the reader zooms in. Nothing
in the feed is persisted: transcript text is unredacted and secret-bearing, and the record register
is already durable on the server.

The two discontinuity cards say only what their emitter knows. The `gap` card states the count the
viewer took and names no row. The `fault` card states the row the broker could not project, rendered
through `deriveLineage` so it reads as the address the stack beside the column renders, and states
no count. It says the lost record is missing from the feed rather than from this view, because a
fault renders unfiltered and the reader can be standing on a row that record would never have
appeared under. They wear the warning and danger roles so a reader tells them apart on one column,
in either theme. `OperatorInterface.fault` and the `fault` register are two different things: the
first is a held browser-side refusal the shell states as a toast and the next success clears, and
the second is an unclearable server-reported entry in this column.

A provider writes its stream as one structured event per line, so the register carrying the run's own
voice reaches the column as its own encoding. `parseTranscript` reads a fragment that is one JSON
frame naming its own event and answers the label its row states: the event, refined by the frame's
own subtype where it states one, and the words the frame carried where it carried any — the outcome a
terminal frame states, the text a delta states for itself, an item's text, or the text parts of a
message envelope. Those words pass the same door a recorded value does, bounded by `describeValue` at
`MAX_VALUE_LENGTH`. Nothing is translated into this interface's words: naming a vendor's events here
would be a third copy of the provider translations the server already owns, and it would drift from
both the first time a harness renamed a frame. A fragment that is not one frame — an unframed stderr
chunk, a half-written line, a JSON value that is not a record — is unreadable and renders as the raw
line it always did.

A labelled row is a native `details`. It opens and closes on Enter, on Space, and on a pointer with
no script behind it, its expanded state is the element's own `open` — one fact in one place, exposed
by the platform itself — and what it opens to is `TranscriptEntry.text` byte for byte: nothing is
re-serialized, reordered, or cut on the way to the column, because the transcript is the evidence
and a re-rendered copy of it would not be.

That row is one instance of a rule the content pane's sections follow too, and the boundary between
the interface's two disclosure mechanisms is structural rather than stylistic. Where the control
contains the content it reveals — this row, and every folded section of the four tier views — the
disclosure is a native `details` with its heading inside the `summary`, and nothing stands beside the
element's own `open`: no mirrored attribute, no state field, no script. Where the control and its
content are separate elements — the stack's fold over sibling rows, the steer and reply forms in the
command bar, the typed-id door, the rail's drawer — the control is a button carrying `aria-expanded`
over state the application already holds. Neither mechanism is ever wrapped in the other, so no
disclosure in this interface has two owners of its expanded fact.

A pane section's default is derived the first time that section is on screen for the selection, and
never re-derived: from the first press the section belongs to the reader, and a default that kept
following the status it was read from would close a section under the hand that opened it. First
appearance rather than selection, because two sections are on screen only once there is something to
head — a task's `Activity` and an attempt's `Result` — and a run keeps moving under a reader who has
already chosen their row: an attempt settles, a task starts, a retry replaces a task's activity with a
frame reporting nothing. A default read at selection is read before the fact it answers for exists,
which opens a completed attempt's result over good news and folds the live activity of a task that had
not started yet. Those two sections therefore go off screen rather than out of the document, keeping
the element that holds the reader's own `open` across a period they cannot see it, and their derivation
is consulted only while they are on screen. `ContentPane` keys the tier view on the row id, so the
whole reckoning starts again on a move between two rows of the same tier. None of that state is
durable. `View` remembers the stack's folds because a reload cannot re-derive them; a pane section's
own state lives exactly as long as the selection does.

A settlement record states what its attempt's current durable row holds, because the observation
itself records only that the executor saw an outcome. `describeOutcome` is that one voice. A settled
success states the value it recorded, rendered by `describeValue` and bounded at `MAX_VALUE_LENGTH`
with a cut value ending in an ellipsis, so the answer a reader came for is on the card instead of
only in the raw stream above it, and an arbitrary provider record cannot turn one row of the column
into a wall of serialized text. A settled failure names its message and a quarantined launch names
its reason, and both pass that same door: a message and a reason are as arbitrary as a value and
land on the same row, so all three are bounded and the reader who needs a cut one whole opens the
attempt, where the tier states it unbounded under a `Result` section a failure or a quarantine has
already opened for them. A success that recorded nothing, a failure whose
message says nothing, a quarantine with no reason, and a row that has not settled each say so;
none is reported as a result that is unavailable, and no sentence ends at its own colon.

A request record is actionable only while its unit is still `running` in the latest inspected
snapshot. The unit row carried by the older frame remains historical evidence; it never keeps Reply
alive after the current durable row settles or becomes quarantined. That same durable lookup decides
how loudly the card is drawn: while an answer can still reach the attempt the request is the one
thing on the column asking for the reader, and once the attempt stops running the card drops to the
quiet chrome every other record wears, because a resolved ask drawn as a live one minus its button
leaves a reader hunting the control that would answer it. Inside the card the ask leads and its
context follows, so a request that carries a context sentence reads in the same order as one that
does not. Every entry is stamped with its own source time, beside its text rather than above it: the
element carries the exact instant for the machine and the pointer, and the visible stamp is the time
of day read out of that instant, so the column answers "when" without repeating one date on every
row.

Two durable browser values exist, and both are small. The reload view is the first. `View` holds only
what a reload cannot re-derive —
which workflow was open, which row was selected, and which rows were collapsed — and
`StorageOperatorStore` writes it under `VIEW_PREFIX` in the realm's own local storage. It never holds
a credential, transcript text, or a snapshot copy, and it records no origin: local storage is already
partitioned by origin, so a field restating that would only repeat a guarantee the platform makes.
`isView` is exact rather than tolerant, and `MAX_VIEW_LENGTH` bounds attacker-controlled parsing on
the way in and out. Storage unavailability and an absent view are deliberately indistinguishable:
disabled storage, privacy policy, and quota refusal make reads empty and writes silent no-ops, so
optional persistence can never stop the interface. Writes are chained in order, so an older
asynchronous write can never land after a newer view. `MemoryOperatorStore` is the same contract
without the durable surface — the showcase composes it so a frozen demonstration writes nothing a
real deployment could later read back.

The restore pointer is the second, and it is one workflow id under `POINTER_KEY`. It is a separate
value rather than a field on `View` because it answers a different question — which run to reopen,
not how that run was arranged — and because there is exactly one of it while there is one view per
workflow. `OperatorStoreInterface.pointer` exposes it beside the view store that owns the same
realm's storage, so a store and its pointer cannot drift apart. Its failure mode is deliberately
narrower than the view's: an unreadable pointer is simply no pointer, but a pointer that refuses to
be removed is reported, because silently keeping one after a logout would hand the next reader the
previous reader's run.

Three limits are deliberate and current rather than oversights. The interface has no router: there is
no hash or history routing and no deep link, so a run cannot be named in a URL and a reload is
answered by the restore pointer and the stored view rather than by an address. Deployment is
same-origin only: the interface is served by the same
application server that answers it — as a build, as a development server, and inside the packaged
executable — so there is no configurable API origin, no CORS battery, and nothing that would send a
session cookie to a host it was never issued for. And a live subscription is authorized once, when it
opens: a session that expires or is logged out elsewhere does not close a stream already running,
which is why every command still travels a route that re-checks the credential.

The browser surface is documented in full for the same reason the rest of the application is: it is
guide-audited even though it is bundled rather than published. These are its host-independent
contracts.

| Name                             | Kind      | Browser contract                                                                                                                                                                                      |
| -------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BrowserApplicationErrorCode`    | type      | `CONFIG` rejects a local value, `REQUEST` one answered request, `ABSENT` a workflow with no durable state, `AUTH` a spent or missing credential, `FORBIDDEN` a workflow this session may not address. |
| `BrowserApplicationErrorContext` | interface | Optional cause, offending value, and the received HTTP status.                                                                                                                                        |
| `BrowserApplicationOptions`      | interface | The mounted application's optional name.                                                                                                                                                              |
| `SetupPanelOptions`              | interface | The two outcomes the password dialog reports to the shell that opened it.                                                                                                                             |
| `WorkflowRow`                    | interface | The stack's root row: workflow name, lifecycle status, and phase count.                                                                                                                               |
| `PhaseRow`                       | interface | One ordered phase row and its task count.                                                                                                                                                             |
| `TaskRow`                        | interface | One ordered task row, addressed by its three-element prefix, and its attempt count.                                                                                                                   |
| `UnitRowStatus`                  | type      | Outcome-aware attempt status: live, quarantined, or a terminal lifecycle projection.                                                                                                                  |
| `UnitRow`                        | interface | One attempt row whose id is the durable unit token, carrying its executor and projected status.                                                                                                       |
| `StackRow`                       | type      | The four stack rows, discriminated on `tier`.                                                                                                                                                         |
| `StackTier`                      | type      | The tier vocabulary derived from the row union.                                                                                                                                                       |
| `StackStatus`                    | type      | Lifecycle statuses, live workflow pause, and outcome-aware attempt statuses, derived from the row union.                                                                                              |
| `StackMark`                      | interface | The glyph and palette character one status marks a stack row with.                                                                                                                                    |
| `ActivityReport`                 | interface | The four reported activity facts, from a task snapshot or from one observation.                                                                                                                       |
| `RecordEntry`                    | interface | One timestamped journal-admitted observation and the unit that produced it.                                                                                                                           |
| `TranscriptEntry`                | interface | One timestamped verbatim provider fragment, its channel, and its durable unit token.                                                                                                                  |
| `TranscriptSummary`              | interface | The event a recognized transcript frame names for itself and the words it carried.                                                                                                                    |
| `TerminalEntry`                  | interface | One timestamped terminal-render fragment copied to the viewer.                                                                                                                                        |
| `GapEntry`                       | interface | One timestamped bounded-viewer discontinuity and the frames it dropped.                                                                                                                               |
| `FaultEntry`                     | interface | One timestamped broker projection failure and the durable row it lost.                                                                                                                                |
| `FeedEntry`                      | type      | The five feed entries, discriminated on `register`.                                                                                                                                                   |
| `FeedRegister`                   | type      | The register vocabulary derived from the entry union.                                                                                                                                                 |
| `StackManagerInterface`          | interface | The projected rows and the collapsed ids; it holds no selection.                                                                                                                                      |
| `FeedManagerInterface`           | interface | The retained entries and the monotonic admission `sequence`.                                                                                                                                          |
| `HistoryOptions`                 | interface | The wire query one completed-history read sends unchanged.                                                                                                                                            |
| `HistoryFilter`                  | interface | The optional name and run-id constraints a reader applies.                                                                                                                                            |
| `HistoryState`                   | type      | The five rendered conditions derived from completed-history facts.                                                                                                                                    |
| `HistoryManagerInterface`        | interface | Loaded pages, cursor, filter, `loading`, `state`, `changed`, `fault`, and the four explicit commands.                                                                                                 |
| `HistoryRefusalHandler`          | type      | Carry one current authorization refusal out of a history read.                                                                                                                                        |
| `RosterManagerInterface`         | interface | The retained snapshot, the departed runs, `live`, `fault`, and the subscription's own commands.                                                                                                       |
| `RosterExpiryHandler`            | type      | Carry the one session-expiry refusal out of a roster subscription.                                                                                                                                    |
| `RestoreReason`                  | type      | Why a remembered run fell back to the rail: `gone` or `refused`.                                                                                                                                      |
| `RestoreNotice`                  | interface | The workflow a restore attempted and the reason it fell back.                                                                                                                                         |
| `ClientCommandHandler`           | type      | Send one command route and require its shared acknowledgement status.                                                                                                                                 |
| `ClientAbsenceHandler`           | type      | Decide whether one refusal represents an absent durable workflow.                                                                                                                                     |
| `ClientRequestHandler`           | type      | Send one guarded request through the owning client's transport boundary.                                                                                                                              |
| `LiveStreamEventHandler`         | type      | Derive the SSE event name one guarded stream value must arrive under.                                                                                                                                 |
| `LiveStreamOptions`              | interface | Route, segments, signal, guard, and the fixed or derived event name.                                                                                                                                  |
| `ClientUnitManagerInterface`     | interface | Unit commands scoped under one authorized workflow.                                                                                                                                                   |
| `ClientRosterInterface`          | interface | The current roster read and its live subscription, grouped under the client.                                                                                                                          |
| `ClientHistoryInterface`         | interface | The completed-history page read, grouped under the client.                                                                                                                                            |
| `ApplicationDirectoryResult`     | interface | The complete post-change directory every managed-login mutation answers.                                                                                                                              |
| `ApplicationSecretResult`        | interface | That same directory plus the one-time password an add or regeneration answers.                                                                                                                        |
| `UserRefusalHandler`             | type      | Receive one current managed-login refusal after the manager settles its generation.                                                                                                                   |
| `ClientUsersInterface`           | interface | The managed-login directory read and its four mutations, grouped under the client.                                                                                                                    |
| `UsersManagerInterface`          | interface | The retained logins, the `environment` fact, `loading`, `fault`, the one-time `secret`, and the six commands that change them.                                                                        |
| `ClientInterface`                | interface | The browser's view of the application surface over its session-authenticated routes, with its `units`, `roster`, `history`, and `users` sub-entities.                                                 |
| `OperatorInterface`              | interface | Session, stack, feed, roster, history, users, client, retained snapshot, selection, and the `live`, `terminal`, `ended`, `fault`, and `notice` states.                                                |
| `View`                           | interface | The durable reload view: workflow id, selection, and collapsed ids.                                                                                                                                   |
| `OperatorStoreInterface`         | interface | Asynchronous point access to stored reload views, keyed by the value's own id, plus the realm's restore `pointer`.                                                                                    |
| `OperatorPointerInterface`       | interface | The one remembered workflow id a reload reopens.                                                                                                                                                      |

The bounds and keys are named once and read everywhere.

| Name                                        | Kind  | Value or role                                                           |
| ------------------------------------------- | ----- | ----------------------------------------------------------------------- |
| `MAX_BROWSER_APPLICATION_NAME_LENGTH`       | const | Accepted application-name length: 203 code units.                       |
| `MAX_BROWSER_APPLICATION_NAME_INPUT_LENGTH` | const | Raw name length inspected before trimming: 255 code units.              |
| `MAX_VIEW_LENGTH`                           | const | Serialized reload-view bound: 65,536 UTF-16 code units, read and write. |
| `VIEW_PREFIX`                               | const | Durable local-storage key namespace for reload views.                   |
| `POINTER_KEY`                               | const | Durable local-storage key for the workflow restore pointer.             |
| `ROW_TONE`                                  | const | Badge class for lifecycle, pause, and projected attempt statuses.       |
| `ROW_RANK`                                  | const | Reading order deciding which status a mixed tally reports.              |
| `ENDED_TONE`                                | const | Badge class a departed run's last status wears on the rail.             |
| `ROW_MARK`                                  | const | Glyph and palette character each status marks a stack row with.         |
| `ROW_INDENT`                                | const | Start-padding class expressing each tier's depth.                       |
| `REGISTER_TONE`                             | const | Badge class distinguishing each feed register.                          |
| `MAX_FEED_ENTRIES`                          | const | Retained feed rows before the oldest drops: 500.                        |
| `PLACEHOLDER_GRACE`                         | const | Wait a surface tolerates before any loading chrome appears: 200 ms.     |
| `PLACEHOLDER_MINIMUM`                       | const | Least time a loading placeholder holds once it has appeared: 400 ms.    |
| `MAX_VALUE_LENGTH`                          | const | Rendered settlement-value text before it is cut: 160 code units.        |
| `OPERATOR_KEY`                              | const | Symbol injection key the application provides the root under.           |

The leaves are pure, total, and testable without a component: the boundary error and its guard, the
frame and view guards the transport validates every answer through, the coercers, and the projections
the templates read.

| Name                             | Kind     | Behavior                                                                                   |
| -------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `BrowserApplicationError`        | class    | Typed browser boundary failure carrying its code and optional context.                     |
| `isBrowserApplicationError`      | function | Narrow a caught value to that boundary failure.                                            |
| `isView`                         | function | Accept only an exact reload view whose selection, when present, is a real id.              |
| `isFrameCount`                   | function | Accept only a positive safe integer frame count.                                           |
| `isTranscriptStream`             | function | Accept only the output or error provider channel.                                          |
| `isExecutor`                     | function | Accept only an exact executor name and advertised command roster.                          |
| `isApplicationRun`               | function | Accept only an exact live run, including its boolean pause fact.                           |
| `isApplicationRoster`            | function | Accept only an exact live-run and executor roster.                                         |
| `isHistoryRun`                   | function | Accept only an exact completed run whose status is terminal.                               |
| `isHistoryPage`                  | function | Accept only an exact completed page and its optional opaque cursor.                        |
| `isApplicationSession`           | function | Accept an exact self-view, including optional provisional and confined facts.              |
| `isApplicationLogin`             | function | Accept only an exact directory entry: a name, its grants, and nothing a secret could use.  |
| `isApplicationDirectory`         | function | Accept only an exact login roster and its environment-managed fact.                        |
| `isApplicationSecret`            | function | Accept only an exact generated password and the login it names.                            |
| `isApplicationDirectoryResult`   | function | Accept only a mutation answer carrying the complete post-change directory.                 |
| `isApplicationSecretResult`      | function | Accept only that answer when it also carries its one-time password.                        |
| `isClientRefusal`                | function | Accept only an exact failed client result carrying a browser application error.            |
| `isApplicationSnapshot`          | function | Accept an exact snapshot with a boolean pause fact whose units agree on workflow identity. |
| `isObserveFrame`                 | function | Accept a journal-admitted frame only when its unit and workflow identities agree.          |
| `isTranscriptFrame`              | function | Accept only an exact verbatim transcript frame.                                            |
| `isTerminalFrame`                | function | Accept only an exact terminal-render frame.                                                |
| `isGapFrame`                     | function | Accept only an exact discontinuity frame with a positive drop count.                       |
| `isFaultFrame`                   | function | Accept only an exact projection-failure frame naming a durable row.                        |
| `isLiveFrame`                    | function | Accept exactly one supported live-frame arm, dispatched on `source`.                       |
| `parseBrowserApplicationOptions` | function | Own the options container without invoking caller accessors, refusing traps with `CONFIG`. |
| `parseTranscript`                | function | Read one verbatim transcript fragment as the label its collapsed row states.               |
| `resolveRoute`                   | function | Substitute encoded segments into one shared route template.                                |
| `freezeDeep`                     | function | Transitively freeze one just-decoded value the caller solely owns.                         |
| `matchesAbsentResponse`          | function | Match the server's `404 NOT_FOUND` durable-miss answer.                                    |
| `deriveResponseErrorCode`        | function | Map one refused response's status and code onto the browser failure vocabulary.            |
| `describeCommandRefusal`         | function | Translate a typed command refusal into stable reader-facing product language.              |
| `describeGrants`                 | function | Compose the one grants sentence the identity chip and every roster row read.               |
| `describeTally`                  | function | Describe one status tally as `{n} {status}`, `{n}, {m} {worst}`, or `0`.                   |
| `describeValue`                  | function | Render one recorded value or provider fragment as the bounded text a reader is shown.      |
| `describeOutcome`                | function | State the outcome one durable attempt row reached, in the words its card shows.            |
| `describeFailures`               | function | Name the failed tasks a run's own status leaves unaccounted for.                           |
| `hasDetail`                      | function | Decide whether one reported activity carries any of its four facts.                        |
| `deriveUnitRowStatus`            | function | Project a unit's boxed outcome or terminal parent truth into rendered status.              |
| `snapshotToRows`                 | function | Project one snapshot, live pause fact, and durable units into the complete context stack.  |
| `matchesLineage`                 | function | Decide tuple-prefix lineage by decoding both values rather than comparing text.            |
| `deriveLineage`                  | function | Derive the readable lineage path one stack row's tuple id states.                          |
| `deriveTone`                     | function | Derive the badge class one stack status renders with.                                      |
| `deriveEmphasis`                 | function | Derive the text-emphasis class one status wears standing alone as a folded receipt.        |

The composition is three composables, four factories, and the entities they wire together.

| Name                        | Kind     | Role                                                                                            |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `useOperator`               | function | Resolve the provided composition root, or fail loudly instead of rendering empty.               |
| `useFeed`                   | function | Project the retained feed through one row's lineage.                                            |
| `useTheme`                  | function | Own the document's colour mode, defaulting to the reader's system preference.                   |
| `usePlaceholder`            | function | Gate a loading placeholder so it appears only for a wait the reader can feel.                   |
| `createOperatorStore`       | function | Create the reload-view store over the current realm's local storage.                            |
| `createOperator`            | function | Create the composition root over its own transport.                                             |
| `createBrowserApplication`  | function | Create the unmounted Vue application holding one provided root.                                 |
| `createShowcaseApplication` | function | Mount the showcase and open its seeded release through one real operator.                       |
| `Operator`                  | class    | The composition root: session, transport, stack, feed, roster, history, selection, generations. |
| `StackManager`              | class    | The placed projection and the reader's folds, with every view derived.                          |
| `FeedManager`               | class    | The bounded, identity-keyed, append-ordered feed.                                               |
| `RosterManager`             | class    | The retained roster, its departure memory, and its one owned subscription.                      |
| `HistoryManager`            | class    | The loaded completed pages, their derived state, and the change latch.                          |
| `UsersManager`              | class    | The session-lived login roster, its one generation latch, and the one-time password.            |
| `Client`                    | class    | Same-origin session client for the application REST and live routes.                            |
| `ClientUnitManager`         | class    | Browser transport for commands addressed to one supervised unit.                                |
| `ClientRoster`              | class    | Browser transport for the current roster and its live subscription.                             |
| `ClientHistory`             | class    | Browser transport for one completed-history page.                                               |
| `ClientUsers`               | class    | Browser transport for the managed-login directory and its mutations.                            |
| `LiveStream`                | class    | One abortable, single-consumption, same-origin fetch-SSE subscription over guarded values.      |
| `StorageOperatorStore`      | class    | Native local-storage persistence that fails silently by design.                                 |
| `MemoryOperatorStore`       | class    | The same reload-view contract held in memory, writing nothing durable.                          |
| `StorageOperatorPointer`    | class    | The restore pointer in that same local storage, failing silently on read.                       |
| `MemoryOperatorPointer`     | class    | The same pointer contract held in memory, writing nothing durable.                              |

The showcase is that same real `Operator` over a local seeded transport. Its data seeders return
fresh, deeply frozen values built from fixed timestamps. `seedClient` answers inspect from those
values, returns an empty durable tail, replays all five frame sources through the real projection,
and parks the live subscription on its abort signal; no parallel root, network request, timer, or
poll exists. It opens already identified, as a seeded reader whose credentials cannot be replaced,
and `logout` genuinely ends that session so the shipped sign-out path is the one on display. Its
reload views and its restore pointer go to `MemoryOperatorStore` and the `MemoryOperatorPointer` it
holds: a demonstration that wrote real local-storage keys could be
read back by a deployment served from the same origin, and a showcase has no business leaving
anything behind.

`seedHistory` is the completed list behind that run, and it is built to demonstrate the destination
rather than to fill it. All four terminal statuses appear, because each draws a different mark and
showing one proves nothing about the other three. Every id carries the `release-` or `hotfix-` shape
the prefix filter is shown with, and the words `rehearsal` and `licence` sit mid-id, where a
start-anchored prefix cannot reach them — so the name filter has something to find that the prefix
half cannot, and the two halves are visibly not the same search. The instants run backwards from the
open run's own creation, so newest-first order is the seed's own fact rather than the reader's
assumption. The seeded transport answers the way the route does — both filters combine, a page is no
larger than the caller asked for, and a cursor appears only while runs remain behind it — with one
honest difference: its cursor is an offset into a frozen list, because the opaque token a real server
mints exists to protect a traversal from writes this transport can never receive.
`npm run showcase` serves the development entry, `npm run build:showcase` creates the file-URL-openable
single-file `dist/showcase/index.html`, and `npm run show` formats, builds, and copies that artifact to
`demo/showcase.html`.

`npm run sea` rebuilds the live browser and server, validates the shell, and creates
`dist/sea/supervisor` with the live browser tree embedded under browser-relative keys; it never
embeds the showcase. Compressible assets are stored as Brotli and served as such only when the
request accepts `br`; other requests receive a cached identity representation, and both variants
carry `Vary: Accept-Encoding` and one stable weak ETag. `openBrowser` runs on exactly two kinds of
boot: the one that just created `.supervisor.local`, and any SEA launch. A plain restart over a
login that is still provisional prints and then stays out of the way — a replaced login prints
nothing — which is what makes `npm run serve` safe to run in a loop, and it is why the
application's own test suite never launches a browser.
Every successful ordinary or SEA bind writes exactly one stderr readiness line as
`[READY] supervisor http://HOST:PORT assets="/resolved/root"`; the assets value is JSON-string
encoded. A missing filesystem shell refuses before bind as
`[CONFIG] Application server failed: assets="/resolved/root" does not contain index.html` without
printing other diagnostic context or the underlying cause. Both lines go to stderr and nowhere else,
so a parent that spawns this process with `stdio: 'ignore'` gets a silent success and a silent
death: capture stderr or you get nothing. The resolved root is printed because `APP_ASSETS` is
resolved against the startup working directory, which makes launching from the wrong directory the
ordinary way to earn that refusal. When the configured port is occupied, a
matching public health answer opens the existing origin, prints one handoff line, and exits
successfully; a foreign or unreachable listener keeps the ordinary lifecycle failure. Browser
opening remains best-effort and logs a refusal without stopping the bound application. Node's SEA
support is experimental and `@orkestrel/sea` is pre-1.0; each platform builds its own host-specific
binary, which is not a supported release artifact.

Ahead of that readiness line, an interactive boot whose roster is still provisional writes the
credential block one person actually reads first. `renderApplicationSetup` is the whole of it — a
pure function over the composed setup and the bound URL — so its bytes are asserted rather than
described:

```text
[SETUP] supervisor created .supervisor.local and generated a login.
  Open      http://127.0.0.1:3000
  Username  operator
  Password  3f9c1-7ae4b-8d206-5c1fa-9b3e7-04d8c
  Bearer    04f1d7c93b8e6a25f0c4198d7b3e5a61c82f09d4e7b5a3c16f8d20e947ba5c3f

  The password is provisional. Until you replace it in the browser,
  this server binds only loopback with a memory store.
  Delete .supervisor.local to start over.
```

Only the opening sentence varies on an interactive terminal. A non-terminal provisional restart
writes only `[SETUP] supervisor is still using the login in .supervisor.local; run from a terminal
to see it.` and never writes the password or bearer. A roster the environment configured, and a
password already replaced in the browser, are both non-provisional: they print no setup line at all,
and after replacement no line this process writes carries a secret. Handoff has exactly two cases.
A generating boot that lost the port keeps today's line verbatim and opens nothing, because its
brand-new login is not the running instance's:
`[SETUP] supervisor is already running at ORIGIN; the login in .supervisor.local does not open it. Sign in with that server's own login, or stop it and delete .supervisor.local to start over here.`
Every other matching handoff writes
`[SETUP] supervisor is already running at ORIGIN; sign in there with that server's own login.` and
the SEA browser rule applies: the reused login works there, or the reader signs in with the peer's.

`ApplicationServerRunnerInterface.emitter` is the in-process lifecycle boundary. Its
`ApplicationServerRunnerEventMap` emits `setup` with the exact credential bytes it wrote, `ready`
with the bound URL, `handoff` with the matching peer origin, and `fail` with the rejected value.
`setup` precedes `ready` on a provisional boot and never arrives on an ordinary non-provisional boot,
so an in-process caller observes the printed moment without reading the process's own stderr.
Handoff is not readiness: a successful contender emits no `ready` and owns no listener. Its `setup`
event carries the applicable tagged line above. A generating contender never opens the peer; every
other matching SEA contender may open it. The runner writes no handoff line to stdout.
The default `setup` and `ready` listeners preserve the exact
stderr bytes above, and the default `fail` listener reports the lifecycle failure after signal
ownership is released. Initial `on` hooks run before those defaults; a throwing hook is isolated and
reported through `error` without poisoning a later start. In-process callers park on emitter events
and fetch once after `ready`; cross-process tests still observe the child process's readiness line.

| Option  | Type                                            | Behavior                                                                  |
| ------- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| `on`    | `EmitterHooks<ApplicationServerRunnerEventMap>` | Install initial ready, handoff, or fail listeners before runner defaults. |
| `error` | `EmitterErrorHandler`                           | Receive isolated listener failures without rethrowing into the lifecycle. |
| `sea`   | `boolean`                                       | Select SEA browse and same-application handoff behavior.                  |
| `probe` | `ApplicationServerProbeHandler`                 | Override the bounded same-application origin probe.                       |
| `open`  | `ApplicationServerOpenHandler`                  | Override host-platform browser opening.                                   |

| Name                  | Kind     | Seeded value                                                                              |
| --------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `seedCompletedUnit`   | function | The settled attempt that produced the release build.                                      |
| `seedFailedUnit`      | function | The settled attempt whose contract suite disagreed with the recorded pacts.               |
| `seedRunningUnit`     | function | The retry still in flight, under a minted provider identity.                              |
| `seedQuarantinedUnit` | function | The attempt whose launch outcome was never determined.                                    |
| `seedConfirmUnit`     | function | The human attempt parked on a yes-or-no decision.                                         |
| `seedSelectUnit`      | function | The human attempt parked on a choice.                                                     |
| `seedSnapshot`        | function | The release the showcase follows, and every durable attempt beneath it.                   |
| `seedRoster`          | function | The advertised runs and the two executors' differing commands.                            |
| `seedHistory`         | function | The completed releases behind the open run, in all four terminal statuses.                |
| `seedFrames`          | function | The entire chronological live stream across five sources and five categories.             |
| `seedClient`          | function | The parked local transport that answers reads and the session, and refuses every command. |
| `seedOperator`        | function | The real operator over the seeded client and an in-memory reload-view store.              |

Mounting the interface is one call, and the entry adds only the stylesheets:

```ts
import { createBrowserApplication } from '@app/browser'

createBrowserApplication({ name: 'Supervisor' }).mount('#app')
```

A reader's whole visit is a handful of calls on the root, and a refusal is a value rather than a
throw:

```ts
import { createOperator, createOperatorStore } from '@app/browser'

const store = createOperatorStore()
const operator = createOperator()

await operator.identify()
if (operator.session === undefined) {
	await operator.login({ name: 'operator', secret: 'winter-harbour-42' })
}
await operator.open('build')
if (operator.fault !== undefined) throw operator.fault
operator.select(operator.stack.rows()[0]?.id)
if (!operator.ended) await operator.refresh()
const restored = await store.get('build')
void restored
await operator.logout()
await operator.destroy()
```

The complete browser surface, driven as a compile-time inventory rather than a live session:

```ts
import type {
	ApplicationLoginInput,
	ApplicationSecretInput,
	ApplicationSessionInput,
	ApplicationWorkflowInput,
	PromptAnswer,
} from '@app/core'
import type {
	ClientInterface,
	FeedEntry,
	FeedManagerInterface,
	HistoryManagerInterface,
	OperatorInterface,
	OperatorPointerInterface,
	OperatorStoreInterface,
	RosterManagerInterface,
	StackManagerInterface,
	StackRow,
	UsersManagerInterface,
	View,
} from '@app/browser'

declare const answer: PromptAnswer
declare const client: ClientInterface
declare const credentials: ApplicationSessionInput
declare const entry: FeedEntry
declare const feed: FeedManagerInterface
declare const history: HistoryManagerInterface
declare const input: ApplicationWorkflowInput
declare const login: ApplicationLoginInput
declare const operator: OperatorInterface
declare const pointer: OperatorPointerInterface
declare const replacement: ApplicationSecretInput
declare const roster: RosterManagerInterface
declare const row: StackRow
declare const rows: readonly StackRow[]
declare const stack: StackManagerInterface
declare const store: OperatorStoreInterface
declare const unit: string
declare const users: UsersManagerInterface
declare const view: View

const controller = new AbortController()

void client.login(credentials)
void client.session()
void client.logout()
void client.secret(replacement)
void client.start(input)
void client.inspect('build')
void client.pause('build')
void client.resume('build')
void client.stop('build')
void client.tail('build')
void client.watch('build', controller.signal)
void client.units.stop('build', unit)
void client.units.steer('build', unit, 'continue')
void client.units.reply('build', unit, 'request', answer)
void client.roster.read()
void client.roster.watch(controller.signal)
void client.history.read({ limit: 25, name: 'release', prefix: 'release-' })
void client.users.directory()
void client.users.add(login)
void client.users.grant('ada', ['build', 'release'])
void client.users.regenerate('ada')
void client.users.remove('ada')
client.destroy()

stack.place(rows)
stack.collapse()
stack.collapse(row.id)
stack.expand([row.id])
stack.row(row.id)
stack.rows()
void stack.collapsed

feed.append(entry)
feed.entry(entry.id)
feed.entries()
feed.clear()
void feed.sequence

roster.start()
roster.retry()
roster.abort()
roster.clear()
void roster.destroy()
void roster.snapshot
void roster.departed
void roster.live
void roster.fault

void history.load({ name: 'release' })
void history.older()
void history.retry()
history.clear()
void history.runs
void history.cursor
void history.filter
void history.loading
void history.state
void history.changed
void history.fault

void users.load()
void users.add(login)
void users.grant('ada', ['build', 'release'])
void users.regenerate('ada')
void users.remove('ada')
users.release()
users.clear()
void users.logins
void users.environment
void users.loading
void users.fault
void users.secret

void operator.identify()
void operator.login(credentials)
void operator.logout()
void operator.secret(replacement)
void operator.open('build')
operator.select(row.id)
void operator.refresh()
void operator.destroy()
void operator.session
void operator.snapshot
void operator.selection
void operator.live
void operator.terminal
void operator.ended
void operator.fault
void operator.notice
void operator.roster
void operator.history
void operator.users

void store.get(view.id)
void store.set(view)
void store.delete(view.id)
void pointer.load()
void pointer.save(view.id)
void pointer.remove()
void store.pointer
```

The leaves need no host at all:

```ts
import type { LiveFrame } from '@app/core'
import type { WorkflowSnapshot } from '@orkestrel/workflow'
import type { UnitSnapshot } from '@orkestrel/supervisor'
import { APP_WORKFLOW_INSPECT_PATH } from '@app/core'
import {
	BrowserApplicationError,
	createOperatorStore,
	describeCommandRefusal,
	describeGrants,
	describeTally,
	deriveLineage,
	deriveResponseErrorCode,
	deriveTone,
	deriveUnitRowStatus,
	freezeDeep,
	hasDetail,
	isApplicationDirectory,
	isApplicationDirectoryResult,
	isApplicationLogin,
	isApplicationRoster,
	isApplicationRun,
	isApplicationSecret,
	isApplicationSecretResult,
	isApplicationSession,
	isApplicationSnapshot,
	isBrowserApplicationError,
	isExecutor,
	isFaultFrame,
	isFrameCount,
	isGapFrame,
	isHistoryPage,
	isHistoryRun,
	isLiveFrame,
	isObserveFrame,
	isTerminalFrame,
	isTranscriptFrame,
	isTranscriptStream,
	isView,
	matchesAbsentResponse,
	matchesLineage,
	MemoryOperatorPointer,
	MemoryOperatorStore,
	parseBrowserApplicationOptions,
	resolveRoute,
	snapshotToRows,
} from '@app/browser'

declare const frame: LiveFrame
declare const snapshot: WorkflowSnapshot
declare const units: readonly UnitSnapshot[]

const rows = snapshotToRows(snapshot, units, false)
freezeDeep(rows)
matchesLineage('["build","verify"]', '["build","verify","test",1]')
deriveLineage('["build","verify","test"]')
hasDetail({ operations: [], constraints: [] })
deriveTone('running')
const attempt = units[0]
if (attempt !== undefined) deriveUnitRowStatus(attempt)
resolveRoute(APP_WORKFLOW_INSPECT_PATH, ['build'])
parseBrowserApplicationOptions({ name: 'Supervisor' })
matchesAbsentResponse(404, 'NOT_FOUND')
deriveResponseErrorCode(403, 'FORBIDDEN')
describeCommandRefusal(new BrowserApplicationError('REQUEST', 'Server diagnostic'))
describeGrants(['*']) // 'Authorized for every workflow.'
describeGrants(['review']) // "Authorized for workflow 'review'."
describeGrants(['build', 'release']) // 'Authorized for 2 workflows.'
describeTally(['completed', 'failed', 'completed'])
createOperatorStore()
const memory = new MemoryOperatorStore()
void memory.set({ id: 'build', collapsed: [] })
void memory.get('build')
void memory.delete('build')
const pointer = new MemoryOperatorPointer()
void pointer.save('build')
void pointer.load()
void pointer.remove()
isView({ id: 'build', collapsed: [] })
isApplicationSession({
	user: 'operator',
	workflows: ['build'],
	csrf: 'token',
	provisional: true,
	confined: true,
})
isFrameCount(4)
isTranscriptStream('output')
isExecutor({ name: 'human', commands: ['stop', 'reply'] })
const run = {
	id: 'build',
	status: 'running',
	paused: false,
	created: 1_799_999_999_000,
	updated: 1_800_000_000_000,
}
isApplicationRun(run)
isApplicationRoster({ runs: [run], executors: [] })
isHistoryRun({
	id: 'release-4.1',
	name: 'Release 4.1',
	status: 'completed',
	created: 1_772_179_200_000,
	updated: 1_772_186_400_000,
	released: 1_772_186_400_000,
})
isHistoryPage({ runs: [], cursor: 'eyJ1bnRpbCI6MX0' })
const entry = { name: 'ada', workflows: ['build'] }
isApplicationLogin(entry)
const directory = { logins: [entry], environment: false }
isApplicationDirectory(directory)
isApplicationSecret({ name: 'ada', secret: '3f9c1-7ae4b-8d206-5c1fa-9b3e7-04d8c' })
isApplicationDirectoryResult({ directory })
isApplicationSecretResult({ directory, secret: { name: 'ada', secret: '3f9c1-7ae4b-8d206' } })
isApplicationSnapshot({ workflow: snapshot, paused: false, units })
isObserveFrame(frame)
isTranscriptFrame(frame)
isTerminalFrame(frame)
isGapFrame(frame)
isFaultFrame(frame)
isLiveFrame(frame)
isBrowserApplicationError(new Error('boundary'))
```

### The interface shell stays class-only, single-word, and text-only

Twenty-one single-file components render that surface, and none of them is an authority: each reads
the composition root through `useOperator` and writes only through its managers and transport. The
tree is the stack/content/selection pattern made literal, with the login form standing in front of
all of it until the session probe answers.

| Component         | Role                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ApplicationView` | The shell: banner, fleet readout, the identity chip and `Logout`, the run rail and its drawer, the three content destinations and the one login dialog, the notice toasts, and the mounting session probe. The identity chip is the door to the users destination, and only for a session that grants every workflow.                                                                                                                                                                                  |
| `LoginPanel`      | Username and password, retained on the refusal the server left deliberately ambiguous.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `SetupPanel`      | The native `<dialog>` a generated login is replaced in: the new password, its copy, the local checks neither of them reaches the network past, and the one refusal that has to be acted on somewhere else.                                                                                                                                                                                                                                                                                             |
| `RunList`         | The live runs and the ones that have left the roster, each row the control that opens it.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `HistoryView`     | Completed runs: the two filters, the listed page, `Older`, the change notice, and the typed-id door.                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OpenPanel`       | The disclosed `Open by id` door: one field naming a run that has already ended.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `UsersView`       | The login roster as a `list-group`: one row per login with its grants sentence, the `You` and generated-password marks, an environment-managed roster stated read-only, and a status line that speaks for the whole surface.                                                                                                                                                                                                                                                                           |
| `UserPanel`       | The one `<dialog>` every act on a login happens in, its moment derived from two facts: add a login, detail one for `Replace password` or a confirmed `Remove`, or reveal the one-time password an add or replacement just minted.                                                                                                                                                                                                                                                                      |
| `ThemeToggle`     | The colour-mode switch over `useTheme`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `StackList`       | The projected rows, or the honest empty state pointing at the runs directly above it.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `StackItem`       | One row: status mark, tier indent, fold control, selection control, child count.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `ContentPane`     | Dispatches on the selected row's `tier`, hosts the command bar and the feed, owns the pane's one scroll axis and the feed's floor inside it, and keys the tier view on the row id so every section's default is decided once per selection. Every view folds its own general-information facts behind a closed `Details` disclosure naming the row's status in its summary, so the pane leaves room for the feed the moment a row is selected; only the sections beneath it carry a different default. |
| `WorkflowView`    | `Details` folds the workflow's configuration, timestamps, and status behind a closed receipt naming the status; its `Phases` matrix folds behind a tally receipt and opens only for a run holding none, over the absence line that answers for it.                                                                                                                                                                                                                                                     |
| `PhaseView`       | `Details` folds the phase's concurrency and bail policy behind a closed receipt naming the status, with its `Tasks` matrix folded behind the same tally receipt and opened only over an empty phase's absence line.                                                                                                                                                                                                                                                                                    |
| `TaskView`        | `Details` folds the task's attempts, retries, timeout, and status behind a closed receipt naming the status; `Activity` is on screen only while a fact is reported and opens the first time it appears under a running task, `Result` states the latest settled attempt's verdict and opens for anything but a recorded success — a failure, or the line answering for a task no attempt has settled under — and the `Attempts` matrix carries a tally and folds for every row.                        |
| `UnitView`        | `Details` folds the attempt's identity and the sentence answering for its absence behind a closed receipt naming the status; `Payload` is the same bytes whatever the attempt did with them, so it carries a bare heading and opens for no row, while `Result` is on screen exactly when there is a verdict, states that word in its summary, and opens on its first appearance for every outcome but a recorded success.                                                                              |
| `ActivityDetail`  | One observation's operations, constraints, and progress.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `CommandBar`      | Run and attempt controls, gated on the roster and the attempt's own status.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `ReplyForm`       | The exact answer form derived from the durable prompt payload.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `FeedList`        | The chronological column, its register filters, and its four empty states.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `FeedItem`        | One entry's register chrome and its text, as text nodes.                                                                                                                                                                                                                                                                                                                                                                                                                                               |

Styling is class-only but for one stylesheet the application writes itself. The entry loads three:
Halfmoon's compiled cascade, which carries the Bootstrap 5 utilities, components, and
`[data-bs-theme]` tokens every template uses; the icon font, whose classes fill genuine affordance
gaps while each icon-bearing control keeps its accessible name; and `app/browser/styles`, four
partials behind one barrel — `tokens.css`, `focus.css`, `pane.css`, and `status.css` under
`index.css` — which declare four things and no fifth: the tokens the other three resolve through,
the focus ring every control wears, the floor the feed keeps inside the content pane, and the status
mark's dot size and its five characters. One glyph carries one meaning:
the clock glyph belongs to completed history and the door that opens it, the folder glyph to opening
a run by its id, and the feed's lineage-narrowed column wears its own. On a narrow viewport the
banner sheds whole pieces rather than shrinking them — the whole
identity goes below `sm`, and `Logout` drops to its icon — because the wordmark is the last thing that
should give way, and each shed control keeps a written accessible name, since a caption removed from
the layout leaves the accessibility tree with it. There is no inline style and no literal colour, in
the application's own stylesheet as much as in its templates: a `[data-bs-theme]` change on the
document element rethemes the whole interface through those tokens, which is exactly what `useTheme`
writes. Bootstrap's JavaScript is never imported — its ESM bundle
pulls a transitive dependency this repository does not declare — so every interactive behaviour here
is native: the responsive offcanvas classes and a backdrop the page toggles itself, a document
`keydown` listener for Escape, `btn-check` inputs for the register filters, `details` for every
disclosure that contains what it reveals, and `aria-expanded` on the buttons whose content is a
separate element. Those two are the whole of the disclosure machinery, and each half owns its expanded
fact outright — the element's own `open` for the first, the application state the button renders from
for the second — so no disclosure holds two of them.
The rail is one element at every width — a grid column from `lg` up and the drawer
that same element becomes below it — so the runs, the stack, and the door to completed history exist
exactly once in the page and once in its accessibility tree. A drawer rests closed: below `lg` a
reader arrives on the page itself and the bar's own toggle brings the runs out over it, rather than
meeting a panel laid across what they came for with a control to press before anything can be read.
Opening a run puts it away again, and a closed drawer is off screen rather than merely unstyled, so
the status line it carries is announced to nobody until it is out.

The one stylesheet the application owns exists because the cascade cannot pay two bars it owes. A
focus indicator has to reach 3:1 against what it sits on, and Halfmoon draws one as the control's
hover fill plus a halo at a fraction of a colour's opacity, which lands under that bar on the neutral
outline controls in both themes; the `focus-ring-*` utilities only retint the same halo. The halo
keeps the job it is good at — the soft wash that says something here just became live, and not what
fails the bar — and `app/browser/styles` adds the one thing a fraction of an opacity cannot supply:
an opaque edge, exactly where that band ends.

The ring ships disabled. The owner ruled (2026-08-17) that the opaque edge read as clutter in real
use, so `--app-focus-width` is `0` and the halo alone indicates focus — a trade recorded where it
is made, in `tokens.css` and in the contrast suite, because a halo at a fraction of an opacity
lands under the 3:1 bar the ring existed to clear. The width token is the whole switch: set it to
`0.125rem` and every rule, colour, and measurement below comes back exactly as written.

Its geometry, when enabled, is two hairlines rather than one band. `--app-focus-width` and
`--app-focus-offset` are
`0.125rem` each, half the halo's own spread apiece, so the ring covers the outer half of that band
while the transparent gap shows the inner half and the true surface through it, and the chrome around
a focused control grows by nothing — no focused control reaches a neighbour it could not reach
before. Its colour is two tokens with one law between them. `--app-focus-color` is the accent
worn straight — the one blue this shell already means "act here" by — and it is what inputs,
summaries, links, and focusable rows wear, because those surfaces stay their own colour under
focus and the accent clears their grounds in both themes (4.83:1 light, 3.35:1 dark, measured in
a real browser rather than argued about). Buttons are the exception with a reason: the framework's
focus state paints a button's hover fill, so a button holds its own variant's colour while
focused, and a ring in any single colour will vanish against some button somewhere — the accent
ring dies on a primary fill, and the suite measured it dying on a secondary drawer fill and a
danger door too. Every `.btn` therefore wears `--app-focus-contrast`, one part `--bs-primary` to
three parts `--bs-emphasis-color`: the deepest accent tint whose distance from every variant fill
still clears the bar with margin (3.57:1 light, 3.35:1 dark against an accent fill). The ring a
reader learns is the accent; the darker ring on buttons reads as the same signal gaining
definition against a filled control, and the accent they see around it is the halo showing through
the offset gap this ring caps.

An outline rather than a shadow, for three reasons: it stacks over the halo instead of replacing it,
its offset gap is genuinely transparent so nothing is repainted in a guessed colour, and it leaves
`box-shadow` alone on a control that also carries an elevation class — and it is the only one of the
two that survives a forced-colours mode, which the framework's stylesheet does not address at all.
The selector names what can hold keyboard focus, and `[tabindex]` is the term that carries it past
the framework's own `outline: 0`: an attribute weighs as much as a class, which lifts the compound
level with `.btn:focus-visible` and every sibling rule at that weight, and loading last decides the
tie. A second selector rings the visible label of a `btn-check` filter, whose real input is clipped
out of sight where a ring would be drawn for nobody. No transition is declared, deliberately, because
feedback that eases in reads as lag to a reader tabbing quickly through a form.

The last of the three partials is the feed's floor inside the content pane, over two tokens of its
own; the law that rule enforces is stated with the feed below. No rule in any of them declares a
cascade layer, because the framework declares none and an unlayered rule outranks every layered one,
and nothing in the files is marked important either, so a control that needs its own ring can still
take this one off.

The shell's landmarks are named. The bar is a `banner` holding one named `navigation`, the rail is a
`complementary` labelled by the runs heading it carries, and the pane is the `main` the skip link
jumps to. The two lists that arrive a page at a time each end in a `status` line, so a burst of
arrivals announces once instead of once per row: the rail says how many runs it lists and whether
their stream has stopped, and completed history says how many runs are shown, under which filter,
and whether older ones can still be loaded. Every notice that wears an `alert` class and reports
something the reader just did carries `role="alert"` to match — a refused login on the gate and in
the form, a refused command, a viewer discontinuity, a payload no reply form can answer, a roster
stream that never listed anything, and a first history page that refused — while a notice that
merely sits beside rows it did not replace announces nothing, because the status line beneath those
rows already carries the same fact once. The first-run band is the third case: it wears the alert
chrome because it is a warning and carries `role="status"` because it is a standing condition rather
than an outcome, and interrupting a reader to restate a fact that was already on screen when they
arrived spends the assertive channel on the one thing that cannot use it. A
status is one thing wherever it appears — the same `ROW_TONE` badge in the facts and in every matrix
beneath them, `ENDED_TONE` for a run the roster no longer lists, and the `ROW_MARK` glyph, wordless
but named, as the stack row's own mark.

Visible button text is one word — Login, Logout, History, Back, Open, Filter, Clear, Older, Retry,
Refresh, Pause, Resume, Stop, Confirm, Steer,
Reply, Send, Jump — mirroring the single-word member law the API itself follows. One caption is
deliberately longer: the disclosure that reveals the typed-id field reads `Open by id`, because the
control names a way in rather than an action, and `Open` alone already belongs to the button that
submits it. Fuller context
lives in `aria-label`; `title` keeps the pointer-hover hint. `ThemeToggle` is the one control that
renders no word at all, so its glyph carries the whole of its visible meaning and it wears the accent
outline rather than the neutral one every captioned control shares: the neutral variant draws its
pressed chrome from a grey the dark theme retunes below the mark bar at every surface, while the
accent is the one hue this cascade holds still across both themes. Focus is no longer part of that
argument — every control now wears the same opaque ring — but the pressed state still is.
A disabled command remains focusable,
carries `aria-disabled`, and references its reason through `aria-describedby`, while its guarded
handler makes keyboard activation inert. Bootstrap's `.disabled` class supplies the visible state
without pretending the native button is unavailable to focus. A control the reader cannot use is
never silently inert: the command bar reads the roster's advertised executor commands and the
attempt's own status, and says which of the two withheld the control. Stopping arms on the first
press and reaches the run on the second, and moving to another row disarms it. Danger is the loudest
chrome the interface owns and it belongs to a stop that can actually reach the run, so a stop held
shut by a reason wears the same neutral outline its siblings do — keeping the danger variant would
make the most dangerous control the most active-looking one at exactly the moment pressing it does
nothing — while its label, its icon, and its reason wiring are untouched.

A heading is a promise that something follows it, so every section either renders its content or
renders the line that answers for its absence, and never the heading alone. A task's reported
activity can carry none of its four facts, and the rule that decides whether there is anything to
draw is the one leaf both the detail and its heading read.

A summary is that promise carrying its receipt. A folded section states in the summary the fact a
reader would otherwise have to open it to learn, so leaving it shut costs them nothing — and a summary
carries a receipt exactly when it has a fact to receipt. A counted section carries `describeTally`
after the middle dot: `{n} {status}` while one word covers every row it lists, `{n}, {m} {worst}` when
they differ — where `ROW_RANK` decides which word leads, so an unfamiliar status can never hide a known
failure — and `0` for nothing to count, which is what a received array of holes counts as too, because
a row carrying no status word is no more one of the rows counted than it is one of the rows listed. A
settled section carries its verdict word instead, in the emphasis its outcome earned, and carries it
only there: the card beneath states the message, the reason, or the recorded value and never repeats
the word above it, and says in words that the attempt recorded none when it recorded none — at the task
tier as well as the attempt tier, because a card emptied by the verdict moving up to the summary would
read as a renderer that broke rather than as an attempt that finished quietly. A section holding no
varying fact carries the bare heading, because a receipt that cannot vary is decoration. And a section
whose fact has not happened yet carries the bare heading over the sentence that answers for it, because
a receipt states what the section holds and an absence is stated in words rather than in a word
standing in for one. The general-information facts above those sections fold behind the same closed
`Details` disclosure on every tier, so a reader keeps the space those facts once held for the feed
until they choose to spend it; the receipt in that summary is the row's own status word, keeping the
danger, warning, or success emphasis its badge's tone family assigns while every other status reads
in the muted body tone, so a verdict announces itself and an ordinary state stays quiet, and a reader
who never opens the section still knows what it would tell them. A run's failure policy is the
default its
phases inherit rather than a rule over them: the workflow row says so, and the phase matrix names
each phase's own effective policy and marks the one that overrode the default. Leaving is the
deliberate exception: `Logout` acts on its first press, because a
reader stepping away from a shared machine is not performing a destructive act that wants confirming,
and a second press between them and an emptied screen is exactly the friction that teaches readers to
stay logged in.

A run's status is its verdict, and the graceful policy lets that verdict omit a failure the run
really had: a failed task fails its phase, and a phase running under `bail: false` folds into the
workflow's own completion, so a run whose only task failed still reports `completed`. The workflow
tier is where that reading becomes a success the run never had, so `describeFailures` names the
failed tasks beside the status word that omitted them. The sentence is withheld from a run reporting
itself `failed`, because that word has already said it, and it is carried by every other status —
including a run still running past a graceful failure. The phase and task tiers need no such
qualification: each already prints the failed status as a word beside its badge, and the task tier
states the attempt's message in full.

Two vocabularies run through every visible word. **Login** is the one name for the act, so the
control is `Login`, its heading is `Login to the supervisor`, its refusals name a login, and its
inverse is `Logout`; nothing signs in. And a **workflow** is the definition a reader opens while a
**run** is the live execution they watch and command, so the grant sentence names workflows, while
the rail, the completed list, the typed-id field, the empty stack, badges, feeds, commands, and
refusals all name runs.

The grant sentence is drawn nowhere on the banner. The chip states the reader's name and stops
there: a whole sentence set inside a chip beside a username runs the two together into one string
a reader has to unpick before either half means anything, and `Authorized for every workflow.` was
the worst of them. The sentence is not dropped, because a reader who can address every run and one
who can address two named ones are different readers and only the session knows which this is. It
has two homes instead. It is the chip's own description at every width, so a reader who asks the
control what it is still receives it, carried once in the tree and never copied into an accessible
name. And it is drawn, per login, on the users roster — the surface where grants are a fact somebody
acts on — including the manager's own row. `describeGrants` composes the sentence for both, so the
two never diverge, and a reader who cannot reach the roster still meets the sentence on the chip.

The users destination is the roster made a place a manager can act in, and the identity chip in the
bar is its door. Only a session that grants every workflow may reach it, so only such a reader is
given a chip that opens rather than a chip that merely states who they are, and the door is the same
control the reader's own identity already sits on. The destination takes the content area over the
way completed history does — the run beneath it is untouched, and `Back` returns to a pane that never
left. It reads the roster when it opens and every time it is returned to, because a roster held from
an earlier visit would be a claim about the present nobody made.

`UsersView` renders that roster as a `list-group`, one row per login, and stands in one of five
states. While the first read is still on its way the rows' frame is held with a skeleton inside it,
and the skeleton is gated so a read that resolves quickly replaces the frame with real rows and
flashes nothing between; a read that has never listed anything and then refused drops the list
entirely and puts its own refusal and a `Retry` where the rows would be; a read that lists rows shows
them, one login apiece; a change that refused while a roster was already on screen leaves that roster
standing and sets a notice beside the rows it did not alter, with the status line beneath carrying the
fact once so the notice announces nothing; and a writable roster holding only the reader themselves is
told it is the one login rather than an empty one, with the invitation to add a second. Each row states
its login's name, the same grants sentence `describeGrants` composes for the identity chip, a `You`
pill on the reader's own row, and — on a login still holding the password the supervisor generated —
the generated-password mark as an icon beside a word, never a colour alone. One `role="status"` line
speaks for the whole surface, derived from the same facts the rows are, so the sentence and the list
can never disagree about which state the reader is in.

The gate the skeleton reads is `usePlaceholder`, the one composable a loading surface owns: it holds
`shown` false through `PLACEHOLDER_GRACE`, so a fast path renders straight to its rows, and once a
genuine wait raises the skeleton it holds it for at least `PLACEHOLDER_MINIMUM`, so a wait that ends a
moment later reads as a wait rather than a flicker. Nothing here polls — both thresholds are timers
armed on the transitions of the wait and cleared when the scope is disposed.

```ts
import { effectScope } from 'vue'
import { PLACEHOLDER_GRACE, PLACEHOLDER_MINIMUM, usePlaceholder } from '@app/browser'

void PLACEHOLDER_GRACE // 200 — the wait tolerated before any skeleton appears
void PLACEHOLDER_MINIMUM // 400 — the least a shown skeleton then holds

effectScope().run(() => {
	let waiting = true
	const { shown } = usePlaceholder(() => waiting)
	// `shown` stays false through the grace, so a read that resolves inside it flashes no skeleton.
	waiting = false
	void shown.value
})
```

Whether those rows are controls is the one deployment fact this surface turns on. A roster the server
owns is writable, so each row is the button that opens the one dialog and an `Add` stands in the
header above them. A roster the environment configured through `APP_USERS` is one the server may read
but never rewrite, so its rows are plain statements rather than doors, no `Add` is offered, and a
notice states the remedy — change `APP_USERS` and `APP_PRINCIPALS` where the server is configured,
then restart it — rather than a control the server would refuse. The environment variable names are
the reader's remedy; the principal token a login borrows is never among the words this surface shows.

Every act on a login is performed in one `UserPanel`, a native `<dialog>` raised as a modal, and its
moment is derived from two facts rather than passed in. A held one-time secret is the **reveal**
wherever it came from; otherwise a subject login is the **detail** of that login, and its absence is
the **add** of one that does not exist yet. Adding names the login and its grants — every workflow, or
a comma-separated list of ids, checked for a blank or a duplicate name in the browser before the
request leaves — and a success mints the login's password and turns the same dialog into the reveal.
Detail states the login's grants and offers exactly two acts: `Replace password`, which regenerates
the password into a fresh reveal, and `Remove`, which confirms in place inside the same card rather
than behind a second dialog. The confirm repeats the verb on the act — `Remove {name}` beside
`Keep {name}` — and asks for no name typed back, because a removal that ends the login's sessions at
their next request and cannot be undone is confirmed by naming it, not by transcribing it. The reveal
is the one place a password is ever shown, and the only component that ever holds one: it warns that
the password is shown once, offers to copy it, and is finished with `Done` rather than dismissed.
Every way out — Escape, the close control, `Done`, a successful removal, and the dialog's own teardown
— releases that secret, so nothing typed or revealed outlives the dialog.

The vocabulary is its own. The heading is **Users**; what each login may address is its **grants**,
and grants are by workflow; the principal **token** behind a grant is never named to the reader; a
regeneration is **Replace password** and a deletion is **Remove**. This browser stores no one's
password, and the surface says so where a reader meets it.

The login form says only what the server said. An unknown name, a wrong password, and a name whose
principal no longer resolves are one refusal on the wire, so the panel marks both fields, names
neither, and keeps what the reader typed so they can correct one and submit the same pair again. A
refusal earned elsewhere in the interface never retitles that form, and a `429` from the limiter is
reported as the panel's own answer rather than either field's, because the limiter never read what
was typed. Focus lands on the first field still outstanding, and every marked field describes why it
is marked before it describes what it is for.

The reply form derives its shape from the durable payload through the same `parseHumanPrompt` the
human executor uses, so answering a parked prompt adds no server surface at all — the prompt's own
bounds are enforced in the form as well as at the executor, because an answer that cannot satisfy
them is one the reader can still correct in place. Every rendered value is a text node: there is no
markdown rendering and no `v-html`, transcript and terminal text is unredacted secret-bearing
provider output, and the shell's own Content-Security-Policy prologue keeps `script-src` at `'self'`
with inline handlers off. A host that already names the request above the form lends its heading, and
the form's controls take their accessible name from it through `aria-labelledby`, so the prompt is on
screen exactly once whether the form is disclosed from a feed record or from the command bar.

The feed's column is an `aria-live` log that follows arrivals by the
admission ordinal rather than by rendered length, and stops following the moment the reader scrolls
away from the newest entry. Its empty message sits above that column rather than beneath it, where a
reader is already looking, and an ended run is told the run ended instead of being asked to keep
waiting. The pane around it owns one scroll axis, and the feed owns a floor inside it. The selected
row's facts refuse to shrink, because a facts region with a scroller of its own was silently squeezed
shut by the column growing beside it — but "what is left over" is nothing on a viewport those facts
already fill, and on a real 600-pixel window that left the feed around eighty-five visible pixels. So
the feed is guaranteed `max(var(--app-feed-share), var(--app-feed-floor))`: a third of the pane
belongs to it however much the facts above it need, and eight root-em lines are the absolute floor
beneath that share, keeping the column readable when the pane is shorter than the viewport the
proportional promise was measured against. The pane then scrolls past both. Two scrollers exist and no
more — this one, and the log inside the feed. The floor is what keeps the feed readable; the folded
sections are what keep that floor on screen.

## Recovery

Recovery has three outcomes, never two:

- **Reattach.** The provider proves a recorded external unit or durable result is present, and an
  attach capability returns a live handle.
- **Relaunch.** The executor positively proves absence. A transient failure, missing probe, or
  token-only address for an identity-only provider is not proof.
- **Quarantine.** The launch outcome remains undetermined. Quarantine is a terminal first-class
  unit state, not a retry marker.

`RunInterface.reconcile` first owns and validates the workflow snapshot, rejects the wrong workflow
id, reads all live durable unit rows, and reuses any live unit this run already holds without
re-probing or replacing its handle. Unheld rows are decided through their recorded executor. A
missing executor, missing probe, thrown/failed probe, missing attach after present evidence, or
thrown/failed attach becomes quarantine. Reconciliation itself returns a typed failure rather than
throwing.

Only matching quarantined rows change the workflow projection, and only while the corresponding
task is still running at the same attempt. That task becomes a workflow recovery failure. Reattach
and relaunch decisions leave workflow task state and attempts unchanged. Phase and workflow
overrides remain authoritative. After that projection, and only after it, the caller applies
workflow's `recoverWorkflow` so retry budget is never spent before external work is classified.

```ts
import type { ExecutorInterface } from '@orkestrel/supervisor'
import { createMemoryWorkflowStore, failure, recoverWorkflow, success } from '@orkestrel/workflow'
import {
	MemorySupervisorStore,
	SupervisorError,
	createSupervisor,
	deriveToken,
} from '@orkestrel/supervisor'

const workflows = createMemoryWorkflowStore()
await workflows.set({
	id: 'restore-build',
	name: 'Restore build',
	status: 'running',
	bail: true,
	phases: [
		{
			id: 'verify',
			name: 'Verify',
			status: 'running',
			bail: true,
			tasks: [
				{
					id: 'test',
					name: 'Test',
					status: 'running',
					metadata: {},
					attempts: 1,
					retries: 1,
					activity: { operations: [], constraints: [], updated: 1 },
				},
			],
		},
	],
	created: 1,
	updated: 1,
})

const records = new MemorySupervisorStore()
const previous = await records.acquire('restore-build', 'crashed-worker')
if (!previous.success) throw previous.error
const context = { workflow: 'restore-build', phase: 'verify', task: 'test', attempt: 1 }
const seeded = await records.set(previous.value, {
	id: deriveToken(context),
	context,
	executor: 'remote',
	epoch: previous.value.epoch,
	revision: 1,
	payload: {},
	created: 1,
	updated: 1,
	status: 'running',
})
if (!seeded.success) throw seeded.error
await records.release(previous.value)

const saved = await workflows.get('restore-build')
if (saved === undefined) throw new Error('Workflow snapshot is missing')
const remote: ExecutorInterface = {
	name: 'remote',
	async launch() {
		return failure(new SupervisorError('Recovery example does not launch', { code: 'LAUNCH' }))
	},
	async probe() {
		return success('absent')
	},
}
const supervisor = createSupervisor({
	id: 'recovery-worker',
	store: records,
	executors: [remote],
})
const opened = await supervisor.open(saved.id)
if (!opened.success) throw opened.error
const reconciled = await opened.value.reconcile(saved)
if (!reconciled.success) throw reconciled.error
if (reconciled.value.units[0]?.recovery !== 'relaunch') {
	throw new Error('Live unit was not reconciled for relaunch')
}

const recovered = recoverWorkflow(reconciled.value.snapshot)
await recovered.destroy()
await supervisor.destroy()
```

When reconciliation returns reattach, a later launch for the same workflow/phase/task adopts the
highest-attempt reattachable unit, carries its identity into the new attempt row, and never calls the
executor's launch method. An executor-name mismatch refuses adoption with `LAUNCH` and directs the
caller back through reconciliation rather than minting a second external identity.

## Service-axis live proofs

Protocol-faithful fixture processes run in the default server suite. Real installed providers live
on a separate explicit service axis. The process-provider projects are `service:claude`,
`service:codex`, and `service:cursor`; the direct CLI inference projects are
`service:claude-inference`, `service:codex-inference`, and `service:cursor-inference`; the local
agent path is `service:ollama`. They are intentionally absent from `npm test`. Each project has a
120-second test and hook bound, runs files serially, hard-requires its executable or daemon,
authentication where applicable, and readiness at setup, and reports the selected model.

`CLAUDE_LIVE_MODEL` defaults to `haiku`, `CODEX_LIVE_MODEL` to `gpt-5.6-luna`, and
`CURSOR_LIVE_MODEL` to `composer-2.5`; `OLLAMA_LIVE_MODEL` defaults to
`qwen3.5:2b-q4_K_M`. `scripts/service.sh` is the paired provisioning/readiness seam. Its Ollama arm
starts a missing local daemon, pulls a missing pinned model, and warms it with one token before the
test bound begins. `npm run test:service` selects all seven projects, while
`npm run test:service:ollama` selects only the local path. An unrun service project is
unproven—never silently skipped and never reported green.

## Client hookup

Each registration and approval flag below was run against a built server
(`dist/app/server/main.cjs`) with a bearer principal and a login user, driving the `POST /mcp` route
with the real client. That field test predates the `observer` split and ran when one tool carried
the whole surface, so the allowlist keys below name the two tools this server now advertises while
the keying mechanism — one `mcp__<server>__<tool>` entry per tool — is exactly the one it exercised.
The surface every client sees is the same two tools — `supervisor` to change a run, `observer` to
read it — and only the registration syntax, the grant granularity, and the headless approval flow
differ. Capture the server's stderr while doing this: its one readiness line and every refusal go
there and nowhere else.

Authentication is one bearer per principal. `APP_PRINCIPALS` mints the same tokens the REST routes
accept, and that principal's grants decide which workflows the client may read and command.
Sessions and cookies are the browser's lane; agents use bearers. There is no separate MCP
credential and no unauthenticated path.

**Claude Code** registers the route and, headless, must be told which tools are allowed:

```bash
claude mcp add --transport http supervisor http://HOST:PORT/mcp \
  --header "Authorization: Bearer TOKEN"
claude -p 'start the build workflow and answer its human gate' \
  --allowedTools "mcp__supervisor__supervisor,mcp__supervisor__observer"
claude -p 'report the build workflow state' --allowedTools "mcp__supervisor__observer"
```

The first `-p` invocation is the operator posture and needs both tools: the loop is `observer`
`inspect` to find the parked unit and request, then `supervisor` `reply`. The second is the auditor
posture and names `observer` alone. Because this allowlist keys one tool at a time, that is a grant
rather than an instruction: the session reaches the read tool and has no key for the mutating one.
An `--mcp-config` file carries the same registration as
`{"type":"http","url":…,"headers":{"Authorization":"Bearer …"}}`.

**Codex** takes the token from the launching environment:

```bash
export SUPERVISOR_TOKEN=TOKEN
codex mcp add supervisor --url http://HOST:PORT/mcp --bearer-token-env-var SUPERVISOR_TOKEN
```

Registration is per server, so both tools arrive together and the operator loop works unchanged.
Interactive Codex approves each tool call as intended. Non-interactive `codex exec` cancels MCP tool
calls regardless of its approval policy; only `--dangerously-bypass-approvals-and-sandbox` clears
that, which is acceptable solely inside an externally sandboxed container.

**Cursor** registers per project and is enabled once per machine:

```json
{
	"mcpServers": {
		"supervisor": { "url": "http://HOST:PORT/mcp", "headers": { "Authorization": "Bearer TOKEN" } }
	}
}
```

```bash
agent mcp enable supervisor
agent -p 'report the build workflow state' --approve-mcps --force
```

`agent mcp enable` is server-scoped like Codex's registration, so this session also holds both
tools; ask mode is the read posture and it is a posture, not a grant. Interactive Cursor approves
per call. Headless Cursor rejects MCP calls without both `--approve-mcps` and `--force`; `--force`
also unlocks shell access, so use it only in ask mode or a sandboxed environment.

Least privilege therefore lands differently per client, and this guide claims only what the client
survey settled. Claude Code grants at tool level: `--allowedTools` takes one `mcp__<server>__<tool>`
key per tool, which is the mechanism the field test used and the reason an `observer`-only session
is expressible at all. Codex and Cursor grant at server level today — `codex mcp add` plus per-call
approval, `agent mcp enable` plus `--approve-mcps` — and no per-tool key was established for either,
so treat a registration there as granting both tools until one is proven.
Nor can the read-only tool be expected to announce itself: no client was observed changing an
approval prompt or an allowlist on the basis of MCP tool annotations. The `readOnlyHint` and
`destructiveHint` strings do appear in the Claude and Cursor bundles and not in the Codex npm
wrapper, but no path from either string to a prompt or a grant was traced, so `observer` being
read-only is a fact about this server, not a fact any of these clients is known to act on. Where the
client cannot express the narrower grant, narrow the credential instead: `APP_PRINCIPALS` grants
workflows rather than commands, so a server-level grant is a full operator grant over exactly the
workflows that principal holds — and a smaller roster is the only lever the application offers.

With that hookup, clients from different vendors coordinate through one durable run: any authorized
client starts and commands a workflow, any authorized client answers a parked human request
(`observer` `inspect` for the unit and request, then `supervisor` `reply`), and the same gate stays
answerable by a human in the browser. Whoever answers first settles it, and the record shows one
truth to everyone.

The honest limit is the transport, not the visibility. The `supervisor/watch` method is dispatched
only on the modern stateless revision; the legacy revision these three clients speak answers a
method-not-found error for every method outside `initialize`, `ping`, and `tools/*`. An agent client
therefore cannot subscribe to a held-open stream — held-open streaming is for protocol-native
clients using this package's own HTTP client transport, and for the browser interface over the
authorized SSE route. It does not follow that agents poll `inspect`: `observer` `watch` is an
ordinary `tools/call` every revision dispatches, and it answers with the next page of durable
observations against the cursor the caller supplies, so a client sees each observation once and
calls again only when `more`, or new work, says there is something it has not seen.

## Honest limits

There is no exactly-once. Fencing prevents a stale owner from publishing; it cannot undo an
external side effect that already happened. The irreducible indeterminate interval begins at the
earliest instant `ExecutorInterface.launch` may have been accepted and ends when the provider
identity commit becomes durable.

Inside that interval a crash leaves an intent row with no identity. The correlation token makes the
interval named and addressable, not eliminated. A token-aware provider can answer it. An
identity-only provider has no native id to query, so the honest result is quarantine unless the
application has independently declared token-keyed idempotency. No adapter widens that decision on
the application's behalf.

A stale or partitioned process can continue external effects after its lease expires. It cannot
write the record. A never-settling required store promise can also keep launch or disposal pending;
core cannot add a timeout without risking a late out-of-order write. Those are deployment and
backend responsibilities, not success states this package fabricates.

Watching has its own limits, and they are limits of the record rather than of the tool. `observer`
`watch` pages the same retained tail the journal route serves, so a run that outgrew
`APP_JOURNAL_ENTRIES`, `APP_JOURNAL_BYTES`, or `APP_JOURNAL_AGE` has already lost its earliest
frames: `gap` says the asked-for position is gone instead of renumbering around the loss, and
`inspect` is the recovery because the durable unit rows outlive the observations about them. Even a
clean `closed` therefore promises only that the retained history was fully drained, never that
nothing was pruned before the first call. `watch` also returns observation frames only — never
verbatim transcript, never terminal render — because those two registers are live-only and
unredacted, reachable while they happen through a held-open stream or the browser's authorized SSE
route and never through a durable read.

Nor does this application put a deadline on a slow call. The composed server wires no request
timeout, so a `stop` holds its MCP response for as long as the executor takes to observe
termination, and the client's own timeout is the only bound. Claude Code's default is 30,000
milliseconds and `MCP_TIMEOUT` raises it; the equivalent bound for Codex and Cursor was not
established. A client timeout ends the call, not the command: the run keeps terminating, the record
still settles, and `observer` will show it.

## Methods

Readonly data stays in the Surface rows. Each table below exactly matches the named interface or
class call-signature members. Concrete-class tables retain the implementation policy that matters at
the call site without inventing a second contract.

#### `CLIBackendInterface`

| Method  | Returns               | Behavior                                                                 |
| ------- | --------------------- | ------------------------------------------------------------------------ |
| `build` | `readonly string[]`   | Build vendor argv while keeping the stdin prompt out of arguments.       |
| `parse` | `readonly CLIEvent[]` | Translate one decoded frame and ignore unknown inner-loop frame classes. |

#### `ClaudeCLIBackend`

| Method  | Returns               | Behavior                                                                     |
| ------- | --------------------- | ---------------------------------------------------------------------------- |
| `build` | `readonly string[]`   | Build print-mode stream-json argv with all built-in tools disabled.          |
| `parse` | `readonly CLIEvent[]` | Translate assistant text and aggregate result usage; ignore model telemetry. |

#### `CLIProvider`

| Method     | Returns                                         | Behavior                                                                         |
| ---------- | ----------------------------------------------- | -------------------------------------------------------------------------------- |
| `generate` | `Promise<ProviderResult>`                       | Drain the same stream engine and return its assembled result.                    |
| `stream`   | `AsyncGenerator<ProviderDelta, ProviderResult>` | Own one scratch process group and yield content with abort-safe partial results. |

#### `CodexCLIBackend`

| Method  | Returns               | Behavior                                                           |
| ------- | --------------------- | ------------------------------------------------------------------ |
| `build` | `readonly string[]`   | Build read-only `exec` JSON Lines argv with stdin selected by `-`. |
| `parse` | `readonly CLIEvent[]` | Translate completed agent messages and snake_case terminal usage.  |

#### `CursorCLIBackend`

| Method  | Returns               | Behavior                                                                 |
| ------- | --------------------- | ------------------------------------------------------------------------ |
| `build` | `readonly string[]`   | Build trusted read-only `--mode ask` stream-json argv without `--force`. |
| `parse` | `readonly CLIEvent[]` | Translate assistant text and optional camelCase terminal result usage.   |

#### `JournalInterface`

| Method    | Returns                                  | Behavior                                                                                         |
| --------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `append`  | `Promise<Result<void, SupervisorError>>` | Append under the lease and unit fence; stale tenure, revision, or sequence returns `FENCED`.     |
| `entries` | `Promise<readonly Observation[]>`        | Read bounded history in ascending sequence order without a lease; invalid limits throw `STORE`.  |
| `prune`   | `Promise<number>`                        | Drop observations older than an exclusive timestamp across all units and report the exact count. |

#### `MemoryJournal`

| Method    | Returns                                  | Behavior                                                                                                                                     |
| --------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `append`  | `Promise<Result<void, SupervisorError>>` | Own and redact every free-text field, advance high-water fences, then enforce per-unit caps; a single over-byte entry leaves history intact. |
| `entries` | `Promise<readonly Observation[]>`        | Expire aged entries and return frozen owned copies of the newest requested tail in ascending sequence order.                                 |
| `prune`   | `Promise<number>`                        | Prune history and discard fence/sequence high-water entries for units left with no retained observations.                                    |

#### `SupervisorStoreInterface`

| Method    | Returns                                          | Behavior                                                                                              |
| --------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `acquire` | `Promise<Result<Lease, SupervisorError>>`        | Grant the first epoch or take over an expired lease; refuse any live lease, including the same owner. |
| `renew`   | `Promise<Result<Lease, SupervisorError>>`        | Extend a live matching lease at the same epoch.                                                       |
| `get`     | `Promise<RunSnapshot \| undefined>`              | Read the lease and units in ascending phase, task, and numeric attempt order.                         |
| `list`    | `Promise<RunPage>`                               | Page the catalog under a fixed watermark, newest first; invalid options throw `STORE`.                |
| `set`     | `Promise<Result<UnitSnapshot, SupervisorError>>` | Insert revision one or compare-and-set a later revision after rechecking the live fence.              |
| `release` | `Promise<void>`                                  | Expire a matching lease in place at the same epoch; stale and repeated releases are no-ops.           |

#### `MemorySupervisorStore`

| Method    | Returns                                          | Behavior                                                                      |
| --------- | ------------------------------------------------ | ----------------------------------------------------------------------------- |
| `acquire` | `Promise<Result<Lease, SupervisorError>>`        | Grant or take over through one indivisible transition; refuse any live lease. |
| `renew`   | `Promise<Result<Lease, SupervisorError>>`        | Extend the matching live in-process lease without minting an epoch.           |
| `get`     | `Promise<RunSnapshot \| undefined>`              | Return an immutable in-process record snapshot.                               |
| `list`    | `Promise<RunPage>`                               | Filter, order, bound, and freeze one page from the in-process catalog.        |
| `set`     | `Promise<Result<UnitSnapshot, SupervisorError>>` | Own and write a unit only after checking lease tenure and revision.           |
| `release` | `Promise<void>`                                  | Expire the matching in-process lease while retaining its epoch.               |

#### `DatabaseSupervisorStore`

| Method    | Returns                                          | Behavior                                                                                        |
| --------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `acquire` | `Promise<Result<Lease, SupervisorError>>`        | Insert an absent lease or replace an expired one inside one transaction; refuse any live lease. |
| `renew`   | `Promise<Result<Lease, SupervisorError>>`        | Re-read and extend the matching live lease in one database transaction.                         |
| `get`     | `Promise<RunSnapshot \| undefined>`              | Read and validate one complete durable workflow record in one transaction.                      |
| `list`    | `Promise<RunPage>`                               | Read every catalog row in descending order and own one validated page in one transaction.       |
| `set`     | `Promise<Result<UnitSnapshot, SupervisorError>>` | Re-read the fence and insert or compare-and-set the unit in one transaction.                    |
| `release` | `Promise<void>`                                  | Re-read and expire the matching lease in one transaction without deleting it.                   |

#### `BriefStoreInterface`

| Method   | Returns                                   | Behavior                                                                               |
| -------- | ----------------------------------------- | -------------------------------------------------------------------------------------- |
| `get`    | `Promise<Brief \| undefined>`             | Read one immutable brief by its caller-minted id.                                      |
| `set`    | `Promise<Result<Brief, SupervisorError>>` | Insert once and atomically retire the sole parent when present.                        |
| `child`  | `Promise<Brief \| undefined>`             | Read the at-most-one successor indexed by a parent id.                                 |
| `retire` | `Promise<Result<Brief, SupervisorError>>` | Withdraw one present brief idempotently while preserving its first retirement instant. |

#### `MemoryBriefStore`

| Method   | Returns                                   | Behavior                                                                                |
| -------- | ----------------------------------------- | --------------------------------------------------------------------------------------- |
| `get`    | `Promise<Brief \| undefined>`             | Read the frozen process-local record without exposing mutable state.                    |
| `set`    | `Promise<Result<Brief, SupervisorError>>` | Own and validate one born-live record, enforcing write-once linearity without yielding. |
| `child`  | `Promise<Brief \| undefined>`             | Resolve the process-local parent-to-child index.                                        |
| `retire` | `Promise<Result<Brief, SupervisorError>>` | Retire a present record once and return the retained instant thereafter.                |

#### `DatabaseBriefStore`

| Method   | Returns                                   | Behavior                                                                                         |
| -------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `get`    | `Promise<Brief \| undefined>`             | Read, validate, clone, and freeze one row inside a native transaction.                           |
| `set`    | `Promise<Result<Brief, SupervisorError>>` | Check id, parent, and child index before inserting child and retiring parent in one transaction. |
| `child`  | `Promise<Brief \| undefined>`             | Validate both the lineage row and referenced brief before returning the successor.               |
| `retire` | `Promise<Result<Brief, SupervisorError>>` | Re-read and persist the first retirement instant in one transaction.                             |

#### `Lane`

| Method    | Returns      | Behavior                                                                                            |
| --------- | ------------ | --------------------------------------------------------------------------------------------------- |
| `execute` | `Promise<T>` | Start one operation after everything already queued, absorbing a rejection instead of spreading it. |

#### `ExecutionInterface`

| Method    | Returns         | Behavior                                                                   |
| --------- | --------------- | -------------------------------------------------------------------------- |
| `destroy` | `Promise<void>` | Idempotently detach local resources without terminating the external unit. |

#### `ExecutorInterface`

| Method   | Returns                                                | Behavior                                                                |
| -------- | ------------------------------------------------------ | ----------------------------------------------------------------------- |
| `launch` | `Promise<Result<ExecutionInterface, SupervisorError>>` | Launch one external unit from a committed intent.                       |
| `attach` | `Promise<Result<ExecutionInterface, SupervisorError>>` | Optionally adopt an existing native unit or its durable result.         |
| `probe`  | `Promise<Result<ProbeStatus, SupervisorError>>`        | Optionally prove that the addressed external unit is present or absent. |
| `stop`   | `Promise<Result<void, SupervisorError>>`               | Optionally terminate the addressed native unit and observe termination. |
| `steer`  | `Promise<Result<void, SupervisorError>>`               | Optionally steer the addressed native unit.                             |
| `reply`  | `Promise<Result<void, SupervisorError>>`               | Optionally answer a request from the addressed native unit.             |

#### `FunctionExecutor`

| Method   | Returns                                                | Behavior                                                                                                                     |
| -------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `launch` | `Promise<Result<ExecutionInterface, SupervisorError>>` | Mint an immediate identity, fold cancellation, and invoke the plain function after commitment.                               |
| `probe`  | `Promise<Result<ProbeStatus, SupervisorError>>`        | Report present only while the token remains live in this process registry.                                                   |
| `stop`   | `Promise<Result<void, SupervisorError>>`               | Abort the executor-owned signal component and await observed settlement; a signal-ignoring function leaves the wait pending. |

#### `ProviderInterface`

| Method    | Returns                        | Behavior                                                                                     |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------- |
| `launch`  | `ProcessCommand`               | Translate durable provider input into a launch command without spawning.                     |
| `attach`  | `ProcessCommand`               | Optionally translate an identity-addressed native continuation.                              |
| `probe`   | `ProcessCommand` or undefined  | Optionally build a read-only probe, returning undefined when the address is insufficient.    |
| `answer`  | `ProbeStatus` or undefined     | Optionally correlate completed probe output with its context and return only positive proof. |
| `observe` | `Observation` or undefined     | Statelessly translate one decoded frame for the journal, ignoring unknown frames.            |
| `settle`  | `ExecutionResult` or undefined | Statelessly translate one decoded terminal frame for the result channel.                     |
| `encode`  | `string`                       | Optionally encode one steer or reply for a live stdin channel.                               |

#### `ProviderExecutor`

| Method   | Returns                                                | Behavior                                                                               |
| -------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `launch` | `Promise<Result<ExecutionInterface, SupervisorError>>` | Spawn a launch command in an owned process group and expose framed execution channels. |

`stop` is always constructor-assigned because the executor owns every local process it spawns.
The optional attach, probe, steer, and reply function properties are assigned only when the adapter
exposes the corresponding capability, preserving genuine structural absence.

#### `ProviderExecutionInterface`

| Method    | Returns            | Behavior                                                                      |
| --------- | ------------------ | ----------------------------------------------------------------------------- |
| `send`    | `Promise<boolean>` | Encode one live-channel message and resolve whether local stdin delivered it. |
| `stop`    | `Promise<void>`    | Terminate the executor-owned local process group with bounded grace.          |
| `destroy` | `Promise<void>`    | Idempotently terminate and detach the executor-owned local process group.     |

#### `ClaudeProvider`

| Method    | Returns                        | Behavior                                                                            |
| --------- | ------------------------------ | ----------------------------------------------------------------------------------- |
| `launch`  | `ProcessCommand`               | Build the installed headless stream command without application permission flags.   |
| `attach`  | `ProcessCommand`               | Continue a recorded session identity through headless `--resume`.                   |
| `probe`   | `ProcessCommand` or undefined  | List all sessions only when the address contains an identity.                       |
| `answer`  | `ProbeStatus` or undefined     | Return present only when the listing contains the probed session identity.          |
| `observe` | `Observation` or undefined     | Translate init, assistant/tool, result, error, and warning frames.                  |
| `settle`  | `ExecutionResult` or undefined | Preserve final Claude text as success or map the terminal error to handler failure. |

#### `CodexProvider`

| Method    | Returns                        | Behavior                                                                              |
| --------- | ------------------------------ | ------------------------------------------------------------------------------------- |
| `launch`  | `ProcessCommand`               | Build one `codex exec --json` turn in the configured workspace.                       |
| `attach`  | `ProcessCommand`               | Continue a recorded thread through one-shot exec resume.                              |
| `probe`   | `ProcessCommand` or undefined  | Build static App Server initialize and `thread/read` input only for an identity.      |
| `answer`  | `ProbeStatus` or undefined     | Return present only for the matching successful thread-read response.                 |
| `observe` | `Observation` or undefined     | Translate thread identity, item activity, terminal, and diagnostic frames.            |
| `settle`  | `ExecutionResult` or undefined | Preserve bounded terminal usage as success or map terminal errors to handler failure. |

#### `CursorProvider`

| Method    | Returns                        | Behavior                                                                                       |
| --------- | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| `launch`  | `ProcessCommand`               | Build the trusted headless stream command without `--force`.                                   |
| `observe` | `Observation` or undefined     | Translate session identity, assistant/tool activity, terminal, and diagnostic frames.          |
| `settle`  | `ExecutionResult` or undefined | Map a result frame per its fields; absence leaves the executor's uniform exit fallback active. |

#### `UnitInterface`

| Method       | Returns                                    | Behavior                                                                 |
| ------------ | ------------------------------------------ | ------------------------------------------------------------------------ |
| `identify`   | `Promise<Result<number, SupervisorError>>` | Commit a provider identity under the unit fence and return the revision. |
| `observe`    | `Promise<Result<void, SupervisorError>>`   | Append a bounded redacted observation under the unit fence.              |
| `settle`     | `Promise<Result<void, SupervisorError>>`   | Commit the terminal external outcome under the unit fence.               |
| `quarantine` | `Promise<Result<void, SupervisorError>>`   | Mark an undeterminable launch terminally quarantined.                    |
| `stop`       | `Promise<Result<void, SupervisorError>>`   | Permanently stop the external unit under the unit fence.                 |
| `steer`      | `Promise<Result<void, SupervisorError>>`   | Steer the external unit under the unit fence.                            |
| `reply`      | `Promise<Result<void, SupervisorError>>`   | Reply under the unit fence using a request constraint's `id` as address. |
| `snapshot`   | `UnitSnapshot`                             | Project the current durable unit row.                                    |

#### `Unit`

| Method       | Returns                                    | Behavior                                                                                      |
| ------------ | ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `identify`   | `Promise<Result<number, SupervisorError>>` | Serialize and compare-and-set the provider identity at the next revision.                     |
| `observe`    | `Promise<Result<void, SupervisorError>>`   | Append through the borrowed journal while the run remains active.                             |
| `settle`     | `Promise<Result<void, SupervisorError>>`   | Serialize and compare-and-set a settled terminal row, then emit settle.                       |
| `quarantine` | `Promise<Result<void, SupervisorError>>`   | Serialize and compare-and-set a quarantined terminal row, then emit quarantine.               |
| `stop`       | `Promise<Result<void, SupervisorError>>`   | Delegate fenced permanent termination or return `UNSUPPORTED` when the executor omits it.     |
| `steer`      | `Promise<Result<void, SupervisorError>>`   | Delegate fenced steering or return `UNSUPPORTED` when the executor omits it.                  |
| `reply`      | `Promise<Result<void, SupervisorError>>`   | Delegate a fenced request reply or return `UNSUPPORTED` when the executor omits it.           |
| `snapshot`   | `UnitSnapshot`                             | Return the latest row accepted by the durable store; no independently mutable status is kept. |

#### `UnitManagerInterface`

| Method  | Returns                      | Behavior                            |
| ------- | ---------------------------- | ----------------------------------- |
| `unit`  | `UnitInterface` or undefined | Find one unit by correlation token. |
| `units` | `readonly UnitInterface[]`   | List all units in registry order.   |

#### `UnitManager`

| Method  | Returns                      | Behavior                                                           |
| ------- | ---------------------------- | ------------------------------------------------------------------ |
| `unit`  | `UnitInterface` or undefined | Read one entry from the run-owned shared registry.                 |
| `units` | `readonly UnitInterface[]`   | Return a frozen snapshot of the shared registry's insertion order. |

#### `ExecutorManagerInterface`

| Method      | Returns                          | Behavior                                                     |
| ----------- | -------------------------------- | ------------------------------------------------------------ |
| `add`       | `ExecutorInterface`              | Register an executor by its own name; duplicate names throw. |
| `remove`    | `boolean`                        | Remove one executor by name.                                 |
| `executor`  | `ExecutorInterface` or undefined | Find one executor by name.                                   |
| `executors` | `readonly ExecutorInterface[]`   | List all executors in registry order.                        |

#### `ExecutorManager`

| Method      | Returns                          | Behavior                                                                     |
| ----------- | -------------------------------- | ---------------------------------------------------------------------------- |
| `add`       | `ExecutorInterface`              | Register a non-empty unique name or throw a typed protocol/conflict failure. |
| `remove`    | `boolean`                        | Remove one borrowed executor without destroying it.                          |
| `executor`  | `ExecutorInterface` or undefined | Read one executor from the shared registry.                                  |
| `executors` | `readonly ExecutorInterface[]`   | Return a frozen snapshot in registration order.                              |

#### `RunManagerInterface`

| Method | Returns                     | Behavior                              |
| ------ | --------------------------- | ------------------------------------- |
| `run`  | `RunInterface` or undefined | Find one held run by workflow id.     |
| `runs` | `readonly RunInterface[]`   | List all held runs in registry order. |

#### `RunManager`

| Method | Returns                     | Behavior                                                        |
| ------ | --------------------------- | --------------------------------------------------------------- |
| `run`  | `RunInterface` or undefined | Read one live tenure from the supervisor-owned shared registry. |
| `runs` | `readonly RunInterface[]`   | Return a frozen snapshot in acquisition order.                  |

#### `RunInterface`

| Method      | Returns                                             | Behavior                                                                                   |
| ----------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `launch`    | `Promise<Result<UnitInterface, SupervisorError>>`   | Authorize one unit through the intent-before-effect transaction, launching or reattaching. |
| `reconcile` | `Promise<Result<ReconcileResult, SupervisorError>>` | Decide reattach, relaunch, or quarantine before workflow recovery.                         |
| `inspect`   | `Promise<Result<RunSnapshot, SupervisorError>>`     | Read the authoritative durable run record.                                                 |
| `destroy`   | `Promise<void>`                                     | Idempotently release the lease and detach local resources.                                 |

#### `Run`

| Method      | Returns                                             | Behavior                                                                                                                           |
| ----------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `launch`    | `Promise<Result<UnitInterface, SupervisorError>>`   | Commit revision-one intent before launch, adopt the highest reattachable attempt when present, and commit a later native identity. |
| `reconcile` | `Promise<Result<ReconcileResult, SupervisorError>>` | Return owned workflow data, reuse already-held live units idempotently, and decide unheld live rows by recorded executor.          |
| `inspect`   | `Promise<Result<RunSnapshot, SupervisorError>>`     | Translate the borrowed store's complete durable read into a typed result.                                                          |
| `destroy`   | `Promise<void>`                                     | Mark closing, stop renewal, abort and detach handles, drain admitted writes, release, and emit close exactly once.                 |

#### `SupervisorInterface`

| Method    | Returns                                          | Behavior                                                             |
| --------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| `open`    | `Promise<Result<RunInterface, SupervisorError>>` | Acquire a fenced workflow epoch or return the already-held live run. |
| `destroy` | `Promise<void>`                                  | Release every held lease and detach all local resources.             |

#### `Supervisor`

| Method    | Returns                                          | Behavior                                                                                                       |
| --------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `open`    | `Promise<Result<RunInterface, SupervisorError>>` | Coalesce concurrent opens, return a held run, or acquire one renewable tenure through the borrowed store.      |
| `destroy` | `Promise<void>`                                  | Close runs in parallel, clear registries, and destroy the supervisor-owned emitter after borrowed work drains. |

#### `PromptCodecInterface`

| Method   | Returns                                | Behavior                                                                                 |
| -------- | -------------------------------------- | ---------------------------------------------------------------------------------------- |
| `encode` | `Result<string, ApplicationError>`     | Serialize one form-compatible keyed answer as JSON.                                      |
| `decode` | `Result<FormValues, ApplicationError>` | Read one reply string against the pending form's exact schema; a mismatch is `PROTOCOL`. |

#### `ApplicationInterface`

| Method    | Returns                                                  | Behavior                                                                                                                                      |
| --------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `roster`  | `ApplicationRoster`                                      | Return the principal's live workflows alongside the principal-free executor registry.                                                         |
| `history` | `Promise<Result<HistoryPage, ApplicationError>>`         | Page the principal's released runs, keeping only those whose persisted snapshot is terminal.                                                  |
| `start`   | `Promise<Result<WorkflowInterface, ApplicationError>>`   | Authorize a new definition id, create its validated workspace, and return a new caller-owned workflow; any live or retained id is `CONFLICT`. |
| `inspect` | `Promise<Result<ApplicationSnapshot, ApplicationError>>` | Read the live workflow snapshot and fenced unit rows, falling back to durable state and answering `NOT_FOUND` once neither remains.           |
| `pause`   | `Result<void, ApplicationError>`                         | Close the authorized workflow's dispatch gates resumably.                                                                                     |
| `resume`  | `Result<void, ApplicationError>`                         | Reopen those gates for a paused workflow.                                                                                                     |
| `stop`    | `Promise<Result<void, ApplicationError>>`                | Request termination from every live unit and answer only after the executor and workflow observe settlement.                                  |
| `watch`   | `Result<LiveViewerInterface, ApplicationError>`          | Authorize one workflow and open a bounded viewer over the shared broker.                                                                      |
| `tail`    | `Promise<Result<ApplicationTail, ApplicationError>>`     | Return the authorized durable observation tail and persisted terminal status without opening a viewer.                                        |
| `destroy` | `Promise<void>`                                          | Destroy every held workflow, await the executions it tracked, and destroy the borrowed supervisor.                                            |

#### `ApplicationUnitManagerInterface`

| Method  | Returns                                   | Behavior                                                                                  |
| ------- | ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| `stop`  | `Promise<Result<void, ApplicationError>>` | Terminate one held unit of an authorized live workflow; a stale fence answers `CONFLICT`. |
| `steer` | `Promise<Result<void, ApplicationError>>` | Send one steering message to a held unit of that workflow.                                |
| `reply` | `Promise<Result<void, ApplicationError>>` | Answer one pending request constraint on a held unit of that workflow.                    |

#### `ApplicationState`

| Method         | Returns | Behavior                                                                                                      |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `authenticate` | `void`  | Install one already-validated principal, which credential proved it, and the bearer token when there was one. |

#### `ApplicationSetupInterface`

| Method       | Returns             | Behavior                                                                            |
| ------------ | ------------------- | ----------------------------------------------------------------------------------- |
| `add`        | `ApplicationSecret` | Add one generated provisional login and answer its plaintext password exactly once. |
| `remove`     | `void`              | Remove one known login and retire its unborrowed principal token.                   |
| `grant`      | `void`              | Replace one known login's grants through a newly minted private principal token.    |
| `regenerate` | `ApplicationSecret` | Generate one known login's replacement password and mark that login provisional.    |
| `replace`    | `void`              | Store one known login's chosen password and clear only its provisional state.       |

#### `ApplicationServerInterface`

| Method    | Returns         | Behavior                                                                                                                                      |
| --------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `start`   | `Promise<void>` | Bind the composed router, middleware, and substrate to the parsed host and port, observing an optional abort signal while startup is pending. |
| `stop`    | `Promise<void>` | Release the network bind while the composition stays restartable.                                                                             |
| `destroy` | `Promise<void>` | Destroy the substrate, then the runtime it assembled before binding.                                                                          |

#### `ApplicationServerRunnerInterface`

| Method  | Returns         | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start` | `void`          | Take the next generation, install `SIGINT` and `SIGTERM` once, and queue the start behind earlier lifecycle transitions without awaiting the bind, so a restart requested during shutdown survives; a successful bind emits `ready`, whose default listener writes one `[READY]` stderr line before the browser opens on a SEA launch or a boot that generated the login; `EADDRINUSE` probes emit `handoff` only after destroying the contender when the peer matches, opening that peer for every contender but a generating one, while every other bind failure releases ownership and emits `fail`. A contender reaches a bind at all only from its own `APP_WORKSPACE`: one launched over a root a live process already holds refuses at construction with `CONFLICT`, before this method runs. |
| `stop`  | `Promise<void>` | Retire the generation, abort pending startup, release both signal handlers, and queue substrate shutdown so repeated stops share its settlement instead of racing it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

#### `ApplicationLeaseInterface`

| Method    | Returns         | Behavior                                                                                                                        |
| --------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `destroy` | `Promise<void>` | Drop the holder sidecar and close the lock, releasing the root for the next process; the release is synchronous and repeatable. |

#### `ApplicationPersistenceInterface`

| Method    | Returns         | Behavior                                                                       |
| --------- | --------------- | ------------------------------------------------------------------------------ |
| `destroy` | `Promise<void>` | Close the owned database on the shared lane, after work already admitted ends. |

#### `HumanLedgerInterface`

| Method    | Returns                                                       | Behavior                                                                                                                                   |
| --------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `get`     | `Promise<HumanTicket \| undefined>`                           | Read one retained ticket by token and prompt, or that token's ticket when no prompt is named.                                              |
| `set`     | `Promise<void>`                                               | Own and persist one validated ticket under its derived id.                                                                                 |
| `answer`  | `Promise<Result<HumanTicket, ApplicationError>>`              | Record the answer once and wake every parked waiter; a second answer returns the retained one.                                             |
| `stop`    | `Promise<Result<HumanTicket \| undefined, ApplicationError>>` | Mark one pending ticket stopped and wake every parked waiter; absent or terminal tickets are idempotent.                                   |
| `wait`    | `Promise<HumanTicket>`                                        | Park on an unanswered ticket until it is answered, the signal aborts, or the ledger is destroyed; an unretained prompt throws `NOT_FOUND`. |
| `prune`   | `Promise<number>`                                             | Drop tickets older than the earlier of the requested boundary and configured retention, and report the exact count.                        |
| `destroy` | `Promise<void>`                                               | Reject every parked waiter and close the ledger database.                                                                                  |

#### `HumanPromptInterface`

| Method    | Returns                           | Behavior                                                                  |
| --------- | --------------------------------- | ------------------------------------------------------------------------- |
| `park`    | `PendingForm`                     | Park one validated form schema in its own terminal prompt broker.         |
| `pending` | `PendingForm \| undefined`        | Read one request while it remains parked.                                 |
| `answer`  | `Result<FormValues, AnswerError>` | Submit one keyed values record through the authoritative form.            |
| `stop`    | `void`                            | Release one parked request without fabricating an answer.                 |
| `destroy` | `void`                            | Release every request and the independent prompt resources that own them. |

#### `LiveBrokerInterface`

| Method    | Returns                            | Behavior                                                                                   |
| --------- | ---------------------------------- | ------------------------------------------------------------------------------------------ |
| `watch`   | `LiveViewerInterface`              | Open one byte-bounded viewer that replays the workflow's durable tail before live frames.  |
| `tail`    | `Promise<readonly ObserveFrame[]>` | Read that same bounded durable observation tail without opening a viewer.                  |
| `close`   | `Promise<void>`                    | Drain the workflow's admitted projections, then end its viewers gracefully.                |
| `publish` | `void`                             | Offer one `BrokerFrame` to every viewer; each admits only what its own byte budget allows. |
| `observe` | `void`                             | Subscribe once to one supervisor's journal-admitted observations.                          |
| `destroy` | `void`                             | Detach every supervisor listener and destroy every open viewer.                            |

#### `RelayInterface`

| Method    | Returns | Behavior                                                             |
| --------- | ------- | -------------------------------------------------------------------- |
| `deliver` | `void`  | Hand one value to the parked consumer, refusing when none is parked. |
| `destroy` | `void`  | Settle a parked consumer as done and answer every later read done.   |

#### `ViewerInterface`

| Method    | Returns | Behavior                                                                                       |
| --------- | ------- | ---------------------------------------------------------------------------------------------- |
| `destroy` | `void`  | Discard retained events, settle a parked consumer as done, and release the owned subscription. |

#### `LiveViewer`

`LiveViewerInterface` adds `close` to `ViewerInterface`, so the implementing class is tabled here
with both members rather than splitting one viewer's call site across two tables.

| Method    | Returns | Behavior                                                                                                                |
| --------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| `close`   | `void`  | End after every replayed or live frame already admitted is consumed.                                                    |
| `destroy` | `void`  | Discard the queued frames, settle a parked consumer as done, and return the viewer's frame registration to its creator. |

#### `RosterBrokerInterface`

| Method    | Returns                 | Behavior                                                                                   |
| --------- | ----------------------- | ------------------------------------------------------------------------------------------ |
| `watch`   | `RosterViewerInterface` | Open one viewer over copied grants and offer it the roster the broker already holds.       |
| `publish` | `void`                  | Own one complete roster and offer it to every attached viewer for its own grant filtering. |
| `destroy` | `void`                  | Destroy every attached roster viewer.                                                      |

#### `WorkflowTranscriptInterface`

| Method  | Returns | Behavior                                                                                         |
| ------- | ------- | ------------------------------------------------------------------------------------------------ |
| `write` | `void`  | Publish one verbatim provider stdout or stderr fragment as a live-only frame under its workflow. |

#### `ClientInterface`

| Method    | Returns                                                         | Behavior                                                                                      |
| --------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `login`   | `Promise<Result<void, BrowserApplicationError>>`                | Exchange the reader's name and secret for a server-held session; every refusal is one `AUTH`. |
| `session` | `Promise<Result<ApplicationSession, BrowserApplicationError>>`  | Read the self-view the cookie currently earns, and take the CSRF token from it.               |
| `logout`  | `Promise<Result<void, BrowserApplicationError>>`                | End the session on the server, for every tab sharing it rather than only this one.            |
| `secret`  | `Promise<Result<void, BrowserApplicationError>>`                | Replace the provisional password, rotate the session, and clear the obsolete held token.      |
| `start`   | `Promise<Result<WorkflowSnapshot, BrowserApplicationError>>`    | Start one workflow from its complete shared input and answer the accepted snapshot.           |
| `inspect` | `Promise<Result<ApplicationSnapshot, BrowserApplicationError>>` | Read the workflow snapshot and durable unit rows, or `ABSENT` once no durable state remains.  |
| `pause`   | `Promise<Result<void, BrowserApplicationError>>`                | Request resumable suspension of workflow dispatch.                                            |
| `resume`  | `Promise<Result<void, BrowserApplicationError>>`                | Request continuation of a paused workflow.                                                    |
| `stop`    | `Promise<Result<void, BrowserApplicationError>>`                | Request permanent termination, answered only after observed settlement.                       |
| `watch`   | `AsyncIterable<LiveFrame>`                                      | Subscribe to live frames until the signal aborts or the server closes; refusals throw.        |
| `tail`    | `Promise<Result<ApplicationTail, BrowserApplicationError>>`     | Read the bounded durable observation tail, oldest first, with the persisted terminal fact.    |
| `destroy` | `void`                                                          | Release the held CSRF token; the reader's server session deliberately survives.               |

#### `Client`

| Method    | Returns                                                         | Behavior                                                                                            |
| --------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `login`   | `Promise<Result<void, BrowserApplicationError>>`                | Post the credentials once and require the route's empty `204`.                                      |
| `session` | `Promise<Result<ApplicationSession, BrowserApplicationError>>`  | Validate the self-view through its exact guard, then hold or drop the token it carries.             |
| `logout`  | `Promise<Result<void, BrowserApplicationError>>`                | Delete the session resource and drop the held token on success or on `AUTH`.                        |
| `secret`  | `Promise<Result<void, BrowserApplicationError>>`                | Put the chosen password on the session-only route, require its empty `204`, and drop the old token. |
| `start`   | `Promise<Result<WorkflowSnapshot, BrowserApplicationError>>`    | Post the workflow input and require a valid workflow snapshot in the answer.                        |
| `inspect` | `Promise<Result<ApplicationSnapshot, BrowserApplicationError>>` | Read the snapshot route with the durable-absence handler installed.                                 |
| `pause`   | `Promise<Result<void, BrowserApplicationError>>`                | Require the route's `paused` acknowledgement.                                                       |
| `resume`  | `Promise<Result<void, BrowserApplicationError>>`                | Require the route's `running` acknowledgement.                                                      |
| `stop`    | `Promise<Result<void, BrowserApplicationError>>`                | Require the route's `stopped` acknowledgement, which the server withholds until termination.        |
| `watch`   | `AsyncIterable<LiveFrame>`                                      | Hand route segments and the caller's signal to a stream that owns its SSE accept header.            |
| `tail`    | `Promise<Result<ApplicationTail, BrowserApplicationError>>`     | Read the journal route and unwrap its `tail` and `terminal` keys into the one owned value.          |
| `destroy` | `void`                                                          | Forget the CSRF token, leaving the client reusable once `session` restocks it.                      |

#### `ClientUnitManagerInterface`

| Method  | Returns                                          | Behavior                                                                    |
| ------- | ------------------------------------------------ | --------------------------------------------------------------------------- |
| `stop`  | `Promise<Result<void, BrowserApplicationError>>` | Request cooperative termination of one supervised attempt.                  |
| `steer` | `Promise<Result<void, BrowserApplicationError>>` | Send one steering message to a live attempt.                                |
| `reply` | `Promise<Result<void, BrowserApplicationError>>` | Answer one pending request constraint with values keyed by its form schema. |

#### `ClientUnitManager`

| Method  | Returns                                          | Behavior                                                                                 |
| ------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `stop`  | `Promise<Result<void, BrowserApplicationError>>` | Address the unit stop route and require its `stopped` acknowledgement.                   |
| `steer` | `Promise<Result<void, BrowserApplicationError>>` | Address the steer route with the message body and require `accepted`.                    |
| `reply` | `Promise<Result<void, BrowserApplicationError>>` | Address the reply route with the constraint id and typed answer, and require `accepted`. |

#### `ClientRosterInterface`

| Method  | Returns                                                       | Behavior                                                                             |
| ------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `read`  | `Promise<Result<ApplicationRoster, BrowserApplicationError>>` | Read the current authorized roster once.                                             |
| `watch` | `AsyncIterable<ApplicationRoster>`                            | Subscribe to complete roster snapshots until the signal aborts or the server closes. |

#### `ClientRoster`

| Method  | Returns                                                       | Behavior                                                                    |
| ------- | ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `read`  | `Promise<Result<ApplicationRoster, BrowserApplicationError>>` | Read the roster route and validate the answer through the exact guard.      |
| `watch` | `AsyncIterable<ApplicationRoster>`                            | Open the shared live stream on the roster route under its fixed event name. |

#### `ClientHistoryInterface`

| Method | Returns                                                 | Behavior                                                                     |
| ------ | ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `read` | `Promise<Result<HistoryPage, BrowserApplicationError>>` | Read one completed-history page, continuing an opaque cursor when given one. |

#### `ClientHistory`

| Method | Returns                                                 | Behavior                                                                          |
| ------ | ------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `read` | `Promise<Result<HistoryPage, BrowserApplicationError>>` | Send limit, cursor, name, and prefix verbatim as query values and guard the page. |

#### `ClientUsersInterface`

| Method       | Returns                                                                | Behavior                                                                         |
| ------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `directory`  | `Promise<Result<ApplicationDirectory, BrowserApplicationError>>`       | Read the complete managed-login roster this session is authorized to manage.     |
| `add`        | `Promise<Result<ApplicationSecretResult, BrowserApplicationError>>`    | Create one login and receive the generated password the server keeps no copy of. |
| `grant`      | `Promise<Result<ApplicationDirectoryResult, BrowserApplicationError>>` | Replace one login's complete workflow grant roster.                              |
| `regenerate` | `Promise<Result<ApplicationSecretResult, BrowserApplicationError>>`    | Issue one login a replacement password and answer it once.                       |
| `remove`     | `Promise<Result<ApplicationDirectoryResult, BrowserApplicationError>>` | Remove one managed login.                                                        |

#### `ClientUsers`

| Method       | Returns                                                                | Behavior                                                                       |
| ------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `directory`  | `Promise<Result<ApplicationDirectory, BrowserApplicationError>>`       | Read the users route and validate the answer through its exact guard.          |
| `add`        | `Promise<Result<ApplicationSecretResult, BrowserApplicationError>>`    | Post the login input and require the directory-plus-password answer.           |
| `grant`      | `Promise<Result<ApplicationDirectoryResult, BrowserApplicationError>>` | Put the owned grant roster on the login's own route and require the directory. |
| `regenerate` | `Promise<Result<ApplicationSecretResult, BrowserApplicationError>>`    | Post the regeneration route with no body and require the password answer.      |
| `remove`     | `Promise<Result<ApplicationDirectoryResult, BrowserApplicationError>>` | Delete the login's own route and require the post-change directory.            |

#### `StackManagerInterface`

| Method     | Returns                 | Behavior                                                                                     |
| ---------- | ----------------------- | -------------------------------------------------------------------------------------------- |
| `row`      | `StackRow \| undefined` | Read one projected row, including a row a collapsed ancestor currently hides.                |
| `rows`     | `readonly StackRow[]`   | Read the rows the stack renders now, in hierarchy order.                                     |
| `place`    | `void`                  | Replace the projection, keeping collapse state for surviving ids and dropping vanished ones. |
| `collapse` | `void` or `boolean`     | Collapse every parent row, one id, or several; an id list succeeds only when all do.         |
| `expand`   | `void` or `boolean`     | Expand every collapsed row, one id, or several; an id list succeeds only when all do.        |

#### `StackManager`

| Method     | Returns                 | Behavior                                                                                |
| ---------- | ----------------------- | --------------------------------------------------------------------------------------- |
| `row`      | `StackRow \| undefined` | Read from the derived index over the placed projection.                                 |
| `rows`     | `readonly StackRow[]`   | Return the derived visible rows, hiding every descendant of a collapsed row.            |
| `place`    | `void`                  | Replace both facts at once, and enter a newly placed task row collapsed.                |
| `collapse` | `void` or `boolean`     | Replace the collapsed set; an unknown id fails without disturbing the ids that matched. |
| `expand`   | `void` or `boolean`     | Replace the collapsed set, or clear it entirely when no target is named.                |

#### `FeedManagerInterface`

| Method    | Returns                  | Behavior                                                     |
| --------- | ------------------------ | ------------------------------------------------------------ |
| `entry`   | `FeedEntry \| undefined` | Read one retained entry, or `undefined` once it was trimmed. |
| `entries` | `readonly FeedEntry[]`   | Read the retained entries, oldest first.                     |
| `append`  | `void`                   | Retain one arriving entry.                                   |
| `clear`   | `void`                   | Drop every retained entry without ending the feed.           |

#### `FeedManager`

| Method    | Returns                  | Behavior                                                                                          |
| --------- | ------------------------ | ------------------------------------------------------------------------------------------------- |
| `entry`   | `FeedEntry \| undefined` | Read by identity from the retained map.                                                           |
| `entries` | `readonly FeedEntry[]`   | Return the derived append-ordered view of that map.                                               |
| `append`  | `void`                   | Ignore an identity already held, evict from the oldest end at the bound, and count the admission. |
| `clear`   | `void`                   | Replace the retained map when it holds anything, leaving `sequence` untouched.                    |

#### `RosterManagerInterface`

| Method    | Returns         | Behavior                                                                              |
| --------- | --------------- | ------------------------------------------------------------------------------------- |
| `start`   | `void`          | Begin or restart the subscription for a newly adopted session, discarding its memory. |
| `retry`   | `void`          | Retry a failed subscription while keeping its last good snapshot and departures.      |
| `abort`   | `void`          | Release the current subscription and keep every retained fact.                        |
| `clear`   | `void`          | Drop the retained snapshot, departures, and fault without destroying the manager.     |
| `destroy` | `Promise<void>` | Release permanently and settle the owned consumption loop.                            |

#### `RosterManager`

| Method    | Returns         | Behavior                                                                           |
| --------- | --------------- | ---------------------------------------------------------------------------------- |
| `start`   | `void`          | Take the next generation and relaunch behind the loop the previous one still owns. |
| `retry`   | `void`          | Relaunch only from a standing fault, leaving the snapshot and departures in place. |
| `abort`   | `void`          | Advance the generation and abort the controller, clearing `live` synchronously.    |
| `clear`   | `void`          | Reset the three retained fields without touching the loop.                         |
| `destroy` | `Promise<void>` | Abort, clear, and return the same settlement promise to every later caller.        |

#### `HistoryManagerInterface`

| Method  | Returns         | Behavior                                                                         |
| ------- | --------------- | -------------------------------------------------------------------------------- |
| `load`  | `Promise<void>` | Replace the active filter and read a fresh first page; refusals land in `fault`. |
| `older` | `Promise<void>` | Read the next page only while a cursor stands; it never clears `changed`.        |
| `retry` | `Promise<void>` | Repeat the failed first page or continuation without changing its query.         |
| `clear` | `void`          | Reset every session-lived fact and invalidate a read still in flight.            |

#### `HistoryManager`

| Method  | Returns         | Behavior                                                                                   |
| ------- | --------------- | ------------------------------------------------------------------------------------------ |
| `load`  | `Promise<void>` | Take the next generation, drop the listed rows, then capture a fresh departure baseline.   |
| `older` | `Promise<void>` | Append the next page to the retained rows, leaving the baseline exactly as it was.         |
| `retry` | `Promise<void>` | Continue when rows are already listed, and reload the first page when none are.            |
| `clear` | `void`          | Invalidate the generation, so an abandoned read can no longer change this manager's state. |

#### `UsersManagerInterface`

| Method       | Returns         | Behavior                                                                      |
| ------------ | --------------- | ----------------------------------------------------------------------------- |
| `load`       | `Promise<void>` | Read the complete directory; a refusal lands in `fault` rather than throwing. |
| `add`        | `Promise<void>` | Create one login and retain the password it answered until it is released.    |
| `grant`      | `Promise<void>` | Replace one login's grants and adopt the directory that came back.            |
| `regenerate` | `Promise<void>` | Replace one login's password and retain the new one the same way.             |
| `remove`     | `Promise<void>` | Remove one login and adopt the directory that came back.                      |
| `release`    | `void`          | Release only the retained one-time password.                                  |
| `clear`      | `void`          | Drop every retained users fact and invalidate a request still in flight.      |

#### `UsersManager`

| Method       | Returns         | Behavior                                                                                 |
| ------------ | --------------- | ---------------------------------------------------------------------------------------- |
| `load`       | `Promise<void>` | Take the next generation, then adopt the guarded directory answer as owned frozen state. |
| `add`        | `Promise<void>` | Adopt the answered directory and clone the one-time password beside it.                  |
| `grant`      | `Promise<void>` | Drop the prior password at settlement, then adopt the answered directory.                |
| `regenerate` | `Promise<void>` | Adopt the answered directory and replace the retained password with the new one.         |
| `remove`     | `Promise<void>` | Drop the prior password at settlement, then adopt the answered directory.                |
| `release`    | `void`          | Clear only the retained one-time password.                                               |
| `clear`      | `void`          | Advance the generation and reset all five fields, so a stale answer lands nowhere.       |

#### `OperatorInterface`

| Method     | Returns         | Behavior                                                                                        |
| ---------- | --------------- | ----------------------------------------------------------------------------------------------- |
| `identify` | `Promise<void>` | Adopt the session the cookie already holds; an unauthenticated answer is a state, not a fault.  |
| `login`    | `Promise<void>` | Establish a session from submitted credentials, and reopen the workflow that was already open.  |
| `logout`   | `Promise<void>` | End the session and clear the snapshot, rows, feed, selection, and that workflow's stored view. |
| `secret`   | `Promise<void>` | Replace the provisional password, then re-read and adopt the rotated session.                   |
| `open`     | `Promise<void>` | Project the workflow's rows, restore its stored view, replay its tail, and watch it.            |
| `select`   | `void`          | Select one row or clear the selection, without mutating the stack.                              |
| `refresh`  | `Promise<void>` | Re-inspect the open workflow and re-place its rows; it never polls.                             |
| `destroy`  | `Promise<void>` | Release the live subscription, the retained feed, and the transport's held token.               |

#### `Operator`

| Method     | Returns         | Behavior                                                                                            |
| ---------- | --------------- | --------------------------------------------------------------------------------------------------- |
| `identify` | `Promise<void>` | Ask once at mount, keeping `fault` untouched for the `AUTH` answer an anonymous browser earns.      |
| `login`    | `Promise<void>` | Read the self-view the login earned, so the interface holds the session it just proved.             |
| `logout`   | `Promise<void>` | Release the subscription first, then drain the chained view writes before dropping the stored view. |
| `secret`   | `Promise<void>` | Send the chosen password once, re-read the rotated session and its CSRF, and leave every run alone. |
| `open`     | `Promise<void>` | Take the next generation, and abandon silently at each checkpoint once that generation is stale.    |
| `select`   | `void`          | Write the one selection field the stored view and the lineage filter both read.                     |
| `refresh`  | `Promise<void>` | Join a read already in flight instead of racing a second one, so the newer answer lands last.       |
| `destroy`  | `Promise<void>` | Release once, wait for the superseded subscription loop, and drain the chained view writes.         |

#### `OperatorStoreInterface`

| Method   | Returns                      | Behavior                                                                     |
| -------- | ---------------------------- | ---------------------------------------------------------------------------- |
| `get`    | `Promise<View \| undefined>` | Read one stored view, or `undefined` when none is stored or it is off-shape. |
| `set`    | `Promise<void>`              | Store one view under its own id.                                             |
| `delete` | `Promise<void>`              | Remove one stored view; removing an absent view is a no-op.                  |

#### `StorageOperatorStore`

| Method   | Returns                      | Behavior                                                                                      |
| -------- | ---------------------------- | --------------------------------------------------------------------------------------------- |
| `get`    | `Promise<View \| undefined>` | Enforce the length bound before parsing, then require an exact view whose id matches the key. |
| `set`    | `Promise<void>`              | Enforce the same inclusive bound on the way out, so no admitted value is later rejected.      |
| `delete` | `Promise<void>`              | Remove the namespaced key, treating an unavailable store as an empty one.                     |

#### `MemoryOperatorStore`

| Method   | Returns                      | Behavior                                                                        |
| -------- | ---------------------------- | ------------------------------------------------------------------------------- |
| `get`    | `Promise<View \| undefined>` | Read the process-local view, which no other realm or deployment can observe.    |
| `set`    | `Promise<void>`              | Own a frozen clone under the view's own id, so the caller's value cannot drift. |
| `delete` | `Promise<void>`              | Drop the retained view; removing an absent one is a no-op.                      |

#### `OperatorPointerInterface`

| Method   | Returns                        | Behavior                                                              |
| -------- | ------------------------------ | --------------------------------------------------------------------- |
| `load`   | `Promise<string \| undefined>` | Read the workflow id a reload should reopen, or report none retained. |
| `save`   | `Promise<void>`                | Remember the workflow id most recently opened.                        |
| `remove` | `Promise<void>`                | Forget the pointer without touching any stored view.                  |

#### `StorageOperatorPointer`

| Method   | Returns                        | Behavior                                                                               |
| -------- | ------------------------------ | -------------------------------------------------------------------------------------- |
| `load`   | `Promise<string \| undefined>` | Read the namespaced key, treating an unavailable store as an empty one.                |
| `save`   | `Promise<void>`                | Write the id under that key, so a reload can reopen the run without an address.        |
| `remove` | `Promise<void>`                | Remove the key, surfacing a refusal the caller has to report rather than absorbing it. |

#### `MemoryOperatorPointer`

| Method   | Returns                        | Behavior                                                                 |
| -------- | ------------------------------ | ------------------------------------------------------------------------ |
| `load`   | `Promise<string \| undefined>` | Read the process-local pointer, which no later page load can observe.    |
| `save`   | `Promise<void>`                | Retain the id in memory alone, so a demonstration leaves nothing behind. |
| `remove` | `Promise<void>`                | Drop the retained id; removing an absent one is a no-op.                 |

The runtime examples above drive real implementations. This compile-time inventory shows the full
optional-capability shape without pretending that every executor implements every method:

```ts
import type {
	ExecutionContext,
	ExecutionInput,
	ExecutionInterface,
	ExecutorInterface,
	JournalInterface,
	LaunchInput,
	Lease,
	Observation,
	RunInterface,
	SupervisorInterface,
	SupervisorStoreInterface,
	UnitContext,
	UnitInterface,
	UnitSnapshot,
} from '@orkestrel/supervisor'

declare const address: ExecutionContext
declare const context: UnitContext
declare const execution: ExecutionInterface
declare const executor: ExecutorInterface
declare const input: ExecutionInput
declare const journal: JournalInterface
declare const lease: Lease
declare const observation: Observation
declare const run: RunInterface
declare const store: SupervisorStoreInterface
declare const supervisor: SupervisorInterface
declare const unit: UnitInterface
declare const snapshot: UnitSnapshot

const launch: LaunchInput = {
	unit: context,
	executor: executor.name,
	payload: {},
	signal: new AbortController().signal,
}

void journal.append(lease, snapshot, observation)
void journal.entries(context)
void journal.prune(Date.now())
void execution.destroy()
void executor.launch(input)
if (executor.attach !== undefined) void executor.attach(address)
if (executor.probe !== undefined) void executor.probe(address)
if (executor.stop !== undefined) void executor.stop(address)
if (executor.steer !== undefined) void executor.steer(address, 'continue')
if (executor.reply !== undefined) void executor.reply(address, 'request', 'approved')
void unit.identify('provider-id')
void unit.observe(observation)
void unit.settle(await execution.result)
void unit.quarantine('undetermined')
void unit.stop()
void unit.steer('continue')
void unit.reply('request', 'approved')
unit.snapshot()
run.units.unit(unit.id)
run.units.units()
supervisor.executors.add(executor)
supervisor.executors.remove(executor.name)
supervisor.executors.executor(executor.name)
supervisor.executors.executors()
supervisor.runs.run(run.id)
supervisor.runs.runs()
void run.launch(launch)
void run.reconcile({
	id: run.id,
	name: 'supervised',
	status: 'pending',
	bail: false,
	phases: [],
	created: 0,
	updated: 0,
})
void run.inspect()
void run.destroy()
void supervisor.open(run.id)
void supervisor.destroy()
void store.acquire(run.id, supervisor.id)
void store.renew(lease)
void store.get(run.id)
void store.list({ limit: 25, released: true })
void store.set(lease, snapshot)
void store.release(lease)
```

```ts
import type { ProcessCommand } from '@orkestrel/process'
import type {
	ProviderExecutionInterface,
	ProviderInput,
	ProviderInterface,
	ProviderMessage,
	Transcript,
	TranscriptHandler,
} from '@orkestrel/supervisor/server'

declare const command: ProcessCommand
declare const execution: ProviderExecutionInterface
declare const input: ProviderInput
declare const message: ProviderMessage
declare const output: string
declare const provider: ProviderInterface
declare const transcript: Transcript

const transcriptHandler: TranscriptHandler = (fragment) => {
	fragment.token
	fragment.stream
	fragment.text
}

provider.launch(input)
provider.observe({})
provider.settle({})
if (provider.attach !== undefined) provider.attach({ token: input.token, identity: 'native' })
if (provider.probe !== undefined) provider.probe({ token: input.token, identity: 'native' })
if (provider.answer !== undefined) {
	provider.answer({ token: input.token, identity: 'native' }, output)
}
if (provider.encode !== undefined) provider.encode(message)
command.file
void execution.send(message)
void execution.stop()
void execution.destroy()
transcriptHandler(transcript)
```

## Tests

- [`tests/src/core/Run.test.ts`](../tests/src/core/Run.test.ts) and
  [`tests/src/server/integration.test.ts`](../tests/src/server/integration.test.ts) — intent-before-effect,
  renewal and fencing, all three recovery decisions, adoption, the real SQLite crash race, and the
  explicit ordering falsifications.
- [`tests/src/core/factories.test.ts`](../tests/src/core/factories.test.ts) and
  [`tests/src/core/executors/FunctionExecutor.test.ts`](../tests/src/core/executors/FunctionExecutor.test.ts)
  — real workflow completion/failure/cancellation, concurrent shared epochs, durable transition
  order, immediate function identity, probing, and observed cooperative stop.
- [`tests/src/core/Supervisor.test.ts`](../tests/src/core/Supervisor.test.ts) and
  [`tests/src/core/Unit.test.ts`](../tests/src/core/Unit.test.ts) — open idempotency, record
  events, root disposal, serialized row mutations, control capabilities, and typed refusal.
- [`tests/src/core/stores/MemorySupervisorStore.test.ts`](../tests/src/core/stores/MemorySupervisorStore.test.ts),
  [`tests/src/core/stores/DatabaseSupervisorStore.test.ts`](../tests/src/core/stores/DatabaseSupervisorStore.test.ts),
  and
  [`tests/src/server/stores/integration.test.ts`](../tests/src/server/stores/integration.test.ts)
  — in-process and SQLite lease semantics, numeric attempt ordering, persistence, takeover writes,
  native-transaction refusal, and acquisition races.
- [`tests/src/core/stores/MemoryBriefStore.test.ts`](../tests/src/core/stores/MemoryBriefStore.test.ts)
  and
  [`tests/src/server/stores/integration.test.ts`](../tests/src/server/stores/integration.test.ts)
  — write-once identity, exact-id behavior, linear succession, idempotent retirement, SQLite
  connection races, corrupt-row refusal, shared five-table composition, and forced-failure
  transaction rollback.
- [`tests/src/core/journals/MemoryJournal.test.ts`](../tests/src/core/journals/MemoryJournal.test.ts),
  [`tests/src/core/helpers.test.ts`](../tests/src/core/helpers.test.ts),
  [`tests/src/core/validators.test.ts`](../tests/src/core/validators.test.ts), and
  [`tests/src/core/errors.test.ts`](../tests/src/core/errors.test.ts) — caps, redaction, fence
  high-water behavior, byte-accurate truncation, projection, hostile boundaries, and typed errors.
- [`tests/src/server/executors/ProviderExecutor.test.ts`](../tests/src/server/executors/ProviderExecutor.test.ts)
  and [`tests/src/server/helpers.test.ts`](../tests/src/server/helpers.test.ts) — real fixture
  processes, JSON Lines framing, capability mirroring, transcript isolation, probe bounds,
  process-group ownership, an App Server-shaped request/reply loop through `UnitInterface`,
  record-leads-view ordering, observed termination, and redacted missing-terminal stderr evidence.
- [`tests/src/server/providers/ClaudeProvider.test.ts`](../tests/src/server/providers/ClaudeProvider.test.ts),
  [`tests/src/server/providers/CodexProvider.test.ts`](../tests/src/server/providers/CodexProvider.test.ts),
  and [`tests/src/server/providers/CursorProvider.test.ts`](../tests/src/server/providers/CursorProvider.test.ts)
  — exact command vectors, launch-only model selection, frame translation, terminal values, and
  recovery evidence.
- [`tests/service/claude/Provider.test.ts`](../tests/service/claude/Provider.test.ts),
  [`tests/service/codex/Provider.test.ts`](../tests/service/codex/Provider.test.ts), and
  [`tests/service/cursor/Provider.test.ts`](../tests/service/cursor/Provider.test.ts) — explicit
  hard-fail installed-provider smoke projects outside the default suite.
- [`tests/app/core/factories.test.ts`](../tests/app/core/factories.test.ts),
  [`tests/app/core/helpers.test.ts`](../tests/app/core/helpers.test.ts),
  [`tests/app/core/validators.test.ts`](../tests/app/core/validators.test.ts),
  [`tests/app/core/parsers.test.ts`](../tests/app/core/parsers.test.ts),
  [`tests/app/server/ApplicationServer.test.ts`](../tests/app/server/ApplicationServer.test.ts),
  [`tests/app/server/middlewares.test.ts`](../tests/app/server/middlewares.test.ts),
  [`tests/app/server/ApplicationRuntime.test.ts`](../tests/app/server/ApplicationRuntime.test.ts),
  [`tests/app/server/InferenceStream.test.ts`](../tests/app/server/InferenceStream.test.ts),
  [`tests/app/server/LiveBroker.test.ts`](../tests/app/server/LiveBroker.test.ts), and
  [`tests/app/server/integration.test.ts`](../tests/app/server/integration.test.ts) — deployment
  parsing, authorization, limiter, policy effect, credential arbitration, login regeneration and
  uniform refusal, CSRF verification, session expiry, SSE settlement, bounded viewing, terminal tee,
  durable human recovery, and local-agent mapping.
- [`tests/app/server/ApplicationServerRunner.test.ts`](../tests/app/server/ApplicationServerRunner.test.ts)
  and [`tests/app/server/helpers.test.ts`](../tests/app/server/helpers.test.ts) — the credential
  block's exact bytes for both provisional openings, its silence once the password is replaced or
  the environment owns the roster, its position ahead of the readiness line, the browser opening on
  the boot that generated the login while neither a plain restart nor a configured roster opens one,
  and the real port collision that refuses to open a running instance the fresh login cannot enter.
- [`tests/app/server/MCPProjection.test.ts`](../tests/app/server/MCPProjection.test.ts) and
  [`tests/app/server/parsers.test.ts`](../tests/app/server/parsers.test.ts) — the advertised two
  tools, the mutating tool's refusal of every read, cursor-vector paging with its frame, byte, and
  mark bounds, `more`/`gap`/`closed` honesty, ephemeral frames kept out of every page, and the
  modern stream's typed closure and refusal.
- [`tests/app/server/backends/ClaudeCLIBackend.test.ts`](../tests/app/server/backends/ClaudeCLIBackend.test.ts),
  [`tests/app/server/backends/CodexCLIBackend.test.ts`](../tests/app/server/backends/CodexCLIBackend.test.ts),
  [`tests/app/server/backends/CursorCLIBackend.test.ts`](../tests/app/server/backends/CursorCLIBackend.test.ts),
  and
  [`tests/app/server/providers/CLIProvider.test.ts`](../tests/app/server/providers/CLIProvider.test.ts)
  — evidence-backed argv, vendor translation, usage mapping, prompt-on-stdin delivery,
  generate/stream parity, typed refusal, bounded diagnostics, cancellation partials, group
  termination, and scratch cleanup through protocol-faithful child processes.
- [`tests/service/inference/claude/CLIProvider.test.ts`](../tests/service/inference/claude/CLIProvider.test.ts),
  [`tests/service/inference/codex/CLIProvider.test.ts`](../tests/service/inference/codex/CLIProvider.test.ts),
  and
  [`tests/service/inference/cursor/CLIProvider.test.ts`](../tests/service/inference/cursor/CLIProvider.test.ts)
  — explicit real-CLI inference smokes asserting bounded content, delta/result equality, absent
  thinking and tools, and evidence-backed usage outside the default suite.
- [`tests/app/browser/controllers/Operator.test.ts`](../tests/app/browser/controllers/Operator.test.ts),
  [`tests/app/browser/controllers/StackManager.test.ts`](../tests/app/browser/controllers/StackManager.test.ts),
  [`tests/app/browser/controllers/FeedManager.test.ts`](../tests/app/browser/controllers/FeedManager.test.ts),
  [`tests/app/browser/services/Client.test.ts`](../tests/app/browser/services/Client.test.ts),
  [`tests/app/browser/services/LiveStream.test.ts`](../tests/app/browser/services/LiveStream.test.ts),
  [`tests/app/browser/stores/StorageOperatorStore.test.ts`](../tests/app/browser/stores/StorageOperatorStore.test.ts),
  [`tests/app/browser/stores/MemoryOperatorStore.test.ts`](../tests/app/browser/stores/MemoryOperatorStore.test.ts),
  [`tests/app/browser/helpers.test.ts`](../tests/app/browser/helpers.test.ts),
  [`tests/app/browser/validators.test.ts`](../tests/app/browser/validators.test.ts),
  [`tests/app/browser/composables/useOperator.test.ts`](../tests/app/browser/composables/useOperator.test.ts),
  [`tests/app/browser/composables/useFeed.test.ts`](../tests/app/browser/composables/useFeed.test.ts),
  [`tests/app/browser/composables/useTheme.test.ts`](../tests/app/browser/composables/useTheme.test.ts),
  and [`tests/app/browser/factories.test.ts`](../tests/app/browser/factories.test.ts) — real Chromium
  projection, generation and ended-versus-refused discipline, retention and dedupe, route encoding,
  installed-parser SSE framing across chunk boundaries, off-shape frame refusal, hostile stored
  views, and lineage filtering.
- [`tests/app/browser/ApplicationView.test.ts`](../tests/app/browser/ApplicationView.test.ts) and
  the component suites under
  [`tests/app/browser/components`](../tests/app/browser/components) — real DOM rendering of the
  session gate and its probe, the login form's ambiguous refusal and retained fields, the open
  panel's identity line, the stack, content dispatch, command gating, derived reply forms, register
  filters, theme, mobile overlay, and focus placement. The first-run half is proved there and in
  [`tests/app/browser/components/SetupPanel.test.ts`](../tests/app/browser/components/SetupPanel.test.ts)
  — the band a generated login raises, the dialog the arrival opens itself and never opens twice, the
  band's control as the standing way back to it, the short password and mismatched copy that never
  reach the network — including the one typed and submitted for real, which the dialog answers in its
  own words rather than leaving to a native bubble — the one replacement that does reach it, the band
  clearing on the safe session re-read after rotation, the announcement that replaces it, Escape and
  the keyboard route out, the manager anchor carrying the
  session's name beside two `new-password` fields, and the expired session that leaves the dialog
  standing over the login form it names.
- [`tests/integration/app/application.test.ts`](../tests/integration/app/application.test.ts)
  — the whole credential wire proven in real Chromium against the real composed server at its own
  origin, with no relaxed web security: the login form before any cookie exists, the issued
  `httpOnly` `SameSite=Strict` host-only cookie, the API token and password absent from every
  request, from the document, and from both storage surfaces, regeneration on login retiring the
  previous id, a password rotation followed immediately by a successful CSRF-protected workflow
  command, a forged cross-origin command refused as `403`, the reload that restores both the
  session and the reader's placed view, and a logout that clears both cookies and leaves the old id
  answering `401`. Its second case proves the expiry doctrine on a second server with a short idle
  window: the command answers `401`, the interface returns to the login form with the reader's rows
  intact, and logging in again resumes exactly the view they were watching.
- [`tests/service/ollama/AgentExecutor.test.ts`](../tests/service/ollama/AgentExecutor.test.ts) —
  explicit local Ollama agent task through the supervised workflow loop; written but not run by
  the default or U12 acceptance gates.
- [`tests/guides.test.ts`](../tests/guides.test.ts) — public export,
  method, example, import, and link parity for this guide.
- [`tests/policy.test.ts`](../tests/policy.test.ts) — repository structure and import policy.

## See also

- [`AGENTS.md`](../AGENTS.md) — the coding and documentation contract.
- [`README.md`](./README.md) — the guides index.
