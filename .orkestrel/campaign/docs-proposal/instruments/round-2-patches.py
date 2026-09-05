# Serial patches applying the round-2 audit lanes' exact prescriptions to PROPOSAL.md (docs-proposal campaign, 2026-09-05).
# Each patch names its source finding. A patch whose anchor is not found exactly once stops the script.
import re, sys
p = '/home/user/scaffold/PROPOSAL.md'
t = open(p).read()
def rep(tag, old, new, count=1):
    global t
    n = t.count(old)
    if n != count:
        print(f'STOP {tag}: anchor found {n} times, expected {count}'); sys.exit(2)
    t = t.replace(old, new)
    print(f'ok {tag}')

# S2(c): the sweep row states what each hit is and bounds the claim to the swept terms.
rep('S2c', """policy plugin's "banned" mock-API messages (`configs/policy.ts:197`, `:300`), the templates'
"declaration substitution" string (`src/core/templates.ts:1442`), and the same terms on the test side
(`tests/src/core/templates.test.ts:1382`, `tests/setupPolicy.ts:1819`, `tests/guides.test.ts:363`).
Each hit is a code identifier or a message about mock APIs, so nothing in the tree carries a
substitution-table term in the sense the table bans — and nothing in the tree sweeps for one either.""",
"""policy plugin's `banned` doc comment and mock-API message (`configs/policy.ts:197`, `:300`), the
templates' `declaration substitution` comment (`src/core/templates.ts:1442`), and the same terms on
the test side as a fixture prefix, a code identifier, and a test title
(`tests/src/core/templates.test.ts:1382`, `tests/setupPolicy.ts:1819`, `tests/guides.test.ts:363`).
No hit is an instrument that sweeps for a substitution-table term, and the first pattern covers
`should`, `simply`, and `leverage` alone, so the sweep bounds the claim to those terms.""")

# S-F3: stray space inside a code span.
rep('S-F3', "Markdown links (`grep -c '](' ` over that span returned `18`)", "Markdown links (the `grep -c` count of `](` over that span returned `18`)")

# O-F1: the introduction names each check in the table.
rep('O-F1', "The catalog check runs in this repository and can still fail, as the table records with its site and\nits failure meaning.", "Each catalog check in the following table runs in this repository and can still fail, and the table\ngives its site and its failure meaning.")

# O-F3, O-F4, S-F1: the README overlap pairs.
rep('O-F3', "the exit codes (`README.md:40`; `guides/scaffold.md:547-549`)", "the exit codes (`README.md:40`; `guides/scaffold.md:547-550`)")
rep('O-F4', """and the library split with its `createBlueprint`
fence (`README.md:103-115`; `guides/scaffold.md:1381`).""", """the library split (`README.md:102-105`;
`guides/scaffold.md:1379-1383`), and the `createBlueprint` fence (`README.md:107-116`;
`guides/scaffold.md:1367-1376`).""")
rep('S-F1a', "the compile-compare-write pitch (`README.md:1-8`; `guides/scaffold.md:1-13`)", "the compile-compare-write pitch (`README.md:3-4`; `guides/scaffold.md:1-13`)")
rep('S-F1b', "vendored-set paragraph (`README.md:10-23`; `guides/scaffold.md:15-27`)", "vendored-set paragraphs (`README.md:6-23`; `guides/scaffold.md:15-27`)")

# O-F6: the own-guide exclusion has its own pointer.
rep('O-F6', """`guides/README.md:33-37` states that
  every `guides/<name>.md` file other than `scaffold.md` is byte-identical to that package's `main`.""",
"""`guides/README.md:33-37` states that
  every `guides/<name>.md` file is byte-identical to that package's `main`, and
  `src/core/constants.ts:122-123` states that a workspace never mirrors its own guide, which is why
  `scaffold.md` is this repository's exception.""")

# O-F7: `table` was read.
# O-F7: `table` was read; the phrase sits at two sites with different wrapping and capitalisation.
n = len(re.findall(r"very fleet package except `guide` itself, plus `scaffold`, declares", t))
if n != 2:
    print(f'STOP O-F7: anchor found {n} times, expected 2'); sys.exit(2)
t = re.sub(r"very fleet package except `guide` itself, plus `scaffold`, declares", "very fleet package except `guide` itself (`table` included, per `/home/user/fleet/table/package.json:70`), plus `scaffold`, declares", t)
print('ok O-F7')

# Checker 6: sentence-case headings.
rep('C6a', "## Option 1 — Reference regions rendered from TSDoc (recommended)", "## Option 1 — reference regions rendered from TSDoc (recommended)")
rep('C6b', "## Option 3 — The voice gate: the prose law enforced where the prose lives", "## Option 3 — the voice gate: the prose law enforced where the prose lives")

# S-F1, O-F2: the README head is one region per span, each with its guide source.
rep('README-row', "| The `README.md` head region        | The same summaries and the guide's command reference                  | The same renderer                                          |",
"| The `README.md` head regions | The guide passages named under Stage 3, one region per span | The same renderer |")
rep('README-stage3', """Stage 3 marks the `README.md` head region, which covers the pitch
(`README.md:3-4`), the install line (`:27-28`), the runtime and `npx` lines (`:31-34`), the authority
and exit-code sentence (`:39-40`), the `--target` and `--json` flags (`:42-43`), and a verb table
rendered from the guide's command reference (`guides/scaffold.md:518-530`). The per-verb sections at
`README.md:45-100` sit outside that region and stay authored, so Stage 3 does not reach them.""",
"""Stage 3 marks one region per `README.md` span, each rendered from a named
guide passage: the pitch (`README.md:3-4`, from the blockquote at `guides/scaffold.md:1-13`), the
vendored-set paragraphs (`:6-23`, from `guides/scaffold.md:15-27`), the install line (`:27-28`, from
`:35-36`), the runtime and `npx` lines (`:31-34`, from `:39-42`), the authority and exit-code sentence
(`:39-40`, from `:477-478` and `:547-550`), the `--target` and `--json` flags (`:42-43`, from
`:542-543`), and a verb table rendered from the guide's command reference (`:518-530`). The per-verb
sections at `README.md:45-100` sit outside every region and stay authored, so Stage 3 does not reach
them.""")

