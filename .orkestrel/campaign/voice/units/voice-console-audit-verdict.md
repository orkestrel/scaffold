# Audit verdict — unit voice-console

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `ed4e280`
(`units/voice-console.diff`, `units/voice-console.status`, `units/voice-console-report.md`).
Rewritten per the writer: imperative 70, verbless 148, name 1, returns 5. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 1, 2)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), on Claude Opus 5 — the writer's engine, per the brief's recorded Sol-dark substitution.

## 1. Meaning kept in every rewritten first sentence — BROKEN

I sampled every hunk in the diff, not a subset. Every hunk holds except one.

Break: `/home/user/fleet/console/src/core/types.ts:239` (`ThemeOptions`).

- Was: `Options for {@link createTheme} — the roles to override on {@link DEFAULT_THEME}.`
- Is: `Configures {@link createTheme} — the roles to override on {@link DEFAULT_THEME}.`

Dropping the noun `Options` removed the referent the em-dash appositive depended on. The appositive now renames the noun phrase in front of it, `createTheme`, so the sentence states that the factory function is "the roles to override on `DEFAULT_THEME`". That is false: the roles are the interface's own fields. The unit brief binds this exact lesson — "when a rewrite drops a noun phrase, keep every referent a later clause depends on".

The writer already holds the fix and applied it elsewhere: `/home/user/fleet/console/src/server/types.ts:38` and `:160` open `Holds the options for {@link …} — all optional, …`, keeping `options` as the antecedent for the trailing clause. What right looks like: `Holds the options for {@link createTheme} — the roles to override on {@link DEFAULT_THEME}.`

Every other `Configures …` rewrite is clean, because its trailing appositive genuinely describes the function it follows (`:572` a horizontal rule, `:593` content framed in box-drawing characters, `:637` a bordered grid, `:673` a nested tree, `:956` a determinate progress bar string), or the sentence carries no appositive at all (`:107`, `:386`, `:460`, `:720`, `:860`, `:1010`, `:1149`, `src/browser/types.ts:24`).

Two rewrites I checked hard and cleared:
- `src/core/helpers.ts:85` (`width`): `Measures how many visible columns \`text\` occupies` matches the block's own `@remarks` at `:90` ("the column count a styled string occupies") and its documented wide-glyph simplification at `:92`. No drift.
- `src/core/types.ts:1414` region (`ProgressInterface.update`): the imperative list became third person and the later sentence `Ignored once terminal.` rides through byte-identical.

## 2. Verb fits the symbol and never repeats the symbol's name — BROKEN

Break: `/home/user/fleet/console/src/core/Styler.ts:6` — `Implements the fluent, composable styler — the consumer-facing API over the style engine.`

The verb misdescribes the symbol, on two counts.

- `Styler` is the only class in `src/` with no `implements` clause: `/home/user/fleet/console/src/core/Styler.ts:30` reads `export class Styler {`, against `LoggerManager`, `Retention`, `Logger`, `Reporter`, `Spinner`, `Progress`, `Capture`, `ANSIRenderer`, and `ProcessCapture`, each of which declares the interface its own doc names. The diff teaches the reader that `Implements X` names the contract the class satisfies — `ANSIRenderer.ts:5` "Implements the cross-environment default {@link RendererInterface}", `Capture.ts:18` against `types.ts:892` "Declares an observable console interceptor". For `Styler` that reading is false, and the class's own `@remarks` at `Styler.ts:18` say so: "The factory returns that surface; this class is the engine behind it."
- The sentence repeats the symbol's name (`Styler` → "styler"), which the claim forbids and which the sibling interface doc at `/home/user/fleet/console/src/core/types.ts:122` already avoids: "Declares the fluent, composable styling surface".

What right looks like: `Builds the fluent, composable styling surface — the consumer-facing API over the style engine.` `Builds` is already this file's verb for the same act at `Styler.ts:52`, and "styling surface" is already the package's term for the value.

Second break, same clause of the claim: `/home/user/fleet/console/src/core/types.ts:706` — `Represents a step's position in a sequence — …` restates `StepPosition` word for word. What right looks like: `Represents where one step sits in a sequence — the \`{ index, total }\` a {@link ReporterInterface.step} renders as a \`[2/5]\` prefix.`

