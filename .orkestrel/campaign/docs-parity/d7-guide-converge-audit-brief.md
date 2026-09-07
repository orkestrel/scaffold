# Audit brief — round R2 over U2 `d7-guide-converge`

## Lanes

Three lanes, blind to each other, clean contexts, one brief. The dispatch names which you hold:

- **Subjective lane** (`reviewer`, Opus 5): the guide's tables and prose as a reader meets them — whether every `Summary` cell reads as a description a table scanner can use, whether the data columns carry what the cells lost, whether the tagline and the README pitch read as one noun phrase, whether the README's rewritten opening keeps its onboarding, whether each titled pair's block reads right under its declaration, and whether the § Tests paragraph and the `### Classes` rows sit where a reader looks.
- **Objective lane** (`reviewer`, Opus 5 — the recorded substitution for the dark Sol bench): what the readers and the gate permit — that every table the readers compare heads `Summary` and carries only sanctioned data columns, that the class rows precede the H3s, that no fact a cell carried was dropped when its literal moved sideways or its clause moved into the block, that each titled block's body and language equal its fence, that the gate cases are the file's house form and their red-first readings bind, that no doc block changed outside its description paragraph or its `@example`, and that `npm run docs` exiting 0 follows from the diff.
- **Checker** (`checker`): the mechanical claims — the header set per table from the diff, the class rows' placement, the pairs and the unpaired fences against the ruling, `## API` present, scope honesty, the gate readings quoted from runs, and the count ban over the report.

You run no command and edit nothing. Read the actual diff and status first, then the report, then the tree.

## Evidence

- `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-guide-converge-brief.md`, `d7-guide-converge-report.md`, `d7-guide-converge.diff.txt`, `d7-guide-converge.status.txt`.
- `d7-guide-plan.md` rulings 1, 2, 3, 5, 8; `orchestrator-measurements.md` § P16; `d7-guide-readers-audit-verdict.md` (the carried findings F5 and the header ruling).
- The tree at `/home/user/fleet/guide` (uncommitted U2 edits over `2acd50e`): `guides/guide.md`, `README.md`, `src/core/**` doc blocks, `tests/guides.test.ts`.
- Scaffold's landed reference: `/home/user/scaffold/tests/guides.test.ts:165-212`, `/home/user/scaffold/README.md`, `/home/user/scaffold/guides/scaffold.md:1-10`.
- Rules: `/home/user/scaffold/AGENTS.md` § Writing; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.

## Numbered falsifiable claims

1. Every `## Surface` and `## Methods` table heads `Summary`, and the columns beside it are drawn from `Kind`, `Shape`, `Signature`, `Value`, `Returns` alone: Types `Name | Kind | Shape | Summary`, Constants `Name | Kind | Value | Summary`, Helpers, Parsers, Factories `Name | Kind | Signature | Summary`, Shapers `Name | Kind | Shape | Summary`, Validators `Name | Kind | Summary`, each Methods table `Method | Returns | Summary`.
2. A `### Classes` table with rows for `Guide`, `Source`, `SourceManager` (`Kind` `class`) sits under `## Surface` after `### Factories` and before `### \`Guide\``; the H3 sections stay.
3. Every `Summary` cell equals its doc block's description paragraph in the compared form, and the report names each Types and Constants row whose literal moved sideways and each block rewritten by hand; no fact a cell carried before the unit is absent from both its data column and its block after it (sample the Types, Constants, and Shapers rows against the diff's minus lines).
4. The `examples` cell of the `SourceInterface` table equals the no-argument overload's paragraph.
5. The titled pairs are exactly the ruling's: `createGuide`, `createSource`, `createSourceManager`, `findDrift`, `extractSourceLines` function blocks and the `GuideInterface.tagline` member block, each titled with its fence heading verbatim, each block's body and language equal to the fence; "The bijection assertion shape", "Resolve directory and file targets", "Carry a summary across into the guide", and "List the fence languages a package allows" carry no pair; no class block is titled.
6. The H1 blockquote of `guides/guide.md` and the blockquote under the README's H1 are the same noun phrase with the same line breaks and no link; the `Source:` link and the entry sentence sit in the guide's opening paragraph; the README keeps `## API`; the README's opening paragraph no longer claims the bijection the pitch carries.
7. `tests/guides.test.ts` carries the equality case inside the manifest loop's `describe` block, the pin at file scope in the both-sides `string[]` form, and the README case with the two `not.toBeUndefined()` guards; the report records each case read red on the unconverged tree with the failing lines, and the report's green readings follow the convergence.
8. § Tests states the suite wires SQ, MQ, and EQ and that the tables head `Summary`; no sentence in the guide still says the tables head `Behavior`, `Builds`, or `Narrows to / Tests`, or that the suite does not wire SQ, MQ, or EQ.
9. No doc block under `src/core/**` changed outside its description paragraph or its `@example` title and body; no code token, signature, or export moved (the diff's `src/**` hunks are comment lines only).
10. Scope honesty: the diff and status list only `guides/guide.md`, `README.md`, files under `src/core/**`, and `tests/guides.test.ts`; no vendored file, `tests/setup.ts`, `tests/src/**`, `tests/fixtures/**`, `package.json`, `tsconfig.json`, or `guides/README.md` moved.
11. The report's gate readings — `npm run build && npm run docs` exit 0 with no line printed; `format:check`, `lint:check`, `check`, `test:src:core`, `test:guides` green — are quoted from runs the report names.
12. Report honesty: every `file:line` citation matches the tree the unit left, and the report states no count in prose.

## Amendments (after the unit returned)

- **Claim 5 is amended.** The unit stopped on `findDrift`'s fence: its body carries a literal `*/` (the source it documents is itself a doc comment), which no `/** … */` block can enclose, and `replaceExample` guards backtick runs only, so the `--to source` write emitted a `src/core/helpers.ts` that did not parse (`d7-guide-converge-report.md` § Deviation). The unit restored the block and left the fence unpaired. Rule on that: whether the fence's body must carry `*/` (the hypothesis that no rewrite keeps both its meaning and its enclosability), and whether the restored block is byte-identical to the committed one. The titled pairs under this claim are therefore `createGuide`, `createSource`, `createSourceManager`, `extractSourceLines`, and the `GuideInterface.tagline` member block, and the unpaired set gains "Compare a guide against the source it documents".
- **The `*/` guard in `replaceExample`** is a defect in the readers' surface the unit did not own; it is a successor item, not a finding against this unit. Record any evidence you meet about its shape (the `\`\`\`` guard at `src/core/helpers.ts`, the guide sentence stating the refusal).
- **The unit's flagged claims** (the `Source` class block split into description and `@remarks`; the README `## Checks` gaining an equality row; `manifestEntryShape`'s authored `Shape` cell; three cells whose orientation clause was dropped; the widest cells after the write) are each yours to rule on under the claim they touch, with what right looks like where you disagree.

## Output

Per claim: PASS, FAIL, or CANNOT RULE with the evidence. Then findings outside the claims, each with what right looks like. Close with exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Open with `Lane held: <lane>`. No process diary. Perform the assignment directly and spawn nothing.
