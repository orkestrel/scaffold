# Unit docs-proposal-audit — subjective lane

Returned by Workflow wf_9d14854c-0b0 node audit:subjective on 2026-09-05; captured verbatim by the Orchestrator.

# Verdict — subjective lane (design fit, voice, coherence, owner actionability)

Lane held: **subjective**. Read-only, no commands run. Ruled in full on claims 5, 9, 10, 12; ruled on 6, 7, 11 where evidence was found; the rest are left to the lanes the brief assigns them to.

## Per-claim verdicts

**1. Pointers resolve.** NOT RULED (objective lane / checker). Incidental checks all resolved: `src/core/factories.ts:8`, `src/core/helpers.ts:61`, `src/core/types.ts:10` and `:21`, `guides/scaffold.md:221`, `:281`, `:864-866`, `:961-965`, `:999-1002`, `src/core/Compiler.ts:78`. One imprecision recorded as F7.

**2. Versions and measurements.** NOT RULED (objective lane).

**3. Checks blocks rule on each check.** NOT RULED (objective lane). See F4 for a coherence defect in Option 3's added-instrument table.

**4. Edit cost blocks.** NOT RULED (objective lane). **Referral:** the fleet-cost contradiction under claim 10 is cost-model honesty and belongs to that lane's remit; the evidence is quoted there.

**5. R1–R10 presented as ruled, no unflagged contradiction.** **BROKEN.**
`tmp/units/docs-reconciliation.md:19` (R7) rules: "`policy/tsdoc-voice` and `policy/prose` in `configs/policy.ts`". `PROPOSAL.md:893` writes instead: "- **`policy/summary`** refuses a doc block whose first sentence is not third person with an `-s` verb". The renamed id then propagates unflagged to `:978`, `:1012`, `:1039`, and `:1177`; the token `policy/tsdoc-voice` appears nowhere in the file (grep over `PROPOSAL.md`). Every other element of R7 is present and faithful, and R1–R6 and R8–R10 are each presented as ruled in the sections the writer's report names. The defect is confined to the rule id, and it matters because the document flags a comparable proposed name elsewhere — `:380-381`, "Treat that name as a proposal the first unit settles" for `render` — so the reader is entitled to read an unflagged id as the ruled one.
What right looks like: write `policy/tsdoc-voice` as ruled, or keep `policy/summary` and add the same one-clause flag the `render` name carries, naming the reconciliation id it supersedes.

**6. No count in prose.** **BROKEN** (one hit).
`PROPOSAL.md:341`: "Measured: `grep -c '^\s*/\*\*' src/bin/*.ts` returned 73 over 69 top-level exports." The command named produces the doc-block figure only; `69` tallies a set anyone can add to and is reported with no run. Every other numeral I checked is a measurement quoted with its command (`:199`, `:266-267`, `:285`, `:530-531`, `:936`), a git subject quoted verbatim (`:122`, `:132`, `:137`), or an identity number (`Option 1`, `Stage 1`, `C1`, `R1`).
What right looks like: name the command that produced `69`, or write "more doc blocks than top-level exports".

**7. No substitution-table term in a banned sense.** **CONFIRMED.**
Case-insensitive sweep over `PROPOSAL.md` for `should|simply|easy|easier|just|currently|utilize|leverage|via|in order to|e.g.|i.e.|etc.|performant|robust|allows you to|and/or|please|above|below` and for `once|since|new|latest|both|two|three|four|five|several`. Every hit rules permitted: `:161` `below` and `:195` `should`/`simply`/`leverage` are backticked data; `:109` `--since` is inside a command; `:384`, `:548` `new` names the `new` verb as a code token; `once` at `:522`, `:798`, `:1030` means "in one place" and at `:1047`, `:1061` means one time, neither temporal `after`; every `both` at `:245`, `:848`, `:1091`, `:1126`, `:1177` names its members, and `:520`/`:1021` name them in the heading directly above ("Humans and agents"); `two` at `:122`, `:132`, `:137`, `:152` sits inside quoted commit subjects.

**8. Headings, introductions, tokens, modals.** NOT RULED (checker). No contrary evidence surfaced in a full read.