Scope note on name repetition, so the Orchestrator can rule the wave's reach rather than inherit my judgment. The report at `/home/user/scaffold/tmp/units/voice/voice-console-report.md:14` records one name-drop rewrite (`width`). Many rewritten sentences still carry their symbol's name: `types.ts:34` `Color` → "Names a terminal color"; `:63` `Attribute` → "a text-style attribute"; `:74` `Style` → "text style as data"; `:524` `Alignment` → "the horizontal text alignment"; `:531` `BorderStyle` → "a box-drawing border style"; `Logger.ts:19`, `Reporter.ts:18`, `Spinner.ts:15`, `Retention.ts:4` and their interface twins. I rule those acceptable and require no change: each is the value's own domain term, no non-repeating wording exists without loss, and the unit brief's pilot lesson explicitly preserves a domain term that is the value's own name. `Styler.ts:6` and `types.ts:706` are different — a non-repeating wording exists, the package already uses it, and in the `Styler` case the repetition rides on a verb that is also wrong.

Everything else in the verb inventory fits: `Creates` for factories, `Renders`/`Formats`/`Stringifies`/`Pads` for pure helpers, `Checks whether` for guards (`helpers.ts:127`, `validators.ts`), `Reports whether` for boolean state members, `Returns` for copy-out accessors, `Names` for literal unions, `Maps`/`Lists` for records and arrays.

## 3. Boolean `@returns` reads `True if …; false otherwise` with the condition kept — CONFIRMED

All five rewrites keep their original condition verbatim apart from the mandated form: `src/core/errors.ts:35`, `src/core/helpers.ts:137`, `src/server/helpers.ts:41`, `src/server/validators.ts:20`, `src/server/validators.ts:44`.

A sweep of `@returns` across `/home/user/fleet/console/src` returns no remaining boolean return in another wording. The two `@returns` lines that mention `false` while returning rendered text (`src/core/types.ts:156`, `src/core/Styler.ts:96`) are not boolean returns and correctly stayed.

## 4. No already-conforming sentence rewritten; no `@example`, `@param`, `@remarks`, `@throws`, or later sentence touched — CONFIRMED

- Every removed line in the diff opens with an imperative or a bare noun phrase. None opened with a third-person `-s` verb.
- Blocks that already conformed are untouched and still conform: `src/core/factories.ts:18`, `:53`, `:99`, `:148`; `src/browser/factories.ts`; `ConsoleMethod` at `types.ts:4`; `WriterSet` at `types.ts:332`; `selectWriter` at `helpers.ts:150`; `ProgressReport` at `types.ts:1111`; `StreamWriteFunction` and `StreamWriteCallback` at `server/types.ts:91` and `:105`; `ESCAPE_PATTERN` and `CONTROL_PATTERN` at `constants.ts:144` and `:174`; `inferColumns`.
- The only tag lines in the diff are the five boolean `@returns` that claim 3 governs. No `@param`, `@remarks`, `@throws`, or `@example` line appears.
- Where a changed line also carries the start of the next sentence, that text rides through byte-identical: `ANSIRenderer.ts:27`, `types.ts:100`, `types.ts:320`, and the `Ignored once terminal.` tail on `ProgressInterface.update`.

Findings outside the claims:

## A. The guide now speaks the voice the source just left — no carrier named

`/home/user/fleet/console/guides/console.md` still describes the same exported symbols in exactly the two voices this wave eliminated from `src/`:

- `:46` `createStyler` — "Create the fluent `StylerInterface` …" (imperative)
- `:99` `renderBar` — "Render a determinate progress-bar string …" (imperative)
- `:51` `width` — "The VISIBLE width of a string …" (verbless)
- `:104` `meetsLevel` — "Whether a record at one `LogLevel` passes a logger gated at a threshold …" (the `Whether …` form the wave replaced)
- `:260` `isStreamTarget` — "Whether a value is a usable `StreamTargetInterface` …"

Measurement, reported with its run: ripgrep over `/home/user/fleet/console/guides/console.md` with the pattern `^\| \`[A-Za-z]+\`\s*\| (function|const|type|interface|class)\s*\| (The|A|An|Whether|One|Each|Every|Create|Render|Narrow|Format|Decode|Infer|Parse|Translate|Double|Remove|Pad|Repeat|Snapshot|Color|Stringify|Wrap|Options)\b` returns 93 matching surface rows.

Why it matters: the package now presents one voice to a reader in the editor and another to the same reader in its guide, about the same symbol. My lens is whether the guide reads as the package's current, self-contained human guide matching the experience the code presents; it no longer does. This is drift the campaign created.

Not the writer's defect. `/home/user/scaffold/tmp/units/voice/voice-console-brief.md:65` puts `guides/**` off-limits and the writer correctly stayed out. The gap is at dispatch: `.agents/orchestration.md` § Check the brief before you send it requires that where a brief scopes out the prose describing a mechanism it changes, the brief names the carrier. Neither the shared wave brief nor this unit brief names one.

What right looks like: a successor unit owning `guides/console.md` surface-table prose, dispatched before the wave ships, or an explicit recorded ruling that the guide's table voice is deliberately imperative and out of the wave's reach.

