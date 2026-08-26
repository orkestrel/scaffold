# Unit os-sweep-b — OS-coupling sweep: mcp, probe, server, websocket

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reading this brief inside its own CLI. Perform the
assignment directly and spawn nothing. Read-only: edit nothing, install nothing, run no package
script. Read-only commands (grep, ls, file reads) are permitted.

## Objective

Return distilled evidence of every operating-system coupling in these repositories:

- `C:/Users/mikes/WebstormProjects/mcp` (`@orkestrel/mcp`) — MCP protocol, stdio/SSE/websocket transports, process spawning
- `C:/Users/mikes/WebstormProjects/probe` (`@orkestrel/probe`) — drives LSP and MCP children
- `C:/Users/mikes/WebstormProjects/server` (`@orkestrel/server`) — HTTP server
- `C:/Users/mikes/WebstormProjects/websocket` (`@orkestrel/websocket`) — websocket client/server

## Context

The fleet must run on Windows and Linux. Development happens on Windows; Claude Code Cloud and CI
run Linux. Published `src/` code must be OS-agnostic unless a capability is inherently OS-specific,
in which case it must be gated on the OS it needs. Tests must pass on either OS, or be conditioned
on the OS they require. No code or test may assume a specific shell or terminal (bash, PowerShell,
cmd) unless that shell is the subject under test.

Sweep within each repository: `src/`, `app/` where present, `tests/`, `scripts/`, `configs/`,
`package.json` scripts, and `guides/` (report documentation claims that assume an OS). Exclude
`node_modules/`, `dist/`, `.git/`, `tmp/`, `coverage/`, `old/`, and vendored mirrors under `docs/`.

**Skip these vendored files** — they are copies of `@orkestrel/scaffold`'s host surface and are
audited once in the scaffold repository: `AGENTS.md`, `CLAUDE.md`, `LICENSE`, `.claude/**`,
`.agents/**`, `.codex/**`, `.cursor/**`, `.editorconfig`, `.gitattributes`, `.gitignore`,
`.mcp.json`, `.oxfmtrc.json`, `.oxlintignore`, `.oxlintrc.json`, `.prettierignore`,
`configs/helpers.ts`, `configs/policy.ts`, `guides/guide.md`, `guides/scaffold.md`, `scripts/codex.sh`,
`scripts/cursor.sh`, `scripts/deps.sh`, `scripts/ollama.sh`, `tests/config.test.ts`,
`tests/policy.test.ts`, `tests/setupPolicy.ts`.

A deterministic line-level pattern scan already ran. Its per-repository hits sit at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/scan/<repo>.txt` as
`file:line<TAB>pattern-id<TAB>text`. Use them to seed the sweep, then look for what a line-level
regex cannot see: multi-line constructs, dynamic string composition, and semantic misuse.

## What to observe (report facts; rule on nothing)

1. Hardcoded POSIX paths (`/tmp`, `/dev/null`, `/usr`, `/home`, `/bin`, `/etc`) and hardcoded
   Windows paths (drive letters, backslash literals).
2. Path handling: string concatenation or splitting with `'/'` or `'\\'` on filesystem paths;
   absolute-path checks written as `startsWith('/')`; regexes over paths assuming one separator;
   `path.posix` and `path.win32` usage; path comparisons assuming case-sensitivity or
   case-insensitivity.
3. Spawning: spawn or exec of `bash`, `sh`, `zsh`, `powershell`, `pwsh`, `cmd`; `shell: true` with
   POSIX syntax; spawning `npm`, `npx`, `node`, `git`, or other CLIs where Windows needs `.cmd`
   resolution or `shell: true`; reliance on shebangs or the executable bit; `chmod`.
4. Signals and process control: `SIGTERM`/`SIGKILL`/`SIGINT` semantics (Windows cannot deliver
   most signals), `process.kill`, detached processes and process groups, kill-by-pattern.
5. Environment: `HOME` vs `USERPROFILE`; `TMPDIR`/`TEMP` vs `os.tmpdir()`; PATH joins with `':'`
   vs `path.delimiter`; `SHELL`/`ComSpec` assumptions.
6. Line endings: splitting external output or file content on `'\n'` where CRLF can arrive; regex
   `$` anchors against CRLF input; `os.EOL` in protocol or file output; CRLF-sensitive fixtures.
7. File URLs and URIs: `file://` built by string concatenation instead of
   `pathToFileURL`/`fileURLToPath`; drive-letter casing and percent-encoding.
8. Filesystem semantics: deleting or renaming open files, `fs.watch` differences, permission
   modes, symlinks, path-length limits, reserved device names.
9. Existing OS gating: every `process.platform` or `os.platform()` conditional — where each branch
   is tested, and whether its tests are OS-conditioned.
10. Test assumptions: tests spawning OS-specific binaries, timing thresholds tight enough to flake
    on slower Windows process spawns, temp-directory handling, path assertions with hardcoded
    separators.

## Output — your final message, exactly this shape

- `Question`: one line.
- `Evidence`: per repository, entries `file:line — construct — the OS assumption it carries`,
  tagged `[src]`, `[app]`, `[tests]`, `[scripts]`, `[configs]`, or `[guides]`, and `[gated]` where
  the construct already sits under an OS conditional. No raw file dumps.
- `Distillate`: per repository, the shortest statement of where OS coupling concentrates.
- `Unknowns`: what you could not determine.
- `Deviation`: only if the assignment could not be performed.
