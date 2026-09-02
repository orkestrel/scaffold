# Audit verdict — unit voice-guide

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `8b6ac02`
(`units/voice-guide.diff`, `units/voice-guide.status`, `units/voice-guide-report.md`).
Rewritten per the writer: imperative 14, verbless 89, name 9, returns 6. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 1)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), Opus 5, clean context, read-only. Sol bench dark, so this lane ran on the writer's engine.

## Claim 1 — every rewritten first sentence keeps the meaning of the one it replaced — BROKEN

Sampled every hunk in `/home/user/scaffold/tmp/units/voice/voice-guide.diff`. Most rewrites are clean verb-prefixes that keep the action, subject, and qualifiers intact (`/home/user/fleet/guide/src/core/factories.ts:19`, `/home/user/fleet/guide/src/core/helpers.ts:822`, `/home/user/fleet/guide/src/core/parsers.ts:13`, `/home/user/fleet/guide/src/core/validators.ts:12`). The break is a family of name-drop rewrites that shed a qualifying noun the same file keeps in sibling rows.

Dropped nouns:

- `/home/user/fleet/guide/src/core/types.ts:61` — "The source directory (or directories) the guide documents." became "Names the directory (or directories) the guide documents." The row that carried the `spec` / `source` / `tests` distinction no longer says which kind of directory it is.
- `/home/user/fleet/guide/src/core/types.ts:63` — "The tests directory …" became "Names the directory …".
- `/home/user/fleet/guide/src/core/types.ts:93` — "The fence's verbatim code body." became "Holds the fence's verbatim body."
- `/home/user/fleet/guide/src/core/types.ts:333` — "The joined, space-separated head text." became "Holds the joined, space-separated head."
- `/home/user/fleet/guide/src/core/types.ts:346` — "Its raw body lines, …" became "Holds its raw lines, …".
- `/home/user/fleet/guide/src/core/types.ts:85` — "The imported names, …" became "Lists the imported identifiers, each alias resolved to the original exported name." The sentence now calls one thing by two terms.
- `/home/user/fleet/guide/src/core/shapers.ts:10`, `:28`, `:46` — "The shape of a X" became "Describes a X", dropping the category noun `factories.ts:86` depends on ("Compiles the `surfaceSymbolShape` into a `ContractInterface`") and that the package's own guide still uses (`/home/user/fleet/guide/guides/guide.md:124`).

Kept nouns, in rewritten sentences, under the same rule: `/home/user/fleet/guide/src/core/types.ts:44` ("Holds the exact **source** characters" for `source`), `:46` ("Holds **source code** …" for `code`), `:48` ("Holds every genuine **JSDoc** span" for `jsdoc`), `:57` ("Holds the **concept** name" for `concept`), `:72` ("Holds the backticked **interface** name" for `interface`), `:83` ("Names the module **specifier**" for `specifier`), `:91` ("Holds the info-string **language** tag" for `language`). `/home/user/fleet/guide/src/core/types.ts:301` keeps "Names the **source** directory (or directories) this guide documents" for the very concept `types.ts:61` just stripped.

Why it matters: one rule was read two ways inside one file, and inside single interfaces — `ManifestEntry` keeps `concept` and strips `source` and `tests`; `GuideFence` keeps `language` and strips `code`; `FenceImport` keeps `specifier` and strips `names`. The stripped rows read vaguer than the rows beside them, and `types.ts:61` and `types.ts:301` now describe the same value with different vocabulary. A unit whose whole product is uniform voice must not leave the package with two vocabularies for one rule.

What right looks like: apply the governing lesson the brief carries ("keep a domain term that is the value's own name") to every row. Restore "source directory", "tests directory", "verbatim code body", "head text", "raw body lines", "imported names", and the shape noun (for example "Shapes a `SurfaceSymbol` — …"), keeping the added third-person verb. If instead the strict no-repeat reading governs, strip the name from `types.ts:44`, `:46`, `:48`, `:57`, `:72`, `:83`, and `:91` as well. Ship one reading, not both.

## Claim 2 — third-person `-s` verb that fits the symbol, no repeat of the symbol's name — CONFIRMED

Every rewritten first sentence opens with a third-person `-s` verb, and each verb fits its symbol: `Creates` / `Compiles` for the factories (`factories.ts:19`, `:89`), `Checks whether` for the guards (`validators.ts:12`, `:28`, `:46`, `:64`) and predicates (`helpers.ts:551`, `:803`), `Returns` for queries (`types.ts:116`, `:213`, `helpers.ts:920`), `Holds` / `Names` / `Lists` / `Maps` for data properties and constants (`types.ts:22`, `:59`, `:74`, `:312`, `constants.ts:21`, `:41`), `Represents` for types and interfaces (`types.ts:4`, `:13`, `:98`), `Reflects` and `Presents` for the classes (`Source.ts:19`, `Guide.ts:12`). No verb misdescribes its symbol. No rewrite introduced a name repetition that was not already there; the retained names are covered by the brief's domain-term exemption, and the contradiction between those retentions and the claim-1 drops is recorded under claim 1 rather than doubled here.

