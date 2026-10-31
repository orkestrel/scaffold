# Production hardening

This reference governs a hardening selection: the package's bounds, the risk and seam matrix, real-implementation testing, live-service tests, lifecycle pressure, holding the bounds, security paths, the test audit, and generated outputs.

## Build the risk and seam matrix

Draw the matrix inside the package's bounds: the contract its types and guide promise and the hosts it supports. A boundary the package crosses but does not own (the host filesystem's locking and handle semantics, a runtime's scheduling, a harness's sandbox, a scanner's hold on a file) enters the matrix only as the contract's promise about it: what the package does when that boundary fails, never how the boundary behaves.

List every boundary where the contract's assumptions can fail:

- public inputs and option combinations;
- empty, missing, minimum, maximum, overflow, `NaN`, infinity, and signed-zero values;
- invalid state transitions and repeated lifecycle operations;
- partial work, abort, timeout, retry, pause/resume, stop/destroy, and cleanup;
- concurrency, reentrancy, ordering, idempotency, fairness, and backpressure;
- filesystem, process, socket, protocol, browser, model, and network boundaries, each marked owned or not owned;
- malformed or unexpected strings, paths, headers, frames, JSON, prototypes, getters, and proxies;
- resource ownership, leaks, teardown, and pressure;
- environment isolation, and the contract's refusal or degradation on an unsupported host;
- serialization, restore, public exports, and consumer ergonomics.

For each applicable seam, state the invariant, the failure mode, the observable result, the proving test, and whether the package owns the boundary. Omit irrelevant generic cases rather than creating meaningless tests.

## Use real implementations

Test through public behavior with:

| Seam                                    | The real thing it must be driven with                                                          |
| --------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Package behavior                        | Real package classes and composed managers                                                     |
| Filesystem                              | Temporary directories and files                                                                |
| Network protocol                        | Actual local sockets and protocol-faithful fixture servers                                     |
| Browser                                 | An actual Chromium-family browser when the browser is the system                               |
| Declared dependency                     | The actual installed dependency                                                                |
| External service or model               | The real service in its dedicated project when its behavior is the claim                       |
| Third-party client or protocol consumer | Representative real foreign clients of each client class the contract names, driven end to end |

A third-party seam is the one case where the package's own tests cannot close the claim:
protocol tests prove the protocol, and only a real client of that class proves the
integration. Drive it end to end, record the exact commands, and record what that client
could NOT reach as an honest limit rather than an untested assumption.

Never use mocks, behavioral fakes, module replacement, or framework spies. Use recorders for callbacks and customizable data factories/stubs for inert shapes.

## Design live-service tests

Keep live tests in a dedicated project with explicit readiness, setup, timeout, and cleanup.

- Require the real service; fail loudly when unavailable.
- Never silently skip or convert absence into a passing result.
- Warm the service before measured assertions when startup is material.
- Use the smallest prompt/request/context that proves one behavior.
- Make assertions semantic and bounded, not dependent on exact prose.
- For model tests, constrain temperature/seed/options when the real API supports it, but do not claim determinism the provider does not promise.
- Increase context or workload incrementally only when the scenario requires it.
- Test instruction precedence, long-context behavior, summarization, tool calls, scopes, and state transitions through observable outcomes.
- Avoid redundant expensive calls; one request proves one primary claim.

Keep live projects outside the fast default suite when repository policy requires it, while making their explicit command authoritative for the campaign.

## Challenge lifecycle and pressure

Exercise:

- repeated start/stop/pause/resume/abort/destroy calls;
- operations during transitions and after teardown;
- concurrent managers/entities and interleaved completion;
- late events, listener errors, rejection paths, and cleanup after partial setup;
- append/change/remove behavior while work is active versus already advanced;
- queues, pools, workers, terminals, sockets, or browsers at representative concurrency;
- cancellation propagation and bounded shutdown;
- no busy polling, open handles, leaked processes, sessions, pages, files, or listeners.

Set each pressure proof's load and concurrency from the coordination defect it must expose, state them with the reason beside the proof, and re-examine them against the stop signals `.agents/orchestration.md` § Size gate names. `.claude/rules/tests.md` § Expensive proofs owns the repeat count and acceptance under suite load.

## Hold the package's bounds

A seam's finding concerns the package when it falsifies a promise the contract makes; it concerns the host when it describes how a boundary the package does not own behaves.

- When a finding falsifies a promise, repair it within its row and close the repair with the mutation probe `.agents/orchestration.md` § Size gate names.
- When a finding describes a host behavior the contract never promised to survive, open one design question on the package's dependence on that behavior: remove the dependence, narrow the promise, or refuse on that host. Never add a mechanism around the behavior.
- When a finding is outside the bounds and below the release bar, record it in the deferral list (`.claude/rules/campaign.md` § Content), and reopen it only when its trigger fires.
- Before another round at one seam, weigh a further repair against a design question and re-examine the stop set for that seam against the signals `.agents/orchestration.md` § Size gate names; a hardening selection adds one: findings move from the contract to the host.
- A seam that reprices on every edit (a count, a timing) is not a seam; drop the claim per the `orkestrel-falsify` skill § End the depth search.

## Audit security and destructive paths

For every fetch, write, delete, extraction, path, protocol, or authentication boundary:

- validate before acting;
- constrain targets and traversal;
- fail closed when an allowlist or target cannot be established;
- avoid logging secrets or untrusted full payloads;
- make destructive scope explicit and recoverable where practical;
- prove malformed, partial, oversized, and unexpected input behavior.

## Audit the tests themselves

Run the discovery census, `scripts/discovery.ts` as `SKILL.md` § Scripts states (step 11 of the workflow): which project collects each file, which gate reaches each project, and where a file carries `.todo`, a conditional skip (`.skipIf`, `.runIf`), `.fails`, a retry, or a timeout. `vitest/no-focused-tests` and `vitest/no-disabled-tests` refuse `.only` and `.skip`. Then verify:

- every intended test file is collected by the correct project, and the test counts and environments match the intent;
- judge each discovered project's invocation and gate membership by `.claude/rules/workspace.md` § Test project matrix; read each reported chain and rule each workbench by its purpose;
- every flag the census reports is closed or ruled with a reason;
- every marker it reports is justified;
- no current-scope requirement is represented only by a todo or a placeholder;
- assertions can fail for the defect they claim to catch, and fail rather than pass when their population is empty;
- tests observe public outcomes rather than private implementation;
- helpers do not reimplement production logic;
- real cleanup runs even after assertion or setup failure.

Collection evaluates the `setupFiles` of every project the census lists, so each listed project's setup module runs its load-time work; `--projects a,b` lists only the named projects, so a project outside the names never loads. When a setup module contacts a live service at load, such as a `service` project's readiness gate in `tests/setupService.ts`, run the census only while an instance the run may contact is up and the service's address points at it, or name the other projects with `--projects`; with the address on a closed port, a listed project's listing fails and the census exits 2 naming its gate.

## Inspect generated outputs

- build all supported environments;
- inspect export/declaration alignment and supported runtime targets;
- confirm required declarations, maps, and assets are present;
- confirm secrets, temporary artifacts, and generated reports do not leak into outputs.
