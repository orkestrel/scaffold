# Windows wave 2 — measurements

Host: Windows 11 Home 10.0.26200, Node v24.18.1, NTFS, no Developer Mode. Date: 2026-08-21.
Campaign scope: `@orkestrel/test` Windows fixes and 0.0.8 release preparation; probe's open
Windows defects; tarball verification in probe and scaffold.

## Bench liveness, 2026-08-21

- Codex Sol: round-tripped `SOL-LIVE 2026-08-21` over MCP, thread
  `01a0232d-ebcd-7d62-a83c-54f12a214650`. Live.
- Cursor Grok: round-tripped `GROK-LIVE 2026-08-21` through the versioned entry
  `2026.08.11-e8db854`. Live.

## test package baseline (measure-test.sh, scratchpad logs)

`format:check`, `lint:check`, `check`, `build`, and `npm test` all exit 0.
`test:src` reports `153 passed | 26 skipped (179)`. Every skip is host-capability gated through
`tests/setupServer.ts` probes: `SYMLINKS` (false here — `symlinkSync` throws `EPERM`),
`POSIX_MODE`, `CASE_SENSITIVE_FS`, and `RAW_BYTE_NAMES` (all false here). The `link` describe
block in `tests/src/server/factories.test.ts:455` gates entirely on `SYMLINKS`, so the shipped
`link` has no coverage on this host and fails `EPERM` for probe's consumers.

Registry: `@orkestrel/test` serves 0.0.7 (`npm view`, 2026-08-21). Local manifest is 0.0.7 with
user-made devDependency re-pins (scaffold ^0.0.42→^0.0.46, vite ~8.2.1→~8.2.2, api-extractor
^7.58.12→^7.58.13) and a regenerated lockfile, uncommitted.

## Junction semantics on this host (scratchpad/junction-facts.cjs, 2026-08-21)

- Junction to an existing directory: created; `lstatSync().isSymbolicLink()` true,
  `lstatSync().isDirectory()` false, `statSync().isDirectory()` true; `readlinkSync` and
  `realpathSync` resolve; reads pass through.
- Relative source is rewritten: `readlinkSync` returns the absolute path, not the given text.
- Dangling junction to a missing path: created; lstat reports a symbolic link; `existsSync`
  false; `readlinkSync` returns the missing path. Matches the shipped "dangling link exists but
  is unreadable" contract.
- Junction whose source is a FILE: created silently broken — reads fail `ENOENT`. A file source
  must never take a junction.
- Occupied target: `EEXIST`, same as a POSIX symlink.
- `rmSync` recursive on a junction removes the link and leaves the destination. `unlinkSync`
  works on a junction.
- File symlink with type `file`, bare file symlink, and bare symlink to a missing path: all
  `EPERM` on this host.

Instrument coverage: each row is one operation run once in an owned temp directory; the THREW
rows are the instrument's own negative direction and show it discriminates.

## readConfigFile path-spelling split (scratchpad/readconfig-facts.cjs, TypeScript 6.0.3, 2026-08-21)

- `readConfigFile(nativePath, ts.sys.readFile)` on malformed JSON throws
  `Debug Failure. Expected C:/... === C:\...` — the compiler normalizes the diagnostic's
  `fileName` and asserts equality against the caller's string.
- The identical call with a forward-slash path returns diagnostic `1005 ':' expected` with a
  forward-slash `file.fileName`.
- A well-formed file with a native path is unaffected: no diagnostic is constructed, so the
  assert is never reached. `getParsedCommandLineOfConfigFile` shows the same split. The control
  rows (well-formed native, malformed normalized) show the instrument discriminates.

## w3 re-proof (w3-reproof.sh, 2026-08-21)

Subject: the skill-family gate commit `f9a70eb` shipped. Procedure: green baseline
(`test:policy` exit 0, 86 passed) → remove
`.agents/skills/orkestrel-human-journey/agents/openai.yaml` → `test:policy` exit 1 with
`2 failed | 84 passed`, the reds being `requires every discovered skill file, metadata token,
and reference` AND `enforces placement and mirrors over the real workspace` (the placement sweep
also catches the class — a second instrument the commit era lacked) → restore →
`test:policy` exit 0, restore diff clean. The B15 row's re-proof obligation is satisfied.

