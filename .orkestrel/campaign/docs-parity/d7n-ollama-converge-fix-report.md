# Report — `d7n-ollama-converge-fix` (host-owned validation variant)

Owned edit complete against the clean committed baseline `98e9c3402f4ce7ac45c4d5b16b37da42399f9ca9`.
Preflight evidence read before editing: `scaffold/tmp/pass/d7n-ollama-host-preflight.log.txt` shows
that baseline, guide sha256 prefix `2b76b363`, and the audit controls `surface`, `shapes`,
`guide-text`, `provider-text`, `budget-text`, and `pointer-text` all FAIL at `exit=1`. The evidence
names the expected baseline, so the unit proceeded.

Shell gates are **NOT RUN IN WRITER**. The writer held only Read, Grep, Glob, Edit, and Write.

## Items

### O1 — the mixed `### Surface` table's `Shape` cells (Rulings 20, 26, 28)

- **Responsibility changed:** every function, guard, class, and constant row now carries a `Shape`
  cell; the convention paragraph now states the function, guard, class, and constant conventions.
- **Path:** `guides/ollama.md:62`, `:64-86`.
- **Decision:** each signature was read from its own declaration, not from prose.
  - Function rows hold the declared signature as a type literal, union arms escaped `\|`:
    `createOllama`, `mapMessages`, `buildResult`, `parseBody`, `extractContent`, `extractThinking`,
    `joinThinking`, `extractUsage`, `extractTools`, `extractArguments`.
  - The guard row `isOllamaHTTPError` holds `OllamaHTTPError`, the type it narrows to (Ruling 26).
  - `OllamaProvider` holds `ProviderInterface`, the interface its `implements` clause names.
    `OllamaHTTPError` extends `Error` and implements no package interface, so it holds its
    constructor signature `new (message: string, status: number, options?: OllamaHTTPErrorOptions)
    => OllamaHTTPError` (Ruling 28).
  - Constant rows hold the widened declared type — `string`, `string`, `number`, `number` — never a
    literal type (Ruling 21); the literal lives in the description, per O6.
  - The convention paragraph gained the brief's exact sentences after the interface sentence.
- **Interface rows and `plus`:** the closing brief listed `OllamaResponse`, `OllamaOptions`,
  `WireChatRequest`, and `OllamaHTTPErrorOptions` for a `plus` re-read. Each declaration was read:
  every member is a property declaration, including `OllamaOptions.fetch` and `OllamaOptions.headers`,
  which carry function *types* rather than call-signature (method-syntax) members. Under Ruling 15
  no `plus` is owed, and those cells stand unchanged in content.

### O2 — the lowercase sentence start

- **Responsibility changed:** the Contract invariant on think separation opens its sentence properly.
- **Path:** `guides/ollama.md:112`.
- **Decision:** `. either way` reads `. Either way`. The sentence is guide body prose, not a compared
  cell, so no `--to guide` direction is owed for it. The mid-sentence `either way` at `:10` follows a
  semicolon and stands.

### O3 — the all-caps emphasis

- **Responsibility changed:** emphasis no longer rides on capitalisation; the contrast is carried by
  the words themselves.
- **Paths:** `src/server/OllamaProvider.ts` (class remarks, constructor comments, `format` getter
  block, `generate` and `stream` comments, `#deltas`, `#requestHeaders`, `#body`),
  `src/server/types.ts` (`WireChatRequest.format`, the `OllamaOptions` remarks, and its `think`,
  `headers`, and `format` members), `src/server/factories.ts:65`.