**9. Worked examples quote verbatim where they claim to; generated passages follow from the mechanism.** **BROKEN.**
`PROPOSAL.md:668-671` claims: "The summary and the leading remark paragraphs are the block at `src/core/factories.ts:7-43` verbatim; the closing remark paragraph is the guide's sentence at `guides/scaffold.md:864-866`, moved rather than rewritten." The closing paragraph shown at `:695-699` is neither. It opens with "That law is structural only." — a sentence from the source (`src/core/factories.ts:29`), not from the guide — and then rewrites the guide's clause "and the gate answers them with questions" (`guides/scaffold.md:865`) into "and the gate answers them with `{@link Question}`s carrying their accepted candidates". The source's own clause "Deciding them here as well would restate that law and let the answers disagree" (`src/core/factories.ts:32-33`) is dropped. So the paragraph is a three-way merge presented as a move.
Why it matters: "moved rather than rewritten" is Option 2's central editorial-cost promise, and this is the one example the owner has for judging what that pass costs. A merge is authored work; a move is not.
What right looks like: describe the closing paragraph as the source's opening sentence plus the guide's sentence at `:864-866` with `questions` rendered as the `{@link Question}` tag, or show the guide's sentence unaltered.
Second, weaker point on the same claim: the generated passage at `:718-733` renders `{@link Blueprint}` as `` [`Blueprint`](#blueprint) `` in the chapter body but as `` `Blueprint` `` in the Surface row at `:714`. Option 2's mechanism table (`:642`, "Every cross-reference | `{@link}` and `@see`") states no body-rendering rule, so the anchor form and the anchors it assumes are introduced by the example rather than following from the mechanism.
Held on this claim: the `Origin` block at `:415-426` matches `src/core/types.ts:9-18` word for word; the generated Surface region at `:436-438` carries the real first sentences of `Origin` and `Ownership` verbatim per R1; the Ownership member table at `:447-453` matches `guides/scaffold.md:961-965` exactly; the `createBlueprint` pair at `:456-458` and the row at `:463` match `src/core/factories.ts:8` and `guides/scaffold.md:281`, with `{@link Blueprint}` correctly rendered as `` `Blueprint` ``; Option 3's excerpt at `:958-966` matches `src/core/factories.ts:7-14`; the `Encodes`/`Encode` pair at `:975-977` matches `src/core/helpers.ts:61` and `guides/scaffold.md:221`.

**10. Leads with the decision; an owner can act without a follow-up; the order and the decisions are explicit.** **BROKEN.**
The lead and the order are present and clear: the blockquote at `:3-13` opens with "Start with Option 3, the voice gate", § Summary at `:17-18` repeats it, § Recommendation and order at `:1101-1119` gives the sequence, and `:1121-1139` states the decisions the owner must take now. The break is a cost contradiction inside Option 1, in the three places an owner reads first, against the option's own migration.
- `:11-12` (blockquote): "a `@orkestrel/guide` development bump with a re-pin and gates for Option 1".
- `:28` (Summary): "The blast radius is a development-edge re-pin."
- `:57` (glance table, Fleet cost): "`@orkestrel/guide` development bump: re-pin and gates; each package adds markers on its own schedule".
- `:625-626` (Option 1, Claim 5): "Adopting Option 1 obliges no fleet package to republish, only to re-pin `@orkestrel/guide` and prove its gates."

Against `:548-550` (Option 1, Migration step 2): "**Scaffold seeds the script and the markers in the `new` templates.** That moves `dist/src`, so `@orkestrel/scaffold` bumps and publishes on its own account, and propagates to targets as files through a re-pin and `repair`" — and `:566-568`, which adds a `prepack` regeneration obligation because `guides/scaffold.md` is a `HOST_PATHS` seed. `@orkestrel/scaffold` is a fleet package, so the option's own Claim 5 is falsified by the option's own migration, and the owner budgeting from the lead under-budgets Option 1 by a publish plus a per-target re-pin, `repair`, and gate run — the very cost the lead prices explicitly for Option 3.
Secondary: `:12` prices "one amendment to `.claude/rules/documentation.md:35`", while `:1037-1038` requires "Amend `.claude/rules/documentation.md:35` **and any `.claude/rules/writing.md` row the denylist derives from**".
What right looks like: state Option 1's fleet cost in the blockquote, the Summary bullet, the glance-table cell, and Claim 5 as the `@orkestrel/guide` development bump **plus** the scaffold seed release with its per-target `repair`, or scope the migration's step 2 explicitly as a later, separable stage and say so in all four places.

**11. Refused section gives a reason with a pointer per refusal; Probes give a command or a comparison per probe.** **CONFIRMED.**
Every row of `:1145-1153` carries a filled Reason and Pointer cell, each pointer naming a file, a section, or a constraint id. Every probe at `:1160-1177` names its instrument: probe 1 a scanner-against-`ts.getJSDocCommentsAndTags` diff, probe 2 a render-against-committed-guide diff, probe 3 a read of `Materializer.catalog` and `#recatalog` with the generalization to rule on, probe 4 an exact `oxfmt --check` command, probe 5 an `oxfmt --write` diff, probe 6 a throwaway plugin rule run against one file. A mismatch between the section's own header and its rows is recorded as F3 rather than against this claim, which asks only for presence.

**12. Humans and agents sections answer the owner's question rather than restating the conventions.** **CONFIRMED.**
Each option's section answers all three parts in its own frame and states no convention's content, only where each lives.
- Option 1 (`:518-537`): one artifact — "One artifact serves both readers, and Option 1 adds no second one." (`:520`); voice law stated once and enforced — "**The voice law is stated once and enforced by Option 3.**" routing to `AGENTS.md` § Writing, § Instruction files, `.claude/rules/writing.md`, and `.claude/rules/typescript.md:76-88`, then "Option 1 adds one _derivation_ rule … and no second _statement_ site." (`:522-526`); agent entry — "**An agent's entry stays `AGENTS.md`, the rule map, and `guides/README.md`.**" (`:533`), which also carries the load-bearing reason `guides/reference.md` is refused.
- Option 2 (`:787-806`): the hover gains the chapter, the human sees the same file, the agent reads the guide or the rollup and "gets identical sentences from either" (`:797-798`), and `llms.txt` is permitted only as a generated projection (`:801-806`).
- Option 3 (`:1019-1031`): what changes is what each reader can trust, not what each loads (`:1021-1022`), with the entry named as `.claude/rules/writing.md` plus the published rollup and `CANON_PATHS` as the mechanism that publishes the law (`:1027-1029`), closing on "Option 3 adds enforcement sites, never statement sites." (`:1031`).
Attacks that failed: I checked each section for a restated convention body (none — every reference is a pointer, per `.claude/rules/documentation.md` § Authority and workflow); for an option-to-option contradiction about the agent's entry point (Option 1's "the rule map" reaches Option 3's `.claude/rules/writing.md`, so the two agree); and for a second index smuggled in (the `llms.txt` permission at `:801-806` is scoped to a generated digest under Option 2's multi-render and matches R8).

