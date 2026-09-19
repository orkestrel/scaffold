# Unit S2 audit — objective lane report (reviewer, Opus 5, native; lanes swapped because the bench engine wrote the unit)

Retained unedited from the returned message by the Orchestrator (the subagent's transcript file
reported zero bytes), with the harness's HTML escaping of `<` and `>` reversed and nothing else
changed. Duration 734 s.

---

# Unit S2 audit — objective lane verdict

Lane held: **objective** (correctness, constraints, installed declarations, dependency truth, test sufficiency, mechanical conformance). Lanes were swapped for this round; the subjective lane is not mine and where a question is design fit I say so.

Evidence base: `tmp/audit/s2-diff.patch`, the tree at `C:/Users/mikes/WebstormProjects/scaffold`, the installed declarations read per file under `node_modules/@orkestrel/*/dist/src/*/index.d.ts`, and `tmp/verify/s2-summary.txt`. I hold no shell; every vector below is settled by reading the code and the installed files, and each one that would benefit from a run carries its exact command.

## Numbered verdicts

**1. Coverage of the fence population — CONFIRMED.**
Attacks that failed: the fence population comes from `createGuide(content).fences()`, and the installed `@orkestrel/guide` declares `extractFences` as a full AST walk that "includes fences nested inside blockquotes and lists" (`node_modules/@orkestrel/guide/dist/src/core/index.d.ts:794-809`), so a list-indented and a blockquoted fence both arrive; no language filter is applied anywhere in `inspectSkillImports` (`tests/setupPolicy.ts:1145-1180`), so an untagged fence and a `typescript` fence are read like a `ts` one; the binding filter keeps `ImportSpecifier` irrespective of `importKind`, so `import { a, type B }` and `import type { B }` both bind; `binding.imported` is the exported name, so `a as b` is checked against `a`; comments between braces are gone before the AST, so a comment-preceded binding binds. The population is `SKILL.md` plus every named reference that resolves (`tests/setupPolicy.ts:1232`, `1276-1280`). The violation carries the skill path, the specifier, and the binding name (`tests/setupPolicy.ts:1170-1176`).

**2. Soundness of the declaration reading — CONFIRMED.** This also answers the brief's first unknown.
I read every installed base-set entry individually — `@orkestrel/test/dist/src/{core,browser,server}/index.d.ts`, `@orkestrel/guide/dist/src/{core,server}/index.d.ts`, `@orkestrel/probe/dist/src/{core,server}/index.d.ts` — for `^export {`, `^export *`, `^export default`, `^export = `, `^export as namespace`, `^declare `, `^import `, `^export declare namespace`, `^export type {`. (A directory-scoped ripgrep under `node_modules` returns "0 files" here because the ignore rules suppress it; every result below is from an explicit file path.)

Forms actually present, and how the reader takes each:

- Flat `export declare function|const|class|enum|interface|type` — read.
- A trailing bare `export { }` in every roll-up (`test/core:742`, `test/browser:1940`, `test/server:720`, `guide/core:2795`, `guide/server:686`, `probe/core:1355`, `probe/server:1556`) — an `ExportNamedDeclaration` with a null source, no specifiers, and a null declaration, so `tests/setupPolicy.ts:1071` continues past it. Harmless.
- Top-level `import`/`import type` from `@orkestrel/contract`, `@orkestrel/markdown`, `@orkestrel/emitter`, `@orkestrel/lsp` (`guide/core:1-14`, `probe/core:1-9`) — an `ImportDeclaration` matches neither branch and is skipped. Harmless.
- Non-exported ambient locals, `declare const EXPORT_KEYWORDS`, `declare type ExportKeyword`, `declare interface GuideFence` and siblings (`guide/server:11-672`) — bare `VariableDeclaration`, `TSTypeAliasDeclaration`, `TSInterfaceDeclaration` statements outside any export, skipped, so they are correctly absent from the inventory.
- Overloaded declarations — `clickAccessible` is declared twice (`test/browser:213`, `228`); the reader adds the name to a `Set`, so the overload does not refuse and does not duplicate. The claim's named attack fails.

