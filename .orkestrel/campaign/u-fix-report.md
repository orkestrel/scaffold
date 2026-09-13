# u-fix — unit report

Engine: Opus 5 `implementer`, native subagent. Brief: `u-fix-brief.md`. Baseline `c2a42a1`.
Transcribed from the unit's return; the Orchestrator's ruling on each deviation follows.

## Touched files

- `tests/setupServer.test.ts` — item A's rejection-reason assertion; the module-scope npm reading
  moved into the cases that take it; the installing case removed; `provisionNpm`, `ambient`, and
  `resolveTool`/`OLLAMA_TOOLS` cases.
- `tests/setupServer.ts` — item B's shadowed `PATH` in `executeOllamaSetup`, with `OLLAMA_TOOLS` and
  `resolveTool`; `TestNpmInterface` → `TestNpm`; `resolveNpm` → `provisionNpm`; `host` → `ambient`.
- `tests/src/server/helpers.test.ts` — item B's pinned case: an unready loopback endpoint refuses
  with exit 127 and starts no daemon.
- `tests/distribution.test.ts` — item C: the installing case received with its `skipIf` gate and
  timeout; module-scope `ambient` reading; `provisionNpm` call site.
- `tests/guides.test.ts` — item G's pin: the README floor equals `package.json`'s `engines.node`.
- `src/core/constants.ts` — item E: `DEFAULT_DEV_ENGINES` → `WORKSPACE_DEV_ENGINES`, TSDoc stating
  every generated manifest carries it and no blueprint field varies it.
- `src/core/compilers.ts` — item E: the import and the emit site.
- `guides/scaffold.md` — item E's parity row; item F's toolchain-floor paragraph in § Generated
  workspace.
- `README.md` — item G: "Node 22.18.0 or later".
- `ROADMAP.md` — item H: counts deleted, the possessive recast, the `@types/node` row widened to the
  emitted Node claims, `supportsMappedLoopback` row, `@orkestrel/sqlite@0.0.11` row.

Diffstat: 316 insertions, 97 deletions, owned files only.

## Criteria, unit's readings

| command | exit | reading |
| --- | --- | --- |
| `npm run format:check` | 0 | |
| `npm run lint:check` | 0 | |
| `npm run check` | 0 | |
| `npm run test:setup` | 1 | one case, the stale vendored digest (D2); no case reaches the registry |
| `npm run test:src:server` | 1 | one case, D2; item B's case alone exit 0, 109 ms |
| `npm run test:src:core` | 0 | 410 passed |
| `npm run test:guides` | 0 | 23 passed, item G's pin included |
| `npm run test:policy` | 0 | 91 passed |
| `npm run test:distribution -- --mode release` | 0 | 6 passed, 77.9 s; the moved case ran there at 4021 ms |
| `git diff --stat` | owned only | |

Observations with the same D2 cause: `test:src:bin` exit 1 (5 failed, 248 passed); `test:config`
exit 1, naming it: `The committed host inventory is stale at guides/scaffold.md`.

## Item A: control readings

- Briefed stub control (`return false`) with item A's assertion in place: `2 passed`, exit 0 — the
  stub did not redden. Restoration proved with `git diff --exit-code -- tests/setupServer.ts`.
- Why, measured: this host has no IPv6 stack, so the predicate's true answer is `false` and a
  `return false` stub is behaviourally identical; no assertion can distinguish them here.
- Substitute control that does redden: with the `::ffff:` request replaced by one failing for a
  different reason, the pre-change assertion passed (`2 passed`) while the post-change assertion
  failed (`1 failed`, `refusal: undefined` against `'EAFNOSUPPORT'`). Plant removed, file restored.

The assertion reads `{ delivered, refusal }` against `{ delivered: false, refusal: 'EAFNOSUPPORT' }`
when the predicate reports `false`, with the plain `127.0.0.1` control asserted at `200` first.

## Item B: tool list and the pinned case

Enumerated from `scripts/ollama.sh`, every external program it launches (`kill`, `printf`, `command`,
`cd`, `pwd` are builtins): `curl`, `dirname`, `mkdir`, `mktemp`, `node`, `rm`, `setsid`, `sh`,
`sleep`, `timeout`, `uname`. The brief's draft list omitted `dirname` and `mkdir` and named a
builtin. The interpreter is resolved separately and launched by path, because the spawn's own lookup
reads the child's `PATH`; without that the first run returned `ENOENT` on `bash`.

Pinned case `refuses an unready loopback endpoint rather than starting a host daemon`:

- Before the fix: exit 1, `Test timed out in 5000ms`, and the run **launched this host's real
  daemon** — `tmp/ollama-service.log` gained `Error: listen tcp 127.0.0.1:40755: bind: address
  already in use`.
- After the fix: exit 0, 109 ms; `result.code` 127, `result.expired` false, stderr carries
  `ollama.sh: ollama is required to start an unreachable loopback endpoint`; the fixture recorded
  exactly `['/api/version']`.
- Whole `Ollama setup` block: exit 0, 11 passed.

## Deviations, and the Orchestrator's rulings

**D1 — criterion 10's stub control is unreachable on this host.** Ruled **accepted**. The brief
inherited the Orchestrator's reproduction without accounting for the host's true predicate value
already being `false`. The unit's substitute control is the stronger instrument: it shows the
pre-change assertion admitting a wrong-reason `false` and the post-change assertion refusing it,
which is exactly the discrimination claim 8 lacked. The brief's control was a defect of the brief.

**D2 — criteria 4 and 5 cannot reach exit 0 until `build` regenerates the vendored inventory.**
Ruled **accepted and expected**. Item F edits `guides/scaffold.md`, `host.json` digests it, and
`host.json` was off-limits to the unit by design. The unit proved the cause decisively: with the
guide alone at its committed bytes and every other change in place, `test:setup`, `test:config`,
`test:src:server`, and `test:src:bin` all exit 0. The Orchestrator's verification runs `build` first
and commits the regenerated `host.json` with this change.