## B. Two terms for one concept across the options interfaces

`Configures {@link X}` at `src/core/types.ts:107`, `:239`, `:386`, `:460`, `:572`, `:593`, `:637`, `:673`, `:720`, `:860`, `:956`, `:1010`, `:1149` and `src/browser/types.ts:24`, against `Holds the options for {@link X}` at `src/server/types.ts:38` and `:160`.

Why it matters: AGENTS.md § Design laws, "One concept, one term". A reader scanning the options types reads the difference as meaningful and cannot find what distinguishes the two groups; nothing does. The split also hides the real reason the second form exists — it keeps the antecedent a trailing clause needs, which is precisely what failed at `types.ts:239` in claim 1.

What right looks like: adopt `Holds the options for {@link X} — …` everywhere. It closes the claim-1 break in the same pass and states the same fact. Keeping `Configures` instead is defensible only if the two server blocks get a self-contained first sentence, which costs more edits for less.

## C. Two terms for one concept across the default constants

Consecutive constants in one file, identical role, two verbs:

- `src/core/constants.ts:360` — `Sets the default {@link BorderStyle} the box / table renderers frame with when none is given — \`single\`.`
- `src/core/constants.ts:363` — `Sets the default cell {@link Alignment} … when none is given — \`left\`.`
- `src/core/constants.ts:366` — `Holds the default fill character {@link renderSeparator} draws its rule with — \`─\`.`

Same split at `:465` / `:472` (`Holds the default filled-cell glyph`, `Holds the default empty-cell glyph`) beside `:479` (`Sets the default visible cell count`), and at `:435` (`Holds the default spinner frame cycle`) beside `:457` (`Sets the default timer period`). `:494` gives `DEFAULT_THEME` "Holds the default {@link Theme}" while `:360` gives the structurally identical `DEFAULT_BORDER` "Sets".

Why it matters: same rule as finding B, and `Sets` is the weaker half of the pair — a deeply frozen constant sets nothing; the renderer reads it. The reader cannot derive which verb a given constant takes.

What right looks like: `Holds` for every constant that is a value, including the numeric defaults. Reserve `Sets` for nothing, or record the split's rule in one place if you keep it.

## D. Two openers for the two members of one event map, and a tense mix

`src/core/types.ts:1142` opens `Reports progress advancing — …` while its sibling two lines down at `:1144` opens `Fires after the bar reached its end via \`complete()\` …`. Both are event members of `ProgressEventMap`. `src/core/types.ts:851` uses `Fires on` beside `:853` and `:855` using `Fires after`, and `src/server/types.ts:151` / `:153` / `:155` repeat that pattern.

Separately, the `Fires after X was Y` form mixes a present-tense event with a past-tense passive clause: `types.ts:362` "Fires after a record was logged", `:1001` "Fires after a frame was produced", `:1003` "Fires after the internal timer was armed", `:1005` "Fires after the internal timer was cleared", `server/types.ts:153` "Fires after interception began".

Why it matters: the reader of two adjacent members reads the different opener as a different kind of fact. And `.claude/rules/writing.md` § Voice and actor names the software component that acts and puts it in the active present; `Fires after the internal timer was armed` hides the actor behind a passive the sentence did not need.

What right looks like: one opener per event member, present tense, active where an actor exists — `Fires when a record is logged (it passed the level gate) — the frozen {@link LogRecord}.`, `Fires when the spinner arms its internal timer (an inactive spinner's \`start()\`).`, `Fires on every advance — the clamped \`{ current, total }\` …`. This also removes the awkward `Reports progress advancing` at `:1142`.

## E. `should` survives in a first sentence the unit rewrote

`/home/user/fleet/console/src/server/helpers.ts:30` — `Infers whether one stream target should receive styled output.` The same block's rewritten `@returns` at `:41` correctly drops `should` ("True if output for the target retains styling …"), so one block now reads both ways about the same fact.

`.claude/rules/writing.md` § Substitutions bans `should` outright. The unit had this line open and conjugated `Infer` to `Infers` on it. Low cost to close: `Infers whether one stream target receives styled output.`

## Referral to the Orchestrator (I hold only the subjective lane; the Sol bench is dark, so there is no objective lane to address)

The unit's acceptance instrument is `voice-scan.mjs`, and the report at `/home/user/scaffold/tmp/units/voice/voice-console-report.md:82` records it emitting only `imperative`, `verbless`, and `returnsBad`. Nothing in that instrument tests the rule's second half, "never repeats the symbol's name", so acceptance criterion 2 cannot close that half mechanically and did not. Decide whether the wave's objective sentence is met in this package on the reading I gave under claim 2 — required for `Styler.ts:6` and `types.ts:706`, acceptable for the unavoidable domain terms — or widen the instrument. I make no ruling on the instrument itself; that is yours.