## Claim 3 — boolean `@returns` reads `True if …; false otherwise` with the original condition kept — CONFIRMED

Six `@returns` lines changed, each keeping its condition word for word: `helpers.ts:557` ("True if every segment is canonical; false otherwise"), `helpers.ts:809` ("…if the link should not be resolved against the filesystem; false otherwise"), `validators.ts:16`, `:33`, `:51`, `:70`. `types.ts:240` already read in that form and was left alone.

## Claim 4 — no already-conforming sentence rewritten; no `@example`, `@param`, `@remarks`, `@throws`, or later sentence touched — CONFIRMED

No minus line in the diff opens with a third-person `-s` verb; every one opens with an article, a noun, `Whether`, `Its`, or an imperative. Blocks that already conformed are untouched: `constants.ts:2` (`EXPORT_KINDS`), `helpers.ts:1078` (`escapeRegExp`), `helpers.ts:1102` (`extractDeclaration`), `types.ts:173`-`:211` (`SourceInterface.surface`), `SourceManager.ts:6`. No `@example`, `@param`, `@remarks`, or `@throws` line appears in the diff. One line carrying a later sentence changed shape but not bytes: `Source.ts:22` gained the word "than" when the first sentence reflowed, and the later sentence "`Source` never touches disk:" is byte-identical.

Findings outside the claims:

## Finding A — two comment lines pushed past the project's 100-column width

`/home/user/fleet/guide/src/core/types.ts:299` and `/home/user/fleet/guide/src/core/types.ts:310` are now 102 columns plus the leading tab; adding "Holds " to a 96-column line did it. The project's print width is 100 (named in the package's own prose at `types.ts:330`), and oxfmt does not reformat comments, so `format:check` cannot see this. What right looks like: wrap each into a block comment, or shorten the clause — for example "Holds the workspace's canonical-segment inventory keys, root-relative path → text."

## Finding B — the reflow policy changes from block to block

Some blocks were rewrapped to the file's prevailing width after the rewrite lengthened the first line: `validators.ts:12`-`:14`, `shapers.ts:10`-`:11`, `helpers.ts:803`-`:805`, `Source.ts:19`-`:22`, `types.ts:103`-`:104`. Most were not, leaving a long first line over short continuations: `types.ts:4`, `:29`, `:38`, `:53`, `:68`, `:79`, `:98`, `:152`, `:244`, `:258`, `:270`, `:292`, `:306`, `:340`; `helpers.ts:595`, `:653`, `:712`, `:920`, `:967`, `:1009`. Why it matters: the wrap is what a reader sees in editor hover text and in generated docs, and the diff reads as two different jobs done under two different standards. What right looks like: reflow every block the rewrite lengthened, or reflow none; state the choice in the report.

## Finding C — `Holds its …` leaves the possessive without its noun

`/home/user/fleet/guide/src/core/types.ts:22` ("Holds its identifier."), `:24` ("Holds its declaration kind …"), `:74` ("Lists its documented Method-cell identifiers …"), `:346` ("Holds its raw lines …"). In the originals the sentence was a bare noun phrase, so `Its` bound to the enclosing interface. With a verb in front, the nearest subject is the property itself, so "its" reads as the property's own. What right looks like: name the possessor — "Holds the symbol's identifier", "Lists the group's documented Method-cell identifiers", "Holds the declaration's raw body lines".

## Finding D — `Source` buries its identity claim

`/home/user/fleet/guide/src/core/sources/Source.ts:19`-`:22` moved "A pure `SourceInterface`" from the sentence's front to "…over a consumer-supplied file inventory as a pure `SourceInterface`", 30 words in, where it reads as manner rather than identity. What right looks like: "Reflects, as a pure `SourceInterface`, a module scope's intentional direct declarations, conventional barrel-reachable surface, and member methods over a consumer-supplied file inventory, using …".

## Finding E — the guide and the TSDoc now disagree on the shape vocabulary