No refused form appears in any installed base-set entry. The claim's other named attacks also fail: `export declare namespace` is refused by the catch-all at `tests/setupPolicy.ts:1092`; the `declare const X; export { X }` split is read (`tests/setupPolicy.ts:1061-1069`, fixture `tests/setupPolicy.test.ts:161-165`); `.d.mts` and `.d.cts` siblings resolve (`tests/setupPolicy.ts:1047-1052`, fixtures at `tests/setupPolicy.test.ts:168-170`); `export type { A } from` is read with the target-membership check (`tests/setupPolicy.ts:1066`).

**3. No runtime import — CONFIRMED.**
`createRequire|require\(|await import|import\(` over `tests/setupPolicy.ts` returns nothing. The whole reading path is `existsSync`, `readFileSync`, `JSON.parse`, and `parseSync` from `vite` (`tests/setupPolicy.ts:21`), which the baseline already imported. The fixture at `tests/setupPolicy.test.ts:132-135` plants a throwing `entry.js` beside the declaration and the read still succeeds, which is a control drawn from outside the read population.

**4. The out-of-base ruling — BROKEN.**
Input: any `.agents/skills/<name>/SKILL.md` fence in **this checkout** reading

```ts
import { HOST_PATHS } from '@orkestrel/scaffold'
```

`readSkillExports` resolves only under `node_modules` (`tests/setupPolicy.ts:975-977`). `node_modules/@orkestrel/scaffold` does not exist here — a glob over `node_modules/@orkestrel/scaffold/**` returns nothing, and the package list under `node_modules/@orkestrel/` holds `contract`, `guide`, `probe`, `test` and others but not `scaffold`. So `existsSync(manifestPath)` is false, the reader returns `undefined`, and `inspectSkillImports` reports `skill fence import @orkestrel/scaffold has no installed declaration entry` (`tests/setupPolicy.ts:1160-1168`).

That report is false, and the prerequisite it names cannot be met. The declaration entry **is** present and named: the workspace's own `package.json:2,35-45` declares `"name": "@orkestrel/scaffold"` with `exports['.'].import.types = "./dist/src/core/index.d.ts"`, and `dist/src/core/index.d.ts` exists in this tree. The repository already states this resolution model in the vendored-import proof it ships: `tests/src/server/helpers.test.ts:428-431` — "A declared Orkestrel package resolves in its own checkout too, through the `exports` map its manifest publishes, so the set this reads against is the declaration rather than the scope." The new reader breaks that model for the one package every checkout names itself.

Blast radius: `@orkestrel/scaffold` is in `BASE_DEV_DEPENDENCIES` (`src/core/constants.ts:535`), so the refusal is by base membership, not by installation; and every fleet package hits the same wall for its own name, because no package installs itself. This is the checkout S3 will add fences to, and it is green today only because no skill carries such a fence yet.

Smallest correct fix: in `readSkillExports`, before the `node_modules` lookup, read `<root>/package.json`; when its `name` equals the package segment of the specifier, resolve the exports map against `<root>` instead of `<root>/node_modules/<package>`. Everything after that is unchanged.

Second defect inside the same claim: the message conflates causes. `readSkillExports` returns `undefined` for a rejected specifier shape, an absent package directory, an unreadable manifest, an absent or unsupported exports key, a missing declaration target, a parse error, and a refused declaration form — and `tests/setupPolicy.ts:1160-1168` reports all of them as `has no installed declaration entry`. For the refused-form and parse-error causes the sentence is untrue, and a fleet operator reading it will reinstall a package that is already there. Give the refusal causes their own message, and correct `guides/scaffold.md:1093-1103`, whose refusal list names default exports, export assignments, ambient modules, namespace exports, non-relative re-exports, and unsupported exports-map forms but omits the unresolvable relative target, the re-exported name the target does not export, and the syntax error that `SKILL_DECLARATION_REFUSALS` itself carries.

The claim's own named attacks do hold: an `@orkestrel/test` installed without the `./browser` key reports the violation rather than skipping, and a wildcard exports key is refused rather than guessed — no base-set package uses a wildcard today (`@orkestrel/test`, `@orkestrel/guide`, `@orkestrel/probe`, and this workspace all declare exact keys), so that path is a documented limit rather than a reachable defect, and it becomes reachable the day a base package adopts one.

