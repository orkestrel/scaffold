**Lane held: subjective** (design fit, API and vocabulary, architecture fit, simplification, guide and rule voice). Correctness, membership exactness, test sufficiency, and mechanical conformance are referred, not adjudicated.

## Per-claim verdicts

**1. Types — PASS (shape and naming); assignability referred.**
`PolicyComment`, `PolicySourceCode`, `PolicyDoc`, `PolicyTerm`, `PolicyHit` (`/home/user/scaffold/configs/policy.ts:42,48,54,60,67`) take the `{Entity}` plain-data form the file already uses for `PolicyBinding:36`, and a method-carrying mirrored shape without the `Interface` suffix matches the file's own treatment of `PolicyContext:80` and `PolicyVisitor:102`. Widening `PolicyDiagnostic.node` to `PolicyNode:74` is the right boundary: a comment is a reportable node, not an expression. Whether the shapes are assignable to oxlint's `Rule` is objective — referred.

**2. `no-imperative-summary` membership — CANNOT RULE (objective lane).**
Referred: exactness of the attachment, paragraph, opener, and name reads, and whether the RuleTester cases pin each. In-lane note: the test-case labels follow the established `accepts a …` / `rejects a … [membership: …]` convention (compare `/home/user/scaffold/tests/config.test.ts:1295,1312`). See finding F8 on the rule id.

**3. `no-banned-term` membership — CANNOT RULE (objective lane).**
Referred: the stripping, offset preservation, row and inflection coverage, and per-hit reporting. In-lane note: `blankPolicyText`, `stripPolicyCode`, `textToPolicyHits`, `commentToPolicyParagraph`, `paragraphToPolicyOpener`, `isPolicyVoiced`, `programToPolicyDocs` (`configs/policy.ts:695,711,724,738,754,765,781`) all take the file's `{noun}To{Noun}`, `is*`, and `{verb}Policy{Noun}` forms; `reportVoice/reportDocs/reportTerm/reportComments:809,824,829,843` keep the `report{Noun}` visitor-delegation form `.claude/rules/workspace.md` § Policy instruments requires.

**4. Denylist constants and currency — PASS (naming and placement); correctness referred.**
`POLICY_BANNED_TERMS:339` and `POLICY_JUDGED_TERMS:371` belong in the import-free leaf, and the pair reads as one axis. Referred: freezing, the comparison, and whether the control fails. See F4 on the axis vocabulary.

**5. Markdown sweep and the mirror rule — PASS (design); membership referred.**
The control register is deliberate: every exclusion control also writes an arrival hit (`tests/setupPolicy.ts:2271,2286,2301,2325,2340`), so a control that reports nothing fails rather than passes. Referred: the population, the catalog read, and the real-workspace result. See F1, F2, F3.

**6. Wiring and registration — PASS (placement); real-binary load referred.**
The two rows sit with the existing `policy/*` rows in `.oxlintrc.json` and at the end of the plugin register (`configs/policy.ts:1391,1392`), and `POLICY_WIRING_RULES` keeps its namespace grouping (`tests/setupPolicy.ts:162,163`). Whether the binary loads and reports them is objective — referred.

**7. The two rule sentences and the guide passage — FAIL.**
The guide passage does name all four subjects (`guides/scaffold.md:1812-1824`), and the `.claude/rules/typescript.md:80-83` sentence closes on a directive ("so read the sentence in review as well"). The `.claude/rules/writing.md:110-113` sentence fails the claim twice:

- **It is not a directive.** It states only what two instruments read and leave. `AGENTS.md` § Instruction files requires every line to say what to do, what to check, or what to refuse, and its three immediate neighbours (`writing.md:114,117,120`) are imperatives. What right looks like: close it on the reader's obligation, in the neighbours' voice — "Rule a hit in one of those rows yourself; the instruments leave them unmatched."
- **Its load-bearing clause misparses on first read.** "each matches the rows this table bans in every sense" (`writing.md:111`) reads first as an adverbial on `matches`; the intended sense is the rows whose ban is unconditional. `TERM_RULE`'s own description already carries the right word — "an unconditionally banned substitution-table term" (`configs/policy.ts:1361`). What right looks like: "the rows this table bans unconditionally". Second, "Each leaves `now`, …" (`writing.md:111-112`) restarts a sentence on a pronoun whose nearest plural is "the rows"; name the actors — "The rule and the sweep leave …".

