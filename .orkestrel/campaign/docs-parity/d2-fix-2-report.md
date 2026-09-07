# Unit report — D2-fix-2, `@orkestrel/guide` at `/home/user/fleet/guide`

Done. Every edit H1 to H7 landed and every acceptance criterion is green. `implementer`, Opus 5,
subjective lane. Decisions beyond the clauses under **Edits, exact** are recorded under
§ Decisions: the export `extractBodyLines`, and the routing of `extractExampleMethods` and
`extractExamples`, which the brief did not name.

## The edits

**H1. One key grammar.** `collectKeys(lines: readonly SourceLine[]): ReadonlyMap<SourceLine, string>`
at `src/core/helpers.ts:2015`, doc block `:1987-2014`, exported beside `collectSummaries`
(`:1951`). It keys every column-zero export head by `computeSymbolKey` and every one-tab callable
member inside an owner by `Owner.member`, the owner opening at a column-zero `export class` or
`export interface` head and closing at the first column-zero `}` or at any other column-zero
declaration head.

Every reader now reads that map and projects its own part out of it:

| Reader | Line | What it projects |
| --- | --- | --- |
| `extractExports` | `src/core/helpers.ts:1086` | The declaration keys, split at the one space |
| `extractExamples` | `:2103` | The declaration keys narrowed to `function ` |
| `extractMemberMethods` | `:1301` | The member keys, split at the dot |
| `extractExampleMethods` | `:2143` | The member keys, split at the dot |
| `locateComment` | `:2864` | The whole map, matched against the caller's key |

**How `extractExports` derives the keyword from the shared match.** A declaration key is
`computeSymbolKey`'s own `${keyword} ${name}` (`src/core/helpers.ts:691`), and a name is `\w+`, so
the key carries exactly one space and splitting there returns the pair that built it:
`const space = key.indexOf(' ')`, `key.slice(0, Math.max(space, 0))` for the keyword and
`key.slice(space + 1)` for the name (`:1093-1100`). `isExportKeyword` then narrows that string to
`ExportKeyword`, which is the only guard left in the loop and is reachable rather than dead: a
member key carries no space, so its keyword reads empty and that guard is what drops it. No second
head pattern excludes it, and the map value stays a bare string — a record carrying `keyword` and
`name` beside the key would store what the key already derives, which `AGENTS.md` § Design laws
refuses under **Derive state**.

`locateComment`'s TSDoc now describes what the code does (`src/core/helpers.ts:2833-2837`): the
record `collectKeys` gives the key, that one grammar's map, and no head pattern, member pattern, or
owner-close rule of its own.

Cases. `describe('extractBodyLines')` at `tests/src/core/helpers.test.ts:3922` and
`describe('collectKeys')` at `:3948`, over the D1 control fixtures and the member fixture: an
overload set keying one entry per record, a blank-line-separated declaration, a head inside a
template literal, a re-export-only barrel, the member fixture with its owner closed at the brace,
an owner closed by a head carrying another keyword, a generator marker stripped, the class example
the doc block itself states, and the keyword and member name each reader splits back out.

Corpus-scale member control: `locates the block behind every documented member this package ships`
(`tests/src/core/helpers.test.ts:4131`), beside the declaration-side control
`locates the block behind every summary this package ships` (`:4107`). For every `Owner.member` key
`extractDeclaration` with `extractMemberMethods` reports over this package's own `src/`, it requires
`locateComment`'s located block to carry that member's summary, and it requires the population to
clear `MEMBER_FLOOR` (`:3009`). The run that set the floor read 16 such members.

Guide: the `extractBodyLines` and `collectKeys` rows at `guides/guide.md:103-104`; the grammar's
owner stated in the reader prose at `:429-435` and `:446-448`; the `## Tests` bullet extended at
`:799`. The guide's member-grammar regex at `:448` was restated to the regex the code runs
(`^\t(?:async )?\*?(\w+)\??(?:<.*>)?\(`); the text it replaced spelled the optional marker and the
type-parameter group in the wrong order.

The tip's cases for the readers stay green with no case weakened: `test:src:core` went 574 → 587,
and no case was removed or relaxed.

