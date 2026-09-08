# Prepare ollama host validation

Act as builder on this fully specified instrument unit. Read scaffold AGENTS.md,
.agents/orchestration.md, portability, writing, quality, and documentation rules, and
the orkestrel-harden-package skill with centralization and contract references. Spawn nothing.

Own only scaffold/tmp/pass/ollama-audit-controls.mjs, ollama-host-preflight.sh,
run-ollama-host.sh, validate-ollama-host.sh, and the report at
scaffold/tmp/units/d7n-ollama-host-instruments-report.md. Other agents own package source; do not edit any package or
retained campaign file. No installs, commits, pushes, permission changes, or credentials.
Use apply_patch and forward-slash paths. Run syntax checks only, never script bodies.

Follow the accepted agent host instruments as the template. Read the immutable
d7n-agent-host-instruments-2-check-report.md. Keep top-level preflight guards, the EXIT
status trap, stale-log refusal, exact baseline check, guide hash check, and no-install
validation. Read the ported ollama fix and close briefs for the named criteria.

ollama-audit-controls.mjs takes the checkout path and reads only these bounded texts:
guides/ollama.md, src/server/OllamaProvider.ts, tests/service/budget.test.ts, and the
test paths whose comments O4 names. Print a labeled PASS or FAIL and exit nonzero if any
check fails. Check the exact function-row convention sentence prefix, the class-row
convention sentence, and the constants convention sentence from O1. Refuse a Surface
row keyed by a code token whose Kind is function, const, or class and whose next Shape
cell is blank. Match formatter padding with whitespace-aware expressions, never literal
unpadded pipes. Require the Surface section and table header to exist so a missing table
cannot pass. Refuse the literal '. either way', ', since the source', 'from @orkestrel/agent)',
and '{@link NDJSONParser}' at their named paths. Refuse the whole-word 'above' only in
the O4 test paths. These are bounded text controls, not a Markdown or TypeScript parser;
do not claim they verify the authored signatures or every capitalization decision.

ollama-host-preflight.sh sources pass-env.sh, pins ollama at the full resolved 98e9c34
commit, requires clean status, records installed guide sha256 prefix 2b76b363, and runs
those controls. It writes tmp/pass/d7n-ollama-host-preflight.log.txt, refuses an existing
log, and preserves the expected red exit. Resolve the full commit by read-only git -C.

run-ollama-host.sh follows run-agent-host.sh with package ollama, brief
tmp/units/d7n-ollama-converge-fix-host-brief.md, canonical report
tmp/units/d7n-ollama-converge-fix-report.md, and fresh journal/stderr names
tmp/claude/d7n-ollama-converge-fix-host.jsonl and .err. Keep the established implementer
route and cap 5400 seconds. Forbid Bash and alternate execution. Use only Read/Grep/Glob/
Edit/Write; root owns shell validation. Refuse dirty or stale state. Do not launch it.

validate-ollama-host.sh sources pass-env.sh, cd to ollama, creates a fresh log directory,
and logs each exact command and actual exit. Run audit controls, npx --no-install oxfmt
--config .oxfmtrc.json --check guides/ollama.md README.md tests src, npx --no-install
oxlint --config .oxlintrc.json --deny-warnings tests src, npm run check, npm run docs,
npm run test:guides, and npm run test:policy. Fail on a failure. Do not execute mutating
docs directions or format/lint writes. Root owns the separate fixed-point run and the
source-server observation; do not start a daemon or external service.

Return syntax evidence and touched paths only. Do not claim runtime validation.