## Tarball integration (t0-tarball.sh, 2026-08-21)

test built and packed after unit A1; tarball installed into probe and scaffold with the replaced
range `^0.0.7` recorded in both. probe `test:src` moved from `35 failed | 141 passed | 3 skipped`
to `9 failed | 168 passed | 3 skipped` — the entire link-`EPERM` class cleared. The remaining
failures: four `src:bin` signal proofs (Windows delivers no handler-run for `child.kill`'s
SIGTERM/SIGINT, so graceful-exit-0 is mechanism-absent here), four RuntimeStage proofs whose
FIXTURES call raw `symlinkSync(..., 'dir')`, and `refuses a caller's unacceptable target path`
(unit B's subject, now resolving-with-instrument-issue instead of rejecting). scaffold stayed at
its exact baseline `350 passed | 4 skipped` and unit A4 landed on top of the tarball, dissolving
the local junction workaround with no raw `symlinkSync` left under scaffold `tests/`.

## Fleet install state (measured 2026-08-21 after unit M1's deviation)

Only probe, scaffold, supervisor, and test carried `node_modules`; the other fifteen checkouts
were bare. Unit M1 (toolbox) stopped correctly on it — its edit landed and is format/lint
clean; typecheck and suite verification wait on the install. Unit M2 (program, Sol exec,
network-denied sandbox) was in flight when this was measured and is expected to report the same
wall on its verification criteria; its edit is judged on landing. Correction applied: all
fifteen missing installs launched as Orchestrator-owned tracked commands in three slices.
Standing lesson (already the check-the-brief law): a brief's standing-condition claim is
measured, never assumed — every later dispatch gets its checkout's install state confirmed
first.

## readline lone-CR framing (readline-cr-facts.cjs, Node v24.18.1, 2026-08-21)

Under `crlfDelay: Infinity` (the `Process.lines` configuration): lone `\r` breaks a line in
every position (`"a\rb\n"` → `["a","b"]`); a chunk-split CRLF reassembles as one break;
`"a\r\rb\n"` → `["a","","b"]`; bare `"\r"` → `[""]`. The instrument's control rows (LF-only and
CRLF inputs producing the expected pairs) show it discriminates.

## process suite on this host — first-ever reading (2026-08-21)

`src:server` after unit P4-engine: `1 failed | 119 passed | 6 skipped (126)` on the host. The
one red, `caps retained lines while termination drains a flooding child`
(`Process.test.ts:267`, expects `exit.signal === 'SIGKILL'`), also fails with HEAD's
`Process.ts` swapped in place (verified by rewrite-and-restore; restore proven by diffstat
matching the unit's own), so it is a PRE-EXISTING host-conditional failure: the proof's
trapped-SIGTERM-then-escalate shape is POSIX-shaped, and this host's termination ends the child
with a code and a null signal. The sandbox's additional grandchild-tree reds do not reproduce
on the host. Orchestrator error recorded: the first fix-round amendment to P4-engine blamed the
unit for this red without the revert-probe that would have cleared it — the probe now precedes
any future fix round.

## Carried canon finding: the nested-function law's population (2026-08-21)

Unit R2's whole-tree reading: the `no-nested-functions` plugin rule, unscoped, reds sites in
`vite.config.ts` (`:67`, `:74`, `:118`, `:124`), `tests/setup.ts` (`:660`, `:795-826`),
`tests/setupServer.ts` (`:1126-1132`, `:1774-1780`), and `tests/config.test.ts` (`:939`) —
every one outside the sweep's `src`/`app` population. The campaign scoped the plugin to that
same population. Whether the law SHOULD reach configuration and setup files is a canon
question for a future rules ruling; the enumerated sites above are its evidence.

## Standing tree state (uncommitted, expected by every brief)

- scaffold: `M ROADMAP.md`, `M tests/src/server/WriteTransaction.test.ts` (previous session).
- probe: `M src/server/stages/RuntimeStage.ts`, `M src/server/stages/TypeStage.ts`,
  `M tests/src/bin/main.test.ts`, `M tests/src/server/helpers.test.ts`,
  `M tests/src/server/stages/LintStage.test.ts` (previous session).
- test: `M package.json`, regenerated `package-lock.json` (user).
