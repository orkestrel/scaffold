Lane held: objective

# Audit verdict — R2 / U2 `d7-guide-converge` (objective lane)

Evidence read: the diff at `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-guide-converge.diff.txt`, the status at `d7-guide-converge.status.txt`, the report at `d7-guide-converge-report.md`, the brief, the audit brief including its Amendments, and the tree at `/home/user/fleet/guide`. No command run, nothing edited. I am the recorded substitution for the dark Sol bench.

## Per-claim verdicts

**1. Header sets — PASS.**
Every `## Surface` and `## Methods` table heads `Summary`, and no column outside `Kind`, `Shape`, `Signature`, `Value`, `Returns` survives. Tree evidence, `guides/guide.md`: Types `:30` `Name | Kind | Shape | Summary`; Constants `:58` `Name | Kind | Value | Summary`; Helpers `:77`, Parsers `:152`, Factories `:190` `Name | Kind | Signature | Summary`; Shapers `:162` `Name | Kind | Shape | Summary`; Validators `:176` `Name | Kind | Summary`; Classes `:209` `Name | Kind | Summary`; Methods `:261`, `:274`, `:306` `Method | Returns | Summary`. The diff's `+` header rows (diff `:98`, `:137`, `:224`, `:302`, `:320`, `:343`, `:368`, `:387`, `:409`, `:430`, `:449`) match. `Behavior`, `Builds`, and `Narrows to / Tests` survive nowhere as a header; the four residual `Builds` hits at `guides/guide.md:96,127,138,139` are the `buildComment` / `buildTable` / `buildFence` / `buildCell` summary verbs, not columns.

**2. `### Classes` rows before the H3s — PASS.**
`guides/guide.md:202` `### Classes`, table header `:209`, rows `:211`–`:213` for `Guide`, `Source`, `SourceManager`, each `Kind` `class` (diff `:389`–`:391`). It sits after `### Factories` (`:186`) and before `### \`Guide\`` (`:215`), and the H3 narratives stay: `:215`, `:224`, `:240`. The placement is load-bearing and it holds: `extractSurface` at `src/core/helpers.ts:1467-1497` walks `## Surface` in document order and skips a key already `seen` (`:1477`, `:1490`), so the row's symbol — carrying the `Summary` cell — wins over the summary-less H3 symbol. Reordering the table after the H3s would redden the equality case rather than fail silently.

**3. Cells equal their description paragraphs; no fact dropped — PASS.**
Sampled against the tree, not against the report. `EXPORT_KEYWORDS`: cell (diff `:139`) equals `src/core/constants.ts:2-4`. `GuideFence`: cell (diff `:111`) equals `src/core/types.ts:756-759` as written by the diff. `extractCellText`: cell (diff `:273`) equals `src/core/helpers.ts:971-974` through `normalizeSummary`'s code-span clause. `SourceInterface.exports` / `hidden` / `examples`: cells (diff `:432`, `:436`, `:437`) equal `src/core/types.ts:264-274`, `:353-359`, `:370-375`.

On the "no fact dropped" half I tested every case the report flags and every literal move it tabulates:

- `SourceLine`'s dropped "or `undefined`" survives at `src/core/types.ts:92`.
- `escapeRegExp`'s two call sites — which report flag 8 records as dropped — are **not** dropped; they survive in the block's `@remarks` at `src/core/helpers.ts:1192-1197`.
- `SourceInterface.exists`'s orientation clause survives at `guides/guide.md:539-540` and its precision ("that exact key or any key beneath it") at `src/core/types.ts:349`.
- `SourceInterface`'s six-projection gloss is carried by the `Shape` column plus the `## Methods` table at `:274`.
- `manifestEntryShape`'s authored `Shape` cell (diff `:327`) is accurate against `src/core/shapers.ts:123-128` read through `GuideModule` at `src/core/types.ts:79`.
- Every Types `Shape` and Constants `Value` literal in the report's tables matches the diff's minus lines verbatim.

Two observations, neither a required change: the `EXTERNAL_SCHEMES` row dropped its declared `readonly string[]` type, which remains readable from the declaration and the emitted `.d.ts`; and the `GuideInterface` / `SourceInterface` / `SourceManagerInterface` rows dropped their `See [## Methods](#methods)` links, replaced by an unlinked `(see …)`.