Both are inside the sentence this unit owned, and neither reaches the count ban or the `above`/`below` ban.

**8. Scope and report honesty — CANNOT RULE (objective lane and `checker`).**
Referred: the changed-file set, the inventory regeneration, and whether the readings match. In-lane reading of one half: the report's flagged claims are stated as limits, each naming what would close it (`.orkestrel/campaign/docs-parity/d3-scaffold-policy-report.md:355-378`).

## Findings outside the claims

- **F1. `tests/setupPolicy.ts:238` — `POLICY_PROSE_ROOTS` inverts the file's own suffix.** `SKILL_FAMILY_ROOT:98`, `SKILL_BRIDGE_ROOT:101`, `POLICY_RULE_ROOT:226`, and `POLICY_WIRING_ROOTS:169` all name an included subject; this one names an exclusion set, and its doc line has to correct the name. A reader scanning the constants reads it as the roots the sweep reads. Rename to `POLICY_PROSE_EXCLUSIONS` and update `readPolicyProse:1360` and the `@remarks` at `1345-1347`.
- **F2. `tests/setupPolicy.ts:1431` and `:1446` — `isPolicyMirror` and `isPolicyStray` are the same three lines with one negation.** Both re-match the pattern, both exclude `POLICY_GUIDE_MAP`, both re-read the manifest, and both re-read the catalog; `inspectPolicyProse:1470-1481` then calls both per file. Route them through one reader — `readPolicyGuide(root, path): string | undefined` returning the candidate name after the index and own-package exclusions — and leave each predicate as the catalog-membership check in its own polarity.
- **F3. `tests/setupPolicy.ts:1476` — the stray message names a category the mechanism never reads.** "guide is the package's own, the map, or a vendored mirror" sends the reader looking for a mirror, while `isPolicyStray:1446` decides on catalog membership through `readPolicyCatalog:1400`. Write "guide is the package's own, the map, or a catalog row", and update the control at `:2313`.
- **F4. One axis, four wordings.** `POLICY_BANNED_TERMS`/`POLICY_JUDGED_TERMS` (`configs/policy.ts:339,371`) and "unconditionally banned" (`:1361`) against "bans in every sense" (`.claude/rules/writing.md:111`) and "refuses in every sense" (`guides/scaffold.md:1814`). Fix "unconditional" as the word and use it in both prose sites; that also closes the misparse named under claim 7.
- **F5. `configs/policy.ts:41` and `:47` — "the voice rules" collides with `VOICE_RULE:1335`.** The term rule reads comments too, so the collective label reads as the specific rule. Write "the comment rules", or name both.
- **F6. `configs/policy.ts:47` — `PolicySourceCode` does not name what it mirrors.** Its siblings do: "Lists the Oxlint context operations" (`:79`), "Lists the Oxlint visitor entries" (`:101`), "supplied to Oxlint" (`:94`). `getAllComments` is a `get*` form that `.claude/rules/names.md` admits only as an external transliteration whose TSDoc names its source. Write "Lists the Oxlint source-text operations the comment rules read."
- **F7. Three spellings of the stop set.** `POLICY_VOICE_STOPWORDS` (`configs/policy.ts:283`), "stop list" (`.claude/rules/typescript.md:82`), "stop-set" in the case labels (`tests/config.test.ts`, "accepts a stop-set word after the opener"). The campaign's word is "stop set"; use it in the rule sentence and the labels.
- **F8. Referral to the Orchestrator — the rule id under-describes its rule.** `no-imperative-summary` (`configs/policy.ts:1391`) reports a noun-phrase opener, a stop-set opener, an empty block, and a first sentence naming its own symbol; only one of its invalid cases is an imperative. Every other identifier for it says "voice", and the file's id convention is `no-malformed-*`/`no-misnamed-*`. The id was fixed by the D3-pre convergence and this unit had no license to move it, so changing it is a successor decision touching `.oxlintrc.json`, `POLICY_WIRING_RULES`, the real-binary expectation list, and both prose sites. No verdict from me.
- **F9. `guides/scaffold.md:1812-1824` — the index entry outgrew the index.** It is now a five-sentence paragraph among one-line noun phrases, and it carries mechanism narrative (why a mirror is excluded, what the catalog is) rather than what the file proves. Move the mechanism sentences to the guide's policy prose and leave the entry naming the laws.

VERDICT: FAIL 7