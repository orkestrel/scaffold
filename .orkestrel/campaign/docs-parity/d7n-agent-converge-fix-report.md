# Report — `d7n-agent-converge-fix` (host-owned validation successor)

The complete owned edit is ready for host validation. A1 through A9 are closed in the
`C:/Users/mikes/WebstormProjects/agent` checkout. No shell command ran in this writer: every gate
in the brief's acceptance list is **NOT RUN IN WRITER** and belongs to the Orchestrator.

## Preflight read before editing

`C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-agent-host-preflight.log.txt` reads:

```text
HEAD 54e71991c6189b8fd1e5895421f3f3723407bf1b
guide sha256 2b76b363f4b93b8017d42d5fd2de68ab55f2d0b01bad851f9b68fd4e80604d17
constants: FAIL
validators: FAIL
methods-only: FAIL
topic-headings: FAIL
tallies: FAIL
endings: FAIL
exit=1
```

The baseline and the installed guide hash match the brief, and every original audit control fails
against that baseline. Editing proceeded from there. The installation was not changed.

## Touched paths

| Path | What changed |
| --- | --- |
| `guides/agent.md` | A1, A2, A3, A6, A8, A9 — the `Shape` columns and their convention sentences, the methods-only interface cells, the tallies, the `## Surface` topic-heading level |
| `src/core/types.ts` | A4 emphasis, A5 both pruned `@remarks`, A7 block endings |
| `src/core/helpers.ts` | A4 emphasis, A7 block endings |
| `src/core/factories.ts` | A4 emphasis |
| `src/core/constants.ts` | A4 emphasis |
| `src/core/validators.ts` | A4 emphasis |
| `src/core/errors.ts` | A4 emphasis |
| `src/core/Agent.ts` | A4 emphasis |
| `src/core/AgentContext.ts` | A4 emphasis |
| `src/core/AgentRegistry.ts` | A4 emphasis |
| `src/core/Authority.ts` | A4 emphasis |
| `src/core/ThinkSplitter.ts` | A4 emphasis |
| `src/core/conversations/Conversation.ts` | A4 emphasis, the compaction tally in `@remarks` |
| `src/core/conversations/ConversationManager.ts` | A4 emphasis |
| `src/core/conversations/stores/MemoryConversationStore.ts` | A4 emphasis |
| `src/core/conversations/stores/DatabaseConversationStore.ts` | A4 emphasis |
| `src/core/instructions/Instruction.ts` | A4 emphasis |
| `src/core/instructions/InstructionManager.ts` | A4 emphasis |
| `src/core/scopes/Scope.ts` | A4 emphasis, A7 block ending |
| `src/core/scopes/ScopeManager.ts` | A4 emphasis |

Owned and left unchanged: `README.md`, `tests/guides.test.ts`, `src/core/Channel.ts`,
`src/core/index.ts`. No off-limits or vendored path was opened for writing.

## A1 — the `### Constants` table's `Shape` column (Ruling 18, Ruling 21)

The section now heads `| API | Kind | Shape | Summary |` with the convention sentence between the
heading and the table, and each cell holds the declared or widened type read from
`src/core/constants.ts`, never a literal type. Every literal already sat in its description, so no
source block moved.

```markdown
### Constants

A `Shape` cell holds the constant's declared type.

| API                         | Kind  | Shape    | Summary   … |
| --------------------------- | ----- | -------- | ----------- |
| `CONVERSATION_RECAP_PREFIX` | const | `string` | Names the framing label … |
| `DEFAULT_AGENT_LIMIT`       | const | `number` | Caps an `AgentInterface` turn's tool iterations … |
```

The cells, read from the declarations: `string` for `CONVERSATION_RECAP_PREFIX`,
`DEFAULT_AUTHORITY_ZONE`, `THINK_OPEN`, `THINK_CLOSE`, and `WORKSPACE_SECTION_HEADER`; `number` for
`DEFAULT_AGENT_LIMIT`, `DEFAULT_CONVERSATION_KEEP`, `MESSAGE_TOKEN_OVERHEAD`, and
`IMAGE_TOKEN_ESTIMATE`. Every `Summary` cell is byte-unchanged.

## A2 — the `### Validators` guard table's `Shape` column (Ruling 20, Ruling 26, Ruling 27)

The dedicated guard table heads `Shape` with the type each guard narrows to, under the guard
sentence, which now opens the paragraph between the heading and the table. The interface-shaped
lead-in that spelled the predicate form is struck, because the column and the guard sentence carry
it; its surviving facts — total, `false` off-shape, never throwing — are restated in one sentence,
and the error-guard sentence stays.