**4. `SourceInterface.examples` cell — PASS.**
The cell (diff `:437`) is character-for-character the no-argument overload's description paragraph at `src/core/types.ts:370-375`. The second overload's "follows no `extends` clause" fact is correctly outside the comparison and survives in § The extraction model.

**5. Titled pairs, unpaired set, and the restore (as amended) — PASS.**
Pairs verified body-for-body and language-for-language against the tree, all `ts`:

| Block | Guide fence |
| --- | --- |
| `createGuide`, `src/core/factories.ts` (diff `:504-511`) | `guides/guide.md:661-669` |
| `createSource`, `src/core/factories.ts` (diff `:519-538`) | `guides/guide.md:682-700` |
| `createSourceManager`, `src/core/factories.ts` (diff `:546-565`) | `guides/guide.md:702-719` |
| `GuideInterface.tagline`, `src/core/types.ts` (diff `:775-782`) | `guides/guide.md:780-787` |
| `extractSourceLines`, `src/core/helpers.ts` (diff `:577-585`) | `guides/guide.md:789-797` |

Unpaired set matches the amendment: "The bijection assertion shape" (`:721`), "Compare a guide against the source it documents" (`:742`), "Carry a summary across into the guide" (`:762`), "Resolve directory and file targets" (`:799`), "List the fence languages a package allows" (`:671`, four-backtick body carrying ` ``` `). No class block is titled — `Guide.ts` and `sources/SourceManager.ts` carry no diff hunk at all.

The restore is byte-identical. `findDrift`'s block sits at `src/core/helpers.ts:2298-2322` and the diff carries no hunk covering it; the helpers hunks are `-73`, `-677`, `-786`, `-924`, `-1206`, `-1963`, `-1987`, `-2578`, `-2641`, `-2688`, `-2756`, `-2828`, and none reaches it. Its `@example` at `:2318-2321` is untitled, as required.

**The hypothesis is overstated and I strike it.** The report claims "no rewrite keeps both its meaning and its enclosability" (`d7-guide-converge-report.md:44-45`). That is false as stated. The `*/` at `guides/guide.md:753` sits inside a single-quoted TypeScript string, so writing the closer as `*\x2f` — or as a two-part concatenation — hands `createSource` the identical file text, returns the identical `findDrift` result, and carries no literal `*/`, making the body enclosable. The unit's **decision** nonetheless stands: rewriting a guide example to dodge a missing guard is a workaround for the defect rather than a fix, the fence's subject is a doc comment and an escape sequence hides exactly what it exists to show, and the brief's deviation contract names "a titled body the block cannot enclose" as a stop. Correct action, wrong reason. Restate the reason as: the body carries a literal `*/`, `replaceExample` has no guard for it, and the fence stays unpaired until that guard lands.

**6. Blockquote, pitch, opening paragraph, `## API` — PASS.**
`guides/guide.md:3-4` and `README.md:3-4` are the same two lines with the same break after `` `findDrift` `` and no link. The guide's opening paragraph carries the entry sentence and the source link at `guides/guide.md:6-7`. `README.md:6-10` keeps the onboarding and no longer claims the bijection; `## API` is present and untouched (diff `:35`).

**7. The three gate cases — PASS.**
Verified in the tree, not from the report. Equality case at `tests/guides.test.ts:196-204`, inside the manifest loop's `describe(\`${entry.concept}\`)` at `:133`, collecting `const disagreeing: string[]` and asserting `toEqual([])`. Pin at file scope, `:94-113`, in the both-sides form: it emits `${GUIDE_SPEC} pairs: guide … source …` naming both title sets and asserts `toEqual([])`; it binds, because emptying either side leaves `paired` empty and the array non-empty. README case at `:120-127` with both `not.toBeUndefined()` guards at `:124-125` before `toBe` at `:126`. The added `own` binding at `:42-45` typechecks against the installed declaration: `requireValue<T>(value: T | null | undefined, message?: string): T` at `node_modules/@orkestrel/test/dist/src/core/index.d.ts:399`.

The report records each case red on the unconverged tree with its failing lines at `d7-guide-converge-report.md:51-67`, naming `npm run test:guides`, and its green reading at `:315`; the readings are internally consistent (51 → `3 failed | 51 passed (54)` → 54). Those readings are the writer's report and I did not re-run them; see the referral.

**8. § Tests — PASS.**
`guides/guide.md:810-818` states the suite wires RN, SB, MB, LI, TE, NV, FL, EX, FI, SQ, MQ, and EQ, that every `## Surface` and `## Methods` table heads its compared column `Summary`, and that `Kind`, `Shape`, `Signature`, `Value`, and `Returns` are the data columns beside it. No sentence in the file still names `Behavior`, `Builds`, or `Narrows to / Tests` as a column, and the searches for `does not wire`, `later change`, `until then`, and `would report every row` return nothing. See finding F1 for a separate accuracy defect in the same paragraph.

**9. Doc blocks changed only inside their description paragraph or `@example` — FAIL.**

Two blocks changed outside both. The package's own reader fixes the boundary: `collectSummaries` takes the description paragraph as the block's text before its first block tag, so `@remarks` is outside it.

- `src/core/constants.ts:6-10` (diff `:488-491`). The `@remarks` body was rewritten from "One frozen list feeds the `ExportKeyword` type, the `isExportKeyword` guard, and `surfaceSymbolShape`, so a keyword…" to "One frozen list feeds all three, so a keyword…". **Why it matters:** the brief's owned scope is "description paragraphs and `@example` titles and bodies only" (`d7-guide-converge-brief.md:57`), and this edit is unflagged — the report's rewritten-blocks table names `EXPORT_KEYWORDS` for its description paragraph alone. **What right looks like:** either restore the `@remarks` body verbatim, or carry the edit as an explicit flagged claim naming the tag it touched. The edit's content is defensible — "all three" now resolves against the description paragraph — so restating it as a flagged claim is the cheaper repair.
- `src/core/sources/Source.ts:35-49` (diff `:721-725`). The block gained an `@remarks` tag it did not carry, holding text moved out of the description paragraph. **Why it matters:** same scope boundary. **What right looks like:** the unit flags this one (report `:191-196`, flagged claim 1) and every sentence survives, so the correct disposition is a ruling on the flag rather than a repair — see the referral to the subjective lane.

The second half of the claim holds: every added and removed line in the `src/**` hunks (diff `:476`–`:846`) is a comment line, and no code token, signature, or export moved. `Guide.ts` and `sources/SourceManager.ts` carry no hunk.

**10. Scope honesty — PASS.**
`d7-guide-converge.status.txt` lists `README.md`, `guides/guide.md`, `src/core/constants.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/sources/Source.ts`, `src/core/types.ts`, `tests/guides.test.ts`, and the diff touches exactly that set. No vendored file, `tests/setup.ts`, `tests/src/**`, `tests/fixtures/**`, `package.json`, `tsconfig.json`, or `guides/README.md` moved.

**11. Gate readings — CANNOT RULE.**
Every reading in `d7-guide-converge-report.md:288-328` names a command, each of those scripts exists (`package.json:52`, `:56`, `:57`, `:60`, `:63`, `:64`, `:73`), and the readings are mutually consistent. But the readings' only evidence is the writer's own report, and I run no command. The claim's substance is unverifiable from my lane. Referred.

**12. Report honesty — FAIL.**

- **Stale citation.** `d7-guide-converge-report.md:274` cites `tests/guides.test.ts:50-81` for the README `## API` case. In the tree the unit left, that case spans `tests/guides.test.ts:55-86`; the unit's own file-scope insert of the `requireValue` import (`:27`) and the `own` binding (`:42-45`) moved it down five lines. **Why it matters:** the claim requires citations to match the tree the unit left, and a reviewer following the citation lands mid-case. **What right looks like:** cite `tests/guides.test.ts:55-86`. The citation was copied forward from `d7-guide-converge-brief.md:39`, which described the pre-change tree; re-derive a citation against the tree left, never against the brief.
- **Counts in prose.** `AGENTS.md` § Writing bans a number answering "how many" about a set anyone can add to, and the report states several: `:238-239` "five PAIRED, five unpaired"; `:381` "23 of 138 cells exceed 400 characters"; `:318` "The three red-first cases are the three that turned green"; `:297` "Three lines total: the two npm banner lines and the closing summary." **What right looks like:** name the members or recast — "every pair in the preceding table PAIRED and every unpaired fence stayed unpaired"; "the widest cells are `extractExports`, `SourceInterface.exports`, `extractHidden`, and `extractSourceComments`"; "the equality case, the pin, and the README case each turned green"; "the two npm banner lines and the closing summary, and nothing else". Delete a count rather than correcting it. Quoted command output — `written: 138`, `Tests 54 passed (54)` — is a reading reported with its run and stays.

The report's other citations check out: `tests/guides.test.ts:124:20` matches `expect(pitch).not.toBeUndefined()` at `:124`; `guides/guide.md` `:202`, `:211`–`:213`, `:215`, `:224`, `:240` all match; the grep line table at `:77-88` matches the tree. `src/core/helpers.ts:2328` is explicitly labelled "before the restore" and is a transient state rather than a claim about the tree left.

## Findings outside the claims

**F1. § Tests names the wrong exclusion reason for the `findDrift` fence.**
`guides/guide.md:814-816` states EQ leaves out "a fence composing several symbols, a fence whose body a three-backtick doc-block fence cannot enclose, and a class's constructor-door block". "Compare a guide against the source it documents" (`:742-760`) matches none of those: a three-backtick fence encloses its body fine — what refuses it is the enclosing `/** … */` comment, because the body carries `*/` at `:753`. **Why it matters:** `.claude/rules/documentation.md` § Parity requires re-reading prose against what actually shipped, and this sentence was drafted for the exclusion set before the deviation landed. A reader auditing the unpaired set against this sentence finds a fence it does not account for and concludes the fence was missed. **What right looks like:** name the class the sentence omits, in the same list — "a fence whose body a `/** … */` block cannot carry, because it holds a `*/` sequence or a backtick run the emitted three-backtick fence cannot enclose" — so the sentence covers both "List the fence languages a package allows" and "Compare a guide against the source it documents".

**F2. `replaceExample` guards backtick runs and not `*/` — evidence recorded, successor item.**
`src/core/helpers.ts:2799-2801`:

```ts
export function replaceExample(comment: string, example: SourceExample): string | undefined {
	if (!/^[ \t]*\/\*\*/.test(comment)) return undefined
	if (example.code.includes('```')) return undefined
```

The report's characterization is accurate: a body carrying `*/` is accepted and the emitted block does not parse. The doc block's own contract at `src/core/helpers.ts:2698-2699` (diff `:698-699`) promises `undefined` for "code the emitted three-backtick fence cannot enclose" and says nothing about the comment closer, so the block and the code agree with each other and both miss the case. Per the audit brief's amendment this is not a finding against U2. **What right looks like, for the successor:** refuse `example.code.includes('*/')` beside the backtick guard, extend the doc block's stated refusal set to name it, and add the guide sentence F1 asks for; the regression guard is a `replaceExample` case whose example body carries `*/` and asserts `undefined`.

**F3. The pin's population is narrower than `findDrift`'s.**
`tests/guides.test.ts:96` builds `source` with the no-argument `examples()`, which returns exported declaration heads' blocks only, while `findDrift` pairs through `collectTitles`, which reaches documented class and interface members too. So the `GuideInterface.tagline` member pair is outside the pin. The pin still discharges the job its comment claims — removing every `@example` title reddens it, through the four head titles — and the asymmetry makes it conservative rather than permissive. No change required; recorded so a successor does not read the pin as covering the member half.

## Referrals

- **To `verifier` (through the Orchestrator):** claim 11 and the red-first half of claim 7. The gate readings and the recorded red counts rest on the writer's report alone and I ran nothing. The authoritative sweep is `format:check`, `lint:check`, `check`, `build`, `test:src:core`, `test:guides`, plus `npm run build && npm run docs` exiting 0 with no drift line.
- **To the subjective lane:** the report's flagged claims 1 and 2 — whether splitting `Source`'s block into description and `@remarks` is the right shape, and whether the widest propagated cells (`extractExports` and its neighbours) read as a table a scanner can use or as reference paragraphs wedged into one. Both are questions about what the compared unit should be, not about what the code or the gate permits, and neither is mine to rule.
- **To the Orchestrator:** claim 9's `src/core/sources/Source.ts` half. The edit is flagged, reversible, and loses no sentence; the ruling is whether to accept the flag or restore the block, and that is a scope decision rather than an objective defect.

VERDICT: FAIL 9 12