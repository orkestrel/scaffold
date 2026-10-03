# Operation lifecycle contract: an assessment from another session

The user shared this assessment on 2026-10-03 as reliability research for the ecosystem. It is input to the decision on where the resource lifecycle lives (`status.md` § Open decision), not a ruling. It reviewed scaffold at `a193529` from documentation and source and ran nothing.

I would call what you’re describing an operation lifecycle contract: a native agreement about how a user action is accepted, executed, observed, and recovered. Your ecosystem already contains much of it, especially in supervisor, workflow, and MCP’s durable task contract.

My recommendation is to make that agreement explicit in an application composition, using your existing packages. The next step is a demonstrated path from a user’s action to its authoritative outcome, including what happens when the connection or a process disappears along the way.

You have already formulated much of the execution side. The unresolved part is whether an ordinary application built from the scaffold consistently inherits those semantics.

What I reviewed

I pinned the scaffold review to commit a193529, read AGENTS.md and its mapped rules, examined the generated application structure, and reviewed the relevant contracts, transports, persistence, workflow, supervisor, frontend, and testing guides. I also surveyed the remaining package guides and inspected selected implementations in the public sibling repositories.

An important distinction comes from your own guide index: most guides are mirrors of other packages’ documentation. They describe those packages; their implementations do not reside inside scaffold.

This is an architectural assessment based on documentation and source inspection. I did not run the test suites or perform live failure experiments. The supervisor implementation was not accessible through this GitHub connection, so I distinguish its documented design from the implementation I could inspect.

The distinction at the center of your question

Consider a “Create project” action:

The browser submits the request. The backend commits the project. The connection breaks before the browser receives the response.

The browser has experienced a communication failure. It does not have evidence that project creation failed. Repeating the action under a fresh identity could create another project. Leaving the user with a permanent error could conceal a successful creation. This is the ambiguity that idempotent API design addresses.

The application needs to distinguish:

The request’s outcome: Did this exchange produce a usable response?

The operation’s outcome: Was the intended work accepted, completed, rejected, or left unresolved?

The frontend’s knowledge: Does the interface have an authoritative, sufficiently recent account of that operation?

Those facts can differ. The server can know that an operation succeeded while the browser is disconnected. A successful status lookup can return an operation that is still running. A failed lookup does not make the operation itself failed.

That is why success/failure types alone cannot close the boundary. They need an owner and a defined scope: success of what?

Where the “middle” belongs

A load balancer can help a request reach an available server. The application that owns the effect must determine whether the intended action happened. That placement follows the classic end-to-end argument: some correctness responsibilities require knowledge at the application endpoints, even when lower layers provide useful reliability mechanisms.

An error tracker helps explain a failure. It is not, by itself, the record from which the application decides whether a business action committed. Distributed tracing also permits sampling and incomplete recording, so traces are unsuitable as the sole authority for that decision.

Your desired “tight coupling” is best expressed as tight agreement about meaning, ownership, and lifecycle. Your existing separation of browser and server implementations is compatible with that agreement. Both sides can share the contract while retaining independent process lifetimes and implementation details.

What your ecosystem already provides

The relevant packages form a substantial foundation. Their boundaries matter as much as their capabilities.

Area Existing contribution Responsibility still owned by the application

contract Runtime guards, parsers, shape-derived contracts, and explicit Result values. Define what a command means, what constitutes completion, and how an unresolved remote outcome is represented.
server, router, middleware HTTP dispatch, exception boundaries, deadlines, cancellation propagation, and telemetry. Connect an HTTP response to durable acceptance and business state.
queue, worker, pool Work admission, concurrency, retries, resource ownership, replacement, and optional outstanding-work persistence. Deduplicate effects, retain completed outcomes, and select safe recovery policies.
database, workflow Storage abstractions, transactions, execution state, snapshots, recovery, and explicit persistence checkpoints. Select a backend with the needed durability and coordination properties; define business success.
supervisor A documented external-effect record with fenced ownership, intent before launch, and reconciliation. Supply effect-specific capabilities and expose the resulting semantics through the application.
mcp A documented durable task handle and manager contract for work that outlives a request. Implement the task’s storage, authorization, deduplication, execution, and lifetime.
form, table Form lifecycle and data projection primitives. Own network activity, submission attempts, reconciliation, and the relationship between acknowledged data and displayed data.
test, probe, guide, browser Instruments for testing behavior, checking claims, maintaining documentation parity, and driving real browsers. Prove the composed application journey. These instruments do not supply runtime recovery.

