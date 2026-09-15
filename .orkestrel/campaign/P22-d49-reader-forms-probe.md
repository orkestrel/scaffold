# P22 — the reader's refusal per export spelling, and the overload pin red by mutation

Orchestrator probe, 2026-09-15 17:32Z, on the scaffold 0.0.69 release tree (D4-9 applied).
Instrument: `P22-d49-reader-forms.test.ts.txt` (run under `tmp/probe/` through the `probe`
project) and `P22-run.sh.txt`; log `P22-d49-reader-forms.log.txt`.

## (a) Which spelling reaches which refusal of `readPolicyDeclarations`

| Spelling | Reading |
| --- | --- |
| `export import Legacy = require('node:path')` | throws `export declaration is unsupported at tests/setupServer.ts:1: TSImportEqualsDeclaration` (the declaration refusal, the accepted-list fallthrough) |
| `export = 1` | throws `export statement is unsupported at tests/setupServer.ts:1: TSExportAssignment` (the statement refusal) |
| `export as namespace Legacy` | throws `export statement is unsupported at tests/setupServer.ts:1: TSNamespaceExportDeclaration` |
| `export declare module 'legacy' {}` | throws `export name is unreadable at tests/setupServer.ts:1` (the identifier refusal) |
| `export declare global {}` | reads `global` at line 1 (observation only: the form is not valid TypeScript outside a module augmentation) |
| `export declare function buildResult(input: string): string` | reads `buildResult` at line 1 (`TSDeclareFunction`, accepted since D4-9) |
| `export abstract class Legacy {}` | reads `Legacy` at line 1 |
| `export declare const enum Legacy { Ready }` | reads `Legacy` at line 1 |
| two overload signatures plus a merged namespace, one name | reads three entries of `legacy` at lines 1, 2, 3 |

So the declaration-refusal control for the pin is `export import Legacy = require('node:path')`,
and the statement-refusal control is `export = 1`; the reviewer's candidate spellings hold.

## (b) The overload pin red by mutation, then green

Line 1757 of `tests/setupPolicy.ts` (`declaration.type === 'TSDeclareFunction' ||`) deleted, then
`npm run test:setup -- tests/setupPolicy.test.ts`:

```text
FAIL  |setup| tests/setupPolicy.test.ts > readPolicyDeclarations > reads an exported function overload as one name
Error: export declaration is unsupported at tests/setupServer.ts:1: TSDeclareFunction
Test Files  1 failed (1)
      Tests  1 failed | 30 passed (31)
```

The line restored from the copy (`cmp` 0), the same command: `Tests 31 passed (31)`. This reading
replaces the writer's own red-first reading (taken through a barred `git stash`) as the evidence
that the pin binds to the defect.