`/home/user/fleet/guide/guides/guide.md:124`-`:126` still read "The shape of a `SurfaceSymbol`", "The shape of a `MethodGroup`", "The shape of a `ManifestEntry`", while `shapers.ts:10`, `:28`, `:46` now read "Describes a …". `guides/**` was correctly off-limits for this unit, so this is a carrier question, not a scope breach: the guide's wording is independent evidence that "shape" is the package's domain term for those values, which supports restoring it in the TSDoc rather than editing the guide. Name the carrier before this lands.

## Referral to the Orchestrator (both lanes are mine; Sol is dark)

Finding A is prose, but whether a comment line over the 100-column print width should be caught by a gate is an objective question I do not rule: `npm run format:check` passed at exit 0 per the unit's report, and oxfmt leaves comment interiors alone, so nothing in the chain can see it. Decide whether that gap needs a check or is accepted.

## Proposals from the writer's report, ruled

- "Verb echo is kept where the rule's own examples endorse it" — RETAINED. The rule names `Creates` and `Checks whether` itself, so `createGuide` reading "Creates …" is the rule's own form, not a name repetition.
- "A domain noun that is the value's own name stays" — RETAINED as the correct reading, and it is precisely the reading the six rows under claim 1 do not follow.
- "`isExternalLink` keeps 'should be skipped' … rewriting that clause would change substance outside the objective" — RETAINED. Substance stays out of a voice wave.

## Checker lane (PASS)

Per-claim verdicts below.

Findings outside the claims:

1. CONFIRMED. Every `-`/`+` pair in `/home/user/scaffold/tmp/units/voice/voice-guide.diff` sits inside a `/**...*/` block (lines beginning `*`, `/**`, or `/** ... */`). No hunk touches a code statement, signature, or non-comment line. Example: `src/core/Guide.ts:9-10` changes only "A stateful..." to "Presents a stateful...", both inside the class doc comment.

2. CONFIRMED. Backtick tokens, `{@link ...}` references, and inline code spans are byte-identical across every hunk except the mandated boolean-`@returns` rewrites and the nine reported name-drops.
   - Mandated `@returns` rewrites (backticked `true`/`false` → `True if …; false otherwise`), all present and matching the rule: `src/core/helpers.ts:132-133` (`hasCanonicalSegments`), `src/core/helpers.ts:229-230` (`isExternalLink`), `src/core/validators.ts:806-807`, `:821-822`, `:835-836`, `:851-852` (four guards).
   - Name-drop exceptions verified against the diff, each dropping only the prose word repeating the property's own identifier, with all backtick/`{@link}` tokens intact: `src/core/shapers.ts:426-429` (`surfaceSymbolShape`), `:437-440` (`methodGroupShape`), `:448-451` (`manifestEntryShape`); `src/core/types.ts:549-550` (`ManifestEntry.source`), `:552-553` (`ManifestEntry.tests`), `:580-581` (`FenceImport.names`), `:591-592` (`GuideFence.code`), `:769-770` (`DeclarationHead.text`), `:785-786` (`Declaration.body`). No other hunk drops or alters a backtick/`{@link}`/URL token.

3. CONFIRMED. `voice-guide.status` (9 lines) lists only `src/core/*.ts` and `src/core/sources/Source.ts`, all `M`. Nothing under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, or `configs/`.

4. CONFIRMED. Grep across `/home/user/fleet/guide/src` for a doc-comment line opening with any listed imperative verb (case-insensitive) followed by a space or backtick returned no matches, and a grep for `@returns` followed by `Whether`, `` `true` ``, or `true ` also returned no matches. `/home/user/fleet/guide/app` does not exist (`Glob` returned no files), consistent with the report's claim that the sweep covers `src/**` only.

5. CONFIRMED on the quoted evidence per the brief's rule. The report (`voice-guide-report.md:54-61`) quotes each gate command and its exit code: `npm run format:check` (0), `npm run lint:check` (0), `npm run check` (0), `npm run build` (0), `npm test` (0). The Orchestrator's own landing chain is the authoritative run and was not independently re-executed by this audit.

Findings outside the claims: none material. The report's "Wording judgments" section documents deliberate prose choices (kept domain nouns, kept `isExternalLink`'s "should be skipped" clause, verb-echo cases) that fall within the brief's stated discretion and are not evidenced as deviations by the diff.

## Orchestrator

Subjective claim 1 broke on a family of name-drop rewrites that shed domain nouns sibling rows kept (`source directory`, `tests directory`, `code body`, `head text`, `body lines`, `imported names`, the shape noun). Ruled with the lane: restore every noun, name the possessor where `its` lost its referent, lead `Source` with its identity, and wrap the two overlong single-line comments (fix-up brief `voice-guide-fixup-brief.md`, builder on Sonnet). The lane's reflow-policy and width findings are recorded for the debrief. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