- **Decision:** the sweep `\b[A-Z]{3,}(-[A-Z]{2,})?\b` was run over `src`, `guides/ollama.md`, and
  `README.md`, and every hit was ruled individually.
  - **Lowered as emphasis:** `CONFIGURABLE`, `NATIVELY`, `EITHER`, `CLEAN`, `AND`, `DEFAULT`,
    `DISPLAYED`, `DISPLAY`, `BOUND`, `METHOD`, `EXPOSE-ONLY`, `NEVER`, `NOT`, `PROVIDER-DEFAULT`,
    `BEATS`, `BEATEN`, `OPTIONAL`, `SAME`, `IMPLICIT`, `ASSEMBLED`, `RECLASSIFIES`, `CHARS`,
    `LINES`, `RETURNS`, `PRIMARY`, `TOP`, `ADDS`, `PER-CALL`, `WITHOUT`, `OWN`, `CONTEXT`, `YOUR`.
    `CHARS` and `LINES` were spelled out to `characters` and `lines`. The two-letter `IS` beside a
    lowered `NOT` was lowered with it so the contrast pair reads consistently.
  - **`NOTE:` dropped rather than lowered** in `types.ts`, because the clause it labelled is a
    required fact: `.claude/rules/writing.md` § Structure keeps such a fact in the main flow instead
    of behind a notice label. The sentence now runs on directly.
  - **Ruled permitted and left standing:** `HTTP`, `URL`, `POST`, `LLM`, `API`, `JSON`, `NDJSON`,
    `XML`, `SDK`, `ESM`, `CJS`, `MIT`, `UTF` (in `UTF-8`), the file names `README`, `AGENTS`, and
    `LICENSE`, and the backticked Modelfile directive `` `PARAMETER think false` `` at
    `guides/ollama.md:112`, which is a code token quoted as itself.
  - **`README.md` needed no edit.** Every hit there is an acronym or a file name.
  - No description paragraph that the equality gate compares was touched by this item, so it owes no
    `--to guide` direction. The four descriptions that did move belong to O6 and are converged there.

### O4 — the test prose

- **Responsibility changed:** the comments point by relation rather than by page position, and the
  causal conjunction is the permitted one.
- **Paths:** `tests/service/budget.test.ts:176`, `tests/service/tools.test.ts:356`,
  `tests/service/lifecycle.test.ts:179`, `tests/service/compaction.test.ts:226`,
  `tests/service/OllamaProvider.test.ts:156`, `tests/setup.test.ts:140`.
- **Decision:** `since the source` reads `because the source`; each `above` reads `preceding`. No
  assertion, fixture, identifier, or control flow moved.
- **Recorded decision on `tests/setup.test.ts:140`.** The pointer there sits inside the message
  string of an unreachable `throw new Error(...)` narrowing guard, not inside a comment. The site is
  named by the fix brief and its criterion, and the host brief requires runtime tokens and assertions
  preserved. Both hold if only the pointer word changes, so `above` reads `earlier` and nothing else
  on the line moved. Nothing reads that message: the string occurs once in the repository, and the
  case's own assertion `expect(value.message).toBe('aborted')` is untouched. Recorded rather than
  stopped, as an ancillary wording matter.

### O5 — the opening sentence

- **Responsibility changed:** the paragraph names what the provider is before what an Agent does.
- **Path:** `guides/ollama.md:8`.
- **Decision:** the brief's sentence was taken verbatim: "This provider lets an Agent run against a
  real model on `localhost` — one small local model, no cloud dependency, and no API key." The
  blockquote tagline at `:3-6` was not touched, so the README pitch equality is undisturbed.

### O6 — the stranded literals (Ruling 18)

- **Responsibility changed:** each constant's description names its literal beside the noun the
  literal values, instead of trailing it at the sentence end.
- **Paths:** `src/server/constants.ts:3-6`, `:9-12`, `:20-23`, `:26-28`, and the paired
  `guides/ollama.md` Summary cells at `:70`, `:71`, `:72`, `:77`.
- **Decision:** the writer cannot run the seed, so each moved description and its guide Summary cell
  were updated together and by hand, in the form `findDrift` compares — whitespace collapsed and
  `{@link OllamaHTTPError}` written as `` `OllamaHTTPError` `` on the guide side.
  - `DEFAULT_OLLAMA_URL`: "Names the local Ollama daemon base URL, `'http://localhost:11434'`,
    assumed when `OllamaOptions.url` is omitted."
  - `DEFAULT_KEEP_ALIVE`: "Names how long the model stays resident after a call — `'5m'` when
    `OllamaOptions.keepAlive` is omitted, Ollama's own `keep_alive` default, expressed as a duration
    string."
  - `DEFAULT_PROVIDER_TIMEOUT`: "Names the per-call deadline in milliseconds, `120_000`, when
    `OllamaOptions.timeout` is omitted — generous enough that a cold model load does not trip it."
  - `MAX_ERROR_BODY_LENGTH`: "Names the character cap, `2048`, on how much of a non-OK response body
    is incorporated into a thrown {@link OllamaHTTPError}'s message."
  - **Ancillary decision.** The `DEFAULT_KEEP_ALIVE` wording places the literal after the noun phrase
    it values and behind an em dash rather than inside a comma pair. That phrasing also holds the
    `Summary` column at the width the file already carries, so no other row's `Summary` padding
    moved. Every fact and the `@remarks` blocks were kept.