# O2(e), O10: the existing splice is single-marker; the render carries its own, per R4.
rep('splice-mech', """Whether the existing
splice writes each of them is probe 3's question, not a measured property of `Materializer.catalog`.""",
"""The existing
splice does not write them: `Materializer.catalog` (`src/server/Materializer.ts:386-396`) rewrites
`CATALOG_AGENT_PATH` alone through `#rewrite` (`:953-974`), and `#recatalog` (`:1112-1161`) is
private, bound to the catalog markers (`src/core/constants.ts:290`, `:299`), and emits only the
package table, so the render carries its own splice, per R4.""")
rep('splice-risk', """- **The multi-region splice is unproven.** `Materializer.catalog` and `#recatalog` splice one region
  in one file. Whether that generalizes to several regions per file, or whether the guide package
  renders regions itself, is open. The ruling puts the render in `@orkestrel/guide`, which makes this
  a design question for the first unit rather than a `Materializer` change.""",
"""- **The render needs its own splice.** `Materializer.catalog` and `#recatalog` splice one region in
  one file, and that splice is single-marker, single-path, and catalog-content-bound
  (`src/server/Materializer.ts:386-396`, `:953-974`, `:1112-1161`), so nothing in `@orkestrel/guide`
  can reuse it. The ruling puts the render and its splice in `@orkestrel/guide`; the splice is the
  first unit's design, proven on a fixture carrying two qualified marker pairs, regenerated twice and
  diffed for stability.""")
rep('probe3', """3. **The multi-region splice.** Write a fixture Markdown file carrying a `surface` marker pair and a
   `methods` marker pair, splice both through the existing catalog path — `Materializer.catalog`
   (`src/server/Materializer.ts:369-395`) and `#recatalog` (`:1112-1117`) — in a throwaway script, and
   diff the output against the expected regions. Where each region is spliced, the existing splice
   generalizes and the render can reuse it. Where a region is dropped or overwritten, the render lives
   in `@orkestrel/guide` and carries its own splice, per R4.""",
"""3. **The multi-region splice — settled by reading.** `Materializer.catalog`
   (`src/server/Materializer.ts:386-396`) writes `CATALOG_AGENT_PATH` alone through `#rewrite`
   (`:953-974`); `#recatalog` (`:1112-1161`) is `#`-private, bound to `CATALOG_OPENING_MARKER` and
   `CATALOG_CLOSING_MARKER` (`src/core/constants.ts:290`, `:299`), emits only the package table, and
   throws `The catalog agent file carries no marked region.` (`:1155`) for a file without that pair.
   The render carries its own splice in `@orkestrel/guide`, per R4. The first unit proves that splice
   on a fixture carrying two qualified marker pairs, regenerated twice and diffed for stability.""")

# O-F8: the example's closing marker is qualified.
rep('O-F8', "| `Ownership` | type | Names what scaffold claims at an artifact's path. |\n\n<!-- /orkestrel:surface -->", "| `Ownership` | type | Names what scaffold claims at an artifact's path. |\n\n<!-- /orkestrel:surface core types -->")

# O9 (Option 1 rename row): an authored prose mention has no check.
rep('O9-opt1', "and `none` for a `{@link}` inside an `@remarks` block |", "`none` for a `{@link}` inside an `@remarks` block, and `none` for an authored prose mention |")

# S9, O9 (Option 2 rename row): the surviving sites and their checks.
rep('O9-opt2', "| The declaration and its TSDoc; every call site; every `{@link}` carried on another symbol's declaration | The typecheck for call sites; byte equality for every rendered row, chapter, and fence; the render's own refusal for a `{@link}` that no longer resolves |",
"| The declaration and its TSDoc; every call site; every `{@link}` carried on another symbol's declaration; every `@example` fence on another declaration importing it; the fence transcription in `tests/guides.test.ts` | The typecheck for call sites and for the transcription; byte equality for every rendered row, chapter, and fence; the render's own import resolution for a fence, and its refusal for a `{@link}` that no longer resolves |")

# O-F5: the direct-to-barrel half is adopted, not merely kept.
rep('O-F5', "| SB, direct to barrel                    | **Stays real**, as it does under Option 1,", "| SB, direct to barrel                    | **Stays real and is adopted here**, as under Option 1,")

# S10: the inherited-defect risk row is scoped to the first sentence.
rep('S10', """forbids. Under R1 the row takes whatever the doc block says, so the defect derives into the guide
  rather than stopping at the source. Neither instrument Option 3 proposes reads it:""",
"""forbids. Under R1 the row takes the doc block's first sentence verbatim, so a writing defect inside
  that sentence derives into the guide rather than stopping at the source. The `{@link Question}s`
  token sits in an `@remarks` paragraph, which Option 1 never renders, so it derives only under
  Option 2. Neither instrument Option 3 proposes reads either position:""")

# S-F2: the Vale row's pointer supports the refusal alone.
rep('S-F2', "| `AGENTS.md` § Non-negotiable rules; `plugins-dev.d.ts:2697`                               |", "| `AGENTS.md` § Non-negotiable rules |")

# Checker: the ROADMAP phrase spans two lines.
rep('C-roadmap', "`ROADMAP.md:127`", "`ROADMAP.md:127-128`", count=3)

open(p, 'w').write(t)
print('written')
