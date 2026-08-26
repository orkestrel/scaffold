# Unit os-sweep-a — OS-coupling sweep: process, lsp, sea

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reading this brief inside its own CLI. Perform the
assignment directly and spawn nothing. Read-only: edit nothing, install nothing, run no package
script. Read-only commands (grep, ls, file reads) are permitted.

## Objective

Return distilled evidence of every operating-system coupling in these repositories:

- `C:/Users/mikes/WebstormProjects/process` (`@orkestrel/process`) — child-process management
- `C:/Users/mikes/WebstormProjects/lsp` (`@orkestrel/lsp`) — language-server protocol client
- `C:/Users/mikes/WebstormProjects/sea` (`@orkestrel/sea`) — single-executable applications

## Context

The fleet must run on Windows and Linux. Development happens on Windows; Claude Code Cloud and CI
run Linux. Published `src/` code must be OS-agnostic unless a capability is inherently OS-specific,
in which case it must be gated on the OS it needs. Tests must pass on either OS, or be conditioned
on the OS they require. No code or test may assume a specific shell or terminal (bash, PowerShell,
cmd) unless that shell is the subject under test.

Sweep within each repository: `src/`, `app/` where present, `tests/`, `scripts/`, `configs/`,
`package.json` scripts, and `guides/` (report documentation claims that assume an OS). Exclude
`node_modules/`, `dist/`, `.git/`, `tmp/`, `coverage/`, `old/`, and vendored mirrors under `docs/`.

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
   `$` anchors against CRLF input; `os.EOL` in protocol or file output; CRLF-sensitive fixtures;
   presence or absence of `.gitattributes`.
7. File URLs and URIs: `file://` built by string concatenation instead of
   `pathToFileURL`/`fileURLToPath`; drive-letter casing and percent-encoding (`file:///c%3A/…`) —
   critical for the lsp repository.
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
