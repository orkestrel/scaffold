<!-- codex exec, gpt-6-astra, read-only; journal u1-conform-audit-2-analyst.jsonl (ephemeral, swept at acceptance); thread 01a0c057-f91f-7d60-bef8-527a400ebf23; exit 0; retained 2026-09-20 -->

The numbered rulings follow. This is a read-only source audit with in-memory execution of the live extractor and Sass compilation. Gate results were not rerun. Paths are relative to Veneer unless prefixed with `scaffold/`.

| Claim | Ruling | Deciding evidence |
|---|---|---|
| **1 — Shell stylesheet** | **CONFIRMED** | `app/browser/styles/index.scss:3` loads `shell` with `@use`. `_shell.scss:1` declares the order before its block and contains no `body` rule. In-memory compilation with installed Sass emitted `@layer shell;` followed by `@layer shell { … }`. Parsing the existing `dist/app/browser/assets/index-BsLnrzvD.css` found the `body` rule under `elements`, using the named Veneer tokens, and no shell body rule. |
| **2 — Mount** | **UNDECIDABLE** | The load order is confirmed at `tests/setupBrowser.ts:31`, matching `app/browser/main.ts:1`. The journey at `tests/app/browser/integration.test.ts:78` reads computed body background, compares dark against light, and checks restoration. It does not assert foreground color or token ownership. `tmp/capture/light-1280.txt:12` corroborates the claimed background readings. The foreground readings and assertion passes remain writer-reported at `scaffold/.orkestrel/veneer/units/u1-conform-report-2.md:256`; the complete claim needs the current verifier result and independently retained foreground measurements. |
| **3 — Guide** | **UNDECIDABLE** | The sentence at `guides/veneer.md:377` agrees with the repaired loading and shell rules. The application proof link is present at line 397; `tests/guides.test.ts:59` has the requested title. No violation was identified in the changed guide prose. The claimed `test:guides` success is writer-reported at `scaffold/.orkestrel/veneer/units/u1-conform-report-2.md:401`; the retained independent report covers the earlier tree. |
| **4 — Extractor** | **CONFIRMED** | `tests/setupConformance.ts:106` implements the stated argument contract; lines 136 and 146 use it from the import and require branches. Executing the live declarations with installed Vite 8.3.0 returned `['bootstrap']` for the bare template require, nothing for the substituted template and identifier, and `['./literal.js']` for the literal import. The export inventory and parser-built direct case are at `tests/setupConformance.test.ts:42` and line 108. Report 2 records the requested red and green results at lines 345 and 354. Finding 9 concerns syntax outside those named cases. |
| **5 — Readers** | **UNDECIDABLE** | The signatures, forwarding, return shapes, and retained error text are confirmed at `tests/setupBrowser.ts:284` and line 377. The named production callers remain unchanged. `tests/setupBrowser.test.ts:208` mounts its own showcase before loading the probe; line 229 supplies the refusal case’s own competing cascade. The original mount cases remain at lines 69 and 84. Report 3 records the default mutation at line 252, but current browser passes and that mutation’s execution have only writer evidence. The current verifier result would settle the gate portion. |
| **6 — Listed prohibitions and prose** | **CONFIRMED** | The TypeScript AST inspection found none of the listed prohibited syntax in the owned TypeScript files. The suppression search found no listed directives. The added callbacks satisfy the direct-callback exception. `tests/setupConformance.test.ts:113` uses `Array<string \| undefined>`. The changed comments and doc blocks introduce no identified writing violation. `tests/setupBrowser.ts:367` names `sheets`, while line 381 retains the document-based error text exactly as directed. Import ordering is a separate constraint, reported as finding 10. |
| **7 — Scope honesty** | **CONFIRMED** | The status comparison added only `M tests/setupBrowser.test.ts` and removed nothing. The live status matched the supplied status. Comparing patch sections and blob pairs found changes only in `_shell.scss`, the app stylesheet barrel, `guides/veneer.md`, `tests/guides.test.ts`, and the setupBrowser/setupConformance modules and their tests. Live normalized blob hashes matched the supplied patch. Comparing against the earlier status correctly reported inequality as a control. |
| **8 — Gates** | **UNDECIDABLE** | The retained `scaffold/.orkestrel/veneer/units/u1-conform-gate-report.md:31` contains the earlier status, without the setupBrowser test modification. It also carries no Edge `test:setup:browser` result. `u1-conform-gate-brief-2.md` requests the current verification but records no results. The Orchestrator must rule from that verification’s returned report. |

The additional findings follow.

**9 — CONFIRMED finding: parentheses bypass the module scanner.**

At [tests/setupConformance.ts:122](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:122), the parser uses its default options. The installed declaration at `node_modules/rolldown/dist/shared/binding-BTa6BPQe.d.mts:376` documents `preserveParens` with `@default true`. Consequently, the argument helper encounters `ParenthesizedExpression`, and the require branch can encounter that node around its callee.

Executing the live declarations produced these results:

| Input | Extracted specifiers | Distribution predicate |
|---|---|---|
| ``require(`bootstrap`)`` | `["bootstrap"]` | Rejects |
| ``require((`bootstrap`))`` | `[]` | Accepts |
| `require(("bootstrap"))` | `[]` | Accepts |
| ``import((`bootstrap`))`` | `[]` | Accepts |
| ``(require)(`bootstrap`)`` | `[]` | Accepts |

The predicate at [tests/distribution.test.ts:993](C:/Users/mikes/WebstormProjects/veneer/tests/distribution.test.ts:993) performs no rejection when extraction is empty. The source scanner likewise returns `undefined`.

This establishes an instrument gap, not a forbidden dependency in the present artifact. It requires no evaluation of variables or substitutions. An in-memory change to the parser option, `{ preserveParens: false }`, extracted `bootstrap` from these parenthesized forms while preserving the empty readings for identifiers and substituted templates. Use that installed capability and add regression cases. This observation is not a typecheck or gate receipt.

**10 — CONFIRMED finding: the added type import violates import ordering.**

[tests/setupConformance.ts:16](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:16) adds `import type { ESTree } from 'vite'` after value imports. [Scaffold’s TypeScript rule](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/typescript.md:17) states: “Place `import type` declarations before value imports.” Move that declaration before the value imports.

Additional attacks held: escaped template text decoded to `bootstrap`; comments and ordinary strings produced no module edges; missing and numeric arguments produced no specifier; malformed syntax threw the parser diagnostic. These readings cover literal extraction and its refusal boundary, not arbitrary expression evaluation.

Verdict: fix round with findings 9 and 10; claims 2, 3, 5, and 8 remain UNDECIDABLE pending current verification evidence.