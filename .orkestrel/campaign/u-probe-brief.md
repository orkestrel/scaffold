# Implementation brief — U-probe

## Role and engine

Opus `implementer`, native Claude subagent, sole serial writer in `/home/user/scaffold` from the
clean committed baseline you read with `git log --oneline -1`. You run after U-dist has landed.

**Routing note.** This unit's proof opens a real loopback listener, which a bench sandbox denies with
`EPERM` on every address; `.agents/orchestration.md` § Bench laws routes it to the native
implementer. Recorded.

## Objective

Replace a hard-coded host capability in one test with a runtime probe, so
`npm run test:src:server` exits `0` on a host without an IPv6 stack while the case still runs and
still asserts on a host that has one.

## The defect — read `.orkestrel/campaign/linux-gate-audit-verdict.md` § Claim 4 first

`tests/src/server/helpers.test.ts:214-224`, the case
`refuses redirected version readiness without starting a local daemon`, rewrites a working IPv4
fixture address into `[::ffff:127.0.0.1]` and asserts the fixture received `/api/version`. On this
host `/proc/net/if_inet6` does not exist and a Node `net.connect` to that address fails
`EAFNOSUPPORT`, so `curl` never reaches the fixture, `server.requests` is `[]`, and the assertion at
`:223` fails. `scripts/ollama.sh` is **not** defective — its refusal is correct and its checkout copy
is byte-identical to the published vendored copy. The defect is the test's: `.claude/rules/tests.md`
requires a host-varying property to be probed at runtime on the running host, and requires a
conditional skip to cite the mechanism that makes the case inapplicable rather than a platform name.
The same file already imports `supportsFileLinks` and `supportsMode` from `@orkestrel/test/server`
and gates on them at `:1142` and `:1811`; that is the shape to mirror.

**Do not change the address to plain `127.0.0.1`.** That makes `scripts/ollama.sh` classify the
endpoint as loopback, and on any host with `ollama` on `PATH` — this one included — the script would
then launch a real `setsid ollama serve` daemon from inside `npm test`.

## What to build

1. **Export a capability predicate from `tests/setupServer.ts`** — a `{verb}{Noun}` helper beside the
   file's other exports, named for what it reports (whether an IPv4-mapped IPv6 loopback address is
   reachable on this host). It opens a real listener on `127.0.0.1` port `0`, attempts a
   `net.connect` to `::ffff:127.0.0.1` on that port, resolves `true` on connection and `false` on
   `EAFNOSUPPORT` or any connect error, and closes both ends in every path. It is asynchronous.
   Place any reusable declaration per `.claude/rules/architecture.md`.
2. **Gate the case on it.** Evaluate the predicate once at module scope in `helpers.test.ts` (the
   file is ESM; top-level `await` is available) and gate the case with `it.skipIf(...)`. Beside the
   guard, cite the mechanism the way `:1140-1141` does for its siblings: the `AF_INET6` connect
   returning `EAFNOSUPPORT` on a host with no IPv6 stack. Cite the mechanism, not "Linux" or "the
   container".
3. **Test the predicate against a second mechanism** in `tests/setupServer.test.ts`, per
   `.claude/rules/tests.md`: compare its answer to an independent reading of the same host fact —
   whether `/proc/net/if_inet6` exists is one such reading on Linux, and a direct socket attempt is
   another. Never assert the predicate against itself. On this host the expected value is `false`;
   write the test so it is correct on a host where it is `true`.

## Owned files

`tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/src/server/helpers.test.ts`, and any
test-side types file the architecture rule prescribes.

## Off-limits

`src/**`, `scripts/**`, `tests/distribution.test.ts` (the previous writer's), `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, `configs/**`, root dotfiles, `package.json`,
`package-lock.json`, `host.json`, `guides/**`, `ROADMAP.md`, `.orkestrel/**`, `tmp/**`, and every file
under `/home/user/toolbox` and `/home/user/ollama`.

## Host conditions

Linux, `node v22.22.2`, no IPv6 stack (`/proc/net/if_inet6` absent; `net.connect` to
`::ffff:127.0.0.1` → `EAFNOSUPPORT`), `ollama` **is** on `PATH` and a daemon is running on
`127.0.0.1:11434` — which is exactly why the address must not become plain loopback. `node_modules`
installed and current.

## Execution

Perform this assignment directly and spawn no agent. Write only the owned files.

## Deviation contract

Stop and report if the case cannot be gated without changing its address, if a file outside the
owned list must change, or if `test:src:server` shows any failure other than the one this unit
removes. The predicate's exact name and the wording of the mechanism comment are yours to decide and
record.

## Acceptance criteria, cheap-first

1. `npm run format:check` exits `0`.
2. `npm run lint:check` exits `0`.
3. `npm run check` exits `0`.
4. `npm run test:setup` exits `0`.
5. **`npm run test:src:server` exits `0`** on this host, with the gated case reported as skipped
   and every other case passing. Report the counts.
6. `git diff --stat` names only owned files.

## Output

Return, as structured data: the touched files with a one-line reason each; the predicate's name and
the mechanism comment verbatim; each criterion with its exact exit code and the `test:src:server`
counts; the deviation state. No process diary.