## Findings outside the claims

**F2 — A list item named by its position.** `:213-214`: "the gates that exist are strong on **symbol identity** and near-absent on **sentence truth**, and every change kind you named as expensive falls in the second class." `AGENTS.md` § Writing: "NEVER name a list item by its position." Fix: "falls in the sentence-truth class".

**F3 — The Refused section states a discipline it does not keep.** `:1143`: "Each refusal names its one reason and the pointer that establishes it." Two rows give two reasons: `:1148` — "Declaring a package, **and** its Markdown is described as 'a starting point for people who want to implement their own adapter'"; `:1150` — "`Upstream.#guideURL` fetches one path per package … **It also** degrades the single-file read you named as the guide's value." Fix: cut the second reason in each row, or change the header to name the reasons.

**F4 — Option 3's added-instrument table promotes a conditional to an adopted check.** `:1017` lists "The oxfmt `jsdoc` shape pass | Every doc block is formatter-normalized | `npm run format:check`" with no condition, and `:1024` asserts "**An IDE hover shows what it shows today**, with shape normalized by oxfmt rather than by review." The mechanism (`:934-940`), the risk (`:1061-1063`), migration step 3 (`:1042-1043`), and probe 5 (`:1173-1174`) all make the `jsdoc` flip conditional on a measured diff that alters no first sentence. Fix: mark the row and the bullet conditional on that diff, matching the mechanism.

**F5 — Verbatim derivation propagates a doc-block writing defect into the guide, and no risk row names it.** Under R1 the guide row and, under Option 2, the chapter body take whatever the doc block says. `src/core/factories.ts:31` writes `{@link Question}s`; the proposal's own generated passage at `:732-733` therefore renders "the gate answers them with [`Question`](#question)s", a pluralized code token that `.claude/rules/writing.md` § Code tokens forbids ("Never inflect, pluralize, or possessivize a code token"). Neither proposed instrument catches it: `policy/summary` (`:893`) reads the first sentence only, and `policy/prose` (`:895`) reads substitution-table terms only. Fix: name the inherited-defect class in Option 1's § Risks and open questions, and either scope `policy/prose` to the code-token rule as well or state that the class stays review-owned.

**F6 — The proposed rule ids depart from their namespace's form with no flag.** `:890` names the siblings the new rules land beside: `no-mocking`, `no-keyword-privacy`, `no-nested-functions` — each an id naming what it refuses. `policy/summary` (`:893`) names its subject instead, so the id reads as a rule about summaries rather than one that refuses an imperative summary. The document flags the comparable `render` name as "a proposal the first unit settles" (`:380-381`) and gives these ids no such flag. Fix: name them in the sibling refusal form, or carry the same proposal flag.

**F7 — One quotation's pointer under-covers its fence.** `:414` cites "(`src/core/types.ts:9-17`)" for the block shown at `:415-426`, which includes the declaration line `export type Origin = 'host' | 'template' | 'computed'` — `src/core/types.ts:18`. Referred to the objective lane's claim 1. Fix: cite `:9-18`.

## Attacked and held

- **Claim 12** — attacks recorded on the claim line: restated convention bodies, a cross-option contradiction about the agent's entry, and a smuggled second index. All three failed.
- **Claim 7** — the sweep's pattern and its single-file population are named on the claim line; every hit ruled by sense, including the `once` and `both` senses the substitution table's own note warns about.
- **Claim 9, the parts that held** — listed on the claim line; the adjacent behaviour that looks like a defect and is correct is the re-wrapping of `src/core/factories.ts:17-27` in the Option 2 block at `:684-693`: the line breaks move, the words do not, and re-wrapping a doc block into a Markdown fence is not a rewrite.
- **Claim 5, the parts that held** — R1 through R6 and R8 through R10 each appear as ruled in the sections the writer's report names, including the refusals R1 and R3 carry, which are flagged as refused alternatives at `:395-400`, `:604-608`, and `:1150-1151` rather than contradicted silently.

VERDICT: FAIL 5, 6, 9, 10; outside the claims: F2, F3, F4, F5, F6, F7
