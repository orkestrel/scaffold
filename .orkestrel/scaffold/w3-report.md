# Unit W3 report — documentation parity, the visit's sweep step, and the proposal's retirement

`implementer` on Opus 5, native subagent. Baseline `4b76a1c`.

## Outcome

Done: every change item the brief names. No deviation. Nothing outside the owned list was written,
and `tests/guides.test.ts` needed no edit.

## Touched files

| File | Change |
| ---- | ------ |
| `/home/user/scaffold/guides/scaffold.md` | `CANON_PATHS` and `isCanonPath` surface rows; the canon split stated in the intro, the groups table, the ownership section, the target-reading advisories, the vendored data root, the generated file set, Limits, and See also |
| `/home/user/scaffold/README.md` | The vendored-versus-published split stated; `new` writes the pointer pair and the vendored files |
| `/home/user/scaffold/ROADMAP.md` | One sequenced § 1 row for the fleet adoption visit, triggered by the release that ships the split |
| `/home/user/scaffold/.agents/skills/orkestrel-publish/references/wave.md` | The canon sweep added as visit step 3, condition-first, with its proof; the later steps renumbered |
| `/home/user/scaffold/PROPOSAL.md` | Deleted with `git rm` |

`git diff HEAD --stat`:

```text
 .../skills/orkestrel-publish/references/wave.md    |  15 ++-
 PROPOSAL.md                                        | 129 ---------------------
 README.md                                          |  16 ++-
 ROADMAP.md                                         |   6 +
 guides/scaffold.md                                 | 121 ++++++++++++++++---
 5 files changed, 131 insertions(+), 156 deletions(-)
```

`git status --porcelain` at return:

```text
 M .agents/skills/orkestrel-publish/references/wave.md
D  PROPOSAL.md
 M README.md
 M ROADMAP.md
 M guides/scaffold.md
```

## Failing-first record

| Behaviour | Command | Red before | Green after |
| --------- | ------- | ---------- | ----------- |
| Guide surface parity carries `CANON_PATHS` and `isCanonPath` | `npm run test:guides` | exit 1 — 1 failed, 16 passed (17); `documents every barrel-reachable export` reported `["guides/scaffold.md: const CANON_PATHS", "guides/scaffold.md: function isCanonPath"]` | exit 0 — 17 passed (17) |

The red reading was taken in this container at `4b76a1c` before any edit.

## Scoped validation evidence

| Command | Exit | Reading |
| ------- | ---- | ------- |
| `npm run test:guides` | 0 | 17 passed (17) |
| `npm run test:policy` | 0 | 111 passed (111) |
| `npx oxfmt --config .oxfmtrc.json --check` over the four owned Markdown files | 0 | all correctly formatted |
| `git status --porcelain` | — | the owned files alone |

`oxfmt` does format Markdown in this repository, including table-column alignment. That was measured
with a throwaway probe in the scratchpad — a misaligned table and an over-long prose line — whose
control is that the same run realigned the table and left the prose line untouched. Every added table
row therefore keeps the column widths the committed tables already fix.

## The exact README sentences replaced

**Replaced (`README.md:6-8`), old:**

```text
Every `@orkestrel` repository shares one toolchain, one set of agent instructions, and one set of
root dotfiles. Scaffold ships that shared set as data inside the package and gives it verbs: create
a workspace from it, report how a workspace differs from it, and write the difference back.
```

**New** — the original paragraph is retained as the framing and a second paragraph states the split:

```text
Every `@orkestrel` repository shares one toolchain, one set of agent instructions, and one set of
root dotfiles. Scaffold ships that shared set as data inside the package and gives it verbs: create
a workspace from it, report how a workspace differs from it, and write the difference back.

The set splits by how a repository meets it. The tool surface is vendored: every target receives its
own copy, and the verbs write it and compare it. The instruction canon — the coding and orchestration
contracts, the rules, the skills, the templates, and the transport contracts — is published for
reading instead, from a scaffold checkout sitting beside the repository, or from
`node_modules/@orkestrel/scaffold/dist/host/` in the installed package. Every target carries the
`AGENTS.md` and `CLAUDE.md` pointers that name where to read it.
```

**Replaced (`README.md:36-37`), old:**

```text
Writes a complete workspace into `./router`: its manifest, its build configuration, empty barrels
for each selected environment, its tests, its documentation, and every shared file. `--app` selects
```

**New:**

```text
Writes a complete workspace into `./router`: its manifest, its build configuration, empty barrels
for each selected environment, its tests, its documentation, the `AGENTS.md` and `CLAUDE.md`
pointers, and every vendored file. `--app` selects private application environments on an
```

## Guide passages rewritten, and why each was false or incomplete