These roles are described in the contract guide, queue persistence contract, workflow persistence section, and your evidence and integration rules.

Supervisor is already a substantial expression of your idea

The supervisor guide addresses the difficult interval between launching external work and recording its identity. It describes:

Recording intent before crossing the external boundary.

Holding renewable, fenced ownership.

Retaining separate attempt records.

Recovering by reattaching, relaunching, or quarantining.

Requiring positive evidence of absence before relaunching.

The important design decision is that an unavailable answer does not become permission to repeat an effect. See Supervisor’s launch transaction and recovery contract.

Its private browser application also documents a meaningful application composition: Client, Operator, authoritative inspection, retained views after disconnection, generation-safe asynchronous reads, and re-inspection after commands and stream completion. That is already native reliability behavior, beyond error reporting. See the browser composition.

I would use that design as the starting point. I would not start by inventing another supervisor.

Your MCP task contract articulates the other half

The MCP guide explicitly describes work that outlives the request that created it. MCPTaskManagerInterface owns starting or finding a task, reading its state, answering pending input, and requesting cancellation.

The guide delegates durable acceptance, principal-scoped deduplication, stable logical keys, terminal immutability, and retention to that manager. It also warns that the request’s abort signal must not own the durable task’s lifetime. See “Defer a call to a durable task”.

That is close to the contract you are trying to name. It resembles the established long-running operation pattern: return an identifiable operation, then expose progress and a recoverable result. Google’s API guidance formalizes that distinction between starting an operation and observing its eventual outcome.

This does not mean every application needs MCP. It means your ecosystem already contains a useful articulation of the underlying semantics.

Where I would be careful about claiming the problem is solved

The public evidence supports a strong set of mechanisms. It does not establish that every application generated by the scaffold composes them into the same promise.

The scaffold establishes structure, but leaves the application behavior to its consumer

The source generator emits application barrels, an initial browser page, and an empty server entry. It does not automatically create an application command protocol or an acceptance-and-recovery flow. See blueprintToSourceArtifacts.

Your roadmap already identifies part of this gap. Item 42 calls for a serving convention, a server startup/port convention, and a backend origin or proxy configuration so the browser reaches the intended backend. See the roadmap.

That is a reasonable boundary for a lean generator. It means the reliability promise must be demonstrated by an application integration or an optional generated example.

“Completed” needs a business interpretation

Your workflow contract deliberately permits a failed phase to fold into root completion when its effective bail policy is false. The failure remains in the result tree. Consequently, a root status of completed does not necessarily mean that every requested effect succeeded. See workflow status derivation.

This is useful behavior. An application may consider a project successfully created even if a secondary notification fails. Another application may require that notification before considering the user’s request fulfilled.

The application must define which results constitute fulfillment of the user’s intent. The frontend cannot infer that policy from the runner’s root status alone.

The implementation also separates execution outcome from persistence outcome through durable and fault. That distinction needs to survive application composition; it must not disappear behind a generic success toast. See the runner’s persistence and result assembly.

A timeout controls waiting; it does not establish that an effect stopped

I inspected createDeadline. It links cancellation signals and races the downstream response against a deadline response. It handles the losing promise, but it cannot reverse a database commit or forcibly stop arbitrary handler code. See the deadline implementation.

This is an intended boundary. A timeout can leave the operation’s outcome unresolved.

The same distinction applies to cancellation. “The browser stopped waiting,” “the server accepted a cancellation request,” and “the external work terminated” are different facts. Your supervisor guide explicitly preserves that separation in its control and lifecycle contract.

Queue persistence does not retain the final answer

Your queue persists outstanding entries and removes them when they settle. Its documented model is at-least-once and single-owner; a crash or failed removal can cause replay, and handlers must deduplicate using a stable identity. See the queue’s durability contract.

