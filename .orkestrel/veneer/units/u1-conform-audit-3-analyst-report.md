<!-- codex exec, gpt-6-astra, read-only; journal u1-conform-audit-3-analyst.jsonl (ephemeral, swept at acceptance); thread 01a0c063-d7dc-7d51-a238-c8383269933f; exit 0; retained 2026-09-20 -->

The numbered rulings follow. Paths refer to Veneer unless prefixed with `scaffold/`. No files were written.

1. **CONFIRMED — Type import first.** `tests/setupConformance.ts:7` places the type import before every value import. I executed the manifest’s formatter and linter commands directly through their installed Node entries; each exited 0.

2. **CONFIRMED — Parentheses reach the visitor.** `tests/setupConformance.ts:124` passes `{ preserveParens: false }`. The installed declaration, `node_modules/rolldown/dist/shared/binding-BTa6BPQe.d.mts:376`, documents the option and its default of `true`. The assertions appear at `tests/setupConformance.test.ts:141`. Executed readings match the claim, as recorded in the table that follows. `scaffold/.orkestrel/veneer/units/u1-conform-report-4.md:40` records the requested red result and assertion message; line 53 records the green result. Those historical suite readings remain writer-reported.

3. **CONFIRMED — Thrown text names the sheets.** `tests/setupBrowser.ts:367` documents the exact message thrown at line 381. Executing the live declarations with the installed `requireValue` implementation made `collectLayer('elements', [])` throw exactly `The named sheets carry no Veneer cascade`. The assertion at `tests/setupBrowser.test.ts:234` expects that text. Searching `tests/` found the old text only in the unchanged `requireValue` messages at `tests/src/styles/index.test.ts:8` and line 29, `tests/src/styles/tokens.test.ts:31` and line 51, and `tests/setupBrowser.test.ts:212`.

4. **CONFIRMED — One spelling.** `app/browser/Showcase.ts:45` reads `behavior`. Comparing the untracked-file hunks proves that replacing `behaviour` with `behavior` reproduces the round-3 hunk exactly.

5. **REFUTED — Writing rule over the added sentence.** The sentence at [tests/setupConformance.ts:120](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:120) says “Parses with `preserveParens` disabled”. [Scaffold’s writing rule:48](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md:48) requires a noun after the code token. Write “Parses with the `preserveParens` option disabled”. This finding concerns the added sentence, not the earlier package-wide prose findings. The syntax portion held: AST inspection and the suppression search found none of the listed prohibited constructs across the owned files. A synthetic control triggered the corresponding diagnostics.

6. **REFUTED as written — Blob-pair description; scope itself holds.** The untracked renderings **do** contain `index` lines. The Showcase pair changes from `index 0000000..fe433f6` at `scaffold/.orkestrel/veneer/units/u1-conform-diff-2.patch.txt:2196` to `index 0000000..dc9e5f0` at `scaffold/tmp/audit/u1-conform-diff-3.patch:2202`. Therefore the changed blob pairs aren’t limited to the named setup files. Qualify that statement as **tracked-file blob pairs** and correct the preamble’s assertion that untracked files lack them. The underlying scope claim holds: status is unchanged, the named tracked files are the only changed tracked sections, and Showcase is the only changed untracked hunk. Live normalized blob hashes matched the supplied patch. Removing a status row in memory made the comparison fail.

7. **UNDECIDABLE — Authoritative gates pending.** `scaffold/.orkestrel/veneer/units/u1-conform-gate-brief-3.md` exists, but `u1-conform-gate-report-3.md` was absent at the final check. The retained report for round 2 proves the earlier tree. Report 4 supplies writer evidence only. The Orchestrator’s current verifier report must settle this claim.

The following readings executed the unchanged live extractor declarations in memory with installed Vite **8.3.0**, Rolldown **1.2.9**, and Node **v24.20.0**. They prove runtime extraction for these inputs; they aren’t a project typecheck or gate receipt.

| Input | Required result | Actual result |
|---|---|---|
| ``require((`bootstrap`))`` | `['bootstrap']` | `['bootstrap']` |
| `require(("bootstrap"))` | `['bootstrap']` | `['bootstrap']` |
| ``import((`bootstrap`))`` | `['bootstrap']` | `['bootstrap']` |
| ``(require)(`bootstrap`)`` | `['bootstrap']` | `['bootstrap']` |
| ``require(`${name}`)`` | `[]` | `[]` |
| `require(name)` | `[]` | `[]` |
| `// import "vue"` followed by `const text = "import('bootstrap')"` | `[]` | `[]` |
| `import {` | Throws | Throws: ``Expected `}` but found `EOF` `` |
| ``(((require)))((((`bootstrap`))))`` | `['bootstrap']` | `['bootstrap']` |
| `import(((("bootstrap"))))` | `['bootstrap']` | `['bootstrap']` |
| `consume(require(("bootstrap")))` | `['bootstrap']` | `['bootstrap']` |
| `require(import(("bootstrap")))` | `['bootstrap']` | `['bootstrap']` |
| `import(require(("bootstrap")))` | `['bootstrap']` | `['bootstrap']` |
| ``require(`prefix${require("bootstrap")}`)`` | `['bootstrap']` | `['bootstrap']` |
| ``import(`prefix${require("bootstrap")}`)`` | `['bootstrap']` | `['bootstrap']` |
| `import("outer", {with: {type: require("bootstrap")}})` | `['outer', 'bootstrap']` | `['outer', 'bootstrap']` |
| `require("outer", require("bootstrap"))` | `['outer', 'bootstrap']` | `['outer', 'bootstrap']` |
| ``function load(value = require(("bootstrap"))) { return import((`vue`)) }`` | `['bootstrap', 'vue']` | `['bootstrap', 'vue']` |
| `if (false) { require(("bootstrap")) }` | `['bootstrap']` | `['bootstrap']` |
| ``require?.((`bootstrap`))`` | `['bootstrap']` | `['bootstrap']` |
| ``require(/* edge */((`boot\u0073trap`)))`` | `['bootstrap']` | `['bootstrap']` |
| `require()` | `[]` | `[]` |
| `require(17)` | `[]` | `[]` |
| `require((name))` | `[]` | `[]` |
| ``require((`prefix${name}`))`` | `[]` | `[]` |
| `require(("boot" + "strap"))` | `[]` | `[]` |
| `object.require(("bootstrap"))` | `[]` | `[]` |
| ``const text = `require(("bootstrap"))` `` | `[]` | `[]` |
| `/* require(("bootstrap")) */` | `[]` | `[]` |
| ``require(`\unicode`)`` | Throws | Throws: `Bad escape sequence in untagged template literal` |
| ``tag`\unicode` `` | `[]` | `[]` |
| `require(...["bootstrap"])` | `[]` | `[]` |
| Empty source | `[]` | `[]` |

The negative control changed only the parser option to `preserveParens: true` in memory. For ``require((`bootstrap`))``, the required `['bootstrap']` became `[]`, reproducing the repaired defect.

Nested literal calls remain discoverable inside substituted templates. The surrounding template itself produces no specifier. Identifiers, concatenations, and spread arguments correctly remain outside literal extraction.

No additional findings outside the numbered claims were substantiated.

Verdict: fix round with claims 5 and 6; claim 7 remains UNDECIDABLE pending the retained verifier report.