**H2. `spliceSpan`'s parameter.** `src/core/helpers.ts:2445-2446` — the `@param span` names both
producers, the region `MarkdownInterface.span` reports for a markdown node or the one
`locateComment` reports for a doc block.

**H3. The sentence.** `src/core/helpers.ts:1697-1699` — "A summary that needs one of those
constructs takes another shape: name the construct in prose rather than expecting the comparison to
converge it."

**H4. `below`.** `tests/src/core/helpers.test.ts:2953` takes `following`. The sweep found one more
pointer in the owned files, `tests/src/core/helpers.test.ts:2780`, recast the same way, and one
`above` introduced by this round's own comment at `:4126`, recast to `preceding`. The sweep and its
result are under § Criteria, criterion 1.

**H5. `extractBlocks` and `extractSummary`.** `tests/src/core/helpers.test.ts:2972` and `:3011`,
with every call site renamed.

**H6. The delimiter set on its own terms.** `src/core/helpers.ts:1684-1686` states one backtick
per side, no inner backtick, no adjacent backtick, and the `buildCell` appositive is gone. The
guide's own clause at `guides/guide.md:346` gained `no adjacent backtick`, which it lacked, so the
guide and the doc block now state the same set. That guide edit is this round's, recorded here
because H6 named the guide as the wording to follow rather than as a site to change.

**H7. The report.** This document. The citations and the cache search follow.

## The H7 citations and the cache search

- **The over-length token sentence** is `src/core/helpers.ts:1721-1723` at the state
  `d2-fix-report.md` described, which is the correction that report owed for its `:1727`. At this
  round's tree the same sentence sits at `src/core/helpers.ts:1730-1732`: "Every run of whitespace
  separates words, and a word longer than `width` takes its own line rather than being split, so a
  long code token or URL survives the wrap intact."
- **The transcription guard** is `tests/guides.test.ts:401` —
  `it('carries the caller-obligation sentence the round trip proves', ...)`. That file is unchanged
  this round, so the line holds at both states, and `d2-fix-report.md`'s `:404` in criterion 4 was
  the miscite.
- **The Vitest cache sentence is backed, and it stands.** The searches and their results:

```text
$ ls -d node_modules/.vite* node_modules/.vitest
ls: cannot access 'node_modules/.vitest': No such file or directory
node_modules/.vite-temp
(exit 2)

$ find node_modules -maxdepth 2 \( -name ".vite*" -o -name ".vitest*" \) -print
node_modules/.vite-temp

$ find node_modules/.vite-temp -type f | wc -l
0

$ grep -rl "probe" node_modules/.vite-temp
(no output, exit 1)

$ find / -xdev -maxdepth 6 -type d \( -name '.vitest*' -o -name 'vite' -path '*cache*' \)
(no output)
```

  `node_modules/.vitest` does not exist and `node_modules/.vite-temp` exists carrying no file, so no
  Vitest cache names a probe path. Every test script in `package.json` passes `--no-cache`, which is
  why: the `probe` project's run wrote none. The rest of the probe disclosure rests where the
  objective lane ruled it sufficient — the whole-tree `*probe*` search, the absence of `tmp/probe/`,
  and the ignored-path plus `git log --diff-filter=D` pair.

## Decisions

