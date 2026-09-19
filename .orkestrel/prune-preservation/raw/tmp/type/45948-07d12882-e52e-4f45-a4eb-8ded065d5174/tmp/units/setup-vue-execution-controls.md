# Exercise generated proof execution statuses

Act as builder on Terra. Read canonical AGENTS.md, .agents/orchestration.md, applicable tests, portability, quality and writing rules, and the orkestrel-falsify skill and references. You are not alone; preserve other work. Author only canonical tmp/audit/run-setup-vue-execution-controls.ps1. Do not run, install, commit, delete, delegate, or edit source.

Write a guarded PowerShell instrument for the prepared isolated tmp/audit/setup-vue-control checkout. Do not copy dist or modify release checkout. Validate resolved paths beneath the audit root. Save original fixture tests/setupServer.ts bytes/SHA256, then run separate precise replacements against those original bytes:

- todo: exact registration it('renders the Vue component through the browser setup helper', () => { becomes it.todo with same title/body.
- absent: replace only the exact registration title with 'a different generated component proof', preserving body.
- failed: replace only the fixture string for expect(container.querySelector('p')?.dataset.setup).toBe('vue') with toBe('wrong').

Each mutation must match exactly its intended occurrence, run the same npm.cmd run test:distribution -- --mode release tests/distribution.test.ts -t 'renders a Vue SFC through the generated browser setup project', capture complete output to a distinct canonical tmp/audit/setup-vue-<control>-control.log.txt, and require nonzero actual process exit. Restore original bytes in finally and verify SHA256 after each run. After controls run the original unchanged fixture and require exit0, logging setup-vue-restored-control.log.txt. Restore bytes even when a command unexpectedly passes. Print measured exit codes. Temporarily allow informational native stderr without throwing and restore error preference; use Out-Host so function results contain only actual exit codes. Fail early on path or exact-match errors. Parent executes after any prior control is complete.
