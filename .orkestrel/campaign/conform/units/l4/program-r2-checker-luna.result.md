The brief invokes the `orkestrel-falsify` verdict contract, so I’m loading that contract and the cited conformance rules before checking the tree.1. CONFIRMED — Applied repairs appear at `tests/setup.ts:90-149`, `tests/guides.test.ts:189-274`, `src/core/types.ts:242-556`, and `src/core/programs/ProgramManager.ts:76-333`. `program-obj-9` remains documented at `src/core/helpers.ts:601-605` and `guides/program.md:349`. `fleet-F1` is folded into the absent `isBrowserVuePath` sweep. `fleet-F2` has no matching class shape; classes are at `src/core/programs/Program.ts:73-89`, `ProgramManager.ts:37-48`, and `errors.ts:23-41`.

2. not held

3. CONFIRMED — The exact old-name word-boundary sweep over `src/**`, `tests/**`, `guides/program.md`, `guides/README.md`, and `README.md` returned empty. The case-insensitive `-s`, `-ed`, and `-ing` inflection sweep over the same paths also returned empty. Property-form sweep for `by`, `.by`, and `by:` returned empty. The report’s § Sweeps names this population.

4. not held

5. CONFIRMED — `src/core/index.ts:1-8` exports the current modules. The guide names the current surface at `guides/program.md:130-151`, helpers at `:283-308`, and methods at `:407-435`. Fences import through `@orkestrel/program` at `guides/program.md:37-381`; `tests/guides.test.ts:189-274` executes and guards the flagship fences. The `AGENTS §` sweep over owned paths returned empty.

6. not held

7. UNRESOLVED — `conform-program.status:1-18` lists only owned files, and the old-name sweep found no alias, re-export, or shim. However, the supplied diff is stale: it shows combined `@throws` text at `conform-program.diff:1250-1261`, while the tree has split rows at `src/core/types.ts:267-274`; it also omits the `try`/`finally` present at `tests/guides.test.ts:229-251`. The current diff scope cannot be certified from stale evidence.

8. not held

9. CONFIRMED — Residue sweeps over `src/**`, `tests/**`, `guides/program.md`, `guides/README.md`, and `README.md` returned no `TODO`, `FIXME`, `debugger`, `console.`, `.skip`, `.only`, `.todo`, or retry matches. The moved fixtures have setup proofs at `tests/setup.test.ts:550-648`; the speculative browser helper is absent. The applied and no-op dispositions correspond to the current tree’s replacements and documented exceptions.

Findings outside the claims

- F-1 — `/home/user/work/evidence/conform-program.diff` does not represent the current tree. Regenerate `/home/user/work/evidence/conform-program.diff` and `/home/user/work/evidence/conform-program.status` with `node /home/user/scaffold/tmp/work/evidence.mjs program` before acceptance.

Referrals

none

Claims attacked and held

- Claims 1, 3, 5, and 9 held against stale-name, parity, scope, and residue attacks. The documented empty-string partition collapse at `src/core/helpers.ts:601-605` remains an intentional exception.

VERDICT: FAIL 7

Journal

left for the driver

Deviation

No tree change observed. Every named file was readable. Evidence drift is recorded as F-1.