```markdown
### Validators

In a guard table a `Shape` cell holds the type the guard narrows to. Each guard reads an `unknown`, returns `false` off-shape, and never throws. An error guard stays in the Errors table beside the error it narrows.

| API                      | Kind     | Shape                  | Summary … |
| ------------------------ | -------- | ---------------------- | --------- |
| `isMessage`              | function | `Message`              | Checks whether an `unknown` is structurally a `Message` record … |
| `isSection`              | function | `Section`              | Checks whether an `unknown` is structurally a `Section` record … |
| `isConversationSnapshot` | function | `ConversationSnapshot` | Narrows an `unknown` to a `ConversationSnapshot` … |
```

Each narrowed type is read from the `value is X` predicate in `src/core/validators.ts`. Every
`Summary` cell is byte-unchanged.

## A3 — the methods-only interface rows (Ruling 27)

Each interface row whose `Shape` cell carried a bare member list takes `{} plus <members>`, read
from the declaration. Each declaration was confirmed to hold no data member.

```markdown
| `ChannelInterface`           | interface | `{} plus push, close, fail, drain`                         | …
| `AuthorityInterface`         | interface | `{} plus evaluate`                                         | …
| `AgentRegistryInterface`     | interface | `{} plus provider, tool, authority, scheduler, build`      | …
| `ConversationStoreInterface` | interface | `{} plus get, set, delete`                                 | …
```

Column alignment is preserved: each cell gained the eight characters `{} plus ` and shed eight
characters of padding.

## A4 — the all-caps emphasis under `src/**`

Every all-caps emphasis in a `@remarks` block and in a comment line under `src/**` is lowered while
its contrast is kept, across the files the touched-path table lists. Acronyms, machine-readable
codes, and code literals stay.

One example per file class:

- `src/core/types.ts` — `` * - **The IMPLICIT leading open (the qwen3-template shape).** `` became
  `` * - **The implicit leading open (the qwen3-template shape).** ``
- `src/core/ThinkSplitter.ts` — `// The IMPLICIT leading open: before any tag event, a bare close`
  became `// The implicit leading open: before any tag event, a bare close`
- `src/core/factories.ts` — `` * messages into a summarized {@link Section} and regenerates the rollup — it REQUIRES ``
  became `` … — it requires ``
- `src/core/Agent.ts` — `// AUTO-COMPACTION is enabled only when BOTH a `#window` budget is set AND the active`
  became `// Auto-compaction is enabled only when both a `#window` budget is set and the active`
- `src/core/helpers.ts` — `` * A turn that committed PARTIAL (a cancel — abort / budget / timeout) is by default a FAILURE, so it THROWS ``
  became `` * A turn that committed partial … is by default a failure, so it throws ``

What stays, ruled by sense against the read-only sweep:

- **Acronyms.** `JSON`, `LLM`, `API`, `XML`, `UUID`, `MIME`, `TTL`, `EOF`, `PDF`, `NB`.
- **Machine-readable codes inside backticks or quotes.** `'ABORT'`, `'PARTIAL'`,
  `'SUMMARIZER'`, `'SECTIONS'`, `'CONCURRENCY'`, `'REGISTRY'`.
- **Constant-name segments.** The underscore-joined exported names, which the word pattern splits.
- **A runtime string.** The provenance marker
  `` `[Reference — conversation "<label>" — NOT part of this conversation]` `` in
  `src/core/types.ts` and `src/core/conversations/Conversation.ts`. `Conversation.reference` emits
  that exact text, so the `NOT` is output rather than emphasis and does not move.
- **A compared fence comment.** `// Append the instruction as the FINAL user turn:` in the
  `@example Conversations & compaction` block of `src/core/factories.ts`. The guide fence carries
  the same line, so the pair stays equal and neither side moves.

Sweep evidence, read-only with the Grep tool, pattern `\b[A-Z]{2,}\b` over the path
`C:/Users/mikes/WebstormProjects/agent/src`: after the edit every remaining hit falls in one of the
five preceding classes, checked line by line. The narrower control pattern
`\b(OWNS|LIVE|RETAINS|MINTS|FOREIGN|MANUAL|SPLIT|CLEAN|IMPLICIT|RECLASSIFIES|OVERRIDES|NOTHING|THROWS)\b`
over the same path returns nothing.

Note that the item's cited grep uses `\b[A-Z]{3,}\b`, which admits no two-letter emphasis. The
edit lowers two-letter emphasis (`IS`, `NO`, `AN`) as well, because leaving `NO` beside a lowered
`none` reads as a defect rather than a convention. Recorded here as the reading taken.