**5. The controls bind — BROKEN.**
The planted-name half holds: `s2MissingValue`, `S2MissingType`, `s2MissingReference`, `s2MissingList`, and `S2MissingLater` appear nowhere in `@orkestrel/test/dist/src/core/index.d.ts` or `@orkestrel/test/dist/src/browser/index.d.ts`, while `waitForCondition` (core:700), `WaitOptions` (core:733), `clickAccessible` (browser:213) and `CaptureVariant` (browser:173) are all really exported. The out-of-base control is well drawn: `@orkestrel/contract` is genuinely installed and genuinely outside `BASE_DEV_DEPENDENCIES` (`src/core/constants.ts:532-543`), so it discriminates base membership from installation rather than from presence.

What fails is the claim's second clause — "each recorded red is a red the mechanism alone turns green (no test passes for a reason unrelated to the sweep)". The control labelled *accepts exported value and type bindings from root and browser entries* (`tests/setupPolicy.ts:2386-2400`) declares `violations: []`, and `tests/policy.test.ts:527-533` asserts `toEqual(control.violations)`. Delete `inspectSkillImports` and its two call sites and that test still passes: an empty expectation cannot distinguish a sweep that found nothing from a sweep that did not run. Its recorded red in `tmp/codex/s2-report-3.md` came from mutating the reader to omit `waitForCondition`, which is the writer's own report and, per the round's evidence rule, cannot raise the control above unproven. `.claude/rules/quality.md` § Instruments requires a control drawn from outside the population the instrument covers; this one is drawn from inside it.

Fix: keep the acceptance case as a false-positive guard, and add beside it a control whose green depends on the sweep running — assert that the same fixture reports the expected violation when one binding in the same fence is planted absent, so the acceptance row and the refusal row differ by exactly one identifier.

**6. The blind spot is stated truthfully — CONFIRMED.**
Attacked by reading each sentence against the code. `guides/scaffold.md:1099-1101` claims the sweep does not read prose, table cells, indented code, default imports, namespace imports, or other scopes; the code matches each: an indented block is not a fence and never reaches `fences()`, `bindings.length === 0` skips a default-only or namespace-only import (`tests/setupPolicy.ts:1152`), and `specifier.startsWith('@orkestrel/')` excludes other scopes at the same line. The fixture at `tests/setupPolicy.test.ts:280-284` drives prose, a table cell, a commented line, and a quoted string through and expects nothing. No sentence claims more than the code does. The refusal-enumeration omission is recorded under claim 4, where the violation message that carries it lives.

**7. The vendored import law holds — CONFIRMED.**
`tests/setupPolicy.ts:1-22` imports `@orkestrel/guide`, `@orkestrel/scaffold`, `node:fs`, `node:os`, `node:path`, `node:url`, `vite`, and `../configs/policy.js`. Every package named is in `BASE_DEV_DEPENDENCIES`; `typescript` is absent, so the `.oxlintrc.json:437-451` fence is satisfied. The diff adds only `BASE_DEV_DEPENDENCIES` to an import statement that already existed, so the population `tests/src/server/helpers.test.ts:432-439` reads is unchanged. `lintcheck_EXIT=0` in `tmp/verify/s2-summary.txt` is the mechanical confirmation.

**8. ROADMAP 30 loses nothing — CONFIRMED.**
The claim's own attack — a factory registered only in this checkout's root configuration — fails, because the surviving case reads the same object the deleted one did. `tests/config.test.ts:55` binds `configuration` as the default export of `../vite.config.js`, which is exactly what the deleted case imported as `rootConfiguration`. `tests/config.test.ts:395-416` filters the same `test.projects` array to callable rows, throws when the population is empty, applies the identical sentinel (`command`, `isPreview`, `isSsrBuild`, `mode`, `sentinel`), and asserts the same property-descriptor absence over every field. Its control is stronger than the deleted one: `tests/config.test.ts:418-429` appends a planted factory that returns the sentinel fields and requires the whole loop to throw, where the deleted case only demonstrated that a bare `mergeConfig` lands the fields. I found no input the deleted case rejected that the survivor accepts.