That answers “what work remains?” It does not, by itself, answer a reconnecting browser’s question: “What happened to the action I submitted earlier?”

A recoverable final answer needs another authoritative home. Your workflow snapshots and supervisor records are relevant existing mechanisms for that home.

Also, a database-backed abstraction can still use a memory driver. durable: true reports successful persistence to the supplied store; selecting a store with the required crash behavior remains a deployment responsibility.

Live delivery and recoverable state are separate contracts

The MCP guide explicitly makes no replay claim for modern task notifications; missed state is recovered through tasks/get. It also documents a concrete transport limitation: the reviewed HTTP client transports buffer a held-open text/event-stream response until completion, so that path does not deliver subscription frames incrementally. See the subscription semantics and declared conformance gap.

That limitation is specific to the documented MCP HTTP client path. It does not establish the same limitation in Supervisor’s separate browser stream implementation.

The broader architectural implication is that “supports SSE” or “supports WebSocket” cannot substitute for a defined recovery protocol.

The application contract I would formulate

I would define the contract in these terms:

A supported user action has an identity, an acceptance boundary, an authoritative outcome, an execution owner, and a recovery path. The frontend can recover both the outcome and the resulting application data after losing contact.

This responsibility can be distributed across your existing environments. The following diagram shows the proposed placement, not another mandatory service:

flowchart TD
C["app/core: command and outcome contracts"]
B["app/browser: action controller and view"]
A["app/server: acceptance and recovery"]
D["Authoritative domain and operation state"]
W["Workflow and supervisor when required"]
X["External service or worker"]

C --> B
C --> A
B -->|"Submit or inspect"| A
A -->|"Snapshot and updates"| B
A <-->|"Read and commit"| D
A --> W
W -->|"Record progress and outcome"| D
W -->|"Execute or reconcile"| X

Your application rules already provide this environment structure. The additional work is to give the arrows precise semantics.

Identity belongs to the user’s intention

A repeated transmission of the same intention must retain its identity. A deliberately repeated action gets a different identity, even when its arguments are identical.

The server needs to scope that identity to the appropriate caller and reject conflicting reuse with different input. A request ID used for tracing is not automatically an operation ID.

Your MCP guide already warns against using the JSON-RPC request ID as a durable operation key. I would carry that distinction into ordinary browser/server commands. See the durable task key discussion.

Keep operation identity distinct from attempt identity. Supervisor’s token includes an attempt because it identifies an external execution attempt. An application action may span several such attempts.

Acceptance must mean something recoverable

If the application tells the user that it accepted responsibility, that responsibility needs to survive the failure model the application claims to support.

For a short mutation within one transactional database, the proportionate implementation may be an atomic domain change plus a deduplication decision and a recoverable result. A domain record and its existing identity may already provide enough information; an additional generic operation table is justified only when it owns information the domain record does not.

For work that outlives the request, persist the accepted operation before acknowledging it, then give execution a lifetime owned by the application.

HTTP 202 Accepted does not itself make this promise. The HTTP specification says processing is incomplete and the request might not ultimately be acted upon. Stronger acceptance semantics have to come from your application’s implementation.

Ordinary reads do not need a durable execution ledger. They need appropriate freshness, cancellation, error handling, and protection against stale responses.

External effects require effect-specific recovery

A database transaction cannot atomically include an arbitrary external service.

For those operations, use the supervision model you already describe: persist intent, execute through an adapter, record the outcome, and reconcile interrupted attempts according to the external system’s capabilities.

A fence protects the resources that enforce it. It cannot undo an already completed external effect. Your supervisor guide acknowledges this in its honest limits.

Established durable execution systems face the same issue. Temporal documents that an activity may finish its effect and then crash before reporting completion; safe retries still require idempotency at the effectful service.

This is why quarantine is a useful reliability mechanism. It preserves uncertainty and prevents an unjustified repeat. It is not a claim that nothing happened.

Frontend uncertainty must remain separate from authoritative failure

The frontend needs to preserve the distinction between:

A definitive refusal before work began.