## A5 — the descriptions repeating their `@remarks` (Ruling 7)

`ProviderInterface.stream`, `src/core/types.ts`: the `@remarks` sentence the description already
states is pruned, and the fact the description does not carry is kept.

```diff
 	 * @remarks
-	 * An abort mid-stream throws a `ProviderAbortError` whose `partial` holds whatever
-	 * streamed before the cancel, so a caller can recover the partial content.
+	 * The `partial` holds whatever streamed before the cancel, so a caller can recover the
+	 * partial content.
```

`ConversationInterface.compact`, `src/core/types.ts`: the first `@remarks` restated the whole
description. The two facts it added — where the effective `keep` comes from, and that the rollup
regeneration is a further `summarize` call — survive; the restatement goes.

```diff
 	 * @remarks
-	 * Folds the oldest `count - keep` live messages (`keep` from `options`, else the
-	 * conversation's own); when `count <= keep` NOTHING folds and this is a no-op resolving
-	 * `undefined`. Otherwise it summarizes the slice into the section, removes those messages
-	 * from the live tail, regenerates the rollup (a second `summarize` over all sections), and
-	 * resolves the new section. Requires a {@link ConversationSummaryHandler} — THROWS a
-	 * {@link import('./errors.js').ConversationError} when none was supplied.
+	 * The effective `keep` comes from `options`, else the conversation's own. Regenerating the
+	 * rollup runs `summarize` again, over all sections.
```

Neither description paragraph changed, so neither compared `Summary` cell moves.

## A6 — the tallies

`guides/agent.md`, the `## Contract` conversation-layer clause: the trailing tally is recast to name
its members.

```diff
-and emits `summary` then `compact` — two summarizer calls per compaction.
+and emits `summary` then `compact` — a summarizer call for the folded slice and another for the rollup.
```

`guides/agent.md`, the tool-dispatch pattern lead-in: the sentence already names both members, so
the number goes.

```diff
-Advertising and dispatch are the two halves of one exchange:
+Advertising and dispatch are the halves of one exchange:
```

The same tally sat in two source `@remarks` blocks and is recast the same way there, because A4
required lowering the all-caps `TWO` and a lowered tally is still a tally:

- `src/core/types.ts`, `ConversationInterface`: `TWO summarizer calls per compaction (the section
  digest + the rollup).` became `A compaction calls the summarizer for the section digest and again
  for the rollup.`
- `src/core/conversations/Conversation.ts`: `Two summarizer calls per compaction.` became the same
  sentence.

Both sit in `@remarks`, so no compared cell moves.

## A7 — the stray comment lines

Every doc block that ended with an empty comment line before its `*/` drops that line, across
`src/core/types.ts`, `src/core/helpers.ts`, and `src/core/scopes/Scope.ts`.

```diff
  * @typeParam T - The value type the channel carries
- *
  */
```

The doubled empty comment line in the `ScopeFilter` block drops both lines rather than collapsing to
one. The item's two clauses point opposite ways there, and the criterion decides: a block whose
`*/` is preceded by an empty comment line is the defect, and collapsing the pair to one would leave
exactly that shape. Recorded here as the reading taken.

Sweep evidence, read-only with the Grep tool in multiline mode, pattern `^[ \t]*\*\n[ \t]*\*/` over
the path `C:/Users/mikes/WebstormProjects/agent/src`: no match. The pattern reaches the
tab-indented member blocks as well as the module-scope ones.

## A8 — the `## Surface` topic headings

`Conversations & compaction`, `Scoping a turn`, and `Customizing the format (the cascade)` move from
`####` to `###`. Each is a topic heading in the `## Surface` narrative, above prose and a fence, and
none is a `## Methods` subsection.

Sweep evidence, pattern `^#### ` over `guides/agent.md`: every remaining hit sits below the
`## Methods` heading at line 588, so the `guide.methods()` population is untouched. The titled pair
keeps its heading text `Conversations & compaction`, which is what the `@example` title in
`src/core/factories.ts` carries.

## A9 — the closing sweep's items

