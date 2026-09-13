# u-probe — unit report

Engine: Opus 5 `implementer`, native subagent, workflow `wf_532659d1-39d`.
Structured return, transcribed verbatim from the workflow journal.

## done

true

## touched

- `tests/setupServer.ts` — Adds the exported async capability predicate `supportsMappedLoopback`, plus the `node:events` `once` and `node:net` `connect` and aliased `createServer as createSocketServer` imports it needs.
- `tests/src/server/helpers.test.ts` — Evaluates the predicate once at module scope into `MAPPED_LOOPBACK` and gates `refuses redirected version readiness without starting a local daemon` with `it.skipIf(!MAPPED_LOOPBACK)`, citing the `AF_INET6` / `EAFNOSUPPORT` mechanism beside the guard.
- `tests/setupServer.test.ts` — Adds the `the mapped loopback reading` suite proving the predicate against an HTTP request to the rewritten address (with a plain-IPv4 control) and against the kernel's `/proc/net/if_inet6` table.

## criteria

- npm run format:check — exit `0` — Re-run after the last edit: `All matched files use the correct format.` over 225 files.
- npm run lint:check — exit `0` — `oxlint --deny-warnings .` produced no output.
- npm run check — exit `0` — Root tsc plus check:src:core, check:src:server, check:src:bin all clean.
- npm run test:setup — exit `0` — Test Files 3 passed (3); Tests 86 passed (86). The two added cases under 'the mapped loopback reading' both ran and passed (39ms and 1ms under --reporter=verbose).
- npm run test:src:server — exit `0` — Test Files 5 passed (5); Tests 444 passed | 1 skipped (445). The single skip is `Ollama setup > refuses redirected version readiness without starting a local daemon`, confirmed by name under --reporter=verbose.
- git diff --stat — exit `0` — Names tests/setupServer.ts, tests/setupServer.test.ts, tests/src/server/helpers.test.ts (owned) plus tests/distribution.test.ts, which is the previous writer's landed change the dispatch told me to build on. I did not touch it: its mtime is 2026-09-13 04:58:05, before my first edit at 05:07:41, and its per-file diffstat (23 insertions, 4 deletions) is unchanged from the reading I took at unit start. `git diff --stat` over my three owned files alone: 354 insertions, 19 deletions.

## observations

- The case's address is unchanged. `server.url.replace('127.0.0.1', '[::ffff:127.0.0.1]')` stays exactly as it was, so `scripts/ollama.sh` still classifies the endpoint as non-loopback and launches no daemon.
- Host reading measured before writing: `/proc/net/if_inet6` does not exist, `net.connect` to `::ffff:127.0.0.1` rejects `EAFNOSUPPORT`, and `fetch` to `http://[::ffff:127.0.0.1]:PORT/` rejects with `cause.code === 'EAFNOSUPPORT'`, while the same listener answers 200 on `http://127.0.0.1:PORT/`.
- The predicate lets a listener refusal propagate rather than returning false. Under a sandbox that denies `listen` with EPERM the call rejects, so a denied host cannot read as 'no IPv6 stack'. The `@throws` block records that.
- `@orkestrel/test/server` exports no IPv6 or mapped-address predicate (checked `supportsBytes`, `supportsCase`, `supportsDirectoryLinks`, `supportsFileLinks`, `supportsMode` in its `index.d.ts`), so the helper adds a capability rather than renaming one. It reuses the package's `createLoopback` for the listener instead of hand-rolling listen and close.
- The predicate is evaluated once at module scope in helpers.test.ts into `MAPPED_LOOPBACK`, through top-level await, which the ESM test module supports.
- npm run test:policy also exits 0 (91 passed), which covers the comment and prose term sweep over the edited files. It is not one of the brief's criteria; reported as a reading.
- The two added cases prove the predicate against two mechanisms that are independent of it: an HTTP client driving the same `::ffff:` rewrite the gated case performs, carrying its own plain-`127.0.0.1` control that must return 200; and the kernel's `/proc/net/if_inet6` interface table read from the filesystem, guarded on `/proc/net` existing rather than on a platform name. Both comparisons are written to hold on a host where the answer is true.

## deviation

(none)