## Checker lane (PASS)

Per-claim verdicts for the voice-console TSDoc audit (checker lane).

Findings outside the claims:

Claim 1 — CONFIRMED. Every `-`/`+` pair in `/home/user/scaffold/tmp/units/voice/voice-console.diff` sits inside a `/** … */` block or `//` comment. A regex sweep for a changed line starting with a non-comment token (`^[+-]\t?[a-zA-Z]`, `^[+-]export`) over the full diff returns no hit, and manual review of every hunk (diff lines 1–1672) shows each changed pair is a JSDoc line beginning with `*`, `/**`, or a tab-indented `/** … */` member doc. No hunk touches a code token.

Claim 2 — CONFIRMED, with one observation. Every backtick token, `{@link …}`, and URL is preserved unchanged across the diff except: (a) the 5 boolean `@returns` rewrites to `True if …; false otherwise`, which drop the backticked `true`/`false` per the mandated form (`src/core/errors.ts:562`, `src/core/helpers.ts:620`, `src/server/helpers.ts:1508`, `src/server/validators.ts:1653,1668` in the diff); (b) the `Styler.style`/`enabled` and `StylerInterface.enabled` boolean-summary openers, which keep their backticked `false` token and add only the leading verb (`src/core/Styler.ts:240`, `src/core/types.ts:844`) — no token dropped there, so the boolean-summary exception is not even needed; (c) the `width` helper in `src/core/helpers.ts:592-593`, diff hunk `@@ -592,7 +592,7`: `The visible width of `text`` → `Measures how many visible columns `text` occupies`. This drops the plain-English word "width" that repeats the symbol's own identifier, matching the report's claimed name-drop rewrite. It is not a backticked token (the original never backticks "width"), so it falls outside claim 2's literal token-identity scope; recorded as an observation, consistent with the report's own accounting (1 name-drop rewrite). No other token, link, or URL changed anywhere in the diff.

Claim 3 — CONFIRMED. `/home/user/scaffold/tmp/units/voice/voice-console.status` lists 22 `M` entries, all under `src/browser/`, `src/core/`, or `src/server/`. A grep for `tests/|guides/|README|package.json|package-lock|.claude/|configs/` over the status file returns no match.

Claim 4 — CONFIRMED. A case-insensitive grep for the listed imperative verbs followed by a space or backtick, and for `@returns` followed by `Whether`/`` `true` ``/`true `, over `/home/user/fleet/console/src` returns 8 raw hits, none of which is a doc block's first line: `src/core/ANSIRenderer.ts:21`, `src/core/factories.ts:178,186` (inside `@example` fenced code, `return 42`/`return 'done'`), `src/core/Logger.ts:32`, `src/core/constants.ts:156`, `src/core/types.ts:20`, `src/server/factories.ts:105` (an `@remarks` bullet, "Create any server sink before installing a capture", verified at `src/server/factories.ts:100-105` — mid-list, not the opener), and `src/browser/helpers.ts:36`. All are mid-sentence or mid-comment occurrences. The `@returns` variant grep returns no hit. `/home/user/fleet/console/app` does not exist (`Glob` confirms), matching the report's claim that the sweep covers `src/` only.

Claim 5 — CONFIRMED on quoted evidence, non-authoritative. `/home/user/scaffold/tmp/units/voice/voice-console-report.md:65-71` quotes all five gates (`format:check`, `lint:check`, `check`, `build`, `test`) with exit code `0` each, and states the Orchestrator's landing chain is authoritative per the brief's own deviation contract. This checker did not independently re-run the gates (read-only lane); rule stands on the report's quoted evidence only, as the claim's rubric specifies.

Findings outside the claims: none. The diff, status, report, and brief are internally consistent; no scope violation, no dropped `@example`/`@param`/`@remarks`/`@throws` line, no code-token change found anywhere in the reviewed material.

## Orchestrator

Subjective claims 1 and 2 broke on the `ThemeOptions` appositive orphaned by dropping `Options`, on `Implements … styler` for a class with no `implements` clause, and on `StepPosition` restated. Ruled with the lane (fix-up brief `voice-console-fixup-brief.md`, builder on Sonnet): `Holds the options for {@link createTheme} — …`, `Builds the fluent, composable styling surface — …`, `Represents where one step sits in a sequence — …`. The domain-term names the lane accepted (`Color`, `Attribute`, `Style`, `Alignment`, `BorderStyle`, the class and interface twins) stand. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