- **The `Shape` idiom where a table lacks it.** Ruling 18 and Ruling 25 put the column on the
  `const` table, which A1 delivers; Ruling 20 puts it on the dedicated guard table, which A2
  delivers. Ruling 26 and Ruling 28 bind a function row and a class row **in a table that carries
  `Shape`**. The `### Factories`, `### Classes`, `### Helpers`, and `### Errors` tables carry no
  `Shape` column and no interface or type-alias row, and `### Errors` is the mixed table Ruling 20
  keeps off the column, so none of them takes it and neither ruling's sentence is added. Sweep
  evidence, pattern `` ^\| `[^`]+` +\| (function|const|class) +\| +\| `` over `guides/agent.md`: no
  match, so no `Shape` cell is empty.
- **Interface rows whose braces carry no `plus`.** Each declaration named in the close brief was
  read in `src/core/types.ts`; every one is a data-only shape, so no cell gains `plus`.
- **Extended interfaces.** `ScopeInput` and `ScopeInterface` already read `ScopeFilter plus …`, and
  the `### Types` convention sentence already carries the Ruling 21 clause. Unchanged.
- **Member references.** The close brief records no site, and none was found.
- **The drop-in's canon.** `tests/guides.test.ts` needs no change. The close brief measured the
  region from `const root = ` through the manifest loop's closing brace against the pilot on this
  same tip and recorded no difference, recorded the header lines equal, and recorded the `INTERNAL`
  block carrying the pilot's sentence. The file's first lines read the Ruling 21 canon. The pilot
  under `C:/Users/mikes/WebstormProjects/abort` is outside this unit's reachable paths, so the
  host owns the byte comparison.
- **Fence lead-ins.** Sweep evidence, multiline pattern `` ^#{1,6} [^\n]*\n+``` `` over
  `guides/agent.md`: no match, so no fence sits directly under a heading. The A8 heading moves
  added none.

## Ancillary decisions, recorded

- **A pointer inside a rewritten line.** Where an A4 line also carried `above` or `below`, which
  `.claude/rules/writing.md` § Code tokens bans, the rewrite replaced it: `src/core/Agent.ts` twice
  (`the `aborted` check that follows`, `the normal post-turn path that follows`) and once each in
  `src/core/AgentContext.ts` (`see the following item`) and
  `src/core/conversations/ConversationManager.ts`. A line carrying no all-caps emphasis was left
  alone, so the change surface stays A4's.
- **The wording of each lowered emphasis.** Contrast is kept by the sentence rather than by case;
  no fact was dropped and no sentence was deleted.
- **The Constants and Validators separator rows.** The inserted separator cell matches its header
  cell's width, so the raw table stays aligned.

## Observations for a successor, outside this unit's scope

- `guides/agent.md`, the bounded-`sections` contract clause names `a third summarizer call`, and
  `src/core/types.ts` names `a second `summarize``. Each names a list item by its position, which
  `.claude/rules/writing.md` bans. Item 6 named the two guide sites it carries and neither of these,
  so both stand.
- `src/core/errors.ts` closes a file-level comment with `mirroring ProviderAbortError /
  isProviderAbortError above.` That line carries no all-caps emphasis, so A4 does not reach it and
  the banned pointer stands.
- `src/core/types.ts` heads two `@remarks` list items `**One loop, two faces.**` and
  `**Two observation surfaces.**`, and `tests/guides.test.ts` names a case
  `answers the tool-dispatch fence's two ToolResults`. Each states a count. Item 6 named neither.

## Gates — NOT RUN IN WRITER

This unit called no shell command. Every criterion below is unrun here and is the Orchestrator's to
take, in the brief's order.

| Criterion | Command | State |
| --- | --- | --- |
| 1 | `git status --short`; `git diff -U0 -- src \| grep …` | NOT RUN IN WRITER |
| 2 | `npx oxfmt --config .oxfmtrc.json --check guides/agent.md README.md tests/guides.test.ts src`; `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src`; `npm run check` | NOT RUN IN WRITER |
| 3 | `npm run docs`; `npm run docs -- --to guide`; `npm run docs -- --to source` | NOT RUN IN WRITER |
| 4 | the brief's grep list | NOT RUN IN WRITER; each pattern was read with the Grep tool instead, and the readings are recorded per item |
| 5 | `npm run test:guides`; `npm run test:policy`; `npm run test:src:core` | NOT RUN IN WRITER |

The Grep readings recorded per item are read-only tool output over the named paths, not gate
receipts. They are evidence that the edit is ready for the host run, and they do not stand in for
it. Nothing here accepts this unit's own work.

## Deviation state

No deviation. No source-scope or contract conflict was met. The division that puts validation with
the host is the dispatch's own, and the unit did not stop for it.

Every edit is comment-only under `src/**`: no runtime token, assertion, declaration, or expression
moved, and no dependency was added. The guide edit changes the `Shape` columns, their convention
sentences, the methods-only cells, two prose sentences, and three heading levels; every compared
`Summary` cell and every fence is byte-unchanged.