A known business failure.

Work that is still pending.

An outcome that the client cannot presently determine.

A known outcome whose local display has not yet caught up.

A failed network request must not overwrite authoritative operation state with “failed.”

You can retain Result for definite call outcomes. For example, a successful inspection returns a snapshot; that snapshot can describe running or failed work. A failed inspection describes the inspection failure. It does not redefine the underlying operation.

This follows the scope your contract package already establishes: attempt captures a synchronous invocation; returned promises remain values whose later settlement requires separate handling. See the attempt contract.

The displayed data must converge with the outcome

Recovering an operation’s status is only part of the frontend responsibility.

The interface can show “Saved” while still displaying an optimistic value that differs from the server’s normalized value. It can apply an older response after a newer edit. It can fetch stale data immediately after a successful write.

The operation contract therefore needs an authoritative result or enough entity and revision information to reconcile the visible state. An operation’s progress sequence and an entity’s data version are different concepts.

This is particularly relevant to form. Its guide deliberately leaves network attempts, retries, and request state to the host. The host must settle the answers that the server actually accepted. If the user edits during submission, an old acknowledgement must not settle newer local answers. See the form submission pattern.

Push updates need a reconciliation rule

Your preference for event-driven operation fits this design.

Use updates to keep the view fresh, and recover authoritative state when the page opens, a connection is restored, or a reported gap requires it. Native EventSource supplies reconnection and Last-Event-ID, but the application supplies retention, replay, and state reconciliation.

There is a specific race to account for: reading a snapshot and then subscribing can miss a transition between those actions. A versioned snapshot paired with a replay cursor, or subscription-first buffering followed by reconciliation, can close that race.

If history has expired, report that condition and recover a current snapshot. A recoverable final state can be sufficient even when every intermediate progress message is not retained.

What “gracefully fixing” can mean

A native reliability layer can execute a declared recovery policy. It cannot infer the correct business policy from an exception.

I would make the recovery decision explicit:

Observed situation Appropriate application response

Input is invalid Preserve useful input, show actionable errors, and wait for correction.
A transient failure is safe to retry Retry under a bounded policy while retaining the same operation identity.
A response is lost after dispatch Recover the existing operation’s state before deciding to repeat an effect.
External execution is confirmed present Reattach or retrieve its result.
External execution is confirmed absent Relaunch when the operation’s policy permits it.
An external outcome remains undetermined Reconcile further or quarantine; expose the unresolved condition.
Some effects completed before failure Apply an explicit compensation policy or report the partial outcome.

Machine-readable error identity is important here. Recovery must not depend on parsing a human message. RFC 9457 provides one established HTTP representation for structured problem information, but your existing domain error contracts may already supply the needed information; there is no reason to replace them merely to introduce another envelope.

Give re-execution a clear owner

One component must own the decision and budget to repeat a business effect. Other layers can reconnect or read status without independently deciding to execute that effect again.

This prevents a browser retry policy, an API wrapper, a queue, and a provider client from multiplying retries. Bounded attempts, backoff, jitter, and an understanding of which failures are transient are established reliability practices.

Your queue supplies a retry mechanism. The application still has to decide whether repeating the operation is valid.

Stopping is different from compensation

The workflow implementation stops or skips remaining work under its halt policy. It does not automatically reverse completed effects. See the runner’s remaining-phase handling.

Compensation requires domain knowledge. Releasing a reservation, sending a correction, or reversing a completed action can have different conditions and consequences. Compensation can itself fail and must be recoverable. Microsoft’s compensating transaction guidance explicitly treats this as application-specific work.

I would preserve your “mechanism, not product policy” rule: the runtime can execute and record compensation; the application defines when compensation is correct.

Mandatory follow-up work needs durable ownership

If committing a change obliges the application to publish an event or perform another action, “save, then emit” leaves a crash interval.

A transactional outbox addresses that interval by recording the outgoing obligation in the same transaction as the business change. Delivery still needs recovery and duplicate handling. This is a storage relationship and execution responsibility; it does not inherently require another service or a particular message broker.

Use this where notification or downstream processing is part of correctness. Optional telemetry can remain observational.