**9. The prose is a directive — CONFIRMED.**
`.claude/rules/documentation.md:94-95` states the trigger and the required action in the imperative, states no count, uses no banned term, records no history, and adds a law (`put every taught symbol in a named import fence`; `import only base-set packages in those fences`) that no other file carries. The guide passage is guide prose, where negative contractions are permitted, and it describes the mechanism rather than restating the law. One drift risk to record rather than to fix now: the blind-spot sentence exists in the rule, in `guides/scaffold.md`, and in the `readSkillExports` and `inspectSkillImports` doc blocks; the guide and the doc block are both obliged by parity, so the rule file's copy is the one that can go stale unseen. The voice and taste half of this claim is the subjective lane's.

**10. Every refusal is reachable and every read form is pinned — BROKEN.**
Every member of `SKILL_DECLARATION_REFUSALS` (`tests/setupPolicy.ts:1010-1020`) is driven by the fixture loop at `tests/setupPolicy.test.ts:204-215`, and that loop writes `values.d.ts` beside the refusal, so the namespace and unexported-name members refuse for the reason they name rather than for a missing file. That part holds.

What the claim gets wrong is that the constant is the refusal inventory. Refusal branches exist that no fixture reaches and that the constant does not name:

- `tests/setupPolicy.ts:1066` refuses an `export { X as default }` specifier. Not in the constant, no fixture.
- `tests/setupPolicy.ts:1092` (the trailing `else return undefined`) refuses an exported declaration of an unlisted kind, which is where `export declare namespace X { }` lands. The constant's ambient-module member takes the different `TSModuleDeclaration` path, so this branch is unexercised.
- `tests/setupPolicy.ts:1074` refuses a non-`Identifier` variable id. Not in the constant, no fixture, and plausibly unreachable in valid declaration syntax.

The read-form side has one gap too: the union at `tests/setupPolicy.ts:1077-1085` lists `FunctionDeclaration` beside `TSDeclareFunction`, and the forms fixture exercises only the latter.

The TSDoc on the constant says it "Supplies declaration forms the skill reader refuses instead of accepting a partial inventory", which reads as complete and is not. Fix: add `'export declare const value: string\nexport { value as default }'` and `'export declare namespace Vocabulary { }'` to `SKILL_DECLARATION_REFUSALS`, so the loop pins both branches; then either drop `FunctionDeclaration` from the read union or give it a fixture, and say on the constant that it enumerates the refusals a declaration file can actually carry.

**11. Coherence — CONFIRMED on the objective half; the design-fit half is referred.**
Objective sub-claims I checked and could not break: no `any`, no `as`, no non-null assertion, and no suppression directive appear in the added code, and `lintcheck_EXIT=0` / `check_EXIT=0` in `tmp/verify/s2-summary.txt` confirm it mechanically over the tree. The only in-body function expression is the anonymous `replace` callback at `tests/setupPolicy.ts:1049`, which `.claude/rules/architecture.md` permits as a callback passed directly as an argument. `inspectSkill` has exactly one call site (`tests/setupPolicy.ts:1376`) and `inspectSkillFamily` two (`tests/policy.test.ts:516` and `tests/setupPolicy.ts` inside `inspectPolicyControl`); the trailing `installation = root` default keeps both working and keeps the vendored export backward compatible for a target that calls it with one argument. The readers sit in `tests/setupPolicy.ts` as shared infrastructure with no `describe`/`it`, and the new `PolicyControl.violations` member is readonly. Whether `installation` is the right name, whether a second root belongs on this API at all, and the "would you ship this" question are the subjective lane's.

## Findings fitting no claim

**F1. A vendored test fixture's non-ASCII code point was replaced with `?`, deleting the case the test exists for while it stays green.**
`tests/setupPolicy.test.ts:615-616` now reads:

```ts
expect(normalizePolicyPath('src\\parent\\..\\literal%20#?.ts')).toBe(
	'src/parent/../literal%20#?.ts',
)
```

The diff (`tmp/audit/s2-diff.patch:294-297`) shows the baseline carried `literal%20#雪.ts` in both operands, and the unit replaced U+96EA with `?`. The test is named "changes separators without resolving segments or decoding percent text"; the non-ASCII segment was the part of the sample proving that `normalizePolicyPath` (`tests/setupPolicy.ts:389-391`) passes non-ASCII text through without an encoding fold or a percent decode. With an ASCII substitute the assertion still passes and still carries its name, so the loss is invisible — which is precisely the failure `.claude/rules/workspace.md` § Text integrity names: "Where the exact code points are the subject … that fold deletes the case the test exists for while leaving it green and named."

