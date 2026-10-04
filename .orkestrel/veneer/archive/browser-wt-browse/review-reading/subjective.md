**Lane: subjective** (API shape, vocabulary, the copy a model reads, guide voice). I read the diff, the source at the tip, the brief, the report, the user's decisions in `browse.md` § Reading design, and `reading-design.md`. I ran nothing.

## Verdicts

**1. Names: HELD, with one referral.**
- `collectBrowserWords` uses `collect*`, which `names.md:102` defines as "gathers members into a collection", and it returns a `ReadonlySet`. That fits.
- `BrowserReadMatch` follows the `{Entity}` data form, and its members `offset` and `text` are one word each. It sits beside `BrowserReadResult` and `BrowserReadOptions`.
- `search`, `plain`, and `purpose` are the names the user and the Orchestrator chose (`browse.md:40`, `:47`). No `what` parameter remains in `src`.
- Referral to the Orchestrator: `names.md:91-104` does not list a `match*` prefix, and `matches*` is reserved for predicates (`names.md:95`). `matchBrowserText` repeats `matchBrowserOutline`'s non-predicate `match*`. `reading-design.md:303` raised this as a tension, and no ruling is recorded.

**2. Copy a model reads: HELD.**
- The descriptions of `read` and `plain`, the four `search` descriptions, and `BROWSER_TOOL_VIEW_FOOTER` match the brief's exact copy (`src/core/constants.ts:529-740`, `:456`).
- The tools have separate jobs: `read` is "to learn a fact" and `plain` is "for words to pass to wait or type".
- The footer "call look with words to find" names a real tool, and `look`'s `search` description opens with "Words to find". A call that sends `what` is refused with a message that names `search`.
- Advisory: "the lines that share them come first" promises every sharing line. The block lists only the top-scoring lines, and only at offset 0. That copy is fixed by the brief, so I make no ruling.

**3. Guide and README agree with the source: FAIL.**
- `guides/browser.md:3284-3289`: `journeys` with `search: 'place-order'` collects the words `place` and `order`. Both appear in the heading `place-order "Order the Alpine Kettle with a name"`, so `BrowserJourneyToolset.ts:300-311` puts `1 journey matches "place-order":` and `[0] place-order "…"` before the listing. The comment shows the listing without that block.
- `guides/browser.md:2979` and `:3000`: the source emits `call plain with offset END for more` and `The plain limit of LIMIT characters…` (`src/core/BrowserToolset.ts:821`, `:831`). The receipt table names only `read` (and `look`).
  - The error table at `:86` already names `plain`, so the guide contradicts itself.
- `guides/browser.md:2943-2947`: the receipt table has a row only for `look`'s block. Nothing covers `COUNT lines match "SEARCH":` / `1 line matches`, `COUNT tabs match`, or `COUNT journeys match`. The `SEARCH` placeholder is defined only as the parameter "a `look` call carried".
- `guides/browser.md:3541-3547`: the prose says "`tools/list` answered the 15 names", while the edited list now holds 17. This breaks the AGENTS.md § Writing rule against counting an open set.
- `guides/browser.md:3219`, `:3541-3562`: both fences are presented as quoting what the binary answered on 2026-10-01. They have been rewritten with `plain` and `search`, which that binary never served. `:3443` handles the same situation correctly by stating that the earlier argument name was used.

**4. Match block format: FAIL (one input).**
- The headings are consistent: `N elements|lines|tabs|journeys match "S":`, with the singular forms.
- `src/core/helpers.ts:349-350` reserves room for a later row by cutting the first row to `end = space - later.length - 2`, which can be 0. When the later row's length is within about 9 characters of `space`, the first row loses its prefix.
  - Example: limit 4,000, heading about 23 characters, so `space` is 1,975. Rows are `[812] …` (3,000 characters) and a second row of 1,973 characters.
  - The first row becomes `…`, with no offset at all.
  - A slightly shorter later row gives `[81…`, which a model reads as offset 81.
  - With a configured limit of 1,000, the band is later rows of about 462 to 471 characters, which is an ordinary Markdown paragraph length.
