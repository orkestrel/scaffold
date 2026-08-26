# Measured probes — OS-agnosticism campaign

Host: Windows 11 (10.0.26200), Node v24.19.0. Each row records the command and its output.

## fs.access X_OK on win32

`node tmp/xok-probe.mjs` (2026-08-26):

```text
X_OK on plain .txt: PASSES (F_OK-equivalent on win32)
O_NOFOLLOW = undefined
```

- `accessSync(p, X_OK)` on a plain non-executable file passes on win32 — `X_OK` degrades to an
  existence check. `configs/browsers.ts:86` in mcp therefore probes existence, not executability,
  on Windows.
- `fs.constants.O_NOFOLLOW` is `undefined` on win32 Node v24.19.0, so `O_WRONLY | O_NOFOLLOW`
  computes as `O_WRONLY | 0`: the no-follow refusal silently does not happen on Windows. The probe
  repository's comments acknowledge this; whether a compensating check exists is a design-round
  question.

## Codex bench model access

`bash tmp/codex/probe.sh` (2026-08-26): HTTP 400 — `The 'gpt-5.6-sol' model is not supported when
using Codex with a ChatGPT account.` Journal `tmp/codex/probe.jsonl`.

## Cursor bench round trip

`bash tmp/cursor/probe.sh` (2026-08-26): `OK` through versioned entry `2026.08.11-e8db854`.
Journal `tmp/cursor/probe.log`.

## where.exe CRLF and multi-match output

`node tmp/where-crlf-probe.mjs` (2026-08-26): `where notepad` exits 0 with several matches, each
line CRLF-terminated. The browser repository's parse
(`stdout.toString('utf-8').trim().split('\n')[0]`, `src/server/helpers.ts:235-240`) returns
`C:\Users\mikes\scoop\apps\git\2.55.0.5\usr\bin\notepad\r` — a trailing carriage return on the
resolved executable path, and the first match is not even an `.exe`. Confirmed runtime defect on
Windows for multi-match names.

## SIGTERM catchability on win32

`node tmp/sigterm-probe.mjs` (2026-08-26): a child with a `SIGTERM` handler, killed by
`child.kill('SIGTERM')`, exits `signal: SIGTERM` and the handler never runs. Windows terminates
outright; cooperative SIGTERM does not exist. The ungated SIGTERM-survival assertion in the
browser repository's `tests/setupServer.test.ts:442-454` cannot pass on this host as written; the
verify phase runs the real suite to settle it.

## Fleet portability-sweep pre-propagation reading

`npx vitest run --project probe tmp/probe/fleet-portability.probe.test.ts` (scaffold, 2026-08-26,
re-run after the audit round's retag): `inspectPolicyPortability` over every fleet root returns no
violation, and each inspector class carries its own discriminating foreign-root control — a
`package.json` naming a `.sh` script; a `src/nul.ts` reserved name plus a `src/ending.ts` carrying
the literal trim-then-split construct; and an unmapped `.claude/rules/ghost.md`. Every control
reds. The empty fleet reading is therefore a per-inspector measurement: no target reds at re-pin.
The first `ending.ts` plant failed as a control because `printf` collapsed the escape into a real
newline — an invalid-TS fixture the parser rightly skipped; the control caught its own bad plant.

## Windows suite baseline (this host, 2026-08-26)

Serial `npm test` per repo (`baseline/*.log`), reds re-run solo before counting:

- Green: scaffold, lsp (guides project via unit runs), sea, test, probe, server, websocket,
  console (scoped), terminal (scoped), agent, guide, worker.
- mcp: whole-suite run under load showed failures in `MCPServer.test.ts`,
  `StdioClientTransport.test.ts`, and `tests/src/browser/factories.test.ts`; solo unloaded re-runs
  pass 216, 45, and 35 — load flakes, not OS defects.
- browser: deterministic solo red — real-launch `BrowserConnectionError … (code: 0)` plus profile
  `EPERM` teardown; unit B3 owns the diagnosis.
- process: deterministic solo red — `executeSync` grandchild survives the root-only-timeout tree
  kill; unit PR0 owns the diagnosis.

## Dependency-guide mirrors

`node tmp/guide-mirrors.mjs` (2026-08-26): consumer-repo copies of `guides/test.md`,
`guides/probe.md`, `guides/process.md`, and `guides/scaffold.md` diverge from canonical HEAD in
most consumers while `guides/guide.md` and same-layer mirrors match. Instrument coverage: this
compares mirrors against the canonical repository's working tree, not against the pinned release
each mirror was refreshed from, so a `DRIFTED` row means the canonical guide moved after the pin —
expected — not that the mirror is stale for its pin. Ruling: OS-assuming prose in a dependency
guide is fixed once in its canonical repository; consumers pick it up when they re-pin during the
release wave.

## WSL

`wsl.exe --status` (2026-08-26): `Class not registered` — WSL unavailable on this host; no local
Linux gate runs.