**A second export, `extractBodyLines`** (`src/core/helpers.ts:1983`, doc block `:1963-1982`).
`collectKeys` keys a member to the owner head enclosing it, and `extractMemberMethods` and
`extractExampleMethods` each receive a declaration's body lines, which carry no head. Both therefore
read the body inside an owner head, and that expression appears in each of them, so
`AGENTS.md` § Design laws ("Centralize any pattern repeated twice", "Export and test reusable
logic") places it in `helpers.ts` as an export with its own cases rather than duplicated in each
reader's body. Its one boundary is documented and pinned: a column-zero `}` among the body lines
closes the supplied head, and a body `extractDeclaration` returns carries none because that reader
ends a body at the first one.

**`extractExampleMethods` and `extractExamples` were routed too, and the brief named neither.**
H1's stated outcome is that the export-head pattern, the member pattern, and the owner-close rule each exist once in the file, and routing only
`extractExports`, `extractMemberMethods`, and `locateComment` would have left the member pattern in
`extractExampleMethods` and a second `^export` head in `extractExamples`. Both now read
`collectKeys`. `extractExamples`' narrower `function`-only population is preserved by narrowing the
key to the `function ` prefix rather than by a second regex; the set of names is identical, because
the wide head regex reports `function` for exactly the heads the narrow one matched.

**The control fixtures were hoisted to one copy** (`tests/src/core/helpers.test.ts:2848-2911`).
`OVERLOADS`, `SEPARATED`, `TEMPLATE`, and `BARREL` were declared identically in
`describe('the doc-block reader against the parser')` and again in `describe('locateComment')`, and
`MEMBERS` in the latter. The key readings and the locator must meet the same text to be comparable,
so the fixtures moved to module scope and both describes read the one copy.

## What each new control catches

Mutations planted in `src/core/helpers.ts`, each restored by the exact reverse edit in the same
run; the file's SHA-256 is `75db785ed322d8862d11a0e14cc7f9af5975e4e9d7759e357931c4e4c46afb91`
before and after every one.

| Mutation | `npm run test:src:core` | What reddened |
| --- | --- | --- |
| baseline | `586 passed (586)` | — |
| A: the member key drifts (`Owner.memberx`) | `51 failed \| 535 passed (586)` | The whole member-reader family: `extractMemberMethods`, `extractExampleMethods`, `Source`'s methods and examples, `Guide`'s bijection matrix, `findDrift`, the new `extractBodyLines` and `collectKeys` cases, and `locateComment`'s member cases |
| B: the owner never closes at a column-zero brace | `1 failed \| 585 passed (586)` | `leaves a member past a column-zero brace unkeyed, because that brace closes the head` |
| C: the locator stops walking back to the block opener | `9 failed \| 577 passed (586)` | Every `locateComment` case, including both corpus controls — `locates the block behind every summary this package ships` and `locates the block behind every documented member this package ships` |
| D: the locator keeps the first span a run opens instead of the last | `586 passed (586)` | Nothing — flagged claim 2 |

Mutation A is the drift the audit named, and it reddens every reader of the member key. Mutation B
is the owner-close rule, which only the new `extractBodyLines` case reaches. Mutation C is what the member
corpus control exists for: a locator that returns a region that is not the member's whole block. The
totals are from runs against the test file this round ships, before the final case at
`tests/src/core/helpers.test.ts:3982` was added, so the baseline reads 586 rather than 587.

## Criteria, in the brief's order

**1. The greps.** Each prints what the criterion requires.

```text
$ grep -n -F '^export (?:async )?' src/core/helpers.ts
2020:		const head = /^export (?:async )?(function\*?|class|const|interface|type) (\w+)/.exec(line.code)

$ grep -n -F '^\t(?:async )?\*?(\w+)' src/core/helpers.ts
2032:		const member = /^\t(?:async )?\*?(\w+)\??(?:<.*>)?\(/.exec(line.code)?.[1]

$ grep -n -F "line.code === '}'" src/core/helpers.ts
2028:		if (line.code === '}') {

$ grep -n "export function collectKeys" src/core/helpers.ts
2015:export function collectKeys(lines: readonly SourceLine[]): ReadonlyMap<SourceLine, string> {

$ grep -rn "readBlocks\|readSummary\|below" tests/src/core/helpers.test.ts
(no output, exit 1)

$ grep -rniE "\b(above|below)\b" src/core/ guides/guide.md tests/src/core/ tests/guides.test.ts
(no output, exit 1)
```

`src/core/helpers.ts` carries sibling sites textually near these patterns that are no copy of
them. They are named here rather than hidden behind a grep tuned to exclude them:

- `:1273` — `if (projected[close] !== '}') continue`, `extractDeclaration`'s body terminator. It
  answers a different question, where the body slice ends, and it cannot consume `collectKeys`'s
  map, which reports keys per record and no body boundary.
- `:1142` — `/^(?:async )?(function\*?|class|const|interface|type) (\w+)/`, `extractHidden`'s
  documented non-`export` mirror of the same declaration-keyword population.

**2. Formatter, lint, typecheck.** Exit 0, 0, 0.

```text
$ npm run format:check   → exit 0; "All matched files use the correct format." (80 files)
$ npm run lint:check     → exit 0, no diagnostic
$ npm run check          → exit 0 (root project and configs/src/tsconfig.core.json)
```

**3. `npm run test:src:core`.** Exit 0.

```text
 Test Files  8 passed (8)
      Tests  587 passed (587)
```

Baseline at the D2-fix state was `574 passed (574)`, measured in this checkout before any edit. The
`collectKeys` cases (`tests/src/core/helpers.test.ts:3948-4016`), the `extractBodyLines` cases
(`:3922-3946`), and the corpus-scale member control (`:4131`) are present and green, and the tip's
reader cases are unchanged.

**4. `npm run test:guides`.** Exit 0.

```text
 Test Files  1 passed (1)
      Tests  51 passed (51)
```

Baseline at the D2-fix state was `51 passed (51)`; this round adds no case there. The `collectKeys`
row at `guides/guide.md:104` is load-bearing rather than decorative: removing that one row and
re-running gives `1 failed | 50 passed (51)` on
`Guide > documents every barrel export`, with
`AssertionError: expected [ 'function collectKeys' ] to deeply equal []`. The guide was restored
byte-identically after that reading.

**5. Observation — `npm test` as a whole.** Exit 0.

```text
test:src     Tests  587 passed (587)
test:policy  Tests   77 passed (77)
test:config  Tests  111 passed | 1 skipped (112)
test:setup   Tests    7 passed (7)
test:guides  Tests   51 passed (51)
```

The one skip is pre-existing at the D2 state and unchanged.

## Tree state

`git status --short`:

```text
 M guides/guide.md
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/guides.test.ts
 M tests/src/core/helpers.test.ts
```

`git diff --stat`:

```text
 guides/guide.md                |  230 +++++--
 src/core/constants.ts          |   16 +
 src/core/helpers.ts            | 1085 ++++++++++++++++++++++++++++---
 src/core/types.ts              |    4 +-
 tests/guides.test.ts           |   60 ++
 tests/src/core/helpers.test.ts | 1399 ++++++++++++++++++++++++++++++++++++++--
 6 files changed, 2594 insertions(+), 200 deletions(-)
```

That stat is cumulative over D2, D2-fix, and this round against the committed base, which is the
evidence limitation the round-2 objective lane recorded as its finding 4. This round moved
`guides/guide.md`, `src/core/helpers.ts`, and `tests/src/core/helpers.test.ts` only;
`src/core/constants.ts`, `src/core/types.ts`, and `tests/guides.test.ts` carry earlier rounds' work
untouched. Nothing outside the owned set was written. Nothing was committed, built, or installed. No
dependency was added. No discard-class git command ran.

## Flagged claims

1. **`extractBodyLines` is a public export this round adds, and H1 named only `collectKeys`.** Its
   reason is under § Decisions and its guide row is at `guides/guide.md:103`. Judge it there; if it
   is refused, the alternative is the same `extractSourceLines` call written out in both
   `extractMemberMethods` and `extractExampleMethods`.
2. **`locateComment`'s "the authoritative span is the last one the run opens" is unproven.**
   Mutation D reverses that rule and the whole suite stays green, so no case discriminates the first
   opener of a contiguous JSDoc run from the last. The claim sits in a comment at
   `src/core/helpers.ts:2890-2892` and is D2-fix's, not this round's; the shape that would reach it
   is a doc block immediately followed by another, with no code line between them. I recorded it
   against `locateComment` for the next change rather than reopening this one's scope.
3. **The corpus member control cannot catch a key drift that moves the member reader and the
   locator together.** Mutation A renames the member key in `collectKeys`, and because
   `extractMemberMethods` reads the same map, the control's expected key moves with it and the
   control stays green — the reds mutation A produces elsewhere are what catch it. What the control
   does catch is a locator that returns the wrong region for a member, which is mutation C. That is the honest reach of a control built on one shared grammar, and it is
   why the mutation table is reported beside it.
4. **`extractExampleMethods` and `extractExamples` were routed on my reading of H1's stated
   outcome**, not on an instruction. `extractExamples` in particular keeps a genuinely narrower
   population, and I preserved it by narrowing the key rather than by keeping its regex. If the intended scope was the
   readers H1 names only, this is the edit to reverse.