- Advisory: the heading counts every match while the block may show only a few rows, and nothing marks the omission.

## Findings outside the claims
- `src/core/types.ts:2937-2939`: the sentence is broken ("the page-backed tools, and … for a view-backed one"); "one" has no antecedent.
- `src/server/BrowserMCPServer.ts:36-38`: the vocabulary TSDoc leaves out `plain`, and also `forget`, which was missing before this change.
- `src/core/BrowserToolset.ts:719`: `search === undefined` can never be true, because `search` is always a string. The branch is dead.
- `src/core/BrowserToolset.ts:1192`: `#tabs` now drains the move note, which it did not do before. The guide does not mention it. Referred to the objective lane.
- Mechanical renames on page-tool calls no longer exercise the synthetic `purpose` parameter. Referred to the objective lane:
  - `tests/conformance.test.ts:135`: `adopted.execute({ search: 'cars' })`.
  - `tests/service/journey.test.ts` (around line 558): `checkout` with `search: 'the cart'`.
  - The `checkout` call in `BrowserToolset.test.ts`.
- `src/core/helpers.ts` (`deriveBrowserToolSchema`): a page tool that declares an optional `purpose` and requires something else is still skipped, even though nothing would be stripped from it. `purpose` is a common form field, for example "loan purpose". This was pre-existing with `what`. Referred to the objective lane and the Orchestrator.
- Advisory:
  - `README.md:57` uses `search: 'the form'`, which teaches a noise word that the guide's seed change removed.
  - `guides/browser.md:3443` still paraphrases the prompt as "`submit` to search", where the prompt itself now says "the site's search box".

## Attacked and held
- Journey heading offsets: every key `offsets.get` looks up is a line start, because `JSON.stringify` escapes `\r` and `\n` in the description and the scan matches whole lines.
- Continuation from a match offset within the same tool continues the retained reading. Switching projections recaptures and restarts at 0, as the guide's `:2941` states.
- `plain` is among the replay-hold observations and non-step tools (`constants.ts:431-436`).
- The guide's Summary cells for the added helpers and `BrowserReadMatch` equal their TSDoc. The reading fence's comments agree with the documented behavior. This is from reading only.
- `distill` prose at `guides/browser.md:1849-1851` and `BrowserReading.ts:65-88` agree.
- The bound figure is 6 600, with the measured 6 023 and 6 559 recorded in both the guide and the test.

## Required changes
1. `guides/browser.md:3285`: put `// 1 journey matches "place-order":` and `// [0] place-order "Order the Alpine Kettle with a name"` before the listing, or call with `search: ''`.
2. `guides/browser.md:2979`, `:3000`: name `plain` in the footer row and the limit-error row ("A `read` or `plain` result…", "(or `read` or `plain` in place of `look`)").
3. `guides/browser.md:2943-2947`: widen `SEARCH` and `MATCHED` to every tool that takes `search`. Add rows for `COUNT lines match "SEARCH":` with `[OFFSET] LINE` rows, `COUNT tabs match "SEARCH":`, and `COUNT journeys match "SEARCH":` with `[OFFSET] HEADING` rows, each with its singular form, and define `OFFSET`, `LINE`, and `HEADING`.
4. `guides/browser.md:3219`, `:3541`: drop the count of names. Either re-run and re-date both transcripts, or say that they were adapted to the vocabulary that replaced `what` and added `plain`. Replace `search: 'all'` at `:3562` with `''` or a word that matches.
5. `src/core/helpers.ts:349-350`: never cut the first row below its leading token. When the reservation would leave fewer characters than the first row's text up to its first space plus one, skip the reservation (the later row is then skipped as today).
6. `src/core/types.ts:2938`: write "`look`, `read`, `plain`, `click`, `type`, `press`, `navigate`, and `wait` for a page-backed toolset, and `look`, `read`, `plain`, `click`, `type`, and `wait` for a view-backed one".
7. `src/server/BrowserMCPServer.ts:36-38`: list `plain` and `forget` in the vocabulary.
8. `src/core/BrowserToolset.ts:719`: pass `search` directly and delete the dead conditional.

VERDICT: FAIL 3, 4