# Claude Opus liveness probe — untrusted

Result: unavailable. Route this unit to the Sol implementer.

Authority check: `.agents/orchestration.md`, `.agents/transports/claude.md`,
`.codex/agents/opus.toml`, `.agents/skills/orkestrel-falsify/references/brief.md`,
and `tmp/pass/pass-env.sh` exist at the rooted tree. The canonical brief reference
is the only matching authority; no superseded vendored copy was found.

Resolved Claude executable: `C:\Users\mikes\scoop\shims\claude.exe`.
Resolved Git Bash executable: `C:\Users\mikes\scoop\apps\git\2.55.0.5\bin\bash.exe`.

Initial boundary command failed before reaching Claude because
`C:\Program Files\Git\bin\bash.exe` does not exist. The retry used the resolved
Git Bash path and sourced `/c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh`:

```text
claude -p "Read and follow only /c/Users/mikes/WebstormProjects/scaffold/tmp/claude/d7n-dependent-opus-probe-brief.md" --model opus --effort high --permission-mode acceptEdits --output-format stream-json > /c/Users/mikes/WebstormProjects/scaffold/tmp/claude/d7n-dependent-opus-probe.jsonl 2> /c/Users/mikes/WebstormProjects/scaffold/tmp/claude/d7n-dependent-opus-probe.stderr
```

Exit: `1`.

Final result: `You've hit your weekly limit · resets Sep 12, 9pm (America/New_York)`.

Journal target: `tmp/claude/d7n-dependent-opus-probe.jsonl`.
Stderr target: `tmp/claude/d7n-dependent-opus-probe.stderr`.
Neither capture file was created by the rejected launch, so no durable journal or
session exists. This is a transport deviation caused by the CLI usage-limit rejection.

Validation: `git diff --check -- tmp/claude/d7n-dependent-opus-probe-brief.md tmp/units/d7n-dependent-opus-probe-report.md` exited `0`. Git status and Git diff report no tracked changes because `tmp/` is ignored.

Deviation: CLI usage-limit rejection. No authentication, installation, credential access, source edits, package changes, full gates, commits, or destructive action occurred.
