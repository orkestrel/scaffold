# Audit AD4-9b — the overload pin, its controls, its door, and the collision key (`@orkestrel/scaffold` D4-9b)

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/scaffold`):
  the OBJECTIVE lane. The sandbox cannot run Vitest (`EPERM` on the Vite temp directory), so name
  every vector you would execute as `UNRESOLVED` with its exact command and read the Orchestrator's
  own runs under Review evidence; rule on the source and the diff.
- `reviewer` on Opus 5 (native; Read, Grep, Glob): the SUBJECTIVE and cross-engine lane (a Sonnet
  `builder` wrote the unit) — test names, the place of each block, the key change's semantics
  against TypeScript declaration merging, the report's prose.
- `checker` on Sonnet (native; Read, Grep, Glob): the MECHANICAL lane — every carrier present,
  scope, the `host.json` hunks, the gates.

Perform the audit directly and spawn nothing. Do not write any file.

## Subject

The scaffold checkout at `bf7d33a2` plus the 0.0.69 release tree (D4-9, the hosted `guides/tool.md`
and `guides/agent.md` refreshes, the bump, three re-pinned fixtures — all outside this audit) plus
D4-9b. Brief: `.orkestrel/campaign/D49b-scaffold-overload-pin-brief.md` (successor of
`D49-scaffold-overload-reader-brief.md`, carrying the AD4-9 reviewer's findings in
`AD49-audit-reviewer.md`); report: `.orkestrel/campaign/D49b-scaffold-overload-pin-report.md`.
The Orchestrator's probe `P22-d49-reader-forms-probe.md` measured the spellings and the D4-9 red
reading.

## Review evidence

- `.orkestrel/campaign/D49b-diff.patch.txt` — D4-9b's delta over the D4-9 tree, path-scoped to
  `tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`, `host.json`; the full status output is at
  its head.
- `.orkestrel/campaign/D49b-scaffold-gates-orchestrator.log.txt` and
  `D49b-scaffold-gates-test-full.log.txt` — the Orchestrator's gates after D4-9b.
- `.orkestrel/campaign/P23-d49b-key-probe.md` — the Orchestrator's mutation replay of the
  collision-key pin (the key with `line` restored: the pin red; the unit's key: green).

## Numbered falsifiable claims

1. The pin `reads each signature of an exported function overload` exists in
   `tests/setupPolicy.test.ts`, sits directly before `locates declarations across comments and CRLF
   while normalizing paths` with one blank line each side, and the name `reads an exported function
   overload as one name` is gone.
2. That pin asserts three entries of `buildResult` at lines 1, 2, 3 and carries three controls with
   their exact messages: `export default 1` → `export statement is unsupported at
   tests/setupServer.ts:1: ExportDefaultDeclaration`; `export import Legacy = require('node:path')`
   → `export declaration is unsupported at tests/setupServer.ts:1: TSImportEqualsDeclaration`;
   `export = 1` → `export statement is unsupported at tests/setupServer.ts:1: TSExportAssignment`.
3. `POLICY_SURFACE_EXPORT_CASES` in `tests/setupPolicy.ts` carries a `function overload` row after
   the `function` row whose text is two signatures plus an implementation of `waitForCondition`,
   and the matrix loop in `tests/setupPolicy.test.ts` asserts its violation at line 1 through
   `inspectPolicyWorkspace`.
4. The collision loop of `inspectPolicySurface` builds its dedupe key from `path`, `name`, and
   `owner` only, so one overloaded name in one file claimed by a foreign guide reports one violation
   at the first declaration's line; the pin `reports an overloaded export's collision once` asserts
   the filtered list equals exactly that one violation; the report records it red (three entries)
   before the key change and green after, and P23 reproduces both readings.
5. `host.json` moved only in the `tests/setupPolicy.ts` entry digest and the manifest digest; the
   staged surface count is unchanged.
6. Scope and gates: the diff names only `tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`,
   `host.json`; every gate step in the Orchestrator's log exits 0; the hunks carry no `any`,
   assertion, nested function, or default export, and no count in added prose.
7. Design fit: each test is named for what it proves (`.claude/rules/tests.md`); the key's new
   semantics (one name per file per owner) hold for every TypeScript form where one name has more
   than one declaration in a file — overloads, interface merging, function and namespace merging —
   and misreport nothing; the report's prose follows `.claude/rules/writing.md`.
8. Ship scaffold 0.0.69 with this vendored reader and consumer? Name what must change first if not,
   with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim with the evidence (`file:line`);
findings outside the claims under `outside:` (each tagged required, recommended, or
carry-forward; or `outside: none`); ONE terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim
numbers>`. Nothing else.