### O7 — the drop-in's header (Ruling 21)

- **Responsibility changed:** the header states the canonical sentence about the executed section.
- **Path:** `tests/guides.test.ts:3`.
- **Decision:** the struck clause "and are the only part a sibling package changes" was replaced by
  the canonical "as is the executed section that closes the file." The closing brief recorded the
  region from `const root = ` through the manifest loop's closing brace as already identical to the
  pilot's, and that region was not touched. The pilot file sits outside this writer's working
  directories, so the canonical text was taken from Ruling 21, which states it verbatim, and from
  the diff the closing brief recorded.

### O8 — the package name

- **Responsibility changed:** the specifier reads as a code token.
- **Path:** `guides/ollama.md:119`.
- **Decision:** `(from @orkestrel/agent)` reads ``(from `@orkestrel/agent`)``.

### O9 — the unresolvable `{@link NDJSONParser}`

- **Responsibility changed:** the tag no longer names a symbol the file does not import.
- **Path:** `src/server/OllamaProvider.ts:63`.
- **Decision:** the file imports `createNDJSONParser`, so the tag was dropped and the imported symbol
  is named as a code token followed by a noun: "the `createNDJSONParser` parser". Keeping a `{@link}`
  tag was rejected because the symbol is a factory reached through the package barrel rather than a
  declaration in scope here; naming it as a code token is the form Ruling 21's sibling guidance and
  `.claude/rules/writing.md` § Code tokens both permit. Ancillary, and recorded.

### O10 — the closing sweep's carried items

- **`#` links.** The closing brief listed no `{@link Owner#member}` or `{@link #member}` site. A
  re-read confirms none exists, and none was introduced. Nothing to do.
- **Fence lead-ins.** The closing brief listed no fence sitting directly under a heading. Verified
  again after the edit with a multiline sweep for a heading followed by a fence, with and without an
  intervening blank line: neither form appears in `guides/ollama.md`. `README.md` fences stay under
  their headings untouched, per Ruling 24.
- **`Shape` idiom.** Covered under O1, including the `plus` re-read that came back owing nothing.

## Table geometry

The `Shape` column had to widen to admit the signatures, so the header, the separator, and every row
were re-padded. The writer cannot run a formatter, so the widths were computed from the widest cell
and then **verified read-only** with anchored regex over the file rather than by eye.

- Measured before the edit: API `26`, Kind `9`, Shape `84`, Summary `171`.
- Written after the edit: API `26`, Kind `9`, Shape `115`, Summary `171`.
- Shape `115` is set by the `buildResult` signature cell, which fills the column exactly.
- Summary stayed at `171`, so no row's Summary padding moved except the constants rows whose text
  changed under O6.
- Verification: the anchored pattern `^\| .{26} \| .{9} \| .{115} \| .{171} \|$` matches the header,
  the separator, and every data row of the table, with none left over and none missing.

`npx oxfmt --config .oxfmtrc.json --write` remains the host's propagation step and is authoritative
over this hand alignment.

## Criteria checkable without a shell

Run read-only through the search tool, over the paths named:

- Empty `Shape` cell sweep `^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ` over
  `guides/ollama.md` — prints nothing.
- `A function row's \`Shape\` cell holds its signature` over `guides/ollama.md` — present, and
  present once.
