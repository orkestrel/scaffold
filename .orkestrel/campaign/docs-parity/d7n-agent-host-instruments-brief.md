# Prepare host-owned agent validation

Act as a bounded builder. Read AGENTS.md, .agents/orchestration.md, the portability,
writing, quality, and documentation rules, the campaign handoff, and the
orkestrel-harden-package skill with centralization and contract references. Spawn nothing.

Own tmp/pass/agent-audit-controls.mjs, agent-host-preflight.sh, run-agent-host.sh,
and validate-agent-host.sh in scaffold. Return tmp/units/d7n-agent-host-instruments-report.md.
Other agents own package source. Do not edit any package file. Do not execute script
bodies, install, commit, push, publish, read credentials, or change permission controls.
Syntax checks are allowed. Use apply_patch, forward-slash paths, and git -C.

The current agent checkout is clean at 54e7199. Its writer can read and edit but its
shell commands were denied. The Orchestrator will run preflight and validation on the
host; the successor writer will use Read, Grep, Glob, Edit, and Write only.

Write agent-audit-controls.mjs using native fs reads and exact bounded text checks.
It takes the agent checkout path, reads guides/agent.md and src/core/types.ts, and emits
a labeled PASS or FAIL per check before exiting nonzero if a check fails. These are
targeted audit assertions, not a new Markdown or TypeScript parser:

- Constants: text between ### Constants and ### Helpers has a Shape table header
  and the exact sentence A `Shape` cell holds the constant's declared type.
- Validators: text between ### Validators and ### Errors has a Shape header and
  the exact sentence In a guard table a `Shape` cell holds the type the guard narrows to.
- Methods-only: the Surface rows keyed ChannelInterface and AuthorityInterface each
  contain the literal {} plus. Read the rows by their exact keyed line; do not parse
  an arbitrary table or alter input text.
- Topic headings: the guide prefix before ### Factories contains no line beginning #### .
- Tallies: the guide lacks the literal phrases two summarizer calls and the two halves.
- Endings: src/core/types.ts has no empty comment line immediately before a closing
  doc-comment line, using a multiline expression with CRLF support.

Use module-scope helpers only where needed and no assertions on source syntax or types.
Print the actual failed names and no prose tally. Check that each bounded section/key exists;
a missing section or key must fail, not pass vacuously.

Every shell script uses set -eu and sources pass-env.sh.
agent-host-preflight.sh prints agent HEAD and status, requires clean status, records
the installed guide dist hash through sha256sum, then runs the audit controls with node.
Write its full stdout/stderr to tmp/pass/d7n-agent-host-preflight.log.txt and preserve
the controls' exit code. Expect a nonzero red on the uncorrected checkout; do not run it.

run-agent-host.sh refuses a dirty agent checkout, an existing successor journal/stderr,
or a missing tmp/units/d7n-agent-converge-fix-host-brief.md. It launches the established
CLI implementer route from scaffold with the target --add-dir, acceptEdits, model opus,
effort high, stream-json and verbose, timeout 5400, and the known Git Bash environment
path. It names the successor brief and canonical returned report path
tmp/units/d7n-agent-converge-fix-report.md. Require that report path to be absent.
Write tmp/claude/d7n-agent-converge-fix-host.jsonl and its .err counterpart. Do not set
allowedTools, disableSandbox, or any other permission override. The prompt forbids Bash
and tells the writer host validation is owned by the Orchestrator.

validate-agent-host.sh runs only read-only checks in agent and records each command's
actual exit in separate logs under a fresh mktemp directory in tmp/pass. Run the audit
controls, scoped oxfmt --check over guides/agent.md README.md tests/guides.test.ts src,
scoped oxlint --deny-warnings over tests/guides.test.ts src, npm run check, npm run docs,
the established no-write docs directions from the retained agent fix brief, npm run
test:guides, and npm run test:policy. Read package.json and scripts/docs.ts only to resolve
the exact docs direction flags if needed. Do not invent a CLI flag. Fail on a failed
check and print the log directory. Do not run tree-wide mutating format or lint.

Return bash -n and node --check readings only. Do not claim runtime validation.