| Passage | Was | Is |
| ------- | --- | -- |
| Intro (`:9-13`) | The shared set is one thing the verbs act on | A second paragraph names `HOST_PATHS` as the vendored tool surface and `CANON_PATHS` as the canon published for reading, and points at the Vendored data root section |
| Surface constants | No `CANON_PATHS` row; `HOST_PATHS` summarized as "byte-copied from the vendored data root" | `CANON_PATHS` row added in alphabetical position; `HOST_PATHS` summary realigned with its rewritten TSDoc |
| Surface helpers | No `isCanonPath` row | Row added before `isDeferredPath` |
| Groups table `docs` row | "`README.md` and the root instruction documents" | "`README.md` beside the `AGENTS.md` and `CLAUDE.md` pointers" |
| Groups table `orchestration` row | "The harness directories …" while `.agents/` no longer reaches a target | "The vendored harness wiring …", with a following paragraph stating that no group carries the canon |
| Ownership, unhydrated row (`:930`) | Named `AGENTS.md` as an unhydrated vendored presence path | Names `.claude/settings.json`, `.codex/config.toml`, and `tests/policy.test.ts`; a new paragraph places the pointer pair outside that row as template-origin content-owned artifacts hydration leaves alone |
| Reading a target (`:646`) | "`audit` reports one further non-blocking question, on the `setup` field" | Names the `setup` and `canon` fields, and adds the `canon` question's own two paragraphs: what it reads, why it reads the filesystem rather than the plan, the directory-level reporting, the subtracted document paths, the one-commit remedy, and its `docs`/`orchestration` group membership |
| Vendored data root opening (`:1129-1133`) | One candidate list | Staging walks both lists; each list gets its own paragraph naming its members and how a target meets it; disjointness and `isCanonPath` stated |
| Release rule (`:1141-1144`) | Removing a vendored path from the manifest | A new paragraph states that a `HOST_PATHS`-to-`CANON_PATHS` move is not that removal: the path stays staged and published, no plan claims it, and `audit` raises the `canon` question until a maintainer deletes the copy |
| Request accounting (`:1146-1150`) | Every installed path can cost a request | A new paragraph: a canon destination costs none, the fetch list drops it, and `filesToHost` takes the installed floor bytes |
| Dot-stripping (`:1167-1173`) | No named consumer | A new paragraph names the pointer as the consumer and spells the three installed-branch paths the pointer prints |
| Generated workspace file set | Template artifacts for `README.md` and `guides/README.md` alone | A bullet for the `AGENTS.md` and `CLAUDE.md` template artifacts, what each says, and that scaffold owns their bytes |
| Limits | No entry on superseded copies | **No verb removes a superseded instruction copy** — `repair` never deletes, and `overwrite`'s foreign reading extends only beneath the vendored directories a plan expands, which excludes every canon directory |
| See also | "the coding contract every generated workspace inherits" | "… points at" |

Every behavioural claim above was read out of `src/` before it was written: `CANON_PATHS` and
`HOST_PATHS` (`src/core/constants.ts:107-181`), `isCanonPath` (`src/core/helpers.ts:214-216`), the
pointer bodies (`src/core/templates.ts:2022-2056`), `blueprintToDocumentArtifacts`
(`src/core/compilers.ts:1453-1484`), the overlay pair (`src/server/helpers.ts:1214-1244` and
`src/bin/CLI.ts:636-641`), `#canonQuestion` (`src/bin/CLI.ts:1406-1438`), and the foreign-path reach
that bounds `overwrite`'s deletions (`src/server/Materializer.ts:613-652` and `:466-473`, where
`remove` acts on `foreign` findings alone and `#derive` extends the snapshot only beneath the
vendored directory roots a plan expands).

## Shared-file patches

None. `tests/guides.test.ts` was not edited and needed no edit: it went green on the guide rows
alone.

## Decisions recorded, no stop taken

- **The advisory's reporting surface is stated without an exclusivity claim.** The shipped guide said
  of the `setup` question that `audit` "alone reports it". Reading the call chain contradicts that
  for both advisories: `#appendQuestions` (`src/bin/CLI.ts:1479-1487`) calls `#targetQuestions` with
  `writing` defaulted to `false`, so the terminal audits `repair` (`:368`) and `overwrite` (`:502`)
  report carry the `setup` and `canon` questions too; only the refusal path (`:1495`) passes
  `writing = true` and drops them. Rather than extend a claim I could not prove under this brief's
  command limits, the new opener says `audit` reports the questions and claims no exclusivity, and
  each question's own paragraph keeps the true rule — no verb acts on it. The pre-existing `setup`
  sentence at the end of that section was left as it stands; see Observations.
- **The section heading stayed "Vendored data root".** The root now stages more than the vendored
  set, but every TSDoc in `src/` still names it that way, and renaming the heading here alone would
  split one concept across two terms. The section's opening paragraphs carry the widened meaning
  instead.
- **`.codex/config.toml` joined the unhydrated example list.** Dropping `AGENTS.md` left two paths
  where the sentence reads as an open set; a third genuine `HOST_PATHS` member restores that.
- **The Limits entry was added, though the brief did not name one.** "What a reader will look for and
  not find" is exactly where a maintainer asks why `overwrite` did not remove the old `.claude/rules/`
  tree, and the answer is a real limit of the shipped design.
- **The wave sweep is step 3, immediately after `scaffold overwrite`.** The advisory that names the
  paths comes from a reading verb, and the deletion has to land before the gates and before the
  `dist/` comparison, so any later position would gate a tree the visit is about to change.
- **`guides/README.md` was not edited.** Its concept and directory indexes name files, not sections,
  and this unit renamed no file and no section.

## Observations, not criteria

- **A possible pre-existing inaccuracy about the `setup` question.** `guides/scaffold.md` still says,
  in the setup paragraph, that "no writing verb raises the question". By the call chain cited above,
  `repair` and `overwrite` report it in their terminal audit while never refusing over it. Settling
  this needs a driven run of `repair` against a target carrying a filled setup module, which is
  outside this brief's command limits, so nothing was changed there. It is a candidate successor
  unit.
- **HEAD moved during the unit.** The baseline was `4b76a1c`; `44b5d33` ("Retain the W3 dispatch
  brief in the campaign record") landed mid-unit and touches `.orkestrel/scaffold/w3-brief.md` alone,
  so it collides with nothing here. Every reading in this report is against `HEAD` at return.
- `npm run build`, the whole `npm test`, `npm run check`, and `npm run lint:check` were not run, per
  the brief. The `format:check` reading above is scoped to the four owned Markdown files.