- `\. either way` over `guides/ollama.md` — prints nothing.
- `from @orkestrel/agent)` over `guides/ollama.md` — prints nothing.
- `{@link NDJSONParser}` over the repository — prints nothing.
- `, since the source` over `tests/service/budget.test.ts` — prints nothing.
- `\babove\b` over `tests/setup.test.ts`, `tests/service/tools.test.ts`,
  `tests/service/lifecycle.test.ts`, `tests/service/compaction.test.ts`, and
  `tests/service/OllamaProvider.test.ts` — prints nothing.
- `\b(CONFIGURABLE|NATIVELY|EITHER|CLEAN|WITHOUT|DISPLAY|OPTIONAL|CONTEXT)\b` over `src` — prints
  nothing.
- `\b[A-Z]{3,}(-[A-Z]{2,})?\b` over `src`, `guides/ollama.md`, and `README.md` — every surviving hit
  is an acronym, a file name, or the backticked Modelfile directive, each ruled in O3.
- `tests/guides.test.ts` lines 1 to 3 carry Ruling 21's canonical header text.
- Heading-then-fence sweep over `guides/ollama.md` — prints nothing.

## NOT RUN IN WRITER

Every shell gate belongs to the host. None was run here, and none is claimed:

- `git status --short`, and the `git diff -U0 -- src tests` comment-only filter
- `npx oxfmt --config .oxfmtrc.json --write` and `--check`
- `npx oxlint --config .oxlintrc.json --deny-warnings tests src`
- `npm run check`
- `npm run docs`, and its `--to guide` and `--to source` directions
- `npm run test:guides`, `npm run test:policy`, `npm run test:src:server`
- The `diff` of `tests/guides.test.ts` lines 1 to 3 against the pilot, and the drop-in region diff

The host must run the propagation before the check gates, because the table re-padding and the paired
description edits are exactly what those directions settle.

## Scope honesty

- **Written:** `guides/ollama.md`, `src/server/constants.ts`, `src/server/types.ts`,
  `src/server/factories.ts`, `src/server/OllamaProvider.ts`, `tests/guides.test.ts`,
  `tests/setup.test.ts`, `tests/service/budget.test.ts`, `tests/service/tools.test.ts`,
  `tests/service/lifecycle.test.ts`, `tests/service/compaction.test.ts`,
  `tests/service/OllamaProvider.test.ts`.
- **Not written:** `README.md` (no edit owed), `guides/README.md`, `package.json`,
  `package-lock.json`, `tests/policy.test.ts`, `tests/config.test.ts`, every vendored file,
  `src/server/errors.ts`, `src/server/helpers.ts`, `src/server/parsers.ts`, and `src/server/index.ts`.
- Source changes are comment and doc-block text only. No code token, signature, identifier, export,
  assertion, or fixture moved. The one string literal touched is the unreachable error message
  recorded under O4.
- The retained partial diff was not used as a patch; it was read as wording evidence only.
- The installed guide artifact was not changed.

## Observations for a successor, outside this unit's items

Recorded against the capability that owns them rather than reopened here:

- `src/server/OllamaProvider.ts` calls the splitter "the defensive guarantee" in the class remarks,
  and the `generate` comment repeats "the splitter is the guarantee". `.claude/rules/writing.md`
  § Claims and time refuses `guarantee` as a claim about behavior. O3 named capitalisation only, so
  the word stands.
- `tests/service/scopes.test.ts:19` carries a causal `since`. O4's site list did not name it and the
  file is outside the owned scope.
- All-caps emphasis survives in test prose — among others `SUM`, `NO`, `DEFAULT`, `MANDATES`,
  `THROUGH`, `OBEYS`. O3's sweep scope was `src`, `guides/ollama.md`, and `README.md`, so `tests`
  was never in range.
- `tests/setupService.test.ts:195` reads "a whole number of tokens above zero". That `above` is
  comparative rather than a pointer, so it is permitted and was left alone.

## Deviation state

**No deviation.** No gate outside the owned files was observed red, no `Shape` cell resisted Rulings
26 or 28, and no scope or contract conflict arose that the deviation contract reserves for a stop.
The `tests/setup.test.ts:140` string and the `createNDJSONParser` wording were both ancillary
matters; each was decided and recorded rather than escalated.

Returned for host validation and independent review.