Two aggravations. The file is vendored, so the mangled byte reaches every target on the next `repair`. And `?` is a character Windows refuses in a filename, which the sweep's own portability rule refuses over real paths, so the fixture now teaches the opposite of the sibling rule. The change is also outside the unit's stated scope — the brief covered the skill sweep and the duplicated `compilers.test.ts` case — and `tmp/codex/s2-report-3.md` does not mention it, which is consistent with an unnoticed cp1252 round-trip on the Windows bench rather than a decision.

Fix: restore the original code point by moving the line rather than retyping it, and confirm the bytes with a code-point dump rather than by eye. Do not substitute a different non-ASCII character; the assertion's value is that the sample survives the normalizer unchanged.

## Attacked and held

- **`readSkillExports` exports-map resolution.** `resolveSkillDeclaration` (`tests/setupPolicy.ts:1000-1007`) tests conditions by key ownership rather than by position, so a map declaring `require` before `import` resolves identically; a sugar map with no `.` keys resolves only for the root specifier; `./package.json` and any dotted subpath are rejected by the specifier regex before resolution. A CJS-only package would be refused, and no base-set package is CJS-only.
- **Cycles and fail-closed recursion.** A star-export cycle contributes no names and does not loop (`tests/setupPolicy.ts:1036`, fixture at `tests/setupPolicy.test.ts:175`), and a re-export whose target refuses causes the whole entry to refuse rather than to return a partial inventory (`tests/setupPolicy.ts:1054`). Both are the correct direction for a gate.
- **The adjacent behaviour that looks like a defect and is correct:** `export { }` at the end of every installed roll-up, and the bare `declare interface`/`declare const` locals in `@orkestrel/guide/dist/src/server/index.d.ts`, both look like forms the refusal list would reject. Neither is reached, and neither pollutes the inventory.
- **The split loop in `tests/policy.test.ts:527-545` does not weaken the older controls.** Controls without a `violations` member keep the previous `toHaveLength(1)` plus rule, line, and message assertions; the new ones are asserted by exact list equality, which is stricter.
- **Reuse of `@orkestrel/guide`'s `extractFenceImports` — residual, not a finding.** The installed guide declares `extractFenceImports` (`node_modules/@orkestrel/guide/dist/src/core/index.d.ts:777-792`) covering brace bindings per specifier, `import type`, multiline braces, and aliases resolved to the exported name, which is close to what `inspectSkillImports` needs. The unit did not reuse it; `tmp/codex/s2-report-3.md` gives the reason as a comment-inside-braces gap, measured by a probe that has since been swept. The local reading is a real parser rather than a rename-wrapper, so it is not a superfluous wrapper, and the fixture at `tests/setupPolicy.test.ts:251-261` is the case it claims. I could not raise the reuse ruling above the writer's own report. What would settle it: `node -e` over the installed export with the fixture `'```ts\nimport {\n  /* exported name */ waitForCondition as local,\n  type WaitOptions,\n} from "@orkestrel/test"\n```'`, reading whether `extractFenceImports` returns `waitForCondition` for it. The fleet now carries two fence-import readers with different coverage; which one owns the job is a design-fit question for the subjective lane.
- **A syntactically invalid fence — vector I could not settle.** `inspectSkillImports` (`tests/setupPolicy.ts:1145-1147`) ignores `source.errors`, unlike `readSkillDeclarations`, which refuses on them (`tests/setupPolicy.ts:1039`). A fence whose earlier lines do not parse may drop a later real import through Oxc's error recovery, which would be a silent false negative in a vendored gate. No numbered claim covers it and the writer names it as a least-certain claim. What would settle it: run `inspectSkillImports(process.cwd(), 'SKILL.md', '```ts\nconst broken = {\nimport { s2MissingValue } from "@orkestrel/test"\n```\n')` and read whether the violation appears.

VERDICT: FAIL 4, 5, 10; outside the claims: F1
