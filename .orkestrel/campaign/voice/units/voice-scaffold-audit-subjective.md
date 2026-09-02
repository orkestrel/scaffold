# Audit lane output — voice-scaffold, subjective lane (FAIL 1)

## Verdicts

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), on Opus 5, Sol bench dark per the brief.

1. BROKEN — Six compound first sentences were conjugated on the first verb only; the second verb stayed imperative, so the sentence asserts one action and orders another and the second action's subject is lost. Three of them now disagree with their own interface twin, which was conjugated on both verbs.
   - /home/user/scaffold/src/bin/CLI.ts:170 "Runs one command line to completion and report through the configured output." vs twin /home/user/scaffold/src/bin/types.ts:247 "...and reports...". Right: "Runs one command line to completion and reports through the configured output."
   - /home/user/scaffold/src/core/Compiler.ts:160 "Compiles a blueprint and compare its plan to a target's current content." vs twin /home/user/scaffold/src/core/types.ts:601 "...and compares...". Right: "and compares its plan".
   - /home/user/scaffold/src/server/Materializer.ts:430 "Re-derives and delete the tracked files the plan does not own." vs twin /home/user/scaffold/src/server/types.ts:258 "Re-derives and deletes...". Right: "Re-derives and deletes".
   - /home/user/scaffold/src/server/WriteTransaction.ts:375 "Promotes every staged file and take every marked file, or roll the whole call back." Right: "and takes every marked file, or rolls the whole call back."
   - /home/user/scaffold/src/server/WriteTransaction.ts:428 "Abandons the transaction and remove everything it created." Right: "and removes everything it created."
   - /home/user/scaffold/src/server/helpers.ts:533 "Resolves a root-relative path and refuse one that leaves its root." Right: "and refuses one that leaves its root."
   Why it matters: these document the executable entry, the compiler audit, the only deletion path, and the transaction commit and rollback; a reader hovering CLI.execute and CLIInterface.execute gets two different sentences about one call, which is the drift this wave existed to remove. Every other hunk was sampled and keeps its action, subject, and qualifiers; two rewrites are improvements worth keeping (isDeferredPath's "and" -> "or" fixes a logically wrong conjunction; matchesMissingPath dropping "only" is carried by the biconditional form).

2. CONFIRMED — Every rewritten opener is third person with an -s verb and none carries its symbol's identifier. Verb choice tracks symbol kind: Matches for every regex, Caps for bounds, Names/Lists/Holds for paths, collections, and values, Represents/Describes for interfaces and contracts, Exposes for the emitter getters (/home/user/scaffold/src/core/Compiler.ts:114, /home/user/scaffold/src/server/Materializer.ts:205). Weaknesses found sit after the opening verb and are recorded as findings.

3. CONFIRMED — Twenty-seven rewritten boolean @returns all read "True if ...; false otherwise" with the original condition kept. Population is closed: a search across /home/user/scaffold/src for "@returns `true`", "@returns Whether", and "True when" returns nothing.

4. CONFIRMED — No changed line in the diff carries @param, @remarks, @example, @throws, @deprecated, @see, or @defaultValue. No removed line opens with a third-person -s verb, so no already-conforming first sentence was rewritten. Where a changed line also carried a later sentence, the later sentence is byte-identical.

## Findings outside the claims

Findings outside the claims:

- Trailing "frozen" now modifies a clause instead of the record: /home/user/scaffold/src/bin/constants.ts:40 "Describes what each exit code means, frozen." and :177 "Describes what each verb does, in one line, frozen." In the noun-phrase original "frozen" modified the constant; after the rewrite the head is a "what" clause, so the reader cannot tell what is frozen. Right: name the thing, for example "Describes what each exit code means, in a frozen table." The "Lists ..., frozen." blocks do not have this problem.
- One row breaks the MAX_* verb: /home/user/scaffold/src/core/constants.ts:424 reads "Sets the maximum dependency package name length..." while every sibling maximum reads "Caps the ..." (lines 416, 427, 430, 433, 436, 439, 445, 448, 451, 474, 477). "Sets" is this file's verb for a non-cap (TAB_WIDTH, line 442), so the one-off signals "not a cap" about a constant that is one. Right: "Caps the dependency package name length, scope included, as the registry caps it."
- String defaults take two verbs across modules: "Holds" at /home/user/scaffold/src/server/constants.ts:117, :120, :123 against "Names" at /home/user/scaffold/src/core/constants.ts:483, :486 for the same kind of literal default. Same split inside one family: /home/user/scaffold/src/core/constants.ts:489 "Holds the tooling versions..." against identically-shaped siblings at :504, :512, :523, :546 "Lists the development dependencies...". Pick one verb per kind and apply it in both modules.
- "Names whether" does not read: /home/user/scaffold/src/core/types.ts:54 "Names whether an upstream lookup produced an answer." for a four-member union. The package already has the natural form at /home/user/scaffold/src/server/WriteTransaction.ts:221 "Reports whether...". Right: "Reports whether an upstream lookup produced an answer, and how it failed when it did not."
- One @returns was reflowed to satisfy the scanner rather than the reader: /home/user/scaffold/src/core/helpers.ts:254-255, an already-conforming clause whose line break moved so "; false otherwise" sits unsplit, because the acceptance instrument's pattern requires the space. Words unchanged. Named so the next wave does not treat the instrument's regex as a style rule.

Referrals (outside my lane, to the Orchestrator; no verdict from me):

- The sweep changed the bytes scaffold writes into consumers' trees. /home/user/scaffold/src/core/templates.ts lines 683-988 are the template literal emitting configs/browsers.ts, and /home/user/scaffold/src/core/compilers.ts:917-923 plans that path with ownership: 'content'. Rewritten lines inside that literal move the planned bytes, so every existing target selecting a browser environment reports stale on configs/browsers.ts at the next scaffold audit until it repairs. The writer recorded the rewrite as a decision but not this consequence. Whether the fleet absorbs a drift row on every browser target, and whether it obliges a scaffold publish and a repair pass, is a release-sequencing call.
- The acceptance instrument cannot see the defect claim 1 names. voice-scan.mjs reports imperative:0 for a tree still holding six imperative second clauses, because it reads the opening token only; the unit's criterion 2 closed green over the defect. The instrument needs a control that a stranded second-clause imperative breaks before its imperative:0 is worth quoting in the next package's brief.