Your emitter’s exception isolation makes that distinction especially important: mandatory work cannot rely solely on an observer whose failure is deliberately contained. See the emitter contract.

What I would build next

Begin with the existing supervisor launch-and-inspect flow as the reference application contract. It is already a real consumer with the relevant semantics. Make the browser-to-authoritative-outcome path inspectable and executable, then extract only the mechanisms that another application actually needs.

I would prioritize the work as follows.

Write the operation promise beside the application’s shared types

State:

What identifies one user intention.

When acceptance becomes authoritative.

Which results constitute business success.

Which partial effects can remain after failure.

Which component owns execution and recovery.

How cancellation races with completion.

How the frontend recovers the result and resulting data.

How long identities and outcomes remain retrievable.

Use the existing lifecycle vocabulary where its meaning matches. Keep application policy in application code. This follows your rules for types first, real domain states, minimal public APIs, and wrappers that add a substantive invariant. See the design laws.

Prove the interrupted journey

The following are the most revealing acceptance scenarios. They are proposed tests, not tests run during this review.

Failure or race Evidence the application needs to produce

The database commits, then the response connection is dropped The same operation can be recovered without applying its effect again.
Equivalent submissions with the same identity arrive concurrently The durable authority resolves them to the same intended operation.
The same identity arrives with different input Conflicting reuse is refused explicitly.
The process dies after acceptance A later owner can find the accepted responsibility and recover it.
An external effect happens before its outcome is recorded Recovery demonstrates deduplication, reattachment, reconciliation, or quarantine.
The browser reloads while the outcome is unresolved It recovers the relevant identity and authoritative state.
An older response arrives after a newer edit It cannot overwrite or settle the newer view.
A subscription misses completion The interface obtains a later authoritative snapshot and converges.
Cancellation races with completion The interface reports the observed outcome accurately.
The operation succeeds but a local projection or telemetry sink fails Business success remains recoverable.

Your real-host testing and journey rules are well suited to these cases. The assertions need to cover persisted effects and visible user state, not only status codes or emitted events. See the journey’s transport family.

Make the integration reproducible

Close the serving and backend-origin work already recorded in the scaffold roadmap. Provide an optional application example that demonstrates the contract against a real backend and an explicitly selected persistent store.

Also verify the exact package set used by that example. The roadmap’s release coordination work and the guide-mirror model make it inappropriate to assume that independently current guides automatically describe one jointly tested installation. See roadmap items 42 and 43.

The same concern reaches deployment. Updating every source consumer together does not update an already-open browser tab or a persisted workflow snapshot. Define how an older client or stored operation is accepted, migrated, or refused before it causes an incompatible effect.

Extract a public capability only where the consumer demonstrates the need

A short transactional mutation may need only a validated command, stable identity, atomic state change, and repeatable readback.

A long-running operation may need your workflow and supervisor composition.

An MCP caller may use the task manager adapter.

Those paths can share lifecycle semantics without all carrying the same execution machinery. Your rule that a capability earns its public surface through a real consumer is the right restraint here.

My assessment

Your work already contains much of the native “in-between” you are imagining. Supervisor addresses uncertain external execution; Workflow addresses logical execution and persistence boundaries; MCP describes work whose lifetime is independent of a request; the browser reference composition addresses observation and reconciliation.

The part I could not establish from the public scaffold and accessible implementation is one demonstrated application path that makes these responsibilities hold together from the user’s action through to the rendered result.

The promise I would aim to make is:

After durable acceptance, an operation remains identifiable and its outcome recoverable within a defined retention policy. A disconnected frontend can reconcile with that outcome. Uncertain effects remain explicit and have an assigned recovery path.

Before acceptance, preserving an unsent action across browser loss requires a separate client persistence policy. After acceptance, permanent storage loss or an unavailable external system still sets practical limits. Those limits need to be stated, rather than hidden inside a universal success/failure label.

That formulation gives your idea a concrete shape: application responsibility for the complete operation lifecycle. Your existing packages are the foundation. The highest-value addition is the shared contract and the evidence that a real application composes it correctly.