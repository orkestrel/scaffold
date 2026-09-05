# Serial patches applying the round-3 objective lane's exact prescriptions to PROPOSAL.md (docs-proposal campaign, 2026-09-05).
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

# Objective 2(a), 4: the pitch is the blockquote at guides/scaffold.md:3-7; the vendored-set source is :9-27.
rep('R3-pitch', "`guides/scaffold.md:1-13`", "`guides/scaffold.md:3-7`", count=2)
rep('R3-vendored', "`guides/scaffold.md:15-27`", "`guides/scaffold.md:9-27`", count=2)

# Objective 2(c): the verb table is a region inserted at a named README line.
rep('R3-verb', "and a verb table rendered from the guide's command reference (`:518-530`). The per-verb\nsections at `README.md:45-100` sit outside every region and stay authored, so Stage 3 does not reach\nthem.",
"and a verb-table region inserted at `README.md:44`, between the flags and the per-verb sections,\nrendered from the guide's command reference (`:518-530`). The per-verb sections at `README.md:45-100`\nsit outside every region and stay authored, so Stage 3 does not reach them.")

# Objective 2(b): the Recommendation and the check rows carry the one-region-per-span framing.
rep('R3-rec', """3. **Option 1 Stage 2, the `## Methods` regions**, and **Stage 3, the `README.md` head region**.
   Stage 3 gives `README.md` the check it has never had, over the head region alone: the pitch, the
   install line, the runtime and `npx` lines, the authority and exit-code sentence, the flags, and a
   verb table rendered from the guide's command reference. The per-verb sections at `README.md:45-100`
   stay outside it.""",
"""3. **Option 1 Stage 2, the `## Methods` regions**, and **Stage 3, the `README.md` head regions**.
   Stage 3 gives `README.md` the check it has never had, one region per span: the pitch, the
   vendored-set paragraphs, the install line, the runtime and `npx` lines, the authority and exit-code
   sentence, the flags, and a verb-table region inserted between the flags and the per-verb sections,
   rendered from the guide's command reference. The per-verb sections at `README.md:45-100` stay
   outside every region.""")
rep('R3-currency', "The marker-bounded span in `README.md` matches the render.", "Each marker-bounded span in `README.md` matches the render.")
rep('R3-gate', "region currency for the generated rows, the README region at Stage 3,", "region currency for the generated rows, the README regions at Stage 3,")
rep('R3-li', "and the README region's links at Stage 3", "and the links inside the README regions at Stage 3")

# Objective 5: Option 1's rename row carries the fence transcription in both columns and its check.
rep('R3-rename-today', "every fence importing it; `README.md` where named | The declaration and its TSDoc; every call site; every `{@link}` carried on another declaration; every fence importing it; every authored prose mention; run `npm run docs` | Today: the typecheck for call sites,",
"every fence importing it; `README.md` where named; the fence transcription in `tests/guides.test.ts` | The declaration and its TSDoc; every call site; every `{@link}` carried on another declaration; every fence importing it; every authored prose mention; the fence transcription in `tests/guides.test.ts`; run `npm run docs` | Today: the typecheck for call sites and for the transcription,")
rep('R3-rename-gate', "Under Option 1: the typecheck for call sites, FI for the fences,", "Under Option 1: the typecheck for call sites and for the transcription, FI for the fences,")

# Objective F1: item 3 is a settled reading, not a probe; it leaves the list and the rest renumber.
rep('R3-probe3', """3. **The multi-region splice — settled by reading.** `Materializer.catalog`
   (`src/server/Materializer.ts:386-396`) writes `CATALOG_AGENT_PATH` alone through `#rewrite`
   (`:953-974`); `#recatalog` (`:1112-1161`) is `#`-private, bound to `CATALOG_OPENING_MARKER` and
   `CATALOG_CLOSING_MARKER` (`src/core/constants.ts:290`, `:299`), emits only the package table, and
   throws `The catalog agent file carries no marked region.` (`:1155`) for a file without that pair.
   The render carries its own splice in `@orkestrel/guide`, per R4. The first unit proves that splice
   on a fixture carrying two qualified marker pairs, regenerated twice and diffed for stability.
4. **Formatter stability""", "3. **Formatter stability")
rep('R3-probe5', "5. **The `jsdoc` rewrite.**", "4. **The `jsdoc` rewrite.**")
rep('R3-probe6', "6. **An oxlint rule reporting on a comment.**", "5. **An oxlint rule reporting on a comment.**")

# Objective F2: one range per Materializer member everywhere.
n1 = t.count("`src/server/Materializer.ts:369-395`"); t = t.replace("`src/server/Materializer.ts:369-395`", "`src/server/Materializer.ts:386-396`"); print(f'ok R3-catalog-range ({n1} sites)')
n2 = t.count("`:1112-1117`"); t = t.replace("`:1112-1117`", "`:1112-1161`"); print(f'ok R3-recatalog-range ({n2} sites)')

# Checker claim 1: the O-F5 prescription's exact bold boundary.
rep('R3-bold', "**Stays real and is adopted here**, as under Option 1,", "**Stays real and is adopted here, as under Option 1**,")

open(p, 'w').write(t)
print('written')
